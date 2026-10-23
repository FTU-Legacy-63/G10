import { newRound, reduceRound } from '/src/application/round.ts';
const key = 'the-credit-desk:integration-pilot:v1';
const status = document.querySelector('#status')!;
if (location.hostname !== '127.0.0.1' || location.port !== '5181') throw new Error('QA fixtures require disposable origin 5181');
function show() {
  const raw = localStorage.getItem(key);
  let save: unknown = raw;
  try { save = JSON.parse(raw ?? 'null'); } catch {}
  status.textContent = JSON.stringify({ save, preferences: localStorage.getItem('the-credit-desk:integration-pilot:prefs:v1'), legacy: localStorage.getItem('the-credit-desk:rebuild:v1'), concept: localStorage.getItem('the-credit-desk:concept-study:v1') }, null, 2);
}
const tools = document.querySelector('#tools')!;
function button(label: string, action: () => void) { const b = document.createElement('button'); b.textContent = label; b.onclick = () => { action(); show(); }; tools.append(b); }
button('Read current QA save', () => {});
button('Backup current QA save', () => { const raw=localStorage.getItem(key);if(raw)localStorage.setItem('qa:pilot-backup',raw); });
button('Restore QA backup', () => { const raw=localStorage.getItem('qa:pilot-backup');if(raw)localStorage.setItem(key,raw); });
button('Empty pilot only', () => { localStorage.removeItem(key); localStorage.removeItem('the-credit-desk:integration-pilot:prefs:v1'); });
button('Fresh unstarted attempt', () => localStorage.setItem(key, JSON.stringify(newRound())));
button('Corrupt raw fixture', () => localStorage.setItem(key, '{qa: preserved invalid raw'));
button('Dataset mismatch fixture', () => localStorage.setItem(key, JSON.stringify({ ...newRound(), dataset: 'qa-other-dataset' })));
button('Complete eight-case draft fixture', () => {
 let s = reduceRound(newRound(), { type: 'start' });
 for (let i=0;i<8;i++) { s = reduceRound(s,{type:'decision',value:'Reject'}); if(i<7)s=reduceRound(s,{type:'continue'}); }
 localStorage.setItem(key, JSON.stringify(s));
});
button('Valid older-route fixtures', () => { localStorage.setItem('the-credit-desk:rebuild:v1',JSON.stringify(newRound()));localStorage.setItem('the-credit-desk:concept-study:v1',JSON.stringify(newRound())); });
button('Independent namespace sentinels', () => { localStorage.setItem('the-credit-desk:rebuild:v1','QA legacy must remain identical');localStorage.setItem('the-credit-desk:concept-study:v1','QA concept must remain identical'); });
button('External raw change (stale)', () => { const s = JSON.parse(localStorage.getItem(key)!); s.revision++; localStorage.setItem(key,JSON.stringify(s)); });
for (const [name,label] of [['ipQaReport','report'],['ipQaImage','image'],['ipQaCanvas','canvas']]) button(`Toggle ${label} failure`, () => { document.cookie = `${name}=${document.cookie.includes(`${name}=1`) ? '0' : '1'};path=/;SameSite=Strict`; });
const a=document.createElement('a');a.href='/integration/';a.textContent='Open pilot';tools.append(a);
show();
