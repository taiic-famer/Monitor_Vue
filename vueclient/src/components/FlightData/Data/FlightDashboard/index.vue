<template>
  <div style="padding:30px;">
    <select v-model="selected1" style="height:50px; width:100%">
      <option v-for="option in options" v-bind:value="option.value">{{ option.text }}</option>
    </select>
    <div style="height:300px; width:500px">
      <iframe
        src="http://192.168.61.31:5500/static/FlightDashboardPlugin/index.html"
        width="100%"
        height="100%"
        frameborder="0"
      ></iframe>
    </div>
    <div>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark">无人机序号</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark">{{ selected1.ID }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">无人机IP</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">{{ selected1.IP }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">高度</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{ selected1.Altitude }}(m)</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark">速度</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark">{{ selected1.Speed }}(m/s)</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">升降速度</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">{{ selected1.UPDown }}(m/s)</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">任务</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{ selected1.Mission }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark">任务距离</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-dark">{{ selected1.Dis }}(m)</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">电量</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">{{ selected1.Power }}(%)</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">其他信息</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{ selected1.Other }}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected1: {
        ID: '0',
        IP: '0',
        Altitude: '0',
        Speed: '0',
        UPDown: '0',
        Mission: '0',
        Dis: '0',
        Power: '0',
        Other: '0',
      },
      options: [
        {
          text: '无人机1',
          value: {
            ID: '1',
            IP: '1',
            Altitude: '1',
            Speed: '1',
            UPDown: '1',
            Mission: '1',
            Dis: '1',
            Power: '1',
            Other: '1',
          },
        },
        {
          text: '无人机2',
          value: {
            ID: '2',
            IP: '2',
            Altitude: '2',
            Speed: '2',
            UPDown: '2',
            Mission: '2',
            Dis: '2',
            Power: '2',
            Other: '2',
          },
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
  height: 30px;
}
.bg-purple {
  background: #d3dce6;
  height: 30px;
}
.bg-purple-light {
  background: #e5e9f2;
  height: 30px;
}
.grid-content {
  border-radius: 4px;
  min-height: 50px;
  text-align: left;
  line-height: 50px;
  font-size: 900px;
  font-size: 30px;
  color: orange;
  text-indent: 20px;
  font-family: 'Microsoft YaHei';
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
