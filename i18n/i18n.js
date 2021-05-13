import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './langs/zh_CN/zh'
import en from './langs/en_US/en'
import ja from './langs/ja'
import ChineseDictionary from './langs/ChineseDictionary'

Vue.use(VueI18n)

const messages = {
  en: Object.assign(en),
  zh: Object.assign(zh,ChineseDictionary),
  ja: Object.assign(ja),
}

const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'en',
  messages 
})

export default i18n