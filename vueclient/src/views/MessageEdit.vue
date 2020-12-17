<template>
  <div class="main">
    <el-dialog title="消息数据" :visible.sync="dialogVisible" width="30%">
      <el-tabs value="1">
        <el-tab-pane label="添加消息" name="1">
          <el-form label-width="40px" @submit.native.prevent="save">
            <el-form-item label="内容">
              <el-input
                type="textarea"
                :rows="2"
                v-model="model.message"
              ></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input
                type="textarea"
                :rows="2"
                v-model="model.description"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" native-type="submit">保存</el-button>
              <el-button @click="dialogVisible = false">取 消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="批量添加" name="2">
          <el-form>
            <el-form-item label="JSON消息文件">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                list-type="file"
                :on-success="afterUploadFile"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </el-tab-pane></el-tabs
      >
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
      dialogVisible: false,
    }
  },
  methods: {
    afterUploadFile(res) {
      var _this = this
      this.$http.defaults.headers.post['Content-Type'] =
        'application/json; charset=UTF-8'
      this.$http
        .get(res.url)
        .then(async function (response) {
          _this.getResult = response.data

          const result = eval('(' + _this.getResult + ')')
          // console.log(result.length)
          for (var i = 0; i < result.length; i++) {
            // console.log(result[i])
            const model = {}
            model.message = result[i].message
            model.description = result[i].description

            let res = await _this.$http.post('rest/messages', model)

            // console.log(this.model)
          }
          _this.dialogVisible = false
          _this.$router.push('/messages/list')
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
        res = await this.$http.put(`rest/messages/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/messages', this.model)
      }
      this.dialogVisible = false
      this.$router.push('/messages/list')
    },
    async fetch() {
      const res = await this.$http.get(`rest/messages/${this.id}`)
      this.model = res.data
    },
  },
  created() {
    this.id && this.fetch()
    this.button()
  },
}
</script>

<style scoped>
.main {
  /* width: 1680px;
  height: 890px; */
  min-width: 1120px;
  min-height: 593px;
}
</style>