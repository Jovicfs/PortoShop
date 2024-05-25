import mongoose from "mongoose";

  // Esquema de item no carrinho
const cartItemSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity:{
        type: Number,
        required: true,
        default: 1
    },
});

// Esquema do carrinho de compras

const shoppingCartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [cartItemSchema],
    createdAt:{
        type: Date,
        default: Date.now
    }
});
    
 const shoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

export default shoppingCart;


