<template>
  <div>
    <el-tabs value="base" type="border-card" class="main"
      ><el-tab-pane label="基本信息" name="base" class="main"
        ><child1 /> </el-tab-pane
      ><el-tab-pane label="任务信息" name="mission" class="main"
        ><mission /></el-tab-pane
    ></el-tabs>
    <!-- <div style="width: 100%; height: 20%">
      <a href="javascript:void(0)" @click="tabChange(child1)">
        <a-tag>快速</a-tag>
      </a>
      <a href="javascript:void(0)" @click="tabChange(mission)">
        <a-tag>任务</a-tag>
      </a>
      <a href="javascript:void(0)" @click="tabChange(child2)">
        <a-tag>动作</a-tag>
      </a>
      <a href="javascript:void(0)" @click="tabChange(child3)">
        <a-tag>起飞前检查</a-tag>
      </a>
      <a href="javascript:void(0)" @click="tabChange(child4)">
        <a-tag>仪表</a-tag>
      </a>
      <a href="javascript:void(0)" @click="tabChange(child5)">
        <a-tag>状态</a-tag>
      </a>
      <a href="javascript:void(0)" @click="tabChange(child6)">
        <a-tag>舵机</a-tag>
      </a>
      <a href="javascript:void(0)" @click="tabChange(child7)">
        <a-tag>遥测日志</a-tag>
      </a>
      <a href="javascript:void(0)" @click="tabChange(child8)">
        <a-tag>数据闪存日志</a-tag>
      </a>
      <a href="javascript:void(0)" @click="tabChange(child9)">
        <a-tag>脚本</a-tag>
      </a>
      <a href="javascript:void(0)" @click="tabChange(child10)">
        <a-tag>消息</a-tag>
      </a>
      <a href="javascript:void(0)" @click="tabChange(child11)">
        <a-tag>载荷控制</a-tag>
      </a>
    </div>
    <div style="background-color: #1b1010; height: 2px; width: 100%"></div>
    <div style="width: 100%; height: 70%">
      <div :is="currentView"></div>
    </div> -->
  </div>
</template>

<script>
// 导入子组件
import child1 from './tab/child1'
import child2 from './tab/child2'
import child3 from './tab/child3'
import child4 from './tab/child4'
import child5 from './tab/child5'
import child6 from './tab/child6'
import child7 from './tab/child7'
import child8 from './tab/child8'
import child9 from './tab/child9'
import child10 from './tab/child10'
import child11 from './tab/child11'
import mission from './tab/mission'

export default {
  data() {
    return {
      child1: 'child1',
      child2: 'child2',
      child3: 'child3',
      child4: 'child4',
      child5: 'child5',
      child6: 'child6',
      child7: 'child7',
      child8: 'child8',
      child9: 'child9',
      child10: 'child10',
      child11: 'child11',
      mission: 'mission',
      currentView: 'child1', // 默认选中第一项
    }
  },
  methods: {
    tabChange(tabItem) {
      this.currentView = tabItem
    },
  },
  components: {
    child1,
    child2,
    child3,
    child4,
    child5,
    child6,
    child7,
    child8,
    child9,
    child10,
    child11,
    mission,
  },
}
</script>
<style scoped>
.main {
  /* padding: 0; */
  height: 100%;
}
</style>