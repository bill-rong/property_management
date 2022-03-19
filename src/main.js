import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './plugins/element.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import Toasted from 'vue-toasted'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Toasted);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
