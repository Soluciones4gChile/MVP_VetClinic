
import React, { useMemo, useState } from 'react'
import { money } from '../utils'

function monthKey(d){ return `${d.getFullYear()}-${d.getMonth()+1}` }
function firstOfMonth(d){ const x = new Date(d); x.setDate(1); x.setHours(0,0,0,0); return x }
function startOfToday(){ const t=new Date(); t.setHours(0,0,0,0); return t }

function buildMonthGrid(view){
  const d = firstOfMonth(view)
  const firstDow = (d.getDay() + 6) % 7 // Monday=0
  const daysInMonth = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate()
  const cells = []
  for (let i=0;i<firstDow;i++) cells.push({ muted:true, label:'' })
  for (let day=1; day<=daysInMonth; day++){
    const x = new Date(d)
    x.setDate(day)
    x.setHours(0,0,0,0)
    cells.push({ date:x, label:String(day) })
  }
  while (cells.length % 7 !== 0) cells.push({ muted:true, label:'' })
  return cells
}

export default function HoursModal({ open, specialist, date, hours, reservedSet, onClose, onPick, onSelectDate }){
  const today = startOfToday()
  const [viewMonth, setViewMonth] = useState(()=> firstOfMonth(date))
  const canPrev = useMemo(()=> monthKey(firstOfMonth(today)) !== monthKey(viewMonth), [viewMonth])

  function prevMonth(){ if(!canPrev) return; const x=new Date(viewMonth); x.setMonth(x.getMonth()-1); setViewMonth(firstOfMonth(x)) }
  function nextMonth(){ const x=new Date(viewMonth); x.setMonth(x.getMonth()+1); setViewMonth(firstOfMonth(x)) }

  if (!open) return null
  const cells = buildMonthGrid(viewMonth)

  function canSelect(day){ return day && day.getTime() >= today.getTime() }

  return (
    <div className="backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="row" style={{justifyContent:'space-between'}}>
          <h3>Médico Seleccionado</h3>
          <button className="close-x" onClick={onClose}>✕</button>
        </div>
        <div className="cols">
          <div>
            <div className="row" style={{gap:12, marginBottom:10}}>
              <div className="avatar" style={{width:74,height:74, borderRadius:14, background:'#0b1326', border:'1px solid rgba(148,163,184,.25)', display:'grid', placeItems:'center', fontWeight:800, color:'#67e8f9'}}>{specialist.name.split(' ')[0][0]}</div>
              <div>
                <div style={{fontWeight:700}}>{specialist.name}</div>
                <div className="small">Valor: {money(specialist.price)}</div>
                <div className="small">Anticipo 50%: {money(Math.round(specialist.price*0.5))}</div>
              </div>
            </div>
            <h4 style={{margin:'8px 0'}}>Horas disponibles</h4>
            <div className="hours-list">
              {hours.map(h => {
                const iso = h.toISOString()
                const reserved = reservedSet.has(`${specialist.id}__${iso}`)
                return (
                  <button key={iso} className="btn" disabled={reserved} onClick={()=>onPick(iso)}>
                    {h.toLocaleTimeString('es-CL', {hour:'2-digit', minute:'2-digit'})}
                  </button>
                )
              })}
            </div>
          </div>
          <div>
            <div className="row" style={{justifyContent:'space-between', marginBottom:6}}>
              <div style={{fontWeight:700}}>Selecciona otra fecha</div>
              <div className="row" style={{gap:8}}>
                <button className="btn secondary" onClick={prevMonth} disabled={!canPrev}>‹</button>
                <div className="badge">{viewMonth.toLocaleDateString('es-CL',{month:'long', year:'numeric'})}</div>
                <button className="btn secondary" onClick={nextMonth}>›</button>
              </div>
            </div>
            <div className="calendar">
              {['L','M','M','J','V','S','D'].map((w,i)=>(<div key={i} className="cell muted">{w}</div>))}
              {cells.map((c,i)=>{
                if (c.muted) return <div key={i} className="cell muted"></div>
                const sel = c.date.toDateString() === date.toDateString()
                const disabled = !canSelect(c.date)
                const cls = `cell ${sel?'sel':''} ${disabled?'muted':''}`
                return (
                  <button
                    key={i}
                    className={cls}
                    disabled={disabled}
                    onClick={()=> onSelectDate && onSelectDate(c.date) }
                    style={{cursor: disabled ? 'not-allowed' : 'pointer', background:'transparent'}}
                  >
                    {c.label}
                  </button>
                )
              })}
            </div>
            <div className="small" style={{marginTop:8}}>No se permiten fechas pasadas ni meses anteriores.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
