import React from "react";
import type { UnsplashPhoto } from "../types/unsplash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  photo: UnsplashPhoto;
}

const ImageModal: React.FC<Props> = ({ isOpen, onClose, photo }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "650px" }}>
          <div className="modal-content shadow border-0 rounded-4">
            <div className="modal-header border-0 pb-0">
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body pt-0">
              <div className="text-center mb-3">
                <img src={photo.urls.regular}
                  alt={photo.alt_description || "Imagen en detalle"} className="img-fluid rounded-3"
                  style={{ maxHeight: "450px", objectFit: "cover" }}
                />
              </div>
              <div className="d-flex align-items-center mb-3">
                <img src={photo.user.profile_image.medium} alt={photo.user.name}
                  className="rounded-circle me-3"
                  style={{ width: "50px", height: "50px", objectFit: "cover", }} />
                <div>
                  <h6 className="mb-0">{photo.user.name}</h6>
                  <small className="text-muted">
                    @{photo.user.username}
                  </small>
                </div>
              </div>

              <div className="d-flex gap-2 flex-wrap">
                <a
                  href={photo.links.download}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm">
                  <FontAwesomeIcon icon={faDownload} className="me-2" />
                  Descargar
                </a>

                <a
                  href={photo.links.html}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-dark btn-sm"
                >
                  Ver en Unsplash
                  <FontAwesomeIcon
                    icon={faExternalLinkAlt}
                    className="ms-2"
                  />
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div
        className="modal-backdrop fade show"
        onClick={onClose}
      ></div>
    </>
  );
};

export default ImageModal;
