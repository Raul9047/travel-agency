"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plane, MapPin, Users, Globe } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogHeader } from "@/components/ui/dialog"

export default function EmpresaDetallesPage() {
  const params = useParams();
  const id = params.id as string;
  const [empresa, setEmpresa] = useState<any>(null);
  const [rutas, setRutas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [ciudadOrigen, setCiudadOrigen] = useState("");
  const [otraCiudadOrigen, setOtraCiudadOrigen] = useState("");
  const [ciudadDestino, setCiudadDestino] = useState("");
  const [otraCiudadDestino, setOtraCiudadDestino] = useState("");
  const [duracion, setDuracion] = useState("");
  const [precio, setPrecio] = useState("");
  const [precioMin, setPrecioMinimo] = useState<any>({});
  const [showDialog, setShowDialog] = useState(false);



  const [ciudades, setCiudades] = useState<{ id: number, nombre: string }[]>([]);

  useEffect(() => {
    fetch("/api/empresa?tipo=ciudad")
      .then(res => res.json())
      .then(data => {
        if (data.ciudades) setCiudades(data.ciudades);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/empresa/${id}`)
      .then(res => res.json())
      .then(data => {
        setEmpresa(data.empresa);
        setRutas(data.rutas);
        setPrecioMinimo(data.precios || {});
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-1">Cargando...</div>;
  if (!empresa) return <div className="p-2">Empresa no encontrada</div>;

  const handleAgregarRuta = async (e: React.FormEvent) => {
    e.preventDefault();
    let origenObj: any = {};
    if (ciudadOrigen === "otroOrigen") {
      if (!otraCiudadOrigen.trim()) return;
      origenObj = { nombre: otraCiudadOrigen };
    } else {
      origenObj = { id: Number(ciudadOrigen) };
    }

    let destinoObj: any = {};
    if (ciudadDestino === "otroDestino") {
      if (!otraCiudadDestino.trim()) return;
      destinoObj = { nombre: otraCiudadDestino };
    } else {
      destinoObj = { id: Number(ciudadDestino) };
    }

    const res = await fetch(`/api/empresa/${id}/ruta`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origen: origenObj, destino: destinoObj, duracion, precio,
      }),
    });

    if (res.ok) {
      setCiudadOrigen("");
      setOtraCiudadOrigen("");
      setCiudadDestino("");
      setOtraCiudadDestino("");
      setDuracion("");
      setPrecio("");
      fetch(`/api/empresa/${id}`)
        .then(res => res.json())
        .then(data => setRutas(data.rutas));
      setShowDialog(true);
    }    
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pl-3">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Plane className="h-6 w-6 text-sky-500" />
            <span>Raúl</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
            <Button variant="link" asChild>
              <Link href="/">Inicio</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/rutas">Rutas</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/empresas">Empresas</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1 pl-3">
        <section className="container py-10">
          <div className="mb-8">
            <Button variant="outline" size="sm" className="mb-4" asChild>
              <Link href="/empresas" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver a empresas
              </Link>
            </Button>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-sky-100 rounded-lg flex items-center justify-center">
                <Plane className="h-8 w-8 text-sky-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight"> {empresa.nombre} </h1>
                <p className="text-muted-foreground"> {empresa.descripcion} </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 mb-10">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-sky-500" />
                    Información General
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-1">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Base Principal:</span>
                        <span className="font-medium"> {empresa.ciudad_base} </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Tipo:</span>
                        <Badge variant="secondary"> {empresa.tipo} </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-sky-500" />
                  Estadísticas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sky-600">{rutas.length}</div>
                    <div className="text-sm text-muted-foreground">Rutas Disponibles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sky-600">
                      {precioMin.precio_min !== null && precioMin.precio_min !== undefined
                        ? `Bs. ${Number(precioMin.precio_min).toLocaleString()}`
                        : "—"}
                    </div>
                    <div className="text-sm text-muted-foreground">Precio Mínimo (BOL)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <div className="space-y-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-sky-500" />
                  Registrar Ruta
                </CardTitle>
                <CardDescription>Registrar una nueva ruta de la empresa {empresa.nombre}</CardDescription>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="space-y-4">
                  <form onSubmit={handleAgregarRuta}>
                    <div className="grid gap-4 md:grid-cols-4 items-end">
                      {/* Origen */}
                      <div className="space-y-2">
                        <Label htmlFor="origen">Origen</Label>
                        <Select value={ciudadOrigen} onValueChange={setCiudadOrigen}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar ciudad" />
                          </SelectTrigger>
                          <SelectContent>
                            {ciudades.map(ciudad => (
                              <SelectItem key={ciudad.id} value={String(ciudad.id)}>
                                {ciudad.nombre}
                              </SelectItem>
                            ))}
                            <SelectItem value="otroOrigen">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                        {ciudadOrigen === "otroOrigen" && (
                          <Input
                            id="otraCiudadOrigen" value={otraCiudadOrigen} onChange={e => setOtraCiudadOrigen(e.target.value)}
                            placeholder="Ej: Cobija" required className="mt-2"
                          />
                        )}
                      </div>

                      {/* Destino */}
                      <div className="space-y-2">
                        <Label htmlFor="destino">Destino</Label>
                        <Select value={ciudadDestino} onValueChange={setCiudadDestino}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar ciudad" />
                          </SelectTrigger>
                          <SelectContent>
                            {ciudades.map(ciudad => (
                              <SelectItem key={ciudad.id} value={String(ciudad.id)}>
                                {ciudad.nombre}
                              </SelectItem>
                            ))}
                            <SelectItem value="otroDestino">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                        {ciudadDestino === "otroDestino" && (
                          <Input
                            id="otraCiudadDestino" value={otraCiudadDestino} onChange={e => setOtraCiudadDestino(e.target.value)}
                            placeholder="Ej: San Miguel" required className="mt-2"
                          />
                        )}
                      </div>

                      {/* Duración */}
                      <div className="space-y-2">
                        <Label htmlFor="duracion">Duración</Label>
                        <Input id="duracion" value={duracion} onChange={e => setDuracion(e.target.value)}
                        placeholder="Ej: 10:30:00" className="w-full" required
                      />
                      </div>

                      {/* Precio */}
                      <div className="space-y-2">
                        <Label htmlFor="precio">Precio (BOL)</Label>
                        <Input
                          id="precio" type="number" value={precio} onChange={e => setPrecio(e.target.value)}
                          placeholder="Ej: 150" className="w-full" required
                        />
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4" type="submit">
                      + Agregar otra ruta
                    </Button>
                  </form>
                </div>
              </CardContent>
              
              <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>¡Ruta registrada!</DialogTitle>
                  </DialogHeader>
                  <p>La ruta se guardó exitosamente.</p>
                  <DialogFooter>
                    <Button onClick={() => setShowDialog(false)}>Aceptar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-sky-500" />
                Rutas
              </CardTitle>
            <CardDescription>Todas las rutas disponibles operadas por {empresa.nombre}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Origen</TableHead>
                    <TableHead>Destino</TableHead>
                    <TableHead>Tiempo Hrs.</TableHead>
                    <TableHead className="text-right">Precio Bs.</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rutas.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        No hay rutas registradas para esta empresa.
                      </TableCell>
                    </TableRow>
                  ) : (
                    rutas.map((ruta) => (
                      <TableRow key={ruta.id}>
                        <TableCell>{ruta.origen}</TableCell>
                        <TableCell>{ruta.destino}</TableCell>
                        <TableCell>{ruta.duracion}</TableCell>
                        <TableCell className="text-right">{ruta.precio}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-muted/40">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          &copy; 2025 Raúl. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}
