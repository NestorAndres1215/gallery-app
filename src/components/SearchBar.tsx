import React, { useState } from "react";
import "../styles/SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";

interface Props {
  onSearch: (q: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<Props> = ({ onSearch, placeholder = "Busca paisajes, tecnología, personas..." }) => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (!q || isLoading) return;

    setIsLoading(true);
    try {
      await onSearch(q);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="search-bar-container" onSubmit={submit} role="search">
      <div className="search-bar-wrapper">
        <FontAwesomeIcon
          icon={isLoading ? faSpinner : faSearch}
          className={`search-icon ${isLoading ? "spin" : ""}`}
          aria-hidden="true"
        />
        <label htmlFor="search-input" className="visually-hidden">
          Buscar imágenes
        </label>
        <input
          id="search-input"
          type="text"
          className="search-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          aria-label="Buscar imágenes"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="search-button"
          disabled={isLoading || !value.trim()}
          aria-label={isLoading ? "Buscando..." : "Buscar"}
        >
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <FontAwesomeIcon icon={faSearch} />
          )}
          <span className="visually-hidden">
            {isLoading ? "Buscando..." : "Buscar"}
          </span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;