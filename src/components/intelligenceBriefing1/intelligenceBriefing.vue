<template>
  <div class="" @click="refresh()">
    刷新
  </div>
</template>
<script>
export default {
  name: 'intelligenceBriefing',
  data () {
    return {
    }
  },
  created () {
    this.initData()
  },
  methods: {
    refresh () {
      if (window.socketClient.readyState == 1) {
        var msg = {type: 'refresh_data'};
        window.socketClient.send(JSON.stringify(msg));
      }
    },
    initData () {
      // 发送数据建立websocket
      window.socketClient = new WebSocket('wss://pushserver-api.cloud.hoge.cn/server_all/comment/live_358888?custom_appid=358&custom_appkey=u2H7JB2scb0mPg0Pu7Vpguifg5rMbO1v&device_token=32432weqdwaqdqw')
      window.socketClient.onopen = () => {
        console.log('~~~~ send connect ~~~~');
      };
    }
  }
}
</script>
<style lang="scss" scoped>
.main-wrap {
  .intelligence-briefing {
    width: 100%;
    height: 100%;
    padding: 0.5rem 0.3rem 0.35rem;
    color: #fff;
    font-size: 0.48rem;
    button {
      width: 1rem;
      height: 0.5rem;
      font-size: 0.4rem;
    }
    .briefing-title {
      width: 100%;
      height: 1.14rem;
      background: url('../../assets/img/briefing/title_bg.png') no-repeat center;
      background-size: 100%;
      text-align: center;
      font-weight: 600;
      line-height: 1.14rem;
      margin-bottom: 0.35rem;
    }
    .briefing-body {
      width: 100%;
      height: 8.61rem;
      background: url('../../assets/img/briefing/tongyong_bg01.png') no-repeat center;
      background-size: 100%;
      padding: 0.3rem 0.34rem 0.3rem 0.3rem;
      .ai-left {
        width: 15.5rem;
        height: 8rem;
        video {
          width: 100%;
          height: 100%;
        }
      }
      .ai-right {
        height: 100%;
        overflow: scroll;
        .select {
          opacity: 1!important;
        }
        .img-box {
          opacity: 0.6;
          width: 1.92rem;
          height: 1.9rem;
          background: url('../../assets/img/briefing/touxiang_bg.png') no-repeat center;
          background-size: 100%;
          margin-bottom: 0.12rem;
          img {
            width: 1.8rem;
            height: 1.78rem;
            object-fit: cover;
          }
        }
      }
    }
  }
}
</style>
