<template>
  <div>
    <div style="padding: 10px">
      <a-button class="button">下载缓存日志</a-button>
      <a-button class="button">回顾日志</a-button>
      <a-button class="button">自动分析</a-button>
    </div>
    <div style="padding: 10px">
      <a-button class="button">创建KML + gpx</a-button>
      <a-button class="button">PX4.Bin转.Log</a-button>
      <a-button class="button">创建Matlab文件</a-button>
    </div>
    <div style="padding: 10px">
      <a-button class="button1">Geo Reference Images</a-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>
<style scoped>
.button {
  margin-left: 3%;
  height: 70px;
  width: 28%;
  vertical-align: top;
}
.button1 {
  margin-left: 3%;
  height: 70px;
  width: 35%;
  vertical-align: top;
}
</style>