import React, { useEffect, useRef } from "react";
import { useFetchImages } from "../hooks/useFetchImages";
import ImageCard from "./ImageCard";
import ImageSkeleton from "../components/ImageSkeleton";
import "../styles/ImageGallery.css";
import { motion, AnimatePresence } from "framer-motion";

const ImageGallery: React.FC<{ query: string }> = ({ query }) => {
  const { images, loading, error, loadMore, hasMore } = useFetchImages(query);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastImageRef = useRef<HTMLDivElement>(null);

  // Paginación infinita
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    if (lastImageRef.current) {
      observer.observe(lastImageRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [images, loading, hasMore, loadMore]);

  return (
    <div className="gallery-container">
      {/* Estados */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="gallery-error"
        >
          <p>Lo sentimos, hubo un error al cargar las imágenes.</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Reintentar
          </button>
        </motion.div>
      )}

      {/* Galería */}
      <div className="image-gallery-masonry">
        <AnimatePresence>
          {images.length > 0 ? (
            images.map((img, index) => (
              <motion.div
                key={img.id}
                ref={index === images.length - 1 ? lastImageRef : null}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                layout
              >
                <ImageCard photo={img} />
              </motion.div>
            ))
          ) : !loading && query ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="no-results"
            >
              No se encontraron imágenes para "<strong>{query}</strong>"
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Loading más imágenes */}
      {loading && hasMore && (
        <div className="skeleton-grid">
          {[...Array(6)].map((_, i) => (
            <ImageSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      )}

      {/* Fin de resultados */}
      {!hasMore && images.length > 0 && (
        <p className="end-message">¡Eso es todo! No hay más imágenes.</p>
      )}
    </div>
  );
};

export default ImageGallery;