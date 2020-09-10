<template>
  <div class="main-wrap">
    <div class="profile">
      <div class="profile-title">人物简介</div>
      <div class="profile-body" v-html="detail ? detail.profile : ''"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'profile',
  data () {
    return {
      detail: {}
    }
  },
  props: {
    id: Number
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
          if (res && res.data) {
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
  .profile {
    width: 100%;
    height: 100%;
    padding: 0.5rem 0.3rem 0.35rem;
    color: #fff;
    font-size: 0.48rem;
    .profile-title {
      width: 100%;
      height: 1.14rem;
      background: url('../../assets/img/briefing/title_bg.png') no-repeat center;
      background-size: 100%;
      text-align: center;
      font-weight: 600;
      line-height: 1.14rem;
      margin-bottom: 0.35rem;
    }
    .profile-body {
      background: url('../../assets/img/briefing/tongyong_bg01.png') no-repeat center;
      background-size: 100%;
      font-size: 0.4rem;
      font-weight: 400;
      padding: 0.67rem 1.14rem 0.36rem 0.72rem;
    }
  }
}
</style>
