<template>
    <div id="emotion" class="emotion">

    </div>
</template>
<script>
    import echarts from 'echarts'
    export default {
        name:'emotion-scale',
        data() {
            return {

            }
        },
        props:{
            emotionData:Array
        },
        watch:{
            emotionData:{
                immediate:true,
                handler(res){
                    if (this.myChart) {
                        if(this.emotionData.length>2){
                            this.myChart.setOption({
                                series : [{
                                    data: [
                                        {name:'正面',value:this.emotionData[0].sum_iCount},
                                        {name:'中立',value:this.emotionData[1].sum_iCount},
                                        {name:'负面',value:this.emotionData[2].sum_iCount}
                                    ]
                                }]
                            });
                        }else{
                            this.myChart.setOption({
                                series : [{
                                    data: [
                                        {name:'正面',value:this.emotionData[0].sum_iCount},
                                        {name:'中立',value:this.emotionData[1].sum_iCount}
                                    ]
                                }]
                            });
                        }
                    }
                }
            }
        },
        mounted() {
            this.initEmotionScale();
        },
        methods:{
            initEmotionScale() {
                const _this = this;
                _this.myChart = echarts.init(document.getElementById('emotion'));
                _this.options = {
                    color:['#DB546C','#F69420','#007DDE'],
                    // legend: {
                    //     orient: 'horizontal',
                    //     data:['正面','负面','中立'],
                    //     textStyle:{
                    //         color:'#fff'
                    //     }
                    // },
                    series : [
                        {
                            name: '情感分析',
                            type: 'pie',
                            radius : ['60%','80%'],
                            center: ['50%', '55%'],
                            label: {
                                normal: {
                                    show: true,
                                    formatter: '{b} \n {d}%',
                                    textStyle: {
                                        color:'#fff',
                                        fontSize: '12',
                                        fontWeight: 'bold'
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    formatter: '{b} \n {d}%',
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
                            data:[ ],
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
<style>
    .emotion{
        width: 100%;
        height: 100%;
    }
</style>