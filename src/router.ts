/*
 * @abstract: zx-utils-ui
 * @version: 0.0.1
 * @Author: wpp
 * @Date: 2019-09-11 09:12:02
 * @LastEditors  : wpp
 * @LastEditTime : 2020-01-19 12:15:40
 */
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/drag',
      name: 'drag',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "drag" */ './views/Drag.vue'),
    },
    {
      path: '/Drag&scale',
      name: 'Drag&scale',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "scale" */ './views/Drag&scale.vue'),
    },
    {
      path: '/tabs',
      name: 'tabs',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "tabs" */ './views/Tabs/index.vue'),
    },
    {
      path: '/gnDrag',
      name: 'gnDrag',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "gnDrag" */ './views/Gn-Drag.vue'),
    },
    {
      path: '/mlDragScale',
      name: 'mlDragScale',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "mlDragScale" */ './views/MlDragScale.vue'),
    },
    {
      path: '/mlDragChange',
      name: 'mlDragChange',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "mlDragChange" */ './views/MlDragChange.vue'),
    },
    {
      path: '/dragScale',
      name: 'DragChange',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "DragChange" */ './views/DragScale.vue'),
    },
  ],
});
