<template>
  <div class="main-wrap">
    <div class="current-location">
      <div class="location-title sys-flex sys-flex-center flex-justify-center">
        <div class="title-img">
          <img src="../../assets/img/briefing/title_dingwei_icon.png" />
        </div>
        <div class="title-content">当前位置：{{local}}</div>
      </div>
      <div class="location-body">
        <div id="reporter-map" ref="allmap" class="reporter-map"></div>
        <div class="map-detail" v-if="isShow">
          <div class="map-title">{{detailData.title}}</div>
          <div class="map-img">
            <img :src="detailData.url" />
          </div>
          <div class="map-content">{{detailData.content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'currentLocation',
  data () {
    return {
      defaultImg: require('../../assets/img/briefing/dingwei_default.png'),
      detailData: '',
      local: '江宁',
      isShow: false,
      currentIndex: 0,
      jsonData: [{
        lng: 118.750153, lat: 31.905082, title: "牛首山", content: "位于南京市江宁区，文化底蕴深厚，是佛教牛头禅宗的开教处和发祥地。牛首山风景宜人，每岁届春金陵百姓倾城出游，故有“春牛首”之称。清乾隆年间“牛首烟岚”列入金陵四十八景中。这里已经成为佛教至高圣物佛祖释加牟尼顶骨舍利的永久供奉地。", url: require("../../assets/media/1.jpg")
      }, {
        lng: 119.073458, lat: 32.064515, title: "汤山温泉旅游度假区", content: "汤山温泉旅游度假区位于南京市江宁区汤山街道，是世界著名温泉疗养区 ，居中国四大温泉疗养区之首，是中国唯一获得欧洲、日本温泉水质国际双认证的温泉，被称之为“圣汤”、“帝王温泉”。2012年10月世界温泉及气候养生联合会授予汤山“世界著名温泉小镇”称号，并确定汤山为“世界温泉论坛”永久会址；2014年被评为“中国最佳休闲度假旅游目的地”；2015年10月汤山温泉旅游度假区成为首批国家级旅游度假区。", url: require("../../assets/media/2.jpg")
      }, {
        lng: 118.889716, lat: 31.9093, title: "汤山-方山国家地质公园", content: "这座远古喷发的火山，就是久负盛名的方山。方山位于南京市江宁区科学园内，远望如一方印，古称印山。方山虽不高，但由于位于平原之上，仍不失巍峨挺拔。因其独特的地貌奇观，现已成为国家地质公园。", url: require("../../assets/media/3.jpg")
      }, {
        lng: 118.72033, lat: 31.808161, title: "银杏湖", content: "位于江宁谷里街道的银杏湖大道520号，以银杏湖为中心，依山傍水。全省规模最大的生态主题游乐项目。景区以银杏湖为中心，依山傍水，鸟飞鱼跃、自然生态。音乐喷泉、大型花钟、海螺广场、梦幻迷宫、黄金沙滩，充满纯真童趣。大片樱花、桃花、梅花、山茶花、月季花、杜鹃花，打造四季花海，千年银杏林、天鹅湖、双桥湖心岛，步移景换，绿色生态。景区另外还有高尔夫球场、别墅酒店等配套设施。", url: require("../../assets/media/4.jpg")
      }, {
        lng: 119.039335, lat: 32.070973, title: "紫清湖温泉度假区", content: "紫清湖温泉度假区坐落于汤山，是我国最大的集珍稀动物扬子鳄、娃娃鱼的繁殖、饲养、研发、科普教育、生态旅游、温泉休闲度假于一体的大型产业园，是国家AAAA级旅游风景区。紫清湖拥有南京规模最大的水上高尔夫练习场、华东地区最大的扬子鳄观赏基地。", url: require("../../assets/media/5.jpg")
      }, {
        lng: 119.069949, lat: 32.071912, title: "汤家家温泉民宿村", content: "汤家家温泉民宿村，江苏省四星级乡村旅游区，是集温泉泡脚、温泉民宿、民国精品菜馆等为一体的温泉村。依山傍水，村庄里的一条小溪把村子一分为二，左手的农家改造成民宿，拥有各式风格情调；右手的广播绿地，也让人心旷神怡。", url: require("../../assets/media/6.jpg")
      }, {
        lng: 119.070063, lat: 32.059462, title: "蒋介石温泉别墅", content: "温泉别墅坐落在汤山镇汤泉路3号，这里层峦环抱，绿树掩映，鸟语花香，湿泉喷涌，也是江苏省文保单位。我国近代具有重要历史价值的民国建筑，是蒋介石、宋美龄专用温泉别墅，中西结合，古朴雅静。", url: require("../../assets/media/7.jpg")
      }, {
        lng: 119.045838, lat: 32.063582, title: "汤山方山国家地质公园博物馆", content: "博物馆位于南京以东40公里处的汤山，是南京汤山方山国家地质公园的入口门户，是一块具有重要地理意义的区域，这里中国最重要的考古学发掘基地之一。江苏江宁汤山方山国家地质公园博物馆是极具科普意义的地质演变、人类进化双主题博物馆。", url: require("../../assets/media/8.jpg")
      }, {
        lng: 119.00838, lat: 32.068535, title: "南京明文化村阳山碑材景区", content: "阳山碑材位于南京市江宁区汤山街道西北侧的阳山南坡，是明成祖朱棣为颂扬其父明太祖朱元璋功德而开凿的神功圣德碑遗址，为取此石材，有“天下第一碑”之称，阳山碑材是全国重点文物保护单位，已列入世界吉尼斯之一最大的碑材。景区由演绎明朝生活的文化村、奇石林立的阳山怪石坡和世界之最的阳山碑材三个游览区域组成。", url: require("../../assets/media/9.jpg")
      }, {
        lng: 118.936351, lat: 31.863727, title: "杨柳村石建筑群", content: "位于南京市江宁区湖熟街道杨柳村，是南京现存规模最大的明清民宅遗存之一，也是江南地区典型的古民宅建筑，带有典型的南京地域特色，现已列为为全国重点文物保护单位。杨柳村古建筑群始建于明代，清康熙、乾隆年间先后改建。村庄依山傍水，北靠马场山，前临杨柳湖，富有浓郁的江南水乡特色。杨柳村的“九十九间半”是南京目前规模最大、保存最完好的明清民居建筑群。", url: require("../../assets/media/10.jpg")
      }, {
        lng: 118.745562, lat: 31.892738, title: "南唐二陵", content: "位于南京南郊祖堂山南麓，是五代十国时期规模最大的帝王陵墓，包括五代南唐先主李昪及其妻宋氏“钦陵”和中主李璟及其妻钟氏的“顺陵”。1988年，列为全国重点文物保护单位。后主李煜的“恰似一江春水向东流”便于源于此。", url: require("../../assets/media/11.jpg")
      }, {
        lng: 118.747678, lat: 31.918866, title: "佛顶宫", content: "佛顶宫位于南京市江宁区牛首山文化旅游区。整个佛顶宫总建筑面积近10晚平方米，主体建筑共9层，地下利用矿坑建设陵6层，规模宏大。已“天阙藏地宫”为核心，打造“生态、文化、休闲”三大胜境，并利用矿坑见地宫，长期安奉佛教至高圣物佛顶骨舍利，致力于将牛首山文化旅游区打造成世界级佛教文化圣地和中国国际旅游目的地。", url: require("../../assets/media/12.jpg")
      }, {
        lng: 118.989717, lat: 31.867531, title: "湖熟清真寺", content: "始建于明洪武二十五年（1392年），位于江苏省南京市江宁区湖熟街道水北大街39号，是湖熟街道一千余回民进行教礼活动的主要场所。2006年被公布为市级文化保护单位。清真寺院内有3棵2人合抱的银杏大树，枝叶繁茂，已有百余年历史。清真寺内刻有两块碑文，相继记载着清真寺历代史记与三次创伤后的愈合。", url: require("../../assets/media/13.jpg")
      }, {
        lng: 118.696043, lat: 31.786303, title: "黄龙岘", content: "位于南京市江宁区江宁街道，素有“金陵茶文化休闲旅游第一村”的美誉。致力于打造金陵茶文化休闲旅游村，有采茶观光区、黄龙大茶馆、黄龙潭、云雄陶艺馆等景点，沿途驿站星罗密布。新建龙乡双范、茶乡星谷等精品民宿。", url: require("../../assets/media/14.jpg")
      }, {
        lng: 118.728388, lat: 31.854746, title: "大塘金", content: "位于南京市江宁区谷里街道大唐金村，游客可赏薰衣花海，吃农家美食，购香草产品，玩童年游戏等，现在已经成为南京最热门景点之一。大塘金是南京市山水芳香养身“第一村”，园内有梯田式薰衣草400亩，是融薰衣草体验、休闲度假、膳食调理及薰衣草综合产业为一体的旅游村。四级婚纱摄影棚，南京地区首屈一指。", url: require("../../assets/media/15.jpg")
      }, {
        lng: 118.721062, lat: 31.730582, title: "石塘人家", content: "石塘人家位于南京市江宁区横溪街道石塘社区北面，源于宋代，至今已1000余年历史。村落面积5.93平方公里，四面环山，丘壑连绵，风景瑰丽。依托石塘竹海、怪坡等景点，建设南宋古村落，配套有九里商业街、乡村客栈阳光营地、木栈道、自行车慢骑道、国际青年旅行社等运动休闲、乡村度假设施。有“中国最美乡村”之称，获得“中国十大美丽乡村”、“中国乡村旅游模范村”、“中国魅力新农村十佳乡村”、“中国最美村镇典范奖”、“全国美丽宜居示范村”、“江苏省最美乡村”、“江苏省四星级乡村旅游区”等荣誉。新建有田园E站，互联网会议中心。", url: require("../../assets/media/16.jpg")
      }, {
        lng: 118.736192, lat: 31.917174, title: "世凹桃源", content: "世凹桃源位于南京市江宁区谷里街道周村社区世凹村，地处牛首山风景区西南麓，牛首山、云台山生态廊道最北端，有“中国最美村镇”之称。整体风格以徽派建筑为主格调，翠绿的山林下一片白墙灰瓦，成为牛首山下一道靓丽的风景；村内青砖巷道，木栅院门，大红灯笼，恍如隔世；石刻、牌楼、亭台、景观长廊配以春桃、夏荷、秋桂、冬梅，成就了“四季有花开、步步有风景”的“牛首第一村”", url: require("../../assets/media/17.jpg")
      }, {
        lng: 118.849179, lat: 31.97922, title: "东山香樟园", content: "香樟园位于江宁区东山街道，是南京市江宁区都是生态休闲农业“五朵金花”之一。园内空气清新，满目葱郁，这里是樟树的天堂。园内规划建设有香樟园、亲子园、垂钓园和梁武广场“园一场”，园内樟树平均树龄在50年以上。", url: require("../../assets/media/18.jpg")
      }, {
        lng: 119.110414, lat: 31.916742, title: "马场山", content: "位于江宁区淳化街道滨淮社区，是淳化街道2013年重点打造的乡村都市生态休闲旅游景点，格桑花盛开季节游人如织。马场山相传是三国时期东吴周瑜养马之地，至今还留有“周廊桥”、“吴帅墩”、“姊妹桥”等历史遗迹。", url: require("../../assets/media/19.jpg")
      }, {
        lng: 118.833122, lat: 31.886922, title: "秣陵杏花村", content: "秣陵杏花村位于江宁区双龙大道的东南大学路上，是江宁“新金花”之一，致力于打造以休闲旅游、农家餐饮、农业互动为一体的生态农庄。有开心农场、百果园、农场认养等景点及互动活动。再现清代文学家吴敬梓笔下“一带江城新雨后，杏花深处秣陵关”的美景。", url: require("../../assets/media/20.jpg")
      }, {
        lng: 118.936342, lat: 31.863727, title: "杨柳村", content: "杨柳村位于南京市江宁区湖熟街道外秦淮河平原，村庄依山傍水，北靠马场山，前临杨柳湖，富有浓郁的江南水乡特色。杨柳村的“九十九间半”是南京目前规模最大、保存最完好的明清民居建筑群。古时有“青石墁地石门楼，走进杨柳不粘泥”的说法。当年，红军就把这作为根据地。", url: require("../../assets/media/21.jpg")
      }, {
        lng: 118.982659, lat: 32.073546, title: "锁石村", content: "锁石村隶属于南京市江宁区麒麟街道，曾连续十二届获得南京市综合实力百强村称号，2006年还被评为“江宁区十佳新农村建设先进单位”第一名。江宁区首家省四星级乡村旅游区，融农家乐风情、乡野风光、历史文化于一体集原始古老农庄和现代新型农村于一身。", url: require("../../assets/media/22.jpg")
      }, {
        lng: 118.662194, lat: 31.825012, title: "三界稻花村", content: "进入深秋，一望无际的稻田，风吹稻浪滔滔，恰似金色的海洋波浪，层层叠叠。湖熟三界社区的稻乐园，就是这样一处能让人徜徉金色海洋的地方。拥有自然风貌的三界稻花村，是秋季旅游的一处好地方，成片的金黄稻田将你周围，稻穗在风中“搔首弄姿”、浅唱低吟，像极了诗和远方；儿时记忆中的稻草人，也会把你带入稻金色的童话世界中；稻田迷宫、稻草城堡、亲子割稻等娱乐体验设施，更能让你尽享童年欢乐。", url: require("../../assets/media/23.jpg")
      }, {
        lng: 118.684099, lat: 31.851035, title: "徐家院", content: "徐家院村地处江宁西部田园乡村示范区腹地，紧邻银杏湖大道，江宁旅游联一线支线贯穿村内，交通十分便利。即将建成“野八鲜”、“水八鲜”等绿色农产品基地。", url: require("../../assets/media/24.jpg")
      }, {
        lng: 118.935596, lat: 31.987818, title: "佘村", content: "佘村东临青龙山，西靠黄龙山，南有佘村水库（又名双龙湖），北有横山水库（又名天云湖），上下两座水库拦蓄了从群山众溪中下泄而来的雨水，既是农业灌溉之源，由形成了峡谷平湖的绚丽风光。这个古老的村庄，不仅自然风光唯美，还有许多古建筑和美丽传说，潘氏宗祠、潘氏住宅、佘村古井等被先后列入市、区级文物保护单位。", url: require("../../assets/media/25.jpg")
      }]
    }
  },
  mounted () {
    this.map()
    setInterval(() => {
      this.currentIndex ++
      if (this.jsonData && this.jsonData[0]) {
        // this.local = this.jsonData[this.currentIndex] ? this.jsonData[this.currentIndex].title : ''
        this.detailData = this.jsonData[this.currentIndex]
        this.isShow = true
        if (this.currentIndex >= this.jsonData.length) {
          this.currentIndex = 0
          // this.local = this.jsonData[this.currentIndex].title
          this.detailData = this.jsonData[this.currentIndex]
          this.isShow = true
        }
      }
    }, 5000)
  },
  methods: {
    map () {
      let _this = this
      let map = new BMap.Map('reporter-map') // 创建Map实例
      map.centerAndZoom(new BMap.Point(118.852879, 31.920374), 17) // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
      map.addControl(new BMap.NavigationControl()) // 添加一个平移缩放控件
      // 个性化地图设置
      if (this.jsonData && this.jsonData[0]) {
        _this.detailData = this.jsonData[0]
        // _this.local = this.jsonData[0].title
        _this.isShow = true
        // this.jsonData.forEach(value => {
        //   let point = new BMap.Point(value.lng, value.lat)
		    //   addMarker(point, value)
        // })
        let point = new BMap.Point(118.852879, 31.920374)
        addMarker(point)
      }
      // 编写自定义函数,创建标注
	    function addMarker(point){
        let myIcon = new BMap.Icon(_this.defaultImg, new BMap.Size(32,41))
	      let marker = new BMap.Marker(point, {icon: myIcon})
        map.addOverlay(marker)
        // marker.addEventListener('click', () => {
        //   _this.local = value.title
        //   _this.detailData = value
        //   _this.isShow = true
        // })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.main-wrap {
  .current-location {
    width: 100%;
    height: 100%;
    padding: 0.5rem 0.3rem 0.35rem;
    color: #fff;
    font-size: 0.48rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .location-title {
      width: 100%;
      height: 1.14rem;
      background: url('../../assets/img/briefing/title_bg.png') no-repeat center;
      background-size: 100%;
      font-weight: 600;
      margin-bottom: 0.35rem;
      .title-img {
        width: 0.35rem;
        height: 0.47rem;
        margin-right: 0.2rem;
      }
      .title-content {
        width: 4.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .location-body {
      width: 100%;
      height: 8.62rem;
      background: url('../../assets/img/briefing/tongyong_bg01.png') no-repeat center;
      background-size: 100%;
      padding: 0.33rem 0.32rem 0.29rem 0.35rem;
      position: relative;
      .reporter-map {
        width: 100%;
        height: 100%;
      }
      .map-detail {
        width: 5rem;
        height: 7.6rem;
        background: url('../../assets/img/briefing/map_xq_bg.png') no-repeat center;
        background-size: 100%;
        position: absolute;
        top: 0.53rem;
        left: 0.55rem;
        padding: 0 0.3rem;
        .map-title {
          font-size: 0.32rem;
          font-weight: 600;
          text-align: center;
          padding: 0.26rem 0 0.24rem;
        }
        .map-img {
          width: 100%;
          height: 2.47rem;
          margin-bottom: 0.35rem;
        }
        .map-content {
          font-size: 0.22rem;
          font-weight: 400;
          height: 3.5rem;
          overflow-y: scroll;
        }
      }
    }
  }
}
</style>
