export async function fetchUserData(user, pass) {
    const url = `http://localhost:8080/Registro/Instructor/${encodeURIComponent(user)}/${encodeURIComponent(pass)}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue correcta');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Hubo un problema con la operación de búsqueda:', error);
      return null;
    }
  }