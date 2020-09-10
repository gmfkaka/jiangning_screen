<template>
  <div class="main-wrap">
    <div class="content-production">
      <div class="production-title">内容生产</div>
      <div class="production-body">
        <div class="production-search sys-flex sys-flex-center">
          <div class="search-one">{{allLast}}<span>条</span></div>
          <div class="search-two">总数：{{allTotal}}</div>
          <div class="search-three">已打回：{{allBack}}</div>
        </div>
        <div class="production-eacharts sys-flex flex-justify-between">
          <div class="eacharts-left">
            <div class="left-list sys-flex sys-flex-center flex-justify-center" v-for="(v, k) in dataList" :key="k" :class="{'list-back': curentIndex === k}">
              <div>{{v}}</div>
            </div>
          </div>
          <div class="eacharts-right sys-flex-one">
            <chart :options="barOptions" v-if="dataList && dataList[0]"></chart>
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
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import { setInterval } from 'timers';
export default {
  name: 'contentProduction',
  data () {
    return {
      barOptions: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: [{
            name: '总内容',
            textStyle: {
              color: '#fff',
              fontSize: 20
            }
          }, {
            name: '过审',
            textStyle: {
              color: '#fff',
              fontSize: 20
            }
          }],
          x: 'right'
        },
        xAxis: [{
          type: 'category',
          data: ['文稿','图集','视频','外链'],
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
        }],
        yAxis: [{
          type: 'value',
          position: 'left',
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisLabel: {
            formatter: '{value}',
            color: '#fff',
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
          }
        }],
        series: [{
          name:'总内容',
          type:'bar',
          data:[],
          itemStyle: {
            normal: {
              color: function (params) {
                var colorList = ['#2CC7C9']
                return colorList[params.dataIndex]
              }
            }
          },
          barWidth: 45
        }, {
          name:'过审',
          type:'bar',
          data:[],
          itemStyle: {
            normal: {
              color: function (params) {
                var colorList = ['#B6A2DE']
                return colorList[params.dataIndex]
              }
            }
          },
          barWidth: 45
        }]
      },
      dataList: [],
      curentIndex: 0,
      userId: '',
      newList: [],
      allTotal: 0,
      allBack: 0,
      allLast: 0,
      interval: null
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
        this.$api.getWorkLoad(id).then((response) => {
          if (response && response.data && response.data.result) {
            let data = response.data.result
            this.allTotal = data.all.all.total
            this.allBack = data.all.all.audit_backed
            this.allLast = data.all.all.audited
            this.dataList = [`日：${data.day.all.total}条`, `周：${data.week.all.total}条`, `月：${data.month.all.total}条`, `年：${data.year.all.total}条`]
            this.newList = [data.day, data.week, data.month, data.year]
            this.barOptions.series[0].data = [this.newList[this.curentIndex] ? this.newList[this.curentIndex].article.total : '', this.newList[this.curentIndex] ? this.newList[this.curentIndex].video.total :'', this.newList[this.curentIndex] ? this.newList[this.curentIndex].gallery.total : '', this.newList[this.curentIndex] ? this.newList[this.curentIndex].link.total : '']
            this.barOptions.series[1].data = [this.newList[this.curentIndex] ? this.newList[this.curentIndex].article.checked : '', this.newList[this.curentIndex] ? this.newList[this.curentIndex].video.checked :'', this.newList[this.curentIndex] ? this.newList[this.curentIndex].gallery.checked : '', this.newList[this.curentIndex] ? this.newList[this.curentIndex].link.checked : '']
            this.interval = setInterval(() => {
              this.curentIndex ++
              this.barOptions.series[0].data = [this.newList[this.curentIndex] ? this.newList[this.curentIndex].article.total : '', this.newList[this.curentIndex] ? this.newList[this.curentIndex].video.total :'', this.newList[this.curentIndex] ? this.newList[this.curentIndex].gallery.total : '', this.newList[this.curentIndex] ? this.newList[this.curentIndex].link.total : '']
              this.barOptions.series[1].data = [this.newList[this.curentIndex] ? this.newList[this.curentIndex].article.checked : '', this.newList[this.curentIndex] ? this.newList[this.curentIndex].video.checked :'', this.newList[this.curentIndex] ? this.newList[this.curentIndex].gallery.checked : '', this.newList[this.curentIndex] ? this.newList[this.curentIndex].link.checked : '']
              if (this.curentIndex >= this.dataList.length) {
                this.curentIndex = 0
                this.barOptions.series[0].data = [this.newList[this.curentIndex] ? this.newList[this.curentIndex].article.total : '', this.newList[this.curentIndex] ? this.newList[this.curentIndex].video.total :'', this.newList[this.curentIndex] ? this.newList[this.curentIndex].gallery.total : '', this.newList[this.curentIndex] ? this.newList[this.curentIndex].link.total : '']
                this.barOptions.series[1].data = [this.newList[this.curentIndex] ? this.newList[this.curentIndex].article.checked : '', this.newList[this.curentIndex] ? this.newList[this.curentIndex].video.checked :'', this.newList[this.curentIndex] ? this.newList[this.curentIndex].gallery.checked : '', this.newList[this.curentIndex] ? this.newList[this.curentIndex].link.checked : '']
              }
            }, '10000')
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.main-wrap {
  .content-production {
    width: 100%;
    height: 100%;
    padding: 0.5rem 0.3rem 0.35rem;
    color: #fff;
    font-size: 0.48rem;
    .production-title {
      width: 100%;
      height: 1.14rem;
      background: url('../../assets/img/briefing/title_bg.png') no-repeat center;
      background-size: 100%;
      text-align: center;
      font-weight: 600;
      line-height: 1.14rem;
      margin-bottom: 0.35rem;
    }
    .production-body {
      .production-search {
        width: 100%;
        height: 1.6rem;
        background: url('../../assets/img/briefing/ttongyong_title_bg.png') no-repeat center;
        background-size: 100%;
        padding: 0 0.67rem 0 1.06rem;
        .search-one {
          margin-right: auto;
          font-size: 0.66rem;
          color: #50E6F3;
          font-weight: 400;
          span {
            font-size: 0.36rem;
            margin-left: 0.1rem;
          }
        }
        .search-two {
          margin-right: 1.22rem;
          font-size: 0.36rem;
          font-weight: 400;
        }
        .search-three {
          font-size: 0.36rem;
          font-weight: 400;
          color: #F23B5D;
        }
      }
      .production-eacharts {
        width: 100%;
        height: 6.56rem;
        background: url('../../assets/img/briefing/tongyong_bg.png') no-repeat center;
        background-size: 100%;
        margin-top: 0.43rem;
        padding: 0.3rem 0.5rem 0.6rem 0.3rem;
        .eacharts-left {
          font-size: 0.3rem;
          font-weight: 400;
          border: 1px solid #42B0FD;
          .left-list {
            width: 3.1rem;
            height: 1.42rem;
            border-bottom: 1px solid #3FE6FF;
            &:last-of-type {
              border-bottom: 0;
            }
          }
          .list-back {
            background: #1458A5;
          }
        }
      }
    }
  }
}
</style>
