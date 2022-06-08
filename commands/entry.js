const _ = require('lodash');
const { Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const logger = require('lib/logger');

// 整理command
const commands = new Collection();
const commandsPath = __dirname;
const commandFiles = fs.readdirSync(commandsPath).filter((filename) => _.endsWith(filename, '.js'));

for (const filename of commandFiles) {
  if (_.eq(filename, 'entry.js')) continue;
  const filePath = path.join(commandsPath, filename);

  const command = require(filePath); // eslint-disable-line global-require,import/no-dynamic-require

  commands.set(command.data.name, command);
}

logger.debug({ msg: 'get commands collection done', commands });
module.exports = commands;
