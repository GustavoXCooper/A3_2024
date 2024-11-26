// services/authService.js
import { auth } from '../firebase.js'; // Instância do Firebase Admin SDK

// gera um token personalizado com o UID do usuário
export async function getTokenForUser(uid) {
    try {
        const token = await auth.createCustomToken(uid); // gera token
        console.log('Token gerado:', token);
        return token;
    } catch (error) {
        console.error('Erro ao gerar token:', error);
        throw error;
    }
}
