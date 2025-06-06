import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/api/mysql";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const empresaId = Number(params.id);
    const { origen, destino, duracion, precio } = await req.json();

    let origenId = origen.id;
    let destinoId = destino.id;

    // Si el origen no existe, lo creamos
    if (!origenId && origen.nombre) {
      const [result]: any = await db.query(
        "INSERT INTO ciudad (nombre) VALUES (?)",
        [origen.nombre]
      );
      origenId = result.insertId;
    }

    // Si el destino no existe, lo creamos
    if (!destinoId && destino.nombre) {
      const [result]: any = await db.query(
        "INSERT INTO ciudad (nombre) VALUES (?)",
        [destino.nombre]
      );
      destinoId = result.insertId;
    }

    // Verifica si ya existe la ruta entre esas ciudades
    let rutaId: number | undefined;
    const [rutaRows]: any = await db.query(
      "SELECT id FROM ruta WHERE origen_id = ? AND destino_id = ?",
      [origenId, destinoId]
    );
    if (rutaRows.length > 0) {
      rutaId = rutaRows[0].id;
    } else {
      // Si no existe, la creamos
      const [rutaResult]: any = await db.query(
        "INSERT INTO ruta (origen_id, destino_id) VALUES (?, ?)",
        [origenId, destinoId]
      );
      rutaId = rutaResult.insertId;
    }

    // inserta la nueva ruta en la tabla empresa_ruta
    await db.query(
      "INSERT INTO empresa_ruta (empresa_id, ruta_id, duracion, precio) VALUES (?, ?, ?, ?)",
      [empresaId, rutaId, duracion, precio]
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al registrar la ruta" }, { status: 500 });
  }
}