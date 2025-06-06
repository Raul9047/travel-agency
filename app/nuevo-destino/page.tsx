import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plane, MapPin, Globe } from "lucide-react"
import Link from "next/link"

export default function NuevoDestinoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Plane className="h-6 w-6 text-sky-500" />
            <span>Raúl</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Button variant="link" asChild>
              <Link href="/">Inicio</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/rutas">Rutas</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/empresas">puto</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="container py-10">
          <div className="mb-8">
            <Button variant="outline" size="sm" className="mb-4" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Agregar Nuevo Destino</h1>
            <p className="text-muted-foreground">
              Completa la información para agregar un nuevo destino a nuestra red de viajes
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-sky-500" />
                  Información del Destino
                </CardTitle>
                <CardDescription>Proporciona los detalles del nuevo destino que deseas agregar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="ciudad">Ciudad</Label>
                    <Input id="ciudad" placeholder="Ej: Barcelona" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pais">País</Label>
                    <Input id="pais" placeholder="Ej: España" className="w-full" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción del Destino</Label>
                  <Textarea
                    id="descripcion"
                    placeholder="Describe las características principales del destino, atracciones turísticas, clima, etc."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="continente">Continente</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar continente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-norte">América del Norte</SelectItem>
                      <SelectItem value="america-sur">América del Sur</SelectItem>
                      <SelectItem value="europa">Europa</SelectItem>
                      <SelectItem value="asia">Asia</SelectItem>
                      <SelectItem value="africa">África</SelectItem>
                      <SelectItem value="oceania">Oceanía</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aerolineas">Aerolíneas Disponibles</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar aerolíneas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aeromexico">Aeroméxico</SelectItem>
                      <SelectItem value="volaris">Volaris</SelectItem>
                      <SelectItem value="vivaaerobus">VivaAerobus</SelectItem>
                      <SelectItem value="iberia">Iberia</SelectItem>
                      <SelectItem value="air-europa">Air Europa</SelectItem>
                      <SelectItem value="lufthansa">Lufthansa</SelectItem>
                      <SelectItem value="american">American Airlines</SelectItem>
                      <SelectItem value="delta">Delta Airlines</SelectItem>
                      <SelectItem value="united">United Airlines</SelectItem>
                      <SelectItem value="avianca">Avianca</SelectItem>
                      <SelectItem value="copa">Copa Airlines</SelectItem>
                      <SelectItem value="jetblue">JetBlue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button className="flex-1">Agregar Destino</Button>
                  <Button variant="outline" asChild>
                    <Link href="/">Cancelar</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container py-10 border-t">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-sky-500" />
                  Vista Previa
                </CardTitle>
                <CardDescription>Así se verá el destino en nuestra plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-muted/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                      <Plane className="h-6 w-6 text-sky-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Nuevo Destino</h3>
                      <p className="text-sm text-muted-foreground">País • Código IATA</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duración de vuelo:</span>
                      <span>--</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Precio desde:</span>
                      <span className="font-bold text-sky-600">-- MXN</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" size="sm">
                    Ver Detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/40">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          &copy; 2023 SkyTravel. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}
