
import React from 'react'
import { Link } from 'react-router-dom'
export default function Home(){return(<div className="card"><h1>Agenda de Especialistas · Demo</h1><p>Objetivo: Reducir no-shows con <strong>anticipo 50%</strong> y <strong>política 24h</strong>.</p><div className="row" style={{gap:8}}><Link className="btn" to="/reservar">Reservar ahora</Link><Link className="btn secondary" to="/portal">Ir a Portal Cliente</Link></div></div>)}
