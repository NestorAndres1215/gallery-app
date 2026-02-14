import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import ImageGallery from "../components/ImageGallery";
import "../styles/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faSearch } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
const Home: React.FC = () => {
  const [query, setQuery] = useState("");

  return (
    <main className="home-container">

      <section className="hero">
        <div className="hero-content">
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faImages} className="gallery-icon" />
          </div>
          <h1 className="title">
            Explora millones de fotos
            <span className="highlight"> en alta calidad</span>
          </h1>
          <h4 className="text-muted">
            Busca imágenes libres de derechos de Unsplash
          </h4>
        </div>

        <div className="search-wrapper">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <SearchBar onSearch={setQuery} placeholder="Busca paisajes, tecnología, personas..." />
        </div>
      </section>

      <section className="gallery-section">
        <ImageGallery query={query} />
      </section>
    </main>
  );
};

export default Home;