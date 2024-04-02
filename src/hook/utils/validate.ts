
import type { InternalRuleItem } from 'async-validator';
import i18n from '@/i18n/i18n';

const { t } = i18n.global;

async function validateEmailAddress(rule: InternalRuleItem, value: string, callback: (error?: string | Error) => void) {    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        callback(new Error(t('login.email-address.validate.error.invalid-address')));
    }
}

async function validatePassword(rule: InternalRuleItem, value: string, callback: (error?: string | Error) => void) {    
    if (value.length < 8) {
        callback(new Error(t('login.password.validate.error.length')));
    } else if (!/[A-Z]/.test(value)) {
        callback(new Error(t('login.password.validate.error.uppercase')));
    } else if (!/[a-z]/.test(value)) {
        callback(new Error(t('login.password.validate.error.lowercase')));
    } else if (!/\d/.test(value)) {
        callback(new Error(t('login.password.validate.error.number')));
    }
}

export {
    validateEmailAddress,
    validatePassword
};