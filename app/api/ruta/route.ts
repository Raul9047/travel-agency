import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/api/mysql";

export async function GET(req: NextRequest) {
  try {
    const empresaId = req.nextUrl.searchParams.get("empresa_id");

    const [rutas]: any = await db.query(
      `SELECT 
          r.id,
          c1.nombre AS origen,
          c2.nombre AS destino,
          er.duracion,
          er.precio,
          e.nombre AS empresa,
          e.tipo
        FROM empresa_ruta er
        JOIN empresa e ON er.empresa_id = e.id
        JOIN ruta r ON er.ruta_id = r.id
        JOIN ciudad c1 ON r.origen_id = c1.id
        JOIN ciudad c2 ON r.destino_id = c2.id
        ORDER BY origen, destino, empresa`
    );

    const [empresas]: any = await db.query(
      `SELECT id, nombre, tipo FROM empresa ORDER BY nombre`
    );

    const ciudadesQuery = `
      SELECT DISTINCT c.id, c.nombre
      FROM ciudad c
      JOIN ruta r ON c.id = r.origen_id
      JOIN empresa_ruta er ON er.ruta_id = r.id
      WHERE (? IS NULL OR er.empresa_id = ?)

      UNION

      SELECT DISTINCT c.id, c.nombre
      FROM ciudad c
      JOIN ruta r ON c.id = r.destino_id
      JOIN empresa_ruta er ON er.ruta_id = r.id
      WHERE (? IS NULL OR er.empresa_id = ?)

      ORDER BY nombre;
    `;

    const params = [empresaId, empresaId, empresaId, empresaId];

    const [ciudades]: any = await db.query(ciudadesQuery, params);

    return NextResponse.json({ rutas, empresas, ciudades });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener las rutas" }, { status: 500 });
  }
}
