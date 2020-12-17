<template>
  <div class="mian">
    <h1>无人机列表</h1>
    <div v-if="isReloadData">
      <el-table :data="items">
        <el-table-column prop="name" label="name"> </el-table-column>
        <el-table-column prop="IP" label="IP"> </el-table-column>
        <el-table-column prop="type" label="类型"> </el-table-column>
        <el-table-column prop="longitude" label="经度"> </el-table-column>
        <el-table-column prop="latitude" label="纬度"> </el-table-column>
        <el-table-column prop="altitude" label="高度"> </el-table-column>
        <el-table-column prop="speed" label="水平速度"> </el-table-column>
        <el-table-column prop="verticalSpeed" label="垂直速度">
        </el-table-column>
        <el-table-column prop="state" label="无人机状态"> </el-table-column>

        <el-table-column prop="battery" label="电池电量"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="$router.push(`/planes/edit/${scope.row._id}`)"
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
        :total="planeList.length"
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
      planeList: [],
      pageSize: 10,
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize=val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.items = []
      for (
        let i = (val - 1) * this.pageSize, j = 0;
        i <= val * this.pageSize - 1;
        i++, j++
      ) {
        // console.log(this.planeList[i])
        if (i == this.planeList.length) {
          break
        }
        this.items[j] = this.planeList[i]
      }

      this.isReloadData = false
      this.$nextTick(() => {
        this.isReloadData = true
      })
    },
    async fetch() {
      const res = await this.$http.get('rest/planes')
      this.planeList = res.data
      // console.log(this.planeList.length)
      this.handleCurrentChange(1)
      // this.handleSizeChange(1)
    },

    async remove(row) {
      const res = await this.$http.delete(`rest/planes/${row._id}`)

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
  /* width: 1680px;
  height: 890px; */
  min-width: 1120px;
  min-height: 593px;
}
</style>