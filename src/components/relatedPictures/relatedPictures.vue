<template>
  <div class="main-wrap">
    <div class="related-pictures">
      <div class="related-title">相关图片</div>
      <div class="related-body" v-if="imgList.length > 0">
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide v-for="(item, index) in imgList" :key="index" class="img-box">
            <img :src="`http://img.plus.3ch.net.cn/${item.photo_key}`" />
            <div class="title">{{item.photo_name}}</div>
          </swiper-slide>
        </swiper>
        <!-- Optional controls -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'relatedPictures',
  data () {
    return {
      timer: null,
      currentIndex:0,
      imgList: [],
      newsList: [],
      swiperOption: {
        effect: 'coverflow',
        autoplay: {
          delay: 5000, // 5秒切换一次
        },
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 150,
        loop: true,
        loopedSlides: this.imgList ? this.imgList.length : 0,
        coverflowEffect: {
          rotate: 10,
          stretch: 0,
          depth: 60,
          modifier: 1,
          slideShadows: true
        },
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  props: {
    id: Number
  },
  watch: {
    id (val) {
      if (val) {
        this.id = val
        this.createdPics()
      }
    }
  },
  created () {
    if (this.id) {
      this.createdPics()
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    createdPics () {
      this.getPics()
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.newsList && this.newsList[0]) {
            this.changePics()
          }
        },30000)
      }
    },
    getPics () {
      if (this.id) {
        this.$api.getContentDetail(this.id).then((response) => {
          if (response && response.data && response.data.result) {
            this.newsList = []
            this.newsList = response.data.result.gallery
            if (this.newsList && this.newsList[0]) {
              this.imgList = this.newsList[this.currentIndex].photos
            }
          }
        })
      }
    },
    changePics () {
      if(this.currentIndex === this.newsList.length - 1){
        this.currentIndex = 0
        this.imgList = this.newsList[this.currentIndex].photos
      }else{
        this.currentIndex ++
        this.imgList = this.newsList[this.currentIndex].photos
      }
    }
  }
}
</script>
<style lang="scss">
.main-wrap {
  .related-pictures {
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
    .related-title {
      width: 100%;
      height: 1.14rem;
      background: url('../../assets/img/briefing/title_bg.png') no-repeat center;
      background-size: 100%;
      text-align: center;
      font-weight: 600;
      line-height: 1.14rem;
      margin-bottom: 0.35rem;
    }
    .related-body {
      .swiper-container {
        .img-box {
          width: 13rem;
          height: 7.6rem;
          .title{
            color:#fff;
            z-index: 99999;
            font-size: 0.4rem;
            width: 100%;
            text-align:center;
            position: absolute;
            bottom: 0.4rem;
          }
        }
      }
      .swiper-pagination{
        width: 100%;
        .swiper-pagination-bullet{
          width: 0.2rem!important;
          height: 0.2rem!important;
          background: #70b1d8;
          margin-right: 0.2rem;
        }
        .swiper-pagination-bullet-active{
          background: #00edff;
          width: 0.5rem!important;
          height: 0.2rem!important;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
