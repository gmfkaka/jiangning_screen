<template>
  <div class="position-relative">
    <span class="off" v-if="!isConnection">websocket断连，页面已刷新5次</span>
    <character-information v-if="type === 'm2o-plus'" :id="id" :facePath="facePath"></character-information>
    <media-index v-else-if="type === 'workcall'" :id="id" :token="token" :facePath="facePath"></media-index>
    <click-list v-else-if="type === 'old'"></click-list>
  </div>
</template>
<script>
import characterInformation from '../characterInformation/characterInformation'
import mediaIndex from '../mediaIndex/mediaIndex'
import clickList from '../clickList/clickList'
import { getNowTime, storage } from '../../servers/utils'
export default {
  name: 'characterOne',
  data () {
    return {
      id: 0,
      token: '',
      type: 'old',
      startTime: '',
      endTime: '',
      times: '',
      isConnection: true,
      facePath: '',
      from: ''
    }
  },
  components: {
    characterInformation,
    mediaIndex,
    clickList
  },
  created () {
    // 初始化数据
    storage.set('characterOne', 6)
    this.startTime = (new Date()).getTime()
    // 获取页面来源
    if (window.location.href.split('?')[1]) {
      this.from = window.location.href.split('?')[1].substring(5)
    }
    // 发送数据建立websocket
    window.socketClient = new WebSocket('wss://pushserver-api.cloud.hoge.cn/server_all/comment/live_358888?custom_appid=358&custom_appkey=u2H7JB2scb0mPg0Pu7Vpguifg5rMbO1v&device_token=32432weqdwaqdqw')
    window.socketClient.onopen = () => {
      console.log('~~~~ send connect ~~~~');
    };
    // 定时器循环
    setInterval(() => {
      this.times = storage.get('characterOne')
      // 每天8:0定时刷新
      if (getNowTime() === '8:0') {
        window.location.reload()
      }
      // 定时器中一直记录结束时间
      this.endTime = (new Date()).getTime()
      console.log(this.endTime - this.startTime)
      if ((this.endTime - this.startTime) > 60000) {
        if (this.times > 0) {
          // times次数减少
          this.times --
          storage.set('characterOne', this.times)
          // 发送websocket断连通知
          let link = 'wss://pushserver-api.cloud.hoge.cn/server_all/comment/live_358888?custom_appid=358&custom_appkey=u2H7JB2scb0mPg0Pu7Vpguifg5rMbO1v&device_token=32432weqdwaqdqw'
          let name = '人物信息/融媒首页/稿件排行'
          this.$api.isWebsocket(link, name).then(res => {
            console.log(res)
          })
          // 长链接断开时间大于一分钟 刷新页面
          console.log('页面刷新')
          window.location.reload()
        } else {
          this.isConnection = false
        }
      }
      // 发送消息
      let msg = {type: 'send_all'}
      if (this.from) {
        msg.from = 'hoge'
      }
      if (window.socketClient.readyState == 1) {
        window.socketClient.send(JSON.stringify(msg))
      }
    },60000)
  },
  mounted () {
    // 接收数据
    window.socketClient.onmessage = (evt) => {
      storage.set('characterOne', 6)
      // 长链接正常一直记录开始时间
      this.startTime = (new Date()).getTime()
      var res = JSON.parse(evt.data)
      console.log(res.text)
      if (res.text) {
        if (JSON.parse(res.text) && JSON.parse(res.text).type === 'refresh_data') {
          window.location.reload()
        } else if (JSON.parse(res.text) && JSON.parse(res.text).type === 'send_all') {
          return
        } else {
          this.facePath = JSON.parse(res.text)['face_path']
          this.type = JSON.parse(res.text).type
          let id = JSON.parse(res.text)['figure_id']
          if (this.type === 'workcall') {
            this.token = JSON.parse(res.text).token
          }
          this.id = Number(id)
        }
      }
    }
  }
}
</script>
