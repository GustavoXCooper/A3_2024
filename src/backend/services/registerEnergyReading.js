import { db } from '../firebase.js';

async function registerEnergyReading(deviceId, value, timestamp) {
    try {
        console.log(`Registrando leitura: ${deviceId} - ${timestamp} com valor: ${value}`);
        // caso o timestamp seja um objeto date, converte para string
        const timestampStr = timestamp instanceof Date ? timestamp.toISOString() : timestamp;

        // referência para o documento no Firestore
        const docRef = db
            .collection('energy-consumption')
            .doc(deviceId)
            .collection('readings')
            .doc(timestampStr);

        // dados a serem salvos
        const data = { value, timestamp: timestampStr };

        // salva no Firestore
        await docRef.set(data);
        console.log(`Leitura registrada: ${deviceId} - ${timestampStr}`);
    } catch (error) {
        console.error('Erro ao registrar leitura:', error);
        throw error;
    }
}

export default registerEnergyReading;