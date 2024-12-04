module.exports = {
  apps: [
    {
      name: "backend-server",
      script: "index.js", // O arquivo principal do backend
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "email-scheduler",
      script: "sendEmail.js", // Script para enviar e-mails semanalmente
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "data-simulator",
      script: "simulation.js", // Script para simular os dados dos dispositivos
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
