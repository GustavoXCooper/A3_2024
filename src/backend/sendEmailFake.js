import { calculateWeeklyAverage } from './createEmail.js';

async function simulateWeeklyEmail() {
    try {
        console.log(`[${new Date().toISOString()}] Simulando envio de relatório semanal...`);
        await calculateWeeklyAverage(); // Envia o relatório semanal
        console.log(`[${new Date().toISOString()}] Relatório semanal simulado com sucesso!`);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Erro ao simular envio de relatório semanal:`, error);
    }
}

// Chama a função de simulação de envio
simulateWeeklyEmail();
