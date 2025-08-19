
export default function About(){
  const staff=[
    {id:1, name:'Dra. Gómez', area:'Cardiología', bio:'10+ años experiencia en cardiopatías caninas y felinas.'},
    {id:2, name:'Dr. Pérez', area:'Traumatología', bio:'Cirugía ortopédica y rehabilitación.'},
    {id:3, name:'Dra. Silva', area:'Dermatología', bio:'Alergias, infecciones y manejo crónico de piel.'},
  ]
  const lab=['Hematología y bioquímica','Ecografía doppler','Rayos X digital','Test rápidos (parvo, moquillo, VIF/FeLV)']
  const servicios=['Consultas generales y vacunación','Especialistas itinerantes (anticipo 50%)','Hospitalización de día','Farmacia y alimentos recetados']
  return (
    <div className="card">
      <h1>Quiénes Somos</h1>
      <p>Somos una clínica veterinaria con foco en atención amable, diagnósticos oportunos y una agenda clara con política de cancelación a 24h.</p>
      <h3 style={{marginTop:12}}>Nuestro equipo</h3>
      <div className="spec-grid">
        {staff.map(s => (
          <div key={s.id} className="spec" style={{gridTemplateColumns:'auto 1fr'}}>
            <div className="avatar" style={{width:64, height:64}}>{s.name[0]}</div>
            <div>
              <strong>{s.name}</strong><div className="small">{s.area}</div>
              <div className="small">{s.bio}</div>
            </div>
          </div>
        ))}
      </div>
      <h3 style={{marginTop:16}}>Servicios</h3>
      <ul>{servicios.map((x,i)=><li key={i} className="small">{x}</li>)}</ul>
      <h3 style={{marginTop:16}}>Instrumental / Laboratorio</h3>
      <ul>{lab.map((x,i)=><li key={i} className="small">{x}</li>)}</ul>
    </div>
  )
}
