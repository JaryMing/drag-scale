<!--
 * @abstract: zx-utils-ui
 * @version: 0.0.1
 * @Author: wpp
 * @Date: 2019-11-13 17:58:18
 * @LastEditors  : wpp
 * @LastEditTime : 2020-01-19 11:18:03
 -->
<template>
  <div class="drag-scale-box">
    <MlDragChange :dataArr="dataArr" @dragendfn="dragEndFn"> </MlDragChange>
    <MlDragScale
      :initInfo="{
        width: 80,
        height: 80,
        top: '500',
        left: '500',
      }"
      @scalemouseupfn="scaleMouseUpFn"
      @dragmouseupfn="dragMouseUpFn"
      class="test-item"
    >
    </MlDragScale>
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
export default class DragScale extends Vue {
  public dataArr: any[] = [
    {
      title: '小红',
      code: 'red',
    },
    {
      title: '小白',
      code: 'white',
    },
    {
      title: '小黑',
      code: 'black',
    },
  ];
  public dragMouseUpFn(res: any) {
    console.log('drag-res', res);
  }
  public scaleMouseUpFn(res: any) {
    console.log('scale-res', res);
  }
  public dragEndFn(res: any) {
    console.log('drag-position', res);
  }
}
</script>
<style lang="less">
.drag-scale-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.test-item{
  background: #2c9ae8;
  border-radius: 50%;
}
</style>
