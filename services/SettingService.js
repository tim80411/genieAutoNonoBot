const _ = require('lodash');
const fsPromises = require('fs').promises;

const config = require('config/config');
const logger = require('lib/logger');

class SettingService {
  /**
   * 更新botSetting
   * @param {String} path 欲被更新的欄位路徑，支援dot，參考_.set
   * @param {any} value 值
   */
  static async updateSetting(path, value) {
    logger.info({ msg: 'start updateSetting', path, value });
    const botSettingJSON = await fsPromises.readFile(config.path.botSetting, 'utf-8');
    const botSetting = JSON.parse(botSettingJSON);

    const updatedBotSetting = _.set(botSetting, path, value);

    await fsPromises.writeFile(config.path.botSetting, JSON.stringify(updatedBotSetting));
    logger.info({
      msg: 'finish updateSetting', path, value, updatedBotSetting,
    });

    return updatedBotSetting;
  }
}

module.exports = SettingService;
