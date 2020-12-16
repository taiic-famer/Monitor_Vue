<template>
  <div>
    <h1>无人机类型列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"> </el-table-column>
      <el-table-column prop="type" label="无人机类型"> </el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/types/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('rest/types')
      this.items = res.data
    },
    async remove(row) {
      const res = await this.$http.delete(`rest/types/${row._id}`)

      this.fetch()
    },
  },
  created() {
    this.fetch()
  },
}
</script>