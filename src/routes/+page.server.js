import { api } from '$lib/API';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, setHeaders }) {
    setHeaders({
        "cache-control": "max-age=30",
    });
    return fetch(api("/match/upcoming")).then(res => res.json()).then(res => res.data)
}