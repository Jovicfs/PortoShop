import User from '../db/models/user.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Router } from 'express';

const router = Router();

router.get('/register', async(req,res)=>{
    const{username, password, email} = req.body;
    try{
        const checkUser = await User.findOne({$or: [{username}, {email}]});
        if(checkUser){
            return res.status(400).json({message: 'Nome de usuário já existe!'});
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({username, password: hashedPassword, email});
        await newUser.save();
    } 
     catch(error){
          res.status(500).json({message: 'Erro ao registrar usuário'})
     }
});

router.get('/login',async(req,res)=>{
    const {username, password} = req.body;
    try{
        const user =  await User.findOne({username});
        if(!user){
            req.status(401).json({message: 'Usuário não encontrado'});
        }
       const isMatch =  await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message:'Senha Incorreta!'})
        }
      const token =  jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'});

     res.cookie('token', token,{
        httpOnly:true,
        secure: true,
        sameSite: 'strict'
     }); 
     res.json({message: 'Login efetuado com sucesso!'})
    }
    catch(error){
        res.status(500).json({message: 'Erro ao fazer login!'});
    }
 });

 router.get('/logout', (req, res) => {
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