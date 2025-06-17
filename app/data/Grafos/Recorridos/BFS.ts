import { Grafo } from "../No_Pesados/Grafo";
import { ControlMarcados } from "../Utileria/ControlMarcados";

export class BFS<T> {
    private elGrafo : Grafo<T>;
    private controlMarcados : ControlMarcados;
    private recorrido : T[];

    constructor(unGrafo: Grafo<T>, verticePartida : T) {
        this.elGrafo = unGrafo;
        this.recorrido = [];
        this.controlMarcados = new ControlMarcados(this.elGrafo.cantidadVertices());
        this.ejecutarRecorrido(verticePartida);
    }

    public ejecutarRecorrido(verticeEnTurno : T) : void {
        this.elGrafo.validarVertice(verticeEnTurno);
        const colaDeVertices : number[] = [];
        const nroVerticeEnTurno = this.elGrafo.getNroVertice(verticeEnTurno);

        colaDeVertices.push(nroVerticeEnTurno);
        this.controlMarcados.marcarVertice(nroVerticeEnTurno);

        while (colaDeVertices.length > 0) {
            const nroVerticeProcesar = colaDeVertices.shift()!;
            const verticeProcesar : T = this.elGrafo.getVerticePorIndice(nroVerticeProcesar);
            this.recorrido.push(verticeProcesar);

            const adyacentesAProcesar = this.elGrafo.adyacentesDeVertice(verticeProcesar);
            for (const verticeAdyacente of adyacentesAProcesar) {
                const nroAdyacente : number = this.elGrafo.getNroVertice(verticeAdyacente);
                if (!this.controlMarcados.estaVerticeMarcado(nroAdyacente)) {
                    this.controlMarcados.marcarVertice(nroAdyacente);
                    colaDeVertices.push(nroAdyacente);
                }
            }
        }
    }

    public getRecorrido() : T[] {
        return this.recorrido;
    }

    public seVisitoElVertice(unVertice : T) : boolean {
        this.elGrafo.validarVertice(unVertice);
        const nroVertice : number = this.elGrafo.getNroVertice(unVertice);
        return this.controlMarcados.estaVerticeMarcado(nroVertice);
    }

    public seVisitoTodosLosVertices() : boolean {
        return this.controlMarcados.estanTodosMarcados();
    }
}