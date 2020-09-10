<template>
  <div class="main-wrap">
    <div class="hottest-content">
      <div class="hottest-title">最热内容</div>
      <div class="hottest-body">
        <div class="hottest-list sys-flex sys-flex-center flex-justify-between animated" :class="{'fadeInLeft' : v}" :style="{'animation-delay' : k/2 + 's'}" v-for="(v, k) in dataList" :key="k">
          <div class="status" :class="{'backOne': (v && v.type === 'gallery'), 'backTwo': (v && v.type === 'video'), 'backFour': (v && v.type === 'article')}">{{statusText(v? v.type : '')}}</div>
          <div class="title">{{v ? v.title : ''}}</div>
          <div class="num font30 sys-flex">
            <div class="num-img">
              <img src="../../assets/img/briefing/view_icon.png" />
            </div>
            <div>{{v ? v.click_num : ''}}</div>
          </div>
          <div class="time font30">{{v? v.created_time : ''}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'hottestContent',
  data () {
    return {
      userId: '',
      dataList: []
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
  mounted () {
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
    statusText (type) {
      switch (type) {
        case 'gallery':
          return '图集'
          break
        case 'video':
          return '视频'
          break
        case 'article':
          return '文稿'
          break
      }
    },
    getList (id) {
      if (id) {
        this.$api.getHotList(id).then((response) => {
          if (response && response.data && response.data.result) {
            this.dataList = response.data.result
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.main-wrap {
  .hottest-content {
    width: 100%;
    height: 100%;
    padding: 0.5rem 0.3rem 0.35rem;
    color: #fff;
    font-size: 0.48rem;
    .hottest-title {
      width: 100%;
      height: 1.14rem;
      background: url('../../assets/img/briefing/title_bg.png') no-repeat center;
      background-size: 100%;
      text-align: center;
      font-weight: 600;
      line-height: 1.14rem;
      margin-bottom: 0.35rem;
    }
    .hottest-body {
      background: url('../../assets/img/briefing/tongyong_bg01.png') no-repeat center;
      background-size: 100%;
      padding: 0 0.5rem;
      .hottest-list {
        border-bottom: 1px solid #3FE6FF;
        padding: 0.42rem 0;
        &:last-of-type {
          border-bottom: 0;
        }
        .backOne {
          background: #F0A841;
        }
        .backTwo {
          background: #1181E9;
        }
        .backThree {
          background: #269881;
        }
        .backFour {
          background: #AA89BD;
        }
        .status {
          font-size: 0.24rem;
          font-weight: 400;
          width: 0.9rem;
          height: 0.36rem;
          border-radius: 0.03rem;
          text-align: center;
          line-height: 0.36rem;
        }
        .title {
          font-size: 0.36rem;
          font-weight: 400;
          margin-left: -1rem;
          width: 10rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .num-img {
          width: 0.36rem;
          height: 0.26rem;
          margin-right: 0.24rem;
        }
        .font30 {
          font-size: 0.3rem;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
