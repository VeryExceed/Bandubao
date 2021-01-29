<template>
	<view class="body">
		<view class="title-info">
			<text :class="{'math-word':courseTitleInfo.lessonType=='数','chinese-word':courseTitleInfo.lessonType=='语','english-word':courseTitleInfo.lessonType=='英'}">{{courseTitleInfo.lessonType}}</text>
			<text :class="{'math-season':courseTitleInfo.lessonType=='数','chinese-season':courseTitleInfo.lessonType=='语','english-season':courseTitleInfo.lessonType=='英'}">{{courseTitleInfo.season}}</text>
			<text>{{courseTitleInfo["lessonTitle"]}} （{{courseTitleInfo.grade}}）</text>
		</view>
		<view class="learn-progress">
			学习进度
			<template v-if="courseTitleInfo.isCompleted">&nbsp;&nbsp;完成</template>
			<template v-else>{{courseTitleInfo.learnedTask}}/{{courseTitleInfo.totalTask}}</template>
		</view>
		<!-- 课程列表区 -->
		<scroll-view scroll-y style="height: 90%;">
			<view class="course-list">
				<block v-for="(item,i) in courseList" :key="i">
					<view class="course-info">
						<view class="title">
							{{item.title}}
						</view>
						<view class="courser-progress">
							<text class="week">{{item.week}}</text>
							<template v-if="item.isComplete">
								<text class="star">★★★</text>
							</template>
							<template v-else>
								<text class="catch-up">补课 ></text>
							</template>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				courseTitleInfo: {},
				courseList: []
			};
		},
		onLoad(e) {
			// console.log('==0=' + e.lesson);
			// 通过JSON.parse 转换接收到lesson参数
			this.courseTitleInfo = JSON.parse(e.lesson) //decodeURIComponent(e.lesson)
			this.$http.get('/api/courselist', {})
				.then(res => {
					// console.log('res==' + JSON.stringify(res.data));
					this.courseList = res.data
				})
				.catch(err => {

				});
		}
	}
</script>

<style lang="scss">
	.body {
		background-color: #F7F8F9;
		width: 100%;
		height: 100%;
		position: fixed;
	}

	.title-info,
	.learn-progress {
		padding: 10rpx 3%;
		background-color: white;

		>text {
			padding: 8rpx 10rpx;
			border-radius: 10rpx;

			&.math-word {
				color: white;
				background-color: #31BFFF;
			}

			&.math-season {
				border: 2upx solid #60CDFF;
				color: #60CDFF;
				background-color: white;
				margin: 0 15upx;
			}

			&.chinese-word {
				color: white;
				background-color: #FF7C64;
			}

			&.chinese-season {
				border: 2upx solid #FFA797;
				color: #FFA797;
				background-color: white;
				margin: 0 15upx;
			}

			&.english-word {
				color: white;
				background-color: #A9DD38;
			}

			&.english-season {
				border: 2upx solid #A9DD39;
				color: #A9DD39;
				background-color: white;
				margin: 0 15upx;
			}
		}
	}

	.learn-progress {
		font-size: 25rpx;
		color: #A4A8AD;
		margin-bottom: 20rpx;
	}

	.course-list {
		margin: 10rpx 3%;
		border-radius: 10rpx;
		padding: 20rpx;
		background-color: white;
		.course-info {
			background-color: #F7F8F9;
			border-radius: 10rpx;
			padding: 20rpx;
			margin-bottom: 20rpx;
			font-size: 30rpx;
			.courser-progress{
				margin-top: 50rpx;
				display: flex;
				justify-content: space-between;
				font-size: 25rpx;
				.week{
					color: #A4A8AD;
				}
					
				.star{
					font-size: 35rpx;
					color: #FFC057;
				}
				.catch-up{
					color: #01AFFE;
				}
			}
		}
	}
</style>
