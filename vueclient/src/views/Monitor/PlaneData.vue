<template>
  <div  class="main">
    <a-row  :gutter="5">
      <a-col :span="$store.state.mapSize">
        <div class="gdm"><gdm></gdm></div>
      </a-col>
      <a-col class="gutter-row" :span="7" v-if="$store.state.currentPlane[0]">
        <div class="gutter-box">
          <div style="width: 100%" class="row">
            <el-row
              ><el-col :span="12"
                ><img
                  src="../../assets/images/turn_coordinator.svg"
                  style="width: 200px" />
                <img
                  :src="airplaneUrl"
                  :class="{
                    pitchback: $store.getters.getPlaneDataByIP.pitch > 0,
                    pitchfront: $store.getters.getPlaneDataByIP.pitch < 0,
                  }"
                  class="frontground" /></el-col
              ><el-col :span="8">
                <div class="block">
                  <el-carousel height="200px" >
                    <el-carousel-item v-for="item in 2" :key="item" >
                      <div v-show="item == 1">
                        <span>速度（m/s）</span>
                        <br />
                        <span>{{ $store.getters.getPlaneDataByIP.speed }}</span>
                        <br />
                        <span>高度（m)</span>
                        <br />
                        <span>{{
                          $store.getters.getPlaneDataByIP.altitude
                        }}</span>
                      </div>
                      <div v-show="item == 2">
                        <span>偏航角</span>
                        <br />
                        <span>{{ $store.getters.getPlaneDataByIP.yaw }}</span>
                        <br />
                        <span>俯仰角</span>
                        <br />
                        <span>{{ $store.getters.getPlaneDataByIP.pitch }}</span>
                      </div>
                    </el-carousel-item>
                  </el-carousel>
                </div>
                <div><el-button size="mini" type="text" @click="button" class="rightButton">详细信息表</el-button></div>
              </el-col></el-row
            >
          </div>
           <div style="width: 100%; height: 5px; black solid" />
          <child class="right_bottom"></child>
        </div>
      </a-col>
    </a-row>
    <div>
      <el-dialog
        v-dialogDrag
        title="无人机列表"
        :visible.sync="dialogVisible"
        width="60%"
      >
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

          <el-table-column prop="battery" label="电池电量"> </el-table-column>
        </el-table>
      </el-dialog>

      <el-button  type="text" @click="button" class="button">
        <img src="../../assets/images/fold.png" alt="" />
      </el-button>
      <mission></mission>
    </div>
  </div>
</template>

<script>
import gdm from '../../components/GdMap/index_data'
import child from '../../components/FlightData/Data/index'
import mission from '../../components/missionData_planeToStation'  // 从无人机发送过来的mqtt任务消息
import airplanem from '../../assets/images/fi_tc_airplane_m.svg'
import airplanel from '../../assets/images/fi_tc_airplane_l.svg'
import airplaner from '../../assets/images/fi_tc_airplane_r.svg'
export default {
  data() {
    return {
      isReloadData: true,
      dialogVisible: false,
      items: [],
      pageSize: 2,
      getIndex: Number,
    }
  },
  created() {},
  computed: {
    airplaneUrl: function () {
      if (!this.$store.getters.getPlaneDataByIP) {
        return airplanem
      }
      if (this.$store.getters.getPlaneDataByIP.roll > 0) {
        return airplaner
      } else if (this.$store.getters.getPlaneDataByIP.roll < 0) {
        return airplanel
      } else {
        return airplanem
      }
    },
  },
  methods: {
    button() {
      this.dialogVisible = true
    },
    selectedstyle({ row, rowIndex }) {
      if (this.getIndex === rowIndex) {
        return {
          'background-color': 'skyblue',
        }
      }
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex
      if (row.IP == this.$store.state.currentPlane) {
        this.getIndex = row.index
      }
    },
    rowClick(row) {
      this.getIndex = row.index
      this.$store.commit('updateCurrentPlane', row.IP)
    },
  },

  components: {
    gdm,
    child,
    mission
  },
}
</script>

<style scoped>
.rightButton {
  position: absolute;
  right: 20px;
  bottom: 0;
}
.frontground {
  width: 200px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}
.pitchback {
  position: absolute;
  top: -10px;
}
.pitchfront {
  position: absolute;
  top: 10px;
}
.main {
  background-color: black;
  min-width: 1680px;
  height: 920px;
}

.gdm {
  height: 920px;
}
.right_bottom {
  height: 670px;
}
.button {
  position: absolute;
  top: -10px;
  left: 200px;
  z-index: 99;
}

.row {
  padding: 10px 0;
  background-color: #ffffff;
}
.row-bg {
  height: 80px;
  background-color: #262728;
}
.block {
  margin-top: 20px;
  margin-left: 0;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
}
</style>