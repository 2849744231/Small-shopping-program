<template>
	<view>
		<view class="cart-title">
			<text>购物车 ({{totalGoods}}) </text>
		</view>
		<view class="goods-list">
			<uni-swipe-action>
				 <block v-for="(item, i) in cart" :key="i">
					<uni-swipe-action-item :right-options="options" @click="swipeClick(item.goods_id)">
						<goods 
							:goodsInfo="item" 
							:showRadio="true" 
							:showNumber="true" 
							@change-num="changeNum" 
							@change-checked="changeState"
						>
						</goods>
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
		</view>
		<!-- 结算 -->
		<view class="settlement-wrap">
			<label @click="clickAllBtn" class="radio">
				<radio :checked="isAllChecked" color="#c00"></radio>
				<text>全选</text>
			</label>
			<view class="total">合计: {{checkedGoodsTotal}} <!--选择的商品的总价格--></view>
			<view class="btn">结算({{checkedGoodsSum}}<!--勾选的商品数量-->)</view> 
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations}  from "vuex"
	export default {
		data() {
			return {
				options:[
					{
						text:"删除",
						style:{
							backgroundColor:"#c00"
						}
					}
				],
				// isAllChecked:false //全选按钮的状态
			};
		},
		computed:{
			...mapState("moduleCart", ["cart"]),
			...mapGetters("moduleCart", ["totalGoods", "checkedGoodsSum","checkedGoodsTotal"]),
			isAllChecked(){
				//购物车中全部的商品数量 === 已勾选的商品数量
				return this.totalGoods === this.checkedGoodsSum  //true全选   false取消权限
			}
		},
		methods:{
			...mapMutations("moduleCart", ["deleteGoods", "updateGoodsCount", "updateGoodsChecked","updateAllGoodsChecked"]),
			//点击左滑出现的删除按钮
			swipeClick(goods_id){
				// console.log(goods_id);
				this.deleteGoods(goods_id)
			},
			//在父组件中定义修改商品数量，该changeNum()由子组件触发, 同时接收子组件传过来的参数
			changeNum(goodsInfo){
				this.updateGoodsCount(goodsInfo)
			},
			//在父组件中定义修改商品状态，该changeState()由子组件触发, 同时接收子组件传过来的参数
			changeState(goodsInfo){
				this.updateGoodsChecked(goodsInfo)
			},
			//点击全选按钮，把当前购物车中所有的商品的状态进行处理
			clickAllBtn(){
				// this.isAllChecked = !this.isAllChecked
				this.updateAllGoodsChecked(!this.isAllChecked)
			},
			
			
			
		}
	}
</script>

<style lang="scss">
	.goods-list{
		padding-bottom: 50px;
	}
	.settlement-wrap{
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 50px;
		background-color: #fff;
		font-size: 14px;
		.radio{
			display: flex;
			align-items: center;
		}
		.btn{
			width: 100px;
			height: 50px;
			background-color: #c00;
			line-height: 50px;
			text-align: center;
			color: #fff;
		}
	}
</style>
