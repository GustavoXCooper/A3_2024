import { db } from './firebase.js'; // Importa a configuração Firebase de outro arquivo
import { format, subWeeks } from 'date-fns';
import { sendEmail } from './email.js';

// Função para ler dados do Firestore
export const readData = async (colecao) => {
    const querySnapshot = await db.collection(colecao).get();
    console.log(querySnapshot);
}

export const readDataFromLastWeek = async (sector) => {
    const deviceData = {};
    const oneWeekAgo = subWeeks(new Date(), 1);
    const devices = [1, 2, 3]; // Dispositivos DEVICE_X1, DEVICE_X2, DEVICE_X3

    for (const device of devices) {
        const deviceId = `DEVICE_${sector}${device}`;  // Exemplo de deviceId (mude conforme necessário)
        const readingsRef = db.collection('energy-consumption').doc(deviceId).collection('readings');

        const querySnapshot = await readingsRef.get();

        if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
                const data = doc.data();
                const timestampStr = data.timestamp;
                const timestamp = new Date(timestampStr);  // Converte para objeto Date

                if (timestamp >= oneWeekAgo) {
                    if (!deviceData[deviceId]) {
                        deviceData[deviceId] = [];
                    }
                    deviceData[deviceId].push(data);
                }
            });
        } else {
            console.log(`Nenhum dado encontrado para ${deviceId} na última semana.`);
        }
    }

    return deviceData;
};


// Função para calcular o consumo médio semanal
export const calculateWeeklyAverage = async () => {
    const sectors = ['A', 'B', 'C'];  // Setores A, B e C
    let emailContent = '<h1>Relatório Semanal de Consumo de Energia</h1>';

    // Para cada setor, calcular o consumo médio semanal
    for (const sector of sectors) {
        emailContent += `<h2>Setor ${sector}</h2>`;
        const devices = [1, 2, 3]; // Dispositivos DEVICE_X1, DEVICE_X2, DEVICE_X3

        let sectorTotalConsumption = 0;
        let deviceDetails = '';

        // Coleta os dados da última semana usando a função readDataFromLastWeek
        const deviceData = await readDataFromLastWeek(sector); // Você precisaria ajustar a função para coletar dados de cada setor individualmente

        // Iterar pelos dispositivos e calcular as médias
        for (const device of devices) {
            const deviceId = `DEVICE_${sector}${device}`;

            // Se o dispositivo tiver dados, calcule o consumo total e médio
            if (deviceData && deviceData[deviceId]) {
                const readings = deviceData[deviceId];
                let deviceConsumption = 0;
                let readingsCount = 0;

                // Soma o consumo de energia para o dispositivo
                readings.forEach((data) => {
                    deviceConsumption += parseFloat(data.energyConsumption);
                    readingsCount++;
                });

                if (readingsCount > 0) {
                    const averageConsumption = deviceConsumption / readingsCount; // Consumo médio
                    deviceDetails += `
                        <p>Dispositivo ${deviceId}: Consumo médio: ${averageConsumption.toFixed(2)} kWh</p>
                    `;
                    sectorTotalConsumption += deviceConsumption; // Soma o total do setor
                } else {
                    deviceDetails += `<p>Dispositivo ${deviceId}: Sem dados</p>`;
                }
            }
        }

        // Adiciona os detalhes do setor e a média geral
        const sectorAverage = sectorTotalConsumption / devices.length;
        emailContent += `
            <p>Consumo total do setor ${sector}: ${sectorTotalConsumption.toFixed(2)} kWh</p>
            <p>Consumo médio do setor ${sector}: ${sectorAverage.toFixed(2)} kWh</p>
            ${deviceDetails}
        `;
    }

    // Envia o e-mail com o conteúdo gerado
    const now = new Date();
    const subject = `Relatório Semanal de Consumo de Energia - ${format(now, 'dd/MM/yyyy')}`;
    await sendEmail(subject, emailContent);
    console.log('Relatório semanal enviado com sucesso!');
}



