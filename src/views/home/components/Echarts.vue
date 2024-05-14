<script setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
//图标配置信息
const option = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    formatter: function (params) {
      let tar;
      if (params[1] && params[1].value !== "-") {
        tar = params[1];
      } else {
        tar = params[2];
      }
      return tar && tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
    },
  },
  legend: {
    data: ["Expenses", "Income"],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: (function () {
      let list = [];
      for (let i = 1; i <= 11; i++) {
        list.push("Nov " + i);
      }
      return list;
    })(),
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "Placeholder",
      type: "bar",
      stack: "Total",
      silent: true,
      itemStyle: {
        borderColor: "transparent",
        color: "transparent",
      },
      emphasis: {
        itemStyle: {
          borderColor: "transparent",
          color: "transparent",
        },
      },
      data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292],
    },
    {
      name: "Income",
      type: "bar",
      stack: "Total",
      label: {
        show: true,
        position: "top",
      },
      data: [900, 345, 393, "-", "-", 135, 178, 286, "-", "-", "-"],
    },
    {
      name: "Expenses",
      type: "bar",
      stack: "Total",
      label: {
        show: true,
        position: "bottom",
      },
      data: ["-", "-", "-", 108, 154, "-", "-", "-", 119, 361, 203],
    },
  ],
};

onMounted(() => {
  const chartDom = document.getElementById("EchartMain");
  const myChart = echarts.init(chartDom);
  myChart.setOption(option);
  //窗口大小发生变化时图表自动更新
  window.addEventListener("resize", () => {
    myChart.resize();
  });
});
</script>

<template>
  <div id="EchartMain" />
</template>

<style scoped>
#EchartMain {
  /* width: 400px; */
  height: 300px;
}
</style>
