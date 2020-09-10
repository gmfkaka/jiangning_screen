<template>
  <div class="main-wrap">
    <div class="character-information">
      <div class="character-title">人物信息</div>
      <div class="character-body sys-flex flex-justify-between">
        <div class="head-photo">
          <img :src="faceImg ? faceImg : ''" />
        </div>
        <div class="name-position">
          <div class="name sys-flex sys-flex-center">
            <div>姓名<span>NAME</span></div>
            <div>{{detail ? detail.name : ''}}</div>
          </div>
          <div class="position">
            <div>职务<span>POSITION</span></div>
            <div v-html="detail ? detail.position : ''"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'characterInformation',
  data () {
    return {
      detail: {},
      faceImg: ''
    }
  },
  props: {
    id: Number,
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
      if (this.id) {
        this.$api.getCharacterDetail(this.id).then((res)=>{
          if (res && res.data && res.data.result) {
            this.detail = res.data.result
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.main-wrap {
  .character-information {
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
    .character-title {
      width: 100%;
      height: 1.14rem;
      background: url('../../assets/img/briefing/title_bg.png') no-repeat center;
      background-size: 100%;
      text-align: center;
      font-weight: 600;
      line-height: 1.14rem;
      margin-bottom: 0.35rem;
    }
    .character-body {
      .head-photo {
        width: 6.35rem;
        height: 8.62rem;
      }
      .name-position {
        span {
          font-size: 0.3rem;
          margin-left: 0.08rem;
        }
        .name {
          width: 11.36rem;
          height: 1.83rem;
          background: url('../../assets/img/briefing/name02_bg.png') no-repeat center;
          background-size: 100%;
          margin-bottom: 0.42rem;
          padding: 0 0.72rem;
          div:first-of-type {
            font-weight: 400;
          }
          div:last-of-type {
            font-size: 0.72rem;
            font-weight: bold;
            margin-left: 0.62rem;
          }
        }
        .position {
          width: 11.36rem;
          height: 6.34rem;
          background: url('../../assets/img/briefing/renwu_zhiwu_bg.png') no-repeat center;
          background-size: 100%;
          padding: 0.47rem 0.72rem;
          div:first-of-type {
            font-weight: 400;
            margin-bottom: 0.8rem;
          }
          div:last-of-type {
            font-size: 0.6rem;
            font-weight: bold;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
