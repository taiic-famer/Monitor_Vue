<template>
  <div class="main">
    <ul class="ul">
      <li v-for="(value, index) in list">
        <div v-if="value != '+'" class="div" :id="index" @click="screen(index)">
          <span v-if="isActive" class="span"
            >{{ value }}<button @click="remove(index)">删除</button></span
          >
          <!-- <br v-if="isActive" /> -->
          <iframe :src="'http://' + value" :style="style[index]"></iframe>
        </div>
        <div v-if="value == '+'" class="div">
          <span v-if="isActive">添加Gzweb</span>
          <br v-if="isActive" />
          <img
            style="height: 236.25px; width: 236.25px"
            @click="add()"
            src="../../assets/images/add1.jpg"
          />
        </div>
      </li>
    </ul>
    <div>
      <el-dialog title="GzWeb添加" :visible.sync="isAddActive" width="640px">
        <el-form label-width="120px" @submit.native.prevent="save">
          <el-form-item label="URL">
            <el-input
              v-model="inputURL"
              placeholder="host:port,  例：192.168.61.31:8080"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit">添加</el-button>
            <el-button @click="isAddActive = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  data() {
    return {
      isAddActive: false,
      isFullscreen: false,
      style: ['height:236.25px; width: 420px'],
      isActive: true,
      num: 0,
      list: ['+'],
      inputURL: '',
    }
  },
  mounted() {
    //监听键盘按键事件
    let self = this
    this.$nextTick(function () {
      document.addEventListener('keyup', function (e) {
        if (e.keyCode == 13) {
          self.screen(self.num)
        }
      })
    })
  },
  methods: {
    add() {
      this.isAddActive = true
    },
    save() {
      let n = this.list.length
      this.list.splice(n - 1, 0, this.inputURL)
      this.style.splice(n - 1, 0, 'height:236.25px; width: 420px')
      this.isAddActive = false
    },
    remove(index) {
      this.list.splice(index, 1)
    },
    screen(id) {
      
      let element = document.getElementById(id.toString())
      id = parseInt(id)
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
          this.$set(this.style, id, 'height:236.25px; width: 420px')
          this.isActive = true
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
          this.$set(this.style, id, 'height:236.25px; width: 420px')
          this.isActive = true
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
          this.$set(this.style, id, 'height:236.25px; width: 420px')
          this.isActive = true
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
          this.$set(this.style, id, 'height:236.25px; width: 420px')
          this.isActive = true
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
          this.$set(this.style, id, 'width:1920px; height:1080px')
          this.isActive = false
          this.num = id
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
          this.$set(this.style, id, 'width:1920px; height:1080px')
          this.isActive = false
          this.num = id
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
          this.$set(this.style, id, 'width:1920px; height:1080px')
          this.isActive = false
          this.num = id
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
          this.$set(this.style, id, 'width:1920px; height:1080px')
          this.isActive = false
          this.num = id
        }
      }
      console.log(this.style[0])
      this.fullscreen = !this.fullscreen
    },
  },
}
</script>

<style  scoped>
.main {
  /* width: 1680px;
  height: 890px; */
  min-width: 1680px;
  height: 890px;
}
.ul {
  display: flex;
  flex-wrap: wrap;
}
.span {
  display: flex;
  justify-content: space-between;
}
</style>