import type { UnsplashSearchResponse } from "../types/unsplash";

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY as string;

if (!ACCESS_KEY) {
  console.warn("VITE_UNSPLASH_ACCESS_KEY no está definida en .env");
}

export const fetchImages = async (
  query: string,
  page = 1,
  perPage = 30
): Promise<UnsplashSearchResponse> => {
  if (!ACCESS_KEY) throw new Error("Falta la clave de acceso de Unsplash (VITE_UNSPLASH_ACCESS_KEY).");
  if (!query.trim()) throw new Error("El parámetro 'query' no puede estar vacío.");

  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", query);
  url.searchParams.set("page", String(page));
  url.searchParams.set("per_page", String(perPage));

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error Unsplash: ${res.status} - ${text}`);
  }

  return await res.json() as UnsplashSearchResponse;
};
