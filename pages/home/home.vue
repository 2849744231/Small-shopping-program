<template>
	<view>
		<view class="search">
			<!-- 点击跳转到分包中的搜索页面 -->
					<navigator url="../../subPackages/search/search" >
						<search></search>
					</navigator>
		</view>	
		<swiper indicator-dots="true" autoplay="true" circular="true" interval="1500" duration="1300">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator :url="`../../subPackages/goodsDetail/goodsDetail?goods_id=${item.goods_id}`">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<view class="grid-wrap">
			<view class="grid-item" v-for="(item, i) in navList" :key="i">
				<image :src="item.image_src"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="grid-floor">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<image class="floor-title" :src="item.floor_title.image_src"></image>
				<view class="img-box">
					<view class="l-box">
						<image :src="item.product_list[0].image_src"
							:style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
					</view>
					<view class="r-box">
						<view v-for="(it, dex) in item.product_list" :key="dex" v-if="dex !== 0">
							<image :src="it.image_src" :style="{width:it.image_width+'rpx'}" mode="widthFix">
							</image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			}

		},
		methods: {
			async getSwiperData() {
				const {
					data: res
				} = await uni.$http.get("/api/home/swiperdata");
				// console.log(res)
				if (res.meta.status !== 200) return uni.$showMsg("轮播请求失败，重新刷新，试试吧");
				this.swiperList = res.message;

			},
			async getNavData() {
				const {
					data: res
				} = await uni.$http.get("/api/home/catenav");
				if (res.meta.status !== 200) return uni.$showMsg("导航数据,请求失败");
				// console.log(res.message)
				this.navList = res.message;
			},
			async getFloorData() {
				const {
					data: res
				} = await uni.$http.get("/api/home/floordata");
				if (res.meta.status !== 200) return uni.$showMsg("推广数据,请求失败");
				console.log(res.message);
				this.floorList = res.message;
			}
		},
		//加载页面
		onLoad() {
			this.getSwiperData();
			this.getNavData();
			this.getFloorData();
		}
	}
</script>

<style lang="scss">
	.search{
		//吸顶
		position: sticky;
		top: 0;
		z-index: 999;
	}
	swiper {
		height: 330rpx;

		swiper-item,
		navigator,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.grid-wrap {
		display: flex;
		flex-flow: wrap;

		.grid-item {
			display: flex;
			flex-flow: column;
			justify-content: center;
			align-items: center;
			width: 20%;
			height: 150rpx;

			// background-color: #096;
			image {
				width: 60rpx;
				height: 60rpx;
			}

			text {
				margin-top: 2rpx;
				font-size: 24rpx;
			}
		}
	}

	.grid-floor {
		.floor-item {
			display: flex;
			flex-flow: wrap;

			.floor-title {
				width: 100%;
				height: 60rpx;
			}

			.img-box {
				display: flex;

				.l-box {
					width: 200rpx;

					image {
						width: 100%;
					}
				}

				.r-box {
					display: flex;
					flex-flow: wrap;
					justify-content: space-around;

				}
			}
		}
	}
</style>
