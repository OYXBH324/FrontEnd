<template>
  <div>
    <div style="display: flex;margin-bottom: 10px;font-size: 18px;color: #808080;">
      <div style="margin-right: 20px;font-family: sans-serif;">Total Requests: {{s.total}}</div>
      <div style="margin-right: 20px">On-time Completion: {{s.within}}</div>
      <div>Delayed Completion: {{s.later}}</div>
    </div>
    <div id="main" style="width: 1000px;height:400px;"></div>
  </div>
</template>

<script>
import {formStatic} from "@/api/api";
export default {
  name:"home",
  components:{},
  data(){
    return{
      s:{},
      option: {
        legend: {
          // 图例
          data: ["Total Requests", "On-time Completion", "Delayed Completion"],
          right: "",
          top: "60%",
          orient: "vertical"
        },
        title: {
          // 设置饼图标题，位置设为顶部居中
          text: "Pie chart of form completion",
          top: "0%",
          left: "center"
        },
        series: [
          {
            type: "pie", // type设置为饼图
            label: {
              show: true,
              formatter: "{b} : {c} ({d}%)" // b代表名称，c代表对应值，d代表百分比
            },
            radius: "80%", //饼图半径
            data: [
              {
                value: 1,
                name: "Total Requests"
              },
              {
                value: 2,
                name: "On-time Completion"
              },
              {
                value: 3,
                name: "Delayed Completion"
              }
            ]
          }
        ]
      },
    }
  },
  methods: {
    initChart() {
      const myChart = this.$echarts.init(document.getElementById('main'));
      myChart.setOption(this.option);
    }
  },
  mounted() {
    formStatic().then(res=>{
      this.s = res.data
      this.option.series[0].data[0].value = this.s.total
      this.option.series[0].data[1].value = this.s.within
      this.option.series[0].data[2].value = this.s.later
      this.initChart()
    })
  }
}
</script>
<style scoped>

</style>
