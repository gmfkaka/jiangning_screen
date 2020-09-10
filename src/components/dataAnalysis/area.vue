<template>
    <div class="area-map" ref="areaMap">

    </div>
</template>
<script>
    import echarts from 'echarts';
    import 'echarts/map/js/china.js';
    export default {
        name:'areaMap',
        data() {
            return {

            }
        },
        props:{
            areaMapData:Array
        },
        watch:{
            areaMapData:{
                immediate:true,
                handler(res){
                    this.dataFormat = this.initMapData(res);
                    // console.log(this.dataFormat)
                    if (this.myChart) {
                        this.myChart.setOption({
                            visualMap:{
                                max:this.dataFormat.seriesArr[this.dataFormat.seriesArr.length-1].value
                            },
                            series : [
                                {
                                    data:this.dataFormat.seriesArr,
                                }
                            ]
                        })
                    }
                }
            }
        },
        mounted() {
            this.initArea();
        },
        methods:{
            initMapData(data) {
                if(data){
                    //console.log(data);
                    let seriesArr=[],yAxisArr=[];
                    data.forEach((value) => {
                        if( value.region){
                            value.region_show = value.region.substring(0, value.region.length - 1 )
                        }
                        seriesArr.push({name:value.region_show, value:value.count});
                        // console.log(seriesArr)
                        // seriesArr.unshift(parseInt(value.count_kRegion));
                    });
                    return {
                        seriesArr,
                        yAxisArr
                    }
                }
            },
            initArea() {
                const _this = this;
                _this.myChart = echarts.init(_this.$refs.areaMap);
                _this.options = {
                    title: {
                        show: false
                    },
                    // tooltip: {
                    //     trigger: 'item',
                    //     formatter: (param) => `${JSON.stringify(param}: ${param.count || '-'}`
                    // },
                    legend: {
                        show: false
                    },
                    visualMap: {
                        // min: 0,
                        // max: intMax,
                        right: 10,
                        // bottom: 40,
                        itemWidth: 10,
                        itemHeight: 60,
                        text: ['高', '低'],
                        textGap: 6,
                        calculable: false,
                        inRange: {
                            symbol: 'rect',
                            color: ['#90CDEC', '#0F82FF']
                        },
                        textStyle: {
                            fontSize: 12,
                            color: '#666'
                        }
                    },
                    series: [
                        {
                            name: '地域',
                            type: 'map',
                            mapType: 'china',
                            // left: 55,
                            // top: 68,
                            showLegendSymbol: false,
                            data:[],
                            // data: data.map(item => ({ name: item[0], value: item[1] })),
                            // data: [{ name: '江苏', selected: true, itemStyle: { normal: { areaColor: '#299BF2' } } }],
                            itemStyle: {
                                normal: {
                                    areaColor: '#567BB6',
                                    borderColor: '#223C6E'
                                },
                                emphasis: {
                                    areaColor: '#299BF2',
                                    shadowBlur: 4,
                                    shadowOffsetX: 2,
                                    shadowOffsetY: 2,
                                    shadowColor: 'rgba(0,0,0,0.40)'
                                }
                            }
                        }
                    ]
                };
                _this.myChart.setOption(_this.options);
            }
        }
    }
</script>
<style>
    .area-map{
        width: 100%;
        height: 50%;
    }
</style>