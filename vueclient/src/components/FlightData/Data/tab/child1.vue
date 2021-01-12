<template>
  <div>
    <div class="main">
      <a-row class="row-bg">
        <a-col :span="11">
          <div class="grid-content title">无人机名称</div>
        </a-col>
        <a-col :span="11">
          <div class="grid-content title">无人机IP</div>
        </a-col>
      </a-row>
      <a-row class="row-bg">
        <a-col :span="11">
          <div class="grid-content content1">
            {{ $store.getters.getPlaneDataByIP.name }}
          </div>
        </a-col>
        <a-col :span="11">
          <div class="grid-content content2">
            {{ $store.getters.getPlaneDataByIP.IP }}
          </div>
        </a-col>
      </a-row>
      <div style="width: 100%; height: 0px; border-top: 1px black dashed" />
      <a-row class="row-bg">
        <a-col :span="11">
          <div class="grid-content title">无人机类型</div>
        </a-col>
        <a-col :span="11">
          <div class="grid-content title">无人机状态</div>
        </a-col>
      </a-row>
      <a-row class="row-bg">
        <a-col :span="11">
          <div class="grid-content content3">
            {{ $store.getters.getPlaneDataByIP.type }}
          </div>
        </a-col>
        <a-col :span="11">
          <div class="grid-content content4">
            {{ mission }}
          </div>
        </a-col>
      </a-row>
      <div style="width: 100%; height: 0px; border-top: 1px black dashed" />
      <a-row class="row-bg">
        <a-col :span="11">
          <div class="grid-content title">升降速度</div>
        </a-col>
        <a-col :span="11">
          <div class="grid-content title">电池电量</div>
        </a-col>
      </a-row>
      <a-row class="row-bg">
        <a-col :span="11">
          <div class="grid-content content5">
            {{ $store.getters.getPlaneDataByIP.verticalSpeed }}(m/s)
          </div>
        </a-col>
        <a-col :span="11">
          <div class="grid-content content6">
            {{ $store.getters.getPlaneDataByIP.battery }}(%)
          </div>
        </a-col>
      </a-row>
    </div>
    <!-- <div>
      <a-row class="row">
        <a-col :span="12">
          <div class="grid-content bg-purple-dark">无人机名称</div>
        </a-col>
        <a-col :span="12">
          <div class="grid-content bg-purple-dark">
            {{ $store.getters.getPlaneDataByIP.name }}
          </div>
        </a-col>
      </a-row>
      <a-row class="row">
        <a-col :span="12">
          <div class="grid-content bg-purple">无人机IP</div>
        </a-col>
        <a-col :span="12">
          <div class="grid-content bg-purple">
            {{ $store.getters.getPlaneDataByIP.IP }}
          </div>
        </a-col>
      </a-row>
      <a-row class="row">
        <a-col :span="12">
          <div class="grid-content bg-purple-light">类型</div>
        </a-col>
        <a-col :span="12">
          <div class="grid-content bg-purple-light">
            {{ $store.getters.getPlaneDataByIP.type }}
          </div>
        </a-col>
      </a-row>
      <a-row class="row">
        <a-col :span="12">
          <div class="grid-content bg-purple-dark">状态</div>
        </a-col>
        <a-col :span="12">
          <div class="grid-content bg-purple-dark">
            {{ $store.getters.getPlaneDataByIP.state }}
          </div>
        </a-col>
      </a-row>
      <a-row class="row">
        <a-col :span="12">
          <div class="grid-content bg-purple">速度</div>
        </a-col>
        <a-col :span="12">
          <div class="grid-content bg-purple">
            {{ $store.getters.getPlaneDataByIP.speed }}(m/s)
          </div>
        </a-col>
      </a-row>
      <a-row class="row">
        <a-col :span="12">
          <div class="grid-content bg-purple-light">升降速度</div>
        </a-col>
        <a-col :span="12">
          <div class="grid-content bg-purple-light">
            {{ $store.getters.getPlaneDataByIP.verticalSpeed }}(m/s)
          </div>
        </a-col>
      </a-row>
      <a-row class="row">
        <a-col :span="12">
          <div class="grid-content bg-purple-dark">位置</div>
        </a-col>
        <a-col :span="12">
          <div class="grid-content bg-purple-dark">
            {{ $store.getters.getPlaneDataByIP.longitude }}，
            {{ $store.getters.getPlaneDataByIP.latitude }}
          </div>
        </a-col>
      </a-row>
      <a-row class="row">
        <a-col :span="12">
          <div class="grid-content bg-purple">高度</div>
        </a-col>
        <a-col :span="12">
          <div class="grid-content bg-purple">
            {{ $store.getters.getPlaneDataByIP.altitude }}(m)
          </div>
        </a-col>
      </a-row>
      <a-row class="row">
        <a-col :span="12">
          <div class="grid-content bg-purple-light">电池</div>
        </a-col>
        <a-col :span="12">
          <div class="grid-content bg-purple-light">
            {{ $store.getters.getPlaneDataByIP.battery }}(%)
          </div>
        </a-col>
      </a-row>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    mission: function () {
      if (this.$store.getters.getPlaneDataByIP.state == 'mission') {
        return this.$store.getters.getMissionDataByIP.mission.split('.')[0]
      } else {
        return this.$store.getters.getPlaneDataByIP.state
      }
    },
  },

  created() {},
  methods: {},
}
</script>
<style  scoped>
.main {
  width: 100%;
}

.grid-content {
  padding: 20px;
  border-radius: 4px;

  line-height: 30px;
  text-indent: 20px;
  font-family: 'Microsoft YaHei';
  text-align: center;
}
.title {
  color: #ffffff;
  font-size: 20px;
}
.content1 {
  font-size: 25px;
  color: #d5b7e7;
}
.content2 {
  font-size: 25px;
  color: #ebae82;
}
.content3 {
  font-size: 25px;
  color: #ec9c99;
}
.content4 {
  font-size: 25px;
  color: #6ceb95;
}
.content5 {
  font-size: 25px;
  color: #ebeb96;
}
.content6 {
  font-size: 25px;
  color: #6cebe9;
}
.row {
  padding: 10px 0;
  background-color: #ffffff;
}
.row-bg {
  /* height: 96px; */
  height: 100px;
  background-color: #515151;
}
.block {
  margin-top: 20px;
  margin-left: 0;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
}
</style>
