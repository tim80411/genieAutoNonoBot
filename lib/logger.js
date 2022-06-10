const pino = require('pino');

const logger = pino({
  level: 'trace', // level 低於設定者不會顯示
  timestamp: pino.stdTimeFunctions.isoTime,
  nestedKey: null,
  base: null,
});

module.exports = logger;
