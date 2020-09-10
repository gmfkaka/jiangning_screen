<template>
    <div class="main-wrap">
        <div class="sys-flex statics-wrap sys-flex sys-flex-center flex-justify-center">
            <chart :options="options" class="summary"></chart>
        </div>
    </div>
</template>

<script>
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import "echarts/lib/component/legend"
import "echarts/lib/component/tooltip"
import "echarts/lib/component/toolbox"
export default {
    name: 'contentData',
    data () {
        return {
            options:{  
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data:['文稿','图集','视频','专题'],
                    icon:'circle',
                    width : 'auto',
                    itemWidth : 10,
                    itemGap: 5,
                    textStyle:{
                        color:'#fff',
                        fontSize:8
                    },
                    right:0
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top : '15%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : true,
                        data : [],
                        axisLine:{
                            lineStyle:{
                                color:"#fff"
                            }
                        },
                        nameTextStyle:{
                            fontSize:20
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            color: '#fff',
                            fontSize: 8
                        },
                    }
                ],
                yAxis: [{
                        type: 'value',
                        gridIndex: 0,
                        splitLine: {
                            show: true,
                            lineStyle : {
                                width : 0.5,
                                opacity : 0.5,
                                type : 'dashed',
                                color: '#4A6AA8'
                            }
                            
                        },
                        axisLabel: {
                            color: '#fff',
                            fontSize: 8,
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#4A6AA8'
                            }
                        },
                    }
                ],
                series : [
                    {
                        name:'文稿',
                        type:'line',
                        areaStyle: {},
                        itemStyle: {
                            normal: {
                                color: "#0541ff",
                                lineStyle: {
                                    color: "#0541ff"
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: 'white'
                                    }
                                }
                            }
                        },
                        data:[]
                    },
                    {
                        name:'图集',
                        type:'line',
                        areaStyle: {normal: {}},
                        color:['#4c1889'],
                        itemStyle : {
                            label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: 'white'
                                    }
                                }
                        },
                        data:[]
                    },
                    {
                        name:'视频',
                        type:'line',
                        areaStyle: {normal: {}},
                        color:['#11556c'],
                        itemStyle : {
                            label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: 'white'
                                    }
                                }
                        },
                        data:[]
                    },
                    {
                        name:'专题',
                        type:'line',
                        areaStyle: {normal: {}},
                        color:['#00f6ff'],
                        itemStyle : {
                            label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: 'white'
                                    }
                                }
                        },
                        data:[]
                    }
                ]
            }
        }
    },
    components: {
        chart:echarts
    },

    created () {
        this.initChart();
        setInterval(()=>{
            this.initChart();
        },15000)
    },

    mounted(){

    },

    methods: {

        initChart(){
            this.getContentSta('topic');
            this.getContentSta('article');
            this.getContentSta('video');
            this.getContentSta('gallery');
        },

        getContentSta( type ){
            this.$api.getContentSta(type).then((res)=>{
                if( type == 'article'){
                    this.options.xAxis[0].data = [];
                    this.options.series[0].data = [];
                    for(let i=0;i<res.data.result.length;i++){
                        this.options.xAxis[0].data.push(res.data.result[i]['time'].slice(5,10));
                        this.options.series[0].data.push(res.data.result[i]['create']);
                    }
                }else if(type == 'gallery'){
                    this.options.series[1].data = [];
                    for(let i=0;i<res.data.result.length;i++){
                        this.options.series[1].data.push(res.data.result[i]['create']);
                    }
                }else if(type == 'video'){
                    this.options.series[2].data = [];
                    for(let i=0;i<res.data.result.length;i++){
                        this.options.series[2].data.push(res.data.result[i]['create']);
                    }
                }else if(type == 'topic'){
                    this.options.series[3].data = [];
                    for(let i=0;i<res.data.result.length;i++){
                        this.options.series[3].data.push(res.data.result[i]['create']);
                    }
                }
            })
        },
        
    }
}
</script>

<style lang="scss" scoped>
    .main-wrap{
        width:100%;
        height:33.3% !important;
        padding: 0.1rem 0.25rem 0.1rem;
        position: relative;
        background: url('../../assets/img/content/bg.png') no-repeat center center;
        background-size: 100% 100%;
        .statics-wrap{
            width : 100%;
            height: 100%;
            padding: 0.6rem 0.2rem 0.2rem;
            background: url('../../assets/img/content/border.png') no-repeat center center;
            background-size: 100% 100%;
            .summary{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>