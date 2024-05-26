import React from 'react';
import { login } from '../Api/api.mjs';


export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-6 max-w-sm w-full bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">Login</h2>
        <form className="mt-4">
          <div>
            <label className="block text-sm">Email</label>
            <input type="email" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 dark:bg-gray-700 dark:text-white" />
          </div>
          <div className="mt-4">
            <label className="block text-sm">Password</label>
            <input type="password" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 dark:bg-gray-700 dark:text-white" />
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white bg-blue-600 rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
