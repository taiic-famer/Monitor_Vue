<template>
  <div class="amap-wrapper">
    <el-amap
      vid="amapContainer"
      :map-manager="amapManager"
      :center="center"
      :events="events"
      :zoom="zoom"
      viewMode="3D"
      pitch="0"
      pitchEnable="true"
      class="amap-demo"
    >
      <el-amap-marker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
        :events="marker.events"
        :visible="marker.visible"
        :draggable="marker.draggable"
        :vid="index"
        :icon="marker.icon"
      ></el-amap-marker>
      <el-amap-info-window
        v-if="window"
        :position="window.position"
        :visible="window.visible"
        :content="window.content"
      ></el-amap-info-window>
    </el-amap>
  </div>
</template>

<script>
import { AMapManager, lazyAMapApiLoaderInstance } from 'vue-amap'
let amapManager = new AMapManager()
import planeIcon from '../../assets/images/plane2.png'
import currentPlaneIcon from '../../assets/images/plane1.png'
import mqtt from 'mqtt'
var client = mqtt.connect('ws://192.168.61.31:1883')
export default {
  data() {
    return {
      planeList: [],
      center: [117.72894, 39.0401285],
      zoom: 16,
      amapManager,
      markers: [
        // {
        //   icon: planeIcon,
        //   position: [117.72894, 39.0401285],
        //   offset: (-16, -16),
        //   visible: true,
        //   draggable: false,
        //   template: '<span>1</span>',
        // },
      ],
      markerEvent: {
        click(e) {
          console.log('点击', e)
        },
      },
      events: {
        init(map) {
          // const map = map
          var object3Dlayer = new AMap.Object3DLayer()
          map.add(object3Dlayer)

          var druckMeshes

          map.plugin(['AMap.GltfLoader'], function () {
            // var urlcar = 'https://a.amap.com/jsapi_demos/static/gltf/car.gltf'
            let urlcar = 'http://192.168.61.31:3000/upload/temp/Car.gltf'

            let paramcar = {
              // position: new AMap.LngLat(117.736689, 39.0461222), // 必须
              position: [117.72894, 39.0401285],
              scale: 50, // 非必须，默认1
              height: -100, // 非必须，默认0
              scene: 0, // 非必须，默认0
            }

            var gltfObj = new AMap.GltfLoader()

            gltfObj.load(urlcar, function (gltfcar) {
              druckMeshes = gltfcar
              gltfcar.setOption(paramcar)
              gltfcar.rotateX(90)
              gltfcar.rotateZ(0)
              object3Dlayer.add(gltfcar)
            })
            let urlCrate = 'http://192.168.61.31:3000/upload/temp/Crate1.gltf'
            let paramCrate = {
              // position: new AMap.LngLat(117.736689, 39.0461222), // 必须
              position: [117.72894, 39.0401285],
              scale: 50, // 非必须，默认1
              height: -100, // 非必须，默认0
              scene: 0, // 非必须，默认0
            }

            var gltfObj = new AMap.GltfLoader()

            gltfObj.load(urlCrate, function (gltfCrate) {
              druckMeshes = gltfCrate
              gltfCrate.setOption(paramCrate)
              gltfCrate.rotateX(90)
              gltfCrate.rotateZ(0)
              object3Dlayer.add(gltfCrate)
            })
          })
        },

        click(e) {
          self.markers = []
          let { lng, lat } = e.lnglat
          self.lng = lng
          self.lat = lat
          console.log(e)
        },
      },
      windows: [],
      window: '',
    }
  },
  created() {
    this.mqttMsg()

    this.fetchPlaneData()
  },
  computed: {
    carPosition: function () {
      let position = [117.72894, 39.0401285]

      // let value = Math.ceil(Math.random() * 10)
      // position[0] += value / 1000
      return position
    },
  },

  methods: {
    async fetchPlaneData() {
      const planes_res = await this.$http.get('rest/planes')
      // this.$store.commit('updatePlaneData', planes_res.data)
      this.print()
    },
    print() {
      // console.log(this.$store.state.planeData)
    },

    plane() {
      // console.log(this.carPosition)
      let markers = []
      let windows = []
      let position = []

      let _this = this

      for (let i = 0; i < _this.$store.getters.getPlaneData.length; i++) {
        let planePosition = []
        // console.log(this.$store.state.planeData[i].longitude)
        planePosition[0] = this.$store.getters.getPlaneData[i].longitude
        planePosition[1] = this.$store.getters.getPlaneData[i].latitude
        markers.push({
          icon: _this.$store.state.currentPlane.some(function (value) {
            return value == _this.$store.getters.getPlaneData[i].IP
          })
            ? currentPlaneIcon
            : planeIcon,
          position: planePosition,

          events: {
            click() {
              _this.$store.commit(
                'updateCurrentPlane',
                _this.$store.state.planeData[i].IP
              )
              // console.log(_this.$store.state.currentPlane)
              _this.$store.commit('updateMapSize')
            },
          },
        })
      }

      this.markers = markers
      // console.log(this.$store.state.planeData)
      this.windows = windows
    },

    mqttMsg() {
      client.on('connect', (e) => {
        console.log('接收连接成功！！！')
        client.subscribe('plane', { qos: 0 }, (error) => {
          if (!error) {
            console.log('订阅成功')
          } else {
            console.log('订阅失败')
          }
        })
      })

      // 接收消息处理
      client.on('message', (topic, message) => {
        // console.log(message.toString())
        // console.log(JSON.parse(message.toString()))
        let oMessage = JSON.parse(message.toString())
        // console.log(oMessage)
        let myDate = new Date()
        this.$set(oMessage, 'time', myDate.getTime())
        let IP = oMessage.IP

        if (this.planeList.length == 0) {
          this.planeList.push(oMessage)
        } else {
          let i
          for (i = 0; i < this.planeList.length; i++) {
            if (this.planeList[i].IP == IP) {
              break
            }
          }
          if (i == this.planeList.length) {
            this.planeList.push(oMessage)
          } else {
            this.planeList.splice(i, 1, oMessage)
          }
        }

        // console.log(this.planeList)
        this.$store.commit('updatePlaneData', this.planeList)
        this.plane()
      })
    },
  },
  beforeDestrory() {
    clearInterval(this.timer)
    this.timer = null
  },
}
</script>


<style>
.amap-wrapper {
  height: 100%;
}
.prompt {
  background: white;
  width: 100px;
  height: 30px;
  text-align: center;
}
</style>