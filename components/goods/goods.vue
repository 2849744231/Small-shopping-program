<template>
	<!-- 商品当前项 -->
	<view class="goods-item" >
		<!-- 左侧 -->
		<view class="goods-item-l">
			<image :src="goodsInfo.pictures_small[0]" class="goods-img"></image>
		</view>
		<!-- 右侧 -->
		<view class="goods-item-r">
			<view class="goods-name">{{goodsInfo.goods_name}}</view>
			<view class="goods-price">￥{{goodsInfo.goods_price}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"goods",
		props:{
			goodsInfo:{
				type: Object,
				default:{} //默认值为空对象
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.goods-item{
		width: 750rpx;
		display: flex;
		padding: 6px;
		border-bottom: 1px solid #f0f0f0;
		box-sizing: border-box;
		.goods-item-l{
			.goods-img{
				display: block;
				width: 100px;
				height: 100px;
			}
		}
		.goods-item-r{
			display: flex;
			margin-left: 6px;
			flex-direction: column;
			justify-content: space-between;
			.goods-name{
				font-size: 14px;
			}
			.goods-price{
				font-size: 16px;
				color: #f00;
			}
		}
	}
</style>
