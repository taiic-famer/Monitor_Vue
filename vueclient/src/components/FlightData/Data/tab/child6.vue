<template>
  <div>
    <div style="padding: 10px">
      <a-button class="button">低</a-button>
      <a-button class="button">中</a-button>
      <a-button class="button">高</a-button>
      <a-button class="button">切换</a-button>
      <!-- <a-tag class="button" type="info">5</a-tag> -->
      <a-input class="input" v-model="input5_1" placeholder="1100"></a-input>
      <a-input class="input" v-model="input5_2" placeholder="1900"></a-input>
    </div>
    <div style="padding: 10px">
      <a-button class="button">低</a-button>
      <a-button class="button">中</a-button>
      <a-button class="button">高</a-button>
      <a-button class="button">切换</a-button>
      <!-- <a-tag class="button" type="info">6</a-tag> -->
      <a-input class="input" v-model="input6_1" placeholder="1100"></a-input>
      <a-input class="input" v-model="input6_2" placeholder="1900"></a-input>
    </div>
    <div style="padding: 10px">
      <a-button class="button">低</a-button>
      <a-button class="button">中</a-button>
      <a-button class="button">高</a-button>
      <a-button class="button">切换</a-button>
      <!-- <el-tag class="button" type="info">7</el-tag> -->
      <a-input class="input" v-model="input7_1" placeholder="1100"></a-input>
      <a-input class="input" v-model="input7_2" placeholder="1900"></a-input>
    </div>
    <div style="padding: 10px">
      <a-button class="button">低</a-button>
      <a-button class="button">中</a-button>
      <a-button class="button">高</a-button>
      <a-button class="button">切换</a-button>
      <!-- <el-tag class="button" type="info">8</el-tag> -->
      <a-input class="input" v-model="input8_1" placeholder="1100"></a-input>
      <a-input class="input" v-model="input8_2" placeholder="1900"></a-input>
    </div>
    <div style="padding: 10px">
      <a-button class="button">低</a-button>
      <a-button class="button">中</a-button>
      <a-button class="button">高</a-button>
      <a-button class="button">切换</a-button>
      <!-- <el-tag class="button" type="info">9</el-tag> -->
      <a-input class="input" v-model="input9_1" placeholder="1100"></a-input>
      <a-input class="input" v-model="input9_2" placeholder="1900"></a-input>
    </div>
    <div style="padding: 10px">
      <a-button class="button">低</a-button>
      <a-button class="button">中</a-button>
      <a-button class="button">高</a-button>
      <a-button class="button">切换</a-button>
      <!-- <el-tag class="button" type="info">10</el-tag> -->
      <a-input class="input" v-model="input10_1" placeholder="1100"></a-input>
      <a-input class="input" v-model="input10_2" placeholder="1900"></a-input>
    </div>
    <div style="padding: 10px">
      <a-button class="button">低</a-button>
      <a-button class="button">中</a-button>
      <a-button class="button">高</a-button>
      <a-button class="button">切换</a-button>
      <!-- <el-tag class="button" type="info">11</el-tag> -->
      <a-input class="input" v-model="input11_1" placeholder="1100"></a-input>
      <a-input class="input" v-model="inpu11_2" placeholder="1900"></a-input>
    </div>
    <div style="padding: 10px">
      <a-button class="button">低</a-button>
      <a-button class="button">中</a-button>
      <a-button class="button">高</a-button>
      <a-button class="button">切换</a-button>
      <!-- <el-tag class="button" type="info">12</el-tag> -->
      <a-input class="input" v-model="input12_1" placeholder="1100"></a-input>
      <a-input class="input" v-model="input12_2" placeholder="1900"></a-input>
    </div>
    <div style="padding: 10px">
      <a-button class="button">低</a-button>
      <a-button class="button">中</a-button>
      <a-button class="button">高</a-button>
      <a-button class="button">切换</a-button>
      <!-- <el-tag class="button" type="info">13</el-tag> -->
      <a-input class="input" v-model="input13_1" placeholder="1100"></a-input>
      <a-input class="input" v-model="input13_2" placeholder="1900"></a-input>
    </div>
    <div style="padding: 10px">
      <a-button class="button">低</a-button>
      <a-button class="button">中</a-button>
      <a-button class="button">高</a-button>
      <a-button class="button">切换</a-button>
      <!-- <el-tag class="button" type="info">14</el-tag> -->
      <a-input class="input" v-model="input14_1" placeholder="1100"></a-input>
      <a-input class="input" v-model="input14_2" placeholder="1900"></a-input>
    </div>
    <div style="padding: 10px">
      <a-button class="button">低</a-button>
      <a-button class="button">高</a-button>
      <a-button class="button">切换</a-button>
      <a-tag class="button" type="info">Relay 1</a-tag>
    </div>
    <div style="padding: 10px">
      <a-button class="button">低</a-button>
      <a-button class="button">高</a-button>
      <a-button class="button">切换</a-button>
      <a-tag class="button" type="info">Relay 2</a-tag>
    </div>
    <div style="padding: 10px">
      <a-button class="button">低</a-button>
      <a-button class="button">高</a-button>
      <a-button class="button">切换</a-button>
      <a-tag class="button" type="info">Relay 3</a-tag>
    </div>
    <div style="padding: 10px">
      <a-button class="button">低</a-button>
      <a-button class="button">高</a-button>
      <a-button class="button">切换</a-button>
      <a-tag class="button" type="info">Relay 4</a-tag>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input5_1: '',
      input5_2: '',
      input6_1: '',
      input6_2: '',
      input7_1: '',
      input7_2: '',
      input8_1: '',
      input8_2: '',
      input9_1: '',
      input9_2: '',
      input10_1: '',
      input10_2: '',
      input11_1: '',
      input11_2: '',
      input12_1: '',
      input12_2: '',
      input13_1: '',
      input13_2: '',
      input14_1: '',
      input14_2: '',
    }
  },
}
</script>
<style scoped>
.button {
  margin-left: 1%;
  height: 30px;
}
.input {
  width: 16%;
  height: 30px;
  margin-left: 3%;
}
</style>