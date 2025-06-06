import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Filter, Plane, Search } from "lucide-react"
import Link from "next/link"

export default function RutasPage() {
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
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar empresa" />
                    </SelectTrigger>
                    <SelectContent>                  
                      <SelectItem value="mex">Ciudad de México (MEX)</SelectItem>
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
                      <SelectItem value="precioNo">No</SelectItem>
                      <SelectItem value="precioSi">Si</SelectItem>
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
                      <SelectItem value="mex">Ciudad de México (MEX)</SelectItem>
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
                      <SelectItem value="mad">Madrid (MAD)</SelectItem>
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
                <TabsTrigger value="nacionales">Terrestres</TabsTrigger>
                <TabsTrigger value="internacionales">Aéreos</TabsTrigger>
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
                  <CardDescription>Mostrando 50 rutas desde diferentes aeropuertos de origen</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Origen</TableHead>
                        <TableHead>Destino</TableHead>
                        <TableHead>Duración</TableHead>
                        <TableHead>Empresa</TableHead>
                        <TableHead className="text-right">Precio desde</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Ciudad de México</div>
                          <div className="text-sm text-muted-foreground">MEX</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">Madrid</div>
                          <div className="text-sm text-muted-foreground">MAD</div>
                        </TableCell>
                        <TableCell>10h 30m</TableCell>
                        <TableCell>Iberia, Aeroméxico</TableCell>
                        <TableCell className="text-right font-bold text-sky-600">$12,500 MXN</TableCell>
                        <TableCell>
                          <Button size="sm">Ver</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Cancún</div>
                          <div className="text-sm text-muted-foreground">CUN</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">Nueva York</div>
                          <div className="text-sm text-muted-foreground">JFK</div>
                        </TableCell>
                        <TableCell>4h 15m</TableCell>
                        <TableCell>American, JetBlue</TableCell>
                        <TableCell className="text-right font-bold text-sky-600">$8,200 MXN</TableCell>
                        <TableCell>
                          <Button size="sm">Ver</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Guadalajara</div>
                          <div className="text-sm text-muted-foreground">GDL</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">Los Ángeles</div>
                          <div className="text-sm text-muted-foreground">LAX</div>
                        </TableCell>
                        <TableCell>3h 45m</TableCell>
                        <TableCell>Volaris, Delta</TableCell>
                        <TableCell className="text-right font-bold text-sky-600">$6,800 MXN</TableCell>
                        <TableCell>
                          <Button size="sm">Ver</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Monterrey</div>
                          <div className="text-sm text-muted-foreground">MTY</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">Chicago</div>
                          <div className="text-sm text-muted-foreground">ORD</div>
                        </TableCell>
                        <TableCell>4h 05m</TableCell>
                        <TableCell>United, Aeroméxico</TableCell>
                        <TableCell className="text-right font-bold text-sky-600">$7,500 MXN</TableCell>
                        <TableCell>
                          <Button size="sm">Ver</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Ciudad de México</div>
                          <div className="text-sm text-muted-foreground">MEX</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">Bogotá</div>
                          <div className="text-sm text-muted-foreground">BOG</div>
                        </TableCell>
                        <TableCell>4h 50m</TableCell>
                        <TableCell>Avianca, Aeroméxico</TableCell>
                        <TableCell className="text-right font-bold text-sky-600">$9,300 MXN</TableCell>
                        <TableCell>
                          <Button size="sm">Ver</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Tijuana</div>
                          <div className="text-sm text-muted-foreground">TIJ</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">Ciudad de México</div>
                          <div className="text-sm text-muted-foreground">MEX</div>
                        </TableCell>
                        <TableCell>3h 25m</TableCell>
                        <TableCell>Volaris, VivaAerobus</TableCell>
                        <TableCell className="text-right font-bold text-sky-600">$2,100 MXN</TableCell>
                        <TableCell>
                          <Button size="sm">Ver</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" disabled>
                    Anterior
                  </Button>
                  <div className="text-sm text-muted-foreground">Página 1 de 9</div>
                  <Button variant="outline">Siguiente</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="nacionales">
              <Card>
                <CardHeader>
                  <CardTitle>Rutas nacionales</CardTitle>
                  <CardDescription>Mostrando rutas entre aeropuertos dentro de México</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Origen</TableHead>
                        <TableHead>Destino</TableHead>
                        <TableHead>Duración</TableHead>
                        <TableHead>Empresa</TableHead>
                        <TableHead className="text-right">Precio desde</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Ciudad de México</div>
                          <div className="text-sm text-muted-foreground">MEX</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">Cancún</div>
                          <div className="text-sm text-muted-foreground">CUN</div>
                        </TableCell>
                        <TableCell>2h 15m</TableCell>
                        <TableCell>Aeroméxico, Volaris, VivaAerobus</TableCell>
                        <TableCell className="text-right font-bold text-sky-600">$1,800 MXN</TableCell>
                        <TableCell>
                          <Button size="sm">Ver</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Guadalajara</div>
                          <div className="text-sm text-muted-foreground">GDL</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">Monterrey</div>
                          <div className="text-sm text-muted-foreground">MTY</div>
                        </TableCell>
                        <TableCell>1h 45m</TableCell>
                        <TableCell>Volaris, VivaAerobus</TableCell>
                        <TableCell className="text-right font-bold text-sky-600">$1,500 MXN</TableCell>
                        <TableCell>
                          <Button size="sm">Ver</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Tijuana</div>
                          <div className="text-sm text-muted-foreground">TIJ</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">Ciudad de México</div>
                          <div className="text-sm text-muted-foreground">MEX</div>
                        </TableCell>
                        <TableCell>3h 25m</TableCell>
                        <TableCell>Volaris, VivaAerobus</TableCell>
                        <TableCell className="text-right font-bold text-sky-600">$2,100 MXN</TableCell>
                        <TableCell>
                          <Button size="sm">Ver</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" disabled>
                    Anterior
                  </Button>
                  <div className="text-sm text-muted-foreground">Página 1 de 5</div>
                  <Button variant="outline">Siguiente</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="internacionales">
              <Card>
                <CardHeader>
                  <CardTitle>Rutas internacionales</CardTitle>
                  <CardDescription>Mostrando rutas desde México hacia destinos internacionales</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Origen</TableHead>
                        <TableHead>Destino</TableHead>
                        <TableHead>Duración</TableHead>
                        <TableHead>Empresa</TableHead>
                        <TableHead className="text-right">Precio desde</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Ciudad de México</div>
                          <div className="text-sm text-muted-foreground">MEX</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">Madrid</div>
                          <div className="text-sm text-muted-foreground">MAD</div>
                        </TableCell>
                        <TableCell>10h 30m</TableCell>
                        <TableCell>Iberia, Aeroméxico</TableCell>
                        <TableCell className="text-right font-bold text-sky-600">$12,500 MXN</TableCell>
                        <TableCell>
                          <Button size="sm">Ver</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Cancún</div>
                          <div className="text-sm text-muted-foreground">CUN</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">Nueva York</div>
                          <div className="text-sm text-muted-foreground">JFK</div>
                        </TableCell>
                        <TableCell>4h 15m</TableCell>
                        <TableCell>American, JetBlue</TableCell>
                        <TableCell className="text-right font-bold text-sky-600">$8,200 MXN</TableCell>
                        <TableCell>
                          <Button size="sm">Ver</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Guadalajara</div>
                          <div className="text-sm text-muted-foreground">GDL</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">Los Ángeles</div>
                          <div className="text-sm text-muted-foreground">LAX</div>
                        </TableCell>
                        <TableCell>3h 45m</TableCell>
                        <TableCell>Volaris, Delta</TableCell>
                        <TableCell className="text-right font-bold text-sky-600">$6,800 MXN</TableCell>
                        <TableCell>
                          <Button size="sm">Ver</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" disabled>
                    Anterior
                  </Button>
                  <div className="text-sm text-muted-foreground">Página 1 de 7</div>
                  <Button variant="outline">Siguiente</Button>
                </CardFooter>
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
