// Imported only by the disposable Vite QA server at port 5181, never a production entry.
if (location.hostname === '127.0.0.1' && location.port === '5181' && location.pathname.startsWith('/integration')) {
  let blocked = false;
  const write = Storage.prototype.setItem;
  Storage.prototype.setItem = function (key, value) { if (blocked && key === 'the-credit-desk:integration-pilot:v1') throw new DOMException('Disposable QA write failure','QuotaExceededError'); return write.call(this,key,value); };
  if (document.cookie.includes('ipQaCanvas=1')) { const get=HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext=function(...args){ return args[0] === '2d' ? null : get.apply(this,args); }; }
  const panel=document.createElement('div');panel.style='position:fixed;right:6px;top:4px;z-index:10000;font:11px system-ui;background:#fff8dc;color:#332;padding:3px;max-width:210px';
  const toggle=document.createElement('button');toggle.textContent='QA writes: enabled';toggle.onclick=()=>{blocked=!blocked;toggle.textContent=blocked?'QA writes: blocked':'QA writes: enabled';};
  const read=document.createElement('button');read.textContent='QA save status';read.onclick=()=>{ const raw=localStorage.getItem('the-credit-desk:integration-pilot:v1');let value;try{value=JSON.parse(raw);}catch{};output.textContent=JSON.stringify(value ? {attempt:value.attemptId,revision:value.revision,started:value.started,current:value.current,reached:value.reached,phase:value.phase,view:value.view,settings:value.settings} : {raw}); };
  const hide=document.createElement('button');hide.textContent='Hide QA tools';hide.onclick=()=>{panel.hidden=true;};
  const output=document.createElement('pre');output.style='white-space:pre-wrap;max-height:190px;overflow:auto;margin:0';panel.append(toggle,read,hide,output);document.addEventListener('DOMContentLoaded',()=>document.body.append(panel),{once:true});
}
