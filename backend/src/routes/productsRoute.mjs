// Importações necessárias
import express from 'express';
import { Router } from 'express';
import Product from '../db/models/product.mjs';
import authMiddleware from '../middleware/authMiddleware.mjs';
import 'dotenv/config';

const router = Router();
router.use(authMiddleware);
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

// Excluir um produto pelo ID
router.delete('/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json({ message: 'Produto excluído com sucesso', deletedProduct });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Atualizar um produto pelo ID
router.put('/:productId', async (req, res) => {
    const { productId } = req.params;
    const { name, description, price, category, imageUrl } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, { name, description, price, category, imageUrl }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
