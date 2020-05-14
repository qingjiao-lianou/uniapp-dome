<template>
	<view class="home">
		<seachInput></seachInput>
		<!-- 轮播图 -->
		<swiper indicator-dots autoplay circular>
			<swiper-item v-for="(item,index) in swiperList" :key="item.goods_id">
				<image :src="item.image_src" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<!-- 导航栏 -->
		<view class="tabs">
			<view class="tabs_item" v-for="(item,index) in tabList" :key="index">
				<image :src="item.image_src" mode="widthFix"></image>
			</view>
		</view>
		<!-- 楼层图 -->
		<view class="floor">
			<view class="floor_item" v-for="(item,index) in floorList" :key="item.floor_title.name">
				<view class="floor_item_name">
					<image :src="item.floor_title.image_src" mode="widthFix"></image>
				</view>
				<view class="floor_item_content">
					<view class="floor_img" v-for="(item2,index2) in item.product_list" :key="index2">
						<image :src="item2.image_src" :mode="[index2 === 0?'aspectFill':'widthFix']"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import seachInput from '@/components/searchInput.vue'
	export default {
		data() {
			return {
				swiperList: [], //轮播图数据
				tabList: [], //导航数据
				floorList: [], //楼层图
			}
		},
		onLoad() {
			this.getData(),
				this.getTab(),
				this.getFloorList()
		},
		methods: {
			// 获取轮播图
			async getData() {
				const res = await this.$request({
					url: "/v1/home/swiperdata"
				})



				this.swiperList = res
			},
			// 获取导航
			async getTab() {
				const res = await this.$request({
					url: "/v1/home/catitems"
				})
				this.tabList = res
			},
			// 获取楼层
			async getFloorList() {
				const res = await this.$request({
					url: '/v1/home/floordata'
				})
				this.floorList = res
			}

		},
		components: {
			seachInput
		}
	}
</script>

<style lang="less">
	.home {
		swiper {
			height: 340rpx;
		}

		.tabs {
			display: flex;
			padding: 10rpx 0;

			.tabs_item {
				flex: 1;
				display: flex;
				justify-content: center;

				image {
					width: 80%;
				}
			}
		}

		.floor {
			.floor_item {
				.floor_item_name {
					image {}
				}

				.floor_item_content {
					overflow: hidden;

					.floor_img {
						box-sizing: border-box;
						float: left;
						width: 33.3333%;
						border-left: 5rpx solid #fff;
						border-right: 5rpx solid #fff;
					}

					view:nth-last-child(-n+4) {
						height: 750rpx / 3 * 386 / 232 / 2;

						image {
							height: 100%;
						}
					}

					view:nth-last-child(-n+2) {
						border-top: 5px solid #fff;
					}
				}
			}
		}
	}
</style>
