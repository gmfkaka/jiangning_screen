<template>
  <div class="main-wrap">
    <div class="struggle-curve">
      <div class="struggle-title">奋斗曲线</div>
      <div class="struggle-body">
        <chart :options="lineOptions"></chart>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/gauge'
export default {
  name: 'struggleCurve',
  data () {
    return {
      userId: '',
      lineOptions: {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: [],
          boundaryGap: false,
          axisLabel: {
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
            margin: 18
          },
          axisLine: {
            lineStyle: {
              color: '#4A6AA8'
            }
          }
        },
        yAxis: {
          type: 'value',
          inverse: true,
          splitNumber: 9,
          min: 1,
          axisLabel: {
            formatter: '{value}',
            color: '#5F6479',
            fontSize: 20,
            fontWeight: 'bold'
          },
          splitLine: {
            show: true,
            lineStyle : {
              width : 0.5,
              opacity : 0.5,
              type : 'dashed',
              color: '#4A6AA8'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#4A6AA8'
            }
          }
        },
        series: [{
          type:'line',
          data:[],
          smooth: true,
          symbolSize: 10,
          itemStyle : {
						normal : {
              label : {
                show: true,
                textStyle: {
                  color: 'white',
                  fontSize: 25
                }
              },
              color: '#2DC9CC',
							lineStyle:{
								color:'#2DC9CC'
							}
						}
					}
        }]
      }
    }
  },
  props: {
    id: Number,
    token: String
  },
  watch: {
    id (val) {
      if (val) {
        this.$api.getUserInformation(this.token, val).then((response) => {
          if (response && response.data && response.data.data) {
            let id = response.data.data.plus_user_id
            this.getList(id)
          }
        })
      }
    }
  },
  created () {
    if (this.id) {
      this.$api.getUserInformation(this.token, this.id).then((response) => {
        if (response && response.data && response.data.data) {
          let id = response.data.data.plus_user_id
          this.getList(id)
        }
      })
    }
  },
  components: {
    chart: echarts
  },
  methods: {
    getList (id) {
      if (id) {
        this.$api.getWorkLoadRank(id).then((response) => {
          if (response && response.data && response.data.result) {
            let data = response.data.result
            this.lineOptions.xAxis.data = Object.keys(data).reverse()
            let arr = Object.values(data)
            if (arr && arr[0] ) {
              arr.forEach(value => {
                this.lineOptions.series[0].data.push(value.publish ? value.publish.rank : '')
              })
            }
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.main-wrap {
  .struggle-curve {
    width: 100%;
    height: 100%;
    padding: 0.5rem 0.3rem 0.35rem;
    color: #fff;
    font-size: 0.48rem;
    .struggle-title {
      width: 100%;
      height: 1.14rem;
      background: url('../../assets/img/briefing/title_bg.png') no-repeat center;
      background-size: 100%;
      text-align: center;
      font-weight: 600;
      line-height: 1.14rem;
      margin-bottom: 0.35rem;
    }
    .struggle-body {
      width: 100%;
      height: 8.62rem;
      background: url('../../assets/img/briefing/tongyong_bg01.png') no-repeat center;
      background-size: 100%;
      padding: 1.2rem 0.84rem 0.8rem 1.2rem;
    }
  }
}
</style>
