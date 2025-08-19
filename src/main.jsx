
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import './styles.css'

function Layout({children}){
  const wa = 'https://wa.me/56961900401?text=' + encodeURIComponent('Hola San Pablo Vet Clinic, necesito agendar una consulta.')
  return (
    <div className="container">
      <header className="row topbar" style={{justifyContent:'space-between', marginBottom:16}}>
        <Link to="/"><strong>San Pablo Vet Clinic</strong></Link>
        <nav className="row" style={{gap:12, alignItems:'center'}}>
          <Link to="/">Inicio</Link>
          <a className="btn" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </nav>
      </header>
      {children}
      <footer className="footer" style={{marginTop:24}}>
        <div className="grid" style={{gap:12, gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))'}}>
          <div aria-label="Contacto">
            <div className="row small"><svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.73 19.73 0 0 1 3.11 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.9.31 1.77.57 2.61a2 2 0 0 1-.45 2.11L9 10a16 16 0 0 0 6 6l.56-1.22a2 2 0 0 1 2.11-.45c.84.26 1.71.45 2.61.57A2 2 0 0 1 22 16.92z"/></svg>
              <strong>Teléfono:</strong>&nbsp;<a href="tel:+56722904717" aria-label="Llamar al 722904717">722904717</a>
            </div>
            <div className="row small"><svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 6.5A6.5 6.5 0 105 12l-1 3 3-1a6.5 6.5 0 0010.5-7.5zM8 9c.2-.6.7-1 1.3-1 .2 0 .3 0 .5.1l.7 1.2c.1.2 0 .4 0 .5l-.4.6c.4.8 1 1.5 1.8 1.9l.6-.4c.2-.1.4-.1.5 0l1.2.7c.1.1.1.3.1.5 0 .6-.4 1.1-1 1.3-.3.1-.7.1-1 0-2.1-.6-3.7-2.3-4.3-4.3-.1-.3-.1-.7 0-1z"/></svg>
              <strong>WhatsApp:</strong>&nbsp;<a href={wa} target="_blank" rel="noopener noreferrer" aria-label="Abrir WhatsApp con mensaje prellenado">+56 9 6190 0401</a>
            </div>
            <div className="row small"><svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.7 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z"/></svg>
              <strong>Dirección:</strong>&nbsp;<a href="https://maps.google.com/?q=Avenida%20Central%20265%2C%20Villa%20Triana%2C%20Rancagua" target="_blank" rel="noopener noreferrer">Avenida Central 265, Villa Triana — Rancagua</a>
            </div>
          </div>
          <div aria-label="Horarios">
            <div className="row small"><svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1a11 11 0 1011 11A11 11 0 0012 1zm1 11H7V9h4V5h2z"/></svg>
              <strong>Urgencias:</strong>&nbsp;24/7
            </div>
            <div className="row small"><svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8a4 4 0 11-4 4 4 4 0 014-4m0-6a10 10 0 1010 10A10 10 0 0012 2z"/></svg>
              <strong>Consulta a domicilio:</strong>&nbsp;09:00–18:30
            </div>
            <div className="small">Política de cancelación: 24h · Anticipo 50% (demo)</div>
            <div className="cta-row">
              <a className="btn secondary" href="tel:+56722904717" aria-label="Llamar ahora">
                <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.73 19.73 0 0 1 3.11 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.9.31 1.77.57 2.61a2 2 0 0 1-.45 2.11L9 10a16 16 0 0 0 6 6l.56-1.22a2 2 0 0 1 2.11-.45c.84.26 1.71.45 2.61.57A2 2 0 0 1 22 16.92z"/></svg>
                Llamar
              </a>
              <a className="btn" href={wa} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp">
                <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 6.5A6.5 6.5 0 105 12l-1 3 3-1a6.5 6.5 0 0010.5-7.5zM8 9c.2-.6.7-1 1.3-1 .2 0 .3 0 .5.1l.7 1.2c.1.2 0 .4 0 .5l-.4.6c.4.8 1 1.5 1.8 1.9l.6-.4c.2-.1.4-.1.5 0l1.2.7c.1.1.1.3.1.5 0 .6-.4 1.1-1 1.3-.3.1-.7.1-1 0-2.1-.6-3.7-2.3-4.3-4.3-.1-.3-.1-.7 0-1z"/></svg>
                WhatsApp
              </a>
              <a className="btn secondary" href="https://maps.google.com/?q=Avenida%20Central%20265%2C%20Villa%20Triana%2C%20Rancagua" target="_blank" rel="noopener noreferrer" aria-label="Cómo llegar">
                <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.7 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z"/></svg>
                Cómo llegar
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Home(){
  return (
    <div className="card">
      <h2>Bienvenido</h2>
      <p className="small">Este es un esqueleto para demostrar el footer con accesos rápidos e icónicos.</p>
      <div className="spec-grid">
        <div className="card small">Contenido de ejemplo…</div>
        <div className="card small">Contenido de ejemplo…</div>
        <div className="card small">Contenido de ejemplo…</div>
      </div>
    </div>
  )
}

function App(){
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App/>)
