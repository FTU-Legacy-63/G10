import type { Dossier } from './types';

// Presentation of original A paragraphs only. No author answer metadata or inferred facts.
export function sourceExcerpts(file: Dossier) {
  const request = file.narrative.slice(3).filter(p => !p.startsWith('Bank system note'));
  const sector = file.narrative.find(p => p.includes('Bank sector note:'));
  return {
    income: file.narrative.slice(1, 3),
    purpose: request,
    reserves: request.filter((p, i) => i === 0 || p.startsWith('Besides ')),
    environment: sector ? [sector.slice(sector.indexOf('Bank sector note:'))] : [],
  };
}
