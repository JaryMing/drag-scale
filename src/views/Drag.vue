<template>
  <div class="drag-box">
    <div 
      ref="dragBox"
      class="drag-main"
      :style='{left: resultPosition.rl + "px", top: resultPosition.rt + "px"}'
      @mousedown="mouseDownFn($event)"
    >
      <slot>
        <div class="drag-item"></div>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';

@Component
export default class DragComponents extends Vue {
  public dragPositions = {
    x: 0,
    y: 0,
    l: 0,
    t: 0,
  };
  public resultPosition = {
    rl: 0,
    rt: 0,
  };
  public lock: boolean = false;
  public dragBox: any = null;
  public mounted() {
    this.$nextTick(() => {
      this.dragBox = this.$refs.dragBox;
    });
  }
  public mouseDownFn(e: any) {
    this.dragPositions.x = e.clientX;
    this.dragPositions.y = e.clientY;
    this.dragPositions.l = this.dragBox.offsetLeft;
    this.dragPositions.t = this.dragBox.offsetTop;
    this.lock = true;
    document.body.style.userSelect = 'none';
    window.onmousemove = this.mouseMoveFn;
    window.onmouseup = this.mouseUpFn;
  }
  public mouseMoveFn(e: any) {
    if (!this.lock) {
      return false;
    }
    const boxWidth = document.getElementsByClassName('drag-box')[0].clientWidth;
    const boxHeight = document.getElementsByClassName('drag-box')[0].clientHeight;
    const itemWidth = this.dragBox.offsetWidth;
    const itemHeight = this.dragBox.offsetHeight;
    const ml = e.clientX - (this.dragPositions.x - this.dragPositions.l);
    const mt = e.clientY - (this.dragPositions.y - this.dragPositions.t);
    // 水平方向的拖动及拖动限制
    if (ml > 0 && ml < (boxWidth - itemWidth)) {
      this.resultPosition.rl = ml;
    } else if (ml < 0) {
      this.resultPosition.rl = 0;
    } else {
      this.resultPosition.rl = boxWidth - itemWidth;
    }
    // 垂直方向的拖动及拖动限制
    if (mt > 0 && mt < (boxHeight - itemHeight)) {
      this.resultPosition.rt = mt;
    } else if (mt < 0) {
      this.resultPosition.rt = 0;
    } else {
      this.resultPosition.rt = boxHeight - itemHeight;
    }
  }
  @Emit()
  public mouseUpFn() {
    this.lock = false;
    document.body.style.userSelect = 'auto';
    window.onmousemove = null;
    window.onmouseup = null;
    return this.resultPosition;
  }
}
</script>
<style lang="less">
  .drag-box{
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    .drag-main{
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      cursor: move;
      .drag-item{
        width: 130px;
        height: 80px;
        border: 1px solid #333;
      }
    }
  }
 
</style>
