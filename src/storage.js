
// LocalStorage-only demo storage (no backend). Do NOT use in production.
const LS_RES = 'reservations_v1'
const LS_TOKENS = 'magic_tokens_v1'

function load(key, fallback){ try{ return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback } }
function save(key, val){ localStorage.setItem(key, JSON.stringify(val)) }

export function uid(){ return Math.random().toString(36).slice(2) + Date.now().toString(36) }
export function nowISO(){ return new Date().toISOString() }

export function getReservations(){ return load(LS_RES, []) }
export function saveReservations(list){ save(LS_RES, list) }

export function getReservationsByEmail(email){
  return getReservations().filter(r => r.email.toLowerCase() === email.toLowerCase())
}
export function createReservation(data){
  const res = getReservations()
  res.push(data)
  saveReservations(res)
}
export function setReservationStatus(id, status, extra={}){
  const res = getReservations()
  const idx = res.findIndex(r => r.id === id)
  if (idx >= 0){
    res[idx] = { ...res[idx], status, ...extra, history:[...(res[idx].history||[]), {at: nowISO(), action: status}] }
    saveReservations(res)
    return res[idx]
  }
  return null
}
export function findReservation(id){ return getReservations().find(r => r.id === id) || null }

export function createMagicToken(email){
  const tokens = load(LS_TOKENS, {})
  const token = uid()
  tokens[token] = { email, at: nowISO() }
  save(LS_TOKENS, tokens)
  return token
}
export function emailForToken(token){
  const tokens = load(LS_TOKENS, {})
  return tokens[token]?.email || null
}
export function updateCustomerEmail(oldEmail, newEmail){
  const list = getReservations().map(r => r.email.toLowerCase() === oldEmail.toLowerCase() ? ({...r, email:newEmail}) : r)
  saveReservations(list)
  return true
}
