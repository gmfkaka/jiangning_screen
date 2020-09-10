<template>
    <div class="container">
        <div class="container-inner overhidden">
            <div class="main-top"></div>
            <div class="main-wrap">
                <div class="reporter-map-wrap">
                    <call 
                :info-item.sync="callInfo" 
                :call-show.sync="callShow" 
                :call-type.sync="callType" 
                ></call>
                    <div id="reporter-map" ref="allmap" class="reporter-map"></div>
                    <div class="reporter-list-wrap overhidden sys-flex sys-flex-center">
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                        <swiper :options="swiperOption" ref="mySwiper" >
                            <swiper-slide class="sys-flex flex-justify-left" style="height:100%!important;" v-for="(item,k) in reporterListArray" v-bind:key="k">
                                <div class="reporter-list sys-flex sys-flex-center animated" v-for="(v,k) in item" :key="k" :class="{'flipInX' : v}" v-bind:style="{'animation-delay' : k/2+'s'}">
                                    <img class="avatar" v-if="v.avatar" :src="v.avatar && v.avatar.uri" />
                                    <img class="avatar" v-if="!v.avatar" src="../../assets/img/reporter/default_avatar.png" />
                                    <div class="info sys-flex-one sys-flex flex-justify-center flex-justify-between">
                                        <div class="name">{{v.member_name}}</div>
                                    </div>
                                    <div class="icon sys-flex sys-flex-center flex-justify-center">
                                        <div class="connect connect-audio" @click="callaudio(v)"></div>
                                        <div class="connect connect-video" @click="callvideo(v)"></div>
                                    </div>
                                </div>
                            </swiper-slide>
                        </swiper>
                    </div>
                    <div class="reporter-list-wrap overhidden current" :class="{'active' : currentActive}">
                        <div class="close" @click="hideCurrent"></div>
                        <div v-for="(v,k) in currentReporter" :key="k">
                            <div class="reporter-list sys-flex">
                                <img class="avatar" v-if="v.avatar" :src="v.avatar && v.avatar.uri" />
                                <img class="avatar" v-if="!v.avatar" src="../../assets/img/reporter/default_avatar.png" />
                                <div class="info sys-flex-one sys-flex flex-justify-center flex-justify-between">
                                    <div class="name">{{v.member_name}}</div>
                                </div>
                            </div>
                            <div class="icon sys-flex sys-flex-center flex-justify-center">
                                <div class="connect connect-audio" @click="callaudio(v)"></div>
                                <div class="connect connect-video" @click="callvideo(v)"></div>
                            </div>
                        </div>
                         
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import call from './call.vue'
import * as utils from '../../servers/utils'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    name: 'reporterMap',
    data () {
        return {
            reporterList : [],
            reporterListArray : [],
            currentReporter : [],
            currentActive : false,
            callInfo : {},
            callShow : false,
            callType : 'video',
            swiperOption : {
                // notNextTick: true,
                speed : 2000,
                // autoplay : false,
                autoplay: {
                    delay: 15000,
                    stopOnLastSlide:false,
                    disableOnInteraction:false
                },
                autoHeight: true,
                // direction: 'vertical',
                // effect : 'flip',
                initialSlide :0,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
                paginationClickable :true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            }
        }
    },
    components: {
        call,
        swiper, 
        swiperSlide
    },

    created () {
        document.write(`<script src="//cdn.ronghub.com/RongIMLib-2.3.2.js"><\/script>`);
        document.write(`<script src="//cdn.ronghub.com/RongCallLib-3.0.0.min.js"><\/script>`);
        this.getReporter();
        // setInterval(()=>{
        //     this.getReporter();
        // },60000);
    },

    mounted() {
    },

    methods: {
        map(){
            // var map = new BMap.Map("reporter-map");
        // var _this = this;
        // var map = new BMap.Map("reporter-map");
        // var mapStyle ={ 
        //     // features: ["road", "building","water","land"],//隐藏地图上的poi
        //     style : "light"  //设置地图风格为高端黑
        // }
        // map.setMapStyle(mapStyle);
        // // map.addControl(new BMap.MapTypeControl());
        // map.addControl(new BMap.OverviewMapControl());
        // map.enableScrollWheelZoom(true); 
        // this.coordinateList = [];
        // this.reporterList.forEach( (vv) => {
        //     this.coordinateList.push(new BMap.Point(
        //         utils.gaodeTobaidu(vv.longitude , vv.latitude).longitude, 
        //         utils.gaodeTobaidu(vv.latitude , vv.latitude).latitude, 
        //     ));
        // });
        // var view = map.getViewport(this.coordinateList);
        // var mapZoom = view.zoom - 1;
        // var centerPoint = view.center;
        // map.centerAndZoom(centerPoint, 15);
        // map.addControl(new BMap.NavigationControl());
        // var markers = [];
        // var pt = null;
        // for (let i=0; i < this.reporterList.length; i++) {
        //     pt = new BMap.Point(
        //         utils.gaodeTobaidu(this.reporterList[i].longitude , this.reporterList[i].latitude).longitude,
        //         utils.gaodeTobaidu(this.reporterList[i].latitude , this.reporterList[i].latitude).latitude, 
        //     );
        //     var a = new BMap.Marker(pt);
        //     addClickHandler( this.reporterList[i], a);
        //     markers.push(a);
            
        // }
        // //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
        // var markerClusterer = new BMapLib.MarkerClusterer(map, {
        //     markers: markers,
        //     isAverageCenter: true,
        //     minClusterSize: 1,
        //     // styles:  [{
        //     //     url: require('../../assets/img/reporter/avatarbg.png'),
        //     //     size: new BMap.Size(270, 217),
        //     //     textColor: '#ffffff',
        //     //     textSize: 18,
        //     // }]
        // });

        // function addClickHandler(content,marker){
        //     marker.addEventListener("click",function(e){
        //             if(!_this.currentActive){
        //                 _this.currentActive = true;
        //             }
        //             _this.currentReporter = [];
        //             _this.currentReporter.push(content);
        //     });
        // }

            var map = new BMap.Map("reporter-map");
            map.enableScrollWheelZoom(true);
            var mapStyle ={ 
                // features: ["road", "building","water","land"],//隐藏地图上的poi
                style : "light"  //设置地图风格为高端黑
            }
            map.setMapStyle(mapStyle);
            // map.addControl(new BMap.MapTypeControl());
            //绘制带图标注
            var _this = this;
            SquareOverlay.prototype = new BMap.Overlay();
            SquareOverlay.prototype.initialize = function (map) {
                this._map = map;
                var div = document.createElement("div");
                    // img = document.createElement("img"),
                    // p = document.createElement("p");
                // div.appendChild(img);
                // div.appendChild(p);
                var item = this._mid;
                // img.src = this._src;
                div.innerHTML = item.member_name.slice(0,1);
                div.className = 'map-style sys-flex flex-justify-around sys-flex-center';
                div.style.position = "absolute";
                div.style.width = '0.4rem';
                div.style.marginLeft = '-0.2rem';
                div.style.marginTop = '-0.3rem';
                div.style.height = '0.6rem';
                div.style.fontSize = '0.12rem';
                div.style.color = '#fff';
                div.style.background = 'url('+require('../../assets/img/reporter/lo.png')+') no-repeat center center';
                div.style.backgroundSize = '100%';
                map.getPanes().markerPane.appendChild(div);
                this._div = div;
                div.onclick = function () {
                    // _this.callvideo(item);
                    if(!_this.currentActive){
                        _this.currentActive = true;
                    }
                    _this.currentReporter = [];
                    _this.currentReporter.push(item);
                }
                return div;
            };
            SquareOverlay.prototype.draw = function () {
                var position = this._map.pointToOverlayPixel(this._center);
                this._div.style.left = position.x - this._length / 2 + 5 + "px";
                this._div.style.top = position.y - this._length / 1.1 + 5 + "px";
            };
            this.reporterList.forEach((vv) => {
                var img = vv.avatar ? vv.avatar.uri : require('../../assets/img/reporter/default_avatar.png');
                var mySquare = new SquareOverlay({
                    lng: utils.gaodeTobaidu(vv.longitude , vv.latitude).longitude,
                    lat: utils.gaodeTobaidu(vv.longitude , vv.latitude).latitude
                }, 60, "red", img, vv);
                map.addOverlay(mySquare);
            });
            //绘制带图标注结束

            //设置地图的最佳视图
            this.coordinateList = [];
            this.reporterList.forEach( (vv) => {
                this.coordinateList.push(new BMap.Point(vv.longitude, vv.latitude));
            });
            var view = map.getViewport(this.coordinateList);
            var mapZoom = view.zoom - 1;
            // var centerPoint = view.center;
            var centerPoint = new BMap.Point(118.852879,31.920374);
            map.centerAndZoom(centerPoint, 20);
            map.addControl(new BMap.NavigationControl());

            function SquareOverlay(center, length, color, src, mid) {
                this._src = src;
                this._center = center;
                this._length = length;
                this._color = color;
                this._mid = mid;
            }
        },
        
        hideCurrent(){
            this.currentActive = false;
        },

        getReporter(){
            this.$api.getReporter().then((response)=>{
                if( !response.data.ErrorCode && response.data.data.length){
                    this.reporterList = response.data.data;
                    this.reporterListArray = this.split_array(response.data.data , 6);
                    this.map();
                }
            });
        },

        callaudio( reporter ){
            this.callInfo = reporter;
            this.callType = 'audio';
            this.callShow = true;
        },

        callvideo( reporter ){
            this.callInfo = reporter;
            this.callType = 'video';
            this.callShow = true;
        },

        split_array(arr, len){    
            let a_len = arr.length;    
            let result = [];    
            for(let i=0;i<a_len;i+=len){        
                result.push(arr.slice(i,i+len));    
            }    
            return result;
        }
    }
}
</script>

<style lang="scss" scoped>
    .container{
            width:100%;
            height:100%;
            position: relative;
            background: url('../../assets/img/reporter/bg.png') no-repeat center center;
            background-size: 100% 100%;
            .container-inner{
                width: 100%;
                height: 100%;
                padding:0 1% 0.5%;
                .main-top{
                    width: 100%;
                    height:20%;
                    background: url('../../assets/img/title.png') no-repeat center center;
                    background-size: 80%;
                }
                .main-wrap{
                    width:100%;
                    // height: 80%;
                    height: 66%;
                    position: relative;
                    .reporter-map-wrap{
                        position: relative;
                        // height: 85%;
                        height: 100%;
                        width: 100%;
                        background: url('../../assets/img/reporter/border.png') no-repeat center center;
                        background-size: 100% 100%;
                        padding-top: 0.55rem;
                        .reporter-top{
                            height: 100%;
                            background: url('../../assets/img/title.png') no-repeat top center;
                        }
                        .reporter-map{
                            height: 100%;
                            background:rgba(2,122,186,0.2);
                            border : 0.01rem solid rgba(2, 122, 186, 0.5);
                        }
                        .reporter-list-wrap{
                            // width: 30%;
                            // height: 100%;
                            padding: 1% 0;
                            overflow-y: hidden;
                            overflow-x: scroll;
                            position: relative;
                            &.current{
                                position: absolute;
                                width: 4rem;
                                height: 3rem;
                                top: -10000px;
                                right: 0.5rem;
                                background:rgba(0,0,0,0.8);
                                padding: 0.3rem;
                                border-radius: 0.2rem;
                                transition: all 0.1s ease-in;
                                &.active{
                                    top : 0.5rem;
                                }
                                .reporter-list{
                                    padding: 0;
                                    background:none;
                                    position: relative;
                                }
                                .avatar{
                                    width: 1.5rem!important;
                                    height: 1.5rem!important;
                                }
                                .icon{
                                    opacity: 1!important;
                                    position: static!important;
                                }
                                .info{
                                    height: 1.5rem!important;
                                }
                                .connect{
                                    margin-top:0.3rem; 
                                    width: 2rem;
                                    height: 0.45rem;
                                    background: url('') no-repeat center right;
                                    background-size: 100% 100%;
                                    cursor: pointer;
                                    &.connect-audio{
                                        background-image: url('../../assets/img/reporter/audio1.png');
                                        margin-right: 0.2rem;
                                    }
                                    &.connect-video{
                                        background-image: url('../../assets/img/reporter/video1.png');
                                        margin-left: 0.2rem;
                                    }
                                }
                                .close{
                                    position: absolute;
                                    width: 0.5rem;
                                    height: 0.5rem;
                                    top : 0.2rem;
                                    right: 0.2rem;
                                    background: url('../../assets/img/reporter/close.png') no-repeat center center;
                                    background-size: 0.5rem 0.5rem; 
                                }
                            }
                            .reporter-list{
                                width: 3rem;
                                // height: 13%;
                                padding: 0.1rem 0.2rem;
                                background:rgba(80,136,188,0.3);
                                position: relative;
                                &:hover{
                                    .icon{
                                        opacity: 1;
                                    }
                                }
                                &:not(:last-child){
                                    margin-right: 0.15rem;
                                }
                                .avatar{
                                    // width : 15%;
                                    // height: 100%;
                                    width: 1rem;
                                    height: 1rem;
                                }
                                .info{
                                    height: 100%;
                                    padding : 0rem 0.2rem;
                                    flex-direction: column;
                                    .name{
                                        font-size:0.3rem;
                                        font-family:PingFangSC-Regular;
                                        font-weight:400;
                                        color:rgba(255,255,255,1);
                                    }
                                    .depart{
                                        font-size:0.24rem;
                                        font-family:PingFangSC-Light;
                                        font-weight:400;
                                        color:rgba(161,198,238,1);
                                    }
                                }
                                .icon{
                                    position: absolute;
                                    width: 100%;
                                    height: 100%;
                                    background: rgba(0,0,0,0.5);
                                    top: 0;
                                    left: 0;
                                    padding: 0.1rem 0.2rem;
                                    opacity: 0;
                                    .connect{
                                        width: 0.5rem;
                                        height: 0.5rem;
                                        background: url('') no-repeat center right;
                                        background-size: 0.5rem 0.5rem;
                                        cursor: pointer;
                                        &.connect-audio{
                                            background-image: url('../../assets/img/reporter/audio.png');
                                            margin-right: 0.2rem;
                                        }
                                        &.connect-video{
                                            background-image: url('../../assets/img/reporter/video.png');
                                            margin-left: 0.2rem;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        // .swiper-container{
        //     width: 100%!important;
        // }
    }
</style>