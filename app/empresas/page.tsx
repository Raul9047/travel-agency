"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Plane, Plus, Search } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    fetch("/api/empresa")
      .then(res => res.json())
      .then(data => {
        if (data.empresas) setEmpresas(data.empresas);
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
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Empresas</h1>
                <p className="text-muted-foreground">Explora todas las empresas disponibles y sus rutas</p>
              </div>
              <Button className="gap-2" asChild>
                <Link href="/empresas/nueva">
                  <Plus className="h-4 w-4" />
                  Registrar Empresa
                </Link>
              </Button>
            </div>
          </div>

          <div className="w-full px-4 mb-8">
            <div className="flex items-center w-full max-w-1xl mx-auto space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar empresa..." className="pl-8 w-full" />
              </div>
              <Button className="shrink-0">Buscar</Button>
            </div>
          </div>

          <Tabs defaultValue="todas" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="todas">Todas</TabsTrigger>
              <TabsTrigger value="terrestres">Terrestres</TabsTrigger>
              <TabsTrigger value="aereos">Aéreos</TabsTrigger>
            </TabsList>

            <TabsContent value="todas">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {empresas.map((empresa) => (
                  <Card key={empresa.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Plane className="h-5 w-5 text-sky-500" />
                        {empresa.nombre}
                      </CardTitle>
                      <CardDescription>{empresa.descripcion}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Base principal:</h4>
                          <div className="text-sm">{empresa.ciudad_base}</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href={`/empresas/${empresa.id}`}>Ver Detalles y Rutas</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="terrestres">
              <Card>
                <CardHeader>
                  <CardTitle>Empresas Terrestres</CardTitle>
                  <CardDescription>Mostrando empresas terrestres</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Empresa</TableHead>
                        <TableHead>Base Principal</TableHead>
                        <TableHead>Descripción</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {empresas
                        .filter((empresa) => empresa.tipo === "terrestre")
                        .map((empresa) => (
                          <TableRow key={empresa.id}>
                            <TableCell className="font-medium">{empresa.nombre}</TableCell>
                            <TableCell>{empresa.ciudad_base}</TableCell>
                            <TableCell>{empresa.descripcion}</TableCell> {/* Puedes poner aquí la cantidad de rutas si la tienes */}                            
                            <TableCell>
                              <Button size="sm" asChild>
                                <Link href={`/empresas/${empresa.id}`}>Ver</Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="aereos">
              <Card>
                <CardHeader>
                  <CardTitle>Empresas Aéreas</CardTitle>
                  <CardDescription>Mostrando empresas aéreas</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Empresa</TableHead>
                        <TableHead>Base principal</TableHead>
                        <TableHead>Descripción</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {empresas
                        .filter((empresa) => empresa.tipo === "aerea")
                        .map((empresa) => (
                          <TableRow key={empresa.id}>
                            <TableCell className="font-medium">{empresa.nombre}</TableCell>
                            <TableCell>{empresa.ciudad_base}</TableCell>
                            <TableCell>{empresa.descripcion}</TableCell> {/* Puedes poner aquí la cantidad de rutas si la tienes */}                            
                            <TableCell>
                              <Button size="sm" asChild>
                                <Link href={`/empresas/${empresa.id}`}>Ver</Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
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
