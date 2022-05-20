// 国际化
import Vue from 'vue';
import VueI18n from 'vue-i18n';

const lang = localStorage.getItem('r3-component-lang');

if (!('$i18n' in Vue.prototype)) {
  Vue.use(VueI18n);
}

const i18n = new VueI18n({
  locale: lang || 'zh', // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale 
  messages: {
    zh: require('./zh').default, // 中文语言包
    en: require('./en').default // 英文语言包
  }
});

// 挂全局方便测试用
window.ArkComponentI18n = function ArkComponentI18n(language) {
  i18n.locale = language;
  localStorage.setItem('r3-component-lang', language);
};

export const locale = window.ArkComponentI18n; // 暴露接口给引用方使用

export default i18n;
