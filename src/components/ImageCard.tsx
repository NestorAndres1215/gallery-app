import React, { useState } from "react";
import type { UnsplashPhoto } from "../types/unsplash";
import ImageModal from "./ImageModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faDownload, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import "../styles/ImageCard.css";

const ImageCard: React.FC<{ photo: UnsplashPhoto }> = ({ photo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="image-card" onClick={handleClick} role="button" tabIndex={0}>
        <img
          src={photo.urls.small}
          alt={photo.alt_description || "Imagen de Unsplash"}
          loading="lazy"
          className="card-image"
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