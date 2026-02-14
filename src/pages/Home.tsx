import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import ImageGallery from "../components/ImageGallery";
import "../styles/Home.css";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faSearch } from "@fortawesome/free-solid-svg-icons";

const Home: React.FC = () => {
  const [query, setQuery] = useState("");

  return (
    <main className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faImages} className="gallery-icon" />
          </div>
          <h1 className="title">
            Explora millones de fotos
            <span className="highlight"> en alta calidad</span>
          </h1>
          <p className="subtitle">
            Busca imágenes libres de derechos de Unsplash
          </p>
        </div>

        {/* Search Bar con ícono */}
        <div className="search-wrapper">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <SearchBar onSearch={setQuery} placeholder="Busca paisajes, tecnología, personas..." />
        </div>
      </section>

      {/* Galería */}
      <section className="gallery-section">
        <ImageGallery query={query} />
      </section>
    </main>
  );
};

export default Home;