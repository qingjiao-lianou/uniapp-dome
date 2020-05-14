<template>
	<view class="search">
		<uni-search-bar @input="input"></uni-search-bar>
		<view class="search_content">
			<view @click="handleTo(item.goods_id)" class="search_item" v-for="(item,index) in searchContent" :key="item.goods_id">
				{{item.goods_name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchContent: []
			}
		},
		methods: {
			input(e) {
				const {
					value
				} = e
				clearTimeout(timer)
				let timer = setTimeout(() => {
					this.getData(value)
				}, 1000)

			},
			async getData(value) {
				// if(value === ""){
				// 	return
				// }
				const res = await this.$request({
					url: "/v1/goods/qsearch",
					data: {
						query: value.trim()
					}
				})
				// console.log(res)
				this.searchContent = res
			},
			handleTo(id){
				uni.navigateTo({
					url:`../goodsInfo/goodsInfo?goods_id=${id}`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.search {
		.search_content {
			font-size: 35rpx;
			padding: 15rpx;

			.search_item {
				padding: 15rpx 10rpx;
				border-bottom: 1rpx solid #FFFFFF;
				background-color: #dcdedc;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
</style>
