import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import ImageGallery from "../components/ImageGallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const Home: React.FC = () => {
  const [query, setQuery] = useState("");

  return (
    <main
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
      }}
    >

      <section className="py-5 text-center container">
        <div className="mb-4">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-circle shadow"
            style={{
              width: "80px",
              height: "80px",
              background: "rgba(255,255,255,0.3)",
              backdropFilter: "blur(8px)"
            }}
          >
            <FontAwesomeIcon icon={faImages} size="2x" />
          </div>
        </div>

        <h1 className="display-4 fw-bold mb-3">
          Explora millones de fotos{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #667eea, #764ba2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            en alta calidad
          </span>
        </h1>

        <p className="lead text-muted mb-4">
          Busca imágenes libres de derechos de Unsplash
        </p>

        <div className="mx-auto" style={{ maxWidth: "640px" }}>
          <SearchBar
            onSearch={setQuery}
            placeholder="Busca paisajes, tecnología, personas..."
          />
        </div>
      </section>

      <section className="container pb-5">
        <ImageGallery query={query} />
      </section>
    </main>
  );
};

export default Home;
