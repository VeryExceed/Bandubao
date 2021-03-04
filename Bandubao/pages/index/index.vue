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
		<!-- 推荐 -->
		<view class="share-xiaoxuebao">
			<button type="primary" @tap="shareXiaoxuebao">
				<text>推荐小学宝APP</text>
				<view class="iconfont icon-icon-test4"></view>
			</button>
		</view>
		<!-- 弹出年级选择 -->
		<popup-grada ref="popupGradeIndex" @hidePopup="hidePopup"></popup-grada>
		<!-- 分享示例 -->
		<uni-popup ref="popupShare" type="bottom" @change="change">
			<uni-popup-share title="分享到" @select="select"></uni-popup-share>
		</uni-popup>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	
	export default {
		data() {
			return {
				learnTimePercent: 80
			}
		},
		onLoad() {

		},
		computed:mapState(['userinfo']),
		// 监听导航栏按钮点击事件
		onNavigationBarButtonTap(e) {
			if (e.index == 1) {
				this.$refs.popupGradeIndex.showPopup()
			}
		},
		onShow() {
			// #ifdef APP-PLUS
			var webView = this.$mp.page.$getAppWebview();
			// 修改buttons
			// index: 按钮索引, style {WebviewTitleNViewButtonStyles }  
			webView.setTitleNViewButtonStyle(1, {  
			    text: this.userinfo.grade,  
			});  
			// #endif 
		},
		methods: {
			...mapMutations(['updateUserinfo']),
			gotoLearn() {
				uni.switchTab({
					url: "../bestTeach/bestTeach"
				})
			},
			hidePopup(text) {
				this.userinfo.grade = text
				this.updateUserinfo(this.userinfo)
				//移动端APP适用，H5端不适用
				// #ifdef APP-PLUS  
				// $getAppWebview() 可以得到当前webview的对象实例
				var webView = this.$mp.page.$getAppWebview();
				// 修改buttons  
				webView.setTitleNViewButtonStyle(1, {
					text: text
				})
				// #endif
			},
			// 打开分享示例
			shareXiaoxuebao() {
				this.$refs.popupShare.open()
			},
			/**
			 * popup 状态发生变化触发
			 * @param {Object} e
			 */
			change(e) {
				console.log('popup ' + e.type + ' 状态', e.show)
			},
			/**
			 * 选择内容
			 */
			select(e, done) {
				uni.showToast({
					title: `您选择了第${e.index+1}项：${e.item.text}`,
					icon: 'none'
				})
				if (e.item.name == 'more') {
					// #ifdef APP-PLUS
					plus.share.sendWithSystem({
						content: '分享内容',
					})
					// #endif
				} else {
					uni.share({
						provider: `${e.item.provider}`,
						scene: `${e.item.scene}`,
						type: 2,
						imageUrl: "../../static/img/firstpage/gokearn.png",
						success: function(res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function(err) {
							console.log("fail:" + JSON.stringify(err));
						}
					});
				}
				done()
			},
		}
	}
</script>

<style lang="scss">
	// title 混合器
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

				>view {
					width: 50%;

					image {
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

	.share-xiaoxuebao {
		margin-top: 20rpx;
	}

	.share-xiaoxuebao>button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60%;
		background: #F7F8F9;
	}

	.share-xiaoxuebao>button>text {
		color: #000000;
		font-size: 25rpx;
	}

	.share-xiaoxuebao>button>view {
		margin-left: 6rpx;
		color: #000000;
		font-weight: bold;
	}
</style>
