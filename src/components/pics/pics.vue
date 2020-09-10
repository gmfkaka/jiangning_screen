<template>
    <div class="main-wrap">
        <div class="click-wrap">
            <div class="text">图集播放</div>
            <div class="click-title overhidden">
                <swiper :options="swiperOption" class="swiper" ref="swiper" v-if="imgList.length">
                    <swiper-slide class="swiper-item" v-for="(item,index) in imgList" :key='index'>
                        <img :src="`http://img.plus.3ch.net.cn/${item.photo_key}`" alt="">
                        <div class="title">{{item.photo_name}}</div>
                    </swiper-slide>
                </swiper>
                <div class="swiper-pagination"></div>
            </div>
        </div>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    name: 'pics',
    data () {
        return {
            currentIndex:0,
            titleList:[],
            newsList:[],
            imgList:[],
            swiperOption:{
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
                loop: true,
                loopAdditionalSlides: 4,
                autoplay: {
                    delay: 5000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                },
                spaceBetween: 20,
                slidesPerView: 1.2,
                centeredSlides: true,
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                },
            }
        }
    },


    created () {
        this.getPics()
        setInterval(()=>{
            this.changePics()
        },30000)
    },

    components: {
        swiper,
        swiperSlide,
    },

    methods: {

        getPics(){
            this.$api.getPics().then((response)=>{
                // console.log(response.data)
                this.newsList = response.data.result
                this.imgList = this.newsList[0].attachments
            })
        },

        changePics(){
            if(this.currentIndex == this.newsList.length - 1){
                this.currentIndex = 0
                this.imgList = this.newsList[this.currentIndex].attachments
            }else{
                this.currentIndex++
                this.imgList = this.newsList[this.currentIndex].attachments
            }
            console.log(this.currentIndex)
        }
    }
}
</script>

<style lang="scss">
    .main-wrap{
        width:100%;
        height:10.8rem;
        padding: 0rem 0.3rem 0.15rem;
        position: relative;
        background: url('../../assets/img/box_bg.png') no-repeat center center;
        background-size: 100% 100%;
        .click-wrap{
            width : 100%;
            height: 100%;
            .text{
                font-size: 0.5rem;
                color:#fff;
                font-weight:800;
                position: absolute;
                left: 50%;
                top: 7%;
                transform: translate(-50%,-50%)
            }
            .click-title{
                width: 100%;
                height: 100%;
                background: url('../../assets/img/title_bg.png') no-repeat top center;
                background-size: 100%;
                .swiper{
                    color:#fff;
                    margin-top: 1.8rem;
                    height: 7.5rem;
                    .swiper-item{
                        height: 100%;
                        white-space: normal;
                        img{
                            width: 100%;
                            height: 100%;
                        }
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
                        width: 0.2rem;
                        height: 0.2rem;
                        background: #70b1d8;
                        margin-right: 0.2rem;
                    }
                    .swiper-pagination-bullet-active{
                        background: #00edff;
                        width: 0.5rem;
                        height: 0.2rem;
                        border-radius: 10px;
                    }
                }
            }
        }
    }
</style>
