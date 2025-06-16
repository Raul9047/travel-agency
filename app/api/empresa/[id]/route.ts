import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/api/mysql";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    const id = context.params.id;
    // Obtener datos de la empresa
    const [empresaRows]: any = await db.query(
      `SELECT e.id, e.nombre, e.tipo, e.descripcion, c.nombre AS ciudad_base
       FROM empresa e
       JOIN ciudad c ON e.id_ciudad = c.id
       WHERE e.id = ? ORDER BY nombre`, [id]
    );
    if (!empresaRows.length) {
      return NextResponse.json({ error: "Empresa no encontrada" }, { status: 404 });
    }
    // Obtener rutas de la empresa
    const [rutas]: any = await db.query(
      `SELECT r.id, c1.nombre AS origen, c2.nombre AS destino, er.duracion, er.precio
       FROM empresa_ruta er
       JOIN ruta r ON er.ruta_id = r.id
       JOIN ciudad c1 ON r.origen_id = c1.id
       JOIN ciudad c2 ON r.destino_id = c2.id
       WHERE er.empresa_id = ?`, [id]
    );
    //  Obtener el precio minimo de la empresa de alguna ruta
    const [precioMinimo]: any = await db.query(
      `SELECT MIN(er.precio) as precio_min, MAX(er.precio) as precio_max, AVG(er.precio) as precio_avg
      FROM empresa_ruta er WHERE er.empresa_id = ?`, [id]
   );

    return NextResponse.json({ empresa: empresaRows[0], rutas , precios: precioMinimo[0] });
    
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener la empresa" }, { status: 500 });
  }
}