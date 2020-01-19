<!--
 * @abstract: zx-utils-ui
 * @version: 0.0.1
 * @Author: wpp
 * @Date: 2019-11-13 17:58:18
 * @LastEditors: wpp
 * @LastEditTime: 2019-12-06 14:54:59
 -->
<template>
  <div class="scale-box">
    <div
      v-if='false'
      ref="scaleBox"
      :class="[
        'scale-main',
        {'cursor-right': cursorChange.right, 
        'cursor-left': cursorChange.left,
        'cursor-top': cursorChange.top,
        'cursor-bottom': cursorChange.bottom,
        'cursor-rightBottom': cursorChange.rightBottom}
        ]"
      :style="{width: scaleSize.w + 'px', height: scaleSize.h + 'px'}"
      @mouseenter="mouseEnterFn($event)"
      @mouseleave="mouseLeaveFn($event)"
      @mousedown="mouseDownFn($event)"
    >
      <div class="scale-item"></div>
    </div>
    <div class="zx-scale-main" ref="zxScaleBox">
      <div
        :class="['zx-scale-item', scalePointShow ? 'block' : 'hidden']"
        v-for="item in scalePoints" :key="item.index"
        :style="item.pointsStyle"
      >
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';

@Component
export default class ScaleComponents extends Vue {
  public moveLock: boolean = false;
  public downLock: boolean = false;
  public scaleBox: any = null;
  public zxScaleBox: any = null;
  public cursorChange = {
    left: false,
    bottom: false,
    right: false,
    top: false,
    rightBottom: false,
  };
  public moveSize: any = {
    x: 0,
    y: 0,
  };
  public scaleSize = {
    w: 130,
    h: 130,
  };
  public scleboxSize = {
    width: 0,
    height: 0,
  };
  public scalePointSize = 6;
  public scalePointShow = false;
  public scalePoints = [
    {
      index: 'top-right',
      pointsStyle: {
        width: this.scalePointSize + 'px',
        height: this.scalePointSize + 'px',
        left: `calc(100% - ${this.scalePointSize * 0.5}px)`,
        top: `-${this.scalePointSize * 0.5}px`,
        cursor: 'ne-resize',
      },
    },
    {
      index: 'right',
      pointsStyle: {
        width: this.scalePointSize + 'px',
        height: this.scalePointSize + 'px',
        left: `calc(100% - ${this.scalePointSize * 0.5}px)`,
        top: `calc(50% - ${this.scalePointSize * 0.5}px)`,
        cursor: 'e-resize',
      },
    },
    {
      index: 'right-bottom',
      pointsStyle: {
        width: this.scalePointSize + 'px',
        height: this.scalePointSize + 'px',
        left: `calc(100% - ${this.scalePointSize * 0.5}px)`,
        top: `calc(100% - ${this.scalePointSize * 0.5}px)`,
        cursor: 'se-resize',
      },
    },
    {
      index: 'bottom',
      pointsStyle: {
        width: this.scalePointSize + 'px',
        height: this.scalePointSize + 'px',
        left: `calc(50% - ${this.scalePointSize * 0.5}px)`,
        top: `calc(100% - ${this.scalePointSize * 0.5}px)`,
        cursor: 's-resize',
      },
    },
    {
      index: 'left-bottom',
      pointsStyle: {
        width: this.scalePointSize + 'px',
        height: this.scalePointSize + 'px',
        left: `-${this.scalePointSize * 0.5}px`,
        top: `calc(100% - ${this.scalePointSize * 0.5}px)`,
        cursor: 'sw-resize',
      },
    },
    {
      index: 'left',
      pointsStyle: {
        width: this.scalePointSize + 'px',
        height: this.scalePointSize + 'px',
        left: `-${this.scalePointSize * 0.5}px`,
        top: `calc(50% - ${this.scalePointSize * 0.5}px)`,
        cursor: 'w-resize',
      },
    },
    {
      index: 'left-top',
      pointsStyle: {
        width: this.scalePointSize + 'px',
        height: this.scalePointSize + 'px',
        left: `-${this.scalePointSize * 0.5}px`,
        top: `-${this.scalePointSize * 0.5}px`,
        cursor: 'nw-resize',
      },
    },
    {
      index: 'top',
      pointsStyle: {
        width: this.scalePointSize + 'px',
        height: this.scalePointSize + 'px',
        left: `calc(50% - ${this.scalePointSize * 0.5}px)`,
        top: `-${this.scalePointSize * 0.5}px`,
        cursor: 'n-resize',
      },
    },
  ];
  public mounted() {
    this.scaleBox = this.$refs.scaleBox;
    this.zxScaleBox = this.$refs.zxScaleBox;
  }
  public focusFn(e: any) {
    this.scalePointShow = true;
  }
  public mouseEnterFn(e: any) {
    this.moveLock = true;
    window.onmousemove = this.mouseMoveFn;
    window.onmouseup = this.mouseUpFn;
  }
  public mouseLeaveFn(e: any) {
    this.moveLock = false;
  }
  public mouseMoveFn(e: any) {
    if (!this.downLock) {
      this.setCursorFn(e);
    } else {
      this.setBoxScale(e);
    }
  }
  public setCursorFn(e: any) {
    if (!this.moveLock) {
      return false;
    }
    const limit = 5;
    const xjLimit = 7;
    // 左边框
    if (this.yArrange(e.offsetX, this.scaleBox.offsetWidth, limit)) {
      this.cursorChange.left = false;
    } else {
      this.cursorChange.left = false;
    }
    // 右边框
    if (this.jArrange(e.offsetX, this.scaleBox.offsetWidth, limit)) {
      this.cursorChange.right = true;
    } else {
      this.cursorChange.right = false;
    }
    // 下边框
    if (this.jArrange(e.offsetY, this.scaleBox.offsetHeight, limit)) {
      this.cursorChange.bottom = true;
    } else {
      this.cursorChange.bottom = false;
    }
    // 上边框
    if (this.yArrange(e.offsetY, this.scaleBox.offsetHeight, limit)) {
      this.cursorChange.top = false;
    } else {
      this.cursorChange.top = false;
    }
    // 右下角
    if (e.offsetX > (this.scaleBox.offsetWidth - xjLimit) && e.offsetY > (this.scaleBox.offsetHeight - xjLimit)) {
      this.cursorChange.rightBottom = true;
    } else {
      this.cursorChange.rightBottom = false;
    }
  }
  public setBoxScale(e: any) {
    if (this.cursorChange.right) {
      this.scaleSize.w =
        e.clientX - this.moveSize.x + this.scleboxSize.width;
    }
    if (this.cursorChange.bottom) {
      this.scaleSize.h =
        e.clientY - this.moveSize.y + this.scleboxSize.height;
    }
  }
  public mouseDownFn(e: any) {
    this.downLock = true;
    document.body.style.userSelect = 'none';
    this.moveSize.x = e.clientX;
    this.moveSize.y = e.clientY;
    this.scleboxSize.width = this.scaleBox.offsetWidth;
    this.scleboxSize.height = this.scaleBox.offsetHeight;
  }
  public mouseUpFn(e: any) {
    this.downLock = false;
    document.body.style.userSelect = 'auto';
  }
  public yArrange(clientSize: number, boxSize: number, limit: number) {
    const size = boxSize - clientSize;
    if (size > boxSize - limit && size < boxSize + limit) {
      return true;
    } else {
      return false;
    }
  }
  public jArrange(clientSize: number, boxSize: number, limit: number) {
    const size = boxSize - clientSize;
    if (size > 0 && size < limit) {
      return true;
    } else {
      return false;
    }
  }
  public xjArrange(clientSize: number, boxSize: number, limit: number) {
    const size = boxSize - clientSize;
    if (size > 0 && size < limit) {
      return true;
    } else {
      return false;
    }
  }
}
</script>
<style lang="less">
.scale-box {
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  .scale-main {
    display: flex;
    margin-left: 15px;
    margin-top: 15px;
    .scale-item {
      width: 100%;
      height: 100%;
      border: 1px solid #333;
      box-sizing: border-box;
    }
    &.cursor-right {
      cursor: e-resize;
    }
    &.cursor-left {
      cursor: w-resize;
    }
    &.cursor-top {
      cursor: n-resize;
    }
    &.cursor-bottom {
      cursor: s-resize;
    }
    &.cursor-rightBottom {
      cursor: se-resize;
    }
  }
}
.zx-scale-main{
  width: 130px;
  height: 130px;
  margin-left: 15px;
  margin-top: 15px;
  border: 1px solid #333;
  position: relative;
  box-sizing: border-box;
  .zx-scale-item{
    border: 1px solid #333;
    position: absolute;
    box-sizing: border-box;
    background-color: #fff;
    display: none;
  }
  &:hover{
    .zx-scale-item{
      display: block;
    }
  }
  .hidden{
    display: none;
  }
  .block{
    display: block;
  }
}
</style>
