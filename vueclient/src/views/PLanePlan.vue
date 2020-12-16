<template>
  <div id="main" class="main">
    <el-row id="main" :gutter="5">
      <el-col id="main" class="gutter-row" :span="18">
        <div class="gutter-box1"><gdm></gdm></div>
      </el-col>
      <el-col class="gutter-row" :span="6">
        <div class="gutter-box1">
          <right />
        </div>
      </el-col>
    </el-row>
    <div style="height: 5px; background-color: black"></div>
    <el-row id="main" :gutter="5">
      <el-col id="main" :span="24">
        <div class="gutter-box2">
          <el-table
            :row-class-name="tableRowClassName"
            :row-style="selectedstyle"
            @row-click="rowClick"
            :default-sort="{ prop: 'name', order: 'ascending' }"
            :data="$store.state.planeData"
          >
            <el-table-column prop="name" label="name"> </el-table-column>
            <el-table-column prop="IP" label="IP"> </el-table-column>
            <el-table-column prop="type" label="类型"> </el-table-column>
            <el-table-column prop="longitude" label="经度"> </el-table-column>
            <el-table-column prop="latitude" label="纬度"> </el-table-column>
            <el-table-column prop="altitude" label="高度"> </el-table-column>
            <el-table-column prop="speed" label="水平速度"> </el-table-column>
            <el-table-column prop="verticalSpeed" label="垂直速度">
            </el-table-column>
            <el-table-column prop="pitch" label="俯仰角"> </el-table-column>
            <el-table-column prop="roll" label="横滚角"> </el-table-column>
            <el-table-column prop="yaw" label="偏航角"> </el-table-column>
            <el-table-column prop="state" label="状态"> </el-table-column>
            <el-table-column prop="mission" label="状态"> </el-table-column>
            <el-table-column prop="battery" label="电池电量"> </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
let getIndex = new Array()
import mqtt from 'mqtt'
var client = mqtt.connect('ws://192.168.61.31:1883')
import gdm from '../components/GdMap/index_data'
import mission from '../components/FlightData/Data/tab/mission'
import right from '../components/FlightPlan/FunctionRight/index'
export default {
  data() {
    return {
      message: '--',
      // getIndex: undefined,
    }
  },
  created() {},
  computed: {},
  methods: {
    selectedstyle({ row, rowIndex }) {
      if (getIndex.some((value) => value == rowIndex)) {
        return {
          'background-color': 'skyblue',
        }
      }
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex
      let num = getIndex.length
      getIndex.splice(0,num)
      if (this.$store.state.currentPlane.some((value) => value == row.IP)) {
        getIndex.push(row.index)
      }
      // console.log(getIndex)
      
    },
    rowClick(row) {
      getIndex.push(row.index)
      this.$store.commit('updateCurrentPlane', row.IP)
    },
    // selectedstyle({ row, rowIndex }) {
    //   if (this.getIndex === rowIndex) {
    //     return {
    //       'background-color': 'skyblue',
    //     }
    //   }
    // },
    // tableRowClassName({ row, rowIndex }) {
    //   row.index = rowIndex
    //   if (row.IP == this.$store.state.currentPlane) {
    //     this.getIndex = row.index
    //   }
    // },
    // rowClick(row) {
    //   this.getIndex = row.index
    //   this.$store.commit('updateCurrentPlane', row.IP)
    // },
  },

  components: {
    gdm,
    mission,
    right,
  },
}
</script>

<style scoped>
.main {
  background-color: black;
}

.gutter-box1 {
  height: 60vh;
  background-color: #fff;
  /* padding: 5px 0; */
}
.gutter-box2 {
  background-color: #fff;
  padding: 5px 0;
}
</style>