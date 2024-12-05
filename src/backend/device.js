import { getGlobalToken } from "./index.js";
import axios from "axios";

// IDs e departamentos dos dispositivos
const devicesId = ['1', '2', '3'];
const devicesDepartment = ['A', 'B', 'C'];

// função para gerar o ID único de um dispositivo
const createDeviceId = (department, id) => {
    const idBase = 'DEVICE';
    return `${idBase}_${department}${id}`;
};

// função para gerar valores pseudoaleatórios
const getRandomInRange = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(2);
};

// função para simular os dados de leitura do sensor
const generateEnergyData = (deviceId) => {
    if (!deviceId) {
        console.error("Erro: deviceId inválido.");
        return false;
    }

    const data = {
        timestamp: new Date().toISOString(),           // data e hora da leitura
        deviceId: deviceId,                            // ID único do sensor
        energyConsumption: getRandomInRange(0.5, 2.5), // consumo em kWh
        voltage: getRandomInRange(220, 240),           // tensão em volts
        current: getRandomInRange(1, 10),              // corrente em amperes
        powerFactor: getRandomInRange(0.85, 1),        // fator de potência
    };

    // Converter novamente para um objeto Date, caso queira manipular data/hora:
    const dateObject = new Date(data.timestamp);
    const date = dateObject.toISOString().split('T')[0]; // YYYY-MM-DD
    const hour = dateObject.toTimeString().split(' ')[0]; // HH:mm:ss

    console.log(`[${date} ${hour}] - Dados gerados para ${deviceId}:`, data);
    return data;
};

// função para enviar os dados ao backend
const sendData = async (deviceId) => {
    const data = generateEnergyData(deviceId);
    const token = getGlobalToken();
    const now = new Date();
    const date = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const hour = now.toTimeString().split(' ')[0]; // HH:mm:ss
    if (!data) return;

    try {
        const response = await axios.post('http://localhost:3000/api/data', data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        console.log(`[${date} ${hour}] - Dados enviados com sucesso para ${deviceId}.`);
        return response;
    } catch (error) {
        console.error(`Erro ao enviar dados para ${deviceId}:`, {
            message: error.message,
            response: error.response?.data || "Sem detalhes",
            status: error.response?.status || "Sem status"
        });
    }
};

// função para processar todos os dispositivos a cada 15 minutos
export const processDevices = async () => {
    const allDevices = [];

    // gerar todos os IDs únicos de dispositivos
    devicesDepartment.forEach((department) => {
        devicesId.forEach((id) => {
            const deviceId = createDeviceId(department, id);
            allDevices.push(deviceId);
        });
    });

    console.log("Dispositivos ativos:", allDevices);

    // envia os dados de todos os dispositivos
    allDevices.forEach((deviceId) => {
        sendData(deviceId);
    });
};

