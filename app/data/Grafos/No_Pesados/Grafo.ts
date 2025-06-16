export class Grafo<T> {
    protected listaVertices: T[];
    protected listaAdyacencias: number[][];
    private NRO_VERTICE_INVALIDO: number = -1;

    constructor();

    constructor(listaVertices: Iterable<T>);

    constructor(listaVertices?: Iterable<T>) {
        this.listaVertices = [];
        this.listaAdyacencias = [];

        if (listaVertices) {
            for (const unVertice of listaVertices) {
                this.insertarVertice(unVertice);
            }
        }
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

    public insertarVertice(unVertice: T): void {
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
        this.validarVertice(origen);
        this.validarVertice(destino);
        if (!this.listaAdyacencias[idxOrigen].includes(idxDestino)) {
            this.listaAdyacencias[idxOrigen].push(idxDestino);
        }
        if (!this.listaAdyacencias[idxDestino].includes(idxOrigen) && idxOrigen !== idxDestino) {
            this.listaAdyacencias[idxDestino].push(idxOrigen);
        }
    }

    public eliminarArista(origen: T, destino: T): void {
        if (this.existeAdyacencia(origen, destino)) {
            const idxOrigen = this.getVerticeIndex(origen);
            const idxDestino = this.getVerticeIndex(destino);

            let adyacentesDelOrigen : number[] = this.listaAdyacencias[idxOrigen];
            const destinoEnOrigen = adyacentesDelOrigen.indexOf(idxDestino);
            if (destinoEnOrigen !== -1) {
                adyacentesDelOrigen.splice(destinoEnOrigen, 1);
            }
            if (idxOrigen !== idxDestino) {
                let adyacentesDelDestino : number[] = this.listaAdyacencias[idxDestino];
                const origenEnDestino = adyacentesDelDestino.indexOf(idxOrigen);
                if (origenEnDestino !== -1) {
                    adyacentesDelDestino.splice(origenEnDestino, 1);
                }
            }
        }
    }

    public adyacentesDeVertice(unVertice: T): T[] {
        const idx = this.getVerticeIndex(unVertice);
        if (idx === this.NRO_VERTICE_INVALIDO) {
            throw new Error("El vertice no existe en el grafo");
        }
        return this.listaAdyacencias[idx].map(i => this.listaVertices[i]);
    }

    public existeAdyacencia(verticeOrigen: T, verticeDestino: T) : boolean {
        this.validarVertice(verticeOrigen);
        this.validarVertice(verticeDestino);
        const nroVerticeOrigen = this.getVerticeIndex(verticeOrigen);
        const nroVerticeDestino = this.getVerticeIndex(verticeDestino);
        let adyacentesDelVerticeOrigen : number[] = this.listaAdyacencias[nroVerticeOrigen];
        return adyacentesDelVerticeOrigen.includes(nroVerticeDestino);
    }

    public gradoDelVertice(unVertice: T) : number {
        this.validarVertice(unVertice);
        let nroVertice = this.getVerticeIndex(unVertice);
        let adyacentesDelVertice : number[] = this.listaAdyacencias[nroVertice];
        return adyacentesDelVertice.length;
    }

    public limpiar(): void {
        this.listaVertices = [];
        this.listaAdyacencias = [];
    }
}