'use strict';

var fs = require('fs');
var path = require('path');
var langConfig = require('../../examples/i18n/page.json');

langConfig.forEach(lang => {
  try { // 判断各语言所对应的 页面组件（首页、指南、主题等组件）所在的文件夹 是否存在
    fs.statSync(path.resolve(__dirname, `../../examples/pages/${ lang.lang }`));
  } catch (e) {
    fs.mkdirSync(path.resolve(__dirname, `../../examples/pages/${ lang.lang }`));
  }

  Object.keys(lang.pages).forEach(page => {
    // 各页面组件模板(.tpl)的地址（index、theme、changelog、design、guide...
    var templatePath = path.resolve(__dirname, `../../examples/pages/template/${ page }.tpl`);
    var outputPath = path.resolve(__dirname, `../../examples/pages/${ lang.lang }/${ page }.vue`);
    var content = fs.readFileSync(templatePath, 'utf8');
    var pairs = lang.pages[page];

    Object.keys(pairs).forEach(key => {
      // 内容替换，如 <%= 1 > 替换为 '网站快速成型工具'
      content = content.replace(new RegExp(`<%=\\s*${ key }\\s*>`, 'g'), pairs[key]);
    });

    // 输出为 .vue 文件
    fs.writeFileSync(outputPath, content);
  });
});
