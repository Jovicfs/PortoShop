import React, { useState } from 'react';
import { login } from '../Api/api.mjs';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [message, setMessage] = useState(''); // Estado para armazenar a mensagem de resposta

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Efetua o login
      const response = await login(formData.username, formData.password);

      // Armazena a mensagem de resposta do backend no estado
      setMessage(response.message);
    } catch (error) {
      console.error('Erro ao efetuar login:', error.message);
      setMessage(error.message)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-6 max-w-sm w-full bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">Login</h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm dark:text-white">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm dark:text-white">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          {/* Exibe a mensagem de resposta do backend */}
          {message && (
            <div className="mt-4">
              <p className="text-sm text-green-600">{message}</p>
            </div>
          )}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white bg-blue-600 rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
