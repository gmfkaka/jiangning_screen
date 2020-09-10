<template>
    <div class="main-wrap">
        <div class="click-wrap">
            <div class="text">月工作量统计</div>
            <div class="click-title overhidden">
                <div class="work-charts" ref="work"></div>
            </div>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'workCharts',
    data () {
        return {
            userName:[],
            userData:[]
        }
    },

    created () {
        this.getData()
        // setInterval(()=>{
        //     this.getData()
        // },60000)
    },

    mounted(){
        this.initCharts()
    },

    watch:{
        userName:{
            immediate:true,
            handler(res){
                if (this.myChart) {
                    this.myChart.setOption({
                            xAxis:{
                                data: this.userName
                            },
                        }
                    );
                }
            }
        },
        userData:{
            immediate:true,
            handler(res){
                if (this.myChart) {
                    this.myChart.setOption({
                            series:[{
                                data: this.userData
                            }]
                        }
                    );
                }
            }
        }
    },

    methods: {
        getData(){
            this.userName = []
            this.userData = []
            setTimeout(()=>{
                this.$api.getWorkChart().then((response)=>{
                    if(response.data.result.length){
                        // console.log(response.data)
                        this.dataList = response.data.result
                        response.data.result.forEach(element => {
                            this.userName.push(element.user_name)
                            this.userData.push(element.publish)
                        });
                        // console.log(this.userName)
                        // console.log(this.userData)
                    }
                    // console.log(response)
                })
            },100)
        },

        initCharts(){
                // console.log(this.userName)
                const _this = this;
                _this.myChart = echarts.init(this.$refs.work);
                _this.options = {
                     xAxis: {
                        type: 'category',
                        data: _this.userName,
                        splitLine:{show: false},
                        nameGap:100,
                        axisLabel: {
                            show: true,
                            margin:20,
                            textStyle: {
                                color: '#fff',
                                fontSize:20
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        splitLine:{show: false},
                        nameGap:30,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize:20
                            }
                        },
                    },
                    series: [{
                        // data: [500,712,840,543,578,432,640,165],
                        data:_this.userData,
                        type: 'bar',
                        barWidth : 50,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: "#197397" // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: "#3effef" // 100% 处的颜色
                                }], false),
                                label: {
									show: true, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										color: '#fff',
										fontSize: 30
									}
								}
                            }
                        }
                    }]
                }
                _this.myChart.setOption(_this.options);
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
                .work-charts{
                    height: 9rem;
                    margin-top: 1.3rem;
                    // border:1px solid red;
                }
            }
        }
    }
</style>
