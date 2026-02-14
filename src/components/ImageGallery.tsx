import React, { useEffect, useRef } from "react";
import { useFetchImages } from "../hooks/useFetchImages";
import ImageCard from "./ImageCard";
import ImageSkeleton from "../components/ImageSkeleton";
import { motion, AnimatePresence } from "framer-motion";

const ImageGallery: React.FC<{ query: string }> = ({ query }) => {
  const { images, loading, loadMore, hasMore } = useFetchImages(query);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastImageRef = useRef<HTMLDivElement>(null);

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
    <div className="container py-4">

      <div className="row g-4">
        <AnimatePresence>
          {images.length > 0 ? (
            images.map((img, index) => (
              <motion.div
                key={img.id}
                ref={index === images.length - 1 ? lastImageRef : null}
                className="col-6 col-md-4 col-lg-3 col-xl-2"
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-12 text-center py-5"
            >
              <p className="fs-5 text-muted">
                No se encontraron imágenes para{" "}
                <strong className="text-dark">{query}</strong>
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Skeleton loading */}
      {loading && hasMore && (
        <div className="row g-4 mt-2">
          {[...Array(6)].map((_, i) => (
            <div key={`skeleton-${i}`} className="col-6 col-md-4 col-lg-3 col-xl-2">
              <ImageSkeleton />
            </div>
          ))}
        </div>
      )}

      {/* Fin de resultados */}
      {!hasMore && images.length > 0 && (
        <p className="text-muted text-center mt-4">
          ¡Eso es todo! No hay más imágenes.
        </p>
      )}

    </div>
  );

};

export default ImageGallery;