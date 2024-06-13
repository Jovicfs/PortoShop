import React from 'react';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import Products from './components/Products';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

function ProductPage() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 px-4 lg:px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <h1 className='text-center text-2xl font-bold my-4  dark:text-white'>Product List</h1>
        <Products />
      </div>
    </div>
  );
}

export default App;
