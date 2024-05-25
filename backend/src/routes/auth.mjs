import User from '../db/models/user.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Router } from 'express';

const router = Router();

// Rota de Registro
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const checkUser = await User.findOne({ $or: [{ username }, { email }] });
        if (checkUser) {
            return res.status(400).json({ message: 'Nome de usuário ou email já existe!' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword, email });
        await newUser.save();
        
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message });
    }
});

// Rota de Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Senha incorreta!' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '6h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
        res.json({ message: 'Login efetuado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login!', error: error.message });
    }
});

// Rota de Logout
router.post('/logout', (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.redirect('/login');
    }
    try {
        res.cookie('token', '', {
            expires: new Date(0),
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
        return res.redirect('/login');
    } catch (error) {
        return res.redirect('/login');
    }
});

export default router;
