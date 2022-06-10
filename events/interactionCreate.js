const logger = require('lib/logger');
const commands = require('commands/entry');

// When the client is ready, run this code (only once)
module.exports = {
  name: 'interactionCreate',
  once: false,
  async execute(interaction) {
    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      logger.error({ msg: 'Error!', error });

      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  },
};
