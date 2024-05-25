import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import productRoute from './routes/productsRoute.mjs'
import auth from './routes/auth.mjs'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import shoppingCart from './db/models/cart.mjs';
const app = express();
const port = process.env.PORT || 3000;
const dbrUri = process.env.database_URL;

//Express Config
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

//Conectar com o banco do mongodb
mongoose.connect(dbrUri).then(()=>console.log('conectado ao banco de dados'))
  .catch((error)=>console.error('A conexão com o banco de dados falhou'));

const db =  mongoose.connection;

db.on('connected', () =>{
   console.log(`conectando ao banco de dados`)
})


db.on('error', (err)=>{
   console.log('A conexão falhou' + err)
})

db.on('disconnected', ()=>{
   console.log('Desconecatado do banco de dados')
})



// Middleware de Autenticação
app.use('/', (req, res, next) => {
   const currentURL = `${req.secure ? 'https' : 'http'}://${req.hostname}${req.url}`;
   try {
       const parsedURL = new URL(currentURL);
       const routPath = parsedURL.pathname;
       if (routPath === '/') {
           if (!req.cookies || !req.cookies.token) {
               return res.redirect('/login');
           }
           const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
           if (!token) { // visitante sem o token
               return res.redirect('/login');
           }
            //token ok
       }
       // Se a rota for a /register 
       if (routPath === '/register') {
           if (req.cookies && req.cookies.token) {
               return res.redirect('/');
           }
       }
   } catch (error) {
       console.error('Invalid URL:', currentURL);
       return res.status(400).send('Invalid URL');
   }
   next();
});

// Rotas
app.use('/api/products', productRoute);
app.use('/api/auth', auth);
app.use('/api/cart',shoppingCart);

app.listen(process.env.PORT,()=>{
    console.log(`Servidor rodando em http://localhost:${port}`)
 })
 
