import { createApp } from 'vue';

// necessary libs
import App from './App.vue';
import router from './router';
import store from './store';

// third party
import ElementPlus from 'element-plus';

// set i18n 
import { createI18n } from 'vue-i18n';
import en from './i18n/en.json';
import zh from './i18n/zh.json';
import { MessageSchema } from './i18n/schema';

const i18n = createI18n<[MessageSchema], 'en' | 'zh'>({
    legacy: false,
    locale: 'en',
    messages: {
        'en': en,
        'zh': zh
    }
});

// external css file
import "@/assets/css/thirdparty.css";
import "@/assets/css/patch.css";

createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus)
    .use(i18n)
    .mount('#app')
