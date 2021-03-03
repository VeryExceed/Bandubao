<template>
	<view class="body-content">
		<image :src="bgImg" class="person-bg" mode="top"></image>
		<view class="welcome-word">{{welcomWord}}</view>
		<view class="person-head-area">
			<image :src="headImage" mode="widthFix"></image>
			<template v-if="hasLogin">
				<view class="login-info">
					<text>用户 {{userinfo.userName}}</text>
					<text>{{userinfo.grade}}</text>
				</view>
				<view class="iconfont icon-lianzi" @tap="modifyInfo"></view>
			</template>
			<template v-else>
				<view class="please-login">
					<text>登录得奖学金</text>
					<button type="default" size="mini" @tap="registerLogin">登录注册</button>
				</view>
			</template>
		</view>

		<!-- 开通VIP -->
		<view class="get-vip" @tap="openVIP">
			<image src="../../static/img/mine/getVIP.png" mode="widthFix"></image>
		</view>
		<!-- 个人设置列表 -->
		<view class="set-list">
			<!-- 分割线 -->
			<view style="border-bottom: 10rpx solid #F7F8F9; padding: 0;"></view>
			<!-- 邀请好友 -->
			<view @tap="inviteFriend">
				<view class="left">
					<view class="iconfont icon-yaoqing"></view>
					<text>邀请好友</text>
				</view>
				<text>></text>
			</view>
			<!-- 学习周报 -->
			<view class="weekly-report" @tap="viewWeeklyreport">
				<view class="left">
					<view class="iconfont icon-weekly"></view>
					<text>学习周报</text>
				</view>
				<text>></text>
			</view>
			<!-- 设置 -->
			<view class="app-set" @tap="setAppStates">
				<view class="left">
					<view class="iconfont icon-shezhi"></view>
					<text>设置</text>
				</view>
				<text>></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgImg: "../../static/img/mine/bg-self.jpg",
				welcomWord: "hi~欢迎来到学习园地！",
				headImage: "../../static/img/firstpage/katoon2.jpg",
				userinfo: {
					userName: "雯雯",
					grade: "一年级"
				},
				hasLogin: true
			};
		},
		methods: {
			modifyInfo() {
				uni.navigateTo({
					url:"../self-info/self-info"
				})
			},
			registerLogin() {

			},
			openVIP() {
				uni.navigateTo({
					url:"../member-center/member-center"
				})
			},
			inviteFriend() {},
			viewWeeklyreport(){
				uni.navigateTo({
					url:"../learning-report/learning-report"
				})
			},
			setAppStates() {}
		}
	}
</script>

<style lang="scss">
	.body-content {
		position: relative;
	}

	.person-bg {
		width: 100%;
		height: 300rpx;
		border-radius: 0 0 100rpx 100rpx;
	}

	.welcome-word {
		position: absolute;
		top: 80rpx;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.person-head-area {
		display: flex;
		align-items: center;
		width: 90%;
		height: 200rpx;
		margin: 0 auto;
		border-radius: 10rpx;
		box-shadow: 0 0 20rpx rgba(213, 213, 213, 255);
		position: absolute;
		background-color: white;
		left: 5%;
		top: 150rpx;

		>image {
			width: 150rpx;
			border-radius: 100%;
			margin-left: 10rpx;
		}

		.login-info {
			margin-left: 10rpx;
			display: flex;
			flex-direction: column;
			width: 80%;

			text {
				font-size: 30rpx;

				&:last-child {
					font-size: 20rpx;
				}
			}
		}

		.icon-lianzi {
			color: #ff05c9;
			font-size: 80rpx;
			margin-right: 10rpx;
		}

		.please-login {
			margin-left: 10rpx;
			width: 100%;
			display: flex;
			justify-content: space-between;

			>text {
				font-size: 30rpx;
			}

			>button {
				background-color: #FFDD57;
				margin: 0;
				border-radius: 50rpx 0 0 50rpx;
				position: static;
				padding-top: 10rpx;
				padding-bottom: 10rpx;
			}
		}
	}

	.get-vip {
		margin: 60rpx 0 10rpx 0;
		display: flex;
		align-items: center;
		height: 120rpx;

		image {
			width: 100%; //image mode=widthFix时，保持图片填充满外层view元素
			margin: 0 5%;
		}
	}

	.set-list>view {
		margin: 0 5%;
		padding: 30rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 5rpx solid #F7F8F9;

		.left {
			display: flex;
			align-items: center;

			.iconfont {
				font-size: 40rpx;
				margin-right: 20rpx;
			}

			.icon-weekly {
				color: #8BDFFF;
			}

			.icon-shezhi {
				color: #BDBEC0;
			}

			.icon-yaoqing {
				color: #c06305;
			}
		}

		>text {
			color: #C4C4C6;
		}
	}
</style>
