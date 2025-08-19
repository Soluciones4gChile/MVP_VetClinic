
import React, { useMemo, useState } from 'react'
import WeekStrip from '../components/WeekStrip.jsx'
import SpecialistCard from '../components/SpecialistCard.jsx'
import HoursModal from '../components/HoursModal.jsx'
import CheckoutMock from '../components/CheckoutMock.jsx'
import { uid, tryCreateReservation, isSlotTaken, createMagicToken, getReservations } from '../storage'
import { useNavigate } from 'react-router-dom'

const SPECIALISTS = [
  { id:'sp1', name:'Dra. Gómez — Cardiología', price:35000 },
  { id:'sp2', name:'Dr. Pérez — Traumatología', price:38000 },
  { id:'sp3', name:'Dra. Silva — Dermatología', price:30000 },
]

function startOfDay(d){ const x = new Date(d); x.setHours(0,0,0,0); return x }

function buildHours(date){
  // 14:05, 14:25, 14:45, 16:05, 16:25, 17:05
  const base = startOfDay(date)
  const mins = [14*60+5, 14*60+25, 14*60+45, 16*60+5, 16*60+25, 17*60+5]
  return mins
    .map(m => { const t = new Date(base); t.setMinutes(m); return t })
    .filter(t => t.getTime() > Date.now()+1000*60*30)
}

export default function Reserve(){
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [anchor, setAnchor] = useState(()=>{ const d=new Date(); d.setHours(0,0,0,0); return d })
  const [selectedDay, setSelectedDay] = useState(()=> new Date())
  const [modal, setModal] = useState({ open:false, spec:null })
  const [stamp, setStamp] = useState(0)
  const [checkout, setCheckout] = useState({ open:false, spec:null, iso:null })

  const reservedSet = useMemo(()=>{
    const all = getReservations().filter(r => r.status==='Activa')
    return new Set(all.map(r => r.datetimeISO))
  }, [modal, checkout])

  const hoursForDay = useMemo(()=> buildHours(selectedDay), [selectedDay])

  function onPick(spec, iso){
    if (!email) { alert('Ingresa tu correo antes de reservar.'); return }
    setCheckout({ open:true, spec, iso })
  }

  function confirmPayment(ok){
    const { spec, iso } = checkout
    setCheckout({ open:false, spec:null, iso:null })
    if (!ok) { alert('Pago fallido (simulación).'); return }
    const id = uid()
    const price = spec.price, deposit = Math.round(price*0.5)
    const result = tryCreateReservation({
      id, email, specialistId: spec.id, specialistName: spec.name,
      datetimeISO: iso, price, deposit, status:'Activa',
      createdAt: new Date().toISOString(),
      history: [{at:new Date().toISOString(), action:'Creada'}]
    })
    if (!result.ok){ alert('Lo sentimos, esa hora ya fue tomada. Selecciona otra.'); return }
    const token = createMagicToken(email)
    if (confirm('Pago exitoso (simulación). ¿Ir a "Mis Reservas"?')){
      nav('/m/'+token)
    }
  }

  const shortCount = 4

  React.useEffect(()=>{
    const bump=()=>setStamp(s=>s+1)
    const onVis=()=>{ if(!document.hidden) bump() }
    window.addEventListener('focus', bump)
    window.addEventListener('visibilitychange', onVis)
    window.addEventListener('storage', bump)
    return ()=>{ window.removeEventListener('focus', bump); window.removeEventListener('visibilitychange', onVis); window.removeEventListener('storage', bump) }
  },[])

  return (
    <div className="card">
      <h2>Seleccionar día y hora</h2>
      <div className="grid" style={{gap:8}}>
        <div className="row">
          <div style={{flex:1}}>
            <label>Correo del titular</label>
            <input type="email" placeholder="tucorreo@ejemplo.cl" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
        </div>

        <WeekStrip
          anchor={anchor}
          selected={selectedDay}
          onPrev={()=>{ const d=new Date(anchor); d.setDate(d.getDate()-7); setAnchor(d); setSelectedDay(d) }}
          onNext={()=>{ const d=new Date(anchor); d.setDate(d.getDate()+7); setAnchor(d); setSelectedDay(d) }}
          onSelect={setSelectedDay}
        />

        <div className="small">Mostrando especialistas para el <strong>{selectedDay.toLocaleDateString('es-CL',{weekday:'long', day:'2-digit', month:'long'})}</strong></div>

        <div className="spec-grid">
          {SPECIALISTS.map(spec => {
            const short = hoursForDay.slice(0, shortCount)
            return (
              <SpecialistCard
                key={spec.id}
                specialist={spec}
                shortHours={short}
                reservedSet={reservedSet}
                onPick={(iso)=>onPick(spec, iso)}
                onMore={()=> setModal({ open:true, spec }) }
              />
            )
          })}
        </div>
      </div>

      <HoursModal
        open={modal.open}
        specialist={modal.spec || SPECIALISTS[0]}
        date={selectedDay}
        hours={hoursForDay}
        reservedSet={reservedSet}
        onClose={()=> setModal({ open:false, spec:null })}
        onPick={(iso)=>{ setModal({ open:false, spec:null }); onPick(modal.spec, iso) }}
        onSelectDate={(d)=>{ setSelectedDay(d); setAnchor(d) }}
      />

      <CheckoutMock
        open={checkout.open}
        amount={checkout.spec ? Math.round(checkout.spec.price*0.5) : 0}
        onClose={()=> setCheckout({open:false, spec:null, iso:null})}
        onResult={confirmPayment}
      />
    </div>
  )
}
