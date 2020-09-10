<template>
    <div class="main-wrap">
        <div class="title"></div>
    </div>
</template>

<script>
export default {
    name: 'theme',
    data () {
        return {}
    },
    components: {
    },

    created () {
    },

    mounted(){

    },

    methods: {

       
    }
}
</script>

<style lang="scss" scoped>
    .main-wrap{
        width:100%;
        height:100%;
        // padding:3rem 1.5rem;
        background: url('../../assets/img/bg.png') no-repeat center center;
        background-size: 100% 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .title{
            // width: 100%;
            // height: 100%;
            width: 16rem;
            height: 2.93rem;
            background: url('../../assets/img/title.png') no-repeat center center;
            background-size: 100% 100%;
        }
    }
</style>