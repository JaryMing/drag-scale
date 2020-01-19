<!--
 * @abstract: zx-utils-ui
 * @version: 0.0.1
 * @Author: wpp
 * @Date: 2019-11-13 17:58:18
 * @LastEditors  : wpp
 * @LastEditTime : 2020-01-19 11:14:54
 -->
<template>
  <div class="ml-drag-change">
    <mlDragScale
      :initInfo="initInfo"
      v-for="item in dataArr"
      :key="item.code"
      :index="item.code"
      @dragstartfn="dragStartFn"
      @dragendfn="dragendfn"
      @dropoverfn="dragOverFn"
      :componentLock="{
        scaleSwitch: true,
        dragSwitch: false,
        dragChangePositon: true,
      }"
    >
      <div class="drag-change-item">
        <slot>
          <div>{{ item.title }}</div>
        </slot>
      </div>
    </mlDragScale>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import MlDragScale from './MlDragScale.vue';
@Component({
  components: {
    MlDragScale,
  },
})
export default class MlDragChange extends Vue {
  @Prop({
    default: () => {
      return [
        {
          title: 'red',
          code: 'red',
        },
        {
          title: 'white',
          code: 'white',
        },
        {
          title: 'black',
          code: 'black',
        },
      ];
    },
  })
  public dataArr!: any[];
  public initInfo = {
    width: 'block',
    height: 150,
    top: 0,
    left: 0,
  };
  public dragEndLock: boolean = false;
  public coverItemAttrbuiteIndex: string = '';
  public currentDragI: number = 0;
  public currentDragItemAttributesIndex: string = '';
  public dragOffsetYInfo = {
    offsetY: 0,
    offsetHeight: 0,
  };
  public ListenerDragenter(e: any, item: any) {
    if (e.target.className === 'drag-change-item') {
      this.dragEnterFn(event, item);
    }
  }
  public dragStartFn(e: any) {
    e.target.style.opacity = 0.5;
    this.currentDragItemAttributesIndex = e.target.attributes.index.value;
    Array.from(document.getElementsByClassName('ml-drag-scale')).map(
      (item: any) => {
        item.addEventListener('dragenter', (event: any) => {
          this.ListenerDragenter(event, item);
        });
      }
    );
  }
  public dragEnterFn(e: any, enterItem: any) {
    this.dragEndLock = true;
    Array.from(document.getElementsByClassName('ml-drag-scale')).forEach(
      (item: any, index: number) => {
        item.style.background = 'transparent';
        if (
          enterItem.getAttribute('index') ===
          this.currentDragItemAttributesIndex
        ) {
          enterItem.style.background = '#f0f0f0';
          this.dragEndLock = false;
        } else if (
          item.getAttribute('index') === enterItem.getAttribute('index')
        ) {
          enterItem.style.background = '#f0f0f0';
          this.coverItemAttrbuiteIndex = enterItem.getAttribute('index');
          for (const i in this.dataArr) {
            if (this.dataArr[i].code === this.currentDragItemAttributesIndex) {
              this.currentDragI = Number(i);
              break;
            }
          }
        }
      }
    );
  }
  public dragOverFn(e: any) {
    this.dragOffsetYInfo.offsetY = e.offsetY;
    this.dragOffsetYInfo.offsetHeight = e.target.offsetHeight;
  }
  @Emit()
  public dragendfn(e: any) {
    e.target.style.opacity = 1;
    Array.from(document.getElementsByClassName('ml-drag-scale')).map(
      (item: any) => {
        item.style.background = 'transparent';
        item.removeEventListener('dragenter', (event: any) => {
          this.ListenerDragenter(event, item);
        });
      }
    );
    if (this.dragEndLock) {
      this.dragEndLock = false;
      const deleteItem: any = this.dataArr.splice(this.currentDragI, 1);
      for (const i in this.dataArr) {
        if (this.dataArr[i].code === this.coverItemAttrbuiteIndex) {
          this.dataArr.splice(
            this.dragOffsetYInfo.offsetY <
              this.dragOffsetYInfo.offsetHeight * 0.5
              ? Number(i)
              : Number(i) + 1,
            0,
            ...deleteItem
          );
          break;
        }
      }
      return this.dataArr;
    }
  }
}
</script>
<style lang="less">
.ml-drag-change {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.drag-change-item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
