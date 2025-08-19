
import React from 'react'
import { money } from '../utils'
export default function CheckoutMock({ open, amount, onClose, onResult }){
  if (!open) return null
  return (
    <div className="backdrop">
      <div className="modal">
        <h3>Webpay (simulado)</h3>
        <p>Monto a pagar (anticipo 50%): <strong>{money(amount)}</strong></p>
        <div className="row" style={{gap:8}}>
          <button className="btn" onClick={()=>onResult(true)}>Simular Pago Exitoso</button>
          <button className="btn secondary" onClick={()=>onResult(false)}>Simular Pago Fallido</button>
          <button className="btn secondary" onClick={onClose}>Cancelar</button>
        </div>
        <p className="small" style={{marginTop:12}}>En la versión real se redirige a Webpay y se confirma al volver (commit).</p>
      </div>
    </div>
  )
}
