<template>
  <div class="main-wrap">
    <div class="latest-contents">
      <div class="latest-title">最新内容</div>
      <div class="latest-body">
        <div class="search sys-flex sys-flex-center">
          <div class="search-status">最新</div>
          <div class="search-title">{{detail? detail.title : ''}}</div>
          <div class="search-time">{{detail? detail.time : ''}}</div>
        </div>
        <div class="content">
          <div v-html="detail? detail.content : ''"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'latestContents',
  data () {
    return {
      userId: '',
      detail: {}
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
  methods: {
    getList (id) {
      if (id) {
        this.$api.getNewList(id).then((response) => {
          if (response && response.data && response.data.result) {
            let data = response.data.result
            this.detail = {
              type: data.type,
              title: data.title,
              time: data.created_time,
              content: data.content
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
  .latest-contents {
    width: 100%;
    height: 100%;
    padding: 0.5rem 0.3rem 0.35rem;
    color: #fff;
    font-size: 0.48rem;
    .latest-title {
      width: 100%;
      height: 1.14rem;
      background: url('../../assets/img/briefing/title_bg.png') no-repeat center;
      background-size: 100%;
      text-align: center;
      font-weight: 600;
      line-height: 1.14rem;
      margin-bottom: 0.35rem;
    }
    .latest-body {
      .search {
        width: 100%;
        height: 1.6rem;
        background: url('../../assets/img/briefing/ttongyong_title_bg.png') no-repeat center;
        background-size: 100%;
        margin-bottom: 0.43rem;
        padding: 0 0.48rem 0 0.53rem;
        .search-status {
          width: 0.9rem;
          height: 0.4rem;
          text-align: center;
          line-height: 0.4rem;
          background: #F04141;
          font-size: 0.24rem;
          font-weight: 400;
          margin-right: 0.47rem;
        }
        .search-title {
          font-size: 0.4rem;
          font-weight: 400;
          margin-right: auto;
        }
        .search-time {
          font-size: 0.3rem;
          font-weight: 400;
        }
      }
      .content {
        width: 100%;
        height: 6.58rem;
        background: url('../../assets/img/briefing/tongyong_bg.png') no-repeat center;
        background-size: 100%;
        font-size: 0.4rem;
        font-weight: 400;
        padding: 0.65rem 0.47rem 0.62rem 0.51rem;
        div {
          width: 100%;
          height: 100%;
          overflow-x: hidden;
          overflow-y: scroll;
        }
      }
    }
  }
}
</style>
