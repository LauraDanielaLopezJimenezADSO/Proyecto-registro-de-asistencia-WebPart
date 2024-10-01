function encodeData(data) {
    return encodeURIComponent(data);
}

// Función de Login Genérica con Codificación
export async function LoginUsuario(EntradaUsuario, EntradaContra, rol) {
    // Codificar el nombre de usuario y la contraseña
    const encodedUser = encodeData(EntradaUsuario);
    const encodedPass = encodeData(EntradaContra);

    const loginData = {
        user: encodedUser,
        password: encodedPass,
        role: rol
    };

    try {
        const response = await fetch(`http://localhost:8080/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData) // Enviar los datos como JSON en el cuerpo
        });

        if (response.ok) {
            const data = await response.json();
            return data; // Retornar los datos de respuesta (por ejemplo, tokens, información del usuario)
        } else if (response.status === 401) {
            throw new Error('No autorizado: Usuario o contraseña incorrectos.');
        } else if (response.status === 404) {
            throw new Error('No encontrado: Usuario no existe.');
        } else {
            throw new Error('Error en el servidor.');
        }
    } catch (error) {
        console.error('Error durante la petición:', error.message);
        return null; // Retornar null o manejar el error según tus necesidades
    }
}

// Función para Login de Instructor
export async function LoginInstructor(EntradaUsuario, EntradaContra) {
    return await LoginUsuario(EntradaUsuario, EntradaContra, "INSTRUCTOR");
}

// Función para Login de Aprendiz
export async function LoginAprendiz(EntradaUsuario, EntradaContra) {
    return await LoginUsuario(EntradaUsuario, EntradaContra, "APRENDIZ");
}
