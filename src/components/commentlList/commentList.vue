<template>
  <div class="main-wrap">
    <div class="comment-wrap">
      <div class="comment-title overhidden">
        <div class="comment-list-wrap">
          <div
            class="comment-list sys-flex sys-flex-center animated"
            v-for="(v,k) in reportList"
            :key="k"
            :class="{'fadeInLeft' : v.title}"
            v-bind:style="{'animation-delay' : k/2+'s'}"
          >
            <div class="comment-rank first" v-if="k===0">01</div>
            <div class="comment-rank second" v-if="k===1">02</div>
            <div class="comment-rank third" v-if="k===2">03</div>
            <div class="comment-rank others" v-if="k>2">0{{k+1}}</div>
            <div class="comment-list-title overhidden">{{v.title}}</div>
            <div class="comment-user">{{v.author}}</div>
            <div class="comment-count">{{v.comment_num}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentList",
  data() {
    return {
      reportList: [],
      count: 0
    };
  },
  created() {
    this.getReportList();
  },

  methods: {
    getReportList() {
      if (this.countNum) {
        this.reportList = [];
        clearInterval(this.countNum);
        this.count = 0;
      }
      this.$api.getNewsCommentRank().then(response => {
        if (response.data.result.length) {
          this.list = response.data.result;
          this.initList();
        }
      });
    },

    getList() {
      setTimeout(() => {
        this.initList();
      }, 1000);
    },

    initList() {
      this.reportList = this.list.slice(
        this.count,
        this.count + 6 > this.list.length ? this.list.length : this.count + 6
      );
      this.count += 6;
      this.countNum = setInterval(() => {
        if (this.count < this.list.length) {
          this.reportList = [];
          setTimeout(() => {
            this.reportList = this.list.slice(this.count, this.count + 6);
            this.count += 6;
          }, 100);
        } else {
          this.reportList = [];
          clearInterval(this.countNum);
          this.count = 0;
          // this.getList();
          this.getReportList();
        }
      }, 15000);
    }
  }
};
</script>

<style lang="scss" scoped>
.main-wrap {
  width: 100%;
  height: 10.8rem;
  padding: 0rem 0.3rem 0.15rem;
  position: relative;
  background: url("../../assets/img/commentList/bg.png") no-repeat center center;
  background-size: 100% 100%;
  .comment-wrap {
    width: 100%;
    height: 100%;
    .comment-title {
      width: 100%;
      height: 100%;
      background: url("../../assets/img/commentList/title.png") no-repeat top
        center;
      background-size: 100%;
    }
    .comment-list-wrap {
      margin-top: 1.8rem;
      height: 8.64rem;
      padding: 0 0.3rem;
      background: url("../../assets/img/commentList/border.png") no-repeat
        center center;
      background-size: 100% 100%;
    }
    background-size: 100% 100%;
    .comment-list {
      color: #fff;
      height: 16%;
      font-size: 0.64rem;
      border-bottom: 0.01rem solid rgba(63, 230, 255, 0.2);
      font-family: PingFangSC-Regular;
      .comment-rank {
        width: 0.36rem;
        height: 0.36rem;
        font-size: 0.24rem;
        text-align: center;
        border-radius: 0.03rem;
        &.first {
          background: rgba(240, 65, 65, 1);
        }
        &.second {
          background: rgba(240, 168, 65, 1);
        }
        &.third {
          background: rgba(193, 65, 240, 1);
        }
        &.others {
          background: rgba(50, 205, 228, 1);
        }
      }
      .comment-list-title {
        font-size: 0.36rem;
        font-weight: 400;
        padding-left: 0.4rem;
        width: 75%;
      }
      .comment-user {
        background: url("../../assets/img/commentList/name.png") no-repeat
          center left;
        background-size: 0.25rem 0.28rem;
        padding-left: 0.4rem;
        font-size: 0.28rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #fff;
        width: 12%;
      }
      .comment-count {
        background: url("../../assets/img/commentList/comment.png") no-repeat
          center left;
        background-size: 0.25rem 0.28rem;
        padding-left: 0.4rem;
        font-size: 0.3rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #fff;
      }
    }
  }
}
</style>
