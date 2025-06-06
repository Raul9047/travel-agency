import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/api/mysql";

export async function POST(req: NextRequest) {
  try {
    const { nombre, tipo, descripcion, ciudad } = await req.json();

    let ciudadId = ciudad.id;

    // Si no hay id, registrar la ciudad y obtener su id
    if (!ciudadId && ciudad.nombre) {
      const [result]: any = await db.query(
        "INSERT INTO ciudad (nombre) VALUES (?)",
        [ciudad.nombre]
      );
      ciudadId = result.insertId;
    }

    // Registrar la empresa
    const [empresaResult]: any = await db.query(
      "INSERT INTO empresa (nombre, tipo, descripcion, id_ciudad) VALUES (?, ?, ?, ?)",
      [nombre, tipo, descripcion, ciudadId]
    );

    return NextResponse.json({ ok: true, empresaId: empresaResult.insertId, ciudadId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al registrar la empresa" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const tipo = req.nextUrl.searchParams.get("tipo");

    if (tipo === "ciudad") {
      const [rows]: any = await db.query("SELECT * FROM ciudad ORDER BY nombre");
      return NextResponse.json({ ciudades: rows });
    } else {
      const [rows]: any = await db.query(
        `SELECT e.id, e.nombre, e.tipo, e.descripcion, c.nombre AS ciudad_base
         FROM empresa e
         JOIN ciudad c ON e.id_ciudad = c.id ORDER BY e.nombre`
      );
      return NextResponse.json({ empresas: rows });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener datos" }, { status: 500 });
  }
}