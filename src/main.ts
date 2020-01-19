/*
 * @abstract: zx-utils-ui
 * @version: 0.0.1
 * @Author: wpp
 * @Date: 2019-09-11 09:12:02
 * @LastEditors: wpp
 * @LastEditTime: 2020-01-08 14:48:43
 */
/*
 * @abstract: zx-utils-ui
 * @version: 0.0.1
 * @Author: wpp
 * @Date: 2019-09-11 09:12:02
 * @LastEditors  : wpp
 * @LastEditTime : 2020-01-08 11:22:09
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { DragWrap, DragItem } from 'vue-gn-components';
import 'vue-gn-components/lib/style/index.css';
Vue.use(DragWrap).use(DragItem);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
