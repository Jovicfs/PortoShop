import jwt from 'jsonwebtoken';
import 'dotenv/config';
const authMiddleware = (req, res, next) => {
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (isDevelopment) {
        // Se estiver em ambiente de desenvolvimento, permita acesso sem autenticação
        return next();
    }
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Autenticação necessária' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

export default authMiddleware;
