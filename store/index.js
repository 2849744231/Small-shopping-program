import Vue from "vue"
import Vuex from "vuex"
import moduleCart from "./cart.js"
import moduleUser from "./user.js"
//将vuex挂载到Vue上
Vue.use(Vuex);
//创建一个store的实例对象
const store = new Vuex.Store({
	//将模块挂载到store上
	modules:{
		// moduleCart: moduleCart    (访问时通过moduleCart名称访问)
		moduleCart,
		moduleUser,
	}
})
export default store;