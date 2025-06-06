import { Grafo } from "./Grafo";

export class DiGrafo<T> extends Grafo<T> {
    constructor(listaVertices: T[] = [], adyacencias: number[][] = []) {
        super(listaVertices, adyacencias);
    }

    public override agregarArista(origen: T, destino: T): void {
        const idxOrigen = this.getVerticeIndex(origen);
        const idxDestino = this.getVerticeIndex(destino);
        if (idxOrigen === this["NRO_VERTICE_INVALIDO"] || idxDestino === this["NRO_VERTICE_INVALIDO"]) {
            throw new Error("Uno o ambos vértices no existen");
        }
        if (!this["listaAdyacencias"][idxOrigen].includes(idxDestino)) {
            this["listaAdyacencias"][idxOrigen].push(idxDestino);
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
}