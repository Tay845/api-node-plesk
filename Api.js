const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 🔥 CAMBIAR ESTO CON LOS DATOS DE TU BASE DE PLESK
const db = mysql.createConnection({
  host: "tiusr36pl.cuc-carrera-ti.ac.cr",
  user: "ProyectoDB",
  password: "Proyecto_SQLS",
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

app.get("/", (req, res) => {
  res.send("API Node.js corriendo correctamente en Render!");
});

// ✔ Ruta para probar conexión
app.get("/test", (req, res) => {
  db.query("SELECT 1 + 1 AS resultado", (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ resultado: rows });
  });
});

// ✔ Ruta para insert de prueba
app.get("/insert-test", (req, res) => {
  const sql = `INSERT INTO usuarios (nombre, email) VALUES ('Prueba Render', 'render@test.com')`;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ estado: "Insert OK", result });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
