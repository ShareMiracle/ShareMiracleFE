import { reactive } from 'vue';

import en from './en.json';
import zh from './zh-cn.json';
import ja from './ja.json';

type MessageSchema = typeof en

// type NumberSchema = {
//     currency: {
//         style: 'currency',
//         currencyDisplay: 'symbol'
//         currency: string
//     }
// }

interface I18nOption {
    locale: string
    language: string
    repoUrl: string
}

const availableLanguage = reactive<{ options: I18nOption[] }>({
    options: [
        {
            locale: 'zh',
            language: "简体中文",
            repoUrl: "https://github.com/LSTM-Kirigaya/mmd-fe/blob/main/src/i18n/zh.json"
        },
        {
            locale: 'en',
            language: "English",
            repoUrl: "https://github.com/LSTM-Kirigaya/mmd-fe/blob/main/src/i18n/en.json"
        },
        {
            locale: 'ja',
            language: "日本語",
            repoUrl: "https://github.com/LSTM-Kirigaya/mmd-fe/blob/main/src/i18n/ja.json"
        }
    ]
});



export {
    MessageSchema,
    en,
    zh,
    ja,
    availableLanguage
};
