<template>
	<view class="body">
		<view class="clear-cache" @tap="clearCache">
			<text>清除缓存</text>
			<text>总计：{{currentCacheSize}}</text>
		</view>
		<view class="about-us">
			<text>关于我们</text>
			<text>></text>
		</view>
		<button type="primary" @tap="dologout">退出登录</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				currentCacheSize: 0
			};
		},
		onShow() {
			uni.setStorage({ //将数据存储在本地缓存中指定的 key 中
				key: 'storage_key' + Math.random(),
				data: 'helloaaaaaaaaaaaaaaaaaaaaaaaaaaaa123333333cxsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssshelloaaaaaaaaaaaaaaaaaaaaaaaaaaaa123333333cxsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssshelloaaaaaaaaaaaaaaaaaaaaaaaaaaaa123333333cxsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssshelloaaaaaaaaaaaaaaaaaaaaaaaaaaaa123333333cxssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
				success: function() {
					console.log('success');
				}
			});
		},
		onLoad() {
			uni.getStorageInfo({
				success: (res) => {
					if (res.currentSize < 1024) {
						this.currentCacheSize = res.currentSize + 'KB'
					} else if (res.currentSize >= 1024) {
						this.currentCacheSize = (res.currentSize/1024).toFixed(1) + 'M'
					}
				},
				fail: (res) => {
					console.log("res: " + JSON.stringify(res));
				}
			})
		},
		methods: {
			...mapMutations(['logout']),
			dologout() {
				this.logout()
				uni.navigateBack()
			},
			clearCache() {
				uni.showModal({
					title: "请选择",
					content: "确认清楚缓存吗？",
					success:(res) => {
						if (res.confirm) {
							uni.clearStorage() //清理本地数据缓存。
							this.currentCacheSize = 0
						} else if (res.cancel) {

						}
					}
				})
			},

		}
	}
</script>

<style lang="scss">
	.body {
		padding: 30rpx;

		view {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
			border-bottom: 2rpx solid #a4a8ad;
		}

		button {
			width: 80%;
		}
	}
</style>
