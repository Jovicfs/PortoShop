import mongoose from "mongoose";
 
const productSchema = new mongoose.Schema({  
   name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 100
   },
   description: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 500
   },
   price: {
      type: Number,
      required: true,
      min: 0
   },
   category: {
      type: String,
      required: true,
      enum: ['Eletrônicos', 'Roupas', 'Livros', 'Moda', 'Brinquedos', 'Outros']
   },
   imageUrl: {
      type: String,
      required: true,
      validate: {
         validator: function(v) {
            return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/i.test(v);
         },
         message: props => `${props.value} não é uma URL de imagem válida!`
      }
   },
   stockQuantity: {
      type: Number,
      default: 0,
      min: 0
   },
   createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   createdAt: {
      type: Date,
      default: Date.now
   },
   updatedAt: {
      type: Date,
      default: Date.now
   }
});

productSchema.index({ name: 'text', category: 'text' }); // Indexar campos para busca de texto

const Product = mongoose.model('Product', productSchema);

export default Product;
