<template>
	<view class="category">
		<seachInput></seachInput>
		<!-- 左侧菜单 -->
		<view class="menu">
			<scroll-view scroll-y class="left_menu">
				<view @click="handleLeft(index)" class="left_menu_item" :class="[currentIndex === index ? 'native':'']" v-for="(item,index) in menuList"
				 :key="item.cat_id">
					{{item.cat_name}}
				</view>
			</scroll-view>
			<!-- 右侧菜单 -->
			<scroll-view scroll-y class="right_menu" :scroll-top="scrollTop" @scroll="scroll">
				<view class="right_menu_content" v-for="(item,index) in rightList" :key="index">
					<view class="menu_content_title">
						/{{item.cat_name}}/
					</view>
					<view class="menu_content_img">
						<navigator :url="'../goodsList/goodsList?cid='+ item2.cat_id" class="content_img_item" v-for="(item2,index2) in item.children"
						 :key="index2">
							<image :src="item2.cat_icon" mode="widthFix"></image>
							<text>{{item2.cat_name}}</text>
						</navigator>
					</view>
				</view>
			</scroll-view>

		</view>
	</view>
</template>

<script>
	import seachInput from '@/components/searchInput.vue'
	export default {
		data() {
			return {
				old: {
					scrollTop: 0
				},
				scrollTop: 0, //当前滚动调位置
				currentIndex: 0, //当前索引
				menuList: [], //菜单分类
				rightList: [], //右侧分类
			}
		},
		onLoad() {
			this.getMenuList()
		},
		methods: {
			// 获取分类数据
			async getMenuList() {
				const res = await this.$request({
					url: "/v1/categories"
				})
				this.menuList = res
				this.rightList = this.menuList[0].children
			},
			// 点击左侧菜单
			handleLeft(index) {
				this.currentIndex = index
				this.rightList = this.menuList[index].children
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
			},
			scroll(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			}
		},
		components: {
			seachInput
		}
	}
</script>

<style lang="less">
	.category {
		.menu {
			display: flex;
			overflow: hidden;
			height: calc(100vh - 90rpx);

			.left_menu {
				flex: 1;

				.left_menu_item {
					font-size: 30rpx;
					text-align: center;
					border-left: #FFFFFF solid 5rpx;
					padding: 20rpx;
					color: #999999;
				}

				.native {
					border-left: #f9554e solid 5rpx;
					color: #f9554e;
				}
			}

			.right_menu {
				flex: 3;

				.right_menu_content {
					.menu_content_title {
						font-size: 35rpx;
						font-weight: 600;
						text-align: center;
						padding: 15rpx 0;
					}

					.menu_content_img {
						display: flex;
						flex-wrap: wrap;
						// justify-content: space-between;
						margin: 15rpx 0;

						.content_img_item {
							width: 33.3%;
							text-align: center;
							padding: 15rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							align-items: center;

							image {
								width: 60%;
							}

							text {}
						}

					}
				}
			}
		}

	}
</style>
