import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  emailForToken,
  getReservationsByEmail,
  setReservationStatus,
  updateCustomerEmail,
} from "../storage";
import { fmtDateTime, hoursDiff, money } from "../utils";
export default function Portal() {
  const { token } = useParams();
  const email = emailForToken(token);
  const [refresh, setRefresh] = useState(0);
  const [oldEmail, setOldEmail] = useState(email || "");
  const [newEmail, setNewEmail] = useState("");
  const items = useMemo(
    () => (email ? getReservationsByEmail(email) : []),
    [email, refresh]
  );
  function cancel(id, whenISO) {
    const h = hoursDiff(whenISO);
    if (!confirm(`¿Confirmas cancelar? Faltan ${h.toFixed(1)} h.`)) return;
    if (h >= 24) {
      setReservationStatus(id, "CanceladaATiempo", { refundEligible: true });
      alert("Cancelada a tiempo. Elegible para reembolso o saldo a favor.");
    } else {
      setReservationStatus(id, "Política de Inasistencia aplicada", {
        refundEligible: false,
      });
      alert("Cancelación con menos de 24h: anticipo no reembolsable.");
    }
    setRefresh((x) => x + 1);
  }
  function changeEmail(e) {
    e.preventDefault();
    if (!oldEmail || !newEmail) return;
    updateCustomerEmail(oldEmail, newEmail);
    alert(
      "Correo actualizado en demo. Vuelve a solicitar un magic link con el correo nuevo."
    );
  }
  if (!email)
    return (
      <div className="card">
        <h3>Token inválido o expirado</h3>
        <p className="small">Solicita un nuevo enlace en el portal.</p>
      </div>
    );
  return (
    <div className="card">
      <h2>Mis Reservas</h2>
      <p className="small">
        Titular: <strong>{email}</strong>
      </p>
      <table style={{ width: "100%", borderSpacing: 0 }}>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Especialista</th>
            <th>Valor/Anticipo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan="5" className="small">
                Sin reservas.
              </td>
            </tr>
          )}
          {items.map((r) => (
            <tr key={r.id}>
              <td>{fmtDateTime(r.datetimeISO)}</td>
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
      <hr />
      <details>
        <summary className="small">
          Cambiar correo del titular (demo admin)
        </summary>
        <form className="row" onSubmit={changeEmail} style={{ marginTop: 8 }}>
          <input
            placeholder="Correo actual"
            value={oldEmail}
            onChange={(e) => setOldEmail(e.target.value)}
          />
          <input
            placeholder="Correo nuevo"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button className="btn" type="submit">
            Actualizar
          </button>
        </form>
        <p className="small">
          Esto demuestra que el historial se puede mantener al cambiar el
          correo.
        </p>
      </details>
    </div>
  );
}
