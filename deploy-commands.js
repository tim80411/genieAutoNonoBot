const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');

const commands = require('commands/entry');
const logger = require('lib/logger');

dotenv.config();
const { CLIENT_ID: clientId, GUIDE_ID: guildId, DISCORD_TOKEN: token } = process.env;

const mapfn = (commandObj) => commandObj.data.toJSON();
const commandsArr = Array.from(commands.values(), mapfn);

const rest = new REST({ version: '9' }).setToken(token);
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commandsArr })
  .then(() => logger.info({ msg: 'Successfully registered application commands.' }))
  .catch((error) => logger.error({ msg: 'error occur', error }));
