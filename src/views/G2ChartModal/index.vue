<!--
 * @abstract: zx-utils-ui
 * @version: 0.0.1
 * @Author: wpp
 * @Date: 2019-09-11 09:12:02
 * @LastEditors  : wpp
 * @LastEditTime : 2020-01-20 15:38:30
 -->
<template>
  <div class="g2-box">
    <div>
      <div id="container"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';
import { data } from './data';
@Component
export default class G2Chart extends Vue {
  public chart: any = null;
  public mounted() {
    this.init();
  }
  // 插入 Slider 滑块组件需要的 DOM
  public init() {
    const sliderDiv: HTMLDivElement = document.createElement('div');
    sliderDiv.id = 'slider';
    const container: HTMLElement | any = document.getElementById('container');
    container.parentNode.appendChild(sliderDiv);
    // 设置状态量，时间格式建议转换为时间戳，转换为时间戳时请注意区间
    const ds = new DataSet({
      state: {
        start: '2015-04-07',
        end: '2015-07-28',
      },
    });
    const dv = ds.createView();
    dv.source(data).transform({
      type: 'filter',
      callback: (obj: any) => {
        const date = obj.time;
        return date <= ds.state.end && date >= ds.state.start;
      },
    });
    this.chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 400,
      animate: false,
      padding: [20, 40, 10, 40],
    });
    this.chart.source(dv, {
      time: {
        type: 'timeCat',
        nice: false,
        range: [0, 1],
      },
      volumn: { alias: '成交量' },
      start: { alias: '开盘价' },
      end: { alias: '收盘价' },
      max: { alias: '最高价' },
      min: { alias: '最低价' },
    });
    this.chart.legend(false);
    this.chart.tooltip({
      showTitle: false,
      itemTpl:
        '<li data-index={index}>' +
        '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
        '{name}{value}</li>',
    });

    const barView = this.chart.view({
      start: {
        x: 0,
        y: 0,
      },
    });
    barView.source(dv, {
      volumn: {
        tickCount: 4,
      },
    });
    barView.axis('volumn', {
      label: {
        formatter: (val: any) => {
          return parseInt(val / 1000 + '', 10) + 'k';
        },
      },
    });
    barView
      .interval()
      .position('time*volumn')
      .tooltip('time*volumn', (time: any, volumn: any) => {
        return {
          name: time,
          value:
            '<br/><span style="padding-left: 16px">成交量：' +
            volumn +
            '</span><br/>',
        };
      });

    this.chart.render();

    this.chart.interact('slider', {
      container: 'slider', // DOM id
      start: ds.state.start, // 和状态量对应
      end: ds.state.end,
      data, // 源数据
      xAxis: 'time', // 背景图的横轴对应字段，同时为数据筛选的字段
      yAxis: 'volumn', // 背景图的纵轴对应字段，同时为数据筛选的字段
      scales: {
        time: {
          type: 'timeCat',
          nice: false,
        },
      },
      onChange: ({ startText, endText }: any) => {
        ds.setState('start', startText);
        ds.setState('end', endText);
        setTimeout(() => {
          this.chart.render();
        }, 32);
      },
    });
  }
}
</script>
<style lang="less">
.g2-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  #container {
    width: 900px;
    border: 1px solid #d0d0d0;
  }
}
</style>
