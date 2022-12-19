<template>
	<view>
		<view class="goods-list">
			<view v-for="(item, i) in goodsListArr" :key="i" @click="goGetail(item.goods_id)">
				<goods :goodsInfo="item"></goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				qObj: {
					query: "", //搜索关键词
					pageNum: 1, //页码
					limit: 10 //当前页数据长度
				},
				goodsListArr: [], //商品的列表数组
				total: 0, //数据总长度
				isLoading: false //节流阀（开关）
			};
		},
		onLoad(options) {
			console.log(options)
			this.qObj.query = options.query;
			this.getGoodsListData();
		},
		methods: {
			async getGoodsListData(cb) {
				this.isLoading = true;
				const {
					data: res,
					header: resHeader
				} = await uni.$http.get("/api/search/goodsList", this.qObj);
				this.isLoading = false;
				//回调存在则调用关闭下拉窗口
				cb && cb();
				if(res.meta.status !== 200) return uni.$showMsg("商品列表数据,请求失败啦"); 
				this.goodsListArr = [...this.goodsListArr, ...res.message];
				this.total = resHeader["X-Total-Count"];
			},
			goGetail(goods_id){
				uni.navigateTo({
					url:"/subPackages/goodsDetail/goodsDetail?goods_id="+goods_id
				})
			}
		},
		//上拉触底,往下翻
		onReachBottom() {
			//如果请求的数据超出总数，就不再发起请求，并且提示用户已经加载完全部的数据			
			if (this.qObj.pageNum * this.qObj.limit >= this.total) return uni.$showMsg("没有数据了");
			if (this.isLoading) return; //上一个请求,还未结束
			this.qObj.pageNum += 1; //页面加1
			this.getGoodsListData(); //重新发送，请求下一页的数据	
		},
		//下拉刷新,往上翻
		onPullDownRefresh() {
			//重置数据
			this.qObj.pageNum = 1;
			this.qObj.total = 0;
			this.goodsListArr = [];
			this.isLoading = false;
			//更新数据，并且停止下拉刷新
			this.getGoodsListData(() => {
				uni.stopPullDownRefresh();//停止下拉刷新
			}); //请求下一页的数据
		}
	}
</script>

<style lang="scss">

</style>
