<template>
    <div class="age" ref='age'>

    </div>
</template>
<script>
    import echarts from 'echarts'
    export default {
        name:'age',
        data() {
            return {

            }
        },
        props:{
            ageData:Array
        },
        watch:{
            ageData:{
                immediate:true,
                handler(res){
                    this.dataFormat = res;
                    if(this.myChart) {
                        this.myChart.setOption({
                            xAxis:{
                                data:this.dataFormat.xAxisArr
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
            this.initAgeDistribute();
        },
        methods:{
            initAgeData(data) {
                var seriesArr=[],xAxisArr=[];
                data.forEach((value) => {
                    xAxisArr.push(value.age);
                    seriesArr.push(parseInt(value.rate*100));
                });
                return {
                    seriesArr,
                    xAxisArr
                }
            },
            initAgeDistribute() {
                const _this = this;
                _this.myChart = echarts.init(_this.$refs.age);
                _this.option = {
                    color: ['#4DA2FE'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            
                            type : 'shadow'   
                        }
                    },
                    grid: {
                        left: '8%',
                        right: '4%',
                        bottom: '8%',
                        top:30,
                        containLabel: true
                    },
                    textStyle:{
                        color:'#fff'
                    },
                    xAxis : [
                        {
                            type : 'category',
                            axisTick: {
                                show:false,
                                alignWithLabel: true
                            },
                            axisLine:{
                                lineStyle:{
                                    color: ['#71a4f2'],
                                    width:'1',
                                    type:'solid'
                                }
                            },
                            data : this.dataFormat.xAxisArr
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLabel : {
                                interval:15,
                                formatter: '{value}%',
                                textStyle: {
                                    // fontSize:'13'
                                }
                            },
                            axisTick: {
                                show:false,
                                // interval:15,
                                alignWithLabel: true
                            },
                            color:'#fff',
                            axisLine:{

                                lineStyle:{
                                    // show:false,
                                    color: ['#71a4f2'],
                                    width:'1',
                                    type:'solid'
                                }
                            },
                            splitLine:{
                                // interval:15,
                                lineStyle:{
                                    color: ['rgba(113,164,242,0.1)'],
                                    width:'1',
                                    type:'solid'
                                }
                            },
                            axisPointer:{
                                show:true
                            }
                        }

                    ],
                    series : [
                        {
                            name:'年龄层次',
                            type:'bar',
                            barWidth: '50%',
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        position: 'top',
                                        formatter: '{c}%'
                                    }
                                }
                            },
                            data:this.dataFormat.seriesArr
                        }
                    ]
                };
                _this.myChart.setOption(_this.option);
            }

        }
    }
</script>
<style>
    .age{
        width: 100%;
        height: 100%;
    }
</style>