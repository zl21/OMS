const path = require('path');

module.exports = {
  projectsTitle: 'Your Project Name', // 项目title
  // qiaochuTitle: '巧厨电商',
  projectIconPath: path.join(__dirname, './favicon.ico'), // 项目icon,
  burgeonProxy: ['/p/c', '/p/cs', '/api'],
  // target: 'http://47.103.6.45:27777', // 项目后端服务地址(OMS2.0)
  target: 'http://r3.ecsemir.com', // 项目后端服务地址(OMS2.0)
  omsTheme: 'senmir', // 标品样式主题包[coralRed,skyBlue]; 

  build: {
    //  Gzip  off  by  default  as  many  popular  static  hosts  such  as
    //  Surge  or  Netlify  already  gzip  all  static  assets  for  you.
    //  Before  setting  to  `true`,  make  sure  to:
    //  npm  install  --save-dev  compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],

    //  Run  the  build  command  with  an  extra  argument  to
    //  View  the  bundle  analyzer  report  after  build  finishes:
    //  `npm  run  build  --report`
    //  Set  to  `true`  or  `false`  to  always  turn  it  on  or  off
    bundleAnalyzerReport: process.env.npm_config_report
  }

};
/**
 * 关于国际化
 * 1.使用说明请参见依赖包中的README.md文档(node_modules/@burgeon/internationalization/README.md)
 * 2.用例demo见本项目WelcomePage.vue
 */
