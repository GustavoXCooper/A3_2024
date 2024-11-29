import { processDevices } from "./device.js";

// executar o envio a cada 15 minutos
setInterval(processDevices, 15 * 60 * 1000);

// chamada inicial para enviar imediatamente ao iniciar
processDevices();
