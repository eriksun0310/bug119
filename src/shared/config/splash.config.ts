// Splash Screen 配置

export const SPLASH_CONFIG = {
  // 動畫時間配置
  ANIMATIONS: {
    LOGO_SCALE_DURATION: 600,
    LOGO_OPACITY_DURATION: 500,
    TITLE_ANIMATION_DURATION: 400,
    SUBTITLE_ANIMATION_DURATION: 300,
    HOLD_DURATION: 500, // 動畫完成後等待時間
  },
  
  // 預載設定
  PREPARATION: {
    MIN_DISPLAY_TIME: 1500, // 最少顯示時間 (毫秒)
    MOCK_LOADING_TIME: 500, // 模擬載入時間
  },
  
  // Logo 設定
  LOGO: {
    SIZE: 120,
    SCALE_EFFECT: 1.2, // 彈跳效果強度
  },
  
  // 字體設定
  TYPOGRAPHY: {
    TITLE_SIZE: 48,
    TITLE_LETTER_SPACING: 1,
  }
} as const