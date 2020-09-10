<template>
    <div class="main-wrap">
        <div class="click-wrap">
            <div class="text">台内公告</div>
            <div class="click-title overhidden">
                <div class="inner">
                    <swiper :options="swiperOption" class="swiper" v-if="noticeList.length">
                        <swiper-slide v-for="(item,index) in noticeList" :key="index">
                            <div class="title">{{item.title}}</div>
                            <div class="content">
                                <div class="content-text" :class="{'active':ifBottom && index == 0,'scrollone':index == 0}" v-html="item.brief" ref="content1"></div>
                            </div>
                        </swiper-slide>
                    </swiper>
                    <div class="info sys-flex sys-flex-center flex-justify-between">
                        <div class="info-user sys-flex sys-flex-center">
                            <div class="user-icon"></div>
                                {{noticeInfo.author}}
                        </div>
                        <div class="info-time sys-flex sys-flex-center">
                            <div class="time-icon"></div>
                            {{noticeInfo.create_time | format}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    name: 'taineiNotice',
    data () {
        return {
            ifBottom:false,
            toBottom:800,
            currentIndex:0,
            noticeInfo:{},
            noticeList:[],
            count : 0,
            swiperOption:{
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
                loop: false,
                // loopAdditionalSlides: 4,
                autoplay: {
                    delay: 30000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                },
                on:{
                    transitionEnd:function(){
                        console.log(this.realIndex)
                    }
                }
            },
            timeout1: null,
            interval1: null,
        }
    },


    created () {
        this.getReportList();
    },

    mounted(){

    },

    computed: {
        bottomDistance: function () {
            return `-${this.toBottom}px`
        }
    },

    components: {
        swiper, 
        swiperSlide,
    },

    filters : {
        format: (inputTime)=>{
            inputTime = parseInt(inputTime)*1000;
            var date = new Date(inputTime);    
            var y = date.getFullYear();      
            var m = date.getMonth() + 1;      
            m = m < 10 ? ('0' + m) : m;      
            var d = date.getDate();      
            d = d < 10 ? ('0' + d) : d;      
            var h = date.getHours();    
            h = h < 10 ? ('0' + h) : h;    
            var minute = date.getMinutes();    
            var second = date.getSeconds();    
            minute = minute < 10 ? ('0' + minute) : minute;      
            second = second < 10 ? ('0' + second) : second; 
            var time = y + '-' + m + '-' + d+' '+h+':'+minute+':'+second
            return time.slice(5,16);  

        }
    },

    methods: {
        getReportList(){
            // if(this.countNum){
            //     this.reportList = [];
            //     clearInterval(this.countNum);
            //     this.count = 0;
            // }
            this.$api.getNotice().then((response)=>{
                // console.log(response)
                if( !response.data.ErrorCode && response.data.data.length){
                    this.noticeList = response.data.data.slice(0,1);
                    this.noticeInfo  = response.data.data[0]
                    setTimeout(() => {
                        // let selfHeight = this.$refs.content1[0].offsetHeight
                        // let rootHeight = parseInt(document.documentElement.style.fontSize)
                        // console.log(selfHeight,rootHeight)
                        // this.toBottom = selfHeight-4.5*rootHeight
                        // console.log(this.toBottom)
                        this.scrollText()
                        this.interval1 = setInterval(this.scrollText,20000)
                    }, 100);
                    // console.log(this.noticeInfo)
                    // setInterval(()=>{
                    //     this.changeContent()
                    // },30000)
                }
            });
        },

        changeContent(){
            if(this.currentIndex == 3){
                this.currentIndex = 0;
                // console.log(this.currentIndex)
                this.noticeInfo = this.noticeList[this.currentIndex]
            }else{
                this.currentIndex++;
                // console.log(this.currentIndex)
                this.noticeInfo = {},
                this.noticeInfo = this.noticeList[this.currentIndex]
            }
        },

        scrollText(){
            clearTimeout(this.timeout1)
            this.ifBottom = true;
            // console.log('执行了')
            // console.log(this.ifBottom)
            this.timeout1 = setTimeout(() => {
                this.ifBottom = false;
            }, 18000);
        },
    }
}
</script>

<style lang="scss" scoped>
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
                padding-top: 1.8rem;
                .inner{
                    background: url('../../assets/img/taineiNotice/tngg_bg.png') no-repeat center center;
                    background-size: 100% 100%;
                    padding: 0.3rem;
                    height: 8.8rem;
                }
                .swiper{
                    padding-left: 0.3rem;
                    padding-top: 0.3rem;
                    color:#fff;
                    margin-top: 0;
                    white-space: normal;
                    background: url('../../assets/img/taineiNotice/gonggaobg.png') no-repeat center center;
                    background-size: 100% 100%;
                    .title{
                        width: 100%;
                        height: 2rem;
                        line-height: 1.5rem;
                        font-size: 0.54rem;
                        font-family:PingFangSC-Medium;
                        text-align: center;
                        font-weight:500;
                        margin-bottom: 0.3rem;
                    }
                    .content{
                        width:17rem;
                        // padding-top: 1.1rem;
                        font-size: 0.36rem;
                        height: 4.5rem;
                        // overflow: hidden;
                        overflow-x: auto;
                        position: relative;
                        .content-text{
                            position: absolute;
                            &.scrollone{
                                bottom: -215%;
                            }
                            &.active{
                                bottom: 0;
                                transition: linear 18s;
                            }
                        }
                    }
                }
                .info{
                    width: 100%;
                    color:#fff;
                    font-size: 0.3rem;
                    padding-top: 0.2rem;
                    padding-right: 0.1rem;
                    .user-icon{
                        width: 0.25rem;
                        height: 0.28rem;
                        background: url('../../assets/img/taineiNotice/user_icon.png') no-repeat top center;
                        background-size: 100% 100%;
                        margin-right: 0.23rem;
                    }
                    .time-icon{
                        width: 0.27rem;
                        height: 0.27rem;
                        background: url('../../assets/img/taineiNotice/time_icon.png') no-repeat top center;
                        background-size: 100% 100%;
                        margin-right: 0.23rem;
                    }
                }
            }
        }
    }
</style>