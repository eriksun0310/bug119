const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 確保正確處理 TypeScript 和 JavaScript 檔案
config.resolver.sourceExts = ['js', 'json', 'ts', 'tsx', 'jsx'];

// 設定正確的 MIME 類型處理
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware, server) => {
    return (req, res, next) => {
      // 處理 TypeScript 檔案的 MIME 類型
      if (req.url && req.url.includes('.ts')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
      return middleware(req, res, next);
    };
  },
};

module.exports = config;