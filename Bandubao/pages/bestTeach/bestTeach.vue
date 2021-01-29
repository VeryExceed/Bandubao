<template>
	<view class="body">
		<!-- 自定义导航栏 -->
		<uni-nav-bar @clickLeft="selectGrade" @clickRight="openWrongNote" fixed>
			<view class="lesson-bar-left" slot="left">
				<text>{{selectedGrade}} ▼</text>
			</view>
			<view class="lesson-bar-middle">
				<button type="default" :class="{'select-active':selectActive}" @tap="selectLearnButtonChange('select')">选课</button>
				<button type="default" :class="{'select-active':!selectActive}" @tap="selectLearnButtonChange('learn')">上课</button>
			</view>
			<view class="lesson-bar-right iconfont icon-jiachang_cuotiben" slot="right"></view>
		</uni-nav-bar>
		<template v-if="selectActive">

			<!-- 课程类别区 -->
			<view class="lesson-category-stage">
				<view class="sync-lesson" @tap="openLessonDetail('synclesson')">
					<view class="iconfont icon-jiachang_shujia"></view><text>同步课</text>
				</view>
				<view class="holidy-lesson" @tap="openLessonDetail('holidaylesson')">
					<view class="iconfont icon-rili"></view><text>寒暑课</text>
				</view>
				<view class="special-lesson" @tap="openLessonDetail('speciallesson')">
					<view class="iconfont icon-icon-test6"></view><text>专题课</text>
				</view>
				<view class="shoot-lesson" @tap="openLessonDetail('shootlesson')">
					<view class="iconfont icon-icon-test9"></view><text>冲刺课</text>
				</view>
			</view>
			<!-- 分割线 -->
			<view class="cut-off-rule-line"></view>
			<!-- 语数外选项卡 -->
			<view class="chinese-math-english">
				<text :class="{'ysw-active':tabIndex==0}" @tap="tapSelect(0)">语文</text>
				<text :class="{'ysw-active':tabIndex==1}" @tap="tapSelect(1)">数学</text>
				<text :class="{'ysw-active':tabIndex==2}" @tap="tapSelect(2)">英语</text>
			</view>
			<!-- 课程列表 缩减版 -->
			<view class="ysw-swiper">
				<swiper :current="tabIndex" @change="tabChange" :style="{height:swiperHeight+'rpx'}">
					<swiper-item v-for="(item,name) in yswlessonsless">
						<scroll-view scroll-y class="list">
							<lesson-list-less lessonsubcat="同步课" :selectLessons="item.synclessons" :yswtype="name" catetype="synclesson"></lesson-list-less>
							<lesson-list-less lessonsubcat="寒暑课" :selectLessons="item.holidaylessons" :yswtype="name" catetype="holidaylesson"></lesson-list-less>
							<lesson-list-less lessonsubcat="专题课" :selectLessons="item.speciallessons" :yswtype="name" catetype="speciallesson"></lesson-list-less>
							<lesson-list-less lessonsubcat="冲刺课" :selectLessons="item.shootlessons" :yswtype="name" catetype="shootlesson"></lesson-list-less>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</template>
		<!-- 上课列表 -->
		<template v-else>
			<view class="lessons-category">
				<text :class="{'lesson-cat-active':lessonTabIndex==0}" @tap="lessonTabSelect(0)">待开课</text>
				<text :class="{'lesson-cat-active':lessonTabIndex==1}" @tap="lessonTabSelect(1)">开课中</text>
				<text :class="{'lesson-cat-active':lessonTabIndex==2}" @tap="lessonTabSelect(2)">已结束</text>
			</view>
			<!-- 不同状态的课程列表 -->
			<view>
				<learning-list :lessonTabIndex="lessonTabIndex" :lessondata="lessondata" @lessontabChange="lessontabChange" :swiperHeight="swiperHeight"></learning-list>
			</view>
		</template>

		<!-- 弹出年级选择 -->
		<popup-grada ref="popupGradeIndex" @hidePopup="hidePopup"></popup-grada>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectedGrade: '学龄前',
				selectActive: true,
				tabIndex: 0,
				swiperHeight: 800,
				yswlessonsless: {},
				lessonTabIndex: 0,
				lessondata: {}
			};
		},
		onLoad() {
			this.$http.get('/api/lessonlist-less', {})
				.then(res => {
					// console.log('res==' + JSON.stringify(res.data));
					this.yswlessonsless = res.data
				})
				.catch(err => {});
		},
		methods: {
			selectGrade() {
				this.$refs.popupGradeIndex.showPopup()
			},
			openWrongNote() {

			},
			selectLearnButtonChange(text) {
				if (text == 'select') {
					this.selectActive = true
				} else if (text == 'learn') {
					this.selectActive = false

					this.$http.get('/api/learning-list', {})
						.then(res => {
							// console.log('res==' + JSON.stringify(res.data));
							this.lessondata = res.data
						})
						.catch(err => {

						});
				}
			},
			hidePopup(text) {
				this.selectedGrade = text
			},
			openLessonDetail(v) {
				uni.navigateTo({
					url: "../lesson-more-list/lesson-more-list?type=" + v
				})
			},
			tapSelect(i) {
				this.tabIndex = i
			},
			tabChange(e) {
				this.tabIndex = e.detail.current
			},
			lessonTabSelect(i) {
				this.lessonTabIndex = i // 课中课后 选项卡
			},
			lessontabChange(e) {
				this.lessonTabIndex = e
			}
		}
	}
</script>

<style lang="scss">
	.lesson-bar-middle {
		display: flex;

		button {
			border-radius: 50upx;
			background-color: #f7f8f9;
			width: 160upx;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 60upx;

			&.select-active {
				color: #fff;
				background-color: #01affe;
			}
		}
	}

	.lesson-bar-right {
		font-size: 38upx;
	}

	.uni-navbar__header-container.uni-navbar__content_view {
		display: flex;
		justify-content: center;
	}

	.uni-navbar__header.uni-navbar__content_view {
		margin: 40upx 0 10upx 0;
	}

	.uni-navbar__content {
		width: 100%;
	}

	.lesson-category-stage {
		display: flex;
		justify-content: space-between;
		margin: 20upx 5%;
		margin-top: 60upx;

		>view {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 28upx;
			color: #A4A8AD;

			>view {
				border-radius: 100%;
				color: #FFFFFF;
				font-size: 60upx;
				height: 120upx;
				width: 120upx;
				display: flex;
				justify-content: center;

				&.icon-jiachang_shujia {
					background-color: #4FBDFF;
				}

				&.icon-rili {
					background-color: #71EBD6;
				}

				&.icon-icon-test6 {
					background-color: #A182FF;
				}

				&.icon-icon-test9 {
					background-color: #F97244;
				}
			}
		}
	}

	.cut-off-rule-line {
		border-top: 5upx solid #F7F8F9;
	}

	.chinese-math-english {
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

	.ysw-swiper .list {
		height: 100%;
	}

	.lessons-category {
		display: flex;
		justify-content: space-around;
		margin: 20upx 0;
		margin-top: 70upx;
		color: #a4a8ad;

		>text {
			padding: 10upx 40upx;

			&.lesson-cat-active {
				color: #31B5F2;
				background-color: #E5F7FF;
				border-radius: 30upx;
			}
		}
	}

	
</style>
