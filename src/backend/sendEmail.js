import cron from 'node-cron';
import { calculateWeeklyAverage } from './createEmail.js';

// T enviar o relatório semanal
cron.schedule('0 9 * * 4', async () => {
    console.log(`[${new Date().toISOString()}] Enviando relatório semanal...`);
    try {
        await calculateWeeklyAverage();  // envia o relatório
        console.log(`[${new Date().toISOString()}] Relatório semanal enviado com sucesso!`);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Erro ao enviar relatório semanal:`, error);
    }
});

console.log('Agendamento de envio de relatórios iniciado...');
console.log('Relatório semanal será enviado toda quinta-feira às 09:00.');