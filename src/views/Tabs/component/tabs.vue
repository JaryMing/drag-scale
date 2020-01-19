<!--
 * @abstract: zx-utils-ui
 * @version: 0.0.1
 * @Author: wpp
 * @Date: 2019-11-13 17:58:18
 * @LastEditors: wpp
 * @LastEditTime: 2019-12-06 15:35:04
 -->
<template>
  <div class="Tabs-box">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';

@Component
export default class TabsComponent extends Vue {
  public nodes: any = {};
  public mounted() {
    const slotValue: any = this.$slots.default;
    slotValue.forEach((item: any) => {
      this.nodes[item.data.attrs.id] = item;
    });
  }
}
</script>
<style lang="less">
.Tabs-box {
}
</style>
