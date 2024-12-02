import admin from 'firebase-admin';
import serviceAccount from './monitoramento-de-energia-79a8f-firebase-adminsdk-zesud-86366cc51a.json' assert { type: 'json' };

// Verifica se o Firebase já foi inicializado
if (admin.apps.length === 0) {
    // Inicializa o Firebase Admin SDK apenas se não tiver sido inicializado anteriormente
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
} else {
    console.log('Firebase já inicializado.');
}

const db = admin.firestore();
const auth = admin.auth();

// Função para gerar um token customizado
async function generateCustomToken(uid) {
    try {
        const token = await auth.createCustomToken(uid); // Gera um token customizado com base no UID
        console.log('Token gerado:', token);
        return token;
    } catch (error) {
        console.error('Erro ao gerar token:', error);
    }
}

// Exportação nomeada
export { db, auth, generateCustomToken };
