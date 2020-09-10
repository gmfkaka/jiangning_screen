<template>
  <div class="main-wrap">
    <div class="my-mission">
      <div class="my-title">我的任务</div>
      <div class="my-body">
        <div class="search sys-flex">
          <div
            class="search-content"
            :class="{'list-back': curentIndex === k}"
            v-for="(v, k) in searchList"
            :key="k"
          >{{v}}</div>
        </div>
        <div class="content">
          <div
            class="content-list sys-flex sys-flex-center animated"
            :class="{'fadeInLeft' : v.title}"
            :style="{'animation-delay' : k/2 + 's'}"
            v-for="(v, k) in contentList"
            :key="k"
          >
            <div
              class="list-status"
              :class="{'backOne': v.status === '1', 'backTwo': v.status === '2', 'backThree': v.status === '4'}"
            >{{statusText(v.status)}}</div>
            <div class="list-content">{{v.title}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'myMission',
  data () {
    return {
      searchList: [],
      curentIndex: 0,
      contentList: [],
      allList: []
    }
  },
  props: {
    id: Number,
    token: String
  },
  watch: {
    id (val) {
      if (val) {
        this.getList(val)
      }
    }
  },
  created () {
    setInterval(() => {
      this.curentIndex++
      if (this.curentIndex >= this.searchList.length) {
        this.curentIndex = 0
      }
      this.contentList = this.allList[this.curentIndex].data.slice(0, 5)
    }, '5000')
    if (this.id) {
      this.getList(this.id)
    }
  },
  methods: {
    getList (id) {
      if (id && this.token) {
        this.$api.getMission(this.token, id).then(response => {
          if (response && response.data && response.data.result) {
            let data = Object.values(response.data.result)
            this.allList = data
            this.searchList = [`任务总数：${data[0].page_info.total_num}`, `待开始：${data[1].page_info.total_num}`, `进行中：${data[2].page_info.total_num}`, `已完成：${data[3].page_info.total_num}`]
            this.contentList = this.allList[this.curentIndex].data.slice(0, 5)
          }
        })
      }
    },
    statusText (status) {
      switch (status) {
        case '1':
          return '待开始'
          break
        case '2':
          return '进行中'
          break
        default:
          return '已完成'
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.main-wrap {
  .my-mission {
    width: 100%;
    height: 100%;
    padding: 0.5rem 0.3rem 0.35rem;
    color: #fff;
    font-size: 0.48rem;
    .my-title {
      width: 100%;
      height: 1.14rem;
      background: url("../../assets/img/briefing/title_bg.png") no-repeat center;
      background-size: 100%;
      text-align: center;
      font-weight: 600;
      line-height: 1.14rem;
      margin-bottom: 0.35rem;
    }
    .my-body {
      .search {
        width: 100%;
        height: 1.6rem;
        background: url("../../assets/img/briefing/ttongyong_title_bg.png")
          no-repeat center;
        background-size: 100%;
        margin-bottom: 0.43rem;
        .list-back {
          background: #1458a5;
        }
        .search-content {
          width: 25%;
          height: 100%;
          line-height: 1.6rem;
          text-align: center;
          border-right: 1px solid #3fe6ff;
          font-size: 0.4rem;
          font-weight: 400;
          &:last-of-type {
            border-right: 0;
          }
        }
      }
      .content {
        width: 100%;
        height: 6.58rem;
        background: url("../../assets/img/briefing/tongyong_bg.png") no-repeat
          center;
        background-size: 100%;
        padding: 0 0.52rem;
        .content-list {
          border-bottom: 1px solid #3fe6ff;
          padding: 0.39rem 0;
          &:last-of-type {
            border-bottom: 0;
          }
          .backOne {
            background: #f3ae3c;
          }
          .backTwo {
            background: #269881;
          }
          .backThree {
            background: #1181e9;
          }
          .list-status {
            width: 0.9rem;
            height: 0.36rem;
            text-align: center;
            line-height: 0.36rem;
            font-size: 0.24rem;
            font-weight: 400;
            margin-right: 0.45rem;
          }
          .list-content {
            font-size: 0.36rem;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
