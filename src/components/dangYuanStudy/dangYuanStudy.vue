<template>
    <div class="main-wrap">
        <div class="title">党员学习</div>
        <div class="task-wrap sys-flex flex-justify-between sys-flex-wrap">
            <swiper :options="swiperOption">
                <swiper-slide class="" style="height:100%!important;" v-for="(item,k) in zhuanTiKeJian" v-bind:key="k">
                    <div class="task-list" v-for="(list,key) in item" v-bind:key="key">
                        <div class="task-nav sys-flex sys-flex-center">
                            <div class="project-title sys-flex-one overhidden">微党课：专题课件</div>
                        </div>
                        <div class="task-content">
                            <div class="brief">{{list.title}}</div>
                            <div class="task-info sys-flex sys-flex-center overhidden flex-justify-between">
                                <div class="task-create-time">{{list.publish_time.slice(0,16)}}</div>
                                <div class="study-count">{{list.learn}}</div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
            <swiper :options="swiperOption">
                <swiper-slide class="" style="height:100%!important;" v-for="(item,k) in dangJianShipin" v-bind:key="k">
                    <div class="task-list" v-for="(list,key) in item" v-bind:key="key">
                        <div class="task-nav sys-flex sys-flex-center">
                            <div class="project-title sys-flex-one overhidden">微党课：党建视频</div>
                        </div>
                        <div class="task-content">
                            <div class="brief">{{list.title}}</div>
                            <div class="task-info sys-flex sys-flex-center overhidden flex-justify-between">
                                <div class="task-create-time">{{list.publish_time.slice(0,16)}}</div>
                                <div class="study-count">{{list.learn}}</div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
           <swiper :options="swiperOption">
                <swiper-slide class="" style="height:100%!important;" v-for="(item,k) in xiLieJiangHua" v-bind:key="k">
                    <div class="task-list" v-for="(list,key) in item" v-bind:key="key">
                        <div class="task-nav sys-flex sys-flex-center">
                            <div class="project-title sys-flex-one overhidden">微党课：系列讲话</div>
                        </div>
                        <div class="task-content">
                            <div class="brief">{{list.title}}</div>
                            <div class="task-info sys-flex sys-flex-center overhidden flex-justify-between">
                                <div class="task-create-time">{{list.publish_time.slice(0,16)}}</div>
                                <div class="study-count">{{list.learn}}</div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
           </swiper>
            <swiper :options="swiperOption">
                <swiper-slide class="" style="height:100%!important;" v-for="(item,k) in dangZhangDangGui" v-bind:key="k">
                    <div class="task-list" v-for="(list,key) in item" v-bind:key="key">
                        <div class="task-nav sys-flex sys-flex-center">
                            <div class="project-title sys-flex-one overhidden">两学一做：党章党规</div>
                        </div>
                        <div class="task-content">
                            <div class="brief">{{list.title}}</div>
                            <div class="task-info sys-flex sys-flex-center overhidden flex-justify-between">
                                <div class="task-create-time">{{list.publish_time.slice(0,16)}}</div>
                                <div class="study-count">{{list.learn}}</div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
            <swiper :options="swiperOption">
                <swiper-slide class="" style="height:100%!important;" v-for="(item,k) in heGeDangYuan" v-bind:key="k">
                    <div class="task-list" v-for="(list,key) in item" v-bind:key="key">
                        <div class="task-nav sys-flex sys-flex-center">
                            <div class="project-title sys-flex-one overhidden">两学一做：合格党员</div>
                        </div>
                        <div class="task-content">
                            <div class="brief">{{list.title}}</div>
                            <div class="task-info sys-flex sys-flex-center overhidden flex-justify-between">
                                <div class="task-create-time">{{list.publish_time.slice(0,16)}}</div>
                                <div class="study-count">{{list.learn}}</div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
            <swiper :options="swiperOption">
                <swiper-slide class="" style="height:100%!important;" v-for="(item,k) in dangXingJiaoYu" v-bind:key="k">
                    <div class="task-list" v-for="(list,key) in item" v-bind:key="key">
                        <div class="task-nav sys-flex sys-flex-center">
                            <div class="project-title sys-flex-one overhidden">两学一做：党性教育</div>
                        </div>
                        <div class="task-content">
                            <div class="brief">{{list.title}}</div>
                            <div class="task-info sys-flex sys-flex-center overhidden flex-justify-between">
                                <div class="task-create-time">{{list.publish_time.slice(0,16)}}</div>
                                <div class="study-count">{{list.learn}}</div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    name: 'dangYuanStudy',
    data () {
        return {
            // 分类列表
            zhuanTiKeJian:[],
            dangJianShipin:[],
            xiLieJiangHua:[],
            dangZhangDangGui:[],
            heGeDangYuan:[],
            dangXingJiaoYu:[],

            swiperOption : {
                // notNextTick: true,
                speed : 2000,
                // autoplay : false,
                autoplay: {
                    delay: 15000,
                    stopOnLastSlide:false,
                    disableOnInteraction:false
                },
                autoHeight: true,
                // direction: 'vertical',
                effect : 'flip',
                initialSlide :0,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
                paginationClickable :true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },
            currentIndex : 1,
        }
    },

    components: {
        swiper, 
        swiperSlide,
    },

    created () {
        this.reqData();
    },

    methods: {
        //专题课件
        getZhuanTiKeJian(){
            const _this = this;
            const param = [
                {
                    "id": "1754beaeb3354a5ba01e844d3daba637",
                    "conditions": [
                    {
                        "key": "information_type",
                        "value": "740d2fef2bfc4b398b7efb63861c488d",
                        "operator": "="
                    }
                    ],
                    "expanding": ""
                }
            ]
            return new Promise((resolve,reject)=>{
                _this.$api.getStudyData(param).then(
                    response => {
                        if( !response.data.ErrorCode && response.data.result[param[0]['id']].length){
                            resolve(_this.split_array(response.data.result[param[0]['id']] , 1))
                        }
                    },
                    err => { reject(err.data) }
                )
            })
        },

        //党建视频 
        getDangJianShiPin(){
            const _this = this;
            const param = [
                {
                    "id": "1754beaeb3354a5ba01e844d3daba637",
                    "conditions": [
                    {
                        "key": "information_type", //所属分类
                        "value": "396a31f3ee304d58b2ba33077dd00c38",
                        "operator": "="
                    }
                    ],

                    "expanding": ""
                }
            ]
            return new Promise((resolve,reject)=>{
                _this.$api.getStudyData(param).then(
                    response => { 
                        if( !response.data.ErrorCode && response.data.result[param[0]['id']].length){
                            resolve(_this.split_array(response.data.result[param[0]['id']] , 1))
                        }
                    },
                    err => { reject(err.data) }
                )
            })
        },

        //系列讲话
        getXiLieJiangHua(){
            const _this = this
            const param = [
                {
                    "id": "1754beaeb3354a5ba01e844d3daba637",
                    "conditions": [
                    {
                        "key": "information_type", //所属分类
                        "value": "e4e1da5bb2f440b3b15da03b5e61133a",
                        "operator": "="
                    }
                    ],

                    "expanding": ""
                }
            ]
            return new Promise((resolve,reject)=>{
                _this.$api.getStudyData(param).then(
                    response => {
                        if( !response.data.ErrorCode && response.data.result[param[0]['id']].length){
                            resolve(this.split_array(response.data.result[param[0]['id']] , 1))
                        }
                    },
                    err => { reject(err.data) }
                )
            })
        },

        //党章党规 
        getDangZhangDangGui(){
            const _this = this
            const param = [
                {
                    "id": "683ab7d72dbd4868bba2fe9417299949",
                    "conditions": [
                    {
                        "key": "information_type", //所属分类
                        "value": "a58ab8aec96f4f1081607b1172eeffd6",
                        "operator": "="
                    }
                    ],

                    "expanding": ""
                }
            ]
            return new Promise((resolve,reject)=>{
                this.$api.getStudyData(param).then(
                    response => {
                        if( !response.data.ErrorCode && response.data.result[param[0]['id']].length){
                            resolve(this.split_array(response.data.result[param[0]['id']] , 1))
                        }
                    },
                    err => { reject(err.data) }
                )
            })
        },

        //合格党员 暂无数据
        getHeGeDangYuan(){
            const _this = this;
            const param = [
                {
                    "id": "683ab7d72dbd4868bba2fe9417299949",
                    "conditions": [
                    {
                        "key": "information_type", //所属分类
                        "value": "8974ac4787a44b869e72389f3b53959d",
                        "operator": "="
                    }
                    ],

                    "expanding": ""
                }
            ]
            return new Promise((resolve,reject)=>{
                _this.$api.getStudyData(param).then(
                    response => {
                        //resolve(response)
                        if( !response.data.ErrorCode && response.data.result[param[0]['id']].length){
                            resolve(this.split_array(response.data.result[param[0]['id']] , 1))
                        }
                    },
                    err => { reject(err.data) }
                )
            })
        },

        //党性教育
        getDangXingJiaoYu(){
            const _this = this;
            const param = [
                {
                    "id": "683ab7d72dbd4868bba2fe9417299949",
                    "conditions": [
                    {
                        "key": "information_type", //所属分类
                        "value": "420eb0a25e644a7db456d519effcf57d",
                        "operator": "="
                    }
                    ],

                    "expanding": ""
                }
            ]
            return new Promise((resolve,reject)=>{
                this.$api.getStudyData(param).then(
                    response =>{
                        if( !response.data.ErrorCode && response.data.result[param[0]['id']].length){
                            resolve(this.split_array(response.data.result[param[0]['id']] , 1))
                        }
                    },
                    err => { reject(err.data) }
                )
            })
        },
    
        //promise.all请求
        reqData(){
            const _this = this;
            Promise.all([_this.getZhuanTiKeJian(), _this.getDangJianShiPin(),_this.getXiLieJiangHua(),_this.getDangZhangDangGui(),_this.getHeGeDangYuan(),_this.getDangXingJiaoYu()])
            .then((result) => {
                console.log(result)
                _this.zhuanTiKeJian = result[0];
                _this.dangJianShipin = result[1];
                _this.xiLieJiangHua = result[2];
                _this.dangZhangDangGui = result[3];
                _this.heGeDangYuan = result[4];
                _this.dangXingJiaoYu = result[5];
            }).catch((error) => {
                console.log(error)
            })
        },
        
        split_array(arr, len){    
            let a_len = arr.length;    
            let result = [];    
            for(let i=0;i<a_len;i+=len){        
                result.push(arr.slice(i,i+len));    
            }    
            return result;
        },
    }
}
</script>

<style lang="scss" scoped>
    .main-wrap{
        width:100%;
        height:100%;
        padding: 0.3rem;
        position: relative;
        background: rgb(14,22,50);
        .title{
            color:#628cab;
            height: 8%;
            font-size: 0.5rem;
        }
        .task-wrap{
            width : 100%;
            height: 92%;
            padding: 0.3rem;
            background: url('../../assets/img/dangYuanStudy/border.png') no-repeat center center;
            background-size: 100% 100%;
            .swiper-container{
                width:32%;
                height:48%;
                margin:0;
            }
            .task-list{
                width : 100%;
                height : 100%;
                background:rgba(2,122,186,0.2);
                border : 0.01rem solid rgba(2, 122, 186, 0.5);
                .task-nav{
                    width: 100%;
                    height: 20%;
                    font-size: 0.3rem;
                    padding: 0 0.5rem;
                    background:rgba(9,44,111,1);
                    .project-title{
                        font-size:0.32rem;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(174,183,209,1);
                    }
                }
                .task-content{
                    padding: 0.5rem;
                    height:80%;
                    background:rgba(23,52,76,0);
                    .brief{
                        height: 1.5rem;
                        margin-bottom: 0.5rem;
                        font-size: 0.3rem;
                        font-weight:400;
                        color:#fff;
                        overflow: hidden;
                    }
                    .task-info{
                        font-size: 0.3rem;
                        width: 100%;
                        .task-create-time{
                            padding-left: 0.4rem; 
                            color:#fff;
                            background: url('../../assets/img/task/time.png') no-repeat center left;
                            background-size:0.25rem 0.25rem;
                        }
                        .study-count{
                            background: url('../../assets/img/clickList/click.png') no-repeat center left rgba(255,255,255,0.2);
                            background-size: 0.3rem 0.28rem;
                            padding-left: 0.5rem;
                            font-size: 0.3rem;
                            font-family:PingFangSC-Regular;
                            font-weight:400;
                            color:#fff;
                        }
                    }
                }
                
            }
        }
    }
</style>