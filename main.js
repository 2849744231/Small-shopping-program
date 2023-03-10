// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 按需导入 $http 对象
import {
	$http
} from '@escook/request-miniprogram'
//导入全家桶
import store from "./store/index.js"

// 将按需导入的 $http 挂载到 wx 顶级对象之上，方便全局调用
uni.$http = $http;
// 配置请求根路径
// $http.baseUrl = 'http://www.yz520.xyz';
$http.baseUrl = 'http://localhost:666';
// 请求拦截器:请求开始之前做一些事情
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中...',
	})
}
// 响应拦截器:请求完成之后做一些事情
$http.afterRequest = function() {
	uni.hideLoading()
}
//封装一个全局的消息提示框
uni.$showMsg=function(title="数据请求失败",duration=1500,icon="none"){
	uni.showToast({
		title,
		duration, //提示时间
		icon
	})
}


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store//全家桶挂载，到vue实例
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
