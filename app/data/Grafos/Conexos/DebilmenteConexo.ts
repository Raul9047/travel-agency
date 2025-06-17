import { Grafo } from "../No_Pesados/Grafo";
import { BFS } from "../Recorridos/BFS";

export class DebilmenteConexo<T> {
    private miGrafo: Grafo<T>;
    private bfs: BFS<T>;

    constructor(unGrafo: Grafo<T>) {
        this.miGrafo = unGrafo;
        const verticePartida = this.miGrafo.getVerticePorIndice(0);
        this.bfs = new BFS(this.miGrafo, verticePartida);
    }

    public cantidadDeIslasEnDiGrafo(): number {
        if (this.bfs.seVisitoTodosLosVertices()) {
            return 1;
        }

        let cantidad: number = 1;

        while (!this.bfs.seVisitoTodosLosVertices()) {
            const noMarcados: number[] = [];

            for (let i = 0; i < this.miGrafo.cantidadVertices(); i++) {
                const verificarVertice = this.miGrafo.getVerticePorIndice(i);
                if (!this.bfs.seVisitoElVertice(verificarVertice)) {
                    noMarcados.push(i);
                }
            }

            let inicial: T | null = null;
            let hay: boolean = false;

            for (let i = 0; i < noMarcados.length; i++) {
                inicial = this.miGrafo.getVerticePorIndice(noMarcados[i]);
                if (this.hayAdyacentesMarcados(inicial)) {
                    hay = true;
                }
            }

            if (!hay) {
                cantidad++;
            }

            if (inicial !== null) {
                this.bfs.ejecutarRecorrido(inicial);
            }
        }

        return cantidad;
    }

    private hayAdyacentesMarcados(vertice: T): boolean {
        const adyacentes = this.miGrafo.adyacentesDeVertice(vertice);
        for (const ady of adyacentes) {
            if (this.bfs.seVisitoElVertice(ady)) {
                return true;
            }
        }
        return false;
    }

    public esDebilmenteConexo(): boolean {
        return this.cantidadDeIslasEnDiGrafo() === 1;
    }
}
