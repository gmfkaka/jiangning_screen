<template>
    <div class="main-wrap sys-flex">
        <div class="main-left">
            <clue-gather :clue-show="clueShow"/>
            <project :project-show="projectShow"/>
            <task :task-show="taskShow"/>
        </div>
        <div class="main-right">
            <report :report-show="reportShow" :auto-play="reportAutoPlay"/>
            <content-data />
        </div>
        <div class="refresh" v-if="refresh" @click="refreshscreen">刷新</div>
    </div>
</template>

<script>
import Project from '../project/project.vue'
import Task from '../task/task.vue'
import clueGather from '../clueGather/clueGather.vue'
import Report from '../report/report'
import contentData from '../contentData/contentData'
export default {
    name: 'screenLeft',
    data () {
        return {
            clueShow : null,
            taskShow : null,
            projectShow : null,
            reportShow : null,
            reportAutoPlay : true,
            refresh : false

        }
    },
    components: {
        Project,
        Task,
        clueGather,
        Report,
        contentData,
        
    },

    created () {
        window.socketClient = new WebSocket('wss://pushserver-api.cloud.hoge.cn/server_all/comment/live_358888?custom_appid=358&custom_appkey=u2H7JB2scb0mPg0Pu7Vpguifg5rMbO1v&device_token=32432weqdwaqdqw');
        window.socketClient.onopen = () => {
            console.log('~~~~ connect ~~~~');
        };
    },

    mounted(){
        window.socketClient.onmessage = (evt) => {
            var res = JSON.parse(evt.data);
            if( res.text){
                if(JSON.parse(res.text).type == 'task' ){
                    this.taskShow = evt; 
                }else if(JSON.parse(res.text).type == 'project'){
                    this.projectShow = evt; 
                }else if(JSON.parse(res.text).type == 'report'){
                    this.reportShow = evt; 
                }else if(JSON.parse(res.text).type == 'reportAutoPlay'){
                    this.reportAutoPlay = JSON.parse(JSON.parse(evt.data).text).autoplay;
                }else if(JSON.parse(res.text).type == 'clue'){
                    this.clueShow = evt; 
                }else if(JSON.parse(res.text).type == 'refreshscreen'){
                    window.location.reload();
                }
            }
        }
        let serach = window.location.href.split('?')[1];
        window.control = serach && serach.indexOf('control') != -1;
        if(window.control){
            this.refresh = true;
        }
    },

    methods: {
        refreshscreen(){
            if(window.control){
                var msg = {"type":"refreshscreen"};
                window.socketClient.send(JSON.stringify(msg));
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .main-wrap{
        width: 100%;
        height: 100%;
        .main-left{
            width: 66.66%;
            height: 100%;
        }
        .main-right{
            width: 33.33%;
        }
        .refresh{
            position: absolute;
            right: 0;
            width: 1rem;
            height: 1rem;
            background-size: 0.5rem 0.5rem; 
            color: #fff;
            font-size: 0.32rem;
            line-height: 1rem;
            text-align: center;
        }
    }
</style>