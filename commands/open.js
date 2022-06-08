const { SlashCommandBuilder } = require('@discordjs/builders');
const path = require('node:path');
const SettingService = require('services/SettingService');

// 只取得檔案名稱
const extension = path.extname(__filename);
const filename = path.basename(__filename, extension);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`${filename}`)
    .setDescription('開啟nono機器人'),
  async execute(interaction) {
    const updatedSetting = await SettingService.updateSetting('isBotOpen', true);
    if (updatedSetting.isBotOpen) {
      await interaction.reply({ content: '自動nono已開啟', ephemeral: true });
    } else {
      const content = `目前開關狀態為: ${updatedSetting.isBotOpen}, 自動nono異常, 請聯絡開發者`;
      await interaction.reply({ content, ephemeral: true });
    }
  },
};
