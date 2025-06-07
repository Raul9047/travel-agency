import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/api/mysql";

export async function GET(req: NextRequest) {
  try {
    const [rutas]: any = await db.query(
      `SELECT 
          r.id,
          c1.nombre AS origen,
          c2.nombre AS destino,
          er.duracion,
          er.precio,
          e.nombre AS empresa
        FROM empresa_ruta er
        JOIN empresa e ON er.empresa_id = e.id
        JOIN ruta r ON er.ruta_id = r.id
        JOIN ciudad c1 ON r.origen_id = c1.id
        JOIN ciudad c2 ON r.destino_id = c2.id
        ORDER BY origen, destino, empresa`
    );

    return NextResponse.json({ rutas });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener las rutas" }, { status: 500 });
  }
}