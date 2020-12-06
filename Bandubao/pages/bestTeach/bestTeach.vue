<template>
	<view>
		<!-- 自定义导航栏 -->
		<uni-nav-bar @clickLeft="selectGradde" @clickRight="openWrongNote">
			<view class="lesson-bar-left" slot="left">
				<text>{{selectedGrade}} ▼</text>
			</view>
			<view class="lesson-bar-middle">
				<button type="default" :class="{'select-active':selectActive}" @tap="selectLearnButtonChange('select')">选课</button>
				<button type="default" :class="{'select-active':!selectActive}" @tap="selectLearnButtonChange('learn')">上课</button>
			</view>
			<view class="lesson-bar-right iconfont icon-jiachang_cuotiben" slot="right"></view>
		</uni-nav-bar>
		<!-- 课程类别区 -->
		<view class="lesson-category-stage">
			<view class="sync-lesson" @tap="openLessonDetail('synclesson')">
				<view class="iconfont icon-jiachang_shujia"></view><text>同步课</text>
			</view>
			<view class="holidy-lesson" @tap="openLessonDetail('holidylesson')">
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
		<!-- 语数英选项卡 -->
		<view class="chinese-math-english">
			<text :class="{'ysw-active':tabIndex==0}" @tap="tapSelect(0)">语文</text>
			<text :class="{'ysw-active':tabIndex==1}" @tap="tapSelect(1)">数学</text>
			<text :class="{'ysw-active':tabIndex==2}" @tap="tapSelect(2)">英语</text>
		</view>
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
				tabIndex:0
			};
		},
		methods: {
			selectGradde() {
				this.$refs.popupGradeIndex.showPopup()
			},
			openWrongNote() {

			},
			// 选课上课切换
			selectLearnButtonChange(text) {
				if (text == 'select') {
					this.selectActive = true
				} else if (text == 'learn') {
					this.selectActive = false
				}
			},
			hidePopup(text) {
				this.selectedGrade = text
			},
			openLessonDetail(V) {
				
			},
			tapSelect(i){
				this.tabIndex = i
			}
		}
	}
</script>

<style lang="scss">
	.lesson-bar-middle {
		display: flex;

		button {
			border-radius: 50rpx;
			background-color: #f7f8f9;
			width: 160rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 60rpx;

			&.select-active {
				color: #fff;
				background-color: #58bc58;
			}
		}
	}

	.lesson-bar-right {
		font-size: 38rpx;
	}

	.uni-navbar__header-container.uni-navbar__content_view {
		display: flex;
		justify-content: center;
	}

	.uni-navbar__header.uni-navbar__content_view {
		margin: 40rpx 0 10rpx 0;
	}
	.lesson-category-stage {
		display: flex;
		justify-content: space-between;
		margin: 20rpx 5%;
		>view {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 28rpx;
			color: #A4A8AD;
			>view {
				border-radius: 100%;
				color: #FFFFFF;
				font-size: 60rpx;
				height: 120rpx;
				width: 120rpx;
				display: flex;
				justify-content: center;
				&.icon-jiachang_shujia{
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
		border-top: 5rpx solid #F7F8F9;
	}
	.chinese-math-english {
		display: flex;
		justify-content: space-around;
		color:#A4A8AD;
		padding: 10rpx 0;
		>text {
			padding: 10rpx 40rpx;
			&.ysw-active {
				color: #31B5F2;
				background-color: #E5F7FF;
				border-radius: 30rpx;
			}
		}
	}
</style>
