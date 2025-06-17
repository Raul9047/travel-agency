import { Grafo } from "../No_Pesados/Grafo";
import { ControlMarcados } from "../Utileria/ControlMarcados";

export class DFS <T>{
    private elGrafo : Grafo<T>;
    private controlMarcados : ControlMarcados;
    private recorrido : T[];

    constructor(unGrafo : Grafo<T>, verticePartida : T) {
        this.elGrafo = unGrafo;
        this.recorrido = [];
        this.controlMarcados = new ControlMarcados(this.elGrafo.cantidadVertices());
        this.ejecutarRecorrido(verticePartida);
    }

    public ejecutarRecorrido(verticeEnTurno : T) : void {
        this.elGrafo.validarVertice(verticeEnTurno);
        const nroDelVerticeEnTurno : number = this.elGrafo.getNroVertice(verticeEnTurno);
        this.controlMarcados.marcarVertice(nroDelVerticeEnTurno);
        this.recorrido.push(verticeEnTurno);

        const adyacenteAlVerticeEnTurno = this.elGrafo.adyacentesDeVertice(verticeEnTurno);
        for (const verticeAdyacente of adyacenteAlVerticeEnTurno) {
            const nroVerticeAdyacente = this.elGrafo.getNroVertice(verticeAdyacente);
            if (!this.controlMarcados.estaVerticeMarcado(nroVerticeAdyacente)) {
                this.ejecutarRecorrido(verticeAdyacente);
            }
        }
    }

    public getRecorrido() : T[] {
        return this.recorrido;
    }

    public seVisitoVertice(unVertice : T) : boolean {
        this.elGrafo.validarVertice(unVertice);
        const nroVertice = this.elGrafo.getNroVertice(unVertice);
        return this.controlMarcados.estaVerticeMarcado(nroVertice);
    }

    public seVisitoTodosLosVertices() : boolean {
        return this.controlMarcados.estanTodosMarcados();
    }
}