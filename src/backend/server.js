import dotenv from 'dotenv';
import express from 'express';
import { generateCustomToken } from './firebase.js'; // Importa a função para gerar o token
import routes from './routes.js';

dotenv.config(); // Carrega as variáveis de ambiente

const app = express();
app.use(express.json());

// Variável para armazenar o token gerado
let globalToken = null;

// Gera um token customizado ao iniciar o servidor
async function generateTokenAtStartup() {
  const uid = 'some-unique-user-id'; // Defina o UID de forma fixa ou dinâmica, conforme necessário
  globalToken = await generateCustomToken(uid); // Gera e armazena o token
}

// Gera o token ao iniciar o servidor
generateTokenAtStartup();

// Usando as rotas do arquivo routes.js
app.use('/api', routes);

// Inicializa o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
