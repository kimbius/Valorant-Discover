import { api2 } from '$lib/API';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, setHeaders }) {
    setHeaders({
        "cache-control": "max-age=30",
    });
    return fetch(api2("/players")).then(res => res.json())
}