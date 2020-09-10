<template>
  <div class="">
    <video id="test_video" controls autoplay>
        <source src="rtsp://10.0.7.200/main">
    </video>
  </div>
</template>
<script>
import * as streamedian from '../../streamedian/streamedian.min.js';
export default {
  mounted () {
    if (streamedian) {
        var p = window.Streamedian.player('test_video', {socket: "ws://10.0.1.111:8080/ws"})
    }
  }
}
</script>

<style lang="scss">
#test_video{
  width: 100%;
  height: 100%;
}
</style>
