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

        // referencia a subcoleção de readings
        const readingsRef = db
            .collection('energy-consumption')
            .doc(deviceId)
            .collection('readings');

        // dados a serem salvos
        const data = {
            energyConsumption,
            voltage,
            current,
            powerFactor,
            timestamp,
        };

        // adiciona um novo documento
        await readingsRef.add(data);
        console.log(`Leitura registrada para ${deviceId} com sucesso!`);
    } catch (error) {
        console.error('Erro ao registrar leitura:', error.message);
        throw error;
    }
}

export default registerEnergyReading;
