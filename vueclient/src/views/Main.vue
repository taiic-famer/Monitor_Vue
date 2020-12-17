<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router unique-opened :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-third-icon-renwu"></i> 任务监控</template
          >

          <el-menu-item-group>
            <template slot="title">飞行数据</template>
            <el-menu-item index="/planes/data">飞行数据</el-menu-item>
            <el-menu-item index="/planes/plan">飞行计划</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">服务器监控</template>
            <el-menu-item index="/metrics/data">服务器监控</el-menu-item>
            <el-menu-item index="/metrics/check">监控数据查询</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"
            ><i class="el-third-icon-renwu"></i> 任务部署</template
          >

          <el-menu-item-group>
            <!-- <template slot="title">mqtt</template> -->
            <el-menu-item index="/mqtt">任务部署</el-menu-item>
          </el-menu-item-group>
           <el-menu-item-group>
            <!-- <template slot="title">mqtt</template> -->
            <el-menu-item index="/planeToMission">部署查询</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"
            ><i class="el-third-icon-houtaiguanli"></i> 后台管理</template
          >
          <el-menu-item-group>
            <template slot="title">无人机</template>
            <!-- <el-menu-item index="/types/create">添加无人机类型</el-menu-item>
            <el-menu-item index="/types/list">无人机类型列表</el-menu-item> -->
            <el-menu-item index="/planes/create">添加无人机</el-menu-item>
            <el-menu-item index="/planes/list">无人机列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">消息</template>
            <el-menu-item index="/messages/create">添加消息</el-menu-item>
            <el-menu-item index="/messages/list">消息列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">任务</template>
            <el-menu-item index="/missions/create">添加任务</el-menu-item>
            <el-menu-item index="/missions/list">任务列表</el-menu-item>
            <!-- <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item> -->
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">docker镜像</template>
            <el-menu-item index="/images/create">添加镜像</el-menu-item>
            <el-menu-item index="/images/list">镜像列表</el-menu-item>
            <!-- <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header> -->

      <el-main>
        <keep-alive>
        <router-view :key="$route.path"></router-view></keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
  created() {},
}
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    return {}
  },
}
</script>