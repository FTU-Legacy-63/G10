import type { Decision, Dossier, Draft, ReferenceResult } from './types';

export function annuityFactor(annualRate: number, months: number): number {
  if (!Number.isFinite(annualRate) || annualRate < 0 || !Number.isInteger(months) || months <= 0) throw new Error('Invalid loan terms');
  const rate = annualRate / 12;
  return rate === 0 ? months : -Math.expm1(-months * Math.log1p(rate)) / rate;
}
export function pmt(principal: number, annualRate: number, months: number): number {
  if (!Number.isFinite(principal) || principal <= 0) throw new Error('Invalid principal');
  return principal / annuityFactor(annualRate, months);
}
export function presentValue(installment: number, annualRate: number, months: number): number {
  return installment * annuityFactor(annualRate, months);
}
// English numeric grammar is explicit: 1234.50 or 1,234.50. Never infer a locale.
export function parseNumber(raw: string): number | null {
  const value = raw.trim();
  if (!/^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value)) return null;
  const result = Number(value.replaceAll(',', ''));
  return Number.isFinite(result) && result <= Number.MAX_SAFE_INTEGER ? result : null;
}
export function validateDecision(draft: Draft, file: Dossier): string | null {
  if (!draft.decision) return 'Choose a decision to continue';
  if (draft.decision === 'Add conditions') {
    const allowed = file.product === 'Secured' ? ['use-of-funds', 'reappraisal', 'income-update'] : ['use-of-funds', 'income-update'];
    return draft.covenants.length > 0 && draft.covenants.every(c => allowed.includes(c)) ? null : 'Select at least one condition';
  }
  if (draft.decision !== 'Reduce limit' && draft.decision !== 'Require more collateral') return null;
  const amount = parseNumber(draft.amount);
  if (amount === null) return 'Please enter a valid number';
  if (draft.decision === 'Reduce limit') {
    if (amount <= 0) return 'Installment must be greater than 0';
    if (amount > file.emi) return 'Proposed installment cannot exceed the original estimate – Reduce limit can only lower it, never raise it';
  } else {
    if (amount <= 0) return 'Additional collateral must be greater than 0';
    if (amount > file.principal / .70) return 'Additional collateral cannot exceed what the whole loan would require';
  }
  return null;
}
export function capacityDecision(dti: number): Decision | null {
  if (!Number.isFinite(dti) || dti < 0) throw new Error('Invalid DTI');
  return dti > .8 ? 'Reject' : dti > .7 ? 'Reduce limit' : null;
}
export function withinTolerance(value: number, reference: number): boolean {
  return Number.isFinite(value) && Number.isFinite(reference) && reference > 0 && value >= reference * .95 && value <= reference * 1.05;
}
export function plannedAllocation(draft: Draft, file: Dossier): number | null {
  if (validateDecision(draft, file)) return null;
  if (draft.decision === 'Reject') return 0;
  if (draft.decision === 'Reduce limit') return presentValue(parseNumber(draft.amount)!, file.annualRate, file.appliedMonths);
  return file.principal;
}

// Independently transcribed from DOSSIER-8 (13), B. Never exposed through dossier projections.
const FACTS = [
  { income: 36e6, debt: 10e6, liquid: 135e6, current: 1, worst: 1, inquiries: 2, appraisal: 0, senior: 0, adverse: false, purpose: true, main: 'WH-0005' },
  { income: 19.5e6, debt: 9.5e6, liquid: 60e6, current: 1, worst: 1, inquiries: 1, appraisal: 1060e6, senior: 0, adverse: false, purpose: true, main: 'WH-0033' },
  { income: 40.5e6, debt: 14.4e6, liquid: 150e6, current: 1, worst: 2, inquiries: 1, appraisal: 0, senior: 0, adverse: false, purpose: true, main: 'WH-0009' },
  { income: 32e6, debt: 12.5e6, liquid: 50e6, current: 1, worst: 1, inquiries: 1, appraisal: 620e6, senior: 0, adverse: false, purpose: true, main: 'WH-0051' },
  { income: 15e6, debt: 4.2e6, liquid: 60e6, current: 1, worst: 2, inquiries: 1, appraisal: 1012e6, senior: 0, adverse: false, purpose: true, main: 'WH-0018' },
  { income: 35e6, debt: 7.9e6, liquid: 175e6, current: 1, worst: 1, inquiries: 1, appraisal: 2200e6, senior: 0, adverse: false, purpose: true, main: 'WH-0140' },
  { income: 38e6, debt: 7.96e6, liquid: 120e6, current: 1, worst: 1, inquiries: 3, appraisal: 1960e6, senior: 700e6, adverse: true, purpose: true, main: 'WH-0106' },
  { income: 45e6, debt: 6e6, liquid: 130e6, current: 1, worst: 1, inquiries: 2, appraisal: 0, senior: 0, adverse: false, purpose: false, main: 'WH-0122' },
];

export function assessReference(file: Dossier): ReferenceResult {
  const f = FACTS[Number(file.id.slice(-2)) - 1];
  if (!f || f.income <= 0) throw new Error('Missing reference data');
  const secured = file.product === 'Secured';
  const character = f.current >= 2 ? 'Block' : f.worst >= 2 || f.inquiries >= 3 ? 'Watch' : 'Clear';
  const result: ReferenceResult = {
    caseId: file.id, decision: null, reviewIssue: null, character,
    purpose: f.purpose ? 'Feasible' : 'Not feasible', acceptance: secured ? 'Accepted' : 'N/A',
    income: f.income, obligations: f.debt, dti: null, net: null, ltv: null, reserve: null,
    collateral: secured ? 'Not assessed' : 'N/A', capital: 'Not assessed', conditions: 'Not assessed',
    maxInstallment: null, proposedPrincipal: null, additional: null, mainRecord: f.main, secondary: [],
    reserveBasis: 'Original requested installment',
  };
  // This source conflict is deliberately not converted into a new tax policy or certified answer.
  if (file.id === 'KHCN-04') {
    result.reviewIssue = 'The rental-tax and eligible-income basis differs between the dossier key and Warehouse evidence. Reference grading for this file is held for source review.';
    return result;
  }
  if (character === 'Block' || !f.purpose) { result.decision = 'Reject'; return result; }
  const emi = pmt(file.principal, file.annualRate, file.appliedMonths);
  result.dti = (f.debt + emi) / f.income;
  const capacity = capacityDecision(result.dti);
  if (capacity === 'Reject') { result.decision = 'Reject'; return result; }
  result.maxInstallment = Math.max(0, .7 * f.income - f.debt);
  const principal = capacity === 'Reduce limit' ? presentValue(result.maxInstallment, file.annualRate, file.appliedMonths) : file.principal;
  result.proposedPrincipal = principal;
  if (secured) {
    result.net = f.appraisal - f.senior;
    result.ltv = result.net > 0 ? principal / result.net : null;
    result.collateral = result.net <= 0 || result.ltv! > .7 ? 'Shortfall' : 'Clear';
    result.additional = result.collateral === 'Shortfall' ? Math.ceil((principal / .7 - result.net) / 1e6) * 1e6 : 0;
  }
  const originalCover = f.liquid / (f.debt + emi);
  if (capacity === 'Reduce limit') {
    // Show no universal numeric reserve basis while the source policy is open.
    const reducedCover = f.liquid / (f.debt + result.maxInstallment);
    result.reserve = null;
    result.reserveBasis = 'Capital-after-Reduce basis awaits policy review; both authored bases are Clear for this file.';
    result.capital = originalCover >= 3 && reducedCover >= 3 ? 'Clear' : 'Source review';
  } else {
    result.reserve = originalCover;
    result.capital = originalCover < 3 ? 'Watch' : 'Clear';
  }
  result.conditions = f.adverse ? 'Adverse' : 'Normal';
  if (character === 'Watch') result.secondary.push('Character Watch: occupation/income and use-of-funds covenants.');
  if (result.capital === 'Watch') result.secondary.push('Capital Watch: appropriate monitoring covenants.');
  if (f.adverse) result.secondary.push('Conditions Adverse: monitoring and use-of-funds covenants.');
  if (result.collateral === 'Shortfall' && capacity === 'Reduce limit') result.secondary.push('Additional collateral is required on the reduced offer.');
  result.decision = capacity ?? (result.collateral === 'Shortfall' ? 'Require more collateral' : result.secondary.length ? 'Add conditions' : 'Approve');
  return result;
}
export function money(value: number): string { return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value); }
