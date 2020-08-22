<template>
	<view class="content">
		<image class="go-learn" src="@/static/img/firstpage/golearn.png" @tap="gotoTeach"></image>
		<view class="progress-box">
			<progress :percent="learnTimePercent" activeColor="#FD7D64" backgroundColor="#F8DFDB" active stroke-width="8" />
			<view class="progerss-desc">
				<text>今日学习0分钟</text>
				<text>目标10分钟</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				learnTimePercent: 80
			}
		},
		onLoad() {

		},
		methods: {
			gotoTeach() {
				uni.switchTab({
					url: "../bestTeach/bestTeach"
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		padding: 20rpx;

		>.go-learn {
			width: 100%;
			border-ridius: 20rpx;
		}

		>.progress-box {
			margin-top: 20rpx;
			padding: 10rpx 20rpx;
			border-radius: 20rpx;
			background-color: #F7F8FA;
			.progerss-desc {
				display: flex;
				justify-content: space-between;
				text {
					font-size: 25rpx;
					color: #666666;
				}
			}
		}
	}
</style>
