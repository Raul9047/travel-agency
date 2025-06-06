import { db } from "../app/api/mysql";

async function testConnection() {
  try {
    const [rows] = await db.query("SELECT 1");
    console.log("Conexión exitosa a la base de datos:", rows);
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  } finally {
    db.end();
  }
}

testConnection();