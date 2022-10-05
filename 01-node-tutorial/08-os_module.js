const os = require("os");

// Mostra info do usuario atual
const user = os.userInfo();
console.log(user);

// Mostra o tempo de atividade do sistema em segundos
console.log(`O tempo de atividade do sistema é ${os.uptime()} segundos.`);

const currentOs = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
};
console.log(currentOs);
