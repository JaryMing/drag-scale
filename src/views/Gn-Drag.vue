<!--
 * @abstract: zx-utils-ui
 * @version: 0.0.1
 * @Author: wpp
 * @Date: 2019-11-13 17:58:18
 * @LastEditors  : wpp
 * @LastEditTime : 2020-01-17 15:53:29
 -->
<template>
  <div class="Gn-Drag-box">
    <drag-wrap class="wrap" :data="list" @watchData="watchData">
      <drag-item class="item" v-for="(item, index) in list" :key="index">
        <div class="drag-item">
          {{ item }}
        </div>
      </drag-item>
    </drag-wrap>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import draggable from 'vuedraggable';
@Component({
  components: {
    draggable,
  },
})
export default class ScaleComponents extends Vue {
  public list: any[] = [111, 222, 333, 444, 555, 666, 777, 888, 999];
  public watchData(arr: any) {
    console.log(123, arr);
  }
}
</script>
<style lang="less">
.Gn-Drag-box {
  .drag-item {
    width: 180px;
    height: 150px;
    border: 1px solid #333;
    position: relative;
  }
}
</style>
