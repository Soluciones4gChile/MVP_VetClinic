import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Reserve from "./pages/Reserve.jsx";
import MagicLink from "./pages/MagicLink.jsx";
import Portal from "./pages/Portal.jsx";
import About from "./pages/About.jsx";
import "./styles.css";

function Layout({ children }) {
  return (
    <div className="container">
      <header
        className="row topbar"
        style={{ justifyContent: "space-between", marginBottom: 16 }}
      >
        <Link to="/">
          <strong>San Pablo Vet Clinic</strong>
        </Link>
        <nav className="row" style={{ gap: 12, alignItems: "center" }}>
          <Link to="/about">Quiénes somos</Link>
          <Link to="/portal">Portal Cliente</Link>
          <Link className="btn" to="/reservar">
            Reservar
          </Link>
        </nav>
      </header>
      {children}
      <footer className="footer" style={{ marginTop: 24 }}>
        <div
          className="grid"
          style={{
            gap: 8,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          <div>
            <div>
              <strong>Teléfono:</strong>{" "}
              <a href="tel:+56722904717">722904717</a>
            </div>
            <div>
              <strong>WhatsApp:</strong>{" "}
              <a
                href="https://wa.me/56961900401"
                target="_blank"
                rel="noreferrer"
              >
                +56 9 6190 0401
              </a>
            </div>
            <div>
              <strong>Dirección:</strong> Avenida Central 265, Villa Triana —
              Rancagua
            </div>
          </div>
          <div>
            <div>
              <strong>Urgencias:</strong> 24/7
            </div>
            <div>
              <strong>Consulta a domicilio:</strong> 09:00–18:30
            </div>
            <div className="small">
              Política de cancelación: 24h · Anticipo 50% (demo)
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservar" element={<Reserve />} />
          <Route path="/portal" element={<MagicLink />} />
          <Route path="/m/:token" element={<Portal />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);
