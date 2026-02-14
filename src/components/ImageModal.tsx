
import React from "react";
import type { UnsplashPhoto } from "../types/unsplash";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faDownload, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";


interface Props {
  isOpen: boolean;
  onClose: () => void;
  photo: UnsplashPhoto;
}

const ImageModal: React.FC<Props> = ({ isOpen, onClose, photo }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <div className="modal-image-container">
          <img
            src={photo.urls.regular}
            alt={photo.alt_description || "Imagen en detalle"}
            className="modal-image"
          />
        </div>

        <div className="modal-info">
          <div className="modal-author">
            <img
              src={photo.user.profile_image.medium}
              alt={photo.user.name}
              className="author-avatar-lg"
            />
            <div>
              <h3>{photo.user.name}</h3>
              <p>@{photo.user.username}</p>
            </div>
          </div>

          <div className="modal-actions">
            <a
              href={photo.links.download}
              target="_blank"
              rel="noreferrer"
              className="btn-download"
            >
              <FontAwesomeIcon icon={faDownload} /> Descargar
            </a>
            <a
              href={photo.links.html}
              target="_blank"
              rel="noreferrer"
              className="btn-unsplash"
            >
              Ver en Unsplash <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;