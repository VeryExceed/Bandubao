<template>
	<view class="content">
		<image class="go-learn" src="@/static/img/firstpage/golearn.png" @tap="gotoLearn"></image>
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
				<image src="@/static/img/firstpage/tubuyuwen.png" mode="aspectFit"></image>
				<image src="@/static/img/firstpage/tongbushuxue.png" mode="aspectFit"></image>
				<image src="@/static/img/firstpage/tongbuyingyu.png" mode="aspectFit"></image>
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
		<!-- 课本点读 -->
		<view class="phone-click-read">
			<view class="title">
				<text>课本点读</text>
				<text>手机变身智能点读机</text>
			</view>
			<image src="@/static/img/firstpage/shoujizhinengdu.png" mode=""></image>
		</view>
		<!-- 专项工具 -->
		<view class="special-tool">
			<view class="title">
				<text>专项工具</text>
			</view>
			<view>
				<scroll-view scroll-x>
					<view class="tools-area">
						<view>
							<view class="iconfont icon-icon_pk"></view>
							<text>全球PK</text>
						</view>
						<view>
							<view class="iconfont icon-huabankaobei-"></view>
							<text>讲故事</text>
						</view>
						<view>
							<view class="iconfont icon-huaban1"></view>
							<text>知识点</text>
						</view>
						<view>
							<view class="iconfont icon-weekly"></view>
							<text>作文</text>
						</view>
						<view>
							<view class="iconfont icon-jiachang_cuotiben"></view>
							<text>错题本</text>
						</view>
						<view>
							<view class="iconfont icon-zidian"></view>
							<text>字典</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 专题活动 -->
		<view class="special-activity">
			<view class="title">
				<text>专题活动</text>
			</view>
			<scroll-view scroll-x>
				<view class="activities">
					<view>
						<image src="@/static/img/firstpage/huodong.png" mode="widthFix"></image>
					</view>
					<view>
						<image src="@/static/img/firstpage/huodong.png" mode="widthFix"></image>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 学员风采 -->
		<view class="student-show">
			<view class="title">
				<text>学员风采</text>
				<text>></text>
			</view>
			<view>
				<view>
					<image src="@/static/img/firstpage/katoon1.jpg" mode="widthFix"></image>
					<view>张花花</view>
					<view>
						<text>北京</text><text>一年级</text>
					</view>
				</view>
				<view>
					<image src="@/static/img/firstpage/katoon2.jpg" mode="widthFix"></image>
					<view>王丽丽</view>
					<view>
						<text>天津</text><text>一年级</text>
					</view>
				</view>
				<view>
					<image src="@/static/img/firstpage/katoon3.jpg" mode="widthFix"></image>
					<view>李晶晶</view>
					<view>
						<text>河南</text><text>幼儿园</text>
					</view>
				</view>
				<view>
					<image src="@/static/img/firstpage/katoon4.jpg" mode="widthFix"></image>
					<view>刘芳菲</view>
					<view>
						<text>湖南</text><text>三年级</text>
					</view>
				</view>
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
			gotoLearn() {
				uni.switchTab({
					url: "../bestTeach/bestTeach"
				})
			}
		}
	}
</script>

<style lang="scss">
	@mixin titleStyle {
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
				@include titleStyle();

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
			margin-top: 20rpx;
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

		>.phone-click-read {
			.title {
				@include titleStyle();
			}

			image {
				width: 100%;
				height: 300rpx;
			}
		}

		>.special-tool {
			.title {
				@include titleStyle();
			}

			.tools-area {
				display: flex;
				height: 230rpx;

				view {
					width: 220rpx;
					background-color: #65D2FD;
					border-radius: 20rpx;
					margin-right: 20rpx;
					color: #FFFFFF;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					&:nth-of-type(2) {
						background-color: #BAEB44;
					}

					&:nth-of-type(4) {
						background-color: #FFC564;
					}

					&:nth-of-type(5) {
						background-color: #ffae5d;
					}

					&:nth-of-type(6) {
						background-color: #58bc58;
					}

					view {
						font-size: 60rpx;
						font-weight: bold;
						background-color: rgba(0, 0, 0, 0);
					}

					text {
						font-size: 25rpx;
					}
				}
			}
		}

		>.special-activity {
			.title {
				@include titleStyle();
			}

			.activities {
				display: flex;

				view {
					width: 500upx;
					margin-right: 20upx;
				}
			}



		}

		>.student-show {
			.title {
				@include titleStyle();
				display: flex;
				justify-content: space-between;

				text:nth-of-type(2) {
					width: 50rpx;
					height: 50rpx;
					text-align: center;
					background-color: #AEB1B5;
					color: white;
					border-radius: 100%;
				}
			}
			>view:nth-of-type(2) {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				>view{
					width: 50%;
					image{
						width: 90%;
						border-radius: 20rpx;
					}
					view:nth-of-type(2) {
						display: flex;
						justify-content: space-between;
						font-size: 25rpx;
						color: #AEB1B5;
						margin-right: 10%;
					}
				}
			}
		}
	}
</style>
