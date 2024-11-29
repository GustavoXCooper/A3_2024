import { db } from '../firebase.js';

async function registerEnergyReading(payload) {
    try {
        const {
            deviceId,
            energyConsumption,
            voltage,
            current,
            powerFactor,
            timestamp,
        } = payload.body;

        if (!deviceId || !energyConsumption || !timestamp) {
            throw new Error('Campos obrigatórios estão ausentes!');
        }

        // referência para o documento no Firestore
        const docRef = db
            .collection('energy-consumption')
            .doc(deviceId)
            .collection('readings')
            .doc(deviceId);

        // dados a serem salvos no Firestore
        const data = {
            energyConsumption,
            voltage,
            current,
            powerFactor,
            timestamp,
        };

        // salva no Firestore
        await docRef.set(data);
        console.log(`Leitura registrada para ${deviceId} com sucesso!`);
    } catch (error) {
        console.error('Erro ao registrar leitura:', error.message);
        throw error;
    }
}

export default registerEnergyReading;
