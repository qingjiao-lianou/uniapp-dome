<template>
	<view class="goods_list">
		<seachInput></seachInput>
		<view class="tab_list">
			<view class="tab_list_item" :class="[currentIndex === index?'native':'']" v-for="(item,index) in tabList" :key="index"
			 @tap="handleClick(index)">
				{{item}}
			</view>
		</view>
		<scroll-view scroll-y @scrolltolower="scrolltolower" lower-threshold="50" v-if="currentIndex === 0" class="list_content">
			<navigator :url="'../goodsInfo/goodsInfo?goods_id=' + item.goods_id"  class="list_item"  v-for="(item,index) in goods" :key="item.goods_id">
				<view class="list_img">
					<image v-if="item.goods_small_logo" :src="item.goods_small_logo" mode="widthFix"></image>
					<image v-else src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3815293619,3023676718&fm=26&gp=0.jpg"
					 mode="widthFix"></image>
				</view>
				<view class="list_info">
					<view class="list_info_name">
						{{item.goods_name}}
					</view>
					<view class="list_price">
						￥{{item.goods_price}}
					</view>
				</view>
			</navigator>
			<view class="" v-show="isShow">
				<uni-load-more :status="loading"></uni-load-more>
			</view>

		</scroll-view>
		<!-- <view v-else-if="currentIndex === 1" class="">1</view>
		<view v-else class="">2</view> -->

	</view>
</template>

<script>
	import seachInput from '@/components/searchInput.vue';
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				currentIndex: 0,
				tabList: ["综合", "销量", "价值"],
				goodsPramas: {
					cid: "",
					query: "",
					pagenum: 1,
					pagesize: 10
				},
				goods: [],
				isShow: false
			}
		},
		onLoad(option) {
			this.goodsPramas.cid = option.cid
			this.getGoodsList()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.goods = []
			this.goodsPramas.pagenum = 1
			this.getGoodsList()
		},
		components: {
			seachInput,
			uniLoadMore
		},
		methods: {
			handleClick(index) {
				this.currentIndex = index
			},
			// 获取商品列表
			async getGoodsList() {
				const res = await this.$request({
					url: "/v1/goods/search",
					data: this.goodsPramas
				})
				// console.log(res)
				let arr = this.goods
				this.goods = res.goods
				this.isShow = this.goods.length === 0 ? true : false
				this.goods = [...arr, ...this.goods]
				// 数据请求成功后关闭刷新窗口
				uni.stopPullDownRefresh()
			},
			// 滚动触底
			scrolltolower() {
				this.goodsPramas.pagenum++
				if (this.isShow) {
					return
				}
				this.getGoodsList()
			}
			
		}
	}
</script>

<style lang="less">
	.goods_list {
		.tab_list {
			display: flex;

			.tab_list_item {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 35rpx;
				padding: 20rpx 0;
			}

			.native {
				color: red;
				border-bottom: 2rpx solid red;
			}

		}

		.list_content {
			height: 85vh;
			overflow: hidden;

			.list_item {
				display: flex;
				border-bottom: 1rpx solid #C0C0C0;
				padding: 10rpx;

				.list_img {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						width: 80%;
					}
				}

				.list_info {
					flex: 2;
					padding: 20rpx;
					font-size: 30rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;

					.list_info_name {
						display: -webkit-box;
						overflow: hidden;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.list_price {
						font-size: 32rpx;
						color: #dc514c;
					}
				}
			}
		}
	}
</style>
