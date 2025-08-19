import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { emailForToken, byEmail, setStatus, updateEmail } from "../storage";
import { hoursDiff, fmt, money } from "../utils";
export default function Portal() {
  const { token } = useParams();
  const email = emailForToken(token);
  const [tick, setTick] = useState(0);
  const items = useMemo(() => (email ? byEmail(email) : []), [email, tick]);
  function cancel(id, when) {
    const h = hoursDiff(when);
    if (!confirm(`¿Cancelar? Faltan ${h.toFixed(1)}h`)) return;
    if (h >= 24) {
      setStatus(id, "Cancelada a Tiempo", { refundEligible: true });
      alert("Cancelada a tiempo: reembolso/saldo a favor.");
    } else {
      setStatus(id, "NoShowPolicyRetained", { refundEligible: false });
      alert("Menos de 24h: retención anticipo.");
    }
    setTick((t) => t + 1);
  }
  if (!email)
    return (
      <div className="card">
        <h3>Token inválido</h3>
      </div>
    );
  return (
    <div className="card">
      <h2>Mis reservas</h2>
      <small>
        Titular: <b>{email}</b>
      </small>
      <table style={{ width: "100%", marginTop: 12 }}>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Especialista</th>
            <th>Monto</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan="5">
                <small>Sin reservas</small>
              </td>
            </tr>
          )}
          {items.map((r) => (
            <tr key={r.id}>
              <td>{fmt(r.datetimeISO)}</td>
              <td>{r.specialistName}</td>
              <td>
                {money(r.price)} · 50% {money(r.deposit)}
              </td>
              <td>{r.status}</td>
              <td>
                {r.status === "Activa" && (
                  <button
                    className="btn secondary"
                    onClick={() => cancel(r.id, r.datetimeISO)}
                  >
                    Cancelar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <details style={{ marginTop: 12 }}>
        <summary>
          <small>Cambiar correo (demo admin)</small>
        </summary>
        <form
          className="row"
          onSubmit={(e) => {
            e.preventDefault();
            const n = prompt("Nuevo correo:");
            if (!n) return;
            updateEmail(email, n);
            alert("Actualizado. Solicita nuevo enlace con el correo nuevo.");
          }}
        >
          <button className="btn secondary" type="submit">
            Cambiar
          </button>
        </form>
      </details>
    </div>
  );
}
