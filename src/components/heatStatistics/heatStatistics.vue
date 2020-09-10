<template>
  <div class="main-wrap">
    <div class="heat-statistics">
      <div class="heat-title">热度统计</div>
      <div class="heat-body">
        <div class="heat-search">全网线索<span>{{totalNum}}</span></div>
        <div class="heat-eacharts sys-flex flex-justify-between">
          <div class="heat-pie">
            <chart :options="pieOptions"></chart>
          </div>
          <div class="heat-bar">
            <chart :options="barOptions"></chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
export default {
  name: 'heatStatistics',
  data () {
    return {
      totalNum: 0,
      pieOptions: {
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color: ['#2C99EC', '#762CC9', '#2CC7C9'],
        series : [
          {
            name: '全网线索占比',
            type: 'pie',
            radius : '60%',
            center: ['50%', '50%'],
            data:[],
            avoidLabelOverlap: true, // 防止标签重叠策略
            label: {
              formatter: '{b|{b}}\n{d|{d}}%',
              rich: {
                b: {
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 'bold'
                },
                d: {
                  fontSize: 20,
                  fontWeight: 'bold'
                }
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      barOptions: {
        grid: {
          containLabel: true // grid包含刻度区域
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {
            interval: 0,
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold'
          },
          axisLine: {
            lineStyle: {
              color: '#4A6AA8'
            }
          }
        },
        yAxis: {
          type: 'value',
          gridIndex: 0,
          splitLine: {
            show: true,
            lineStyle : {
              width : 0.5,
              opacity : 0.5,
              type : 'dashed',
              color: '#4A6AA8'
            }
          },
          axisLabel: {
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
            formatter: '{value}',
            interval: 30
          },
          axisLine: {
            lineStyle: {
              color: '#4A6AA8'
            }
          }
        },
        series: [{
          data: [],
          type: 'bar',
          itemStyle: {
            normal: {
              color: function (params) {
                var colorList = ['#2C99EC', '#762CC9', '#2CC7C9']
                return colorList[params.dataIndex]
              },
              label: {
                show: true, //开启显示
                position: 'top', //在上方显示
                textStyle: { //数值样式
                  color: '#fff',
                  fontSize: 30
                }
              }
            }
          },
          barWidth: 45,
        }]
      }
    }
  },
  props: {
    id: Number
  },
  components: {
    chart: echarts
  },
  watch: {
    id (val) {
      if (val) {
        this.id = val
        this.getDetail()
      }
    }
  },
  created () {
    if (this.id) {
      this.getDetail()
    }
  },
  methods: {
    getDetail () {
      if (this.id) {
        this.$api.getCharacterDetail(this.id).then((res)=>{
          if (res && res.data && res.data.result) {
            let name = res.data.result.name
            this.$api.getHotSpot(name).then((response) => {
              let data = response.data.result
              if (data && data[0]) {
                this.pieOptions.series[0].data = []
                this.barOptions.xAxis.data = []
                this.barOptions.series[0].data = []
                data.forEach(value => {
                  this.totalNum += value.total
                  this.pieOptions.series[0].data.push({
                    value: value.total,
                    name: value.platform_show
                  })
                  this.barOptions.xAxis.data.push(value.platform_show)
                  this.barOptions.series[0].data.push(value.total)
                })
              }
            })
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.main-wrap {
  .heat-statistics {
    width: 100%;
    height: 100%;
    padding: 0.5rem 0.3rem 0.35rem;
    color: #fff;
    font-size: 0.48rem;
    .heat-title {
      width: 100%;
      height: 1.14rem;
      background: url('../../assets/img/briefing/title_bg.png') no-repeat center;
      background-size: 100%;
      text-align: center;
      font-weight: 600;
      line-height: 1.14rem;
      margin-bottom: 0.35rem;
    }
    .heat-body {
      width: 100%;
      height: 8.66rem;
      background: url('../../assets/img/briefing/tongyong_bg01.png') no-repeat center;
      background-size: 100% 100%;
      padding: 0.56rem 0.3rem 0.2rem;
      .heat-search {
        width: 100%;
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: center;
        font-size: 0.36rem;
        background: #19436F;
        border-radius: 0.06rem;
        font-weight: 500;
        span {
          font-size: 0.52rem;
          color: #3cf2f4;
          margin-left: 0.15rem;
        }
      }
      .heat-eacharts {
        width: 100%;
        height: 6rem;
        .heat-pie {
          width: 30%;
          height: 100%;
        }
        .heat-bar {
          width: 60%;
          height: 100%;
        }
      }
    }
  }
}
</style>
