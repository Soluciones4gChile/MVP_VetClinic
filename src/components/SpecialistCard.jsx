
import React from 'react'
import { money } from '../utils'
export default function SpecialistCard({ specialist, shortHours, reservedSet, onPick, onMore }){
  return (
    <div className="spec">
      <div className="row" style={{gap:10}}>
        <div className="avatar">{specialist.name.split(' ')[0][0]}</div>
        <div>
          <h4 style={{margin:0}}>{specialist.name}</h4>
          <div className="small">{money(specialist.price)} · Anticipo 50%: {money(Math.round(specialist.price*0.5))}</div>
        </div>
      </div>
      <div className="pills">
        {shortHours.map(h => {
          const iso = h.toISOString()
          const reserved = reservedSet.has(`${specialist.id}__${iso}`)
          return (
            <button key={iso} className="pill" disabled={reserved} onClick={()=>onPick(iso)}>
              {h.toLocaleTimeString('es-CL', {hour:'2-digit', minute:'2-digit', hour12: false, hour12: false})}
            </button>
          )
        })}
        <button className="btn secondary" onClick={onMore}>Ver más horas</button>
      </div>
    </div>
  )
}
