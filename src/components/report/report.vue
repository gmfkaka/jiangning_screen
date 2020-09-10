<template>
    <div class="main-wrap">
        <!-- <search @search="search"></search> -->
        <div class="report-wrap">
            <div class="today-report sys-flex sys-flex-center">
                今日报题
                <span>{{todayReportNum}}</span>
                篇 , 通过
                <span>{{todayAuditReportNum}}</span>
                篇。
            </div>
            <div class="report-list-wrap">
                <div class="report-list sys-flex sys-flex-center animated" v-for="(v,k) in reportList" :key="k" :class="{'fadeInLeft' : v.title}" v-bind:style="{'animation-delay' : k/2+'s'}" @click="showContent(v,k)">
                    <div class="report-status">
                        <span v-if="v.audit_status==2" class="reject"></span>
                        <span v-if="v.audit_status==1" class="pass"></span>
                        <span v-if="v.audit_status==0" class="review"></span>
                        <span v-if="v.audit_status==4" class="baoshen"></span>
                    </div>
                    <div class="report-title overhidden">{{v.title}}</div>
                    <div class="report-user">{{v.project_user_name}}</div>
                    <div class="report-time">{{v.create_time | format}}</div>
                </div>
            </div>
            <div class="pagination-wrap">
                <div v-if="controlplay">
                    <div class="pause" @click="autoplaylist" v-if="autoplay">暂停</div>
                    <div class="pause" @click="autoplaylist" v-if="!autoplay">自动</div>
                </div>
                <pagination :currrent.sync="current" :nums.sync="nums" @goToPage="goToPage"></pagination>
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
                    <!-- <div class="item sys-flex sys-flex-center">
                        <div class="item-title progress">选题进度:</div>
                    </div>
                    <div class="item sys-flex sys-flex-center">
                        <div class="item-title status_show">{{contentDetail.status_show}}</div>
                        <div class="project-progress sys-flex-one sys-flex sys-flex-center">
                            <div class="progress-total">
                                <span class="progress" :class="{'on-progress' : contentDetail.status == 1 || contentDetail.status == 2 , 'on-stop' : contentDetail.status==4 , 'on-done' : contentDetail.status==3}" :style="{'width' : contentDetail.percent + '%'}"></span>
                            </div>
                            <div class="percent">{{contentDetail.percent}}%</div>
                        </div>
                    </div>
                    -->
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
import pagination from '../common/pagination'
export default {
    name: 'report',
    data () {
        return {
            keyword : '',
            reportList : [],
            todayReportNum : 0,
            todayAuditReportNum : 0,
            count : 0,
            current : 1,
            nums : 0,
            contentShow : false,
            contentDetail : null,
            autoplay : true,
            controlplay : false
        }
    },

    components : {
        pagination
    },
    
    created () {
        this.getReportList();
        this.getTodayReportNum();
        setInterval(()=>{
            this.getTodayReportNum();
        },'15000');
        this.play();
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
            var time = y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
            return time.slice(5,10);

        }
    },

    props : ['report-show','auto-play'],

    watch : {
        reportShow(evt){
            if(!this.contentShow){
                this.show(JSON.parse(evt.data));
            }else{
                this.hide();
            }
        },
        current(page){
            this.current = page;
            this.getReportList();
        },
        autoPlay(res){
            if(!window.control){
                this.autoplaylist();
            }
        }
    },

    mounted(){
        let serach = window.location.href.split('?')[1];
        window.control = serach && serach.indexOf('control') != -1;
        if(window.control){
           this.controlplay =  true;
        }
    },

    methods: {

        play(){
             this.getCount = setInterval(()=>{
                this.current +=1;
            },'15000');
        },

        autoplaylist(){
            if(this.autoplay){
                this.autoplay = false;
                clearInterval(this.getCount);
            }else{
                this.autoplay = true;
                this.current +=1;
                this.play();
            }
            if(window.control){
                var msg = {"type":"reportAutoPlay","autoplay":this.autoplay};
                window.socketClient.send(JSON.stringify(msg));
            }
        },

        showContent( data , key ){
            if(window.control){
                var msg = {"type":"report","index":key};
                window.socketClient.send(JSON.stringify(msg));
            }
            this.show(data);
        },

        show(data){
            if(!data.text && !data.id) return;
            var id,res;
            if(data.text){
                res = JSON.parse(data.text);
                id = this.reportList[res.index]['id'];
            }else{
                id = data.id;
            }
            this.$api.getReportDetail(id).then((res)=>{
                this.contentDetail = res.data.data;
                setTimeout(()=>{
                    this.contentShow = true;
                },200)
            })
        },

        hideContent(){
            this.hide();
            if(window.control){
                var msg = {"type":"report"};
                window.socketClient.send(JSON.stringify(msg));
            }
        },

        hide(){
            this.contentShow = false;
            setTimeout(()=>{
                this.contentDetail = null;
            },200)
        },

        goToPage: function (page) {
            this.current = page;
            
        },

        getTodayReportNum(){
            this.$api.getTodayReportNum().then((response)=>{
                if( !response.data.ErrorCode ){
                    this.todayReportNum = response.data.data.data;
                    this.todayAuditReportNum = response.data.data.audit_data;
                }
            }); 
        },

        getReportList(){
            this.reportList = [];
            this.$api.getReport(10,this.current).then((response)=>{
                setTimeout(()=>{
                    if( !response.data.ErrorCode && response.data.data.report_arr.length){
                        this.reportList = response.data.data.report_arr;
                        this.nums = JSON.parse(response.data.data.total);
                        if(this.current == Math.ceil(response.data.data.total/10)){
                            setTimeout(()=>{
                                this.current = 1;
                            },'15000');
                        }
                    }
                },200);
            });
        },

        // initList(){
        //     this.reportList = this.list.slice( this.count , this.count + 10 > this.list.length ? this.list.length : this.count + 10 );
        //     this.count += 10;
        //     this.countNum = setInterval(()=>{
        //         if ( this.count < this.list.length ) {
        //             this.reportList = [];
        //             setTimeout(() => {
        //                 this.reportList = this.list.slice( this.count , this.count + 10 );
        //                 this.count += 10;
        //             },100);
        //         } else {
        //             this.reportList = [];
        //             clearInterval(this.countNum);
        //             this.count = 0;
        //             this.getReportList();
        //         }
        //     },15000);
        // },
               
    }
}
</script>

<style lang="scss" scoped>
    .main-wrap{
        width:100%;
        height:66.7% !important;
        padding: 0.1rem 0.26rem;
        position: relative;
        background: url('../../assets/img/report/bg.png') no-repeat center center;
        background-size: 100% 100%;
        .pause{
            font-size:0.32rem;
            color: #fff;
            width: 1rem;
            position: absolute; 
        }
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
        .report-wrap{
            width : 100%;
            height: 100%;
            padding: 0.4rem;
            background: url('../../assets/img/report/border.png') no-repeat center center;
            .today-report{
                color: #fff;
                font-size: 0.2rem;
                span{
                    display: block;
                    font-size: 0.24rem;
                    color: #00f6ff;
                    font-weight: bold;
                    margin: 0 0.05rem;
                }
            }
            .report-list-wrap{
                height: 90%;
            }
            .pagination-wrap{
                margin-top: 0.1rem;
            }
            background-size: 100% 100%;
            .report-list{
                color : #fff;
                width: 100%;
                height: 10%;
                font-size: 0.1rem;
                .report-status{
                    width: 0.5rem;
                    height: 0.2rem;
                    text-align: center;
                    span{
                        display: block;
                        margin : 0 auto;
                        width:100%;
                        height:100%;
                        line-height: 100%;
                        text-align: center;
                        border-radius:0.025rem;
                        &.pass{
                            background: url('../../assets/img/report/pass.png') no-repeat center center;
                            background-size: 100% 100%;
                        }
                        &.reject{
                            background: url('../../assets/img/report/reject.png') no-repeat center center;
                            background-size: 100% 100%;
                        }
                        &.review{
                            background: url('../../assets/img/report/review.png') no-repeat center center;
                            background-size: 100% 100%;
                        }
                        &.baoshen{
                            background: url('../../assets/img/report/baoshen.png') no-repeat center center;
                            background-size: 100% 100%;
                        }
                    }
                }
                .report-title{
                    flex: 1;
                    font-size: 0.2rem;
                    margin-left: 0.1rem;
                }
                .report-user{
                    width: 10%;
                    margin-right: 0.1rem;
                    font-size: 0.15rem;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(0,246,255,1);
                }
                .report-time{
                    font-size: 0.15rem;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(0,246,255,1);
                }
            }
        }
    }
</style>