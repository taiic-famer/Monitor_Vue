<template>
  <div class="right">
    <div class="category">分类显示</div>
    <el-row
      ><el-col :span="12">
        <ul class="ul">
          <li
            v-for="(value, key) in arr"
            :key="key"
            @click="categoryClick(value)"
          >
            {{ key }}
          </li>
        </ul>
        <el-button type="mini" class="btn" @click="categoryChange"
          >确定</el-button
        > </el-col
      ><el-col :span="12">
        <ul class="ulChecked">
          <li
            v-for="(value, key) in this.$store.getters.getCategoryByClick"
            :key="key"
          >
            <input
              type="checkbox"
              :id="key"
              :value="value"
              v-model="checkedCategory"
            />
            {{ value }}
          </li>
        </ul>
        <ul
          class="ulCheckedBattery"
          v-if="$store.state.currentCategory == 'battery'"
        >
          <li>
            <input
              type="checkbox"
              id="key80"
              :value="80"
              v-model="checkedCategory"
            /><label>100~80</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="key60"
              :value="60"
              v-model="checkedCategory"
            /><label>79~60</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="key40"
              :value="40"
              v-model="checkedCategory"
            /><label>59~40</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="key20"
              :value="20"
              v-model="checkedCategory"
            /><label>39~20</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="key0"
              :value="0"
              v-model="checkedCategory"
            /><label>19~0</label>
          </li>
        </ul>
      </el-col></el-row
    >
    <!-- <span>{{checkedCategory}}</span> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: {
        无人机IP: 'IP',
        无人机类型: 'type',
        无人机状态: 'state',
        无人机任务: 'mission',
        电池电量: 'battery',
      },
      checkedCategory: [],
    }
  },
  methods: {
    categoryClick(val) {
      this.$store.commit('updateCurrentCategory', val)
    },
    del(item) {
      let listVar = new Array()
      for (let i = 0; i < this.checkedCategory.length; i++) {
        listVar.push(this.planesMsg)
        if (this.planesMsg[i] == item) {
          listVar[i].splice(i, 1)
        }
      }
    },
    categoryChange() {
      this.$store.commit('updateCurrentCheckedCategory', this.checkedCategory)
      console.log(this.$store.state.currentCategory)
      console.log(this.$store.state.currentCheckedCategory)
      // console.log(this.$store.getters.getCategoryPlane)
      this.$store.commit(
        'updateCurrentPlane',
        this.$store.getters.getCategoryPlane
      )
    },
  },
}
</script>
<style scoped>
.right {
  background-color: #fff;
  height: 562px;
  width: 100%;
}
.button {
  width: 70%;
}
.category {
  text-align: center;
  line-height: 50px;
  font-size: 25px;
  font-weight: bold;
}

.ul {

  padding: 20px;
  line-height: 74px;
  font-weight: bold;
  font-size: 20px;
}
.btn {
  margin-left: 20px;
}
.ulChecked {
  margin-top: 20px;
  padding: 20px;
  line-height: 30px;
  font-family: 'Times New Roman', Times, serif;
  font-size: 20px;
}
.ulCheckedBattery {
  position: absolute;
  top: 0;
  margin-top: 20px;
  padding: 20px;
  line-height: 30px;
  font-family: 'Times New Roman', Times, serif;
  font-size: 20px;
}
</style>