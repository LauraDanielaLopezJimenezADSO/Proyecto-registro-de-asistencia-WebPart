export class PerfilUsuarioModel {
    user;
    password;
    documento;
    tipoDocumento;
    nombres;
    apellidos;
    fechaNacimiento;
    telefono;
    correo;
    genero;
    residencia;

    constructor(user, password, documento, tipoDocumento, nombres, apellidos, fechaNacimiento, telefono, correo, genero, residencia) {
        this.user = user;
        this.password = password;
        this.documento = documento;
        this.tipoDocumento = tipoDocumento;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.fechaNacimiento = fechaNacimiento;
        this.telefono = telefono;
        this.correo = correo;
        this.genero = genero;
        this.residencia = residencia;
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get documento() {
        return this._documento;
    }

    set documento(value) {
        this._documento = value;
    }

    get tipoDocumento() {
        return this._tipoDocumento;
    }

    set tipoDocumento(value) {
        this._tipoDocumento = value;
    }

    get nombres() {
        return this._nombres;
    }

    set nombres(value) {
        this._nombres = value;
    }

    get apellidos() {
        return this._apellidos;
    }

    set apellidos(value) {
        this._apellidos = value;
    }

    get fechaNacimiento() {
        return this._fechaNacimiento;
    }

    set fechaNacimiento(value) {
        this._fechaNacimiento = value;
    }

    get telefono() {
        return this._telefono;
    }

    set telefono(value) {
        this._telefono = value;
    }

    get correo() {
        return this._correo;
    }

    set correo(value) {
        this._correo = value;
    }

    get genero() {
        return this._genero;
    }

    set genero(value) {
        this._genero = value;
    }

    get residencia() {
        return this._residencia;
    }

    set residencia(value) {
        this._residencia = value;
    }
}