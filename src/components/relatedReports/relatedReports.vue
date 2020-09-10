<template>
  <div class="main-wrap">
    <div class="related-reports">
      <div class="reports-title">相关报道</div>
      <div class="reports-body">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide class="sys-flex sys-flex-wrap flex-justify-between" v-for="(item, key) in taskList" :key="key">
            <div class="reports-list sys-flex sys-flex-center" v-for="(v, k) in item" :key="k">
              <div class="img-box" v-if="v.index_pic">
                <img :src="v.index_pic" />
              </div>
              <div class="list-content">
                <div class="list-title">{{v.title}}</div>
                <div class="list-time">{{v.created_time}}</div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'relatedReports',
  data () {
    return {
      taskList : [],
      dataList: [],
      swiperOption: {
        effect : 'flip',
        autoplay: true,
        speed: 2000
      }
    }
  },
  props: {
    id: Number
  },
  watch: {
    id (val) {
      if (val) {
        this.id = val
        this.getArticle()
      }
    }
  },
  components: {
    swiper,
    swiperSlide,
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  created () {
    if (this.id) {
      this.getArticle()
    }
  },
  methods: {
    getArticle () {
      if (this.id) {
        this.$api.getContentDetail(this.id).then((response) => {
          if (response && response.data && response.data.result) {
            this.dataList = []
            this.dataList = response.data.result.article
            this.taskList = this.split_array(this.dataList ? this.dataList : [], 8)
          }
        })
      }
    },
    split_array(arr, len){
      let a_len = arr.length
      let result = []
      for(let i=0; i<a_len; i+=len){
        result.push(arr.slice(i,i+len))
      }
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
.main-wrap {
  .related-reports {
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
    .reports-title {
      width: 100%;
      height: 1.14rem;
      background: url('../../assets/img/briefing/title_bg.png') no-repeat center;
      background-size: 100%;
      text-align: center;
      font-weight: 600;
      line-height: 1.14rem;
      margin-bottom: 0.35rem;
    }
    .reports-body {
      .reports-list {
        width: 8.85rem;
        height: 1.93rem;
        background: url('../../assets/img/briefing/baodao_list_bg.png') no-repeat center;
        background-size: 100%;
        font-weight: 400;
        margin-bottom: 0.25rem;
        padding: 0.2rem;
        .img-box {
          width: 2.2rem;
          height: 1.52rem;
          border-radius: 0.03rem;
          margin-right: 0.28rem;
        }
        .list-content {
          .list-title {
            font-size: 0.36rem;
            margin-bottom: 0.15rem;
          }
          .list-time {
            font-size: 0.24rem;
          }
        }
      }
    }
  }
}
</style>
