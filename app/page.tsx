import { Plane, MapPin, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function TravelAgency() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center pl-3">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Plane className="h-6 w-6 text-sky-500" />
            <span>Raúl</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
            <Button variant="link">Inicio</Button>
            <Button variant="link" asChild>
              <Link href="/rutas">Rutas</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/empresas">Empresas</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-sky-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Descubre el mundo con nosotros
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Encuentra los mejores vuelos a los destinos más increíbles. Compara precios, rutas y horarios.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row"></div>
            </div>
          </div>
        </section>

        <section className="container px-4 py-12 md:px-6">
          <Card className="mx-auto max-w-4xl">
            <CardContent className="p-6">
              <div className="w-full">
                <h3 className="text-xl font-semibold mb-6">Buscar Rutas</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Origen
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Select>
                        <SelectTrigger className="w-full pl-8">
                          <SelectValue placeholder="Seleccionar origen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mex">San Ignacio de Velasco (SC)</SelectItem>
                          <SelectItem value="gdl">Guadalajara (GDL)</SelectItem>
                          <SelectItem value="cun">Cancún (CUN)</SelectItem>
                          <SelectItem value="mty">Monterrey (MTY)</SelectItem>
                          <SelectItem value="tij">Tijuana (TIJ)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Destino
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Select>
                        <SelectTrigger className="w-full pl-8">
                          <SelectValue placeholder="Seleccionar destino" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mad">Madrid (MAD)</SelectItem>
                          <SelectItem value="jfk">Nueva York (JFK)</SelectItem>
                          <SelectItem value="lax">Los Ángeles (LAX)</SelectItem>
                          <SelectItem value="bog">Bogotá (BOG)</SelectItem>
                          <SelectItem value="scl">Santiago (SCL)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <Button className="mt-6 w-full">Buscar ruta</Button>
              </div>
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
