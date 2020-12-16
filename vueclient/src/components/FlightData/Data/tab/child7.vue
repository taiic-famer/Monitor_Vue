<template>
  <div>
    <div style="padding: 10px">
      <a-button class="button">加载日志</a-button>
      <a-button class="button">播放日志</a-button>
      <a-button class="button">Tlog > Kml 或图像</a-button>
    </div>
    <div style="padding: 10px">
      <a-progress
        :text-inside="true"
        :stroke-width="26"
        :percentage="70"
      ></a-progress>
    </div>
    <div style="padding: 10px">
      <a-button class="button">0.1</a-button>
      <a-button class="button">0.25</a-button>
      <a-button class="button">0.5</a-button>
      <a-button class="button">1x</a-button>
      <a-button class="button">2x</a-button>
      <a-button class="button">5x</a-button>
      <a-button class="button">10x</a-button>
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
  height: 30px;
}
</style>