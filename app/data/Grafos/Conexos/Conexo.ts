import { Grafo } from "../No_Pesados/Grafo";
import { DFS } from "../Recorridos/DFS";

export class Conexo<T> {
    private dfsGrafo: DFS<T> | null = null;

    constructor(unGrafo: Grafo<T>) {
        if (unGrafo.cantidadVertices() > 0) {
            const primerVertice: T = unGrafo.getVerticePorIndice(0);
            this.dfsGrafo = new DFS(unGrafo, primerVertice);
        }
    }

    public esConexo(): boolean {
        if (this.dfsGrafo === null) return true;
        return this.dfsGrafo.seVisitoTodosLosVertices();
    }
}
