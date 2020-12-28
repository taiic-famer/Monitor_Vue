<template>
  <div class="main">
    <h1>镜像列表</h1>
    <div v-if="isReloadData">
      <el-table :data="items">
        <el-table-column prop="_id" label="ID" width="240"> </el-table-column>
        <el-table-column prop="num" label="镜像编号"> </el-table-column>
        <el-table-column prop="title" label="镜像标题"> </el-table-column>
        <el-table-column prop="description" label="镜像描述"> </el-table-column>
        <el-table-column prop="url" label="url"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="$router.push(`/images/edit/${scope.row._id}`)"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="remove(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="imageList.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isReloadData: true,
      items: [],
      imageList: [],
      pageSize: 10
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.items = []
      for (
        let i = (val - 1) * this.pageSize, j = 0;
        i <= val * this.pageSize - 1;
        i++, j++
      ) {
        // console.log(this.messageList[i])
        if (i == this.imageList.length) {
          break
        }
        this.items[j] = this.imageList[i]
      }

      this.isReloadData = false
      this.$nextTick(() => {
        this.isReloadData = true
      })
    },
    async fetch() {
      const res = await this.$http.get('rest/images')
      this.imageList = res.data
      this.handleCurrentChange(1)
    },
    async remove(row) {
      const res = await this.$http.delete(`rest/images/${row._id}`)

      this.fetch()
    },
  },
  created() {
    this.fetch()
  },
}
</script>

<style  scoped>
.block {
  position: fixed;
  bottom: 50px;
}
.main {
  min-width: 1680px;
  height: 920px;
}
</style>