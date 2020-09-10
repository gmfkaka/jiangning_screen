<template>
    <div class="main-wrap">
        <div class="click-wrap">
            <div class="text">月工作量排名</div>
            <div class="click-title overhidden">
                <div class="click-list-wrap sys-flex sys-flex-wrap">
                    <div class="work-list sys-flex animated" v-for="(item,k) in reportList" :key="k" :class="{'flipInX' : item.name}" v-bind:style="{'animation-delay' : k/2+'s'}">
                        <div class="avatar">
                            <img :src="item.avatar.host+item.avatar.filepath+item.avatar.filename" alt="">
                            <div class="rank-icon rank1" v-if="item.id == 0">NO.1</div>
                            <div class="rank-icon rank2" v-if="item.id == 1">NO.2</div>
                            <div class="rank-icon rank3" v-if="item.id == 2">NO.3</div>
                            <div class="rank-icon others" v-if="item.id > 2">NO.{{item.id+1}}</div>
                        </div>
                        <div class="user-info">
                            <div class="user-name">{{item.name}}</div>
                            <div class="user-position">{{item.username}}</div>
                        </div>
                        <!-- <div class="total">总数：{{item.create}}</div> -->
                        <div class="tiaoshu ">
                            <div class="zong">{{item.publish}}<span>条</span></div>
                            <div class="dahui">已打回：{{item.revoke}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'workRank',
    data () {
        return {
            reportList:[],
            count : 0,
        }
    },

    created () {
        this.getReportList();
    },

    methods: {
        getReportList(){
            if(this.countNum){
                this.reportList = [];
                clearInterval(this.countNum);
                this.count = 0;
            }
            this.$api.getWorkRank().then((response)=>{
                // console.log(response)
                if(response.data.result.length){
                    this.list = response.data.result;
                    this.list.forEach((element,index) => {
                        element.id = index
                    });
                    this.initList();
                }
            });
        },

        initList(){
            this.reportList = this.list.slice( this.count , this.count + 8 > this.list.length ? this.list.length : this.count + 8 );
            this.count += 8;
            this.countNum = setInterval(()=>{
                if ( this.count < this.list.length ) {
                    this.reportList = [];
                    setTimeout(() => {
                        this.reportList = this.list.slice( this.count , this.count + 8 );
                        this.count += 8;
                    },100);
                } else {
                    this.reportList = [];
                    clearInterval(this.countNum);
                    this.count = 0;
                    this.getReportList();
                }
            },15000);
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
            }
            .click-list-wrap{
                margin-top: 1.8rem;
                width: 100%;
                height: 8.8rem;
                flex-direction: column;
                .work-list{
                    width: 49%;
                    height: 23%;
                    margin-bottom: 0.1rem;
                    padding: 0.3rem;
                    background: url('../../assets/img/workRank/paiming_bg.png') no-repeat top center;
                    background-size: 100% 100%;
                    position: relative;
                    .avatar{
                        width: 1.2rem;
                        height: 1.2rem;
                        border-radius: 50%;
                        position: absolute;
                        top: 0.3rem;
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                        .rank-icon{
                            width: 1.4rem;
                            height: 0.48rem;
                            line-height: 0.55rem;
                            text-align: center;
                            position: absolute;
                            bottom: -0.1rem;
                            left: -0.1rem;
                            font-size: 0.2rem;
                            font-weight: 600;
                            &.rank1{
                                background: url('../../assets/img/workRank/number_1.png') no-repeat center center;
                                background-size: 100% 100%;
                            }
                            &.rank2{
                                background: url('../../assets/img/workRank/number_2.png') no-repeat center center;
                                background-size: 100% 100%;
                            }
                            &.rank3{
                                background: url('../../assets/img/workRank/number_3.png') no-repeat center center;
                                background-size: 100% 100%;
                            }
                            &.others{
                                background: url('../../assets/img/workRank/number_00.png') no-repeat center center;
                                background-size: 100% 100%;
                            }
                        }
                    }
                    .user-info{
                        width: 5rem;
                        color:#fff;
                        font-size: 0.36rem;
                        padding-left: 1.8rem;
                        .user-position{
                            font-size: 0.24rem;
                            padding-top: 0.38rem;
                        }
                    }
                    .total{
                        font-size: 0.24rem;
                        color:#fff;
                        padding-top: 0.9rem;
                    }
                    .tiaoshu{
                        padding-left: 1rem;
                        padding-top: 0.1rem;
                        .zong{
                            color:rgba(80,230,243,1);
                            font-size: 0.6rem;
                            span{
                                font-size: 0.3rem;
                            }
                        }
                        .dahui{
                            font-size: 0.24rem;
                            color:rgba(242,59,93,1);
                            padding-left: 0.1rem;
                        }
                    }
                }
            }
        }
    }
</style>
