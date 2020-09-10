<template>
    <div class="sex-container sys-flex">
        <div class="sex" id="sex" ref='sex'>

        </div>
        <div class="sex-text sys-flex sys-flex-center sys-flex-wrap">
            <div class="sex-text-inner">
                <div class="sex-women">
                    女生:
                    <span class="sex-count">{{this.sexData.women}}</span>
                </div>
                <div class="sex-man">
                    男生:
                    <span class="sex-count">{{this.sexData.man}}</span>    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import echarts from 'echarts'
    export default {
        name:'sex-scale',
        data() {
            return {

            }
        },
        props:{
            sexData:Object
        },
        watch:{
            sexData:{
                immediate:true,
                handler(res){
                    //console.log(res)
                    if (this.myChart) {
                        this.myChart.setOption({
                            series : [{
                                data: [
                                    {name:'男生',value:this.sexData.man},
                                    {name:'女生',value:this.sexData.women}
                                    ]
                                }]
                            }
                        );
                    }
                }
            }
        },
        mounted() {
            this.initSexScale();
        },
        methods:{
            initSexScale() {
                const _this = this;
                _this.myChart = echarts.init(document.getElementById('sex'));
                _this.options = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    color:['#DB546C','#007DDE'],
                    series : [
                        {
                            name: '男女比例',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            center: ['50%', '50%'],
                            label: {
                                normal: {
                                    show: true,
                                    // formatter: '{b} \n {d}%',
                                    textStyle: {
                                        color:'#fff',
                                        fontSize: '12',
                                        fontWeight: 'bold'
                                    },
                                    position : 'inner',
                                },
                                emphasis: {
                                    show: true,
                                    // formatter: '{b} \n {d}%',
                                    textStyle: {
                                        color:'#fff',
                                        fontSize: '14',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    color:'#fff',
                                    length:15,
                                    length2:10,
                                    show: true
                                }
                            },
                            data:[
                                {name:'男生',value:this.sexData.man},
                                {name:'女生',value:this.sexData.women}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }
                _this.myChart.setOption(_this.options);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .sex-container{
        width: 100%;
        height: 100%;
        .sex{
            width: 50%;
            height: 100%;
        }
        .sex-text{
            width: 50%;
            font-size: 0.25rem;
            color:#fff;
            text-align: center;
            .sex-text-inner{
                width: 100%;
                .sex-women{
                    margin-bottom: 0.5rem;
                }
                .sex-count{
                    color:rgba(0,255,240,1);
                }
            }
        }
    }
</style>