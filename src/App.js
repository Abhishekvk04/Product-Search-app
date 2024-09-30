// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './store/productSlice';
import ProductCatalog from './pages/index';
import Cart from './pages/Cart';

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<ProductCatalog />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;


// Limitations:
// 1. The app doesn't implement server-side rendering, which could improve initial load time and SEO.
// 2. There's no caching mechanism for previously fetched data, which could reduce unnecessary API calls.
// 3. Error handling is basic and could be improved with more informative error messages and recovery strategies.
// 4. The app doesn't implement any accessibility features, which could limit usability for some users.
// 5. The infinite scrolling implementation could be improved with a more seamless UX, such as automatically loading more products when the user scrolls near the bottom of the page.
// 6. The app doesn't have any data persistence, so refreshing the page will reset the state.
// 7. There's no sorting functionality for the products, which could be a useful feature for users.
// 8. The app doesn't have any loading indicators for individual product cards, which could improve perceived performance.
// 9. The app uses client-side routing for query parameters, which may not work well with browser back/forward navigation.