export async function LoginInstructor(EntradaUsuario, EntradaContra) {
    const user = encodeURIComponent(EntradaUsuario);
    const pass = encodeURIComponent(EntradaContra);

    await fetch(`http://localhost:8080/Registro/Instructor/${user}/${pass}`, {
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
        .then(data => {
            console.log('Datos del instructor:', data);
            // Redirección a la página del instructor
            window.location.href = 'src/pages/UsersPages/InstructorHomeScreen.html';
        })
        .catch(error => {
            console.error('Error durante la petición:', error.message);
        });
}


export async function LoginAprendiz(EntradaUsuario, EntradaContra) {
    const user = encodeURIComponent(EntradaUsuario);
    const pass = encodeURIComponent(EntradaContra);

    await fetch(`http://localhost:8080/Registro/Aprendiz/${user}/${pass}`, {
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
        .then(data => {
            console.log('Datos del aprendiz:', data);
            // Redirección a la página del aprendiz (si es necesaria)
            window.location.href = 'src/pages/UsersPages/AprendizHomeScreen.html';
        })
        .catch(error => {
            console.error('Error durante la petición:', error.message);
        });
}
