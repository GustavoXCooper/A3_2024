import { processDevices } from "./device.js";

// executa o envio a cada 15 minutos
setInterval(processDevices, 15 * 60 * 1000);

// p envia imediatamente quando inicia
processDevices();
