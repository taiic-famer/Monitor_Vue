<template>
  <div>
    <el-button @click="editAll">批量编辑</el-button>
    <el-button @click="submit">提交</el-button>
    <el-button @click="addAll">批量增加</el-button>
    <el-button @click="delectAll">批量删除</el-button>
    <el-table :data="tabledatas" border @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="Command" class="Command">
        <template slot-scope="scope">
          <span v-if="scope.row.show">
            <el-input size="mini" placeholder="请输入内容" v-model="scope.row.command"></el-input>
          </span>
          <span v-else>{{scope.row.command}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Lat" class="Lat">
        <template slot-scope="scope">
          <span v-if="scope.row.show">
            <el-input size="mini" placeholder="请输入内容" v-model="scope.row.lat"></el-input>
          </span>
          <span v-else>{{scope.row.lat}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Long" class="Long">
        <template slot-scope="scope">
          <span v-if="scope.row.show">
            <el-input size="mini" placeholder="请输入内容" v-model="scope.row.long"></el-input>
          </span>
          <span v-else>{{scope.row.long}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Alt" class="Alt">
        <template slot-scope="scope">
          <span v-if="scope.row.show">
            <el-input size="mini" placeholder="请输入内容" v-model="scope.row.alt"></el-input>
          </span>
          <span v-else>{{scope.row.alt}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row,scope.$index)">{{scope.row.show?'保存':"修改"}}</el-button>
          <el-button @click="cope(scope.row,scope.$index)">单个复制</el-button>
          <el-button @click="delect(scope.$index)">单个删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { bus } from '@/utils/bus'
export default {
  data() {
    return {
      tabledatas: [],
      multipleSelection: [],
      lat: 39,
      long: 117,
    }
  },
  created() {
    bus.$on('markerLng', (e) => {
      this.long = e
      // console.log(this.long)
    })
    bus.$on('markerLat', (e) => {
      this.lat = e
      // console.log(this.lat)
      this.tabledatas = [
        {
          command: 'WAYPOINT',
          lat: this.lat,
          long: this.long,
          alt: '100',
        },
        {
          command: 'WAYPOINT',
          lat: 39.0461222,
          long: 117.736689,
          alt: '100',
        },
      ]
    })
    this.tabledatas = [
      {
        command: 'WAYPOINT',
        lat: this.lat,
        long: this.long,
        alt: '100',
      },
      {
        command: 'WAYPOINT',
        lat: 39.0461222,
        long: 117.736689,
        alt: '100',
      },
    ]
    this.tabledatas.map((i) => {
      i.show = false
      return i
    })
  },
  mounted() {},

  methods: {
    edit(row, index) {
      row.show = row.show ? false : true
      Vue.set(this.tabledatas, index, row)
      // 修改后保存
    },
    editAll() {
      this.tabledatas.map((i, index) => {
        i.show = true
        Vue.set(this.tabledatas, index, i)
      })
    },
    submit() {
      this.tabledatas.map((i, index) => {
        i.show = false
        Vue.set(this.tabledatas, index, i)
      })
    },
    // 单个复制
    cope(val, index) {
      this.tabledatas.splice(index, 0, JSON.parse(JSON.stringify(val)))
    },
    // 单个删除
    delect(index) {
      this.tabledatas.splice(index, 1)
    },
    //批量新增
    addAll() {
      if (this.multipleSelection.length == 0) {
        let list = {
          title: '',
          text: '',
        }
        this.tabledatas.push(list)
      } else {
        this.multipleSelection.forEach((val, index) => {
          this.tabledatas.splice(index, 0, JSON.parse(JSON.stringify(val)))
        })
      }
    },
    //批量删除
    delectAll() {
      for (let i = 0; i < this.tabledatas.length; i++) {
        const element = this.tabledatas[i]
        element.id = i
      }
      if (this.multipleSelection.length == 0)
        this.$message.error('请先至少选择一项')
      this.multipleSelection.forEach((element) => {
        this.tabledatas.forEach((e, i) => {
          if (element.id == e.id) {
            this.tabledatas.splice(i, 1)
          }
        })
      })
    },
    //选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
