import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/*协同统计*/
// import clueGather from '../components/clueGather/clueGather'
// /*省台频道*/
// import provinceLive from '../components/live/provinceLive'
// /*市县频道*/
// import citiesLive from '../components/live/citiesLive'
// /*融合采编*/
// import meltMediaCompilation from '../components/meltMedia/meltMediaCompilation'
// /*传播力*/
// import propagationForce from '../components/meltMedia/propagationForce'
// /*融媒舆情*/
// import publicSentiment from '../components/meltMedia/publicSentiment'
// /*终端统计*/
// import terminalStatistics from '../components/meltMedia/terminalStatistics'

import project from '../components/project/project'
import taskShow from '../components/task/task'
import clueGather from '../components/clueGather/clueGather'
import report from '../components/report/report'
import reporterMap from '../components/reporterMap/reporterMap'
import newReporterMap from '../components/newReporterMap/newReporterMap'
import operateData from '../components/operateData/operateData'
import contentData from '../components/contentData/contentData'
import dataAnalysis from '../components/dataAnalysis/dataAnalysis'

import commentList from '../components/commentlList/commentList'
import clickList from '../components/clickList/clickList'
import dangJianClickList from '../components/dangJianClickList/dangJianClickList'
import dangYuanFengCai from '../components/dangYuanFengCai/dangYuanFengCai'
import dangYuanStudy from '../components/dangYuanStudy/dangYuanStudy'
import screenLeft from '../components/screenLeft/screenLeft'
import theme from '../components/theme/theme'

import taineiNotice from '../components/taineiNotice/taineiNotice'
import articleList from '../components/articleList/articleList'
import wechatList from '../components/wechatList/wechatList'
import workRank from '../components/workRank/workRank'
import workCharts from '../components/workCharts/workCharts'
import pics from '../components/pics/pics'
import taineiInform from '../components/taineiInform/taineiInform'
import characterInformation from '../components/characterInformation/characterInformation'
import profile from '../components/profile/profile'
import heatStatistics from '../components/heatStatistics/heatStatistics'
import weather from '../components/weather/weather'
import relatedPictures from '../components/relatedPictures/relatedPictures'
import relatedReports from '../components/relatedReports/relatedReports'
import relatedVideos from '../components/relatedVideos/relatedVideos'
import contentProduction from '../components/contentProduction/contentProduction'
import communicationEffect from '../components/communicationEffect/communicationEffect'
import struggleCurve from '../components/struggleCurve/struggleCurve'
import hottestContent from '../components/hottestContent/hottestContent'
import latestContents from '../components/latestContents/latestContents'
import myMission from '../components/myMission/myMission'
import mediaIndex from '../components/mediaIndex/mediaIndex'
import currentLocation from '../components/currentLocation/currentLocation'
import intelligenceBriefing from '../components/intelligenceBriefing/intelligenceBriefing'
import intelligenceBriefing1 from '../components/intelligenceBriefing1/intelligenceBriefing'
import rtspdemo from '../components/rtspdemo/rtspdemo'

import characterOne from '../components/characterOne/characterOne'
import characterTwo from '../components/characterTwo/characterTwo'
import characterThree from '../components/characterThree/characterThree'
import characterFour from '../components/characterFour/characterFour'
import characterFive from '../components/characterFive/characterFive'
import characterSix from '../components/characterSix/characterSix'
import characterSeven from '../components/characterSeven/characterSeven'
import characterEight from '../components/characterEight/characterEight'

import newOperate from '../components/newOperate/newOperate'


const router = new Router({
    base: '/',
    routes: [
        /*
            左边大屏：/screenleft
            大标题: /theme
            资源地图: /reporterMap
            新媒体运营: /operateData
            大数据分析: /dataAnalysis

            选题展示：/project
            任务统计：/taskshow
            线索汇聚：/cluegather
            内容生产：/report
            内容统计: /contentData

            党员风采： /dangYuanFengCai
            党员学习： /dangYuanStudy

            稿件点击量 /clicklist
            稿件评论数 /commentList
            台内公告 /taineiNotice
            文稿排行 /articlelist
            工作量柱状图 /workcharts
            图集播放 /pics
            微信列表 /wechatlist
            工作排名 /workrank
            党建排名 /dangJianClickList
        */
        {
            path: '/project',
            component: project,
            meta: {
                title: '江宁大屏-选题展示'
            }
        },
        {
            path: '/taskShow',
            component: taskShow,
            meta: {
                title: '江宁大屏-任务统计'
            }
        },
        {
            path: '/clueGather',
            component: clueGather,
            meta: {
                title: '江宁大屏-线索汇聚'
            }
        },
        {
            path: '/report',
            component: report,
            meta: {
                title: '江宁大屏-报题展示'
            }
        },
        {
            path: '/reporterMap',
            component: reporterMap,
            meta: {
                title: '江宁大屏-报题展示'
            }
        },
        {
            path: '/newReporterMap',
            component: newReporterMap,
            meta: {
                title: '江宁大屏-记者连线'
            }
        },
        {
            path: '/operateData',
            component: operateData,
            meta: {
                title: '江宁大屏-新媒体运营'
            }
        },
        {
            path:'/contentData',
            component:contentData,
            meta: {
                title: '江宁大屏-内容统计'
            }
        },
        {
            path:'/dataAnalysis',
            component:dataAnalysis,
            meta: {
                title: '江宁大屏-大数据分析'
            }
        },
        // 辅屏
        // 稿件排行 点击数 完成
        {
            path:'/clickList',
            component:clickList,
            meta: {
                title: '江宁大屏-稿件排行点击量'
            }
        },
        // 稿件排行 评论数 完成
        {
            path:'/commentList',
            component:commentList,
            meta: {
                title: '江宁大屏-稿件排行评论数'
            }
        },
        // 台内公告
        {
            path:'/taineiNotice1',
            component:taineiNotice,
            meta: {
                title: '江宁大屏-台内公告'
            }
        },
        // 文稿列表 完成
        {
            path:'/articlelist',
            component:articleList,
            meta: {
                title: '江宁大屏-发布稿件'
            }
        },
        // 工作量柱状图 完成
        {
            path:'/workcharts',
            component:workCharts,
            meta: {
                title: '江宁大屏-月工作量统计'
            }
        },
        // 图集播放 完成
        {
            path:"/pics",
            component:pics,
            meta: {
                title: '江宁大屏-图集播放'
            }
        },
        // 微信列表 完成
        {
            path:'/wechatlist',
            component:wechatList,
            meta: {
                title: '江宁大屏-短视频榜'
            }
        },
        // 工作量排名 完成
        {
            path:'/workrank',
            component:workRank,
            meta: {
                title: '江宁大屏-月工作量排名'
            }
        },
        // 党建事件 点击列表 完成
        {
            path:'/dangJianClickList',
            component:dangJianClickList,
            meta: {
                title: '江宁大屏-党建事件点击量'
            }
        },
        {
            path:'/dangYuanFengCai',
            component:dangYuanFengCai,
            meta: {
                title: '江宁大屏-党员风采'
            }
        },
        {
            path:'/dangYuanStudy',
            component:dangYuanStudy,
            meta: {
                title: '江宁大屏-党员学习'
            }
        },
        {
            path:'/screenLeft',
            component:screenLeft,
            meta: {
                title: '江宁大屏-左边屏'
            }
        },
        {
            path:'/theme',
            component:theme,
            meta: {
                title: '江宁大屏-标题'
            }
        },
        {
            path:'/taineiNotice',
            component:taineiInform,
            meta: {
                title: '江宁大屏-台内公告'
            }
        },
        {
            path:'/characterInformation',
            component:characterInformation,
            meta: {
                title: '江宁大屏-人物信息'
            }
        },
        {
            path:'/profile',
            component:profile,
            meta: {
                title: '江宁大屏-人物简介'
            }
        },
        {
            path:'/heatStatistics',
            component:heatStatistics,
            meta: {
                title: '江宁大屏-热度统计'
            }
        },
        {
            path:'/weather',
            component:weather,
            meta: {
                title: '江宁大屏-今日天气'
            }
        },
        {
            path:'/relatedPictures',
            component:relatedPictures,
            meta: {
                title: '江宁大屏-相关图片'
            }
        },
        {
            path:'/relatedReports',
            component:relatedReports,
            meta: {
                title: '江宁大屏-相关报道'
            }
        },
        {
            path:'/relatedVideos',
            component:relatedVideos,
            meta: {
                title: '江宁大屏-相关视频'
            }
        },
        {
            path:'/contentProduction',
            component:contentProduction,
            meta: {
                title: '江宁大屏-内容生产'
            }
        },
        {
            path:'/communicationEffect',
            component:communicationEffect,
            meta: {
                title: '江宁大屏-传播效果'
            }
        },
        {
            path:'/struggleCurve',
            component:struggleCurve,
            meta: {
                title: '江宁大屏-奋斗曲线'
            }
        },
        {
            path:'/hottestContent',
            component:hottestContent,
            meta: {
                title: '江宁大屏-最热内容'
            }
        },
        {
            path:'/latestContents',
            component:latestContents,
            meta: {
                title: '江宁大屏-最新内容'
            }
        },
        {
            path:'/myMission',
            component:myMission,
            meta: {
                title: '江宁大屏-我的任务'
            }
        },
        {
            path:'/mediaIndex',
            component:mediaIndex,
            meta: {
                title: '江宁大屏-融媒前台'
            }
        },
        {
            path:'/currentLocation',
            component:currentLocation,
            meta: {
                title: '江宁大屏-当前位置'
            }
        },
        {
            path:'/intelligenceBriefing',
            component:intelligenceBriefing,
            meta: {
                title: '江宁大屏-智能人物简报'
            }
        },

        {
            path:'/characterOne',
            component:characterOne,
            meta: {
                title: '江宁大屏-人物信息融媒首页合并'
            }
        },
        {
            path:'/intelligenceBriefing1',
            component:intelligenceBriefing1,
            meta: {
                title: '2江宁大屏-智能人物简报'
            }
        },
        {
            path:'/characterTwo',
            component:characterTwo,
            meta: {
                title: '江宁大屏-当前位置通知公告合并'
            }
        },
        {
            path:'/characterThree',
            component:characterThree,
            meta: {
                title: '江宁大屏-人物简介我的任务合并'
            }
        },
        {
            path:'/characterFour',
            component:characterFour,
            meta: {
                title: '江宁大屏-热度统计最新内容合并'
            }
        },
        {
            path:'/characterFive',
            component:characterFive,
            meta: {
                title: '江宁大屏-今日天气内容生产合并'
            }
        },
        {
            path:'/characterSix',
            component:characterSix,
            meta: {
                title: '江宁大屏-相关图片传播效果合并'
            }
        },
        {
            path:'/characterSeven',
            component:characterSeven,
            meta: {
                title: '江宁大屏-相关报道最热内容合并'
            }
        },
        {
            path:'/characterEight',
            component:characterEight,
            meta: {
                title: '江宁大屏-相关视频奋斗曲线合并'
            }
        },
        {
            path:'/rtspdemo',
            component:rtspdemo,
            meta: {
                title: '江宁大屏-rtsp demo'
            }
        },
        {
            path:'/newOperate',
            component:newOperate,
            meta: {
                title: '平台数据'
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      document.title = to.meta.title
    }
    next()
})

export default router;
