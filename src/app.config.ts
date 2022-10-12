import { AppConfig } from "remax/wechat";

const config: AppConfig = {
  pages: ['pages/index/index',
'pages/gamePattern/index',
'pages/rules/index',
'pages/settings/index',
'pages/game/index',
'pages/summary/index',
    'pages/AIGame/index',
  ],
  window: {
    navigationStyle:'custom'
  },
  lazyCodeLoading:'requiredComponents'
};

export default config;
