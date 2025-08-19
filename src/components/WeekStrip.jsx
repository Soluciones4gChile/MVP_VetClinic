
import React from 'react'

function fmtDay(d){ return d.toLocaleDateString('es-CL', { weekday:'short' }).replace('.', '') }
function fmtDate(d){ 
  const day = d.getDate().toString().padStart(2,'0')
  const mon = d.toLocaleDateString('es-CL', { month:'short' }).replace('.', '')
  return `${day} ${mon}`
}

export default function WeekStrip({ anchor, selected, onPrev, onNext, onSelect }){
  const days = [...Array(7)].map((_,i)=>{
    const d = new Date(anchor)
    d.setDate(d.getDate()+i)
    return d
  })
  return (
    <div className="week">
      <button className="chev" aria-label="Anterior" onClick={onPrev}>‹</button>
      {days.map(d => {
        const key = d.toDateString()
        const active = selected.toDateString() === key
        return (
          <button key={key} className={`day ${active?'active':''}`} onClick={()=>onSelect(d)}>
            <div className="dow">{fmtDay(d)}</div>
            <div className="date">{fmtDate(d)}</div>
          </button>
        )
      })}
      <button className="chev" aria-label="Siguiente" onClick={onNext}>›</button>
    </div>
  )
}
