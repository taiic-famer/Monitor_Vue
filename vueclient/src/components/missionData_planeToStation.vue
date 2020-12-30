<template>
  <div></div>
</template>

<script>
import mqtt from 'mqtt'
const client = mqtt.connect('ws://192.168.61.31:1883')
export default {
  data() {
    return {
      missionList: []
    }
  },
  created() {
    this.mqtt()
  },
  methods: {
    mqtt() {
      client.on('connect', (e) => {
        console.log('接收连接成功！！！')
        client.subscribe('missionData', { qos: 0 }, (error) => {
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
        let oMessage = JSON.parse(message.toString())
        // console.log(oMessage)
        
        let IP = oMessage.IP

        if (this.missionList.length == 0) {
          this.missionList.push(oMessage)
        } else {
          let i
          for (i = 0; i < this.missionList.length; i++) {
            if (this.missionList[i].IP == IP) {
              break
            }
          }
          if (i == this.missionList.length) {
            this.missionList.push(oMessage)
          } else {
            this.missionList.splice(i, 1, oMessage)
          }
        }

        this.$store.commit('updateMissionData', this.missionList)
        
      })
    },
  },
}
</script>