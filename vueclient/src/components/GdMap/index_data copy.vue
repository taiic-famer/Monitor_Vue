<template>
  <div style="height: 100%">
    <div class="map" id="map"></div>
    <button @click="changeMode">qiehuan</button>
    <button @click="addMarker">addMarker</button>
    <button @click="changePosition">changePosition</button>
  </div>
</template>
 
<script>
import planeIcon from '../../assets/images/plane2.png'
export default {
  data() {
    return {
      Mode: '3D',
      map: undefined,
      markerList: [],
      marker: undefined,
      eposition: [],
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    changeMode() {
      if (this.Mode == '2D') {
        this.Mode = '3D'
        this.init()
      } else {
        this.Mode = '2D'
        this.init()
      }
    },
    init() {
      let map = new AMap.Map('map', {
        zoom: 17,
        pitch: 80,

        viewMode: this.Mode, //开启3D视图,默认为关闭
        buildingAnimation: true, //楼块出现是否带动画

        expandZoomRange: true,
        zooms: [3, 20],
        center: [117.736689, 39.0461222],
      })
      map.plugin(['AMap.MapType'], function () {
        //地图类型切换
        var type = new AMap.MapType({
          defaultType: 1, //使用2D地图
        })
        map.addControl(type)
      })
      map.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
        map.addControl(new AMap.ToolBar())

        map.addControl(new AMap.Scale())
      })
      map.plugin('AMap.Geolocation', function () {
        //异步加载插件

        var geolocation = new AMap.Geolocation()

        map.addControl(geolocation)
      })
      // map.on('click', function (e) {
      //   var longitude = e.lnglat.getLng()
      //   var latitude = e.lnglat.getLat()
      //   //通过经纬度生成坐标点
      //   this.marker = new AMap.Marker({
      //     icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',

      //     position: [longitude, latitude], //位置
      //   })
      //   // console.log(this.marker)
      //   this.marker.setMap(map)
      //   //将坐标添加到地图
      //   // this.addMarker()
      // })
      this.map = map
    },
    openInfo(positionResult, pointData) {
      var info = []
      info.push("<div class='input-card content-window-card'>")
      info.push('<div style="padding:7px 0px 0px 0px;"><h4>高德软件</h4>')
      info.push("<p class='input-item'>电话 : 010-84107000   邮编 : 100102</p>")
      info.push(
        "<p class='input-item'>地址 :北京市朝阳区望京阜荣街10号首开广场4层</p></div></div>"
      )

      let infoWindow = new AMap.InfoWindow({
        content: info.join(''),
        offset: new AMap.Pixel(10, -25),
      })
      infoWindow.open(this.map, positionResult.lnglat)
    },
    addMarker() {
      let that = this
      var marker = new AMap.Marker({
        icon: planeIcon,
        position: this.eposition,
      })
      marker.on('click', (positionResult) => {
        console.log(positionResult)
        let pointData = positionResult.target.getExtData()
        that.openInfo(positionResult, pointData)
      })
      this.markerList.push(marker)
      this.map.add(marker)
    },
    changePosition() {
      console.log(this.marker)
      let position = this.marker.position

      this.marker.position = [position[0] + 0.002, position[1] - 0.002]
    },
  },
}
</script>
<style scoped>
.map {
  width: 100%;
  height: 100%;
}
.amap-demo {
  height: 100%;
}
</style>