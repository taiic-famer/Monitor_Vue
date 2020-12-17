<template>
  <div class="main">
    <el-dialog title="镜像数据" :visible.sync="dialogVisible" width="30%">
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="编号">
          <el-input v-model="model.num"></el-input>
        </el-form-item>

        <el-form-item label="镜像文件">
          <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL + '/upload'"
            list-type="file"
            :on-success="afterUploadImage"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
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
    afterUploadImage(res) {
      this.model.title = res.originalname
      this.model.url = res.url
      this.model.path = res.path
      this.model.size = res.size
    },
    button() {
      this.dialogVisible = true
    },
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/images/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/images', this.model)
      }
      this.dialogVisible = false
      // this.$router.push('/images/list')
      this.print()
    },
    async fetch() {
      const res = await this.$http.get(`rest/images/${this.id}`)
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
  min-width: 1680px;
  height: 920px;
}
</style>