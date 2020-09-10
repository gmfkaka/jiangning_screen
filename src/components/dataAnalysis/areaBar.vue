<template>
    <div class="area-bar" ref="areaBar">

    </div>
</template>
<script>
    import echarts from 'echarts'
    export default {
        name:'area-bar',
        data() {
            return {

            }
        },
        props:{
            areaBarData:Array
        },
        watch:{
            areaBarData:{
                immediate:true,
                handler(res){
                    this.dataFormat = this.initAreaBarData(res);
                    if (this.myChart) {
                        this.myChart.setOption({
                                yAxis:{
                                    data: this.dataFormat.yAxisArr
                                },
                                series : [{
                                    data: this.dataFormat.seriesArr
                                }]
                            }
                        );
                    }
                }
            }
        },
        mounted() {
            this.initAreaBar();
        },
        methods:{
            initAreaBarData(data) {
                if(data){
                    var seriesArr=[],yAxisArr=[];
                    data.forEach((value) => {
                        yAxisArr.push(value.city);
                        seriesArr.push(parseInt(value.count));
                    });
                    return {
                        seriesArr,
                        yAxisArr
                    }
                }
            },
            initAreaBar() {
                const _this = this;
                _this.myChart = echarts.init(_this.$refs.areaBar);
                _this.options = {
                    title: {
                        text: '',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '6%',
                        bottom: '3%',
                        top:10,
                        containLabel: true
                    },
                    xAxis: {
                        show:false
                    },
                    yAxis: {
                        type: 'category',
                        axisLine:{
                            lineStyle:{
                                width:'0'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        data: []
                    },
                    textStyle:{
                        color:'#fff'
                    },
                    label:{
                        normal:{
                            show: true,
                            position: 'right'
                        },
                        emphasis:{
                            show: true,
                            position: 'right'
                        }
                    },
                    // barWidth:60,
                    series: [
                        {
                            name: '区域分布',
                            type: 'bar',
                            barMaxWidth:15,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 1, 0,
                                        [
                                            {offset: 0, color: '#83bff6'},
                                            {offset: 0.5, color: '#188df0'},
                                            {offset: 1, color: '#188df0'}
                                        ]
                                    )
                                },
                                emphasis: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 1, 0,
                                        [
                                            {offset: 0, color: '#2378f7'},
                                            {offset: 0.7, color: '#2378f7'},
                                            {offset: 1, color: '#83bff6'}
                                        ]
                                    )
                                }
                            },
                            data: [],
                            barGap:'100%'
                        }
                    ]
                }
                _this.myChart.setOption(_this.options);
            }
        }
    }
</script>
<style>
    .area-bar{
        width: 100%;
        height: 50%;
    }
</style>