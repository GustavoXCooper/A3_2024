import { auth } from '../firebase.js';

export async function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // extrai o token do cabeçalho

    if (!token) {
        return res.status(403).send('Token de autenticação não fornecido');
    }

    try {
        // verifica o token com o Firebase Admin SDK
        const decodedToken = await auth.verifyIdToken(token);
        req.user = decodedToken; // salva as informações do usuário na requisição
        next(); // passa para o próximo middleware/rota
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        res.status(401).send('Token de autenticação inválido');
    }
}
