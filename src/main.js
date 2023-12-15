import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import axios from 'axios';
import locale from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
import GSignInButton from "vue-google-signin-button"
import * as echarts from 'echarts';

Vue.prototype.$echarts = echarts


// eslint-disable-next-line no-unused-vars
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-components';
import {
  applyPolyfills,
  defineCustomElements,
} from '@aws-amplify/ui-components/loader';
Vue.config.productionTip = false

// Vue.prototype.$axios = axios
// axios.defaults.baseURL = '/api'; //后端地址

Vue.config.ignoredElements = [/amplify-\w*/];
Vue.use(GSignInButton);

applyPolyfills().then(() => {
  defineCustomElements(window);
});
//注册插件
Vue.use(ElementUI)
Amplify.configure(awsconfig);

applyPolyfills().then(() => {
  defineCustomElements(window);
});

locale.use(enLocale)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
