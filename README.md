
# Demo · Semana + "Ver más horas" (Netlify)

Flujo de reservas con anticipo 50% y política 24h. UI:
- Franja de **7 días** (desde hoy), con flechas ±7 días.
- Tarjetas de especialistas con 4 horas rápidas y botón **Ver más horas**.
- Modal con todas las horas del día y calendario ilustrativo.
- Portal cliente por magic link y cancelación con regla 24h.

## Deploy en Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- SPA: ya incluye `netlify.toml` y `public/_redirects`.

## Local
```bash
npm install
npm run dev
```
