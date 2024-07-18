export async function API_SelectOptionContent(Endpoint ) {
    return await fetch('http://localhost:8080/' + Endpoint).then(rp => rp.json()).then(data => ["Seleccionar...", ...data])
}