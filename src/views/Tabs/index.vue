<!--
 * @abstract: zx-utils-ui
 * @version: 0.0.1
 * @Author: wpp
 * @Date: 2019-11-13 17:58:18
 * @LastEditors  : wpp
 * @LastEditTime : 2020-01-19 09:58:49
 -->
<template>
  <div>
    <Tabs>
      <div class="pos-box" id="test">
        <div
          class="pos-item"
          :draggable="true"
          @dragenter="dragEnterFn(item)"
          v-for="item in listArr"
          :key="item"
        >
          {{ item }}
        </div>
      </div>
    </Tabs>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import Tabs from './component/tabs.vue';

@Component({
  components: {
    Tabs,
  },
})
export default class TabsPage extends Vue {
  public listArr = ['111', '222', '333'];
  public initInfo = {
    width: 230,
    height: 150,
    top: 0,
    left: 0,
  };
  public dragEnterFn(e: any) {
    console.log(e);
  }
}
</script>
<style lang="less">
.pos-box {
  width: 100%;
  height: 100%;
  .pos-item {
    width: 200px;
    height: 150px;
    border: 1px solid #333;
    & ~ .pos-item {
      margin-top: 20px;
    }
  }
}
</style>
