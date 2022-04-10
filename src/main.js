import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './plugins/element.js'
import ElementUI from 'element-ui'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import Toasted from 'vue-toasted'
import VCharts from 'v-charts-v2'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Toasted);
Vue.use(VCharts);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
