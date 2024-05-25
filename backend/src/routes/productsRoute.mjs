import express from 'express';
import { Router } from 'express';
import Product from '../db/models/product.mjs';
import 'dotenv/config';

const router = Router();

// Pegar todos os produtos salvos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST de novos produtos
router.post('/', async (req, res) => {
    const { name, description, price, category, imageUrl } = req.body;

    // Verificação de campos obrigatórios
    if (!name || !description || !price || !category || !imageUrl) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }
    
    const newProduct = new Product({
        name,
        description,
        price,
        category,
        imageUrl
    });

    try {
        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
