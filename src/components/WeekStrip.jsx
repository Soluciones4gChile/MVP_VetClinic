
function fmtDay(d){ return d.toLocaleDateString('es-CL', { weekday:'short' }).replace('.', '') }
function fmtDate(d){ const day = d.getDate().toString().padStart(2,'0'); const mon = d.toLocaleDateString('es-CL', { month:'short' }).replace('.', ''); return `${day} ${mon}` }
export default function WeekStrip({ anchor, selected, onPrev, onNext, onSelect }){
  const today = new Date(); today.setHours(0,0,0,0)
  const days = [...Array(7)].map((_,i)=>{ const dd=new Date(anchor); dd.setDate(dd.getDate()+i); dd.setHours(0,0,0,0); return dd })
  const canPrev = days[0].getTime() > today.getTime()
  return (
    <div className="week">
      <button className="chev" aria-label="Anterior" onClick={()=>{ if(canPrev) onPrev() }} disabled={!canPrev} style={{opacity: canPrev?1:.5, cursor: canPrev?'pointer':'not-allowed'}}>‹</button>
      {days.map(d => {
        const key = d.toDateString()
        const active = selected.toDateString() === key
        const isPast = d.getTime() < today.getTime()
        const cls = `day ${active?'active':''}`
        return (
          <button key={key} className={cls} disabled={isPast} style={{opacity: isPast? .45 : 1, cursor: isPast? 'not-allowed':'pointer'}} onClick={()=>{ if(!isPast) onSelect(d) }}>
            <div className="dow">{fmtDay(d)}</div>
            <div className="date">{fmtDate(d)}</div>
          </button>
        )
      })}
      <button className="chev" aria-label="Siguiente" onClick={onNext}>›</button>
    </div>
  )
}
