export default {
	namespaced: true, //为当前模块开启命名空间，必须写
	state:{ //状态（数据）
		//初始时先进到本地取数据，有就赋值，没有就赋值空数组
		cart: JSON.parse(uni.getStorageSync("cart") || "[]") //购物车数组
	},
	mutations:{ //方法，用来修改state
		//将数据添加到cart数组
		addGoodsToCart(state, goods){ 
			let findGoods = state.cart.find(item=>item.goods_id === goods.goods_id)
			if(findGoods){
				//购物车中存在这件商品，只增加数量
				findGoods.goods_count ++ 
			}else{
				//购物车中不存在这件商品，整体push到数组中
				state.cart.push(goods);
			}			
			// 将购物车数据存到本地
			uni.setStorageSync("cart", JSON.stringify(state.cart));
		},		
		//通过商品的id删除购物车cart中对应的商品对象
		deleteGoods(state, goods_id){
			//过滤相同id的商品对象，返回新数组
			state.cart = state.cart.filter(item => { 
				return item.goods_id !== goods_id
			})
			// 将购物车数据同步存到本地
			uni.setStorageSync("cart", JSON.stringify(state.cart));
		}
		
	},
	getters:{
		//统计购物车中商品的总数量
		totalGoods(state){
			let n = 0;
			state.cart.forEach((item)=>{
				n += item.goods_count; 
			})
			return n;
		}
	}
}