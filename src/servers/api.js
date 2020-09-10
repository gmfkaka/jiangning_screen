import Vue from 'vue';
import http from './http';
import axios from 'axios';
import {exists} from 'fs';
import qs from 'qs';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['http-x-h5-version'] = 1;
axios.defaults.headers.post['x-client-version'] = 1314;

const custom_appid = '358';
const custom_appkey = 'u2H7JB2scb0mPg0Pu7Vpguifg5rMbO1v';
const baseUrl = 'https://monitor-screen.cloud.hoge.cn';

/*线索汇聚*/
export const getClueList = (type , page, size) => axios.get(`${baseUrl}/index.php?m=Apidaping&c=hotspot&a=${type}&custom_appid=${custom_appid}&custom_appkey=${custom_appkey}&platform=workcall&custom_id=164`);
/*获取任务*/
export const getTask = (count) => axios.get(`${baseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallTaskList&custom_appid=${custom_appid}&custom_appkey=${custom_appkey}&count=${count}&need_page=1`);
/*获取任务详情*/
export const getTaskDetail = (id) => axios.get(`${baseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallTaskDetail&custom_appid=${custom_appid}&custom_appkey=${custom_appkey}&id=${id}`)
/*获取报题*/
export const getReport = (count , page) => axios.get(`${baseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallReportList&create_time=1&custom_appid=${custom_appid}&custom_appkey=${custom_appkey}&count=${count}&page=${page}&need_page=1`);
/*获取今日报题*/
export const getTodayReportNum = () => axios.get(`${baseUrl}/index.php?m=Apidaping&c=stat&a=getTodayReportNum&custom_appid=${custom_appid}&custom_appkey=${custom_appkey}`);
/*获取报题详情*/
export const getReportDetail = (id) => axios.get(`${baseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallSubjectDetail&custom_appid=${custom_appid}&custom_appkey=${custom_appkey}&id=${id}`)
/*获取选题*/
export const getProject = (count,page) => axios.get(`${baseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallSubjectList&custom_appid=${custom_appid}&custom_appkey=${custom_appkey}&count=${count}&page=${page}&need_page=1`);
/*获取选题详情*/
export const getProjectDetail = (id) => axios.get(`${baseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallSubjectDetail&custom_appid=${custom_appid}&custom_appkey=${custom_appkey}&id=${id}`)
/*获取今日选题*/
export const getTodayProject = () => axios.get(`https://monitor-screen.cloud.hoge.cn/Apidaping/ZWZhNDNmMW/getWorkCallSubjectList?create_time=1&count=100`)

/*获取选题参与人*/
export const getProjectMember = (id) => axios.get(`https://monitor-screen.cloud.hoge.cn/Apidaping/ZWZhNDNmMW/getWorkCallSubjectDetail?id=${id}`)

/*获取运营数据*/
export const getOperateData = () => axios.get(`${baseUrl}/index.php?m=Apidaping&c=stat&a=getTerminalStatistics&custom_appid=${custom_appid}&custom_appkey=${custom_appkey}`);
/*获取记者列表*/
export const getReporter = (name = '') => axios.get(`${baseUrl}/index.php?m=Apidaping&c=stat&a=getWorkCallConnecterList&custom_appid=${custom_appid}&custom_appkey=${custom_appkey}&member_name=${name}`);
/*大数据分析*/
/*获取新闻标题*/
export const getNews = () => axios.get(`https://monitor.cloud.hoge.cn/hotnews/titles/`);
/*获取地区分布*/
export const getArea = (title) => axios.get(`https://news.cloud.hoge.cn/hotspots/consensus/area/?title=${title}`);
/*获取年龄分布*/
export const getAge = (title) => axios.get(`https://news.cloud.hoge.cn/hotspots/consensus/age/?title=${title}`);
/*获取性别分布*/
export const getSex = (title) => axios.get(`https://news.cloud.hoge.cn/hotspots/consensus/sex/?title=${title}`);
/*获取情感分析*/
export const getEmotion = (title) => axios.get(`https://news.cloud.hoge.cn/hotspots/consensus/sentiment/?title=${title}`);




/*获取热点话题*/
export const getHotTopicList = (page,size) => axios.get(`${baseUrl}/index.php?m=Apidaping&c=hotspot&a=getHotTopicList&flag=weekly&category=politics&custom_appid=${custom_appid}&custom_appkey=${custom_appkey}&size=${size}&page=${page}`);
/*热点话题分析*/
export const getHotTopicDetail = (id,num) => axios.get(`${baseUrl}/index.php?m=Apidaping&c=hotspot&a=mediaAnalysis&id=${id}&num=${num}&custom_appid=${custom_appid}&custom_appkey=${custom_appkey}`);
export const getLocalNewsList = (page,size) =>  axios.get(`${baseUrl}/index.php?m=Apidaping&c=hotspot&a=bigDataAnalysisList&custom_appid=${custom_appid}&custom_appkey=${custom_appkey}&size=${size}&page=${page}`);
export const getLocalNewsDetail = (content_id) =>  axios.get(`${baseUrl}/index.php?m=Apidaping&c=hotspot&a=bigDataAnalysisDetail&custom_appid=${custom_appid}&custom_appkey=${custom_appkey}&content_id=${content_id}`);



/*e党建*/
export const getStudyData = (param) => axios.post(`https://dj-api-core.hoge.cn/api/SfhZJqytts/components/?api.page=1&api.size=6`,param)
/*获取浏览总数*/
export const getCloudAccess = () => axios.get(`${baseUrl}/index.php/index.php?m=Apidaping&c=m2odata&a=getCloudAccess&custom_appid=${custom_appid}&custom_appkey=${custom_appkey}`);
/*获取微信数据*/
export const getWeixinTotal = () => axios.get(`https://monitor-screen.cloud.hoge.cn/Apidaping/ZWZhNDNmMW/getOperationalData?source=app,weiBo,weChat,shortVideo`);
/*获取专题*/
export const getContentSta = (type) => axios.get(`${baseUrl}/index.php?m=Apidaping&c=m2odata&a=plusDailyStatistics&type=${type}&custom_appid=${custom_appid}&custom_appkey=${custom_appkey}`);

/* 稿件排行 点击数 */
export const getRankList = () => axios.get(`https://monitor-screen.cloud.hoge.cn/Apidaping/ZWZhNDNmMW/getM2OPlusRankList?jnType=click`)
/* 稿件排行 评论数 */
export const getNewsCommentRank = () => axios.get(`https://monitor-screen.cloud.hoge.cn/Apidaping/ZWZhNDNmMW/getM2OPlusRankList?jnType=comment`)
/* 文稿列表 */
export const getNewsList = () => axios.get(`https://monitor-screen.cloud.hoge.cn/Apidaping/ZWZhNDNmMW/getM2OPlusRankList?jnType=publish`)
/* 微信文稿列表 */
export const getWechatNewsList = () => axios.get(`https://monitor-screen.cloud.hoge.cn/Apidaping/ZWZhNDNmMW/getM2OPlusRankList?jnType=shortVideo`)
/* 图集 */
export const getPics = () => axios.get(`https://monitor-screen.cloud.hoge.cn/Apidaping/ZWZhNDNmMW/getM2OPlusRankList?jnType=gallery`)
/* 工作量排名 */
export const getWorkRank = () => axios.get(`${baseUrl}/index.php?m=Apidaping&c=m2odata&a=workloadRank&guid=Nzk0OTA4YT`)
/* 工作量柱状图 */
export const getWorkChart = () => axios.get(`https://monitor-screen.cloud.hoge.cn/Apidaping/ZWZhNDNmMW/getM2OPlusWorkChart`)
/* 台内公告 */
export const getNotice = () => axios.get(`https://monitor-screen.cloud.hoge.cn/Apidaping/ZWZhNDNmMW/getWorkCallNoticeList`)
/* 新媒体运营微博数据 */
export const getWeiboData = () => axios.get(`${baseUrl}/index.php?m=Apidaping&c=m2odata&a=getContentWeiBoTotal&guid=Nzk0OTA4YT`)
/* 新媒体运营APP数据 */
export const getAppData = () => axios.get(`${baseUrl}/index.php?m=Apidaping&c=m2odata&a=getContentAppTotal&guid=Nzk0OTA4YT`)
/*  短视频 */
export const getVideoData = () => axios.get(`${baseUrl}/index.php?m=Apidaping&c=m2odata&a=getContentShortVideoTotal&guid=Nzk0OTA4YT`)

/* 江宁融媒 */
export const getCharacterDetail = (figure_id) => axios.get(`${baseUrl}/index.php?m=Apidaping&c=M2OPLUS_topic&a=detail&figure_id=${figure_id}&guid=Nzk0OTA4YT`)
export const getContentDetail = (figure_id) => axios.get(`${baseUrl}/index.php?m=Apidaping&c=M2OPLUS_topic&a=columnContent&figure_id=${figure_id}&guid=Nzk0OTA4YT`)
export const getHotList = (user_id) => axios.get(`${baseUrl}/index.php?m=Apidaping&c=M2OPLUS_content&a=getRankList&create_user_id=${user_id}&guid=Nzk0OTA4YT`)
export const getNewList = (user_id) => axios.get(`${baseUrl}/index.php?m=Apidaping&c=M2OPLUS_content&a=newest&create_user_id=${user_id}&guid=Nzk0OTA4YT`)
export const getUserId = () => axios.get(`${baseUrl}/index.php?m=Apidaping&c=user&a=login&user_name=18751476772&password=Rui802372h&custom_appid=358&custom_appkey=u2H7JB2scb0mPg0Pu7Vpguifg5rMbO1v`)
export const getHotSpot = (key) => axios.get(`${baseUrl}/index.php?m=Apidaping&c=hotspot&a=searchStat&k=${key}`)
export const getWorkLoad = (user_id) => axios.get(`${baseUrl}/index.php?m=Apidaping&c=M2OPLUS_statistical&a=workload&create_user_id=${user_id}&guid=Nzk0OTA4YT`)
export const getEffects = (user_id) => axios.get(`${baseUrl}/index.php?m=Apidaping&c=M2OPLUS_statistical&a=effects&create_user_id=${user_id}&guid=Nzk0OTA4YT`)
export const getWorkLoadRank = (user_id) => axios.get(`${baseUrl}/index.php?m=Apidaping&c=M2OPLUS_statistical&a=PersonalRank&create_user_id=${user_id}&guid=Nzk0OTA4YT`)
export const getUserInformation = (token, id) => axios.get(`https://sys-team.cloud.hoge.cn/Apisys/members/detail?access_token=${token}&other_user_id=${id}`)
export const getMission = (token, id) => axios.get(`${baseUrl}/index.php?m=Apidaping&c=WORKCALL_task&a=show&access_token=${token}&other_user_id=${id}&guid= Nzk0OTA4YT`)
// 开启ai检测的数据接口
export const startScan = (callback_url) => axios.post(`http://10.1.1.22:8011/face/recognize/live/start`, {url : `rtmp://10.1.1.22:1935/live/jiangning`, callback_url: `http://10.1.1.22:8011/websocket/callback/${callback_url}`, quality_threshold: 0.01, min_face_size: 100, buffer_ms: 60000, timeout: 10, create_thumbnail : true, timeout: 50});
// export const startScan = (callback_url) => axios.post(`http://10.0.1.111:8011/face/recognize/live/start`, {url : `rtmp://10.0.1.111:1935/live/aitest`, callback_url: `http://10.0.1.111:8011/websocket/callback/${callback_url}`, quality_threshold: 0.01, min_face_size: 100, buffer_ms: 60000, timeout: 10, create_thumbnail : true, timeout: 50});
// 关闭ai数据接口
// export const stopScan = (id) => axios.post(`http://10.1.1.22:8011/face/recognize/live/stop`, {id:`${id}`});
// export const stopScan = (id) => axios.post(`http://10.0.1.111:8011/face/recognize/live/stop`, {id:`${id}`});
// 获取天气详情接口
export const getWeather = (city) => axios.get(`${baseUrl}/index.php?m=Apidaping&c=CLOUD_weather&a=detail&city_name=${city}`)
/*检测直播流是否断掉的轮训接口*/
export const getStop = () => axios.get(`${baseUrl}/index.php/index.php?m=Apidaping&c=CLOUD_websocket&a=disable`)
/*发送websocket断连通知*/
export const isWebsocket = (link, name) => axios.get(`${baseUrl}/index.php?m=Apidaping&c=CLOUD_websocket&a=long_links_send&type=2&link=${link}&name=${name}`)
/*获取宣传视频*/
export const getVideo = () => axios.get(`https://monitor-screen.cloud.hoge.cn/Apidaping/ZWZhNDNmMW/getVideoList`)
/*获取江宁天气新接口*/
export const getJiangningWeather = (city) => axios.get(`https://monitor-screen.cloud.hoge.cn/Apidaping/ZWZhNDNmMW/getWeather?city_name=${city}`)

Vue.mixin({
  beforeCreate () {
    const options = this.$options;
    if (options.api) {
      this.$api = options.api;
    } else if (options.parent && options.parent.$api) {
      this.$api = options.parent.$api;
    }
  }
});
