import { Router } from 'express';
import { db } from './firebase.js';

const router = Router();

router.post('/data', async (req, res) => {
    try {
        const { value, deviceId, timestamp } = req.body;

        if (!value || !deviceId || !timestamp) {
            return res.status(400).send('Dados incompletos na requisição');
        }

        // salva os dados no Firestore
        const data = { value, deviceId, timestamp };
        const docRef = await db.collection('leituras').add(data);

        console.log('Dados registrados com sucesso no Firestore:', docRef.id);
        res.status(201).send({ message: 'Dados registrados com sucesso', id: docRef.id });
    } catch (error) {
        console.error('Erro ao registrar dados:', error);
        res.status(500).send('Erro interno do servidor');
    }
});


export default router;
