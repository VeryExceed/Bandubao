<template>
	<view>
		<view class="ysw-tab">
			<text :class="{'ysw-active':tabIndex==0}" @tap="tapselect(0)">语文</text>
			<text :class="{'ysw-active':tabIndex==1}" @tap="tapselect(1)">数学</text>
			<text :class="{'ysw-active':tabIndex==2}" @tap="tapselect(2)">英语</text>
		</view>
		<view class="ysw-swiper">
			<swiper :current="tabIndex" @change="swiperChange" :style="{height:swiperheight+'rpx'}">
				<swiper-item v-for="(item,name) in yswlessonsmore" :key="name">
					<scroll-view scroll-y class="list">
						<block v-for="(item2,index) in item">
							<view class="lesson-intro">
								<image :src="item2.corverImg" class="cover-img" mode="widthFix"></image>
								<view class="introduction">
									<view class="first-line">
										<text v-if="item2.isNew" class="new-lesson">新课</text>
										<text>{{item2.title}}</text>
									</view>
									<view class="second-line">{{item2.alreadyLearnedNum}}</view>
									<view class="third-line">
										<text>￥{{item2.price}}</text>
										<button size="mini" hover-class="none">会员免费</button>
									</view>
								</view>
							</view>
						</block>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 0,
				swiperheight: 1080,
				yswlessonsmore: {}
			};
		},
		onLoad(e) {
			this.$http.get('/api/lessonmore-list', {})
				.then(res => {
					// console.log('res==' + JSON.stringify(res.data));
					this.yswlessonsmore = res.data
				})
				.catch(err => {

				});
			let title = '';
			switch (e.type) {
				case "synclesson":
					title = '同步课'
					break;
				case "holidaylesson":
					title = '寒暑课'
					break;
				case "speciallesson":
					title = '专题课'
					break;
				case "shootlesson":
					title = '冲刺课'
					break;
				default:
					break;
			}
			// #ifdef APP-PLUS
			const currentWebview = this.$mp.page.$getAppWebview(); // 获取Webview实例
			currentWebview.setStyle({
				titleNView: {
					titleText: title
				}
			})
			// #endif
			if (e["yswtype"]) {
				switch (e["yswtype"]) {
					case "chineseLessonless":
						this.tabIndex = 0;
						break;
					case "mathLessonless":
						this.tabIndex = 1;
						break;
					case "englishLessonless":
						this.tabIndex = 2;
						break;
					default:
						break;
				}
			}
		},
		methods: {
			tapselect(i) {
				this.tabIndex = i
			},
			swiperChange(e) {
				this.tabIndex = e.detail.current
			}
		}
	}
</script>

<style lang="scss">
	.ysw-tab {
		display: flex;
		justify-content: space-around;
		color: #A4A8AD;
		padding: 10upx 0;

		>text {
			padding: 10upx 40upx;

			&.ysw-active {
				color: #31B5F2;
				background-color: #E5F7FF;
				border-radius: 30upx;
			}
		}
	}


	.lesson-intro {
		display: flex;
		margin: 20rpx;

		>image {
			width: 200rpx;
		}

		>.introduction {
			margin-left: 20rpx;

			>view {
				margin-top: 20rpx;

				&.first-line>text.new-lesson {
					color: white;
					background-color: #FF7C64;
					text-align: center;
					border-radius: 26rpx 0 26rpx 0;
					padding: 10rpx;
					font-size: 25rpx;
					margin-right: 20rpx;
				}

				&.second-line {
					color: #A4A8AD;
				}

				&.third-line {
					display: flex;

					>text {
						font-size: 40rpx;
						color: #FF7C64;
						padding-bottom: 10rpx;
					}

					>button {
						background-color: #FEF1DC;
						color: #FDC782;
						margin-left: 25rpx;
						font-weight: bold;
						// height:60upx;
						// display: flex;
						// align-items: center;
						height: fit-content;
						font-size: 30upx;
						border-radius: 50upx;

						//去除原button组件的默认边框
						&::after {
							content: none;
						}
					}
				}
			}
		}
	}

	.no-data {
		margin-left: 20rpx;
	}

	.ysw-swiper .list {
		height: 100%;
	}
</style>
