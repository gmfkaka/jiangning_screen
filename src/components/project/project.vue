<template>
    <div class="main-wrap">
        <div class="project-wrap">
            <div class="project-list-wrap sys-flex sys-flex-wrap flex-justify-between">
                <div class="project-list sys-flex sys-flex-center flex-justify-between animated" v-for="(v,k) in projectList" :key="k" :class="{'flipInX' : v.title}" v-bind:style="{'animation-delay' : k/2+'s'}" @click="showContent(v,k)">
                    <div class="project-title overhidden">{{v.title}}</div>
                    <div class="project-user">{{v.project_user_name}}</div>
                    <div class="project-status">
                        {{v.status_show}}
                    </div>
                    <div class="project-progress sys-flex sys-flex-center">
                        <div class="progress-total">
                            <span class="progress" :class="{'on-progress' : v.status == 1 || v.status == 2 , 'on-stop' : v.status==4 , 'on-done' : v.status==3}" :style="{'width' : v.percent + '%'}"></span>
                        </div>
                        <div class="percent">{{Math.ceil(v.percent)}}%</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="detail-wrap" :class="{'active' : contentShow}" v-if="contentDetail">
            <div class="detail-wrap-back" @click="hideContent()"></div>
            <div class="title">{{contentDetail.title}}</div>
            <div class="content-wrap sys-flex">
                <div class="info">
                    <div class="item sys-flex sys-flex-center">
                        <div class="item-title time">时间:</div>
                        <div class="sys-flex-one">{{contentDetail.create_time | format}}</div>
                    </div>
                    <div class="item sys-flex sys-flex-center">
                        <div class="item-title people">负责人:</div>
                        <div class="sys-flex-one">{{contentDetail.project_user_name}}</div>
                    </div>
                    <div class="item sys-flex sys-flex-center">
                        <div class="item-title peoples">参与人:</div>
                        <div class="sys-flex sys-flex-one">
                            <div v-for="(v,k) in contentDetail.project_members" :key="k">
                                {{v.member_name}} ,
                            </div>
                        </div>
                    </div>
                    <div class="item sys-flex sys-flex-center">
                        <div class="item-title progress">选题进度:</div>
                    </div>
                    <div class="item sys-flex sys-flex-center">
                        <div class="item-title status_show">{{contentDetail.status_show}}</div>
                        <div class="project-progress sys-flex-one sys-flex sys-flex-center">
                            <div class="progress-total">
                                <span class="progress" :class="{'on-progress' : contentDetail.status == 1 || contentDetail.status == 2 , 'on-stop' : contentDetail.status==4 , 'on-done' : contentDetail.status==3}" :style="{'width' : contentDetail.percent + '%'}"></span>
                            </div>
                            <div class="percent">{{Math.ceil(contentDetail.percent)}}%</div>
                        </div>
                    </div>


                </div>
                <div class="info">
                    <div class="item sys-flex sys-flex-center">
                       <div class="item-title brief">描述:</div>
                    </div>
                    <div class="content" v-html="contentDetail.brief"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'project',
    data () {
        return {
            keyword : '',
            projectList : [],
            count : 0,
            current : 1,
            contentShow : false,
            contentDetail : null
        }
    },

    created () {
        this.getProjectList();
        setInterval(()=>{
          this.getProjectList();
        },15000);
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

    props : ['project-show'],

    watch : {
        projectShow(evt){
            if(!this.contentShow){
                this.show(JSON.parse(evt.data));
            }else{
                this.hide();
            }
        }
    },

    mounted(){
        // window.socketClient.onmessage = (evt) => {
        //     var res = JSON.parse(evt.data);
        //     console.log(res);
        //     if( res.text && JSON.parse(res.text).type == 'project' ){
        //         console.log(12);
        //         if(!this.contentShow){
        //             this.show(JSON.parse(evt.data));
        //         }else{
        //             this.hide();
        //         }
        //     }
        // }
    },

    methods: {

        showContent( data , key ){
            if(window.control){
                var msg = {"type":"project","index":key};
                window.socketClient.send(JSON.stringify(msg));
            }
            this.show(data);
        },

        show(data){
            if(!data.text && !data.id) return;
            var id,res;
            if(data.text){
                res = JSON.parse(data.text);
                id = this.projectList[res.index]['id'];
            }else{
                id = data.id;
            }
            this.$api.getProjectDetail(id).then((res)=>{
                this.contentDetail = res.data.data;
                setTimeout(()=>{
                    this.contentShow = true;
                },200)
            })
        },

        hideContent(){
            this.hide();
            if(window.control){
                var msg = {"type":"project"};
                window.socketClient.send(JSON.stringify(msg));
            }
        },

        hide(){
            this.contentShow = false;
            setTimeout(()=>{
                this.contentDetail = null;
            },200)
        },

        getProjectList(){
            this.projectList = [];
            this.$api.getProject(12,this.current).then((response)=>{
                if( !response.data.ErrorCode){
                    if (response.data.data.project_arr.length) {
                      this.projectList = response.data.data.project_arr;
                      this.current += 1;
                    } else {
                      this.current = 1;
                      this.getProjectList();
                    }
                }
            });
        },

        initList(){
            this.projectList = this.list.slice( this.count , this.count + 12 > this.list.length ? this.list.length : this.count + 12 );
            // this.count += 11;
            // this.countNum = setInterval(()=>{
            //     if ( this.count < this.list.length ) {
            //         this.projectList = [];
            //         setTimeout(() => {
            //             this.projectList = this.list.slice( this.count , this.count + 11 );
            //             this.count += 11;
            //         },100);
            //     } else {
            //         this.projectList = [];
            //         clearInterval(this.countNum);
            //         this.count = 0;
            //         this.getProjectList();
            //     }
            // },15000);
        },
    }
}
</script>

<style lang="scss" scoped>
    .main-wrap{
        width:100% ;
        height:33.3%  !important;
        padding: 0.1rem 0.16rem 0.1rem;
        background: url('../../assets/img/project/bg.png') no-repeat center center;
        background-size: 100% 100%;
        position: relative;
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
                .content{
                    font-size: 0.32rem;
                    color: #fff;
                    *{
                        color: #fff!important;
                    }
                }
                 .project-progress{
                    color : rgba(255,255,255,0.7);
                    font-size: 0.15rem;
                    text-align: center;
                    .progress-total{
                        width: 70%;
                        height: 0.2rem;
                        background: RGBA(68, 97, 115, 1);
                        border-radius:0.11rem;
                        overflow: hidden;
                        .progress{
                            display: block;
                            height: 100%;
                            border-radius: 0.5rem;
                            &.on-progress{
                                background: -webkit-linear-gradient(left,  #0272ff , #80bfff);
                                background: -o-linear-gradient(right,  #0272ff , #80bfff);
                                background: -moz-linear-gradient(right,  #0272ff , #80bfff);
                                background: linear-gradient(to right, #0272ff , #80bfff);
                            }
                            &.on-stop{
                                background:#ff3366;
                            }
                            &.on-done{
                                background: -webkit-linear-gradient(left,  #09de74 , #2ff6c5);
                                background: -o-linear-gradient(right,  #09de74 , #2ff6c5);
                                background: -moz-linear-gradient(right,  #09de74 , #2ff6c5);
                                background: linear-gradient(to right, #09de74 , #2ff6c5);
                            }
                        }
                    }
                    .percent{
                        line-height: 0.125rem;
                        font-size:0.24rem;
                        margin-left: 0.3rem;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(255,255,255,1);

                    }
                }
            }
        }
        .project-wrap{
            width : 100%;
            height: 100%;
            background: url('../../assets/img/project/border.png') no-repeat center center;
            background-size: 100% 100%;
            padding:0.5rem 0.4rem 0.3rem;
            .project-list-wrap{
                height: 100%;
            }
            .project-list{
                width: 48%;
                color : #fff;
                height: 17.5%;
                font-size: 0.64rem;
                font-family:PingFangSC-Regular;
                font-weight:400;
                .project-title{
                    width: 60%;
                    font-size: 0.2rem;
                }
                .project-status{
                    width: 10%;
                    text-align: center;
                    display: block;
                    margin : 0 auto;
                    text-align: center;
                    border-radius:0.08rem;
                    font-size:0.15rem;
                    color : rgba(255,255,255,0.7);
                    margin-right: 0.1rem;
                    // &.tongguo{
                    //     background:rgba(5,185,115,0.35);
                    //     border:1px solid rgba(0,255,156,1);
                    // }
                    // &.dahui{
                    //     background:rgba(246,31,66,0.35);
                    //     border:1px solid rgba(246,31,66,1);
                    // }
                }

                .project-user{
                    width: 10%;
                    text-align: left;
                    height:0.15rem;
                    line-height: 0.15rem;
                    font-size:0.15rem;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    margin-right: 0.1rem;
                    margin-left: 0.1rem;
                }
                .project-progress{
                    width: 30%;
                    color : rgba(255,255,255,0.7);
                    font-size: 0.15rem;
                    text-align: center;
                    .progress-total{
                        width: 70%;
                        height: 0.08rem;
                        background: RGBA(68, 97, 115, 1);
                        border-radius:0.11rem;
                        overflow: hidden;
                        .progress{
                            display: block;
                            height: 100%;
                            border-radius: 0.055rem;
                            &.on-progress{
                                background: -webkit-linear-gradient(left,  #0272ff , #80bfff);
                                background: -o-linear-gradient(right,  #0272ff , #80bfff);
                                background: -moz-linear-gradient(right,  #0272ff , #80bfff);
                                background: linear-gradient(to right, #0272ff , #80bfff);
                            }
                            &.on-stop{
                                background:#ff3366;
                            }
                            &.on-done{
                                background: -webkit-linear-gradient(left,  #09de74 , #2ff6c5);
                                background: -o-linear-gradient(right,  #09de74 , #2ff6c5);
                                background: -moz-linear-gradient(right,  #09de74 , #2ff6c5);
                                background: linear-gradient(to right, #09de74 , #2ff6c5);
                            }
                        }
                    }
                    .percent{
                        line-height: 0.125rem;
                        font-size:0.15rem;
                        margin-left: 0.1rem;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(255,255,255,1);

                    }
                }
            }
        }
    }
</style>
