<template>
	<view class="cart">
		<view class="address" v-if="!address">
			<button @click="getAddress" type="primary" plain size="mini">添加收货地址</button>
		</view>
		<view v-else class="address_text">
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
				<!-- 复选框 -->
				<checkbox-group @change="handleRadio(index)">
					<checkbox :checked="item.checked" />
				</checkbox-group>
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
							<uni-number-box :value="item.num" @change="bindChange($event,index)"></uni-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="cartList.length === 0" class="over_img">
			<image src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=210067401,4015769682&fm=26&gp=0.jpg" mode="widthFix"></image>
		</view>
		<!-- 结算 -->
		<view class="settle">
			<view class="checkbox_all">
				<checkbox-group @change="handleAll">
					<checkbox :checked="allChecked" />
				</checkbox-group>
				<text>全选</text>
			</view>
			<view class="settle_price">
				<view class="all_price">
					<text>合计：</text>
					<text class="price_text">￥{{allPrice.unitPrice}}</text>
					<view>
						包含运费
					</view>
				</view>
				<view @click="settlePrice" class="settle_price">
					结算({{allPrice.total}})
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
				allChecked: true,
				num: 0
			}
		},
		onShow() {
				this.cartList = uni.getStorageSync("carts")
				this.address = uni.getStorageSync('address')
				let arr = this.cartList.every(v => v.checked)
				this.allChecked = arr === true ? true : false
		},
		methods: {
			bindChange(value, index) {
				if (value === "0") {
					uni.showModal({
						title: '确定要删除吗',
						success: res => {
							if (res.confirm) {
								this.cartList.splice(index, 1)
							} else {
								this.cartList[index].num = 1
								return
							}
							uni.setStorageSync("carts", this.cartList)
						},
					})
				}

				this.cartList[index].num = Number(value)
				uni.setStorageSync("carts", this.cartList)


			},
			async getAddress() {
				try {
					const res = await this.getSetting()
					let auth = res.authSetting["scope.address"]
					if (auth === false) {
						// 打开授权页面
						await this.openSetting()
					}
					const res2 = await this.getChooseAddress()
					const {
						provinceName,
						cityName,
						countyName,
						detailInfo
					} = res2
					res2.city = provinceName + cityName + countyName + detailInfo
					this.address = res2
					uni.setStorageSync('address', this.address)
				} catch (err) {
					console.log(err)
				}

			},
			// 获取通讯地址
			getChooseAddress() {
				return new Promise((resolve, reject) => {
					uni.chooseAddress({
						success(res) {
							resolve(res)
						},
						fail(err) {
							reject(err)
						}
					})
				})
			},
			// 获取授权状态
			getSetting() {
				return new Promise((resolve, reject) => {
					uni.getSetting({
						success(res) {
							resolve(res)
						},
						fail(err) {
							reject(err)
						}
					})
				})
			},
			// 打开授权页面
			openSetting() {
				return new Promise((resolve, reject) => {
					uni.openSetting({
						success(res) {
							resolve(res)
						},
						fail(err) {
							reject(err)
						}
					})
				})
			},
			// 点击单选框是触发
			handleRadio(index) {
				this.cartList[index].checked = !this.cartList[index].checked
				let arr = this.cartList.every(v => v.checked)
				this.allChecked = arr === true ? true : false
				uni.setStorageSync("carts", this.cartList)
			},
			// 点击全选框触发
			handleAll() {
				this.allChecked = !this.allChecked
				this.cartList.map(v => {
					return v.checked = this.allChecked ? true : false
				})
				uni.setStorageSync("carts", this.cartList)
			},
			// 点击结算触发
			settlePrice() {
				if (this.address === "") {
					wx.showToast({
						title: '请选择收货地址',
						icon: 'none',
						mask: true,
					});
					return
				}
				if (this.num === 0) {
					wx.showToast({
						title: '请选择商品',
						icon: 'none',
						mask: true,
					});
					return
				}
				// console.log("跳转")
				uni.navigateTo({
					url:'../pay/pay'
				})
			}

		},
		computed: {
			// 计算总价
			allPrice() {
				let arr = []
				let PriceObj = {
					unitPrice: 0,
					total: 0
				}

				if (this.cartList.length === 0) {
					this.allChecked = false
					return PriceObj
				}
				this.cartList.forEach(v => {
					if (v.checked) {
						PriceObj.unitPrice += v.goods_price * v.num
						PriceObj.total += v.num
					}
				})
				this.num = PriceObj.total
				return PriceObj
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

			.address_name {}
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

				checkbox-group {
					flex: 1;
					display: flex;
					align-items: center;
				}

				.item_img {
					flex: 2;
					padding: 0 20rpx;
					display: flex;
					align-items: center;

					image {}
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

						.item_price {
							font-size: 30rpx;
							color: red;
						}

						.item_num {
							margin-right: -17rpx;
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

			.checkbox_all {
				display: flex;
				align-items: center;
				padding-left: 15rpx;
			}

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
