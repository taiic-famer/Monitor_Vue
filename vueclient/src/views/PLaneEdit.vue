<template>
  <div class="main">
    <!-- <el-button type="primary" plain @click="dialogVisible = true"
      ><h3>{{ id ? '编辑' : '添加' }}无人机</h3></el-button
    > -->
    <el-dialog title="无人机数据" :visible.sync="dialogVisible" width="30%">
      <el-tabs value="1">
        <el-tab-pane label="添加无人机" name="1"
          ><el-form label-width="85px" @submit.native.prevent="save">
            <el-form-item label="Name">
              <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="IP">
              <el-input v-model="model.IP"></el-input>
            </el-form-item>
            <el-form-item label="无人机类型">
              <el-select v-model="model.type">
                <el-option
                  v-for="item in types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="经度">
              <el-input v-model="model.longitude"></el-input>
            </el-form-item>
            <el-form-item label="纬度">
              <el-input v-model="model.latitude"></el-input>
            </el-form-item>
            <el-form-item label="高度">
              <el-input v-model="model.altitude"></el-input>
            </el-form-item>
            <el-form-item label="水平速度">
              <el-input v-model="model.speed"></el-input>
            </el-form-item>
            <el-form-item label="垂直速度">
              <el-input v-model="model.verticalSpeed"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-input v-model="model.state"></el-input>
            </el-form-item>
            <!-- <el-form-item label="任务">
          <el-select v-model="model.mission">
            <el-option
              v-for="item in missions"
              :key="item._id"
              :label="item.num"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-form-item> -->
            <el-form-item label="电池">
              <el-input v-model="model.battery"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" native-type="submit">保存</el-button>
              <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
              <el-button @click="dialogVisible = false">取 消</el-button>
            </el-form-item>
          </el-form></el-tab-pane
        >
        <el-tab-pane label="批量添加" name="2"
          ><el-form>
            <el-form-item label="JSON无人机文件">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                list-type="file"
                :on-success="afterUploadFile"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form></el-tab-pane
        >
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
      missions: [],
      types: [
        { value: '固定翼', label: '固定翼' },
        { value: '四旋翼', label: '四旋翼' },
      ],
      dialogVisible: false,
    }
  },
  methods: {
    afterUploadFile(res) {
      console.log(res.url)
      var _this = this
      _this.$http.defaults.headers.post['Content-Type'] =
        'application/json; charset=UTF-8'
      _this.$http
        .get(res.url)
        .then(async function (response) {
          const result = response.data

          // const result = eval('(' + _this.getResult + ')')
          // console.log(result.length)
          for (var i = 0; i < result.length; i++) {
            // console.log(result[i])
            const model = {}
            model.name = result[i].name
            model.IP = result[i].IP
            model.type = result[i].type
            model.longitude = result[i].longitude
            model.latitude = result[i].latitude
            model.altitude = result[i].altitude
            model.speed = result[i].speed
            model.verticalSpeed = result[i].verticalSpeed
            model.state = result[i].state
            model.battery = result[i].battery

            let res = await _this.$http.post('rest/planes', model)

            // console.log(this.model)
          }
          _this.dialogVisible = false
          _this.$router.push('/planes/list')
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    button() {
      this.dialogVisible = true
    },
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/planes/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/planes', this.model)
      }
      this.dialogVisible = false
      this.$router.push('/planes/list')
    },
    async fetch() {
      const res = await this.$http.get(`rest/planes/${this.id}`)
      this.model = res.data
    },
    async fetchMission() {
      const res = await this.$http.get(`rest/missions`)
      this.missions = res.data
    },
    // async fetchCategory() {
    //   const res = await this.$http.get(`rest/types`)
    //   this.types = res.data
    // },
  },
  created() {
    this.id && this.fetch()
    this.button()
    // this.fetchMission()
    // this.fetchCategory()
  },
}
</script>

<style scoped>
.main {
  width: 1680px;
  height: 890px;
}
</style>