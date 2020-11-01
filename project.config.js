const path = require('path');

module.exports = {
  projectsTitle: 'Your Project Name', // 项目title
  // qiaochuTitle: '巧厨电商',
  projectIconPath: path.join(__dirname, './favicon.ico'), // 项目icon,
  target: 'http://139.224.134.69:8888', // 项目后端服务地址(OMS2.0)
  omsTheme: 'skyBlue'// 标品样式主题包[coralRed,skyBlue]; 
};
/**
 * 关于国际化
 * 1.使用说明请参见依赖包中的README.md文档(node_modules/@burgeon/internationalization/README.md)
 * 2.用例demo见本项目WelcomePage.vue
 */
