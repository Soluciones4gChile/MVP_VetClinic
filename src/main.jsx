
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Reserve from './pages/Reserve.jsx'
import MagicLink from './pages/MagicLink.jsx'
import Portal from './pages/Portal.jsx'
import './styles.css'

function Layout({children}){
  return (
    <div className="container">
      <header className="row" style={{justifyContent:'space-between', marginBottom:16}}>
        <Link to="/"><strong>Clínica Vet · Demo</strong></Link>
        <nav className="row" style={{gap:12}}>
          <Link to="/reservar">Reservar</Link>
          <Link to="/portal">Portal Cliente</Link>
        </nav>
      </header>
      {children}
      <footer style={{marginTop:24}} className="small">MVP Demo · Política 24h · Anticipo 50% (simulado)</footer>
    </div>
  )
}

function App(){
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/reservar" element={<Reserve/>} />
          <Route path="/portal" element={<MagicLink/>} />
          <Route path="/m/:token" element={<Portal/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App/>)
