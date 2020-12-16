import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1.安装插件
Vue.use(Vuex)

// 2.创建对象
const state = {
  currentPlane: [],
  planeData: [],
  mapSize: 24,
  currentCategory: '',
  currentCheckedCategory: [],

}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {}
})

// 3.导出store对象
export default store