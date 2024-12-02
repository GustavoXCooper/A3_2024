import registerEnergyReading from '../services/registerEnergyReading.js'; // função existente para registrar leituras

// Gera um valor aleatório entre min e max
function getRandomValue(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

// Função para gerar e registrar leituras de energia
async function populateEnergyReadings() {
    try {
        const devices = [
            'DEVICE_A1', 'DEVICE_A2', 'DEVICE_A3',
            'DEVICE_B1', 'DEVICE_B2', 'DEVICE_B3',
            'DEVICE_C1', 'DEVICE_C2', 'DEVICE_C3'
        ];

        const now = new Date();
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(now.getDate() - 14); // Ajusta para duas semanas atrás

        for (const deviceId of devices) {
            let currentDate = new Date(twoWeeksAgo);

            while (currentDate <= now) {
                const energyConsumption = getRandomValue(1, 10); // Consumo em kWh
                const voltage = getRandomValue(220, 230);        // Voltagem em V
                const current = getRandomValue(0.5, 10);        // Corrente em A
                const powerFactor = getRandomValue(0.8, 1);     // Fator de potência (0.8 a 1)

                // Monta o payload no formato esperado por registerEnergyReading
                const payload = {
                    body: {
                        deviceId,
                        energyConsumption,
                        voltage,
                        current,
                        powerFactor,
                        timestamp: currentDate.toISOString(),
                    },
                };

                // Registra a leitura
                await registerEnergyReading(payload);
                console.log(
                    `Leitura registrada para ${deviceId} em ${currentDate.toISOString()}`
                );

                // Incrementa a data atual em 6 horas
                currentDate.setHours(currentDate.getHours() + 6);
            }
        }
    } catch (error) {
        console.error('Erro ao popular leituras de energia:', error.message);
    }
}

populateEnergyReadings();