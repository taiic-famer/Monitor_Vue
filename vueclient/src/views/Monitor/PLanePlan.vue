<template>
  <div class="main">
    <el-row :gutter="5">
      <el-col :span="18" class="left">
        <gdm></gdm>
      </el-col>
      <el-col :span="6" class="right">
        <right></right>
      </el-col>
    </el-row>
    <div style="height: 5px; width: 100% background-color: black"></div>

    <div class="bottom">
      <el-table
        :row-class-name="tableRowClassName"
        :row-style="selectedstyle"
        @row-click="rowClick"
        :default-sort="{ prop: 'name', order: 'ascending' }"
        :data="$store.getters.getData"
      >
        <el-table-column prop="name" label="name" sortable> </el-table-column>
        <el-table-column prop="IP" label="IP" sortable> </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          :filters="[
            { text: '固定翼', value: '固定翼' },
            { text: '四旋翼', value: '四旋翼' },
          ]"
          :filter-method="filterType"
        >
        </el-table-column>
        <el-table-column prop="longitude" label="经度" sortable>
        </el-table-column>
        <el-table-column prop="latitude" label="纬度" sortable>
        </el-table-column>
        <el-table-column prop="altitude" label="高度" sortable>
        </el-table-column>
        <el-table-column prop="speed" label="水平速度" sortable>
        </el-table-column>
        <el-table-column prop="verticalSpeed" label="垂直速度" sortable>
        </el-table-column>
        <el-table-column prop="pitch" label="俯仰角" sortable>
        </el-table-column>
        <el-table-column prop="roll" label="横滚角" sortable> </el-table-column>
        <el-table-column prop="yaw" label="偏航角" sortable> </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          :filters="state"
          :filter-method="filterState"
        >
        </el-table-column>
        <!-- <el-table-column  label="任务"> </el-table-column> -->
        <el-table-column prop="battery" label="电池电量" sortable>
        </el-table-column>
      </el-table>
      <mission></mission>
    </div>
  </div>
</template>

<script>
let getIndex = new Array()
import mqtt from 'mqtt'
var client = mqtt.connect('ws://192.168.61.31:1883')
import gdm from '../../components/GdMap/index_data'
import right from '../../components/FlightPlan/FunctionRight/index'
import mission from '../../components/missionData_planeToStation'
export default {
  data() {
    return {
      message: '--',
      // getIndex: undefined,
    }
  },
  created() {},
  computed: {
    state: function () {
      let arr = []
      let temp = []
      // console.log(this.$store.getters.getData)
      let temp1 = []
      for (let i = 0; i < this.$store.getters.getData .length; i++) {
        temp1.push(this.$store.getters.getData[i].state)
      }
      temp= Array.from(new Set(temp1))
      for (let i = 0; i < temp.length; i++) {
        arr.push({})
        this.$set(arr[i], 'text', temp[i])
        this.$set(arr[i], 'value', temp[i])
      }
      return arr
    },
  },
  methods: {
    filterType(value, row, column) {
      const property = column['property']
      return row[property] == value
    },
    filterState(value, row, column) {
      const property = column['property']
      return row[property] == value
    },
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
      getIndex.splice(0, num)
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
  min-width: 1680px;
  height: 910px;
}
.left {
  height: 562px;
}
.right {
  height: 562px;
  /* background-color: #fff; */
  /* padding: 5px 0; */
}

.bottom {
  background-color: #fff;
  padding: 5px 0;
  height: 345px;
}
</style>