<template>
  <div class="main-wrap">
    <div class="media-index">
      <div class="media-title sys-flex sys-flex-center">
        <div class="title-img">
          <img src="../../assets/img/briefing/jiangninglogo.png" />
        </div>
        <div class="title-text">江宁区融媒体中心</div>
      </div>
      <div class="media-body sys-flex flex-justify-between">
        <div class="body-left">
          <img :src="faceImg" />
        </div>
        <div class="body-right">
          <div class="name common sys-flex sys-flex-center">
            <div>姓名<span>NAME</span></div>
            <div>{{detailData ? detailData.member_name : ''}}</div>
          </div>
          <div class="position common sys-flex sys-flex-center">
            <div>职务<span>POSITION</span></div>
            <div>{{detailData && detailData.displayData && detailData.displayData.role_id ? detailData.displayData.role_id.value : ''}}</div>
          </div>
          <div class="section common sys-flex sys-flex-center">
            <div>部门<span>SECTION</span></div>
            <div>{{detailData && detailData.orgInfo ? detailData.orgInfo.title : ''}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mediaIndex',
  data () {
    return {
      detailData: {},
      faceImg: ''
    }
  },
  props: {
    id: Number,
    token: String,
    facePath: String
  },
  watch: {
    id (val) {
      if (val) {
        this.id = val
        this.getDetail()
      }
    },
    facePath (path) {
      if (path) {
        this.faceImg = path
      }
    }
  },
  created () {
    this.faceImg = this.facePath
    if (this.id) {
      this.getDetail()
    }
  },
  methods: {
    getDetail () {
      if (this.id && this.token) {
        this.$api.getUserInformation(this.token, this.id).then((response) => {
          if (response && response.data) {
            this.detailData = response.data.data
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.main-wrap {
  .media-index {
    width: 100%;
    height: 100%;
    padding: 0.5rem 0.3rem 0.35rem;
    color: #fff;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .media-title {
      margin-bottom: 0.8rem;
      .title-img {
        width: 2.09rem;
        height: 2.09rem;
        margin-right: 0.8rem;
      }
      .title-text {
        font-size: 1.1rem;
        font-weight: bold;
      }
    }
    .media-body {
      .body-left {
        width: 6.35rem;
        height: 7rem;
        border-radius: 0.1rem;
      }
      .body-right {
        .common {
          width: 11.36rem;
          height: 1.83rem;
          background: url('../../assets/img/briefing/name02_bg.png') no-repeat center;
          background-size: 100%;
          padding: 0 0.72rem;
          margin-bottom: 0.73rem;
          &:last-of-type {
            margin-bottom: 0;
          }
          div:first-of-type {
            font-size: 0.48rem;
            font-weight: 400;
            span {
              font-size: 0.3rem;
              margin-left: 0.08rem;
            }
          }
          div:last-of-type {
            font-size: 0.6rem;
            font-weight: bold;
            margin-left: 0.62rem;
          }
        }
      }
    }
  }
}
</style>
