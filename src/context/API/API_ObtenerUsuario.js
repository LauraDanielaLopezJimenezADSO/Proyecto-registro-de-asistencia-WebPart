export default async function ObtenerUsuario(Doc) {
    return await fetch('http://localhost:8080/ObtenerUsuario/' + Doc)
        .then(rp => rp.json())
}