<template>
	<view class="search">
		<navigator class="Input">
			<uni-icons type="search" size="15"></uni-icons>
			<text>搜索</text>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.search{
		height: 90rpx;
		background-color: $uni-color-error;
		padding: 15rpx;
		.Input{
			height: 100%;
			background-color: $uni-bg-color;
			border-radius: 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

</style>
