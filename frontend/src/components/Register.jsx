import React, { useState } from 'react';
import {register} from '../Api/api.mjs'
import { Navigate } from 'react-router';
export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    passwordMismatch: false
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Chama a função de registro com os dados do formulário
      await register(formData);
      // Redireciona o usuário para a página de login ou outra página relevante
      // Você pode usar o useHistory do react-router-dom para isso
    } catch (error) {
      console.error('Erro ao registrar:', error.message);
    }
  };
    // Aqui você pode adicionar a lógica para enviar os dados para a API
    console.log('Form data submitted:', formData);



    return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-6 max-w-sm w-full bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">Register</h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          {errors.passwordMismatch && (
            <p className="mt-2 text-sm text-red-600">Passwords do not match.</p>
          )}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white bg-blue-600 rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  };

 