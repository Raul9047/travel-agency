export class Grafo<T> {
    private listaVertices: T[];
    private listaAdyacencias: number[][];
    private NRO_VERTICE_INVALIDO: number = -1;

    constructorSin() {
        this.listaVertices = [];
        this.listaAdyacencias = [];
    }

    constructor(listaVertices: T[] = [], adyacencias: number[][] = []) {
        this.listaVertices = [...listaVertices];
        this.listaAdyacencias = adyacencias.length
            ? adyacencias.map(lst => [...lst])
            : listaVertices.map(() => []);
    }

    public getVerticeIndex(unVertice: T): number {
        for (let i = 0; i < this.listaVertices.length; i++) {
            if (this.listaVertices[i] === unVertice)
                return i;
        }
        return this.NRO_VERTICE_INVALIDO;
    }

    public validarVertice(unVertice: T): void {
        if (this.getVerticeIndex(unVertice) === this.NRO_VERTICE_INVALIDO)
            throw new Error("El vertice no existe en el grafo");
    }

    public cantidadVertices(): number {
        return this.listaVertices.length;
    }

    public cantidadDeAristas(): number {
        let cantidadDeAristas = 0;
        let lazo = 0;
        for (let i = 0; i < this.listaVertices.length; i++) {
            const listaAdyacencias = this.listaAdyacencias[i];
            for (const vertice of listaAdyacencias) {
                if (i === vertice) {
                    lazo++;
                } else {
                    cantidadDeAristas++;
                }   
            }
        }
        return Math.floor(cantidadDeAristas / 2) + lazo;
    }

    private insertarVertice(unVertice: T): void {
        let nroVertice = this.getVerticeIndex(unVertice);
        if (nroVertice !== this.NRO_VERTICE_INVALIDO) {
            throw new Error("El vertice ya existe en el grafo");
        }
        this.listaVertices.push(unVertice);
        this.listaAdyacencias.push([]);
    }

    public eliminarVertice(unVertice: T): void {
        const idx = this.getVerticeIndex(unVertice);
        if (idx === this.NRO_VERTICE_INVALIDO) {
            throw new Error("El vertice no existe en el grafo");
        }
        this.listaVertices.splice(idx, 1);
        this.listaAdyacencias.splice(idx, 1);
        for (let ady of this.listaAdyacencias) {
            for (let i = ady.length - 1; i >= 0; i--) {
                if (ady[i] === idx) {
                    ady.splice(i, 1);
                } else if (ady[i] > idx) {
                    ady[i]--;
                }
            }
        }
    }

    public agregarArista(origen: T, destino: T): void {
        const idxOrigen = this.getVerticeIndex(origen);
        const idxDestino = this.getVerticeIndex(destino);
        if (idxOrigen === this.NRO_VERTICE_INVALIDO || idxDestino === this.NRO_VERTICE_INVALIDO) {
            throw new Error("Uno o ambos vértices no existen");
        }
        if (!this.listaAdyacencias[idxOrigen].includes(idxDestino)) {
            this.listaAdyacencias[idxOrigen].push(idxDestino);
        }
        if (!this.listaAdyacencias[idxDestino].includes(idxOrigen) && idxOrigen !== idxDestino) {
            this.listaAdyacencias[idxDestino].push(idxOrigen);
        }
    }

    public eliminarArista(origen: T, destino: T): void {
        const idxOrigen = this.getVerticeIndex(origen);
        const idxDestino = this.getVerticeIndex(destino);
        if (idxOrigen === this.NRO_VERTICE_INVALIDO || idxDestino === this.NRO_VERTICE_INVALIDO) {
            throw new Error("Uno o ambos vértices no existen");
        }
        this.listaAdyacencias[idxOrigen] = this.listaAdyacencias[idxOrigen].filter(idx => idx !== idxDestino);
        this.listaAdyacencias[idxDestino] = this.listaAdyacencias[idxDestino].filter(idx => idx !== idxOrigen);
    }

    public adyacentesDe(unVertice: T): T[] {
        const idx = this.getVerticeIndex(unVertice);
        if (idx === this.NRO_VERTICE_INVALIDO) {
            throw new Error("El vertice no existe en el grafo");
        }
        return this.listaAdyacencias[idx].map(i => this.listaVertices[i]);
    }

    public limpiar(): void {
        this.listaVertices = [];
        this.listaAdyacencias = [];
    }
}