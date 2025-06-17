import { Grafo } from "./Grafo";

export class DiGrafo<T> extends Grafo<T> {
    constructor(listaDeVertices: Iterable<T> = []) {
        super(listaDeVertices);
    }

    public override insertarArista(origen: T, destino: T): void {
        if (this.existeAdyacencia(origen, destino)) {
            throw new Error("La Arista ya está insertada");
        }
        const idxOrigen = this.getNroVertice(origen);
        const idxDestino = this.getNroVertice(destino);
        let adyacentesDelOrigen : number[] = this.listaAdyacencias[idxOrigen];
        adyacentesDelOrigen.push(idxDestino);
        adyacentesDelOrigen.sort((a, b) => a - b);
    }

    public override eliminarArista(origen: T, destino: T): void {
        if (this.existeAdyacencia(origen, destino)) {
            const idxOrigen = this.getNroVertice(origen);
            const idxDestino = this.getNroVertice(destino);

            let adyacentesDelOrigen : number[] = this.listaAdyacencias[idxOrigen];
            const destinoEnOrigen = adyacentesDelOrigen.indexOf(idxDestino);
            if (destinoEnOrigen !== -1) {
                adyacentesDelOrigen.splice(destinoEnOrigen, 1);
            }
        }
    }

    public override cantidadDeAristas(): number {
        let cantidad = 0;
        for (const adyacentesAlVertice of this.listaAdyacencias) {
            cantidad += adyacentesAlVertice.length;
        }
        return cantidad;
    }

    public override gradoDelVertice(vertice: T) : number{
        throw new Error("Este método no es posible en este tipo de Grafos");
    }

    public gradoDeSalida(unVertice : T) : number {
        this.validarVertice(unVertice);
        const nroVertice = this.getNroVertice(unVertice);
        let adyacentesAlVertice : number[] = this.listaAdyacencias[nroVertice];
        return adyacentesAlVertice.length;
    }

    public gradoDeEntrada(unVertice : T) : number {
        this.validarVertice(unVertice);
        const nroVertice = this.getNroVertice(unVertice);
        let cantidad : number = 0;
        for (let adyacenteAlVertice  of this.listaAdyacencias) {
            if (adyacenteAlVertice.includes(nroVertice)) {
                cantidad++;
            }
        }
        return cantidad;
    }
}