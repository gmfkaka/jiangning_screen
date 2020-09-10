<template>
  <div class="container">
    <div class="container-inner overhidden">
      <div class="main-top sys-flex sys-flex-center">
        <div class="time">{{day}} {{wstr}}</div>
        <div class="area-title sys-flex-one">江宁区融媒体调度指挥中心</div>
        <div class="today-weather sys-flex">
          <div class="time">{{time}}</div>
          <div class="icon">
            <img :src="icon" />
          </div>
          <div class="temp">{{temp}}</div>
        </div>
      </div>
      <div class="main-wrap">
        <div class="reporter-map-wrap">
          <call :info-item.sync="callInfo" :call-show.sync="callShow" :call-type.sync="callType"></call>
          <div id="reporter-map" ref="allmap" class="reporter-map"></div>
          <div class="search-name sys-flex sys-flex-center">
            <input type="text" class="sys-flex-one" @keyup.enter="searchReporter" @focus="getFocus" @blur="getBlur" v-model="searchName" placeholder="请输入关键字">
            <img :src="inputUrl" @click="searchReporter" />
          </div>
          <div class="reporter-list-wrap overhidden" v-if="projectMemberList && projectMemberList[0]">
            <div class="list-title">{{isProject? '选题相关人员' : '搜索结果'}}</div>
            <div v-for="(v,k) in projectMemberList" v-bind:key="k">
              <div
                class="reporter-list sys-flex sys-flex-center"
                :key="k"
                :class="{'flipInX' : v}"
                v-bind:style="{'animation-delay' : k/2+'s'}"
              >
                <img class="avatar" v-if="v.avatar" :src="v.avatar && v.avatar.uri" />
                <img
                  class="avatar"
                  v-if="!v.avatar"
                  src="../../assets/img/reporter/default_avatar.png"
                />
                <div class="role-info">
                  <div class="name">{{v.member_name}}</div>
                  <div class="org-title">{{v.org_title}}</div>
                </div>
                <div class="connect connect-audio" @click="callaudio(v)"></div>
                <div class="connect connect-video" @click="callvideo(v)"></div>
              </div>
            </div>
          </div>
          <div class="report-today-list" v-if="todayList && todayList[0]">
            <div class="list-title">今日选题</div>
            <swiper :options="swiperOption" ref="mySwiper">
              <swiper-slide v-for="(v, k) in todayList" :key="k">
                <div class="report-item" @click="getProjectMember(v)">
                  <span class="today-index">{{k + 1}}</span>
                  {{v.title}}
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import call from "./call.vue";
import * as utils from "../../servers/utils";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "reporterMap",
  data() {
    return {
      isProject: true,
      inputUrl: '',
      closeTwo: require(`@/assets/img/reporter/close_two@2x.png`),
      searchImg: require(`@/assets/img/reporter/search@2x.png`),
      searchName: '',
      time: "",
      temp: "",
      icon: "",
      wstr: "",
      reporterList: [],
      projectMemberList: [],
      todayList: [],
      callInfo: {},
      callShow: false,
      callType: "video",
      swiperOption: {
        notNextTick: true,
        speed: 2000,
        autoplay: {
          delay: 1000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        autoHeight: false,
        height: 280,
        slidesPerView: 8,
        direction: "vertical",
        loop: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        paginationClickable: true
      },
      mapStyle: {
        styleJson: [
          {
            featureType: "land",
            elementType: "geometry",
            stylers: {
              color: "#16254aff",
              visibility: "on"
            }
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: {
              color: "#0d5ec9ff",
              visibility: "on"
            }
          },
          {
            featureType: "building",
            elementType: "geometry.fill",
            stylers: {
              color: "#0b193bff",
              visibility: "on"
            }
          },
          {
            featureType: "building",
            elementType: "geometry.stroke",
            stylers: {
              color: "#000722ff",
              visibility: "on"
            }
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: {
              color: "#092f70ff",
              visibility: "on"
            }
          },
          {
            featureType: "village",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "town",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "district",
            elementType: "labels",
            stylers: {
              visibility: "on"
            }
          },
          {
            featureType: "country",
            elementType: "labels.text.fill",
            stylers: {
              color: "#65a5ecff",
              visibility: "on"
            }
          },
          {
            featureType: "city",
            elementType: "labels.text.fill",
            stylers: {
              color: "#65a5ecff",
              visibility: "on"
            }
          },
          {
            featureType: "continent",
            elementType: "labels.text.fill",
            stylers: {
              color: "#65a5ecff",
              visibility: "on"
            }
          },
          {
            featureType: "poilabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "poilabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "scenicspotslabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "scenicspotslabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#092f70ff",
              visibility: "on"
            }
          },
          {
            featureType: "transportationlabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#092f70ff",
              visibility: "on"
            }
          },
          {
            featureType: "transportationlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "airportlabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#092f70ff",
              visibility: "on"
            }
          },
          {
            featureType: "airportlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: {
              color: "#17192eff",
              visibility: "on"
            }
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: {
              color: "#000006ff",
              visibility: "on"
            }
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: {
              weight: 3
            }
          },
          {
            featureType: "green",
            elementType: "geometry",
            stylers: {
              color: "#0a2e6dff",
              visibility: "on"
            }
          },
          {
            featureType: "scenicspots",
            elementType: "geometry",
            stylers: {
              color: "#16254aff",
              visibility: "on"
            }
          },
          {
            featureType: "scenicspots",
            elementType: "labels.text.fill",
            stylers: {
              color: "#3c70b6ff",
              visibility: "on"
            }
          },
          {
            featureType: "scenicspots",
            elementType: "labels.text.stroke",
            stylers: {
              weight: 1,
              color: "#092157ff",
              visibility: "on"
            }
          },
          {
            featureType: "continent",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#092157ff",
              visibility: "on",
              weight: 1
            }
          },
          {
            featureType: "country",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#092157ff",
              visibility: "on",
              weight: 1
            }
          },
          {
            featureType: "city",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#092157ff",
              visibility: "on",
              weight: 1
            }
          },
          {
            featureType: "city",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "scenicspotslabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#092157ff",
              visibility: "on",
              weight: 1
            }
          },
          {
            featureType: "airportlabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#092157ff",
              visibility: "on",
              weight: 1
            }
          },
          {
            featureType: "transportationlabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#092157ff",
              visibility: "on",
              weight: 1
            }
          },
          {
            featureType: "railway",
            elementType: "geometry",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "subway",
            elementType: "geometry",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "highwaysign",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "nationalwaysign",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "nationalwaysign",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "provincialwaysign",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "provincialwaysign",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "tertiarywaysign",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "tertiarywaysign",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "subwaylabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "subwaylabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: {
              color: "#092f70ff",
              visibility: "on",
              weight: 90
            }
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#092157ff",
              visibility: "on",
              weight: 1
            }
          },
          {
            featureType: "shopping",
            elementType: "geometry",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "scenicspots",
            elementType: "labels",
            stylers: {
              visibility: "on"
            }
          },
          {
            featureType: "scenicspotslabel",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "manmade",
            elementType: "geometry",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "manmade",
            elementType: "labels",
            stylers: {
              visibility: "on"
            }
          },
          {
            featureType: "highwaysign",
            elementType: "labels.icon",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#0a2e6d00",
              visibility: "on"
            }
          },
          {
            featureType: "road",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "6"
            }
          },
          {
            featureType: "road",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "7"
            }
          },
          {
            featureType: "road",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "8"
            }
          },
          {
            featureType: "road",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "9"
            }
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "6"
            }
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "7"
            }
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "8"
            }
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "9"
            }
          },
          {
            featureType: "road",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "6"
            }
          },
          {
            featureType: "road",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "7"
            }
          },
          {
            featureType: "road",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "8"
            }
          },
          {
            featureType: "road",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "9"
            }
          },
          {
            featureType: "road",
            elementType: "labels.text",
            stylers: {
              fontsize: 24
            }
          },
          {
            featureType: "highway",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#092157ff",
              visibility: "on",
              weight: 1
            }
          },
          {
            featureType: "highway",
            elementType: "geometry.fill",
            stylers: {
              color: "#092963ff",
              visibility: "on"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#093d8bff"
            }
          },
          {
            featureType: "highway",
            elementType: "labels.text.fill",
            stylers: {
              color: "#092f70ff",
              visibility: "on"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry",
            stylers: {
              weight: 3
            }
          },
          {
            featureType: "nationalway",
            elementType: "geometry.fill",
            stylers: {
              color: "#17192eff",
              visibility: "on"
            }
          },
          {
            featureType: "nationalway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#1c4f7eff"
            }
          },
          {
            featureType: "nationalway",
            elementType: "labels.text.fill",
            stylers: {
              color: "#566b92ff",
              visibility: "on"
            }
          },
          {
            featureType: "nationalway",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#092157ff",
              visibility: "on",
              weight: 1
            }
          },
          {
            featureType: "nationalway",
            elementType: "geometry",
            stylers: {
              weight: 3
            }
          },
          {
            featureType: "provincialway",
            elementType: "geometry.fill",
            stylers: {
              color: "#17192eff",
              visibility: "on"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "geometry.fill",
            stylers: {
              color: "#17192eff",
              visibility: "on"
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry.fill",
            stylers: {
              color: "#17192eff",
              visibility: "on"
            }
          },
          {
            featureType: "tertiaryway",
            elementType: "geometry.fill",
            stylers: {
              color: "#17192eff",
              visibility: "on"
            }
          },
          {
            featureType: "fourlevelway",
            elementType: "geometry.fill",
            stylers: {
              color: "#17192eff",
              visibility: "on"
            }
          },
          {
            featureType: "local",
            elementType: "geometry.fill",
            stylers: {
              color: "#17192eff",
              visibility: "on"
            }
          },
          {
            featureType: "provincialway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#000006ff",
              visibility: "on"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#000006ff",
              visibility: "on"
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry.stroke",
            stylers: {
              color: "#000006ff",
              visibility: "on"
            }
          },
          {
            featureType: "tertiaryway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#000006ff",
              visibility: "on"
            }
          },
          {
            featureType: "fourlevelway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#000006ff",
              visibility: "on"
            }
          },
          {
            featureType: "local",
            elementType: "geometry.stroke",
            stylers: {
              color: "#000006ff",
              visibility: "on"
            }
          },
          {
            featureType: "local",
            elementType: "labels.text.fill",
            stylers: {
              color: "#3460a3ff",
              visibility: "on"
            }
          },
          {
            featureType: "local",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#092157ff",
              visibility: "on",
              weight: 1
            }
          },
          {
            featureType: "fourlevelway",
            elementType: "labels.text.fill",
            stylers: {
              color: "#566b92ff",
              visibility: "on"
            }
          },
          {
            featureType: "tertiaryway",
            elementType: "labels.text.fill",
            stylers: {
              color: "#566b92ff",
              visibility: "on"
            }
          },
          {
            featureType: "arterial",
            elementType: "labels.text.fill",
            stylers: {
              color: "#566b92ff",
              visibility: "on"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "labels.text.fill",
            stylers: {
              color: "#566b92ff",
              visibility: "on"
            }
          },
          {
            featureType: "provincialway",
            elementType: "labels.text.fill",
            stylers: {
              color: "#566b92ff",
              visibility: "on"
            }
          },
          {
            featureType: "provincialway",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#092157ff",
              visibility: "on",
              weight: 1
            }
          },
          {
            featureType: "cityhighway",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#092157ff",
              visibility: "on",
              weight: 1
            }
          },
          {
            featureType: "arterial",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#092157ff",
              visibility: "on",
              weight: 1
            }
          },
          {
            featureType: "tertiaryway",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#092157ff",
              visibility: "on",
              weight: 1
            }
          },
          {
            featureType: "fourlevelway",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#092157ff",
              visibility: "on",
              weight: 1
            }
          },
          {
            featureType: "fourlevelway",
            elementType: "geometry",
            stylers: {
              weight: 1
            }
          },
          {
            featureType: "tertiaryway",
            elementType: "geometry",
            stylers: {
              weight: 1
            }
          },
          {
            featureType: "local",
            elementType: "geometry",
            stylers: {
              weight: 1
            }
          },
          {
            featureType: "provincialway",
            elementType: "geometry",
            stylers: {
              weight: 3
            }
          },
          {
            featureType: "cityhighway",
            elementType: "geometry",
            stylers: {
              weight: 3
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry",
            stylers: {
              weight: 3
            }
          },
          {
            featureType: "highway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "6"
            }
          },
          {
            featureType: "highway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "7"
            }
          },
          {
            featureType: "highway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "8"
            }
          },
          {
            featureType: "highway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "9"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "6"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "7"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "8"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "9"
            }
          },
          {
            featureType: "highway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "6"
            }
          },
          {
            featureType: "highway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "7"
            }
          },
          {
            featureType: "highway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "8"
            }
          },
          {
            featureType: "highway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "9"
            }
          },
          {
            featureType: "nationalway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "6"
            }
          },
          {
            featureType: "nationalway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "7"
            }
          },
          {
            featureType: "nationalway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "8"
            }
          },
          {
            featureType: "nationalway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "9"
            }
          },
          {
            featureType: "nationalway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "6"
            }
          },
          {
            featureType: "nationalway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "7"
            }
          },
          {
            featureType: "nationalway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "8"
            }
          },
          {
            featureType: "nationalway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "9"
            }
          },
          {
            featureType: "nationalway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "6"
            }
          },
          {
            featureType: "nationalway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "7"
            }
          },
          {
            featureType: "nationalway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "8"
            }
          },
          {
            featureType: "nationalway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "9"
            }
          },
          {
            featureType: "provincialway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "8,10",
              level: "8"
            }
          },
          {
            featureType: "provincialway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "8,10",
              level: "9"
            }
          },
          {
            featureType: "provincialway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "8,10",
              level: "8"
            }
          },
          {
            featureType: "provincialway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "8,10",
              level: "9"
            }
          },
          {
            featureType: "provincialway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "8,10",
              level: "8"
            }
          },
          {
            featureType: "provincialway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "8,10",
              level: "9"
            }
          },
          {
            featureType: "cityhighway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "6"
            }
          },
          {
            featureType: "cityhighway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "7"
            }
          },
          {
            featureType: "cityhighway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "8"
            }
          },
          {
            featureType: "cityhighway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "9"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "6"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "7"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "8"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "9"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "6"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "7"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "8"
            }
          },
          {
            featureType: "cityhighway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "9"
            }
          },
          {
            featureType: "arterial",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "9,9",
              level: "9"
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "9,9",
              level: "9"
            }
          },
          {
            featureType: "arterial",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "9,9",
              level: "9"
            }
          },
          {
            featureType: "education",
            elementType: "labels.text.fill",
            stylers: {
              color: "#3c70b6ff"
            }
          },
          {
            featureType: "medical",
            elementType: "labels.text.fill",
            stylers: {
              color: "#3c70b6ff"
            }
          },
          {
            featureType: "transportation",
            elementType: "labels.text.fill",
            stylers: {
              color: "#3c70b6ff"
            }
          },
          {
            featureType: "district",
            elementType: "labels.text.fill",
            stylers: {
              color: "#3a71baff"
            }
          },
          {
            featureType: "village",
            elementType: "labels.text.fill",
            stylers: {
              color: "#3a71baff"
            }
          },
          {
            featureType: "town",
            elementType: "labels.text.fill",
            stylers: {
              color: "#3a71baff"
            }
          },
          {
            featureType: "district",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#092157ff"
            }
          },
          {
            featureType: "town",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#092157ff"
            }
          },
          {
            featureType: "village",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#092157ff"
            }
          },
          {
            featureType: "medical",
            elementType: "geometry",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "transportation",
            elementType: "geometry",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "estate",
            elementType: "geometry",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "transportation",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#1a274bff"
            }
          },
          {
            featureType: "entertainment",
            elementType: "geometry",
            stylers: {
              color: "#0a2e6dff",
              visibility: "off"
            }
          },
          {
            featureType: "medical",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#1a274bff"
            }
          },
          {
            featureType: "education",
            elementType: "geometry",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "education",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#1a274bff"
            }
          },
          {
            featureType: "subwaystation",
            elementType: "geometry",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "transportationlabel",
            elementType: "labels",
            stylers: {
              visibility: "on"
            }
          },
          {
            featureType: "transportation",
            elementType: "labels",
            stylers: {
              visibility: "on"
            }
          },
          {
            featureType: "manmade",
            elementType: "labels.text.fill",
            stylers: {
              color: "#0d5ec9ff"
            }
          },
          {
            featureType: "manmade",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#0a2e6dff"
            }
          }
        ]
      }
    };
  },
  components: {
    call,
    swiper,
    swiperSlide
  },

  created() {
    // 输入框默认图片
    this.inputUrl = this.searchImg
    document.documentElement.style.fontSize =
      (document.documentElement.clientWidth / 5760) * 100 + "px";
    document.write(
      `<script src="//cdn.ronghub.com/RongIMLib-2.3.2.js"><\/script>`
    );
    document.write(
      `<script src="//cdn.ronghub.com/RongCallLib-3.0.0.min.js"><\/script>`
    );
    this.getToday();
    this.getWeather();
    this.RetnWF2();
    this.getReporter();
    setInterval(() => {
      this.getToday();
      this.getWeather();
      this.RetnWF2();
    }, 60000);
    this.getTodayProject();
  },
  methods: {
    searchReporter () {
      this.$api.getReporter(this.searchName).then(res => {
        if (res && res.data && res.data.data && res.data.data[0]) {
          this.isProject = false
          this.projectMemberList = res.data.data
        }
      })
    },
    getFocus () {
      // 获取焦点变幻图片
      this.inputUrl = this.closeTwo
    },
    getBlur () {
      this.inputUrl = this.searchImg
    },
    map() {
      var map = new BMap.Map("reporter-map");
      map.enableScrollWheelZoom(true);
      map.setMapStyle(this.mapStyle);
      //绘制带图标注
      var _this = this;
      SquareOverlay.prototype = new BMap.Overlay();
      SquareOverlay.prototype.initialize = function(map) {
        this._map = map;
        var div = document.createElement("div");
        var item = this._mid;
        div.id = item.id;
        div.className = "member-wrap";
        var add_div = `
                  <div class="sys-flex sys-flex-center">
                    <img class="member-avatar" src="${item.avatar ||
                      require("../../assets/img/reporter/default_avatar.png")}" alt="" />
                    <div>${item.member_name}</div>
                  </div>
                  <div class="close">x</div>
                  <div class="audio"></div>
                  <div class="video"></div>`;
        div.insertAdjacentHTML("beforeEnd", add_div);
        map.getPanes().markerPane.appendChild(div);
        this._div = div;
        // 点击显示浮窗
        div.onmouseover = function() {
          var doms = document.getElementsByClassName("member-wrap show-detail");
          for (let i = 0; i < doms.length; i += doms.length) {
            doms[i].className = "member-wrap";
          }
          div.className = "member-wrap show-detail";
        };
        var childs = div.childNodes;
        childs[5].onclick = function() {
          _this.callaudio(item);
        };
        childs[7].onclick = function() {
          _this.callvideo(item);
        };
        div.onmouseout = function() {
          var doms = document.getElementsByClassName("member-wrap show-detail");
          for (let i = 0; i < doms.length; i += doms.length) {
            doms[i].className = "member-wrap";
          }
          div.className = "member-wrap hide-detail";
        }
        return div;
      };
      SquareOverlay.prototype.draw = function() {
        var position = this._map.pointToOverlayPixel(this._center);
        this._div.style.left = position.x - this._length / 2 + 5 + "px";
        this._div.style.top = position.y - this._length / 1.1 + 5 + "px";
      };
      this.reporterList.forEach(vv => {
        var img = vv.avatar
          ? vv.avatar.uri
          : require("../../assets/img/reporter/default_avatar.png");
        var mySquare = new SquareOverlay(
          {
            lng: utils.gaodeTobaidu(vv.longitude, vv.latitude).longitude,
            lat: utils.gaodeTobaidu(vv.longitude, vv.latitude).latitude
          },
          60,
          "red",
          img,
          vv
        );
        map.addOverlay(mySquare);
      });
      //绘制带图标注结束

      //设置地图的最佳视图
      this.coordinateList = [];
      this.reporterList.forEach(vv => {
        this.coordinateList.push(new BMap.Point(vv.longitude, vv.latitude));
      });
      var view = map.getViewport(this.coordinateList);
      var mapZoom = view.zoom - 1;
      var centerPoint = new BMap.Point(118.852879, 31.920374);
      map.centerAndZoom(centerPoint, 18);
      map.addControl(
        new BMap.NavigationControl({
          anchor: BMAP_ANCHOR_BOTTOM_LEFT
        })
      );

      function SquareOverlay(center, length, color, src, mid) {
        this._src = src;
        this._center = center;
        this._length = length;
        this._color = color;
        this._mid = mid;
      }
    },
    RetnWF2() {
      var date = new Date();
      var day = date.getDay();
      if (day == 0) {
        this.wstr = "星期日";
      } else if (day == 1) {
        this.wstr = "星期一";
      } else if (day == 2) {
        this.wstr = "星期二";
      } else if (day == 3) {
        this.wstr = "星期三";
      } else if (day == 4) {
        this.wstr = "星期四";
      } else if (day == 5) {
        this.wstr = "星期五";
      } else if (day == 6) {
        this.wstr = "星期六";
      }
    },
    getToday() {
      let date = new Date();
      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1;
      let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
      let minute =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      this.time = `${hour}:${minute}`;
      this.day = `${year}年${month}月${day}日 `;
    },
    getWeather() {
      let city = "南京";
      this.$api.getJiangningWeather(city).then(res => {
        if (res && res.data && res.data.result && res.data.result.basic) {
          let data = res.data.result.basic;
          this.temp = `${data.now.tmp}℃`;
          this.icon = `${data.now.cond.icon.host}${data.now.cond.icon.dir}${data.now.cond.icon.filepath}${data.now.cond.icon.filename}`;
        }
      });
    },
    getProjectMember(item) {
      this.$api.getProjectMember(item.id).then(response => {
        if (response.data.error_message == "success") {
          this.isProject = true
          let data = response.data.result;
          this.projectMemberList = response.data.result;
        }
      });
    },
    getTodayProject() {
      this.$api.getTodayProject().then(response => {
        this.map();
        if (response.status == 200) {
          this.todayList = response.data.result.data;
        }
      });
    },
    getReporter() {
      this.$api.getReporter().then(response => {
        if (!response.data.ErrorCode && response.data.data.length) {
          this.reporterList = response.data.data;
          this.reporterList.forEach(vv => {
            var img = vv.avatar
              ? vv.avatar.uri
              : require("../../assets/img/reporter/default_avatar.png");
            if (vv.avatar && vv.avatar.uri) {
              vv.avatar = vv.avatar.uri;
            } else {
              vv.avatar = "";
            }
          });
        }
      });
    },
    callaudio(reporter) {
      this.callInfo = reporter;
      this.callType = "audio";
      this.callShow = true;
    },
    callvideo(reporter) {
      this.callInfo = reporter;
      this.callType = "video";
      this.callShow = true;
    },
    split_array(arr, len) {
      let a_len = arr.length;
      let result = [];
      for (let i = 0; i < a_len; i += len) {
        result.push(arr.slice(i, i + len));
      }
      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  background: url("../../assets/img/reporter/bg.png") no-repeat center center;
  background-size: 100% 100%;
  .container-inner {
    width: 100%;
    height: 100%;
    .main-top {
      width: 100%;
      color: #fff;
      padding: 0 1.22rem;
      font-size: 1.8rem;
      text-align: center;
      position: absolute;
      left: 0;
      top: 0.76rem;
      z-index: 1;
    }
    .area-title {
      font-family: PingFangSC-Semibold;
      font-weight: bold;
      font-size: 3rem;
      padding-right: 0.5rem;
      text-align: center;
    }
    .temp {
      font-size: 0.8rem;
    }
    .today-weather {
      font-size: 0.8rem;
      color: #fff;
      .icon {
        width: 1.45rem;
        height: 0.95rem;
        margin: 0 0.1rem 0 0.24rem;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .time {
        font-size: 0.9rem;
      }
      .temp {
        font-size: 0.9rem;
      }
    }
    .time {
      font-size: 0.8rem;
      color: #fff;
    }
    .main-wrap {
      width: 100%;
      height: 100%;
      position: relative;
      .reporter-map-wrap {
        position: relative;
        height: 100%;
        width: 100%;
        background-size: 100% 100%;
        .reporter-top {
          height: 100%;
          background: url("../../assets/img/title.png") no-repeat top center;
        }
        .role-info {
          flex: 1;
        }
        .reporter-map {
          height: 100%;
          background: rgba(2, 122, 186, 0.2);
          border: 0.01rem solid rgba(2, 122, 186, 0.5);
        }
        .search-name {
          width: 10rem;
          height: 1.5rem;
          background: #2371D7;
          position: absolute;
          bottom: 0.5rem;
          right: 0;
          padding: 0.52rem 0.4rem;
          img {
            width: 0.6rem;
            height: 0.6rem;
          }
          input {
            background: #2371D7;
            border: 0;
            font-size: 0.5rem;
            font-weight: bold;
            color: #fff;
          }
          input::-webkit-input-placeholder {
            font-size: 0.5rem;
            color: #7BAAE7;
          }
        }
        .reporter-list-wrap {
          position: absolute;
          right: 0;
          bottom: 3rem;
          height: 15rem;
          width: 10rem;
          overflow-y: scroll;
          background: rgba(10, 48, 114, 0.8);
          z-index: 2;
          .list-title {
            width: 100%;
            height: 1.4rem;
            background: rgba(37, 177, 124, 0.1);
            color: #00fff6;
            font-size: 0.44rem;
            padding: 0.5rem;
          }
          &.current {
            position: absolute;
            width: 4rem;
            height: 3rem;
            top: -10000px;
            right: 0.5rem;
            background: rgba(0, 0, 0, 0.8);
            padding: 0.3rem;
            border-radius: 0.2rem;
            transition: all 0.1s ease-in;
            &.active {
              top: 0.5rem;
            }
            .reporter-list {
              padding: 0;
              background: none;
              position: relative;
            }
            .avatar {
              width: 1.5rem !important;
              height: 1.5rem !important;
            }
            .icon {
              opacity: 1 !important;
              position: static !important;
            }
            .info {
              height: 1.5rem !important;
            }
            .connect {
              margin-top: 0.3rem;
              width: 2rem;
              height: 0.45rem;
              background: url("") no-repeat center right;
              background-size: 100% 100%;
              cursor: pointer;
              &.connect-audio {
                background-image: url("../../assets/img/reporter/audio2.png");
                margin-right: 0.2rem;
              }
              &.connect-video {
                background-image: url("../../assets/img/reporter/video2.png");
                margin-left: 0.2rem;
              }
            }
            .close {
              position: absolute;
              width: 0.5rem;
              height: 0.5rem;
              top: 0.2rem;
              right: 0.2rem;
              background: url("../../assets/img/reporter/close.png") no-repeat
                center center;
              background-size: 0.5rem 0.5rem;
            }
          }
          .reporter-list {
            padding: 0.6rem 0.8rem;
            background: rgba(80, 136, 188, 0.3);
            position: relative;
            &:not(:last-child) {
              margin-right: 0.15rem;
            }

            .avatar {
              width: 1.5rem;
              height: 1.5rem;
              border-radius: 50%;
              overflow: hidden;
              margin-right: 0.43rem;
            }
            .name {
              font-size: 0.6rem;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
            }
            .org-title {
              color: rgba(180, 203, 234, 1);
              font-size: 0.4rem;
            }
            .connect {
              width: 1rem;
              height: 1rem;
              background: url("") no-repeat center right;
              background-size: 1rem 1rem;
              cursor: pointer;
              &.connect-audio {
                cursor: pointer;
                background-image: url("../../assets/img/reporter/audio2.png");
                margin-right: 0.2rem;
              }
              &.connect-video {
                cursor: pointer;
                background-image: url("../../assets/img/reporter/video2.png");
                margin-left: 0.2rem;
              }
            }
          }
        }
        .report-today-list {
          position: absolute;
          left: 0;
          bottom: 50%;
          margin-bottom: -5.9rem;
          width: 7.5rem;
          height: 11.8rem;
          overflow: hidden;
          background: rgba(11, 41, 94, 0.9);
          font-size: 0.4rem;
          color: #ffffff;
          font-size: 0.5rem;
          .list-title {
            width: 100%;
            height: 1.4rem;
            background: rgba(37, 177, 124, 0.1);
            color: #00fff6;
            padding: 0.5rem;
          }
          .report-item {
            border-bottom: 0.01rem solid #2a5eba;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            .today-index {
              border: 0.02rem solid #fff;
              width: 0.8rem;
              height: 0.8rem;
              border-radius: 50%;
              display: inline-block;
              line-height: 0.8rem;
              text-align: center;
            }
            &:hover {
              background: rgba(0, 96, 255, 0.2);
            }
            &:last-child {
              border-bottom: none;
            }
          }
        }
      }
    }
  }
  .swiper-button-next {
    width: 1.2rem;
    height: 0.8rem;
    right: 3% !important;
    left: auto !important;
    top: 90% !important;
    transform: rotate(90deg);
  }
  .swiper-button-prev {
    width: 1.2rem;
    height: 0.8rem;
    right: 3% !important;
    left: auto !important;
    top: 20% !important;
    transform: rotate(90deg);
  }
}
</style>
