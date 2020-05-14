const baseUrl = "https://api-hmugo-web.itheima.net/api/public"
let num = 0
export const request = (option) => {
	num++
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中',
			mask: "true",
			icon: 'loading'
		});
		uni.request({
			...option,
			url: baseUrl + option.url,
			success: (res) => {
				resolve(res.data.message)
			},
			fail: (err) => {
				reject(err)
			},
			complete: () => {
				num--
				if(num === 0){
					uni.hideLoading()
				}
				
			}
		})
	})
}
