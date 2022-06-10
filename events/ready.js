const logger = require('lib/logger');

// When the client is ready, run this code (only once)
module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    logger.info({ msg: `Ready! Logged in as ${client.user.tag}` });
  },
};
