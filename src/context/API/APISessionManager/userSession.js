// src/utils/UserCredentials.js
//usar esta clase para manjear las credenciales de usuario
export default class UserCredentials {
  constructor() {
    if (UserCredentials.instance) {
      return UserCredentials.instance;
    }

    this.id = null;
    this.documento = null;
    this.nombres = null;
    this.apellidos = null;

    UserCredentials.instance = this;
  }

  static getInstance() {
    if (!UserCredentials.instance) {
      UserCredentials.instance = new UserCredentials();
    }
    return UserCredentials.instance;
  }

  setCredentials({ id, documento, nombres, apellidos }) {
    this.id = id;
    this.documento = documento;
    this.nombres = nombres;
    this.apellidos = apellidos;
  }

  getAllCredentials() {
    return {
      id: this.id,
      documento: this.documento,
      nombres: this.nombres,
      apellidos: this.apellidos,
    };
  }

  getUserID() {
    return this.id
  }

  getUserDocument() {
    return this.documento
  }
  
  getUserFullName() {
    return `${this.nombres} ${this.apellidos}`
  }

  getUserFirstName() {
    return this.nombres
  }

  getUserLastName() {
    return this.apellidos
  }

  clearCredentials() {
    this.id = null;
    this.documento = null;
    this.nombres = null;
    this.apellidos = null;
  }
}


