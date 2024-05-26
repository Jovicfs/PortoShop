import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // A URL base da sua API
});

// Funções de autenticação
export const register = async (username, email, password) => {
    try {
        const response = await api.post('/auth/register', { username, email, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Erro de conexão');
    }
};

export const login = async (username, password) => {
    try {
        const response = await api.post('/auth/login', { username, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Erro de conexão');
    }
};

export const logout = async () => {
    try {
        const response = await api.post('/auth/logout');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Erro de conexão');
    }
};

// Funções de produtos
export const getProducts = async () => {
    try {
        const response = await api.get('/products');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Erro de conexão');
    }
};

export const addProduct = async (name, description, price, category, imageUrl) => {
    try {
        const response = await api.post('/products', { name, description, price, category, imageUrl });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Erro de conexão');
    }
};

// Funções de carrinho de compras
export const getCart = async () => {
    try {
        const response = await api.get('/cart');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Erro de conexão');
    }
};

export const addItemToCart = async (productId, quantity) => {
    try {
        const response = await api.post('/cart/add', { productId, quantity });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Erro de conexão');
    }
};

export const removeItemFromCart = async (productId) => {
    try {
        const response = await api.post('/cart/remove', { productId });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Erro de conexão');
    }
};

export const updateCartItem = async (productId, quantity) => {
    try {
        const response = await api.post('/cart/update', { productId, quantity });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Erro de conexão');
    }
};

export const clearCart = async () => {
    try {
        const response = await api.post('/cart/clear');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Erro de conexão');
    }
};

export default api;
