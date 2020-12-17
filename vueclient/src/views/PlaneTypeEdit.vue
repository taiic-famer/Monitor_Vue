<template>
  <div class="main">
    <el-button type="primary" plain @click="dialogVisible = true"
      ><h3>{{ id ? '编辑' : '添加' }}无人机类型</h3></el-button
    >
    <el-dialog title="无人机类型" :visible.sync="dialogVisible" width="30%">
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="无人机类型">
          <el-input v-model="model.type"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit">保 存</el-button>
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
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/types/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/types', this.model)
      }
      this.dialogVisible = false
      this.$router.push('/types/list')
    },
    async fetch() {
      const res = await this.$http.get(`rest/types/${this.id}`)
      this.model = res.data
    },
  },
  created() {
    this.id && this.fetch()
  },
}
</script>

<style scoped>
.main {
  /* width: 1680px;
  height: 890px; */
  min-width: 1680px;
  height: 920px;
}
</style>