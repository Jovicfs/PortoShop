import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import productRoute from './routes/productsRoute.mjs'
const app = express();

const port = process.env.PORT || 3000;
const dbrUri = process.env.database_URL;


//Express Config
app.use(cors());
app.use(express.json());

//Conectar com o banco do mongodb
mongoose.connect(dbrUri,{
      useNewUrlParser: true,
      useUnifiedTopology: true,     
}).then(()=>console.log('conectado ao banco de dados'))
  .catch((error)=>console.error('A conexão com o banco de dados falhou'));

const db =  mongoose.connection;

db.on('connected', () =>{
   console.log(`conectando ao banco ${dbrUri}`)
})


db.on('error', (err)=>{
   console.log('A conexão falhou' + err)
})

db.on('disconnected', ()=>{
   console.log('Desconecatado do banco de dados')
})

app.listen(process.env.PORT,()=>{
   console.log(`Servidor rodando em http://localhost:${port}`)
})

// Rotas
app.get('/', (req, res) => {
   res.send('Hello World!');
 });

app.use('/api/products', productRoute);

