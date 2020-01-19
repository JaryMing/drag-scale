<!--
 * @abstract: zx-utils-ui
 * @version: 0.0.1
 * @Author: wpp
 * @Date: 2019-11-13 17:58:18
 * @LastEditors  : wpp
 * @LastEditTime : 2020-01-19 11:20:12
 -->
<template>
  <div
    ref="dragBox"
    class="ml-drag-scale"
    :style="[
      {
        left: resultPosition.left + 'px',
        top: resultPosition.top + 'px',
        width: scaleWidthComputed,
        height: scaleHeightComputed,
        cursor: dragSwitch ? 'move' : 'default',
        position: dragSwitch ? 'absolute' : 'relative',
      },
    ]"
    @mousedown="dragMouseDownFn($event)"
    :draggable="dragBlockLock"
    @dragstart="dragstartfn($event)"
    @dragend="dragendfn($event)"
    @drop="dropfn($event)"
    @dragover="dropoverfn($event)"
  >
    <div
      :class="[
        'scale-block',
        {
          'top-block': item.code === 'top',
          'left-block': item.code === 'left',
          'bottom-block': item.code === 'bottom',
          'right-block': item.code === 'right',
          'scale-block-show': scaleSwitch,
        },
        item.show ? '' : 'display-none',
      ]"
      @mousedown.stop="scaleMouseDownFn($event, item.code)"
      v-for="item in scaleBlockArr"
      :key="item.code"
    ></div>
    <div
      :class="['drag-block', { 'drag-block-show': dragChangePositon }]"
      @mouseenter="dragBlockLock = true"
      @mouseleave="dragBlockLock = false"
    ></div>
    <slot>
      <div class="defalut-box"></div>
    </slot>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
@Component
export default class MlDragScale extends Vue {
  @Prop({
    default: () => {
      return {
        scaleSwitch: true,
        dragSwitch: true,
        dragChangePositon: false,
      };
    },
  })
  public componentLock!: any;
  @Prop({
    default: () => {
      return {
        width: 250,
        height: 180,
        top: 125,
        left: 125,
      };
    },
  })
  public initInfo?: any;

  public dragBox: any = null;
  public parentStyle = {
    width: 0,
    height: 0,
  };
  get scaleWidthComputed() {
    if (this.scaleSize.width === 'block') {
      return '100%';
    } else {
      return this.scaleSize.width + 'px';
    }
  }
  get scaleHeightComputed() {
    if (this.scaleSize.height === 'block') {
      return '100%';
    } else {
      return this.scaleSize.height + 'px';
    }
  }
  // 拖拽 state
  public dragSwitch: boolean = false;
  public dragLock: boolean = false;
  public dragPositions: any = {
    x: 0,
    y: 0,
    l: 0,
    t: 0,
  };
  public resultPosition: any = {
    left: 0,
    top: 0,
  };
  // 缩放 state
  public scaleSwitch: boolean = false;
  public scaleLock: boolean = false;
  public currentBlock: string = '';
  public scaleSize: any = {
    width: 0,
    height: 0,
  };
  public moveSize: any = {
    width: 0,
    height: 0,
  };
  public scleboxSize: any = {
    width: 0,
    height: 0,
  };
  public scaleBlockArr: any[] = [
    {
      code: 'top',
      show: true,
    },
    {
      code: 'left',
      show: true,
    },
    {
      code: 'bottom',
      show: true,
    },
    {
      code: 'right',
      show: true,
    },
  ];
  // 拖拽换位置 state
  public dragChangePositon: boolean = false;
  public dragBlockLock: boolean = false;

  public mounted() {
    this.$nextTick(() => {
      this.scaleSwitch = this.componentLock.scaleSwitch;
      this.dragSwitch = this.componentLock.dragSwitch;
      this.dragChangePositon = this.componentLock.dragChangePositon;
      if (this.dragChangePositon) {
        this.scaleBlockArr.forEach((item: any) => {
          if (item.code !== 'bottom') {
            item.show = false;
          }
        });
      }
      this.dragBox = this.$refs.dragBox;

      this.dragBox.parentNode.style.position = 'relative';
      this.parentStyle = {
        width: this.dragBox.parentNode.offsetWidth,
        height: this.dragBox.parentNode.offsetHeight,
      };

      this.scaleSize.width = this.initInfo.width;
      this.scaleSize.height = this.initInfo.height;
      this.resultPosition.top = this.initInfo.top;
      this.resultPosition.left = this.initInfo.left;
    });
  }

  // 拖拽 function
  public dragMouseDownFn(e: any) {
    this.dragPositions.x = e.clientX;
    this.dragPositions.y = e.clientY;
    this.dragPositions.l = this.dragBox.offsetLeft;
    this.dragPositions.t = this.dragBox.offsetTop;
    this.dragLock = true;
    document.body.style.userSelect = 'none';
    window.onmousemove = this.mouseMoveFn;
    window.onmouseup = this.dragmouseupfn;
  }
  public mouseMoveFn(e: any) {
    if (this.dragLock && this.dragSwitch) {
      this.dragMouseMoveFn(e);
    } else if (this.dragChangePositon) {
      //
    } else if (!this.dragSwitch || !this.dragLock || !this.dragChangePositon) {
      return false;
    }
  }
  public dragMouseMoveFn(e: any) {
    const boxWidth = this.parentStyle.width;
    const boxHeight = this.parentStyle.height;
    const itemWidth = this.dragBox.offsetWidth;
    const itemHeight = this.dragBox.offsetHeight;
    const ml = e.clientX - (this.dragPositions.x - this.dragPositions.l);
    const mt = e.clientY - (this.dragPositions.y - this.dragPositions.t);
    // 水平方向的拖动及拖动限制
    if (ml > 0 && ml < boxWidth - itemWidth) {
      this.resultPosition.left = ml;
    } else if (ml <= 0) {
      this.resultPosition.left = 0;
    } else {
      this.resultPosition.left = boxWidth - itemWidth;
    }
    // 垂直方向的拖动及拖动限制
    if (mt > 0 && mt < boxHeight - itemHeight) {
      this.resultPosition.top = mt;
    } else if (mt <= 0) {
      this.resultPosition.top = 0;
    } else {
      this.resultPosition.top = boxHeight - itemHeight;
    }
  }
  @Emit()
  public dragmouseupfn() {
    this.dragLock = false;
    document.body.style.userSelect = 'auto';
    window.onmousemove = null;
    window.onmouseup = null;
    return this.resultPosition;
  }

  // 缩放 function
  public scaleMouseDownFn(e: any, type: string) {
    this.scaleLock = true;
    this.currentBlock = type;
    this.dragPositions.x = e.clientX;
    this.dragPositions.y = e.clientY;
    const num = 0;
    this.dragPositions.l = this.dragBox.offsetLeft - num;
    this.dragPositions.t = this.dragBox.offsetTop - num;
    document.body.style.userSelect = 'none';
    window.onmouseup = this.scalemouseupfn;
    window.onmousemove = this.scaleMouseMoveFn;
    switch (type) {
      case 'right':
      case 'left':
        this.moveSize.width = e.clientX;
        this.scleboxSize.width = this.dragBox.offsetWidth;
        break;
      case 'bottom':
      case 'top':
        this.moveSize.height = e.clientY;
        this.scleboxSize.height = this.dragBox.offsetHeight;
        break;
    }
  }
  public scaleMouseMoveFn(e: any) {
    if (!this.scaleSwitch || !this.scaleLock) {
      return false;
    }
    const WidthSizeLimit = this.parentStyle.width;
    const HeightSizeLimit = this.parentStyle.height;
    switch (this.currentBlock) {
      case 'right':
        this.scaleSize.width =
          e.clientX - this.moveSize.width + this.scleboxSize.width;
        if (this.scaleSize.width >= WidthSizeLimit) {
          this.scaleSize.width = WidthSizeLimit;
        } else if (this.scaleSize.width <= 0) {
          this.scaleSize.width = 0;
        }
        break;
      case 'bottom':
        this.scaleSize.height =
          e.clientY - this.moveSize.height + this.scleboxSize.height;
        if (this.scaleSize.height >= HeightSizeLimit) {
          this.scaleSize.height = HeightSizeLimit;
        } else if (this.scaleSize.height <= 0) {
          this.scaleSize.height = 0;
        }
        break;
      case 'left':
        this.scaleSize.width =
          this.moveSize.width - e.clientX + this.scleboxSize.width;
        this.resultPosition.left =
          e.clientX - (this.dragPositions.x - this.dragPositions.l);
        if (this.scaleSize.width >= WidthSizeLimit) {
          this.scaleSize.width = WidthSizeLimit;
        } else if (this.scaleSize.width <= 0) {
          this.scaleSize.width = 0;
        }
        break;
      case 'top':
        this.scaleSize.height =
          this.moveSize.height - e.clientY + this.scleboxSize.height;
        this.resultPosition.top =
          e.clientY - (this.dragPositions.y - this.dragPositions.t);
        if (this.scaleSize.height >= HeightSizeLimit) {
          this.scaleSize.height = HeightSizeLimit;
        } else if (this.scaleSize.height <= 0) {
          this.scaleSize.height = 0;
        }
        break;
    }
  }
  @Emit()
  public scalemouseupfn(e: any) {
    this.scaleLock = false;
    window.onmouseup = null;
    window.onmousemove = null;
    document.body.style.userSelect = 'auto';
    return this.scaleSize;
  }

  // 拖拽换位置 function
  @Emit()
  public dragstartfn(e: any) {
    return e;
  }
  @Emit()
  public dragendfn(e: any) {
    return e;
  }
  @Emit()
  public dropoverfn(e: any) {
    return e;
  }
}
</script>
<style lang="less">
.ml-drag-scale {
  border: 1px solid #f0f0f0;
  .scale-block {
    position: absolute;
    width: 5px;
    height: 5px;
    border: 1px solid #333;
    display: none;
  }
  .display-none {
    display: none !important;
  }
  .drag-block {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 0;
    height: 0;
    z-index: 5;
    box-sizing: border-box;
    background: transparent;
    border-top: 7px solid transparent;
    border-right: 7px solid #333;
    border-bottom: 7px solid #333;
    border-left: 7px solid transparent;
    display: none;
    cursor: move;
  }
  .top-block {
    top: 0;
    left: calc(50% - 2px);
    cursor: n-resize;
  }
  .left-block {
    top: calc(50% - 2px);
    left: 0;
    cursor: w-resize;
  }
  .bottom-block {
    bottom: 0;
    left: calc(50% - 2px);
    cursor: n-resize;
  }
  .right-block {
    top: calc(50% - 2px);
    right: 0;
    cursor: w-resize;
  }
  &:hover {
    .scale-block-show {
      display: block;
    }
    .drag-block-show {
      display: block;
    }
  }
}

.defalut-box {
  width: 250px;
  height: 180px;
}
</style>
