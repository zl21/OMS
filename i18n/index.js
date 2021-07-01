import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './langs/zh_CN/zh'
import en from './langs/en_US/en'
import ja from './langs/ja'
import ChineseDictionary from './langs/ChineseDictionary'

Vue.use(VueI18n)

const messages = {
  en: Object.assign(en,ChineseDictionary),
  zh: Object.assign(zh,ChineseDictionary),
  ja: Object.assign(ja),
}

var i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'zh',
  messages 
})

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
  // i18n.messages[lan] = lanData;
}

export default i18n