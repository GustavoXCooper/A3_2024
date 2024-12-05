import admin from 'firebase-admin';
import serviceAccount from './monitoramento-de-energia-79a8f-firebase-adminsdk-zesud-86366cc51a.json' assert { type: 'json' };

// verifica se o Firebase já foi inicializado
if (admin.apps.length === 0) {
    // inicializa o Firebase Admin SDK  se não tiver sido inicializado ainda
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
} else {
    console.log('Firebase já inicializado.');
}

const db = admin.firestore();
const auth = admin.auth();

// gera um token customizado
async function generateCustomToken(uid) {
    try {
        const token = await auth.createCustomToken(uid); //token customizado com base no UID
        console.log('Token gerado com sucesso!');
        return token;
    } catch (error) {
        console.error('Erro ao gerar token:', error);
    }
}

export { db, auth, generateCustomToken };
