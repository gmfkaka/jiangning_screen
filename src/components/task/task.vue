<template>
    <div class="main-wrap">
        <div class="task-wrap">
            <swiper :options="swiperOption" ref="mySwiper" >
                <swiper-slide class="sys-flex sys-flex-wrap flex-justify-left" style="height:100%!important;" v-for="(item,k) in taskList" v-bind:key="k">
                    <div class="task-list" v-for="(list,key) in item" v-bind:key="key" @click="showContent(list,key)">
                        <div class="task-nav sys-flex sys-flex-center">
                            <div class="project-title sys-flex-one overhidden">所属选题：{{list.project_title}}</div>
                            <div class="task-status normal" v-if="list.priority == 1">普通</div>
                            <div class="task-status emergency" v-if="list.priority == 2">紧急</div>
                            <div class="task-status urgent" v-if="list.priority == 3">加急</div>
                        </div>
                        <div class="task-content">
                            <div class="brief">{{list.title}}</div>
                            <div class="task-info sys-flex sys-flex-center overhidden flex-justify-between">
                                <div class="task-create-user">{{list.task_user_name}}</div>
                                <div class="task-create-time">{{list.create_time | format}}</div>
                                <div class="task-type sys-flex-one not-beginning">{{list.status_show}}</div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>

        <div class="detail-wrap" :class="{'active' : contentShow}" v-if="contentDetail">
            <div class="detail-wrap-back" @click="hideContent()"></div>
            <div class="title">{{contentDetail.title}}</div>
            <div class="content-wrap sys-flex">
                <div class="info">
                    <div class="item sys-flex sys-flex-center">
                        <div class="item-title time">截止时间:</div>
                        <div class="sys-flex-one">{{contentDetail.end_time | format}}</div>
                    </div>
                    <div class="item sys-flex sys-flex-center">
                        <div class="item-title people">创建人:</div>
                        <div class="sys-flex-one">{{contentDetail.create_user_info.create_user_name}}</div>
                    </div>
                    <div class="item sys-flex sys-flex-center">
                        <div class="item-title people">执行人:</div>
                        <div class="sys-flex-one">{{contentDetail.create_user_info.task_user_name}}</div>
                    </div>
                     <div class="item sys-flex sys-flex-center">
                        <div class="item-title peoples">参与人:</div>
                        <div class="sys-flex sys-flex-one">
                            <div v-for="(v,k) in contentDetail.rule_members" :key="k">
                                {{v.member_name}} , 
                            </div>
                        </div>
                    </div>
                    <div class="item sys-flex sys-flex-center">
                        <div class="item-title progress">所属选题: </div>
                        <div class="sys-flex-one overhidden"> {{contentDetail.project_title}}</div>
                    </div>
                </div>
                <div class="info">
                    <div class="item sys-flex sys-flex-center">
                       <div class="item-title brief">任务动态:</div>
                    </div>
                    <div class="message">
                        <div class="message-list" v-for="(v,k) in contentDetail.message" :key="k">
                            {{v.content}}
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
    name: 'taskShow',
    data () {
        return {
            taskList : [],
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

            contentShow : false,
            contentDetail : null
        }
    },

    props : ['task-show'],

    watch : {
        taskShow(evt){
            if(!this.contentShow){
                this.show(JSON.parse(evt.data));
            }else{
                this.hide();
            }
        }
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
            return time.slice(5,10);  

        }
    },

    components: {
        swiper, 
        swiperSlide,
    },

    created () {
        this.getTaskList();
        setInterval(()=>{
            this.getTaskList();
        },'15000');
        
    },

    mounted(){},

    methods: {
        showContent( data , key ){
            if(window.control){
                var msg = {"type":"task","index":key};
                window.socketClient.send(JSON.stringify(msg));
            }
            this.show(data);
        },

        show(data){
            if(!data.text && !data.id) return;
            var id;
            if(data.text){
                var res = JSON.parse(data.text);
                id = this.list[res.index]['id'];
            }else{
                id = data.id;
            }
            this.$api.getTaskDetail(id).then((res)=>{
                this.contentDetail = res.data.data;
                setTimeout(()=>{
                    this.contentShow = true;
                },200)
            })
        },

        hideContent(){
            this.hide();
            if(window.control){
                var msg = {"type":"task"};
                window.socketClient.send(JSON.stringify(msg));
            }
        },

        hide(){
            this.contentShow = false;
            setTimeout(()=>{
                this.contentDetail = null;
            },200)
        },

        getTaskList(){
            this.$api.getTask(32).then((response)=>{
                if( !response.data.ErrorCode && response.data.data.task_arr.length){
                    this.list = response.data.data.task_arr;
                    this.taskList = this.split_array(response.data.data.task_arr , 8);
                }
            });
        },

        split_array(arr, len){    
            let a_len = arr.length;    
            let result = [];    
            for(let i=0;i<a_len;i+=len){        
                result.push(arr.slice(i,i+len));    
            }    
            return result;
        }
       
    }
}
</script>

<style lang="scss" scoped>
    .main-wrap{
        width:100%;
        height:33.3% !important; 
        padding: 0.1rem 0.16rem 0.1rem;
        position: relative;
        background: url('../../assets/img/task/bg.png') no-repeat center center;
        background-size: 100% 100%;
        .detail-wrap{
            position: fixed;
            width: 100%;
            height: 100%;
            top : -100%;
            left: 0;
            z-index: 9999;
            background: url('../../assets/img/clue/bg.png') no-repeat center center;
            background-size: 100% 100%;
            padding: 0.5rem 2rem;
            transition: top 0.2s ease-in;
            &.active{
                top : 0;
            }
            .detail-wrap-back{
                position: absolute;
                left: 0.5rem;
                top: 0.5rem;
                width: 0.8rem;
                height: 0.8rem;
                background: url('../../assets/img/back.png') no-repeat center center;
                background-size: 100% 100%;
            }
            .title{
                width: 100%;
                height: 0.9rem;
                color: #fff;
                font-size: 0.48rem;
                text-align: center;
                border-bottom: 0.02rem dotted #00fff0;
            }
            .content-wrap{
                width: 100%;
                height: calc(100% - 2rem);
                margin-top: 0.5rem;
                .info{
                    width: 9rem;
                    .message{
                        height: calc(100% - 1rem);
                        overflow-y: auto;
                        .message-list{
                            font-size: 0.32rem;
                            color: #fff;
                            margin-bottom: 0.2rem;
                            padding-left: 0.6rem;
                        }
                    }
                    .item{
                        color: #fff;
                        font-size: 0.32rem;
                        margin-bottom: 0.5rem;
                        .item-title{
                            width : 2rem;
                            padding-left: 0.6rem;
                            background: url('') no-repeat center left;
                            background-size: 0.35rem 0.35rem; 
                            &.time{
                                background-image: url('../../assets/img/project/time.png');
                            }
                            &.people{
                                background-image: url('../../assets/img/project/people.png');
                            }
                            &.peoples{
                                background-image: url('../../assets/img/project/peoples.png');
                            }
                            &.progress{
                                background-image: url('../../assets/img/project/progress.png');
                            }
                            &.brief{
                                background-image: url('../../assets/img/project/brief.png');
                            }
                            &.status_show{
                                padding-left: 1rem;
                                width : 2rem;
                                font-size: 0.24rem;
                            }
                        }
                    }
                }
            }
        }
        .task-wrap{
            width : 100%;
            height: 100%;
            padding: 0.5rem 0.4rem 0.3rem;
            background: url('../../assets/img/task/border.png') no-repeat center center;
            background-size: 100% 100%;
            .swiper-container{
                width: 100%;
                height: 100%;
                .swiper-wrapper{
                    height: 100%;
                }
            }
            .task-list{
                width : 24%;
                height : 48%;
                background:rgba(2,122,186,0.2);
                border : 0.01rem solid rgba(2, 122, 186, 0.5);
                margin-bottom: 0.15rem;
                &:not(:nth-of-type(4n)){
                    margin-right: 0.15rem;
                }
                .task-nav{
                    width: 100%;
                    height: 22%;
                    padding: 0 0.16rem;
                    background:rgba(9,44,111,1);
                    .project-title{
                        font-size:0.16rem;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(174,183,209,1);
                    }
                    .task-status{
                        width: 0.4rem;
                        height: 0.2rem;
                        line-height: 0.2rem;
                        border-radius:0.025rem;
                        text-align: center;
                        font-size: 0.15rem;
                        color: #fff;
                        &.normal{
                            background: RGBA(34, 115, 238, 1);
                        }
                        &.emergency{
                            background: RGBA(226, 118, 46, 1);
                        }
                        &.urgent{
                            background: RGBA(217, 67, 110, 1);
                        }
                    }
                }
                .task-content{
                    height: 80%;
                    padding: 0.1rem 0.16rem;
                    background:rgba(23,52,76,0);
                    .brief{
                        height: 0.5rem;
                        font-size: 0.18rem;
                        margin-bottom: 0.1rem;
                        font-weight:400;
                        color:#fff;
                        overflow: hidden;
                    }
                    .task-info{
                        // font-size: 0.15rem;
                        width: 100%;
                        .task-create-user{
                            // width: 18%;
                            font-size: 0.15rem;
                            padding-left: 0.2rem; 
                            color:#fff;
                            background: url('../../assets/img/task/user.png') no-repeat center left;
                            background-size:0.125rem 0.14rem;
                            margin-right: 0.15rem; 
                        }
                        .task-create-time{
                            font-size: 0.15rem;
                            padding-left: 0.2rem; 
                            color:#fff;
                            background: url('../../assets/img/task/time.png') no-repeat center left;
                            background-size:0.125rem 0.125rem;
                        }
                        .task-type{
                            font-size: 0.15rem;
                            text-align: right;
                            color: #fff;
                            font-family:Adobe Heiti Std R;
                            font-weight:normal;
                            &.not-beginning{
                                // color
                            }
                        }
                    }
                }
                
            }
        }
    }

</style>


