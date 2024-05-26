import { useState, useEffect } from 'react';
import { getProducts } from './Api/api.mjs';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
export function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Função para carregar os produtos da API ao carregar o componente
    const fetchProducts = async () => {
      try     { 
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error.message);
      }
    };

    fetchProducts(); // Chama a função para carregar os produtos da API
  }, []); // Executa apenas uma vez, quando o componente é montado


  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App