import { api2 } from '$lib/API';

/** @type {import('./$types').PageLoad} */
export async function load({ setHeaders }) {
    setHeaders({
        "cache-control": "max-age=30",
    });
    return api2.get("/events").then(res => res.data)
}