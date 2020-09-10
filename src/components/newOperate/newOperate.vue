<template>
  <div class="main-wrap">
    <div class="operate-wrap">
      <div class="area-title">平台数据</div>
      <div class="sys-flex sys-flex-wrap flex-justify-between area-content">
        <div class="list-container sys-flex-one">
          <div class="list-type sys-flex sys-flex-center flex-justify-center">微信</div>
          <div class="sys-flex-one list-info">
            <div class="operate-list">
              <div class="sub-title overhidden">昨日阅读数量</div>
              <div class="num-wrap sys-flex-one green sys-flex sys-flex-center overhidden">
                <div
                  class="num-list sys-flex-one sys-flex sys-flex-center"
                  v-for="(v,k) in read_count"
                  :key="k"
                >
                  <div
                    class="v-list animated"
                    v-if="v !== -1"
                    :class="{'flipInX' : v}"
                    v-bind:style="{'animation-delay' : -(k-calculation(read_count))/2+'s'}"
                  >{{v}}</div>
                </div>
              </div>
            </div>
            <div class="operate-list">
              <div class="sub-title overhidden">今日新消息数</div>
              <div class="num-wrap sys-flex-one green sys-flex sys-flex-center overhidden">
                <div
                  class="num-list sys-flex-one sys-flex sys-flex-center"
                  v-for="(v,k) in new_num"
                  :key="k"
                >
                  <div
                    class="v-list animated"
                    v-if="v !== -1"
                    :class="{'flipInX' : v}"
                    v-bind:style="{'animation-delay' : -(k-calculation(new_num))/2+'s'}"
                  >{{v}}</div>
                </div>
              </div>
            </div>
            <div class="operate-list">
              <div class="sub-title overhidden">新增粉丝数量</div>
              <div class="num-wrap sys-flex-one green sys-flex sys-flex-center overhidden">
                <div
                  class="num-list sys-flex-one sys-flex sys-flex-center"
                  v-for="(v,k) in wein_new_user"
                  :key="k"
                >
                  <div
                    class="v-list animated"
                    v-if="v !== -1"
                    :class="{'flipInX' : v}"
                    v-bind:style="{'animation-delay' : -(k-calculation(wein_new_user))/2+'s'}"
                  >{{v}}</div>
                </div>
              </div>
            </div>
            <div class="operate-list">
              <div class="sub-title overhidden">累计粉丝数量</div>
              <div class="num-wrap sys-flex-one green sys-flex sys-flex-center overhidden">
                <div
                  class="num-list sys-flex-one sys-flex sys-flex-center"
                  v-for="(v,k) in cumulate_user"
                  :key="k"
                >
                  <div
                    class="v-list animated"
                    v-if="v !== -1"
                    :class="{'flipInX' : v}"
                    v-bind:style="{'animation-delay' : -(k-calculation(cumulate_user))/2+'s'}"
                  >{{v}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="list-container sys-flex-one">
          <div class="list-type sys-flex sys-flex-center flex-justify-center">微博</div>
          <div class="sys-flex-one list-info">
            <div class="operate-list">
              <div class="sub-title overhidden">昨日阅读数量</div>
              <div class="num-wrap sys-flex-one green sys-flex sys-flex-center overhidden">
                <div
                  class="num-list sys-flex-one sys-flex sys-flex-center"
                  v-for="(v,k) in wbdata_one"
                  :key="k"
                >
                  <div
                    class="v-list animated"
                    v-if="v !== -1"
                    :class="{'flipInX' : v}"
                    v-bind:style="{'animation-delay' : -(k-calculation(wbdata_one))/2+'s'}"
                  >{{v}}</div>
                </div>
              </div>
            </div>
            <div class="operate-list">
              <div class="sub-title overhidden">昨日点赞数量</div>
              <div class="num-wrap sys-flex-one green sys-flex sys-flex-center overhidden">
                <div
                  class="num-list sys-flex-one sys-flex sys-flex-center"
                  v-for="(v,k) in wbdata_two"
                  :key="k"
                >
                  <div
                    class="v-list animated"
                    v-if="v !== -1"
                    :class="{'flipInX' : v}"
                    v-bind:style="{'animation-delay' : -(k-calculation(wbdata_two))/2+'s'}"
                  >{{v}}</div>
                </div>
              </div>
            </div>
            <div class="operate-list">
              <div class="sub-title overhidden">新增粉丝数量</div>
              <div class="num-wrap sys-flex-one green sys-flex sys-flex-center overhidden">
                <div
                  class="num-list sys-flex-one sys-flex sys-flex-center"
                  v-for="(v,k) in wbdata_three"
                  :key="k"
                >
                  <div
                    class="v-list animated"
                    v-if="v !== -1"
                    :class="{'flipInX' : v}"
                    v-bind:style="{'animation-delay' : -(k-calculation(wbdata_three))/2+'s'}"
                  >{{v}}</div>
                </div>
              </div>
            </div>
            <div class="operate-list">
              <div class="sub-title overhidden">累计粉丝数量</div>
              <div class="num-wrap sys-flex-one green sys-flex sys-flex-center overhidden">
                <div
                  class="num-list sys-flex-one sys-flex sys-flex-center"
                  v-for="(v,k) in wbdata_four"
                  :key="k"
                >
                  <div
                    class="v-list animated"
                    v-if="v !== -1"
                    :class="{'flipInX' : v}"
                    v-bind:style="{'animation-delay' : -(k-calculation(wbdata_four))/2+'s'}"
                  >{{v}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="list-container sys-flex-one">
          <div class="list-type sys-flex sys-flex-center flex-justify-center">短视频</div>
          <div class="sys-flex-one list-info">
            <div class="operate-list">
              <div class="sub-title overhidden">昨日点赞数量</div>
              <div class="num-wrap sys-flex-one red sys-flex sys-flex-center overhidden">
                <div
                  class="num-list sys-flex-one sys-flex sys-flex-center"
                  v-for="(v,k) in memberRegisterTotalNum"
                  :key="k"
                >
                  <div
                    class="v-list animated"
                    v-if="v !== -1"
                    :class="{'flipInX' : v}"
                    v-bind:style="{'animation-delay' : -(k-calculation(memberRegisterTotalNum))/2+'s'}"
                  >{{v}}</div>
                </div>
              </div>
            </div>
            <div class="operate-list">
              <div class="sub-title overhidden">今日新消息数</div>
              <div class="num-wrap sys-flex-one red sys-flex sys-flex-center overhidden">
                <div
                  class="num-list sys-flex-one sys-flex sys-flex-center"
                  v-for="(v,k) in cloudAccess"
                  :key="k"
                >
                  <div
                    class="v-list animated"
                    v-if="v !== -1"
                    :class="{'flipInX' : v}"
                    v-bind:style="{'animation-delay' : -(k-calculation(cloudAccess))/2+'s'}"
                  >{{v}}</div>
                </div>
              </div>
            </div>
            <div class="operate-list">
              <div class="sub-title overhidden">新增粉丝数量</div>
              <div class="num-wrap sys-flex-one red sys-flex sys-flex-center overhidden">
                <div
                  class="num-list sys-flex-one sys-flex sys-flex-center"
                  v-for="(v,k) in publishTodayTotal"
                  :key="k"
                >
                  <div
                    class="v-list animated"
                    v-if="v !== -1"
                    :class="{'flipInX' : v}"
                    v-bind:style="{'animation-delay' : -(k-calculation(publishTodayTotal))/2+'s'}"
                  >{{v}}</div>
                </div>
              </div>
            </div>
            <div class="operate-list">
              <div class="sub-title overhidden">累计粉丝数量</div>
              <div class="num-wrap sys-flex-one red sys-flex sys-flex-center overhidden">
                <div
                  class="num-list sys-flex-one sys-flex sys-flex-center"
                  v-for="(v,k) in publishTotal"
                  :key="k"
                >
                  <div
                    class="v-list animated"
                    v-if="v !== -1"
                    :class="{'flipInX' : v}"
                    v-bind:style="{'animation-delay' : -(k-calculation(publishTotal))/2+'s'}"
                  >{{v}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="list-container sys-flex-one">
          <div class="list-type sys-flex sys-flex-center flex-justify-center">无线江宁App</div>
          <div class="sys-flex-one list-info">
            <div class="operate-list">
              <div class="sub-title overhidden">昨日浏览数量</div>
              <div class="num-wrap sys-flex-one red sys-flex sys-flex-center overhidden">
                <div
                  class="num-list sys-flex-one sys-flex sys-flex-center"
                  v-for="(v,k) in appdata_one"
                  :key="k"
                >
                  <div
                    class="v-list animated"
                    v-if="v !== -1"
                    :class="{'flipInX' : v}"
                    v-bind:style="{'animation-delay' : -(k-calculation(appdata_one))/2+'s'}"
                  >{{v}}</div>
                </div>
              </div>
            </div>
            <div class="operate-list">
              <div class="sub-title overhidden">今日发布数量</div>
              <div class="num-wrap sys-flex-one red sys-flex sys-flex-center overhidden">
                <div
                  class="num-list sys-flex-one sys-flex sys-flex-center"
                  v-for="(v,k) in appdata_two"
                  :key="k"
                >
                  <div
                    class="v-list animated"
                    v-if="v !== -1"
                    :class="{'flipInX' : v}"
                    v-bind:style="{'animation-delay' : -(k-calculation(appdata_two))/2+'s'}"
                  >{{v}}</div>
                </div>
              </div>
            </div>
            <div class="operate-list">
              <div class="sub-title overhidden">新增注册数量</div>
              <div class="num-wrap sys-flex-one red sys-flex sys-flex-center overhidden">
                <div
                  class="num-list sys-flex-one sys-flex sys-flex-center"
                  v-for="(v,k) in appdata_three"
                  :key="k"
                >
                  <div
                    class="v-list animated"
                    v-if="v !== -1"
                    :class="{'flipInX' : v}"
                    v-bind:style="{'animation-delay' : -(k-calculation(appdata_three))/2+'s'}"
                  >{{v}}</div>
                </div>
              </div>
            </div>
            <div class="operate-list">
              <div class="sub-title overhidden">合计注册数量</div>
              <div class="num-wrap sys-flex-one red sys-flex sys-flex-center overhidden">
                <div
                  class="num-list sys-flex-one sys-flex sys-flex-center"
                  v-for="(v,k) in appdata_four"
                  :key="k"
                >
                  <div
                    class="v-list animated"
                    v-if="v !== -1"
                    :class="{'flipInX' : v}"
                    v-bind:style="{'animation-delay' : -(k-calculation(appdata_four))/2+'s'}"
                  >{{v}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'operateData',
  data () {
    return {
      new_num: [],
      read_count: [],
      cumulate_user: [],
      wein_new_user: [],
      memberRegisterTotalNum: [],
      publishTotal: [],
      publishTodayTotal: [],
      cloudAccess: [],
      wbdata_one: [],
      wbdata_two: [],
      wbdata_three: [],
      wbdata_four: [],
      appdata_one: [],
      appdata_two: [],
      appdata_three: [],
      appdata_four: []
    }
  },
  created () {
    // document.documentElement.style.fontSize = document.documentElement.clientWidth / 3840*100 + 'px'
    this.getWeixinTotal()
    this.count = setInterval(() => {
      this.new_num = [-1, -1, -1, -1, -1, -1, -1, -1]
      this.read_count = [-1, -1, -1, -1, -1, -1, -1, -1]
      this.cumulate_user = [-1, -1, -1, -1, -1, -1, -1, -1]
      this.wein_new_user = [-1, -1, -1, -1, -1, -1, -1, -1]
      this.memberRegisterTotalNum = [-1, -1, -1, -1, -1, -1, -1, -1]
      this.publishTotal = [-1, -1, -1, -1, -1, -1, -1, -1]
      this.publishTodayTotal = [-1, -1, -1, -1, -1, -1, -1, -1]
      this.cloudAccess = [-1, -1, -1, -1, -1, -1, -1, -1]
      this.wbdata_one = [-1, -1, -1, -1, -1, -1, -1, -1]
      this.wbdata_two = [-1, -1, -1, -1, -1, -1, -1, -1]
      this.wbdata_three = [-1, -1, -1, -1, -1, -1, -1, -1]
      this.wbdata_four = [-1, -1, -1, -1, -1, -1, -1, -1]
      this.appdata_one = [-1, -1, -1, -1, -1, -1, -1, -1]
      this.appdata_two = [-1, -1, -1, -1, -1, -1, -1, -1]
      this.appdata_three = [-1, -1, -1, -1, -1, -1, -1, -1]
      this.appdata_four = [-1, -1, -1, -1, -1, -1, -1, -1]
      this.getWeixinTotal()
    }, 10000)
  },
  methods: {
    getWeixinTotal () {
      this.$api.getWeixinTotal().then(response => {
        this.wein_new_user = this.preFixInterge(
          response.data.result.weChat.new_user,
          8
        )
        this.read_count = this.preFixInterge(
          response.data.result.weChat.int_page_read_count,
          8
        )
        this.cumulate_user = this.preFixInterge(
          response.data.result.weChat.cumulate_user,
          8
        )
        this.new_num = this.preFixInterge(response.data.result.weChat.msg_count, 8)
        this.wbdata_one = this.preFixInterge(
            response.data.result.weiBo.yesterday_click_count,
            8
          )
          this.wbdata_two = this.preFixInterge(
            response.data.result.weiBo.yesterday_like_count,
            8
          )
          this.wbdata_three = this.preFixInterge(
            response.data.result.weiBo.new_user,
            8
          )
          this.wbdata_four = this.preFixInterge(
            response.data.result.weiBo.cumulate_user,
            8
          )
          this.appdata_one = this.preFixInterge(
            response.data.result.app.yesterday_click_count,
            8
          )
          this.appdata_two = this.preFixInterge(
            response.data.result.app.today_publish_num,
            8
          )
          this.appdata_three = this.preFixInterge(
            response.data.result.app.new_user,
            8
          )
          this.appdata_four = this.preFixInterge(
            response.data.result.app.cumulate_user,
            8
          )
          this.memberRegisterTotalNum = this.preFixInterge(
            response.data.result.shortVideo.yesterday_like_count,
            8
          )
          this.cloudAccess = this.preFixInterge(
            response.data.result.shortVideo.today_msg_count,
            8
          )
          this.publishTodayTotal = this.preFixInterge(
            response.data.result.shortVideo.new_user,
            8
          )
          this.publishTotal = this.preFixInterge(
            response.data.result.shortVideo.cumulate_user,
            8
          )
      })
    },
    preFixInterge (num, n) {
      return (Array(n).join(0) + num).slice(-n).split('')
    },
    calculation (data) {
      if (data) {
        return data.length
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-wrap {
  width: 100%;
  height: 100%;
  padding: 0.2rem 0.16rem 0.4rem;
  position: relative;
  background: url("../../assets/img/operate/bg.png") no-repeat center center;
  background-size: 100% 100%;
  .operate-wrap {
    width: 100%;
    height: 100%;
    position:relative;
    padding: 1rem 0.2rem 0.85rem;
    background: url("../../assets/img/newOperate/border@2x.png") no-repeat center
      center;
    background-size: 100% 100%;
    .area-title{
      text-align:center;
      color:#fff;
      position:absolute;
      width:100%;
      left:0;
      top:0.2rem;;
      font-size:0.4rem;
    }
    .area-content {
      margin-top: 0.35rem;
    }
    .marginRig {
      margin-right: 2%;
    }
    .list-container {
      height: 100%;
      margin:0 0.15rem;
      background:rgba(11,41,94,0.5);
      .list-type {
        width: 100%;
        font-size: 0.4rem;
        font-weight: bold;
        margin-bottom: 0.2rem;
        color: #ffffff;
      }
      .list-info {
        padding: 0 0.2rem;
      }
      .icon {
        width: 0.87rem;
        height: 1.74rem;
        background: url("../../assets/img/operate/web.png") no-repeat center
          center;
        background-size: 100% 100%;
        margin-right: 0.2rem;
        &.wechat {
          background: url("../../assets/img/operate/wechat.png") no-repeat
            center center;
          background-size: 100% 100%;
        }
        &.app {
          background: url("../../assets/img/operate/app.png") no-repeat center
            center;
          background-size: 100% 100%;
        }
      }
      .operate-list {
        margin-bottom: 0.35rem;
        &:last-child {
          margin-bottom: 0;
        }
        .sub-title {
          font-size: 0.4rem;
          color: #fff;
          margin-bottom: 0.15rem;
        }
        .num-wrap {
          margin-bottom: 0.3rem;
          &.green {
            color: rgba(71, 251, 200, 1);
          }
          &.red {
            color: rgba(255, 126, 0, 1);
          }
          &.yellow {
            color: rgba(227, 208, 67, 1);
          }
          .num-list {
            width: 0.4rem;
            background: url("../../assets/img/operate/countbg.png") no-repeat
              center center;
            background-size: 100% 100%;
            font-size: 0.5rem;
            text-align: center;
            font-weight: 600;
            height: 0.96rem;
            line-height: 0.96rem;
            .v-list {
              width: 100%;
              height: 0.4rem;
              line-height: 0.4rem;
            }
            &:not(:last-child) {
              margin-right: 0.1rem;
            }
          }
        }
      }
    }
  }
}
</style>