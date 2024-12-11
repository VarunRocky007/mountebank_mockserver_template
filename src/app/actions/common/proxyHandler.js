export async function proxy({req, baseUrl}) {
    const url = req.nextUrl.clone();
    const headersObj = Object.fromEntries(req.headers.entries());
    delete headersObj["unique-identifier"];
    delete headersObj["content-length"];
    console.log(headersObj);
    console.log("URL", url);
    const response = await fetch(baseUrl + url.pathname.replace("/api", "") + url.search + url.hash, {
        method: req.method,
        headers: headersObj,
        body: req.method !== 'GET' && req.method !== 'HEAD' ? await req.blob() : null,
    })
    const body = await response.blob();
    return new Response(body, {
        status: response.status,
        statusText: response.statusText,
        headers: {...response.headers},
    })
}