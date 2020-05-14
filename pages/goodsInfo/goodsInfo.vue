<template>
	<view class="goods_info">

		<!-- 轮播图 -->
		<swiper indicator-dots autoplay circular>
			<swiper-item @click="preImage(index)" v-for="(item,index) in goodsInfo.pics" :key="item.pics_id">
				<image :src="item.pics_mid_url" mode="aspectFit"></image>
			</swiper-item>
		</swiper>
		<!-- 价格 -->
		<view class="goods_price">
			<text>￥{{goodsInfo.goods_price}}</text>
		</view>
		<!-- 标题 -->
		<view class="info_content">
			<view class="info_name">
				{{goodsInfo.goods_name}}
			</view>
			<view class="collec" @click="handleCollec">
				<uni-icons color="red" :type="[collecShow === false?'heart':'heart-filled']" size="20"></uni-icons>
				<text>收藏</text>
			</view>
		</view>
		<!-- 图文详情 -->
		<view class="image_info">
			<view class="image_info_title">图文详情</view>
			<view>
				<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
			</view>
		</view>
		<uni-goods-nav class="tab_cart" fill :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//heart-filled
				collecShow: false, //该商品是否被收藏
				goodsInfo: {},
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'redo',
					text: '分享',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}

		},
		onLoad(option) {
			this.getGoodsInfo(option.goods_id)
		},
		methods: {
			// 点击收藏
			handleCollec() {
				let collecList = uni.getStorageSync("collec") || []
				let index = collecList.findIndex(v => v.goods_id === this.goodsInfo.goods_id)
				if (index !== -1) {
					collecList.splice(index, 1)
					this.collecShow = false
					uni.showToast({
						title: "取消成功"
					})
				} else {
					collecList.push(this.goodsInfo)
					this.collecShow = true
					uni.showToast({
						title: "收藏成功"
					})
				}

				uni.setStorageSync("collec", collecList)

			},
			async getGoodsInfo(goods_id) {
				const res = await this.$request({
					url: "/v1/goods/detail",
					data: {
						goods_id
					},
				})
				// console.log(res)
				this.goodsInfo = res
				let collecList = uni.getStorageSync("collec") || []
				let index = collecList.findIndex(v => v.goods_id === this.goodsInfo.goods_id)
				this.collecShow = index === -1 ? false : true
				let cartList = uni.getStorageSync("carts") || []
				const numb = cartList.findIndex(v => v.goods_id === this.goodsInfo.goods_id)
				console.log(numb)
				 this.options[2].info = numb !== -1?cartList[numb].num:0
			},
			// 预览图片
			preImage(current) {
				let urls = this.goodsInfo.pics.map(v => v.pics_sma_url)
				uni.previewImage({
					current,
					urls
				})
			},
			onClick(e) {
				const {
					index
				} = e
				if (index === 0) {
					uni.showToast({
						title: '我是客服',
						icon: 'none'
					})
				} else if (index === 1) {
					uni.showToast({
						title: '分享成功，噢耶！',
						icon: 'none'
					})
				} else {
					uni.switchTab({
						url: '../cart/cart'
					})
				}
			},
			buttonClick(e) {
				const {
					index
				} = e
				if (index === 0) {
					uni.showToast({
						title: '加入成功',
						mask: true
					})
					const {
						goods_name,
						goods_price,
						goods_small_logo,
						goods_id
					} = this.goodsInfo

					let cartList = uni.getStorageSync("carts") || []
					// this.options[2].info = cartInfo.num
					const numb = cartList.findIndex(v => {
						return v.goods_id === goods_id
					})
					
					if (numb == -1) {
						let cartInfo = {
							goods_id,
							goods_name,
							goods_price,
							goods_small_logo,
							num: 1,
							checked: true
						}
						cartList.push(cartInfo)
						this.options[2].info = 1
					} else {
						cartList[numb].num++
					}
					uni.setStorageSync('carts', cartList)
					 this.options[2].info = cartList[numb].num
				}
			}

		}

	}
</script>

<style lang="less">
	.goods_info {
		swiper {
			height: 520rpx;
		}

		.goods_price {
			font-size: 35rpx;
			color: #dd524d;
			font-weight: 600;
			padding-left: 15rpx;
		}

		.info_content {
			display: flex;
			border-bottom: 15rpx solid #C0C0C0;
			padding: 10rpx;
			margin: 0 10rpx;

			.info_name {
				flex: 5;
				font-size: 32rpx;
				border-right: 1rpx solid #666666;
				display: -webkit-box;
				overflow: hidden;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.collec {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
			}
		}

		.image_info {
			.image_info_title {
				font-size: 35rpx;
				font-weight: 900;
				color: #dd524d;
				padding: 15rpx;
			}
		}

		.tab_cart {
			width: 100%;
			position: fixed;
			bottom: 0;
			// left:0
		}
	}
</style>
