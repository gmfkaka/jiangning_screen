<template>
  <div class="main-wrap">
    <div class="weather">
      <div class="weather-title">今日天气</div>
      <div class="weather-body sys-flex sys-flex-center">
        <div class="now-weather">
          <div class="date">{{today}}<span>{{day}}</span></div>
          <div class="today-weather">
            <div class="now-img">
              <img :src="nowWeather.icon" />
            </div>
            <div class="now-tmp sys-flex sys-flex-center flex-justify-center">
              <div class="tmp-left">{{nowWeather.temp}}</div>
              <div class="tmp-right">
                <p class="degree">℃</p>
                <p class="cond">{{nowWeather.cond}}(实时)</p>
              </div>
            </div>
            <div class="now-wind">
              <div>{{otherWeather[0] ? otherWeather[0].temp : ''}}</div>
              <div>{{otherWeather[0] ? otherWeather[0].cond : ''}}</div>
              <div>{{otherWeather[0] ? otherWeather[0].wind : ''}}</div>
            </div>
          </div>
        </div>
        <div class="other-weather sys-flex flex-justify-between sys-flex-one sys-flex-center">
          <div class="other-list" v-for="(v,k) in otherWeather.slice(1,4)">
            <div class="list-time">{{getWeek(v.time)}}</div>
            <div class="list-day">{{v.time}}</div>
            <div class="list-img">
              <img :src="v.icon" />
            </div>
            <div class="list-one">{{v.temp}}</div>
            <div class="list-two">{{v.cond}}</div>
            <div class="list-three">{{v.wind}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'weather',
  data () {
    return {
      weekDay: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      today: '',
      day: '',
      cityName: '南京',
      nowWeather: {},
      otherWeather: []
    }
  },
  created () {
    this.getWeather()
    setInterval(() => {
      this.getWeather()
    },60000)
  },
  methods: {
    getWeather () {
      this.$api.getWeather(this.cityName).then((res) => {
        if (res && res.data && res.data.result && res.data.result.basic) {
          let data = res.data.result.basic
          // 时间格式化
          this.getToday(data.update_timestamp)
          // 当前天气状态
          this.nowWeather = {
            icon: `${data.now.cond.icon.host}${data.now.cond.icon.dir}${data.now.cond.icon.filepath}${data.now.cond.icon.filename}`,
            temp: data.now.tmp,
            cond: data.now.cond.txt
          }
          // 7天天气预报
          if (data.daily_forecast && data.daily_forecast[0]) {
            this.otherWeather = []
            data.daily_forecast.forEach(value => {
              this.otherWeather.push({
                time: value.date,
                icon: `${value.cond.icon_d.host}${value.cond.icon_d.dir}${value.cond.icon_d.filepath}${value.cond.icon_d.filename}`,
                temp: `${value.tmp.min}~${value.tmp.max}℃`,
                cond: value.cond.txt_d,
                wind: `${value.wind.dir}${value.wind.sc}级`
              })
            })
          }
        }
      })
    },
    getToday (date) {
      date = new Date(parseInt(date) * 1000)
      let year = date.getFullYear()
      let month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
      let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      this.today = `${year}年${month}月${day}日`
      this.day = this.weekDay[date.getDay()]
    },
    getWeek (date) {
      return this.weekDay[(new Date(date)).getDay()]
    }
  }
}
</script>
<style lang="scss" scoped>
.main-wrap {
  .weather {
    width: 100%;
    height: 100%;
    padding: 0.5rem 0.3rem 0.35rem;
    color: #fff;
    font-size: 0.48rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .weather-title {
      width: 100%;
      height: 1.14rem;
      background: url('../../assets/img/briefing/title_bg.png') no-repeat center;
      background-size: 100%;
      text-align: center;
      font-weight: 600;
      line-height: 1.14rem;
      margin-bottom: 0.35rem;
    }
    .weather-body {
      background: url('../../assets/img/briefing/tongyong_bg01.png') no-repeat center;
      background-size: 100%;
      padding: 0.64rem;
      .now-weather {
        width: 5rem;
        height: 7rem;
        .date {
          font-size: 0.36rem;
          span {
            margin-left: 0.4rem;
          }
        }
        .today-weather {
          .now-img {
            width: 2rem;
            height: 2rem;
            margin: 0.8rem auto 0;
          }
          .now-tmp {
            margin: 0.3rem 0;
            .tmp-left {
              font-size: 1rem;
              margin-right: 0.1rem;
            }
            .tmp-right {
              .degree {
                font-size: 0.36rem;
              }
              .cond {
                font-size: 0.3rem;
              }
            }
          }
          .now-wind {
            font-size: 0.3rem;
            div {
              text-align: center;
            }
            div:nth-of-type(2n) {
              margin: 0.15rem 0;
            }
          }
        }
      }
      .other-weather {
        .other-list {
          width: 3.9rem;
          height: 7rem;
          border-left: 1px solid #fff;
          text-align: center;
          padding-top: 1rem;
          font-size: 0.3rem;
          .list-time {
            font-size: 0.36rem;
          }
          .list-day {
            margin-top: 0.2rem;
          }
          .list-img {
            width: 1.65rem;
            height: 1.54rem;
            margin: 0.8rem auto;
          }
          .list-two {
            margin: 0.15rem 0;
          }
        }
      }
    }
  }
}
</style>
