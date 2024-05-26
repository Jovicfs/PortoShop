import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import productRoute from './routes/productsRoute.mjs';
import authRoute from './routes/auth.mjs';
import shoppingCart from './routes/shoppingCart.mjs'; // Corrigir a importação da rota do carrinho
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import authMiddleware from './middleware/authMiddleware.mjs'; // Importar middleware de autenticação

const app = express();
const port = process.env.PORT || 3000;
const dbUri = process.env.DATABASE_URL;

// Express Config
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(authMiddleware);

// Conectar com o banco do MongoDB
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Conectado ao banco de dados'))
  .catch((error) => console.error('A conexão com o banco de dados falhou:', error));

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Conectado ao banco de dados');
});

db.on('error', (err) => {
    console.log('A conexão falhou: ' + err);
});

db.on('disconnected', () => {
    console.log('Desconectado do banco de dados');
});

// Middleware de Autenticação
app.use('/', (req, res, next) => {
    const currentURL = `${req.secure ? 'https' : 'http'}://${req.hostname}${req.url}`;
    try {
        const parsedURL = new URL(currentURL);
        const routPath = parsedURL.pathname;
        if (process.env.NODE_ENV === 'development') {
            // Se estiver em ambiente de desenvolvimento, permita acesso sem token
            return next();
        }
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
app.use('/api/auth', authRoute);
app.use('/api/cart', authMiddleware, shoppingCart); // Proteger as rotas do carrinho com o middleware de autenticação

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
