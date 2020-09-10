<template>
  <div class="main-wrap">
    <div class="operate-wrap sys-flex sys-flex-wrap flex-justify-between">
      <div class="list-container marginBot marginRig">
        <div class="list-type sys-flex sys-flex-center flex-justify-center">微信</div>
        <div class="sys-flex-one list-info">
          <div class="operate-list sys-flex-one sys-flex sys-flex-center">
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
          <div class="operate-list sys-flex-one sys-flex sys-flex-center">
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
          <div class="operate-list sys-flex-one sys-flex sys-flex-center">
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
          <div class="operate-list sys-flex-one sys-flex sys-flex-center">
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
      <div class="list-container marginBot">
        <div class="list-type sys-flex sys-flex-center flex-justify-center">客户端</div>
        <div class="sys-flex-one list-info">
          <div class="operate-list sys-flex-one sys-flex sys-flex-center">
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
          <div class="operate-list sys-flex-one sys-flex sys-flex-center">
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
          <div class="operate-list sys-flex-one sys-flex sys-flex-center">
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
          <div class="operate-list sys-flex-one sys-flex sys-flex-center">
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
      <div class="list-container marginRig">
        <div class="list-type sys-flex sys-flex-center flex-justify-center">微博</div>
        <div class="sys-flex-one list-info">
          <div class="operate-list sys-flex-one sys-flex sys-flex-center">
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
          <div class="operate-list sys-flex-one sys-flex sys-flex-center">
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
          <div class="operate-list sys-flex-one sys-flex sys-flex-center">
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
          <div class="operate-list sys-flex-one sys-flex sys-flex-center">
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
      <div class="list-container">
        <div class="list-type sys-flex sys-flex-center flex-justify-center">短视频</div>
        <div class="sys-flex-one list-info">
          <div class="operate-list sys-flex-one sys-flex sys-flex-center">
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
          <div class="operate-list sys-flex-one sys-flex sys-flex-center">
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
          <div class="operate-list sys-flex-one sys-flex sys-flex-center">
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
          <div class="operate-list sys-flex-one sys-flex sys-flex-center">
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
    this.getWeixinTotal()
    this.getWeiboData()
    this.getAppData()
    this.getVideoData()
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
      this.getWeiboData()
      this.getAppData()
      this.getVideoData()
    }, 10000)
  },
  methods: {
    getWeixinTotal () {
      this.$api.getWeixinTotal().then(response => {
        this.wein_new_user = this.preFixInterge(
          response.data.result.new_user,
          8
        )
        this.read_count = this.preFixInterge(
          response.data.result.int_page_read_count,
          8
        )
        this.cumulate_user = this.preFixInterge(
          response.data.result.cumulate_user,
          8
        )
        this.new_num = this.preFixInterge(response.data.result.msg_count, 8)
      })
    },
    preFixInterge (num, n) {
      return (Array(n).join(0) + num).slice(-n).split('')
    },
    calculation (data) {
      if (data) {
        return data.length
      }
    },
    getWeiboData () {
      this.$api.getWeiboData().then(response => {
        if (
          response &&
          response.data &&
          response.data.result &&
          response.data.result.yesterday_click_count
        ) {
          this.wbdata_one = this.preFixInterge(
            response.data.result.yesterday_click_count,
            8
          )
          this.wbdata_two = this.preFixInterge(
            response.data.result.yesterday_like_count,
            8
          )
          this.wbdata_three = this.preFixInterge(
            response.data.result.new_user,
            8
          )
          this.wbdata_four = this.preFixInterge(
            response.data.result.cumulate_user,
            8
          )
        }
      })
    },
    getAppData () {
      this.$api.getAppData().then(response => {
        if (response && response.data && response.data.result) {
          this.appdata_one = this.preFixInterge(
            response.data.result.yesterday_click_count,
            8
          )
          this.appdata_two = this.preFixInterge(
            response.data.result.today_publish_num,
            8
          )
          this.appdata_three = this.preFixInterge(
            response.data.result.new_user,
            8
          )
          this.appdata_four = this.preFixInterge(
            response.data.result.cumulate_user,
            8
          )
        }
      })
    },
    getVideoData () {
      this.$api.getVideoData().then(response => {
        if (response && response.data && response.data.result) {
          this.memberRegisterTotalNum = this.preFixInterge(
            response.data.result.yesterday_like_count,
            8
          )
          this.cloudAccess = this.preFixInterge(
            response.data.result.today_msg_count,
            8
          )
          this.publishTodayTotal = this.preFixInterge(
            response.data.result.new_user,
            8
          )
          this.publishTotal = this.preFixInterge(
            response.data.result.cumulate_user,
            8
          )
        }
      })
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
    padding: 1.15rem 0.3rem 0.85rem;
    background: url("../../assets/img/operate/border.png") no-repeat center
      center;
    background-size: 100% 100%;
    .marginBot {
      margin-bottom: 2%;
    }
    .marginRig {
      margin-right: 2%;
    }
    .list-container {
      width: 49%;
      height: 52%;
      background: rgba(16, 79, 189, 0.08);
      .list-type {
        width: 100%;
        height: 0.55rem;
        font-size: 0.35rem;
        color: #00ccff;
        background: rgba(16, 79, 189, 0.15);
      }
      .list-info {
        padding: 0 0.5rem;
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
        height: 0.8rem;
        margin-bottom: 0.065rem;
        &:last-child {
          margin-bottom: 0;
        }
        .sub-title {
          font-size: 0.3rem;
          color: #fff;
          margin-right: 0.2rem;
        }
        .num-wrap {
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
            width: 0.1rem;
            background: url("../../assets/img/operate/countbg.png") no-repeat
              center center;
            background-size: 100% 100%;
            font-size: 0.4rem;
            text-align: center;
            font-weight: 600;
            height: 0.8rem;
            line-height: 0.8rem;
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