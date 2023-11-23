import en from './en.json';
import zh from './zh.json';
import { useI18n } from "vue-i18n";

type MessageSchema = typeof en

type NumberSchema = {
    currency: {
        style: 'currency',
        currencyDisplay: 'symbol'
        currency: string
    }
}

interface I18nSchema {
    message: MessageSchema,
    number: NumberSchema
}

function getI18n() {
    const { t, n } = useI18n<I18nSchema>();
    return { t, n };
}


export {
    MessageSchema,
    NumberSchema,
    I18nSchema,
    en,
    zh,
    getI18n
};