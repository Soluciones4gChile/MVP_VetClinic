import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const testimonials = [
    {
      id: 1,
      name: "Carolina",
      text: "Excelente atención, lograron diagnosticar rápido a mi gatita.",
      avatar: "/avatars/a1.svg",
    },
    {
      id: 2,
      name: "Mauricio",
      text: "Me encantó poder reservar y cancelar con tiempo, muy serio.",
      avatar: "/avatars/a2.svg",
    },
    {
      id: 3,
      name: "Fernanda",
      text: "El laboratorio in-house fue clave para iniciar tratamiento el mismo día.",
      avatar: "/avatars/a3.svg",
    },
  ];

  return (
    <div>
      {/* HERO / BANNER */}
      <section
        className="card"
        style={{ padding: 0, overflow: "hidden", marginBottom: 16 }}
      >
        <img
          src="/banner.svg"
          alt="San Pablo Vet Clinic"
          style={{ width: "100%", display: "block" }}
        />
        <div style={{ padding: "18px" }}>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div>
              <h1 style={{ margin: "0 0 8px" }}>San Pablo Vet Clinic</h1>
              <p className="small">
                Cuidamos a tu familia peluda con especialistas y política de
                cancelación 24h.
              </p>
            </div>
            <div className="row" style={{ gap: 8 }}>
              <Link className="btn" to="/reservar">
                Reservar ahora
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="card">
        <h3>Lo que dicen nuestros clientes</h3>
        <div className="spec-grid" style={{ marginTop: 12 }}>
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="row"
              style={{
                gap: 12,
                alignItems: "flex-start",
                background: "#0f172a",
                border: "1px solid rgba(148,163,184,.2)",
                borderRadius: 14,
                padding: 12,
              }}
            >
              <img
                src={t.avatar}
                alt={t.name}
                width="54"
                height="54"
                style={{
                  borderRadius: 12,
                  border: "1px solid rgba(148,163,184,.2)",
                }}
              />
              <div>
                <strong style={{ display: "block" }}>{t.name}</strong>
                <span className="small">{t.text}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
