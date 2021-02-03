<template>
	<view>
		<image :src="bgImage" class="course-bg" mode="top"></image>
		<view class="course-title">
			<text></text>
			<text class="title">{{courseTitleInfo.title}}</text>
			<text class="learned-num">{{courseTitleInfo.joinnum}} 学生完成</text>
		</view>
		<!-- 课程语音导读 -->
		<view class="voice-intro">
			<image src="../../static/img/firstpage/katoon4.jpg" mode="widthFix"></image>
			<!-- 小学宝介绍语音播放组件 -->
			<simple-sound-player :soundImagesrcarr="soundImagesrcarr" :audioSrc="audioSrc"></simple-sound-player>
		</view>
		<!-- 课程动画 -->
		<view class="course-animation">
			<video :src="courseAnimation" :poster="posterImg" @error="videoErrorCallback" :danmu-list="danmuList" @ended="vedioEnded"
			 enable-danmu danmu-btn controls loop objectFit="fill"></video>
		</view>
		<!-- 练习题 -->
		<view class="practice-subject" @tap="goexampage">
			<view class="left-info">
				<view class="iconfont icon-renwu1"></view>
				<view>
					<view>练习</view>
					<view>共{{subjectNum}}道题</view>
				</view>
			</view>
			<template v-if="isCourseCompleted">
				<view class="right-star">★★★</view>
			</template>
			<template v-else>
				<button type="primary" size="mini">GO</button>
			</template>
		</view>
		<!-- 课程报告 -->
		<view class="course-report" v-if="isCourseCompleted">
			<view class="iconfont icon-kebiao"></view>
			<text>课程报告</text>
			<text>></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgImage: "../../static/img/mine/bg-self.jpg",
				courseTitleInfo: {
					title: "圆形、椭圆形",
					joinnum: "325654"
				},
				audioSrc: "../../static/sound/piano-1.mp3",
				soundImagesrcarr: [
					"../../static/img/course-main/pause.png",
					"../../static/img/course-main/play-sound.gif"
				],
				courseAnimation: "../../static/vedio/threemonk.mp4",
				posterImg: "https://timgmb04.bdimg.com/timg?haokan&quality=100&wh_rate=0&size=b576_324&ref=http%3A%2F%2Fwww.baidu.com&sec=1587082130&di=5cf98c37a29b76129756c93093e39b92&src=http%3A%2F%2Fvdposter.bdstatic.com%2Fb8ed7532fd02cb390ff6d5c2c926b933.jpeg",
				danmuList: [{
						text: '第 1s 出现的弹幕',
						color: '#ff0000',
						time: 1
					},
					{
						text: '第 3s 出现的弹幕',
						color: '#ff00ff',
						time: 3
					}
				],
				subjectNum: 3,
				isCourseCompleted: true
			};
		},
		onLoad(e) {
			this.courseTitleInfo = JSON.parse(e.course)
		},
		methods: {
			videoErrorCallback(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			vedioEnded() {
				console.log("videoEnded");
			},
			goexampage() {

			}
		}
	}
</script>

<style lang="scss">
	.course-bg {
		position: fixed;
		width: 100%;
		height: 150rpx;
		// z-index: 0;//默认值为0 值越大层越靠上；可取负值
		border-radius: 0 0 15rpx 15rpx;
		top: 0;
	}

	.course-title {
		position: fixed;
		width: 100%;
		display: flex;
		justify-content: space-around;
		top: 47rpx;
		color: white;

		text:nth-of-type(2) {
			font-size: 30rpx;
		}

		text:last-of-type {
			background-color: #15AAEE;
			border-radius: 20upx;
			font-size: 25upx;
			padding: 10upx;
		}
	}

	.voice-intro {
		display: flex;
		align-items: center; // 选择器下子元素垂直居中
		margin-top: 160rpx;

		>image {
			width: 150rpx;
			border-radius: 100%;
			margin-left: 20rpx;
			margin-right: 20rpx;
		}
	}

	.course-animation {
		display: flex;
		justify-content: center;
		margin: 20rpx;

		video {
			border-radius: 50rpx;
			width: 100%;
			height: 480rpx;
		}
	}

	.practice-subject {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 20rpx;
		border-radius: 20rpx;
		background-color: #F7F8F9;
		padding: 15rpx;

		.left-info {
			display: flex;

			.icon-renwu1 {
				width: 120rpx;
				height: 120rpx;
				border-radius: 100%;
				background-color: #74B9FC;
				color: #FFBB7E;
				font-size: 100rpx;
				margin-right: 15rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			view {
				justify-content: center;

				:first-child {
					font-size: 30upx;
				}

				:last-child {
					margin-top: 10upx;
					font-size: 25upx;
					color: #9FA3A8;
				}
			}
		}

		.right-star {
			font-size: 50rpx;
			color: #FFC057;
		}

		button {
			border-radius: 50rpx;
			margin: auto 0;
		}
	}

	.course-report {
		display: flex;
		align-items: center;
		margin: 20rpx;
		border-radius: 20rpx;
		background-color: #F7F8F9;
		padding: 10rpx;

		.icon-kebiao {
			color: #74B9FC;
			font-size: 60rpx;
		}

		text:nth-of-type(1) {
			margin-left: 10rpx;
			font-size: 30rpx;
		}

		text:nth-of-type(2) {
			font-size: 40rpx;
			margin-left: 65%;
			color: #ADB2B6;
		}
	}
</style>
