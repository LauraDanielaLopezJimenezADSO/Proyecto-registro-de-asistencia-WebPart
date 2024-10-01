import {PerfilUsuarioModel} from "./PerfilUsuarioModel.js";

export class AprendizModel extends PerfilUsuarioModel {
    ficha;
    programaFormacion;
    jornadaFormacion;
    nivelFormacion;
    sede;
    area;

    constructor(user, password, documento, tipoDocumento, nombres, apellidos, fechaNacimiento, telefono, correo, genero, residencia,
                ficha, programaFormacion, jornadaFormacion, nivelFormacion, sede, area) {
        super(user, password, documento, tipoDocumento, nombres, apellidos, fechaNacimiento, telefono, correo, genero, residencia);
        this.ficha = ficha;
        this.programaFormacion = programaFormacion;
        this.jornadaFormacion = jornadaFormacion;
        this.nivelFormacion = nivelFormacion;
        this.sede = sede;
        this.area = area;
    }


    get ficha() {
        return this._ficha;
    }

    set ficha(value) {
        this._ficha = value;
    }

    get programaFormacion() {
        return this._programaFormacion;
    }

    set programaFormacion(value) {
        this._programaFormacion = value;
    }

    get jornadaFormacion() {
        return this._jornadaFormacion;
    }

    set jornadaFormacion(value) {
        this._jornadaFormacion = value;
    }

    get nivelFormacion() {
        return this._nivelFormacion;
    }

    set nivelFormacion(value) {
        this._nivelFormacion = value;
    }

    get sede() {
        return this._sede;
    }

    set sede(value) {
        this._sede = value;
    }

    get area() {
        return this._area;
    }

    set area(value) {
        this._area = value;
    }
}