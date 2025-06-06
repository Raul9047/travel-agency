"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plane } from "lucide-react"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import Link from "next/link"


export default function NuevaAerolineaPage() {

  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [baseCiudad, setBaseCiudad] = useState("");

  const [otraCiudad, setOtraCiudad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");

    let ciudadObj: any = {};
    if (baseCiudad === "otro") {
      if (!otraCiudad.trim()) {
        setMensaje("Por favor, introduce una ciudad válida.");
        return;
      }
      ciudadObj = { nombre: otraCiudad };
    }
    else {
      ciudadObj = { id : Number(baseCiudad) };
    }

    try {
      const res = await fetch("/api/empresa", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          nombre,
          tipo,
          descripcion,
          ciudad: ciudadObj
        })
      });
      const data = await res.json();
      if (data.ok) {
        setShowDialog(true);
        setNombre("");
        setTipo("");
        setBaseCiudad("");
        setOtraCiudad("");
        setDescripcion("");
      } else {
        setMensaje(data.error || "Error al registrar la empresa.");
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor.");
    }
  };

  const [ciudades, setCiudades] = useState<{id: number, nombre: string}[]>([]);
  useEffect(() => {
    fetch("/api/empresa?tipo=ciudad").then(res => res.json()).then(data => {
      if (data.ciudades) setCiudades(data.ciudades);
    });
  }, []);

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
            <h1 className="text-3xl font-bold tracking-tight mb-2">Registrar Nueva Empresa</h1>
            <p className="text-muted-foreground">
              Completa la información para agregar una nueva empresa a nuestra red
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5 text-sky-500" />
                  Información de la Empresa
                </CardTitle>
                <CardDescription>Proporciona los detalles de la nueva empresa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre de la Empresa</Label>
                      <Input id="nombre" value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Ej: AeroSur" className="w-full" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tipo">Tipo de Empresa</Label>
                      <Select value={tipo} onValueChange={setTipo}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aerea">Aérea</SelectItem>
                          <SelectItem value="terrestre">Terrestre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="tipo">Base de la empresa</Label>
                      <Select value={baseCiudad} onValueChange={setBaseCiudad}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar ciudad"/>
                        </SelectTrigger>
                        <SelectContent>
                          {ciudades.map(ciudad => (
                            <SelectItem key={ciudad.id} value={String(ciudad.id)}>
                              {ciudad.nombre}
                            </SelectItem>
                          ))}
                          <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {baseCiudad === "otro" ? (
                      <div className="space-y-2">
                        <Label htmlFor="otraCiudad">Introduce la ciudad base</Label>
                        <Input id="otraCiudad" value={otraCiudad} onChange={e => setOtraCiudad(e.target.value)}
                          placeholder="Ej: Cobija" required
                        />
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descripcion">Descripción</Label>
                    <Textarea
                      id="descripcion" value={descripcion} onChange={e => setDescripcion(e.target.value)}
                      placeholder="Breve descripción de la aerolínea, su historia, servicios, etc."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button className="flex-1" type="submit">Registrar Empresa</Button>
                    <Button variant="outline" asChild>
                      <Link href="/empresas">Cancelar</Link>
                    </Button>
                  </div>
                </form>
                <Dialog open={showDialog} onOpenChange={setShowDialog}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>¡Empresa registrada!</DialogTitle>
                    </DialogHeader>
                    <p>La empresa se registró exitosamente.</p>
                    <DialogFooter>
                      <Button onClick={() => setShowDialog(false)}>Aceptar</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
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
