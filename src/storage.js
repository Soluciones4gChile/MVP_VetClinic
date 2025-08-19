
const LS_RES='reservations_v1'; const LS_TOKENS='magic_tokens_v1'
function load(k,f){ try{ return JSON.parse(localStorage.getItem(k)) ?? f } catch{ return f } }
function save(k,v){ localStorage.setItem(k, JSON.stringify(v)) }
export function uid(){ return Math.random().toString(36).slice(2)+Date.now().toString(36) }
export function nowISO(){ return new Date().toISOString() }
export function getReservations(){ return load(LS_RES,[]) }
export function saveReservations(l){ save(LS_RES,l) }
export function getReservationsByEmail(e){ return getReservations().filter(r=>r.email.toLowerCase()===e.toLowerCase()) }
export function createReservation(d){ const r=getReservations(); r.push(d); saveReservations(r) }
export function setReservationStatus(id,status,extra={}){ const r=getReservations(); const i=r.findIndex(x=>x.id===id); if(i>=0){ r[i]={...r[i],status,...extra,history:[...(r[i].history||[]),{at:nowISO(),action:status}]}; saveReservations(r); return r[i] } return null }
export function findReservation(id){ return getReservations().find(r=>r.id===id)||null }
export function createMagicToken(email){ const t=load(LS_TOKENS,{}); const tok=uid(); t[tok]={email,at:nowISO()}; save(LS_TOKENS,t); return tok }
export function emailForToken(tok){ const t=load(LS_TOKENS,{}); return t[tok]?.email||null }
export function updateCustomerEmail(o,n){ const list=getReservations().map(r=>r.email.toLowerCase()===o.toLowerCase()?({...r,email:n}):r); saveReservations(list); return true }
