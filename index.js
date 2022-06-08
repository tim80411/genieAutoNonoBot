const { Client, Intents } = require('discord.js');

const commands = require('commands/entry');
const logger = require('lib/logger');

const token = process.env.DISCORD_TOKEN;
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
// @ts-ignore
client.commands = commands;

// When the client is ready, run this code (only once)
client.once('ready', () => {
  logger.info({ msg: 'Ready!' });
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    logger.error({ msg: 'Error!', error });

    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

// Login to Discord with your client's token
client.login(token);
