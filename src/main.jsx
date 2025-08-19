
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Reserve from './pages/Reserve.jsx'
import MagicLink from './pages/MagicLink.jsx'
import Portal from './pages/Portal.jsx'
import About from './pages/About.jsx'
import './styles.css'

function Layout({children}){
  return (
    <div className="container">
      <header className="row topbar" style={{justifyContent:'space-between', marginBottom:16}}>
        <Link to="/"><strong>Clínica Vet · Demo</strong></Link>
        <nav className="row" style={{gap:12, alignItems:'center'}}>
          <Link to="/about">Quiénes somos</Link>
          <Link to="/portal">Portal Cliente</Link>
          <Link className="btn" to="/reservar">Reservar</Link>
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
          <Route path="/about" element={<About/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App/>)
