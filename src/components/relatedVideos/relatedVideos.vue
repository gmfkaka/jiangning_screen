<template>
  <div class="main-wrap">
    <div class="related-videos">
      <div class="videos-title">相关视频</div>
      <div class="videos-body sys-flex flex-justify-between">
        <div class="videos-left" v-if="videoSrc">
          <video  controls="controls" autoplay="autoplay" loop="loop" :src="videoSrc"></video>
        </div>
        <div class="videos-right" v-if="videoList && videoList[0]">
          <div class="videos-list" :class="{'select-border': curentIndex === k}" v-for="(v, k) in videoList" :key="k">
            <div class="img-box">
              <img :src="v.src" />
            </div>
            <div class="video-button" v-show="curentIndex !== k">
              <img src="../../assets/img/briefing/video_player_icon.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { setInterval } from 'timers';
export default {
  name: 'relatedVideos',
  data () {
    return {
      videoList: [],
      videoSrc: '',
      curentIndex: 0,
      timer: null
    }
  },
  props: {
    id: Number
  },
  watch: {
    id (val) {
      if (val) {
        this.id = val
        this.getVideos()
      }
    }
  },
  created () {
    if (this.id) {
      this.getVideos()
    }
  },
  methods: {
    getVideos () {
      if (this.id) {
        if (!this.timer) {
          this.timer = setInterval(() => {
            this.curentIndex ++
            this.videoSrc = this.videoList[this.curentIndex] ? this.videoList[this.curentIndex].video : ''
            if (this.curentIndex >= this.videoList.length) {
              this.curentIndex = 0
              this.videoSrc = this.videoList[this.curentIndex] ? this.videoList[this.curentIndex].video : ''
            }
          }, '5000')
        }
        this.$api.getContentDetail(this.id).then((response) => {
          if (response && response.data && response.data.result) {
            let video = response.data.result.video
            if (video && video[0]) {
              this.videoList = []
              video.forEach(value => {
                this.videoList.push({
                  src: value.index_pic,
                  video: `${value.video ? value.video.host : ''}${value.video ? value.video.filepath : ''}${value.streams ? value.streams[0].target_filename : ''}`
                })
              })
              this.videoSrc = this.videoList[this.curentIndex] ? this.videoList[this.curentIndex].video : ''
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
  .related-videos {
    width: 100%;
    height: 100%;
    padding: 0.5rem 0.3rem 0.35rem;
    color: #fff;
    font-size: 0.48rem;
    video {
      width: 100%;
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .videos-title {
      width: 100%;
      height: 1.14rem;
      background: url('../../assets/img/briefing/title_bg.png') no-repeat center;
      background-size: 100%;
      text-align: center;
      font-weight: 600;
      line-height: 1.14rem;
      margin-bottom: 0.35rem;
    }
    .videos-body {
      width: 100%;
      height: 8.62rem;
      background: url('../../assets/img/briefing/tongyong_bg01.png') no-repeat center;
      background-size: 100%;
      padding: 0.54rem 0.74rem 0.62rem 0.79rem;
      .videos-left {
        width: 13.3rem;
        height: 7.6rem;
      }
      .videos-right {
        overflow: scroll;
        .select-border {
          border: 0.04rem solid #04F8FF;
          opacity: 1!important;
        }
        .videos-list {
          position: relative;
          margin-bottom: 0.13rem;
          opacity: 0.6;
          .img-box {
            width: 3.05rem;
            height: 1.8rem;
          }
          .video-button {
            width: 0.76rem;
            height: 0.76rem;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -0.38rem;
            margin-left: -0.38rem;
          }
        }
      }
    }
  }
}
</style>
