import { createApp } from 'vue';

// necessary libs
import App from './App.vue';
import router from './router';

// third party
import ElementPlus from 'element-plus';

// set i18n 
import i18n from './i18n/i18n';

// external css file
import "@/assets/css/main.css";
import "@/assets/fonts/iconfont.css";
import "@/assets/css/thirdparty.css";
import "@/assets/css/patch.css";
import "@/assets/css/animation.css";

createApp(App)
    .use(router)
    .use(ElementPlus)
    .use(i18n)
    .mount('#app')
