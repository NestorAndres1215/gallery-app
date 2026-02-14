import React, { useState } from "react";
import type { UnsplashPhoto } from "../types/unsplash";
import ImageModal from "./ImageModal";

const ImageCard: React.FC<{ photo: UnsplashPhoto }> = ({ photo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="card border-0 shadow-sm rounded-4 overflow-hidden h-100"
        role="button"
        onClick={() => setIsModalOpen(true)}
        style={{
          cursor: "pointer",
          transition: "transform 0.3s ease, box-shadow 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow =
            "0 12px 25px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "";
        }}
      >
        <img
          src={photo.urls.small}
          alt={photo.alt_description || "Imagen de Unsplash"}
          loading="lazy"
          className="card-img-top"
          style={{
            aspectRatio: "4/5",
            objectFit: "cover"
          }}
        />
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        photo={photo}
      />
    </>
  );
};

export default ImageCard;
