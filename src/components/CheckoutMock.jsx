
import { useState } from 'react'
import { money } from '../utils'
export default function CheckoutMock({ open, amount, onClose, onResult }){
  const [busy,setBusy] = useState(false)
  if (!open) return null
  return (
    <div className="backdrop">
      <div className="modal">
        <h3>Webpay (simulado)</h3>
        <p>Monto a pagar (anticipo 50%): <strong>{money(amount)}</strong></p>
        <div className="row" style={{gap:8}}>
          <button className="btn" disabled={busy} onClick={()=>{setBusy(true); onResult(true); setTimeout(()=>setBusy(false), 800)}}>Simular Pago Exitoso</button>
          <button className="btn secondary" disabled={busy} onClick={()=>{setBusy(true); onResult(false); setTimeout(()=>setBusy(false), 800)}}>Simular Pago Fallido</button>
          <button className="btn secondary" onClick={onClose}>Cancelar</button>
        </div>
        <p className="small" style={{marginTop:12}}>En la versión real se redirige a Webpay y se confirma al volver (commit).</p>
      </div>
    </div>
  )
}
