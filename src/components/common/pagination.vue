<template>
    <ul class="pagination sys-flex sys-flex-center">
        <li class="total-num" :class="{'disabled':pages==pages}">
            <a href="javascript:void(0);">
                共{{nums}}条
            </a>
        </li>
        <!-- <li class="pre-page mr10" :class="{'disabled' : curPage == 1}">
            <a href="javascript:;" @click="goPage(curPage==1?1:curPage-1)" aria-label="Previous">
                    <span aria-hidden="true">上一页</span>
            </a>
        </li> -->
        <li class="page-list" v-for="(page , index) in indexs" :key="index" :class="{'active':page==curPage}">
            <a class="page-list-item" href="javascript:;" v-if="page" @click="goPage(page)">{{page}}</a>
            <a class="page-list-dot" href="javascript:;" v-else>···</a>
        </li>
        <!-- <li class="next-page" :class="{'disabled':curPage==pages}">
            <a href="javascript:;" @click="goPage(curPage==pages?pages:curPage+1)" aria-label="Next">
                <span aria-hidden="true">下一页</span>
            </a>
        </li> -->
    </ul>
</template>

<script>
export default {
    name: 'pagination',
    data () {
        return {
            curPage : 1,
            count : 10
        }
    },
    props: {
        currrent : {
            type : Number,
            default : 0
        },
        nums : {
            type : Number,
            default : 0
        }
    },

    watch :{
        currrent(page){
            this.curPage = page;
        },
        nums(n){
            this.nums = n;
        }
    },

    computed: {
        pages : function(){
            return Math.ceil(this.nums/this.count);
        },
        indexs: function () {
            let pageNum =  Math.ceil(this.nums/this.count); // 总页数
            let index = this.curPage; // 当前页
            let arr = [];
            if (pageNum <= 6) {
                for (let i = 1; i <= pageNum; i++) {
                    arr.push(i)
                }
                return arr
            }
            // 对页码显示进行处理，动态展示
            if (index <= 3) return [1, 2, 3, 4, 0, pageNum];
            if (index >= pageNum - 1) return [1, 0, pageNum - 3, pageNum - 2, pageNum - 1, pageNum];
            if (index === 4) return [1, 2, 3, 4, 5, 0, pageNum];
            if (index === pageNum - 2) return [1, 0, pageNum - 4, pageNum - 3, pageNum - 2, pageNum - 1, pageNum];
            return [1, 0, index - 2,index - 1, index, index + 1, index + 2, 0, pageNum];
        }
    },

    components: {
    },

    created () {},

    mounted(){},

    methods: {
        goPage: function (page) {
            if (page != this.curPage) {
                 this.curPage = page;
                 this.$emit('goToPage', this.curPage);
             }else{
                 console.log('Already in the current page');
             }
        },

        // 设置按钮禁用样式
        setButtonClass: function (isNextButton) {
            if (isNextButton) {
                return this.currrent >= this.pages ? "page-button-disabled" : ""
            }
            else {
                return this.currrent <= 1 ? "page-button-disabled" : ""
            }
        }
       
    }
}
</script>

<style lang="scss" scoped>
    .pagination{
        justify-content: flex-end;
        height: 100%;
        color: RGBA(103, 127, 138, 1);
        // padding: 0 0.7rem;
        .pre-page , .next-page{
            a{
                color: rgba(0,192,255,1);
            }
            &.disabled{
                a{
                    color: RGBA(103, 127, 138, 1);
                }
            }
        }
        a{
            font-size: 0.2rem;
            display: block;
            color: RGBA(103, 127, 138, 1);
        }
        .mr10{
            margin-right: 0.3rem;
        }
        .page-list{
            &.active , &:hover{
               a{
                   &.page-list-item{
                       background:rgba(0,192,255,1);
                        color: #fff;
                   }
                }
           }
           margin-left: 0.1rem;
           a{
                width: 0.3rem;
                height: 0.3rem;
                line-height: 0.3rem;
                text-align: center;
                border-radius: 0.05rem;
                font-size: 0.18rem;
               color:rgba(103,127,138,1);
               &.page-list-item{
                    background:rgba(103,127,138,0.5);
               }
               &.page-list-dot{
                    letter-spacing: 0.05rem;
                    font-weight: bold;
               }
           }
           
       }
    }
</style>


