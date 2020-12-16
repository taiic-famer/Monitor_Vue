<template>
  <div id="app" style="height: 100%">
    <div class="amap-wrapper">
      <el-amap
        vid="amapContainer"
        :center="center"
        :zoom="zoom"
        viewMode="3D"
        pitch="30"
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
  </div>
</template>

<script>
import { AMapManager } from 'vue-amap'
let amapManager = new AMapManager()
import planeIcon from '../../assets/images/plane2.png'
import currentPlaneIcon from '../../assets/images/plane1.png'
import mqtt from 'mqtt'
var client = mqtt.connect('ws://192.168.61.31:1883')
export default {
  data() {
    return {
      planeList: [],
      center: [117.736689, 39.0461222],
      zoom: 9,
      markers: [
        // {
        //   icon: planeIcon,
        //   position: [117.736689, 39.0461222],
        //   offset: (-16, -16),
        //   visible: true,
        //   draggable: false,
        //   // template: '<span>1</span>',
        // },
      ],
      windows: [],
      window: '',
    }
  },
  created() {
    this.mqttMsg()
    // 定时获取数据
    // this.timer = setInterval(()=>{
    //   this.fetchPlaneData()
    // }, 1000)
    this.fetchPlaneData()
  },

  methods: {
    async fetchPlaneData() {
      const planes_res = await this.$http.get('rest/planes')
      // this.$store.commit('updatePlaneData', planes_res.data)
      this.print()
    },
    print() {
      console.log(this.$store.state.planeData)
    },

    plane() {
      let markers = []
      let windows = []
      let position = []
      let num = this.$store.state.planeData.length
      let _this = this

      for (let i = 0; i < num; i++) {
        let planePosition = []
        // console.log(this.$store.state.planeData[i].longitude)
        planePosition[0] = this.$store.state.planeData[i].longitude
        planePosition[1] = this.$store.state.planeData[i].latitude
        markers.push({
          icon:
            _this.$store.state.currentPlane ==
            _this.$store.state.planeData[i].IP
              ? currentPlaneIcon
              : planeIcon,
          position: planePosition,

          events: {
            click() {
              // _this.windows.forEach((window) => {
              //   window.visible = false
              // })

              _this.$store.commit(
                'updateCurrentPlane',
                _this.$store.state.planeData[i].IP
              )
              _this.$store.commit('updateMapSize')
              // console.log(_this.$store.state.planeData[i].name)
              // _this.window = _this.windows[i]
              // _this.$nextTick(() => {
              //   _this.window.visible = true
              // })
            },
          },
        })
        // 点击弹出弹窗
        // windows.push({
        //   position: planePosition,
        //   content: `<div class="prompt">${this.$store.state.planeData[i].name}</div>`,
        //   visible: false,
        // })
      }

      this.markers = markers
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