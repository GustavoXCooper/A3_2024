import { calculateWeeklyAverage } from './createEmail.js';

async function simulateWeeklyEmail() {
    try {
        console.log(`[${new Date().toISOString()}] Simulando envio de relatório semanal...`);
        await calculateWeeklyAverage(); // envia o relatório
        console.log(`[${new Date().toISOString()}] Relatório semanal simulado com sucesso!`);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Erro ao simular envio de relatório semanal:`, error);
    }
}

simulateWeeklyEmail();
