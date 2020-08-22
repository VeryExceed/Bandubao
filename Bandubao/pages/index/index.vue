<template>
	<view class="content">
		<image class="go-learn" src="@/static/img/firstpage/golearn.png" @tap="gotoTeach"></image>
		<!-- 学习进度条 -->
		<view class="progress-box">
			<progress :percent="learnTimePercent" activeColor="#FD7D64" backgroundColor="#F8DFDB" active stroke-width="8" />
			<view class="progerss-desc">
				<text>今日学习0分钟</text>
				<text>目标10分钟</text>
			</view>
		</view>
		<!-- 智能教辅 -->
		<view class="ai-teach-help">
			<view class="title">
				<text>智能教辅</text>
				<text>全学科的学习工具</text>
			</view>
			<view class="yuwen-shuxue-yingyu">
				<image src="@/static/img/firstpage/tubuyuwen.png"></image>
				<image src="@/static/img/firstpage/tongbushuxue.png"></image>
				<image src="@/static/img/firstpage/tongbuyingyu.png"></image>
			</view>
		</view>
		<!-- 工具区 -->
		<view class="tool-area">
			<view>
				<view class="iconfont icon-huaban"></view>
				<text>识字</text>
			</view>
			<view>
				<view class="iconfont icon-bi"></view>
				<text>听写</text>
			</view>
			<view>
				<view class="iconfont icon-beidanci"></view>
				<text>单词</text>
			</view>
			<view>
				<view class="iconfont icon-kousuanchutiqi"></view>
				<text>口算</text>
			</view>
			<view>
				<view class="iconfont icon-kouyu"></view>
				<text>口语</text>
			</view>
			<view>
				<view class="iconfont icon-tingli"></view>
				<text>听力</text>
			</view>
			<view>
				<view class="iconfont icon-lianzi"></view>
				<text>练字</text>
			</view>
			<view>
				<view class="iconfont icon-tingkepingke"></view>
				<text>听课文</text>
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

		>.ai-teach-help {
			.title {

				border-left: 10rpx solid #007Aff;
				border-ridius: 5rpx;
				margin: 20rpx 0;

				text:nth-of-type(1) {
					margin-left: 10rpx;
					font-size: 40rpx;
					font-weight: bold;
				}

				text:nth-of-type(2) {
					margin-left: 10rpx;
					font-size: 30rpx;
					color: #999999;
				}
			}

			.yuwen-shuxue-yingyu {
				display: flex;
				justify-content: space-between;

				image {
					width: 30%;
				}
			}
		}
		>.tool-area {
			margin-top:20rpx;
			background-color: #F7F8FA;
			border-radius: 20rpx;
			display: flex;
			flex-wrap: wrap;
			>view {
				width: 25%;
				text-align: center;
				view {
					color: #B079F8;
					font-size: 50rpx;
					font-weight: 300;
				}
				text {
					font-size: 25rpx;
				}
			}
		}
	}
</style>
