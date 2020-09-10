<template>
  <div class="main-wrap">
    <div class="communication-effect">
      <div class="effect-title">传播效果</div>
      <div class="effect-body">
        <div class="effect-search sys-flex sys-flex-center flex-justify-between">
          <div class="search-total">阅读总数：{{readNum}}</div>
          <div class="search-line"></div>
          <div class="search-comment">收获评论：{{commentNum}}</div>
        </div>
        <div class="effect-echarts">
          <chart :options="lineOptions"></chart>
        </div>
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
  name: 'communicationEffect',
  data () {
    return {
      readNum: 0,
      commentNum: 0,
      lineOptions: {
        grid: {
          top: 120
        },
        legend: {
          top: 25,
          right: 250,
          data: [{
            name: '评论量',
            textStyle: {
              color: '#fff',
              fontSize: 25
            }
          }, {
            name: '阅读量',
            textStyle: {
              color: '#fff',
              fontSize: 25
            }
          }]
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
        yAxis: [{
          name: '评论量',
          nameTextStyle: {
            color: '#5F6479',
            fontSize: 25,
            fontWeight: 'bold'
          },
          type: 'value',
          position: 'left',
          axisLabel: {
            formatter: '{value}',
            color: '#5F6479',
            fontSize: 25,
            fontWeight: 'bold'
          },
          splitLine: {
            show: false
          }
        }, {
          name: '阅读量',
          nameTextStyle: {
            color: '#5F6479',
            fontSize: 25,
            fontWeight: 'bold'
          },
          type: 'value',
          position: 'right',
          axisLabel: {
            formatter: '{value}',
            color: '#5F6479',
            fontSize: 25,
            fontWeight: 'bold'
          },
          splitLine: {
            show: false
          }
        }],
        series: [{
          name: '评论量',
          type:'line',
          data:[],
          smooth: true,
          symbolSize: 10,
          areaStyle: {},
          itemStyle : {
						normal : {
              color: '#5FADE8',
							lineStyle:{
								color:'#5FADE8'
							}
						}
					}
        }, {
          name: '阅读量',
          type:'line',
          data:[],
          smooth: true,
          symbolSize: 10,
          areaStyle: {},
          itemStyle : {
						normal : {
              color: '#B5A2DE',
							lineStyle:{
								color:'#B5A2DE'
							}
						}
					}
        }]
      },
      userId: ''
    }
  },
  components: {
    chart: echarts
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
  methods: {
    getList (id) {
      if (id) {
        this.$api.getEffects(id).then((response) => {
          if (response && response.data && response.data.result) {
            let data = response.data.result
            this.readNum = data.all.click_num
            this.commentNum = data.all.comment_num
            let arr = Object.keys(data)
            arr.pop()
            this.lineOptions.xAxis.data = arr.reverse()
            let dataArr = Object.values(data)
            if (dataArr && dataArr[0]) {
              dataArr.forEach(value => {
                this.lineOptions.series[0].data.push(value.comment_num)
                this.lineOptions.series[1].data.push(value.click_num)
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
  .communication-effect {
    width: 100%;
    height: 100%;
    padding: 0.5rem 0.3rem 0.35rem;
    color: #fff;
    font-size: 0.48rem;
    .effect-title {
      width: 100%;
      height: 1.14rem;
      background: url('../../assets/img/briefing/title_bg.png') no-repeat center;
      background-size: 100%;
      text-align: center;
      font-weight: 600;
      line-height: 1.14rem;
      margin-bottom: 0.35rem;
    }
    .effect-body {
      .effect-search {
        width: 100%;
        height: 1.6rem;
        background: url('../../assets/img/briefing/ttongyong_title_bg.png') no-repeat center;
        background-size: 100%;
        padding: 0 3.15rem 0 2.85rem;
        div {
          font-size: 0.4rem;
          font-weight: 400;
        }
        .search-line {
          width: 1px;
          height: 0.81rem;
          background: #1E5374;
        }
      }
      .effect-echarts {
        width: 100%;
        height: 6.59rem;
        background: url('../../assets/img/briefing/tongyong_bg.png') no-repeat center;
        background-size: 100%;
        margin-top: 0.4rem;
      }
    }
  }
}
</style>
