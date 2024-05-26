import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { getProducts } from './Api/api.mjs';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Função para carregar os produtos da API ao carregar o componente
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error.message);
      }
    };

    fetchProducts(); // Chama a função para carregar os produtos da API
  }, []); // Executa apenas uma vez, quando o componente é montado

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Lista de Produtos</h1>
        <ul>
          {products.map(product => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Preço: R$ {product.price}</p>
            </li>
          ))}
        </ul>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;