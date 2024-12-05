import dotenv from 'dotenv';
import express from 'express';
import { generateCustomToken } from './firebase.js'; // Importa a função para gerar o token
import routes from './routes.js';

dotenv.config(); // Carrega as variáveis de ambiente

const app = express();
app.use(express.json());

// p armazenar o token
let globalToken = null;

// customizado quando inicia o servidor
async function generateTokenAtStartup() {
    const uid = '0000';
    globalToken = await generateCustomToken(uid); // gera e armazena o token
}

// gera o token ao iniciar o servidor
generateTokenAtStartup();

// para acessar o token gerado
export const getGlobalToken = () => globalToken;

// usando as rotas do arquivo routes.js
app.use('/api', routes);

// inicializa o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
