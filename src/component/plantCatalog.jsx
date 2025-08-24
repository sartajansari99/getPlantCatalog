import React, { useState, useEffect } from "react";
import Filters from "./Filteration";
import "../App.css";

function PlantCatalog() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const limit = 12;

  useEffect(() => {
    getData();
  }, [page, search, category, stock, minPrice, maxPrice]);

  async function getData() {
    try {
      setLoading(true);
      let api = `https://plantcatalogbackend.onrender.com/api/v1/plants/plants?page=${page}&limit=${limit}`;

      if (search) api += `&search=${encodeURIComponent(search)}`;
      if (category) api += `&category=${encodeURIComponent(category)}`;
      if (stock) api += `&stock=${stock}`;
      if (minPrice) api += `&minPrice=${minPrice}`;
      if (maxPrice) api += `&maxPrice=${maxPrice}`;

      const res = await fetch(api);
      const json = await res.json();

      setData(json.data.data);
      setTotalPages(json.data.pages || 1);
    } catch (err) {
      console.error("Error fetching plants:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      {loading && (
        <div className="loader-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <div className={`content-wrapper ${loading ? "blurred" : ""}`}>
        <div className="heading">
          <h1>Plant Catalog</h1>
          <p>Browse through our collection of plants</p>
        </div>

        <Filters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          stock={stock}
          setStock={setStock}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />

        <div className="plants-grid">
          {data.map((user) => (
            <ul key={user._id} className="card">
              <img src={user.avatar} alt={user.plantName} className="thumb" />
              <li className="title">{user.plantName}</li>
              <li className="title">₹{user.price}</li>
              <li className="cat">{user.category}</li>
              <li
                style={{
                  color: user.stock > 0 ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {user.stock > 0 ? "In Stock" : "Out of Stock"}
              </li>
            </ul>
          ))}
        </div>

        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={page === i + 1 ? "active" : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlantCatalog;
