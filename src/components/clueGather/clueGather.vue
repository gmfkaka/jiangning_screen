<template>
    <div class="main-wrap">
        <div class="sys-flex clue-wrap">
            <div class="sys-flex-one clue-list-wrap sys-flex-center">
                <div class="clue-list-title sys-flex flex-justify-between">
                    <div class="clue-type">微信</div>
                    <div class="clue-count">共{{this.weixinTotal}}条</div>
                </div>
                <div class="clue-list sys-flex sys-flex-center animated flex-justify-between" v-for="(v,k) in weixinList" :key="k" :class="{'flipInX' : v.title}" v-bind:style="{'animation-delay' : k/2+'s'}" @click="showContent(v)">
                    <div class="clue-title overhidden">{{v.title}}</div>
                    <div class="resource overhidden">{{v.source}}</div>
                    <div class="time overhidden" v-if="v.publishTime">{{v.publishTime.slice(5,10)}}</div>
                </div>
            </div>
            <div class="sys-flex-one clue-list-wrap sys-flex-center">
                <div class="clue-list-title sys-flex flex-justify-between">
                    <div class="clue-type clue-web">网站</div>
                    <div class="clue-count">共{{this.internetTotal}}条</div>
                </div>
                <div class="clue-list sys-flex sys-flex-center animated flex-justify-between" v-for="(v,k) in internetList" :key="k" :class="{'flipInX' : v.title}" v-bind:style="{'animation-delay' : k/2+'s'}" @click="showContent(v)">
                    <div class="clue-title overhidden">{{v.title}}</div>
                    <div class="resource overhidden">{{v.source}}</div>
                    <div class="time overhidden" v-if="v.date">{{v.date.slice(5,10)}}</div>
                </div>
            </div>
        </div>

        <div class="detail-wrap" :class="{'active' : contentShow}" v-if="contentShow">
            <div class="detail-wrap-back" @click="hideContent()"></div>
            <div class="title">{{contentDetail.title}}</div>
            <div class="content-wrap" >
                <img v-if="contentDetail.pic && contentDetail.pic.length" :src="contentDetail.pic[0]" />
                <!-- <img v-if="contentDetail.images && contentDetail.images.length" :src="contentDetail.images[0].imageUrl" /> -->
                <div v-html="contentDetail.content"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'clueGather',
    data () {
        return {
            internetPage : 1,
            winxinPage : 1,
            currentIndex : 'website_news',
            currentIndex1 : 'wechatnews',
            internetList : [],
            internetTotal:0,
            weixinList : [],
            weixinTotal : 0,
            contentShow : false,
            contentDetail : null
        }
    },
    components: {
    },

    created () {
        this.getWebList();
        this.getWeixinList();
        setInterval(()=>{
            // this.internetPage +=1;
            // this.winxinPage += 1;
            this.getWebList();
            this.getWeixinList();
            // if( this.internetPage >= 5){
            //     this.winxinPage = 0;
            // }
            // if( this.winxinPage >= 5){
            //     this.winxinPage = 0;
            // }
        },15000);
    },

    props : ['clue-show'],

    watch : {
        clueShow(evt){
            if(!this.contentShow){
                this.show(JSON.parse(evt.data),0);
            }else{
                this.hide();
            }
        }
    },

    methods: {

        showContent( data ){
            if(window.control){
                let msg = {"type":"clue","content":data};
                window.socketClient.send(JSON.stringify(msg));
            }
            this.show(data,1);
        },

        show(data,bool){

            if( bool ){
                this.contentDetail = data;
            }else{
                this.contentDetail = JSON.parse(data.text).content;
            }
            if(this.contentDetail.pic && this.contentDetail.pic.length ){
                this.contentDetail.pic = (this.contentDetail.pic).split(',');
            }
            setTimeout(()=>{
                this.contentShow = true;
            },200)
        },

        hideContent(){
            this.hide();
            if(window.control){
                let msg = {"type":"clue"};
                window.socketClient.send(JSON.stringify(msg));
            }
        },

        hide(){
            this.contentShow = false;
            setTimeout(()=>{
                this.contentDetail = null;
            },200)
        },

        getWebList(){
            this.$api.getClueList('website' , this.internetPage , 5).then((response)=>{
                this.internetList = [];
                setTimeout(()=>{
                    if( response.data.error_code == '0' && response.data.result ){
                        let res = response.data.result.data;
                        let total = response.data.result.total;
                        this.internetList = res;
                        this.internetTotal = total;
                        if( this.internetPage  == Math.ceil(total/5) || this.internetPage >= 5 ){
                            this.internetPage = 1;
                        }else{
                            this.internetPage += 1;
                        }
                    }
                },100);
            });
        },

        getWeixinList(){
            this.$api.getClueList('wechat' , this.winxinPage , 5).then((response)=>{
                this.weixinList = [];
                setTimeout(()=>{
                    if( response.data.error_code == '0' && response.data.result ){
                        let res = response.data.result.data;
                        let total = response.data.result.total;
                        this.weixinList = res;
                        this.weixinTotal = total;
                        if( this.winxinPage  == Math.ceil(total/5) ||  this.winxinPage >= 5){
                            this.winxinPage = 1;
                        }else{
                            this.winxinPage +=1;
                        }
                    }
                },100);
            });
        },
    }
}
</script>

<style lang="scss" scoped>
    .main-wrap{
        width:100%;
        height:33.3%  !important;
        padding: 0.1rem 0.16rem 0.1rem;
        position: relative;
        background: url('../../assets/img/clue/bg.png') no-repeat center center;
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
                min-height: 0.9rem;
                color: #fff;
                font-size: 0.48rem;
                text-align: center;
                border-bottom: 0.02rem dotted #00fff0;
            }
            .content-wrap{
                width: 100%;
                height: calc(100% - 2rem);
                margin-top: 0.25rem;
                color: #fff;
                font-size: 0.32rem;
                text-align: justify;
                overflow-y: auto;
                .info{
                    width: 6rem;
                }
                img{
                    display: block;
                    margin : 0 auto;
                    max-width: 100%;
                }
            }
        }
        .clue-wrap{
            width : 100%;
            height: 100%;
            padding: 0.5rem 0.4rem 0.3rem;
            background: url('../../assets/img/clue/border.png') no-repeat center center;
            background-size: 100% 100%;
            .clue-list-wrap{
                width:50%;
                overflow: hidden;
                &:first-child{
                    margin-right: 0.7rem;
                }
                .clue-list-title{
                    color:#fff;
                    font-size: 0.2rem;
                    margin-bottom: 0.1rem;
                    .clue-type{
                        &.clue-web{
                            background: url('../../assets/img/clue/web.png') no-repeat center left;
                            padding-left: 0.35rem;
                            background-size: 0.23rem 0.2rem;
                        }
                        background: url('../../assets/img/clue/wechat.png') no-repeat center left;
                        padding-left: 0.35rem;
                        background-size: 0.25rem 0.21rem;
                    }
                }
                .clue-list{
                    width : 100%;
                    height: 18%;
                    .clue-title{
                        font-size: 0.2rem;
                        color:#fff;
                        width: 70%;
                    }
                    .resource{
                        color:rgba(0,246,255,1);
                        font-size: 0.15rem;
                        width: 20%;
                        text-align: right;
                    }
                    .time{
                        color:rgba(0,246,255,1);
                        font-size: 0.15rem;
                        width: 10%;
                        text-align: right;
                    }
                }
            }
        }
    }
</style>
