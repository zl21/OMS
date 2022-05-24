import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from '@/langs/zh_CN/zh'
import en from '@/langs/en_US/en'
import ja from '@/langs/ja-JP/ja'
import r3zh from '@/langs/zh_CN/r3zh'
import r3en from '@/langs/en_US/r3en'
// import ja from './langs/ja'
// import ChineseDictionary from '@/langs/ChineseDictionary'

Vue.use(VueI18n)

window.ChineseDictionary = require('@/langs/ChineseDictionary').default

const messages = {
  en: Object.assign(en, r3en, ChineseDictionary),
  zh: Object.assign(zh, r3zh, ChineseDictionary),
  ja: Object.assign(ja, ChineseDictionary),
}

if (!localStorage.getItem('locale')) {
  localStorage.setItem('locale', 'zh');
}

VueI18n.prototype.editI18n = function (obj) {
  const lan = i18n.locale;
  const lanData = messages[lan];
  for (const x in obj) {
    if (!Object.keys(obj[x])) return  // 传入空对象
    if (typeof lanData[x] === 'string') {
      lanData[x] = obj[x];
    } else {
      for (const key in obj[x]) {
        if (lanData[x]) {
          lanData[x][key] = obj[x][key];
        } else {
          lanData[x] = obj[x];
        }
      }
    }
  }
}
VueI18n.prototype.version = require('./package.json').version

export default new VueI18n({
  locale: localStorage.getItem('locale') || 'zh',
  messages
})