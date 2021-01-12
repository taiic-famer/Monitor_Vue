import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Main = () => import('../views/Main.vue')
const PlaneData = () => import('../views/Monitor/PlaneData.vue')
const PlanePlan = () => import('../views/Monitor/PlanePlan.vue')
const Gazebo = () => import('../views/Monitor/Gazebo.vue')
const Gazebo1 = () => import('../views/Monitor/Gazebo1.vue')
const MetricData = () => import('../views/Monitor/MetricData.vue')
const MetricCheck = () => import('../views/Monitor/MetricCheck.vue')
const Mqtt = () => import('../views/Deployment/Mqtt.vue')
const PlaneToMission = () => import('../views/Deployment/PlaneToMission.vue')
const MessageEdit = () => import('../views/Management/MessageEdit.vue')
const MessageList = () => import('../views/Management/MessageList.vue')
const PlaneEdit = () => import('../views/Management/PlaneEdit.vue')
const PlaneList = () => import('../views/Management/PlaneList.vue')
const MissionEdit = () => import('../views/Management/MissionEdit.vue')
const MissionList = () => import('../views/Management/MissionList.vue')
const ImageEdit = () => import('../views/Management/DockerImageEdit.vue')
const ImageList = () => import('../views/Management/DockerImageList.vue')
const GzwebEdit = () => import('../views/Management/GzwebEdit.vue')
const GzwebList = () => import('../views/Management/GzwebList.vue')
import Login from '../components/login.vue'
import err404 from '../views/404.vue'



const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: err404,
    hidden: true
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/planes/data',
        component: PlaneData
      },
      {
        path: '/planes/plan',
        component: PlanePlan
      },
      {
        path: '/gazebo',
        component: Gazebo
      },
      {
        path: '/gazebo1',
        component: Gazebo1
      },
      {
        path: '/metrics/data',
        component: MetricData
      },
      {
        path: '/metrics/check',
        component: MetricCheck
      },
      {
        path: '/mqtt',
        component: Mqtt
      },
      {
        path: '/planeToMission',
        component: PlaneToMission
      },
      {
        path: '/messages/create',
        component: MessageEdit

      },
      {
        path: '/messages/edit/:id',
        component: MessageEdit,
        props: true
      },
      {
        path: '/messages/list',
        component: MessageList,

      },

      {
        path: '/planes/create',
        component: PlaneEdit

      },
      {
        path: '/planes/edit/:id',
        component: PlaneEdit,
        props: true
      },
      {
        path: '/planes/list',
        component: PlaneList,

      },

      {
        path: '/missions/create',
        component: MissionEdit

      },
      {
        path: '/missions/edit/:id',
        component: MissionEdit,
        props: true
      },
      {
        path: '/missions/list',
        component: MissionList
      },

      {
        path: '/images/create',
        component: ImageEdit

      },
      {
        path: '/images/edit/:id',
        component: ImageEdit,
        props: true
      },
      {
        path: '/images/list',
        component: ImageList
      },

      {
        path: '/gzweb/create',
        component: GzwebEdit

      },
      {
        path: '/gzweb/edit/:id',
        component: GzwebEdit,
        props: true
      },
      {
        path: '/gzweb/list',
        component: GzwebList
      }

    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
