<!--
 * @abstract: zx-utils-ui
 * @version: 0.0.1
 * @Author: wpp
 * @Date: 2019-09-11 09:12:02
 * @LastEditors  : wpp
 * @LastEditTime : 2020-01-19 12:21:18
 -->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <!-- <router-link to="/drag">Drag</router-link> | -->
      <!-- <router-link to="/tabs">Tabs</router-link> | -->
      <router-link to="/gnDrag">Gn-Drag 例子</router-link> |
      <router-link to="/mlDragScale">拖拽 & 缩放</router-link> |
      <router-link to="/mlDragChange">拖拽互换位置 & 缩放</router-link> |
      <router-link to="/dragScale">例子</router-link> |
      <router-link to="/Drag&scale">Drag&Scale</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Layout extends Vue {
  public mounted() {
    const offsetWidth = document.documentElement.offsetWidth;
    // document.documentElement.style.fontSize = offsetWidth / 19.2+'px';
  }
}
</script>
<style lang="less">
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
#nav {
  padding: 30px;
  width: 100%;
  box-sizing: border-box;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
