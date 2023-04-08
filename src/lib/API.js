const buildURL = (baseUrl, resource) => {
    if (typeof resource === 'string' && !resource.startsWith("https://")) {
        resource = baseUrl + resource
    }
    return resource
}

export const api = (url) => buildURL("https://vlrggapi.vercel.app", url)
export const api2 = (url) => buildURL("https://vlrgg.cyclic.app/api", url)