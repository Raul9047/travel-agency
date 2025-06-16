import { Grafo } from "./Grafo";

export class DiGrafo<T> extends Grafo<T> {
    constructor(listaDeVertices: Iterable<T> = []) {
        super(listaDeVertices);
    }

    public override agregarArista(origen: T, destino: T): void {
        const idxOrigen = this.getVerticeIndex(origen);
        const idxDestino = this.getVerticeIndex(destino);
        if (idxOrigen === this["NRO_VERTICE_INVALIDO"] || idxDestino === this["NRO_VERTICE_INVALIDO"]) {
            throw new Error("Uno o ambos vértices no existen");
        }
        if (!this.listaAdyacencias[idxOrigen].includes(idxDestino)) {
            this.listaAdyacencias[idxOrigen].push(idxDestino);
        }
    }

    public override eliminarArista(origen: T, destino: T): void {
        const idxOrigen = this.getVerticeIndex(origen);
        const idxDestino = this.getVerticeIndex(destino);
        if (idxOrigen === this["NRO_VERTICE_INVALIDO"] || idxDestino === this["NRO_VERTICE_INVALIDO"]) {
            throw new Error("Uno o ambos vértices no existen");
        }
        this["listaAdyacencias"][idxOrigen] = this["listaAdyacencias"][idxOrigen].filter(idx => idx !== idxDestino);
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
}