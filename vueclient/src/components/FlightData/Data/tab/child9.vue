<template>
  <div>
    <div style="padding: 10px">
      <span>脚本状态：没有脚本正在运行</span>
      <br />
      <span>所选脚本：无</span>
      <br />
      <a-checkbox v-model="checked" style="padding: 10px"
        >重定向程序输出</a-checkbox
      >
      <br />
      <a-button class="button" style="padding: 10px">选择脚本</a-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true,
    }
  },
}
</script>
<style scoped>
</style>