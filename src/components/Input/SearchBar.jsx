import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ data, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      const results = data.filter((item) =>
        item.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  };

  const handleResultClick = (result) => {
    setSearchTerm(result);
    setFilteredResults([]);
    onSearch(result);
  };

  const handleButtonClick = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="relative">
      <div className="flex items-center rounded-lg">
        <input
          type="text"
          placeholder="Buscar..."
          className="bg-white text-[#1A1A1A] text-sm rounded-l-md block w-full p-2.5 placeholder:bg-transparent"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          onClick={handleButtonClick}
          className="px-4 py-2.5 bg-white border-2 border-white text-[#757575] rounded-r-lg"
        >
          <div className="transform transition duration-200 hover:scale-110">
            <FaSearch />
          </div>
        </button>
      </div>
      {filteredResults.length > 0 && (
        <div className="absolute bg-white text-black mt-1 rounded-lg shadow-lg w-full z-10">
          {filteredResults.map((result, index) => (
            <div
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleResultClick(result)}
            >
              {result}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
