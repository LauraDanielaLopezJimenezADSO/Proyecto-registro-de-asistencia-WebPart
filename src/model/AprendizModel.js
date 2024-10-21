import {PerfilUsuarioModel} from "./PerfilUsuarioModel.js";

export class AprendizModel extends PerfilUsuarioModel {
    vinculaciones;

    constructor(user, password, documento, tipoDocumento, nombres, apellidos, fechaNacimiento, telefono, correo, genero, residencia, vinculaciones) {
        super(user, password, documento, tipoDocumento, nombres, apellidos, fechaNacimiento, telefono, correo, genero, residencia);
        this.vinculaciones = vinculaciones; // Usar 'this.vinculaciones' en lugar de 'this._vinculaciones'
    }

    get vinculaciones() {
        return this._vinculaciones;
    }

    set vinculaciones(value) {
        this._vinculaciones = value;
    }
}