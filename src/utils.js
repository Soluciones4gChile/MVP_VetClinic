
export function fmtDateTime(dt){
  const d = new Date(dt)
  return d.toLocaleString('es-CL', { hour12: false })
}
export function hoursDiff(futureISO, fromISO){
  const a = new Date(futureISO).getTime()
  const b = new Date(fromISO || new Date()).getTime()
  return (a - b) / (1000*60*60)
}
export function money(a){
  return new Intl.NumberFormat('es-CL',{style:'currency', currency:'CLP'}).format(a)
}
