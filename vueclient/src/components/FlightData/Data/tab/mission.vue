<template>
  <div class="main" v-if="isRouterAlive">
    <mermaid :nodes="data" type="graph TB"></mermaid>
    <button @click="change(0)">0</button>
    <button @click="change(1)">1</button>
    <button @click="change(2)">2</button>
    <button @click="change(3)">3</button>
    <button @click="change(4)">4</button>
    <button @click="change(5)">5</button>
    <br>
    <el-button
      @click="
        file(
          'http://192.168.61.31:3000/upload/cb31124a4b031f47f42100db87c497a0'
        )
      "
      >FirstBT</el-button
    >
    <el-button
      @click="
        file(
          'http://192.168.61.31:3000/upload/2d49b0310a81dc4d5db864b1b57b962f'
        )
      "
      >SecondBT</el-button
    >
    <el-button
      @click="
        file(
          'http://192.168.61.31:3000/upload/0fecba091eba3c00ed23fc458e7e08ba'
        )
      "
      >subtree_task</el-button
    >
  </div>
</template>
<script>
// import { delete } from 'vue/types/umd'
import mermaid from './mermaid'
const x2js = require('x2js')
const x2jsone = new x2js() //实例
export default {
  data() {
    return {
      counter: 0,
      color: [],
      data: new Array(),
      isRouterAlive: true,
    }
  },
  components: {
    mermaid,
  },
  mounted() {
    // this.init()
  },

  methods: {
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
    change(n) {
      for (let i = 0; i < this.data.length; i++) {
        if (i == n) {
          this.color[i] = 'red'
        } else {
          this.color[i] = ''
        }
      }
      this.init()
    },
    addEdgeType(obj){
      switch (obj._class) {
        case 'Selector':
          return 'rhombus';
          break;
        case 'Task':
          return 'round';
          break;
        case 'Sequence':
          return 'asymetric';
          break;
        default:
          return 'default'
      }
    },
    findId(obj, arr) {
      if (!obj.node) {
        if (obj._id != arr[arr.length - 1]) {
          this.data.push({})
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
          console.log('1-' + obj._id + this.counter)
          this.$set(this.data[this.counter], 'id', obj._id)
          this.$set(this.data[this.counter], 'text', obj._id)
          this.$set(this.data[this.counter], 'edgeType', this.addEdgeType(obj))
          
          this.counter++
          arr.push(obj._id)
        }
        // console.log('4-'+obj._id+this.counter)
      } else {
        if (obj.node.length) {
          obj.node.forEach((item) => {
            this.data.push({})
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
            console.log('2-' + item._id + this.counter)
            this.$set(this.data[this.counter], 'id', item._id)
            this.$set(this.data[this.counter], 'text', item._id)
            this.$set(this.data[this.counter], 'edgeType', this.addEdgeType(item))
            this.counter++
            arr.push(item._id)
            this.findId(item, arr)
          })
        } else {
          this.data.push({})
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
          console.log('3-' + obj.node._id + this.counter)
          this.$set(this.data[this.counter], 'id', obj.node._id)
          this.$set(this.data[this.counter], 'text', obj.node._id)
          this.$set(this.data[this.counter], 'edgeType', this.addEdgeType(obj.node))
          this.counter++
          arr.push(obj.node._id)
          this.findId(obj.node, arr)
        }
      }
    },

    file(url) {
      this.data = new Array()
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
            console.log(arr)
            // _this.data.splice(_this.counter, 100 - _this.counter)
            // _this.jsonToData(arr)
            // console.log(_this.data)
            _this.init()
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    reload() {
      console.log(1)
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
  height: 570px;
}
</style>