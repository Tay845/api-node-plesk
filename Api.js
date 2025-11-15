const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
  host: "tiusr36pl.cuc-carrera-ti.ac.cr",
  user: "ProyectoDB",
  password: "Proyecto_SQL",  // ← CORREGIDO
  database: "BecasDB",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error conectando a MySQL:", err);
    return;
  }
  console.log("✅ Conectado a MySQL");
});

// ✔ Página principal
app.get("/", (req, res) => {
  res.json({ mensaje: "API Node.js funcionando correctamente en Render" });
});

// ✔ Test básico
app.get("/test", (req, res) => {
  db.query("SELECT 1 + 1 AS resultado", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ resultado: rows });
  });
});

// ✔ INSERT corregido a POST
app.post("/insert-test", (req, res) => {
  const sql = `
    INSERT INTO usuarios (correo, pass_hash, nombre, rol)
    VALUES ('render@test.com', 'hash123', 'Usuario Render', 'estudiante')
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ estado: "Insert OK", result });
  });
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
