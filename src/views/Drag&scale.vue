<!--
 * @abstract: zx-utils-ui
 * @version: 0.0.1
 * @Author: wpp
 * @Date: 2019-11-13 17:58:18
 * @LastEditors  : wpp
 * @LastEditTime : 2020-01-19 15:02:58
 -->
<template>
  <div class="main">
    <MlDragChange
      :dataArr="dataArr"
      :initInfo="{
        width: 'block',
        height: 500,
        top: 0,
        left: 0,
      }"
    >
      <MlDragScale
        class="item"
        :initInfo="{
          width: 80,
          height: 80,
          top: 20,
          left: 20,
        }"
      >
      </MlDragScale>
    </MlDragChange>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import MlDragChange from './MlDragChange.vue';
import MlDragScale from './MlDragScale.vue';
@Component({
  components: {
    MlDragChange,
    MlDragScale,
  },
})
export default class DragAndScle extends Vue {
  public dataArr: any[] = [
    {
      title: '小红',
      code: 'red',
    },
  ];
}
</script>
<style lang="less">
.main {
  width: 100%;
  height: 100%;
}
</style>
