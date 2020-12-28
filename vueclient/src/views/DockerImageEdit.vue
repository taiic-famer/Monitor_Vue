<template>
  <div class="main">
    <el-dialog title="镜像数据" :visible.sync="dialogVisible" width="30%">
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="编号">
          <el-input v-model="model.num"></el-input>
        </el-form-item>

        <el-form-item label="镜像文件">
          <input type="file" id="btnFile" />
          <input type="button" value="上传" @click="upload(0)" />
          <br />
          <span v-if='uploadShow'>{{uploadText}}</span>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :rows="2"
            v-model="model.description"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
            :disabled="saveBtnDisabled"
            >保存</el-button
          >
          <el-button @click="dialogVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
// import axios from 'axios'
export default {
  props: {
    id: {},
  },
  data() {
    return {
      uploadShow: false,
      uploadText: '',
      num: 0,
      saveBtnDisabled: true,
      model: {},
      dialogVisible: false,
    }
  },
  computed: {
    btnFile: function () {
      return document.querySelector('#btnFile')
    },
    chunkSize: function () {
      return 10 * 1024 * 1024
    },
  },
  methods: {
    upload(index) {
      
      this.uploadShow = true
      let file = this.btnFile.files[0]
      let [fname, fext] = file.name.split('.')
      let start = index * this.chunkSize
      this.num = 100 * start/file.size
      this.model.size = file.size
      this.num =this.num.toFixed(2)
      this.uploadText = `正在上传: 传输${this.num}%`
      if(this.num>=100){
        this.num = 100.00
      }
      if (start > file.size) {
        this.merge(file.name)
        return
      }

      let blob = file.slice(start, start + this.chunkSize)
      let blobName = `${fname}.${index}.${fext}`
      let blobFile = new File([blob], blobName)

      let formData = new FormData()
      formData.append('file', blobFile)
      this.$axios.post('/upload', formData).then((res) => {
        console.log(res)
        this.upload(++index)
      })
    },
    merge(name) {
      this.uploadShow = true
      this.uploadText = '上传完成，正在合并...'
      this.$axios.post('/merge', { name: name }).then((res) => {
        console.log(res)
        // console.log(res.data.url.split('/')[5])
        this.model.title = res.data.url.split('/')[5]
        this.model.url = res.data.url
        this.uploadText = '合并完成'
        this.saveBtnDisabled = false
      })
      
    },

    // afterUploadImage(res) {
    //   this.model.title = res.originalname
    //   this.model.url = res.url
    //   this.model.path = res.path
    //   this.model.size = res.size
    // },
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
      this.saveBtnDisabled = true
      this.uploadShow = false
      this.dialogVisible = false
      this.$router.push('/images/list')
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