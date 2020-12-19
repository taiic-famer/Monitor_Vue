<template>
  <div id="app" class="main">
    <el-tabs value="msg" type="border-card">
      <el-tab-pane label="发送命令" name="msg">
        <el-row :gutter="100">
          <el-col :span="12">
            <div>
              <h1>无人机列表</h1>
              <el-table
                :data="$store.state.planeData"
                :default-sort="{ prop: 'name', order: 'ascending' }"
              >
                <el-table-column label="操作" width="50">
                  <template slot-scope="scope">
                    <el-checkbox
                      v-model="scope.row.checked"
                      @change.native="getMessagePlanesRow(scope.row)"
                    ></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="name"> </el-table-column>
                <el-table-column prop="IP" label="IP"> </el-table-column>
                <el-table-column prop="state" label="state"> </el-table-column>
                <el-table-column prop="battery" label="battery">
                </el-table-column>
              </el-table>
            </div>
          </el-col>

          <el-col :span="12">
            <el-form label-width="50px" @submit.native.prevent="submitMsg">
              <el-form-item><h1>消息发布</h1></el-form-item>
              <el-form-item label="主题">
                <el-input v-model="formInlineMsg.topic"></el-input>
              </el-form-item>
              <el-form-item label="消息">
                <el-input
                  type="textarea"
                  :rows="2"
                  v-model="pubMessage"
                  @focus="showAll"
                  @blur="displayAll"
                  @input="showAll"
                ></el-input>
              </el-form-item>
              <el-form-item v-show="isshow">
                <p
                  v-for="(item, index) in selectMessage"
                  :key="index"
                  @click="selectMessageList(item)"
                >
                  {{ item }}
                </p>
              </el-form-item>
              <el-form-item style="margin-top: 1rem">
                <el-button
                  type="small"
                  native-type="submit"
                  :disabled="formInlineMsg.topic === '' || pubMessage === ''"
                  >发送消息</el-button
                >
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="发送任务" name="file">
        <el-form label-width="50px">
          <el-form-item>
            <el-row :gutter="100">
              <el-col :span="12"
                ><div>
                  <h1>任务列表</h1>
                  <el-table :data="missions">
                    <el-table-column label="选择" width="50px">
                      <template slot-scope="scope">
                        <el-radio
                          :label="scope.$index"
                          v-model="missionsRadio"
                          @change.native="
                            getMissionRow(scope.$index, scope.row)
                          "
                          >{{&nbsp;}}</el-radio
                        >
                      </template>
                    </el-table-column>
                    <el-table-column prop="title" label="任务标题">
                    </el-table-column>
                    <el-table-column prop="description" label="任务描述">
                    </el-table-column>
                  </el-table>
                  <el-button
                    class="pull-right"
                    type="small"
                    @click="$router.push('/missions/create')"
                    >添加任务</el-button
                  >
                </div>
              </el-col>
              <el-col :span="12"
                ><div>
                  <h1>无人机列表</h1>
                  <el-table
                    :data="$store.state.planeData"
                    :default-sort="{ prop: 'name', order: 'ascending' }"
                  >
                    <el-table-column label="操作" width="50">
                      <template slot-scope="scope">
                        <el-checkbox
                          v-model="scope.row.checked"
                          @change.native="getMissionPlanesRow(scope.row)"
                        ></el-checkbox>
                      </template>
                    </el-table-column>
                    <el-table-column prop="name" label="name">
                    </el-table-column>
                    <el-table-column prop="IP" label="IP"> </el-table-column>
                    <el-table-column prop="state" label="state">
                    </el-table-column>
                    <el-table-column prop="battery" label="battery">
                    </el-table-column>
                  </el-table></div
              ></el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button class="pull-right" type="small" plain @click="submitFile"
              >发送任务</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="上传镜像" name="image">
        <el-form label-width="50px">
          <el-form-item>
            <el-row :gutter="100">
              <el-col :span="12"
                ><div>
                  <h1>镜像列表</h1>
                  <el-table :data="images">
                    <el-table-column label="选择" width="50px">
                      <template slot-scope="scope">
                        <el-radio
                          :label="scope.$index"
                          v-model="imagesRadio"
                          @change.native="getImageRow(scope.$index, scope.row)"
                          >{{&nbsp;}}</el-radio
                        >
                      </template>
                    </el-table-column>
                    <el-table-column prop="title" label="镜像标题">
                    </el-table-column>
                    <el-table-column prop="description" label="镜像描述">
                    </el-table-column>
                  </el-table>
                  <el-button
                    class="pull-right"
                    type="small"
                    @click="$router.push('/images/create')"
                    >添加镜像</el-button
                  >
                </div></el-col
              >
              <el-col :span="12"
                ><div>
                  <h1>无人机列表</h1>
                  <el-table
                    :data="$store.state.planeData"
                    :default-sort="{ prop: 'name', order: 'ascending' }"
                  >
                    <el-table-column label="操作" width="50">
                      <template slot-scope="scope">
                        <el-checkbox
                          v-model="scope.row.checked"
                          @change.native="getImagePlanesRow(scope.row)"
                        ></el-checkbox>
                      </template>
                    </el-table-column>
                    <el-table-column prop="name" label="name">
                    </el-table-column>
                    <el-table-column prop="IP" label="IP"> </el-table-column>
                    <el-table-column prop="state" label="state">
                    </el-table-column>
                    <el-table-column prop="battery" label="battery">
                    </el-table-column>
                  </el-table></div
              ></el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button
              class="pull-right"
              type="small"
              plain
              @click="submitImage"
              >上传镜像</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <div style="height: 50px"></div>
    <h3>消息订阅</h3>
    <div style="height: 2px; background-color: black"><gdm v-show="false"></gdm></div>
    <h3>{{ subMessage }}</h3>
  </div>
</template>

<script>
import gdm from '../components/GdMap/index_data'
import mqtt from 'mqtt'
import { Message } from 'element-ui'
var client = mqtt.connect('ws://192.168.61.31:1883')
export default {
  data() {
    return {
      nowTime: '', // 当前时间
      plane: [],
      isshow: false,
      messageList: [],
      selectMessage: [],
      fileList: [],
      model: {},
      msg: [],
      file: [],
      image: [],
      pubMessage: '',
      subMessage: '',
      formInlineMsg: {
        topic: 'message',
        message: '',
      },

      formInlineImage: {
        topic: 'image',
        message: '',
      },
      missionsRadio: '',
      imagesRadio: '',
      missions: [],
      images: [],
      dialogVisible: false,
      planesMessage: [], // 发送消息的无人机列表
      messageCount: 0, // 发送消息的无人机数量
      planesMission: [], // 发送任务的无人机列表
      missionCount: 0, // 发送任务的无人机数量
      planesImage: [], // 发送镜像的无人机列表
      imageCount: 0, // 发送镜像的无人机数量
      missionMsg: [],
      imageMsg: [],
    }
  },

  created() {
    this.mqttMessage()
    this.mqttFile()
    this.mqttImage()
    this.fetch()
    // this.mqttPlanes()
    // this.mqttPlane()
  },
  components: {
    gdm,
  },

  methods: {
    // 获取时间
    nowTimes() {
      this.timeFormate(new Date())
    },
    // 显示当前时间（格式化）
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear()
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? '0' + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1
      let date =
        new Date(timeStamp).getDate() < 10
          ? '0' + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate()
      let hh =
        new Date(timeStamp).getHours() < 10
          ? '0' + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours()
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? '0' + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes()
      let ss =
        new Date(timeStamp).getSeconds() < 10
          ? '0' + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds()
      this.nowTime =
        year +
        '年' +
        month +
        '月' +
        date +
        '日' +
        ' ' +
        hh +
        ':' +
        mm +
        ':' +
        ss
    },
    showAll() {
      // console.log(this.pubMessage.length)
      if (this.pubMessage.length == '0') {
        this.isshow = true
        this.selectMessage = this.messageList
      } else {
        this.isshow = true
        var message = []
        this.messageList.forEach((item, index) => {
          if (item.indexOf(this.pubMessage) >= 0) {
            message.unshift(item)
          }
        })
        this.selectMessage = message
      }
    },
    displayAll() {
      if (this.pubMessage.length == '0') {
        this.isshow = false
      } else {
        this.isshow = true
      }
    },
    selectMessageList(item) {
      // console.log(item)
      this.pubMessage = item
    },
    del(item) {
      let listVar = new Array()
      for (let i = 0; i < this.planesMsg.length; i++) {
        listVar.push(this.planesMsg)
        if (this.planesMsg[i] == item) {
          listVar[i].splice(i, 1)
        }
      }
    },

    getImageRow(index, message) {
      // console.log(message)
      this.imageMsg = message
    },

    getMissionRow(index, message) {
      // console.log(message)
      this.missionMsg = message
    },

    getMessagePlanesRow(message) {
      if (message.checked) {
        this.planesMessage.push(message.name)
        this.messageCount++
      } else {
        let listVar = new Array()
        for (let i = 0; i < this.planesMessage.length; i++) {
          listVar.push(this.planesMessage)
          if (this.planesMessage[i] == message.name) {
            listVar[i].splice(i, 1)
          }
        }
        this.messageCount--
      }
    },
    getMissionPlanesRow(message) {
      if (message.checked) {
        this.planesMission.push(message.name)
        this.missionCount++
      } else {
        let listVar = new Array()
        for (let i = 0; i < this.planesMission.length; i++) {
          listVar.push(this.planesMission)
          if (this.planesMission[i] == message.name) {
            listVar[i].splice(i, 1)
          }
        }
        this.missionCount--
      }
    },
    getImagePlanesRow(message) {
      if (message.checked) {
        this.planesImage.push(message.name)
        this.imageCount++
      } else {
        let listVar = new Array()
        for (let i = 0; i < this.planesImage.length; i++) {
          listVar.push(this.planesImage)
          if (this.planesImage[i] == message.name) {
            listVar[i].splice(i, 1)
          }
        }
        this.imageCount--
      }

      // console.log(this.planesMsg)
    },
    async fetch() {
      const missions_res = await this.$http.get('rest/missions')
      this.missions = missions_res.data
      // const planes_res = await this.$http.get('rest/planes')
      // this.planes = this.$store.state.planeData
      const images_res = await this.$http.get('rest/images')
      this.images = images_res.data
      const messages_res = await this.$http.get('rest/messages')
      // const messageList = []
      for (var i = 0; i < messages_res.data.length; i++) {
        this.messageList.push(messages_res.data[i].message)
      }
      // this.message1 = messageList
      // console.log(this.messageList)
    },

    submitMsg(e) {
      let json = {}
      for (var i = 0; i < this.planesMessage.length; i++) {
        json[i] = this.planesMessage[i]
      }
      var jsonData = JSON.stringify(json) // 转成JSON格式
      // var formInlineMsg1 = this.formInlineMsg.message + '+' + this.planesMsg

      var message =
        '{' +
        `"type":"message","message":"` +
        this.pubMessage +
        `","planeList":{"num":` +
        this.messageCount +
        `,"list":"` +
        this.planesMessage +
        `"}}`
      // console.log(this.formInline);
      client.on('connect', (e) => {
        console.log('发布连接成功！！！')
      })

      client.publish(this.formInlineMsg.topic.toString(), message.toString(), {
        qos: 1,
        retain: true,
      })

      let planeToMessage = new Object()
      planeToMessage.plane = this.planesMessage
      planeToMessage.message = this.pubMessage
      this.nowTimes()
      planeToMessage.time = this.nowTime
      // console.log(planeToMessage)
      this.$http.post('rest/planeToMessages', planeToMessage)
      Message({
        message: '发送成功',
        type: 'success',
      })
    },

    submitFile(e) {
      let json = {}
      for (var i = 0; i < this.planesMission.length; i++) {
        json[i] = this.planesMission[i]
      }
      var jsonData = JSON.stringify(json) // 转成JSON格式

      const message =
        '{' +
        `"type":"mission",` +
        `"mission":{"url":"` +
        this.missionMsg.url +
        `","title":"` +
        this.missionMsg.title +
        `","size":` +
        this.missionMsg.size +
        `},"planeList":{"num":` +
        this.missionCount +
        `,"list":"` +
        this.planesMission +
        `"}}`
      // const message = this.missionMsg.url + '+' + this.missionMsg.title
      client.on('connect', (e) => {
        console.log('发布连接成功！！！')
      })

      client.publish('file', message.toString(), {
        qos: 1,
        retain: true,
      })
      let planeToMission = new Object()
      planeToMission.plane = this.planesMission
      planeToMission.mission = this.missionMsg.title
      planeToMission.url = this.missionMsg.url
      this.nowTimes()
      planeToMission.time = this.nowTime

      this.$http.post('rest/planeToMissions', planeToMission)
      Message({
        message: '发送成功',
        type: 'success',
      })
    },

    submitImage(e) {
      let json = {}
      for (var i = 0; i < this.planesImage.length; i++) {
        json[i] = this.planesImage[i]
      }
      var jsonData = JSON.stringify(json) // 转成JSON格式
      // console.log(this.planesMsg.length)

      const message =
        '{' +
        `"type":"image",` +
        `"image":{"url":"` +
        this.imageMsg.url +
        `","title":"` +
        this.imageMsg.title +
        `","size":` +
        this.imageMsg.size +
        `},"planList":{"num":` +
        this.count +
        `,"list":"` +
        this.planesImage +
        `"}}`

      client.on('connect', (e) => {
        console.log('发布连接成功！！！')
      })

      client.publish('image', message.toString(), {
        qos: 1,
        retain: true,
      })
      let planeToImage = new Object()
      planeToImage.plane = this.planesImage
      planeToImage.image = this.imageMsg.title
      planeToImage.url = this.imageMsg.url
      this.nowTimes()
      planeToImage.time = this.nowTime

      this.$http.post('rest/planeToImage', planeToImage)
      Message({
        message: '发送成功',
        type: 'success',
      })
    },
    mqttPlanes() {
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

        if (this.plane.length == 0) {
          this.plane.push(oMessage)
        } else {
          let i
          for (i = 0; i < this.plane.length; i++) {
            if (this.plan[i].IP == IP) {
              break
            }
          }
          if (i == this.plane.length) {
            this.plane.push(oMessage)
          } else {
            this.plane.splice(i, 1, oMessage)
          }
        }

        // console.log(this.plane)
        this.$store.commit('updatePlaneData', this.plane)
      })
    },

    mqttMessage() {
      client.on('connect', (e) => {
        console.log('接收连接成功！！！')
        client.subscribe('message', { qos: 1 }, (error) => {
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
        this.subMessage = message.toString()
      })
    },

    mqttFile() {
      client.on('connect', (e) => {
        console.log('接收连接成功！！！')
        client.subscribe('file', { qos: 1 }, (error) => {
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
        this.subMessage = message.toString()
      })
    },

    mqttImage() {
      client.on('connect', (e) => {
        console.log('接收连接成功！！！')
        client.subscribe('image', { qos: 1 }, (error) => {
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
        this.subMessage = message.toString()
      })
    },
  },
}
</script>
<style scoped>
.pull-right {
  float: right !important;
  margin-top: 20px;
}
.main {
  /* min-width: 1680px;
  min-height: 890px; */
  height: 890px;
  min-width: 1680px;
}
</style>