import React from "react";
import "../App.css";

export default function Filters({
  search,
  setSearch,
  category,
  setCategory,
  stock,
  setStock,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) {
  return (
    <div className="controls">
      <div className="inputsearch">
        <span className="icon">🔎</span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by plant name"
        />
      </div>

      <div className="select">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Category</option>
          <option value="Indoor">Indoor</option>
          <option value="Outdoor">Outdoor</option>
          <option value="Decorative">Decorative</option>
          <option value="Medicinal">Medicinal</option>
          <option value="Succulent">Succulent</option>
        </select>
      </div>

      <div className="select">
        <select value={stock} onChange={(e) => setStock(e.target.value)}>
          <option value="">Stock</option>
          <option value="in">In Stock</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>

      <div className="price-slider">
        <input
          type="range"
          min="0"
          max="5000"
          step="10"
          value={minPrice || 0}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="range"
          min="0"
          max="5000"
          step="10"
          value={maxPrice || 5000}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <div className="price-label">
          ₹{minPrice || 0} - ₹{maxPrice || 5000}
        </div>
      </div>
    </div>
  );
}
