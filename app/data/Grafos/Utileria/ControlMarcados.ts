export class ControlMarcados{
    private listaDeMarcados : boolean[];

    constructor(nroVertices : number) {
        this.listaDeMarcados = [];
        for (let i = 0 ; i < nroVertices ; i++) {
            this.listaDeMarcados.push(false);
        }
    }

    public descarMarcarTodos() : void {
        for (let i = 0 ; i < this.listaDeMarcados.length ; i++) {
            this.desmarcarVertice(i);
        }
    }

    public desmarcarVertice(nroVertice : number) : void {
        this.listaDeMarcados[nroVertice] = false;
    }

    public marcarVertice(nroVertice : number) : void {
        this.listaDeMarcados[nroVertice] = true;
    }

    public estaVerticeMarcado(nroVertice : number) : boolean {
        return this.listaDeMarcados[nroVertice];
    }

    public estanTodosMarcados() : boolean {
        for (let i = 0 ; i < this.listaDeMarcados.length ; i++) {
            if (!this.estaVerticeMarcado(i))
                return false;
        }
        return true;
    }
}