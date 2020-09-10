<template>
    <div id="app" style="height:100%">
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        name: 'app',

        data () {
            return {}
        },

        components: {},

        created(){
            document.documentElement.style.fontSize = document.documentElement.clientWidth / 1920*100 + 'px';

        },
        methods: {}
    }
</script>

<style>
    html,body{

      height: 100%;
      /* font-size: 20px; */
    }
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    ::-webkit-scrollbar {/*隐藏动条*/
        display: none;
    }
    li{
        list-style: none;
    }
    a{
        text-decoration: none;
    }
    /*flex*/
    .sys-flex{display: -webkit-flex;display: -ms-flexbox;display: flex;}
    .sys-flex-center{-webkit-align-items: center;-ms-flex-align: center;align-items: center;}
    .sys-flex-one{-webkit-flex: 1;-ms-flex: 1;flex: 1;}
    .sys-vertical{-webkit-box-orient:vertical;-ms-flex-direction:column;}
    .sys-pack-center{-webkit-box-pack: center;}
    .flex-justify-center{-ms-flex-pack: center;justify-content: center;-webkit-justify-content: center;-moz-justify-content: center;-ms-justify-content: center;}
    .flex-justify-around{-ms-flex-pack: space-around;justify-content: space-around;-webkit-justify-content: space-around;-moz-justify-content: space-around;-ms-justify-content: space-around;}
    .flex-shrink{flex-shrink: 0;-webkit-flex-shrink:0;-moz-flex-shrink:0;-ms-flex-shrink:0;}
    .flex-justify-between{-ms-flex-pack: space-between;justify-content: space-between;-webkit-justify-content: space-between;-moz-justify-content: space-between;-ms-justify-content: space-between;}
    .sys-flex-wrap{flex-wrap: wrap;}

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

    }
    .overhidden{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    /* .map-style img{
        display: block;
        width : 0.3rem;
        height: 0.3rem;
        margin : 0.18rem auto;
        border-radius: 50%;
    }
    #ring-call{
        opacity: 0;
        position: absolute;
        top : -10000px;
    }  */
    .map-style img{
        display: block;
        width: .4rem;
        height: .4rem;
        /* border-radius: 50%; */
        margin-bottom: .45rem;
    }
    .map-style p{
        font-size: .18rem;
        font-weight: 500;
        color: #fff;
        margin-bottom: .5rem;
    }
    .map-style:hover{
        z-index : 99999999!important;
    }
    #ring-call{
        opacity: 0;
        position: absolute;
        top : -10000px;
    }
    .anchorBL{display:none;}
    .BMap_stdMpCtrl {display: block;}
    .echarts , canvas{
        display: block;
        width : 100%!important;
        height: 100%!important;
    }
    .position-relative {
      position: relative;
    }
    .off {
      position: absolute;;
      color: red;
      top: 2%;
      left: 2%;
      font-size: 0.4rem;
      z-index: 10;
      opacity: 0.3;
    }


    /*
      标注
    */
    .member-wrap{
      width: 4.8rem;
      height: 3.8rem;
      border-radius: 0.14rem;
      overflow: hidden;
      position: absolute;
      padding: 0.4rem;
      font-size: 0.5rem;
      color: #fff;
    }
    .member-wrap::after{
      content: '';
      width:0.4rem;
      height:0.4rem;
      border-radius:50%;
      background-color:#00FFF6;
      position:absolute;
      bottom: 1.6rem;
      left:50%;
      margin-left:-0.2rem;
    }
    .member-wrap .member-avatar{
      width: 1.3rem;
      height: 1.3rem;
      border-radius: 50%;
      margin-right: 0.24rem;
      overflow: hidden;
    }
    .member-wrap .audio{
      display: none;
      position: absolute;
      bottom: 0.3rem;
      left: 0.5rem;
      border-radius: 50%;
      border: solid 1px #fff;
      width: 1.2rem;
      height: 1.2rem;
      cursor: pointer;
      background: url('') no-repeat center right;
      background-size: 100% 100%;
      background-image: url(./assets/img/reporter/audio3.png);
    }
    .member-wrap .video{
      display: none;
      position: absolute;
      bottom: 0.3rem;
      left: 2.2rem;
      border-radius: 50%;
      border: solid 1px #fff;
      width: 1.2rem;
      height: 1.2rem;
      background: url('') no-repeat center right;
      background-size: 100% 100%;
      background-image: url(./assets/img/reporter/video3.png);
    }
    .member-wrap .close{
      font-size: 0.5rem;
      font-weight: bold;
      display: none;
      position: absolute;
      right: 0.25rem;
      top: 0.2rem;
      display: none;
    }
    .show-detail{
      background:rgba(38,132,250,0.8);
    }
    .show-detail .audio{
      display: block;
    }
    .show-detail::after{
      display: none;
    }
    .show-detail .video{
      display: block;
    }
    .show-detail .close{
      display: none;
    }
    .hide-detail{
      background:'';
    }
    .hide-detail .audio{
      display: none;
    }
    .hide-detail::after{
      display: block;
    }
    .hide-detail .video{
      display: none;
    }
    .hide-detail .close{
      display: none;
    }
</style>
