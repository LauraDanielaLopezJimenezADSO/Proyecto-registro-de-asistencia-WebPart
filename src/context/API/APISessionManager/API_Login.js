export async function LoginInstructor(EntradaUsuario, EntradaContra) {
    const user = encodeURIComponent(EntradaUsuario);
    const pass = encodeURIComponent(EntradaContra);

    return await fetch(`http://localhost:8080/Registro/Instructor/${user}/${pass}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 401) {
                throw new Error('No autorizado: Usuario o contraseña incorrectos.');
            } else if (response.status === 404) {
                throw new Error('No encontrado: Usuario no existe.');
            } else {
                throw new Error('Error en el servidor.');
            }
        })
        .catch(error => {
            console.error('Error durante la petición:', error.message);
            return null;
        });
}

export async function LoginAprendiz(EntradaUsuario, EntradaContra) {
    const user = encodeURIComponent(EntradaUsuario);
    const pass = encodeURIComponent(EntradaContra);

    return await fetch(`http://localhost:8080/Registro/Aprendiz/${user}/${pass}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 401) {
                throw new Error('No autorizado: Usuario o contraseña incorrectos.');
            } else if (response.status === 404) {
                throw new Error('No encontrado: Usuario no existe.');
            } else {
                throw new Error('Error en el servidor.');
            }
        })
        .catch(error => {
            console.error('Error durante la petición:', error.message);
            return null;
        });
}
