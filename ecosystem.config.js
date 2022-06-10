const { NODE_ENV } = process.env;

module.exports = {
  apps: [
    {
      name: `nonoBot-${NODE_ENV}`, // App 名稱
      script: './index.js', // 執行服務的入口檔案
      watch: true, // 適合開發時用，檔案一有變更就會自動重啟
      max_memory_restart: '1000M', // 當佔用的 memory 達到設定值, 就自動重啟
      ignore_watch: ['node_modules'],
      time: false,
      merge_logs: true,
      listen_timeout: 8000, // 單位為 ms, 如果在該時間內 app 沒有聽 port 的話，強制重啟
      max_restarts: 10,
      autorestart: true,
      env: {
        NODE_PATH: '.',
      },
    },
  ],
};
