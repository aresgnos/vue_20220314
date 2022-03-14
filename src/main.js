import { createApp } from 'vue'
import App from './App.vue'

import routes from './routes/index';

// ElementPlus 설정
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

createApp(App)
    .use(routes)
    .use(ElementPlus)
    .mount('#app');
    
