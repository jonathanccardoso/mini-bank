export const fetcher = (url: string) => fetch(url).then(async (res) => await res.json());
