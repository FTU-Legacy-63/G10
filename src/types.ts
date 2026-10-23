export type Decision = 'Approve' | 'Reduce limit' | 'Require more collateral' | 'Add conditions' | 'Reject';
export const DECISIONS: Decision[] = ['Approve', 'Reduce limit', 'Require more collateral', 'Add conditions', 'Reject'];
export type Covenant = 'use-of-funds' | 'reappraisal' | 'income-update';
export const COVENANTS: { id: Covenant; label: string }[] = [
  { id: 'use-of-funds', label: 'Documents showing use of funds' },
  { id: 'reappraisal', label: 'Periodic collateral re-appraisal' },
  { id: 'income-update', label: 'Periodic occupation and income update' },
];
export interface Dossier {
  id: string; name: string; age: number; province: string;
  product: 'Secured' | 'Unsecured'; principal: number; requestedMonths: number;
  appliedMonths: number; annualRate: number; emi: number;
  narrative: string[]; cic: string[]; collateral: string[][]; source: string;
}
export interface WarehouseRecord { id: string; name: string; age: number; province: string; headline: string; documents: string[] }
export const WORKSHEET_FIELDS = [
  { id: 'character', label: 'Character', choices: ['Clear', 'Watch', 'Block'] },
  { id: 'purpose', label: 'Purpose', choices: ['Feasible', 'Not feasible'] },
  { id: 'acceptance', label: 'Acceptance', choices: ['Accepted', 'Not accepted'], secured: true },
  { id: 'dti', label: 'DTI (%)', unit: '%', numeric: true },
  { id: 'net', label: 'Net collateral (VND)', unit: 'VND', numeric: true, secured: true },
  { id: 'ltv', label: 'LTV (%)', unit: '%', numeric: true, secured: true },
  { id: 'collateral', label: 'Collateral', choices: ['Clear', 'Shortfall'], secured: true },
  { id: 'reserve', label: 'Reserve cover (months)', unit: 'months', numeric: true },
  { id: 'capital', label: 'Capital', choices: ['Clear', 'Watch'] },
  { id: 'conditions', label: 'Conditions', choices: ['Normal', 'Adverse'] },
] as const;
export type WorksheetField = typeof WORKSHEET_FIELDS[number]['id'];
export interface Draft {
  decision: Decision | null; amount: string; covenants: Covenant[];
  worksheet: Record<WorksheetField, string>; pin: string | null; notes: string;
  cicOpened: boolean;
}
export type View = 'office' | 'dossier' | 'warehouse' | 'worksheet' | 'board' | 'review' | 'help' | 'summary';
export const DOSSIER_TABS = ['application', 'loan', 'income', 'cic', 'purpose', 'reserves', 'environment', 'collateral'] as const;
export type DossierTab = typeof DOSSIER_TABS[number];
export interface ReferenceResult {
  caseId: string; decision: Decision | null; reviewIssue: string | null;
  character: 'Clear' | 'Watch' | 'Block'; purpose: 'Feasible' | 'Not feasible';
  acceptance: string; income: number; obligations: number;
  dti: number | null; net: number | null; ltv: number | null; reserve: number | null;
  collateral: string; capital: string; conditions: string;
  maxInstallment: number | null; proposedPrincipal: number | null;
  additional: number | null; mainRecord: string; secondary: string[];
  reserveBasis: string;
}
export interface CaseReport { reference: ReferenceResult; categoryMatches: boolean | null; numericComparison: string | null; consequence: string[] }
export interface Snapshot { reports: CaseReport[] }
export interface PhysicalCopy {
  id: string; caseId: string; recordId: string;
  location: 'inventory' | 'desk' | 'board';
}
export interface ObjectWorkspace {
  copies: PhysicalCopy[];
  selectedCopy: string | null;
  folderOpen: Record<string, boolean>;
  terminalPage: 'warehouse' | 'cic';
  notebookPage: 'worksheet' | 'notes';
}
export interface RoundState {
  schema: 1; dataset: 'extended-8-g1-v1'; policy: 'g1-v1-open-finance';
  attemptId: string; revision: number; started: boolean; phase: 'draft' | 'submitted';
  reached: number; current: number; direction: number; view: View;
  drafts: Record<string, Draft>; seed: number; query: SearchQuery;
  selectedRecord: string | null; boardSources: string[];
  deskCopy: string | null;
  objects: ObjectWorkspace;
  dossierTabs: Record<string, DossierTab>;
  scroll: Record<string, number>; snapshot: Snapshot | null;
  settings: { textSize: number; reducedMotion: boolean; sound: boolean };
  boardLayout: Record<string, { x: number; y: number }>;
}
export interface SearchQuery { name: string; age: string; province: string; strict: boolean; fuzzy: boolean }
