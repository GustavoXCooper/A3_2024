import cron from 'node-cron';
import { calculateWeeklyAverage } from './createEmail.js';

// Tarefa para enviar o relatório semanal toda segunda-feira às 09:00
cron.schedule('0 9 * * 1', async () => {
    console.log(`[${new Date().toISOString()}] Enviando relatório semanal...`);
    try {
        await calculateWeeklyAverage();  // Chama a função para enviar o relatório semanal
        console.log(`[${new Date().toISOString()}] Relatório semanal enviado com sucesso!`);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Erro ao enviar relatório semanal:`, error);
    }
});

console.log('Agendamento de envio de relatórios iniciado...');
console.log('Relatório semanal será enviado toda segunda-feira às 09:00.');