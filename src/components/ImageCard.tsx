import React, { useState } from "react";
import type { UnsplashPhoto } from "../types/unsplash";
import ImageModal from "./ImageModal"; // Nuevo componente
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

        {/* Overlay al hacer hover */}
        <div className="card-overlay">
          <div className="overlay-top">
            <a
              href={photo.links.html}
              target="_blank"
              rel="noreferrer"
              className="external-link"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Ver en Unsplash por ${photo.user.name}`}
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </div>

          <div className="overlay-bottom">
            <div className="author-info">
              <img
                src={photo.user.profile_image.small}
                alt={`Foto de perfil de ${photo.user.name}`}
                className="author-avatar"
              />
              <div>
                <p className="author-name">{photo.user.name}</p>
                <p className="author-username">@{photo.user.username}</p>
              </div>
            </div>

            <div className="stats">
              <span className="stat">
                <FontAwesomeIcon icon={faHeart} /> {photo.likes.toLocaleString()}
              </span>
              <a
                href={photo.links.download}
                target="_blank"
                rel="noreferrer"
                className="download-btn"
                onClick={(e) => e.stopPropagation()}
                aria-label="Descargar imagen"
              >
                <FontAwesomeIcon icon={faDownload} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        photo={photo}
      />
    </>
  );
};

export default ImageCard;