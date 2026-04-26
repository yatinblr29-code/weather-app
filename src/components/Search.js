import React, { useState } from "react";

function Search({ onSearch }) {
  const [city, setCity] = useState("");

  return (
    <div>
      <input
        placeholder="Enter city"
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={() => onSearch(city)}>Search</button>
    </div>
  );
}

export default Search;