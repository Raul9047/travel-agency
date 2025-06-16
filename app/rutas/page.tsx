"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Plane, Search } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function RutasPage() {
  
  const [ciudades, setCiudades] = useState<{id: number, nombre: string}[]>([]);
  const [empresas, setEmpresas] = useState<any[]>([]);

  const [rutas, setRutas] = useState<any[]>([]);
  const [pagina, setPagina] = useState(1);
  const pageSize = 5;


  const totalPaginas = Math.ceil(rutas.length / pageSize);
  const rutasPagina = rutas.slice((pagina - 1) * pageSize, pagina * pageSize);

  const rutasTerrestres = rutas.filter(ruta => ruta.tipo?.toLowerCase() === "terrestre");
  const rutasAereas = rutas.filter(ruta => ruta.tipo?.toLowerCase() === "aerea");

  const totalPaginasTerrestres = Math.ceil(rutasTerrestres.length / pageSize);
  const totalPaginasAereas = Math.ceil(rutasAereas.length / pageSize);
  const rutasPaginaTerrestres = rutasTerrestres.slice((pagina - 1) * pageSize, pagina * pageSize);
  const rutasPaginaAereas = rutasAereas.slice((pagina - 1) * pageSize, pagina * pageSize);

  const [empresaSeleccionada, setEmpresaSeleccionada] = useState<string | null>(null);

  useEffect(() => {
    let url = "/api/ruta";
    if (empresaSeleccionada) {
      url += `?empresa_id=${empresaSeleccionada}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setRutas(data.rutas || []);
        setEmpresas(data.empresas || []);
        setCiudades(data.ciudades || []);
      });
  }, [empresaSeleccionada]);

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
            <h1 className="text-3xl font-bold tracking-tight mb-2">Rutas y Destinos</h1>
            <p className="text-muted-foreground">
              Explora todas nuestras rutas disponibles y encuentra el mejor precio para tu próximo viaje
            </p>
          </div>

          <Card className="mb-10 ">
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-2 mb-6">

                <div className="space-y-2">
                  <label className="text-sm font-medium">Empresa</label>
                  <Select onValueChange={(value) => setEmpresaSeleccionada(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar empresa" />
                    </SelectTrigger>
                    <SelectContent>
                      {empresas.map(empresa => (
                        <SelectItem key={empresa.id} value={empresa.id.toString()}>
                          {empresa.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Precio</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tomar en cuenta el precio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="precioSi">Si</SelectItem>
                      <SelectItem value="precioNo">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Origen</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar origen" />
                    </SelectTrigger>
                    <SelectContent>
                      {ciudades.map(ciudad => (
                        <SelectItem key={ciudad.id} value={ciudad.id.toString()}>
                          {ciudad.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Destino</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar destino" />
                    </SelectTrigger>
                    <SelectContent>
                      {ciudades.map(ciudad => (
                        <SelectItem key={ciudad.id} value={ciudad.id.toString()}>
                          {ciudad.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-end">
                <Button className="w-full gap-2">
                  <Search className="h-4 w-4" />
                  Buscar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="todas" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="todas">Todos los tipos</TabsTrigger>
                <TabsTrigger value="terrestres">Terrestres</TabsTrigger>
                <TabsTrigger value="aereas">Aéreos</TabsTrigger>
              </TabsList>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtrar
              </Button>
            </div>

            <TabsContent value="todas">
              <Card>
                <CardHeader>
                  <CardTitle>Todas las rutas disponibles</CardTitle>
                  <CardDescription>Mostrando rutas desde diferentes origen</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Origen</TableHead>
                        <TableHead>Destino</TableHead>
                        <TableHead>Duración</TableHead>
                        <TableHead>Empresa</TableHead>
                        <TableHead className="text-right">Precio</TableHead>
                      </TableRow>
                    </TableHeader>
                   <TableBody>
                    {rutasPagina.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground">
                          No hay rutas registradas.
                        </TableCell>
                      </TableRow>
                    ) : (
                      rutasPagina.map((ruta) => (
                        <TableRow key={ruta.id}>
                          <TableCell>
                            <div className="font-medium">{ruta.origen}</div>
                            <div className="text-sm text-muted-foreground">{ruta.origen_codigo || ""}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{ruta.destino}</div>
                            <div className="text-sm text-muted-foreground">{ruta.destino_codigo || ""}</div>
                          </TableCell>
                          <TableCell>{ruta.duracion}</TableCell>
                          <TableCell>{ruta.empresa}</TableCell>
                          <TableCell className="text-right font-bold text-sky-600">
                            {ruta.precio ? `Bs. ${Number(ruta.precio).toLocaleString()}` : "—"}
                          </TableCell>
                          <TableCell>
                            <Button size="sm">Ver</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    disabled={pagina === 1}
                    onClick={() => setPagina(pagina - 1)}
                  >
                    Anterior
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Página {pagina} de {totalPaginas}
                  </div>
                  <Button
                    variant="outline"
                    disabled={pagina === totalPaginas}
                    onClick={() => setPagina(pagina + 1)}
                  >
                    Siguiente
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="terrestres">
              <Card>
                <CardHeader>
                  <CardTitle>Rutas terrestres</CardTitle>
                  <CardDescription>Mostrando rutas Terrestres</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Origen</TableHead>
                        <TableHead>Destino</TableHead>
                        <TableHead>Duración</TableHead>
                        <TableHead>Empresa</TableHead>
                        <TableHead className="text-right">Precio</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rutasPaginaTerrestres.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground">
                            No hay rutas terrestres registradas.
                          </TableCell>
                        </TableRow>
                      ) : (
                        rutasPaginaTerrestres.map((ruta) => (
                          <TableRow key={ruta.id}>
                            <TableCell>
                              <div className="font-medium">{ruta.origen}</div>
                              <div className="text-sm text-muted-foreground">{ruta.origen_codigo || ""}</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{ruta.destino}</div>
                              <div className="text-sm text-muted-foreground">{ruta.destino_codigo || ""}</div>
                            </TableCell>
                            <TableCell>{ruta.duracion}</TableCell>
                            <TableCell>{ruta.empresa}</TableCell>
                            <TableCell className="text-right font-bold text-sky-600">
                              {ruta.precio ? `Bs. ${Number(ruta.precio).toLocaleString()}` : "—"}
                            </TableCell> 
                            <TableCell>
                              <Button size="sm">Ver</Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                {rutasTerrestres.length > pageSize && (
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      disabled={pagina === 1}
                      onClick={() => setPagina(pagina - 1)}
                    >
                      Anterior
                    </Button>
                    <div className="text-sm text-muted-foreground">
                      Página {pagina} de {totalPaginasTerrestres}
                    </div>
                    <Button
                      variant="outline"
                      disabled={pagina === totalPaginasTerrestres}
                      onClick={() => setPagina(pagina + 1)}
                    >
                      Siguiente
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="aereas">
              <Card>
                <CardHeader>
                  <CardTitle>Rutas aéreas</CardTitle>
                  <CardDescription>Mostrando rutas Aéreas</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Origen</TableHead>
                        <TableHead>Destino</TableHead>
                        <TableHead>Duración</TableHead>
                        <TableHead>Empresa</TableHead>
                        <TableHead className="text-right">Precio</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rutasPaginaAereas.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground">
                            No hay rutas terrestres registradas.
                          </TableCell>
                        </TableRow>
                      ) : (
                        rutasPaginaAereas.map((ruta) => (
                          <TableRow key={ruta.id}>
                            <TableCell>
                              <div className="font-medium">{ruta.origen}</div>
                              <div className="text-sm text-muted-foreground">{ruta.origen_codigo || ""}</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{ruta.destino}</div>
                              <div className="text-sm text-muted-foreground">{ruta.destino_codigo || ""}</div>
                            </TableCell>
                            <TableCell>{ruta.duracion}</TableCell>
                            <TableCell>{ruta.empresa}</TableCell>
                            <TableCell className="text-right font-bold text-sky-600">
                              {ruta.precio ? `Bs. ${Number(ruta.precio).toLocaleString()}` : "—"}
                            </TableCell> 
                            <TableCell>
                              <Button size="sm">Ver</Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                {rutasAereas.length > pageSize && (
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      disabled={pagina === 1}
                      onClick={() => setPagina(pagina - 1)}
                    >
                      Anterior
                    </Button>
                    <div className="text-sm text-muted-foreground">
                      Página {pagina} de {totalPaginasAereas}
                    </div>
                    <Button
                      variant="outline"
                      disabled={pagina === totalPaginasAereas}
                      onClick={() => setPagina(pagina + 1)}
                    >
                      Siguiente
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
          </Tabs>
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
