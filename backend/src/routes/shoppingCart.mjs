import express from 'express';
import ShoppingCart from '../db/models/cart.mjs';
import User from '../db/models/user.mjs';
import Product from '../db/models/product.mjs';

const router = express.Router();

// Adicionar um item ao carrinho
router.post('/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ error: 'Usuário ou produto não encontrado' });
    }

    let cart = await ShoppingCart.findOne({ user: userId });
    if (!cart) {
      cart = new ShoppingCart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.product.equals(productId));

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remover um item do carrinho
router.post('/remove', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ error: 'Usuário ou produto não encontrado' });
    }

    let cart = await ShoppingCart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: 'Carrinho não encontrado' });
    }

    cart.items = cart.items.filter(item => !item.product.equals(productId));

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar a quantidade de um item no carrinho
router.post('/update', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ error: 'Usuário ou produto não encontrado' });
    }

    let cart = await ShoppingCart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: 'Carrinho não encontrado' });
    }

    const itemIndex = cart.items.findIndex(item => item.product.equals(productId));

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      return res.status(404).json({ error: 'Produto não encontrado no carrinho' });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter o carrinho de um usuário
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const cart = await ShoppingCart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ error: 'Carrinho não encontrado' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
