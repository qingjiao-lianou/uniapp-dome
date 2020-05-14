<template>
	<view class="auth">
		<button open-type="getUserInfo" @getuserinfo="getuserinfo" type="default">授权</button>
	</view>
</template>

<script>
	export default {
		methods:{
		async	getuserinfo(e){
			// let code = ''
				const {encryptedData,rawData,iv,signature} = e
				const {code} = await this.getcode()
				console.log(code)
				const tokenObj = {encryptedData,rawData,iv,signature,code}
		  //       const res = await this.$request({
				// 	url:"https://api.zbztb.cn/api/public/v1/users/wxlogin",
				// 	method: "post",
				// 	data:tokenObj
				// })
				// console.log(res)
				uni.request({
					url:"https://api.zbztb.cn/api/public/v1/users/wxlogin",
					method: "post",
					data:tokenObj,
					success(res) {
						console.log(res)
					}
				})
			},
			getcode(){
				return new Promise((resolve,reject)=>{
					uni.login({
						success(res) {
							resolve(res)
						},
						fail(err) {
							reject(err)
						}
					})
				})
			}
		}
	}
</script>

<style>
</style>
