import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './assets/icon/iconfont.css'

import './style.css'

import './plugins/element.js'
import store from './store'
import http from './http'
import './directive.js'
import VueAMap from 'vue-amap';
// import { lazyAMapApiLoaderInstance } from 'vue-amap';

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueMermaid from "vue-mermaid";
import x2js from 'x2js' //xml数据处理插件
Vue.prototype.$x2js = new x2js() //全局方法挂载
Vue.use(VueMermaid);
Vue.use(VueQuillEditor);

Vue.config.productionTip = false;

Vue.prototype.$http = http
Vue.use(VueAMap);

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  key: '906ebc3ee865efb48dcb39f41ddcf921',
  plugin: ['AMap.GltfLoader', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],

  v: '1.4.4',
  uiVersion: '1.0'
});
// lazyAMapApiLoaderInstance.load().then(() => {
//   // your code ...
//   this.map = new AMap.Map('amapContainer', {
//     center: new AMap.LngLat(121.59996, 31.197646)
//   });
// });

Vue.use(Antd);


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
