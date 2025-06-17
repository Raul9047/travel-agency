import { Grafo } from "./Grafo";

export class Warshall <T> {
    private miGrafo : Grafo<T>;
    private matriz : number [][];

    constructor(unGrafo : Grafo<T>) {
        this.miGrafo = unGrafo;
        this.matriz = Array.from({length : this.miGrafo.cantidadVertices()}, () => Array(this.miGrafo.cantidadVertices()).fill(0));
        this.ejecutarWarshall();
    }

    private ejecutarWarshall() {
        const cantidadVertices = this.miGrafo.cantidadVertices();
        for (let i = 0 ; i < cantidadVertices ; i++) {
            const vertice = this.miGrafo.getVerticePorIndice(i);
            const adyacentesDelVertice = this.miGrafo.adyacentesDeVertice(vertice);
            
            for (const verticeAdyacente of adyacentesDelVertice) {
                const nroVerticeAdyacente = this.miGrafo.getNroVertice(verticeAdyacente);
                this.matriz[i][nroVerticeAdyacente] = 1;
            }
        }

        //  COMIENZO DEL ALGORITMO DE WARSHALL
        for (let k = 0 ; k < cantidadVertices ; k++) {
            for (let i = 0 ; i < cantidadVertices ; i++) {
                for (let j = 0 ; j < cantidadVertices ; j++) {
                    this.matriz[i][j] = this.matriz[i][j] | (this.matriz[i][k] & this.matriz[k][j]);
                }
            }
        }
    }

    public existeCamino(verticeOrigen : T, verticeDestino : T) : boolean {
        this.miGrafo.validarVertice(verticeOrigen);
        this.miGrafo.validarVertice(verticeDestino);
        const nroVerticeOrigen = this.miGrafo.getNroVertice(verticeOrigen);
        const nroVerticeDestino = this.miGrafo.getNroVertice(verticeDestino);
        return (this.matriz[nroVerticeOrigen][nroVerticeDestino] === 1);
    }

    public hayCiclos() : boolean {
        const nroVertices = this.miGrafo.cantidadVertices();
        for (let i = 0 ; i < nroVertices ; i++) {
            if (this.matriz[i][i] === 1)
                return true;
        }
        return false;
    }
}