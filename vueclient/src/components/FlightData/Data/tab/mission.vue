<template>
  <div class="main">
    <el-button
      size="mini"
      type="text"
      class="descriptionList"
      @click="descriptionListBtn"
      >任务详细信息</el-button
    >
    <el-button
      size="mini"
      type="text"
      class="loadXML"
      @click="
        file(
          'http://192.168.61.31:3000/upload/temp/' +
            $store.getters.getPlaneDataByIP.mission
        )
      "
      >加载行为树</el-button
    >
    <br />
    <mermaid :nodes="data" type="graph TB"></mermaid>
    <button @click="changeByID(0)">0</button>
    <button @click="changeByID(1)">1</button>
    <button @click="changeByID(2)">2</button>
    <button @click="changeByID(3)">3</button>
    <button @click="changeByID(4)">4</button>
    <button @click="changeByID(5)">5</button>
    <br />

    <div class="dialog">
      <el-dialog v-dialogDrag :visible.sync="dialogVisible" width="800px">
        <el-table :data="items">
          <el-table-column prop="id" label="ID" width="50px"> </el-table-column>
          <el-table-column prop="class" label="节点类型" width="100px">
          </el-table-column>
          <el-table-column label="描述"
            ><span slot-scope="scope"
              ><span>{{ scope.row.description }}</span></span
            >
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="descriptionOfData.length"
          >
          </el-pagination>
        </div>
      </el-dialog>
      <!-- <span>{{ $store.getters.getPlaneDataByIP.mission }}</span> -->
      <h2>id:{{showDescriptionData.id}}</h2>
      <h2>节点:{{showDescriptionData.class}}</h2>
      <h2>描述:{{showDescriptionData.description}}</h2>
    </div>
    
  </div>
</template>
<script>
// import { delete } from 'vue/types/umd'
import mermaid from './mermaid'

const x2js = require('x2js')
const x2jsone = new x2js() //实例
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      dialogVisible: false,
      counter: 0,
      color: [],
      descriptionOfData: new Array(),
      data: new Array(),
      showDescriptionData: '',
      pageSize: 6,
      items: [],
    }
  },
  components: {
    mermaid,
 
  },
  computed: {
    ...mapState(['currentPlane']),
    ...mapGetters(['getPlaneDataByIP']),
  },
  mounted() {
    this.file(
      'http://192.168.61.31:3000/upload/temp/' +
        this.$store.getters.getPlaneDataByIP.mission
    )
  },
  watch: {
    currentPlane: function (newValue) {
      this.file(
        'http://192.168.61.31:3000/upload/temp/' +
          this.$store.getters.getPlaneDataByIP.mission
      )
      this.changeByID(this.$store.getters.getPlaneDataByIP.node)
    },
    getPlaneDataByIP: function (oldValue, newValue) {
      // this.file('http://192.168.61.31:3000/upload/temp/' + newValue.mission)
      if (newValue.mission == oldValue.mission) {
        if (newValue.node != oldValue.node) {
          this.changeByID(newValue.node)
        }
      } else {
        // this.file('http://192.168.61.31:3000/upload/temp/' + newValue.mission)
        this.changeByID(newValue.node)
      }
    },
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
        if (i == this.descriptionOfData.length) {
          break
        }
        this.items[j] = this.descriptionOfData[i]
      }

      this.isReloadData = false
      this.$nextTick(() => {
        this.isReloadData = true
      })
    },
    descriptionListBtn() {
      this.dialogVisible = true
      this.handleCurrentChange(1)
    },
    xmlToJson(xml) {
      const jsonObj = x2jsone.xml2js(xml)
      return jsonObj
    },

    init() {
      for (let i = 0; i < this.data.length; i++) {
        this.$set(this.data[i], 'link', '-->')
        // this.$set(this.data[i], 'editable', true)
        this.$set(this.data[i], 'style', 'fill:,stroke:#333,stroke-width:4px')
        this.$set(this.data[i], 'color', this.color[i])
      }
    },
    changeByID(n) {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].id == n) {
          this.color[i] = 'red'
          this.showDescriptionData = this.descriptionOfData[i]
        } else {
          this.color[i] = ''
        }
      }
      this.init()
    },
    addEdgeType(obj) {
      switch (obj._class) {
        case 'Selector':
          return 'rhombus'
          break
        case 'Task':
          return 'round'
          break
        case 'Sequence':
          return 'asymetric'
          break
        default:
          return 'default'
      }
    },
    findId(obj, arr) {
      if (!obj.node) {
        if (obj._id != arr[arr.length - 1]) {
          this.data.push({})
          this.descriptionOfData.push({})
          if (obj.node) {
            this.$set(this.data[this.counter], 'next', [])
            if (obj.node.length) {
              obj.node.forEach((item) => {
                this.data[this.counter].next.push(item._id)
              })
            } else {
              this.data[this.counter].next.push(obj.node._id)
            }
          }
          // console.log('1-' + obj._id + this.counter)
          this.$set(this.data[this.counter], 'id', obj._id)
          this.$set(this.data[this.counter], 'text', obj._id)
          this.$set(this.data[this.counter], 'edgeType', this.addEdgeType(obj))

          this.$set(this.descriptionOfData[this.counter], 'id', obj._id)
          this.$set(this.descriptionOfData[this.counter], 'class', obj._class)
          this.$set(
            this.descriptionOfData[this.counter],
            'description',
            obj.property
          )

          this.counter++
          arr.push(obj._id)
        }
        // console.log('4-'+obj._id+this.counter)
      } else {
        if (obj.node.length) {
          obj.node.forEach((item) => {
            this.data.push({})
            this.descriptionOfData.push({})

            // arr.push(item._id)
            // console.log(item._id)
            // console.log(item._id)
            // console.log(arr)
            if (item.node) {
              this.$set(this.data[this.counter], 'next', [])
              if (item.node.length) {
                item.node.forEach((item) => {
                  this.data[this.counter].next.push(item._id)
                })
              } else {
                this.data[this.counter].next.push(item.node._id)
              }
            }
            // console.log('2-' + item._id + this.counter)
            this.$set(this.data[this.counter], 'id', item._id)
            this.$set(this.data[this.counter], 'text', item._id)
            this.$set(
              this.data[this.counter],
              'edgeType',
              this.addEdgeType(item)
            )

            this.$set(this.descriptionOfData[this.counter], 'id', item._id)
            this.$set(
              this.descriptionOfData[this.counter],
              'class',
              item._class
            )
            this.$set(
              this.descriptionOfData[this.counter],
              'description',
              item.property
            )

            this.counter++
            arr.push(item._id)
            this.findId(item, arr)
          })
        } else {
          this.data.push({})
          this.descriptionOfData.push({})

          if (obj.node.node) {
            this.$set(this.data[this.counter], 'next', [])
            if (obj.node.node.length) {
              obj.node.node.forEach((item) => {
                this.data[this.counter].next.push(item._id)
              })
            } else {
              this.data[this.counter].next.push(obj.node.node._id)
            }
          }
          // console.log('3-' + obj.node._id + this.counter)
          this.$set(this.data[this.counter], 'id', obj.node._id)
          this.$set(this.data[this.counter], 'text', obj.node._id)
          this.$set(
            this.data[this.counter],
            'edgeType',
            this.addEdgeType(obj.node)
          )

          this.$set(this.descriptionOfData[this.counter], 'id', obj.node._id)
          this.$set(
            this.descriptionOfData[this.counter],
            'class',
            obj.node._class
          )
          this.$set(
            this.descriptionOfData[this.counter],
            'description',
            obj.node.property
          )

          this.counter++
          arr.push(obj.node._id)
          this.findId(obj.node, arr)
        }
      }
    },

    file(url) {
      this.data = new Array()
      this.descriptionOfData = new Array()
      var _this = this
      _this.$http.defaults.headers.post['Content-Type'] =
        'application/json; charset=UTF-8'
      _this.$http
        .get(url)
        .then(async function (response) {
          const result = response.data

          // console.log(result)
          const jsonObj = _this.xmlToJson(result)
          // _this.data = new Array()
          // console.log( _this.data)
          // _this.data = _this.$options.data().data
          // console.log( _this.data)
          // console.log(xml.behavior.node._id)
          _this.counter = 0
          if (jsonObj.behavior) {
            let arr = []
            _this.findId(jsonObj.behavior, arr)
            // console.log(arr)
            // _this.data.splice(_this.counter, 100 - _this.counter)
            // _this.jsonToData(arr)
            // console.log(_this.data)
            _this.init()
            _this.changeByID(_this.$store.getters.getPlaneDataByIP.node)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
  },
}
</script>
<style scoped>
.main {
  position: relative;
  height: 570px;
}
.descriptionList {
  position: absolute;
  top: 0;
  right: 10px;
}
.loadXML {
  position: absolute;
  top: 0;
  left: 0;
}
</style>