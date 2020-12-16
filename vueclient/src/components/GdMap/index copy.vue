<template>
  <div style="height: 100%">
    <div id="map" class="map"></div>
    <!-- <button @click="changeMode">qiehuan</button> -->
    <div>
      <h3>消息订阅</h3>
      <div style="height: 2px; background-color: black"></div>
      <h3>mqtt收到的数据：{{ message }}</h3>
    </div>
  </div>
</template>
<script>
import mqtt from 'mqtt'
var client = mqtt.connect('ws://192.168.61.31:1883')
export default {
  data() {
    return {
      Mode: '3D',
      marker: '',
      text: '',
      message: '',
    }
  },
  created() {
    this.$nextTick(() => {
      this.Mode = '3D'
      this.init()
    })
    this.mqttMsg()
  },

  mounted() {
    this.changeMode()
  },

  methods: {
    mqttMsg() {
      client.on('connect', (e) => {
        console.log('接收连接成功！！！')
        client.subscribe('mission', { qos: 1 }, (error) => {
          if (!error) {
            console.log('订阅成功')
          } else {
            console.log('订阅失败')
          }
        })
      })

      // 接收消息处理
      client.on('message', (topic, message) => {
        // console.log('收到来自', topic, '的消息', message.toString())
        this.message = message.toString()
      })
    },

    changeMode() {
      if (this.Mode === '2D') {
        this.Mode = '3D'
        this.init()
      } else {
        this.Mode = '2D'
        this.init()
      }
    },
    init() {
      const map = new AMap.Map('map', {
        zoom: 17,
        pitch: 80,

        viewMode: this.Mode, // 开启3D视图,默认为关闭
        buildingAnimation: true, // 楼块出现是否带动画

        expandZoomRange: true,
        zooms: [3, 20],
        center: [117.736689, 39.0461222],
      })
      map.plugin(['AMap.MapType'], function () {
        // 地图类型切换
        var type = new AMap.MapType({
          defaultType: 1, // 使用2D地图
        })
        map.addControl(type)
      })
      map.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
        map.addControl(new AMap.ToolBar())

        map.addControl(new AMap.Scale())
      })
      map.plugin('AMap.Geolocation', function () {
        // 异步加载插件

        var geolocation = new AMap.Geolocation()

        map.addControl(geolocation)
      })

      // 创建右键菜单
      var contextMenu = new AMap.ContextMenu()

      contextMenu.addItem('删除航点', function () {
        console.log('删除航点')
      })
      contextMenu.addItem('插入航点', function () {
        console.log('插入航点')
      })
      contextMenu.addItem('插入曲线航点', function () {
        console.log('插入曲线航点')
      })
      contextMenu.addItem('Loiter留待', function () {
        console.log('Loiter留待')
      })
      contextMenu.addItem('跳转', function () {
        console.log('跳转')
      })
      contextMenu.addItem('返航', function () {
        console.log('返航')
      })
      contextMenu.addItem('降落', function () {
        console.log('降落')
      })
      contextMenu.addItem('起飞', function () {
        console.log('起飞')
      })
      contextMenu.addItem('设定兴趣区域', function () {
        console.log('设定兴趣区域')
      })
      contextMenu.addItem('清除任务', function () {
        console.log('清除任务')
      })
      contextMenu.addItem('绘制多边形', function () {
        console.log('绘制多边形')
      })
      contextMenu.addItem('极限范围', function () {
        console.log('极限范围')
      })
      contextMenu.addItem('集结点', function () {
        console.log('集结点')
      })
      contextMenu.addItem('自动返航', function () {
        console.log('自动返航')
      })
      contextMenu.addItem('地图工具', function () {
        console.log('地图工具')
      })
      contextMenu.addItem('档案下载/保存', function () {
        console.log('档案下载/保存')
      })
      contextMenu.addItem('兴趣点', function () {
        console.log('兴趣点')
      })
      contextMenu.addItem('追踪器的家', function () {
        console.log('追踪器的家')
      })
      contextMenu.addItem('修改高度', function () {
        console.log('修改高度')
      })
      contextMenu.addItem('进入UTM坐标', function () {
        console.log('进入UTM坐标')
      })
      contextMenu.addItem('交换停靠菜单', function () {
        console.log('交换停靠菜单')
      })
      contextMenu.addItem('Set Home Here', function () {
        console.log('Set Home Here')
      })
      contextMenu.addItem('Fix mission top/bottom', function () {
        console.log('Fix mission top/bottom')
      })

      // 地图绑定鼠标右击事件——弹出右键菜单
      map.on('rightclick', function (e) {
        contextMenu.open(map, e.lnglat)
        contextMenuPositon = e.lnglat
      })
      let count = 0

      // 地图绑定鼠标左击事件-左击生成坐标和标记点
      map.on('click', function (e) {
        count++
        var longitude = e.lnglat.getLng()
        var latitude = e.lnglat.getLat()

        // 通过经纬度生成坐标点
        this.marker = new AMap.Marker({
          icon:
            'http://webapi.amap.com/theme/v1.3/markers/n/mark_b' +
            count +
            '.png',
          position: [longitude, latitude], // 位置
        })

        // 将坐标添加到地图
        this.marker.setMap(map)
      })

      var object3Dlayer = new AMap.Object3DLayer()
      map.add(object3Dlayer)

      var druckMeshes
      var duckLng = 117.736689
      var duckLat = 39.0461222

      map.plugin(['AMap.GltfLoader'], function () {
        var urlDuck = 'https://a.amap.com/jsapi_demos/static/gltf/Duck.gltf'
        
        var paramDuck = {
          // position: new AMap.LngLat(117.736689, 39.0461222), // 必须
          position: [duckLng, duckLat],
          scale: 300, // 非必须，默认1
          height: -100, // 非必须，默认0
          scene: 0, // 非必须，默认0
        }

        var gltfObj = new AMap.GltfLoader()

        gltfObj.load(urlDuck, function (gltfDuck) {
          druckMeshes = gltfDuck
          gltfDuck.setOption(paramDuck)
          gltfDuck.rotateX(90)
          gltfDuck.rotateZ(90)
          object3Dlayer.add(gltfDuck)
        })
        console.log(urlDuck)
      })
    },
  },
}
</script>
<style scoped>
.map {
  width: 100%;
  height: 90%;
}
.amap-demo {
  height: 100%;
}
</style>