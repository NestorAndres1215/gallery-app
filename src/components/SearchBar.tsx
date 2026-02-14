import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";

interface Props {
  onSearch: (q: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<Props> = ({
  onSearch,
  placeholder = "Busca paisajes, tecnología, personas...",
}) => {
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
    <form
      onSubmit={submit}
      className="container d-flex justify-content-center my-4"
      role="search"
    >
      <div className="input-group shadow rounded-pill overflow-hidden" style={{ maxWidth: "640px" }}>

        <input
          type="text"
          className="form-control border-0 px-4"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          aria-label="Buscar imágenes"
          disabled={isLoading}
          style={{ height: "56px" }}
        />

        <button
          type="submit"
          className="btn px-4 text-white"
          style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
          disabled={isLoading || !value.trim()}
        >


          <FontAwesomeIcon icon={faSearch} />
        </button>

      </div>
    </form>
  );
};

export default SearchBar;
