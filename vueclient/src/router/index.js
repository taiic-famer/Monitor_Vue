import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import PlaneData from '../views/Monitor/PlaneData.vue'
import PlanePlan from '../views/Monitor/PlanePlan.vue'
import Gazebo from '../views/Monitor/Gazebo.vue'
import MetricData from '../views/Monitor/MetricData.vue'
import MetricCheck from '../views/Monitor/MetricCheck.vue'
import Mqtt from '../views/Deployment/Mqtt.vue'
import PlaneToMission from '../views/Deployment/PlaneToMission.vue'
import MessageEdit from '../views/Management/MessageEdit.vue'
import MessageList from '../views/Management/MessageList.vue'
import PlaneEdit from '../views/Management/PlaneEdit.vue'
import PlaneList from '../views/Management/PlaneList.vue'
import MissionEdit from '../views/Management/MissionEdit.vue'
import MissionList from '../views/Management/MissionList.vue'
import ImageEdit from '../views/Management/DockerImageEdit.vue'
import ImageList from '../views/Management/DockerImageList.vue'
import Login from '../components/login.vue'
import err404 from '../views/404.vue'

Vue.use(VueRouter)

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
