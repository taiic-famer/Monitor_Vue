<template>
  <div class="main">
    <el-tabs value="message" type="border-card">
      <el-tab-pane label="命令" name="message">
        <el-table :data="message">
          <el-table-column prop="message" label="命令"> </el-table-column>
          <el-table-column prop="plane" label="无人机"> </el-table-column>
          <el-table-column prop="time" label="时间"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="removeMessage(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane></el-tabs
    >
    <div style="height: 10px"></div>
    <el-tabs value="mission" type="border-card">
      <el-tab-pane label="任务" name="mission"
        ><el-table :data="mission">
          <el-table-column prop="mission" label="任务"> </el-table-column>
          <el-table-column prop="plane" label="无人机"> </el-table-column>
          <el-table-column prop="url" label="任务文件地址"> </el-table-column>
          <el-table-column prop="time" label="时间"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="removeMission(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane></el-tabs
    >
    <div style="height: 10px"></div>
    <el-tabs value="image" type="border-card">
      <el-tab-pane label="镜像" name="image"
        ><el-table :data="image">
          <el-table-column prop="image" label="镜像"> </el-table-column>
          <el-table-column prop="plane" label="无人机"> </el-table-column>
          <el-table-column prop="url" label="镜像文件地址"> </el-table-column>
          <el-table-column prop="time" label="时间"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="removeImage(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane></el-tabs
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: [],
      mission: [],
      image: [],
    }
  },
  activated() {
    this.fetchMessage()
    this.fetchMission()
    this.fetchImage()
  },
  methods: {
    async fetchMessage() {
      let message = await this.$http.get('/rest/planeToMessages')
      this.messageChange(message.data)
    },
    async fetchMission() {
      let mission = await this.$http.get('/rest/planeToMissions')
      this.missionChange(mission.data)
    },
    async fetchImage() {
      let image = await this.$http.get('/rest/planeToImages')
      this.imageChange(image.data)
    },
    messageChange(data) {
      const count = data.length
      this.message = data
      for (let i = 0; i < count; i++) {
        let plane = data[i].plane.sort().join(';')
        this.message[i].plane = plane
      }
    },
    missionChange(data) {
      const count = data.length
      this.mission = data
      for (let i = 0; i < count; i++) {
        let plane = data[i].plane.sort().join(';')
        this.mission[i].plane = plane
      }
    },
    imageChange(data) {
      const count = data.length
      this.image = data
      for (let i = 0; i < count; i++) {
        let plane = data[i].plane.sort().join(';')
        this.image[i].plane = plane
      }
    },
    async removeMessage(row) {
      const res = await this.$http.delete(`rest/planeToMessages/${row._id}`)
      this.fetchMessage()
    },
    async removeMission(row) {
      const res = await this.$http.delete(`rest/planeToMissions/${row._id}`)
      this.fetchMission()
    },
    async removeImage(row) {
      const res = await this.$http.delete(`rest/planeToImages/${row._id}`)
      this.fetchImage()
    },
  },
  components: {},
}
</script>

<style scoped>
.main {
  height: 890px;
  min-width: 1680px;
}
</style>
