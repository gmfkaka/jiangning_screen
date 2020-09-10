<template>
  <div class="main-wrap">
    <div class="click-wrap">
      <div class="text">中心公告</div>
      <div class="click-title overhidden">
        <div class="inner">
          <div v-for="(item,index) in noticeList" :key="index" class="inner-swiper">
            <div class="content">
              <div class="content-text" id="scroll-text" :style="scrollStyle" :class="{'active':ifBottom && index === 0, 'scrollone':index === 0}">
                <img :src="item.indexpic.uri" v-if="item && item.indexpic && item.indexpic.uri" />
                <div class="text-box" v-else>
                  <div class="content-title">{{item.title}}</div>
                  <div class="content-html" v-html="item.brief"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'taineiInform',
  data () {
    return {
      ifBottom: false,
      toBottom: 800,
      noticeList: [],
      timeout1: null,
      interval1: null,
      scrollStyle: {}
    }
  },
  created () {
    this.getReportList()
  },
  methods: {
    getReportList () {
      this.$api.getNotice().then(response => {
        if (response.data.result.length) {
          this.noticeList = response.data.result.slice(0, 1)
          setTimeout(() => {
            this.scrollText()
            this.interval1 = setInterval(this.scrollText, 85000)
          }, 1000)
        }
      })
    },
    scrollText () {
      clearTimeout(this.timeout1)
      // 获取高度添加样式
      let realHeight = document.getElementById('scroll-text').offsetHeight
      this.scrollStyle.top = `-${realHeight / 100}rem`
      this.ifBottom = true
      this.timeout1 = setTimeout(() => {
        this.scrollStyle.top = 0
        this.ifBottom = false
      }, 80000)
    }
  }
}
</script>

<style lang="scss" scoped>
.main-wrap {
  width: 100%;
  height: 10.8rem;
  padding: 0rem 0.3rem 0.15rem;
  position: relative;
  background: url("../../assets/img/box_bg.png") no-repeat center center;
  background-size: 100% 100%;
  .click-wrap {
    width: 100%;
    height: 100%;
    .text {
      font-size: 0.5rem;
      color: #fff;
      font-weight: 800;
      position: absolute;
      left: 50%;
      top: 7%;
      transform: translate(-50%, -50%);
    }
    .click-title {
      width: 100%;
      height: 100%;
      background: url("../../assets/img/title_bg.png") no-repeat top center;
      background-size: 100%;
      padding-top: 1.8rem;
      .inner {
        background: url("../../assets/img/taineiInform/border.png") no-repeat
          center center;
        background-size: 100% 100%;
        padding: 0.3rem;
        height: 8.8rem;
      }
      .inner-swiper {
        width: 100%;
        height: 100%;
        color: #fff;
        white-space: normal;
        padding: 0 0.5rem;
        .content {
          width: 100%;
          height: 100%;
          font-size: 0.36rem;
          overflow-x: auto;
          position: relative;
          .content-text {
            position: absolute;
            width: 100%;
            &.scrollone {
              top: 0;
            }
            &.active {
              transition: linear 80s;
            }
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .text-box {
              .content-title {
                font-size: 0.54rem;
                font-weight: 500;
                margin-bottom: 0.3rem;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
}
</style>