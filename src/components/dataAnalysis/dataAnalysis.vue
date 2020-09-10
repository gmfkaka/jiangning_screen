<template>
    <div class="main-wrap">
        <div class="data-analysis-wrap sys-flex">
            <div class="data-analysis-list">
                <div class="data-type-wrap sys-flex sys-flex-center">
                    <div class="data-type" :class="{'active' : typeActive == 'internet'}" @click="changeType('internet')">全网</div>
                    <div class="data-type" :class="{'active' : typeActive == 'jiangning'}" @click="changeType('jiangning')">江宁</div>
                </div>
                <div v-if="typeActive == 'internet'" class="data-list animated" v-for="(v , k) in newsList" :key="k" :class="{'active' : curIndex == k,'fadeInLeft' : v.topic_name}" v-bind:style="{'animation-delay' : k/2+'s'}">
                    <div class="data-title overhidden">{{v.topic_name}}</div>
                    <div class="data-brief">{{v.topic_info}}</div>
                </div>
                <div v-if="typeActive == 'jiangning'" class="data-list animated" v-for="(v , key) in localNewsList" :key="key" :class="{'active' : loaclCurIndex == key,'fadeInLeft' : v.title}" v-bind:style="{'animation-delay' : key/2+'s'}">
                    <div class="data-title overhidden">{{v.title}}</div>
                    <div class="data-brief">{{v.brief}}</div>
                </div>
            </div>
            <div class="data-bottom sys-flex sys-flex-one">
                <!-- <div class="area">
                    <p class="area-title">区域分布</p>
                    <area-distribute :area-map-data="currentNewsData.result.area.region_spread"></area-distribute>
                    <area-bar :area-bar-data="currentNewsData.result.area.city_spread"></area-bar>
                </div> -->
                <div class="data-bottom-right sys-flex flex-justify-between sys-flex-wrap" >
                    <div class="data-sex data-bottom-small">
                        <p v-if="typeActive == 'internet'" class="sex-title">各渠道数据分布(近一周)</p>
                        <p v-if="typeActive == 'jiangning'" class="sex-title">互动分布</p>
                        <chart v-if="typeActive == 'internet'" :options="lineOptions"></chart>
                        <chart v-if="typeActive == 'jiangning'" :options="localline"></chart>
                    </div>
                    <div class="data-emotion data-bottom-small">
                        <p v-if="typeActive == 'internet'" class="emotion-title">媒体占比</p>
                        <p v-if="typeActive == 'jiangning'" class="emotion-title">终端统计</p>
                        <chart v-if="typeActive == 'internet'" :options="pieOptions"></chart>
                        <chart v-if="typeActive == 'jiangning'" :options="localpie"></chart>
                    </div>
                    <div class="data-age">
                        <p v-if="typeActive == 'internet'" class="age-title">TOP 10 活跃新闻媒体来源</p>
                        <p v-if="typeActive == 'jiangning'" class="age-title">稿件互动量统计</p>
                        <chart v-if="typeActive == 'internet'" :options="top10options"></chart>
                        <chart v-if="typeActive == 'jiangning'" :options="localbar"></chart>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/gauge'
export default {
    name: 'dataAnalysis',
    data () {
        return {
            typeActive : 'internet',
            newsList:[],
            localNewsList : [],
            page : 1,
            size : 4,
            currentNewsData:{
                    "title":"",
                    "result":{
                        "media_distribution":{},
                        "sex_scale":{},
                        "emotion":[],
                        "age":[],
                        "area":{}
                    }
            },
            top10options:{
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                grid: {
                    left: '2%',
                    right: '0%',
                    bottom: '4%',
                    top : '7%',
                    containLabel: true
                },
                // calculable: true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : true,
                        data : [],
                        axisLabel: {
                            interval:0,
                            rotate:20,
                            color: '#fff',
                            fontSize:14,
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#4A6AA8'
                            }
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
                            fontSize:12,
                            formatter: '{value}',
                            interval:30,
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
                        type:'bar',
                        barCategoryGap : '60%',
                        barWidth: '60%',
                        itemStyle: {
                            normal: {
                                color: "#0541ff",
                                width : 15,
                                lineStyle: {
                                    color: "#0541ff"
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        fontSize : 14,
                                        color: 'white'
                                    }
                                }
                            }
                        },
                        data:[]
                    }
                ]
            },
            pieOptions : {
                title: {
                    text: '',
                    textStyle :{
                        color : '#fff',
                        fontSize : 12
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    right : 0,
                    icon : 'circle',
                    textStyle : {
                        color : '#fff',
                        fontSize : 8
                    },
                },
                series: [
                    {
                        name:'发布渠道占比',
                        type:'pie',
                        radius: ['20%', '70%'],
                        minAngle: 5,
                        avoidLabelOverlap: true,
                        label: {
                            normal: {
                                show: true,
                                length :2,
                                // formatter: '{b}:{d}%',
                                formatter: '{d}%',
                                position: 'outside'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: 12,
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true,
                                length : 20,
                                length2 : 20
                            }
                        },
                        data:[]
                    }
                ]
            },
            lineOptions : {
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
                    orient: 'vertical',
                    right : 0,
                    icon : 'circle',
                    textStyle : {
                        color : '#fff',
                        fontSize : 8
                    },
                    data : []
                },

                grid: {
                    left: '0%',
                    right: '0%',
                    bottom: '10%',
                    top : '10%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : true,
                        data : [1,2,3],
                        axisLine:{
                            lineStyle:{
                                color:"#fff"
                            }
                        }
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
                            fontSize:10,
                            formatter: '{value}'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#4A6AA8'
                            }
                        },
                    }
                ],
                series : []
            },

            localbar:{
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                grid: {
                    left: '0%',
                    right: '0%',
                    bottom: '3%',
                    top : '5%',
                    containLabel: true
                },
                // calculable: true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : true,
                        data : [],
                        axisLabel: {
                            interval:0,
                            rotate:20,
                            color: '#fff',
                            fontSize:14,
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#4A6AA8'
                            }
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
                            fontSize:12,
                            formatter: '{value}',
                            interval:30,
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
                        type:'bar',
                        barCategoryGap : '60%',
                        barWidth: '60%',
                        itemStyle: {
                            normal: {
                                color: "#0541ff",
                                width : 15,
                                lineStyle: {
                                    color: "#0541ff"
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        fontSize : 14,
                                        color: 'white'
                                    }
                                }
                            }
                        },
                        data:[]
                    }
                ]
            },
            localpie : {
                title: {
                    text: '',
                    textStyle :{
                        color : '#fff',
                        fontSize : 12
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    right : 0,
                    icon : 'circle',
                    textStyle : {
                        color : '#fff',
                        fontSize : 8
                    },
                },
                series: [
                    {
                        name:'发布渠道占比',
                        type:'pie',
                        radius: ['20%', '70%'],
                        minAngle: 5,
                        avoidLabelOverlap: true,
                        label: {
                            normal: {
                                show: true,
                                length :2,
                                // formatter: '{b}:{d}%',
                                formatter: '{d}%',
                                position: 'outside'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: 12,
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true,
                                length : 20,
                                length2 : 20
                            }
                        },
                        data:[]
                    }
                ]
            },
            localline : {
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
                    orient: 'vertical',
                    right : 0,
                    icon : 'circle',
                    textStyle : {
                        color : '#fff',
                        fontSize : 8
                    },
                    data : []
                },

                grid: {
                    left: '0%',
                    right: '0%',
                    bottom: '10%',
                    top : '10%',
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
                        inverse: true
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
                            fontSize:10,
                            formatter: '{value}'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#4A6AA8'
                            }
                        },
                    }
                ],
                series : []
            },

            type : {
                '21' :	'媒体站点',
                '22' :	'博客',
                '23' :	'论坛贴吧',
                '24' :	'视频站点',
                '25' :	'电子报',
                '26' :	'其他',
                '104' :	'微信公众号',
                '303' :	'新浪微博',
                '100' :	'腾讯社交',
                '102' :	'浏览器',
                '103' :	'手机管家'
            },
            curIndex:0,
            loaclCurIndex : 0
        }
    },
    components: {
        chart:echarts
    },

    created () {
        this.initNewsList();
        setInterval(()=>{
            if(this.typeActive == 'internet'){
                this.curIndex += 1;
                if( this.curIndex > 3 || this.curIndex >= this.newsList.length){
                    this.curIndex = 0;
                    this.initNewsList();
                }
                this.getHotTopicDetail();
            }else{
                this.loaclCurIndex += 1;
                if( this.loaclCurIndex > 3 || this.loaclCurIndex >= this.localNewsList.length){
                    this.loaclCurIndex = 0;
                    this.initLocalNews();
                }
                this.getLocalNewsDetail();
            }
        },'3000');
        setInterval(()=>{
           if(this.typeActive == 'internet'){
               this.typeActive = 'jiangning';
               this.initLocalNews();
           }else{
               this.typeActive = 'internet';
               this.initNewsList();
           }
        },'12000');
    },

    methods: {

        changeType(res){
            this.typeActive = res;
            if(res == 'internet'){
                this.initNewsList();
            }else{
                this.initLocalNews();
            }
        },

        initLocalNews(){
            this.$api.getLocalNewsList(this.page , this.size).then((response)=>{
                // console.log(response);
                this.localNewsList = [];
                setTimeout(()=>{
                    this.localNewsList = response.data.result;
                    // if( response.data.result < 4 ){
                    //     this.page = 1;
                    // }
                    if( this.loaclCurIndex == 0){
                        this.getLocalNewsDetail()
                    }
                },100)
            })
        },

        getLocalNewsDetail(){
            // let content_id = this.localNewsList[this.loaclCurIndex]['content_id'];
            let content_id = Number(this.loaclCurIndex) + 1;
            var _this = this;
            this.$api.getLocalNewsDetail(content_id).then((res)=>{
                // console.log(res.data);
                _this.localbar.xAxis[0].data = [];
                _this.localbar.series[0].data = [];
                _this.localbar.xAxis[0].data = Object.keys(res.data.column_chart);
                _this.localbar.series[0].data = Object.values(res.data.column_chart);
                _this.localpie.series[0].data = [];
                for(let i =0;i<Object.values(res.data.pie_chart).length;i++){
                    _this.localpie.series[0].data.push({
                        value : Object.values(res.data.pie_chart)[i],
                        name : Object.keys(res.data.pie_chart)[i],
                        label : {
                            fontSize : 12
                        }
                    })
                }
                _this.localline.xAxis[0].data = [];
                _this.localline.series = [];
                _this.localline.xAxis[0].data = Object.keys(res.data.line_chart);
                _this.localline.legend.data = ['点击数','评论数','点赞数','分享数'];
                let a = Object.values(res.data.line_chart);
                let clickArr = []
                let commentArr = []
                let likeArr = []
                let shareArr = []
                for(let i =0;i<a.length;i++){
                    clickArr.push(a[i]['click_num'])
                    commentArr.push(a[i]['comment_num'])
                    likeArr.push(a[i]['like_num'])
                    shareArr.push(a[i]['share_num'])
                }
                _this.localline.series = [{
                    name: '点击数',
                    type : 'line',
                    smooth: true,
                    data : clickArr
                }, {
                    name: '评论数',
                    type : 'line',
                    smooth: true,
                    data : commentArr
                }, {
                    name: '点赞数',
                    type : 'line',
                    smooth: true,
                    data : likeArr
                }, {
                    name: '分享数',
                    type : 'line',
                    smooth: true,
                    data : shareArr
                }]
            });
        },

        //初始化新闻列表
        initNewsList(){
            this.$api.getHotTopicList(1 , this.size).then((response)=>{
                this.newsList = [];
                setTimeout(()=>{
                    this.newsList = response.data.result;
                    if( this.curIndex == 0){
                        this.getHotTopicDetail()
                    }
                },100)
            })
        },

        //获取详细数据
        getHotTopicDetail(){
            let id = this.newsList[this.curIndex]['topic_id'];
            // var lineArray = {};
            var _this = this;
            let index = (this.curIndex + 1) === 4 ? 1 : this.curIndex + 1
            this.$api.getHotTopicDetail(id,index).then((response)=>{
                if(response.data.result && response.data.result.channel_list){
                    _this.lineOptions.legend.data = [];
                    this.lineOptions.xAxis[0].data = [];
                    this.lineOptions.series = [];
                    this.lineOptions.xAxis[0].data = response.data.result.channel_list.x;
                    for(let i =0;i<Object.values(response.data.result.channel_list.y).length;i++){
                        _this.lineOptions.legend.data.push(_this.type[Object.keys(response.data.result.channel_list.y)[i]]);
                        _this.lineOptions.series.push({
                            type : 'line',
                            name : _this.type[Object.keys(response.data.result.channel_list.y)[i]],
                            smooth: true,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        position: 'top',
                                        textStyle: {
                                            color: 'white'
                                        }
                                    }
                                }
                            },
                            data : Object.values(response.data.result.channel_list.y)[i]
                        })
                    }
                }
                if(response.data.result && response.data.result.list){
                    this.pieOptions.series[0].data = [];
                    for(var i =0;i<response.data.result.list.length;i++){
                        this.pieOptions.series[0].data.push({
                            value : response.data.result.list[i]['heat'],
                            name : this.type[response.data.result.list[i]['channel']],
                            label : {
                                fontSize : 12
                            }
                        });
                        if( response.data.result.list[i]['channel'] == 21 ){
                            var top_source_list = response.data.result.list[i]['top_list'][1]['top_source_list'];
                            var top10optionsXAxis = [];
                            var top10optionsSeries = [];
                            for( var j =0;j<top_source_list.length;j++){
                                top10optionsXAxis.push(top_source_list[j]['from']);
                                top10optionsSeries.push(top_source_list[j]['count'])
                            }
                            this.top10options.xAxis[0].data = top10optionsXAxis;
                            this.top10options.series[0].data = top10optionsSeries;
                        }
                    }
                }
            });
        },

        //循环加载新闻
        // getNextNews(){
        //     this.getNewsDetails();
        //     this.curIndex++;
        //     this.newsInterval = setInterval(()=>{
        //         if(this.curIndex < this.newsList.length){
        //             setTimeout(()=>{
        //                 this.getNewsDetails();
        //                 this.curIndex++;
        //             },100)
        //         }else{
        //             this.curIndex = 0;
        //             clearInterval(this.newsInterval);
        //             this.getNewsDetails();
        //         }
        //     },30000)
        // }
    }
}
</script>

<style lang="scss" scoped>
    .main-wrap{
        width:19.2rem;
        height:10.8rem;
        padding: 0.15rem 0.15rem 0.125rem;
        position: relative;
        background: url('../../assets/img/dataAnalysis/bg.png') no-repeat center center;
        background-size: 100% 100%;
        .data-analysis-wrap{
            width : 100%;
            height: 100%;
            padding: 0.88rem 0.5rem 0.56rem;
            background: url('../../assets/img/dataAnalysis/border.png') no-repeat center center;
            background-size: 100% 100%;
            .data-analysis-list{
                width: 6rem;
                margin-right: 0.5rem;
                .data-type-wrap{
                    width: 3rem;
                    height: 0.6rem;
                    color: #fff;
                    font-size: 0.28rem;
                    border-radius: 0.5rem;
                    overflow: hidden;
                    margin-bottom: 0.2rem;
                    .data-type{
                        width: 50%;
                        height: 0.6rem;
                        line-height: 0.6rem;
                        text-align: center;
                        background: rgba(255,255,255,.2);
                        &.active{
                            background: #0541ff;
                        }
                    }
                }
            }
            .data-list{
                margin-bottom: 0.2rem;
                background : rgba(16, 79, 189, 0.1);
                padding: 0.2rem;
                border : 0.02rem dotted transparent;
                &.active{
                    background : rgba(16, 79, 189, 0.3);
                    border : 0.02rem dotted rgba(0,255,240,1);
                }
                .data-title{
                    width: 100%;
                    height: 0.47rem;
                    line-height: 0.47rem;
                    font-size: 0.3rem;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(0,255,240,1);
                    text-align: left;
                    margin-bottom: 0.2rem;
                }
                .data-brief{
                    font-size: 0.24rem;
                    color: #fff;
                    height: 0.65rem;
                    overflow: hidden;
                }
            }
            .data-bottom{
                // height: 7.8rem;
                .area{
                    width: 6.39rem;
                    height: 100%;
                    background: url('../../assets/img/dataAnalysis/areabg.png') no-repeat center center;
                    background-size: 100% 100%;
                    padding:0.36rem 0.4rem 0;
                    position: relative;
                    .area-title{
                        font-size: 0.24rem;
                        color:#fff;
                        position: absolute;
                        left: 0.42rem;
                        top: 0.36rem;
                    }
                }
                .data-bottom-right{
                    width: 100%;
                    height: 100%;
                    .data-bottom-small{
                        width: 5.45rem;
                        height: 4rem;
                        &.data-sex{
                            background: url('../../assets/img/dataAnalysis/sexbg.png') no-repeat center center;
                            background-size: 100% 100%;
                            position: relative;
                            padding:0.2rem;
                            .sex-title{
                                font-size: 0.24rem;
                                color:#fff;
                            }
                        }
                        &.data-emotion{
                            background: url('../../assets/img/dataAnalysis/emotionbg.png') no-repeat center center;
                            background-size: 100% 100%;
                            position: relative;
                            padding:0.2rem;
                            .emotion-title{
                                font-size: 0.24rem;
                                color:#fff;
                                // position: absolute;
                            }
                        }
                    }
                    .data-age{
                        width: 100%;
                        height: 4.5rem;
                        margin-top: 0.45rem;
                        background: url('../../assets/img/dataAnalysis/agebg.png') no-repeat center center;
                        background-size: 100% 100%;
                        padding:0.2rem;
                        .age-title{
                            // width: 1rem;
                            font-size: 0.24rem;
                            color:#fff;
                        }
                        age{
                            width: 1rem;
                        }
                    }
                }
            }
        }
    }
</style>
