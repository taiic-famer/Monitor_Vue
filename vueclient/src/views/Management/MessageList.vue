<template>
  <div class="main">
    <h1>消息列表</h1>
    <div v-if="isReloadData">
      <el-table :data="items">
        <el-table-column prop="_id" label="ID"> </el-table-column>
        <el-table-column prop="message" label="消息内容"> </el-table-column>
        <el-table-column prop="description" label="消息描述"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="$router.push(`/messages/edit/${scope.row._id}`)"
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
        :total="messageList.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageList: [],
      items: [],
      isReloadData: true,
      pageSize: 10,
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
        if (i == this.messageList.length) {
          break
        }
        this.items[j] = this.messageList[i]
      }

      this.isReloadData = false
      this.$nextTick(() => {
        this.isReloadData = true
      })
    },
    async fetch() {
      const res = await this.$http.get('rest/messages')
      this.messageList = res.data
      // console.log(this.messageList)
      // console.log(this.items.length)
      this.handleCurrentChange(1)
    },
    async remove(row) {
      const res = await this.$http.delete(`rest/messages/${row._id}`)

      this.fetch()
    },
  },
  created() {
    this.fetch()
  },
}
</script>
<style  scoped>
.block{
  position: fixed;
  bottom:50px;
}
.main {
  /* width: 1680px;
  height: 890px; */
  min-width: 1680px;
  height: 920px;
}
</style>