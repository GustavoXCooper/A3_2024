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

        // Referência para a subcoleção de 'readings' do dispositivo
        const readingsRef = db
            .collection('energy-consumption')
            .doc(deviceId)
            .collection('readings');

        // Dados a serem salvos no Firestore
        const data = {
            energyConsumption,
            voltage,
            current,
            powerFactor,
            timestamp,
        };

        // Adiciona um novo documento com um ID gerado automaticamente
        await readingsRef.add(data); // Usa 'add' para criar um novo documento
        console.log(`Leitura registrada para ${deviceId} com sucesso!`);
    } catch (error) {
        console.error('Erro ao registrar leitura:', error.message);
        throw error;
    }
}

export default registerEnergyReading;
