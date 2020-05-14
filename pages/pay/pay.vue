<template>
	<view class="cart">
		<view class="address_text">
			<view class="address_iph">
				<text>收货人:{{address.userName}}</text>
				<text>{{address.telNumber}}</text>
			</view>
			<view class="address_name">
				{{address.city}}
			</view>
		</view>
		<view class="cart_text">
			购物车
		</view>
		<!-- 购物车商品 -->
		<view class="cart_list">
			<view class="cart_list_item" v-for="(item,index) in cartList" :key="item.goods_id">
				<!-- 图片 -->
				<view class="item_img">
					<image :src="item.goods_small_logo" mode="widthFix"></image>
				</view>
				<view class="item_content">
					<view class="item_name">{{item.goods_name}}</view>
					<view class="item_price_num">
						<view class="item_price">
							￥{{item.goods_price}}
						</view>
						<view class="item_num">
							X{{item.num}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 结算 -->
		<view class="settle">
			<view></view>
			<view class="settle_price">
				<view class="all_price">
					<text>合计：</text>
					<text class="price_text">￥{{PriceObj.unitPrice}}</text>
					<view>
						包含运费
					</view>
				</view>
				<view @click="toAuth" class="settle_price">
					支付({{PriceObj.total}})
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				cartList: [],
				address: '',
				PriceObj: {
					unitPrice: 0,
					total: 0
				}
			}
		},
		onLoad() {
			this.cartList = uni.getStorageSync("carts").filter(v => v.checked)
			this.address = uni.getStorageSync('address')
			this.cartList.forEach(v => {
				this.PriceObj.unitPrice += v.goods_price * v.num
				this.PriceObj.total += v.num
			})
		},
		methods:{
			toAuth(){
				uni.navigateTo({
					url:"../auth/auth"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.cart {
		.address {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 20rpx 0;
		}

		.address_text {
			padding: 20rpx 10rpx;

			.address_iph {
				display: flex;
				justify-content: space-between;
			}

		}

		.cart_text {
			font-size: 40rpx;
			padding: 15rpx;
			border-top: 1rpx solid red;
			border-bottom: 1rpx solid red;
		}

		.cart_list {
			.cart_list_item {
				display: flex;
				padding: 15rpx;
				border-bottom: 1rpx solid #999999;

				.item_img {
					flex: 2;
					padding: 0 20rpx;
					display: flex;
					align-items: center;
				}

				.item_content {
					flex: 5;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.item_name {
						color: #808080;
						display: -webkit-box;
						overflow: hidden;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.item_price_num {
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 35rpx;

						.item_price {
							// font-size: 30rpx;
							color: red;
						}

					}
				}
			}
		}

		.settle {
			width: 100%;
			display: flex;
			justify-content: space-between;
			position: fixed;
			bottom: 0;
			border-top: 1rpx solid #999999;

			.settle_price {
				display: flex;

				.all_price {
					font-size: 32rpx;
					padding-right: 10rpx;

					.price_text {
						color: red;
					}

					view {
						font-size: 28rpx;
						margin-left: 110rpx;
					}
				}

				.settle_price {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 35rpx;
					color: #FFFFFF;
					width: 180rpx;
					background-color: #dd524d;
				}
			}
		}
	}
</style>
