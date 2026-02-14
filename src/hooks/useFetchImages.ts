import { useEffect, useState } from "react";
import { fetchImages } from "../api/unsplash";
import type { UnsplashPhoto } from "../types/unsplash";

export const useFetchImages = (query: string, delay = 500) => {
  const [images, setImages] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setImages([]);
      setError(null);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchImages(query);
        if (!controller.signal.aborted) {
          setImages(data.results);
        }
      } catch (err: unknown) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "Error al obtener imágenes");
          setImages([]);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, delay);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query, delay]);

  return { images, loading, error };
};
