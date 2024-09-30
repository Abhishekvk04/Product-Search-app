import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProducts, setSelectedCategory, setSearchTerm, addToCart } from '../store/productSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Search } from 'lucide-react';
import { Tooltip } from '../components/ui/tooltip';
import '../styles/styles.css'; // Import custom CSS

function ProductCatalog() {
  const dispatch = useDispatch();
  const { categories, products, selectedCategory, searchTerm, loading, totalProducts, cart } = useSelector((state) => state.product);
  const [page, setPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || '';
    const search = urlParams.get('search') || '';

    dispatch(setSelectedCategory(category));
    dispatch(setSearchTerm(search));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts({ category: selectedCategory, search: searchTerm, limit: productsPerPage, skip: (page - 1) * productsPerPage }));
  }, [dispatch, selectedCategory, searchTerm, page]);

  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category));
    setPage(1);
    updateQueryParams({ category, search: searchTerm });
  };

  const handleSearchChange = (e) => {
    const search = e.target.value;
    dispatch(setSearchTerm(search));
    setPage(1);
    updateQueryParams({ category: selectedCategory, search });
  };

  const updateQueryParams = (params) => {
    const urlParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        urlParams.set(key, value);
      } else {
        urlParams.delete(key);
      }
    });
    window.history.pushState({}, '', `${window.location.pathname}?${urlParams}`);
  };

  const loadMoreProducts = () => {
    if (products.length < totalProducts) {
      setPage(page + 1);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="container">
      <h1 className='name'>ShopEase</h1>
      <header>
        
        <div className="header-inner">
          <div className="header-input-group">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Search />
          </div>

          <Tooltip content="Cart">
            <div className="shopping-cart">
              <Link to="/cart">
                <ShoppingCart size={24} />
                {cart.length > 0 && <div className="cart-count">{cart.length}</div>}
              </Link>
            </div>
          </Tooltip>
        </div>
      </header>

      <main className="main">
        <div className="product-header">
          <h2>Products</h2>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name} {/* Ensure you're rendering the category name */}
              </option>
            ))}
          </select>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <motion.div
              className="product-card"
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <img src={product.thumbnail} alt={product.title} />
              <div className="product-details">
                <h3>{product.title}</h3> {/* Ensure title is a string */}
                <p>{product.description}</p> {/* Ensure description is a string */}
                <div className="product-footer">
                  <span className="product-price">${product.price}</span> {/* Ensure price is a number */}
                  <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {loading && <div className="loader"></div>}

        {products.length < totalProducts && (
          <button onClick={loadMoreProducts} className="load-more-btn">Load More</button>
        )}
      </main>
    </div>
  );
}

export default ProductCatalog;
