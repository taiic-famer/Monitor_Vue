<template>
  <div class="main">
    <h2>Prometheus查询</h2>
    <el-input
      type="textarea"
      v-model="metricsData.name"
      @keyup.enter="getValue"
      style="height: 3rem; width: 50vw; margin-bottom: 50px"
    ></el-input>
    <el-button
      type="primary"
      @click="getValue"
      style="height: 3rem; margin-left: 20px; margin-bottom: 50px"
      :disabled="metricsData.name == ''"
      >查询</el-button
    >
    <h2>查询结果</h2>
    <div style="height: 2px; background-color: black"></div>
    <!-- <input type="text" v-model="name" @keyup.enter="getValue" placeholder="请输入查询的metric" /> -->
    <p v-for="(item, index) in metricsData.metric" :title="item" :key="index">
      {{ index + 1 }}
      {{ item.metric }}
      {{ item.value[1] }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      metricsData: {
        name: '',
        metric: '',
        value: '',
      },
    }
  },
  methods: {
    getValue() {
      // console.log(that.metricsData.name)
      this.$http
        .get(
          'http://192.168.81.41:32008/api/v1/query?query=' +
            this.metricsData.name
        )
        .then(
          (response) => {
            // console.log(response)
            this.metricsData.metric = response.data.data.result
            this.metricsData.value = response.data.data.result[0].value
            // console.log(this.metricsData.value)
          },
          (err) => {
            console.log(err)
          }
        )
    },
  },
}
</script>

<style  scoped>
.main {
  width: 1680px;
  height: 890px;
}
</style>
