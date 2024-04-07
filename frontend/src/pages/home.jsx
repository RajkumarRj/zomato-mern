//

import React, { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./header";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../reducer/cartSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [pro, setPro] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Number of products to display per page

  const getTotalItems = () => {
    const { cart } = useSelector((state) => state.cart);
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  const [SearchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/product");

        const products = response.data;
        const filterproduct = products.filter((product) =>
          product.title.toLowerCase().includes(SearchTerm.toLowerCase())
        );
        if (!SearchTerm) {
          setPro(products);
        }
        setPro(filterproduct);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [SearchTerm]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = pro.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlecart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="main">
      <Header />
      <main>
        <input
          className="inp-search"
          type="text"
          placeholder="Search here..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="container-rest">
          {currentProducts.map((product) => (
            <div className="rest-card" key={product._id}>
              <div className="rest-box">
                <h3 className="rest-title">{product.title}</h3>
                <img src={product.image} alt={product.title} />

                <p>{product.category}</p>
                <p>{product.description.slice(0, 10)}</p>
                <p>
                  Price: <span className="bold">{product.price}</span>
                </p>
              </div>

              <button
                className="cart-button"
                onClick={() => handlecart(product)}
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>

        <div className="pagination">
          {Array.from({ length: Math.ceil(pro.length / productsPerPage) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
