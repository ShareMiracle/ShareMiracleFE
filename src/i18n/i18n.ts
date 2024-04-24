// set i18n 
import { createI18n } from 'vue-i18n';
import en from './en.json';
import zh from './zh.json';
import ja from './ja.json';
type MessageSchema = typeof en

const i18n = createI18n<[MessageSchema], 'en' | 'zh' | 'ja'>({
    legacy: false,
    locale: 'zh',
    // globalInjection: true,
    messages: { en, zh, ja }
});

export default i18n;