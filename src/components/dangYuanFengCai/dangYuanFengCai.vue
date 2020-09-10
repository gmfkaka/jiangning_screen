<template>
    <div class="main-wrap">
        <div class="title">党员风采</div>
        <div class="carsouel">
            <swiper :options="swiperOption">
                <swiper-slide v-for="(item,k) in imgList" :key="k">
                    <img :src="item.indexpic.host+item.indexpic.file" style="height:100%;width:100%">
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    name: 'clickList',
    data () {
        return {
            swiperOption:{
                autoplay: true,
                loop: true
            },
            imgList:[]
        }
    },
    components: {
        swiper,
        swiperSlide
    },

    created () {
        this.getImgs()
    },

    methods: {
        getImgs(){
            const param = [
                {
                    "id": "9fc22e167b584d10b9c91b574a6f5dea",
                    "conditions": [
                    {
                        "key": "article_column", //所属分类
                        "value": "7366b517534a4e7b81293f30c2c60755",
                        "operator": "="
                    }
                    ],

                    "expanding": ""
                }
            ]
            this.$api.getStudyData(param).then((response)=>{
                console.log(response);
                if( !response.data.ErrorCode && response.data.result[param[0]['id']].length){
                    this.imgList = response.data.result[param[0]['id']];
                    //console.log(this.imgList)
                }
            })
        }
     
    }
}
</script>

<style lang="scss" scoped>
    .main-wrap{
        width: 100%;
        height:100%;
        padding:0.2rem;
        background: rgb(14,22,50);
        .title{
            color:#628cab;
            height: 8%;
            font-size: 0.5rem;
            padding: 0 0.3rem;
        }
        .carsouel{
            height: 92%;
            padding: 0.3rem;
            background: url("../../assets/img/dangYuanFengCai/bg.png") no-repeat center center;
            background-size: 100% 100%;
            .swiper-container{
                height: 100%;
            }
        }
    }
</style>