<template>
	<view>
		<swiper :current="lessonTabIndex" @change="lessontabChange" :style="{height:swiperHeight+'rpx'}">
			<swiper-item v-for="lesson in lessondata" :key="lesson.key">
				<scroll-view scroll-y class="list">
					<template v-if="lesson.length>0">
						<block v-for="(item,i) in lesson" :key="i">
							<view class="lesson-process-card" @tap="openCourseList(item)">
								<view class="first-line">
									<text :class="{'math-word':item.lessonType=='数','chinese-word':item.lessonType=='语','english-word':item.lessonType=='英'}">{{item.lessonType}}</text>
									<text :class="{'math-season':item.lessonType=='数','chinese-season':item.lessonType=='语','english-season':item.lessonType=='英'}">{{item.season}}</text>
									<text>{{item.lessonTitle}} （{{item.grade}}）</text>
								</view>
								<view class="second-line">养成学习好习惯</view>
								<view class="third-line">
									<template v-if="item.isCompleted">
										<text>{{item.joinnum}}学生已完成</text>
										<text>已完成</text>
									</template>
									<template v-else>
										<text>已完成 {{item.learnedTask}}/{{item.totalTask}}</text>
										<text>还需补{{item.totalTask-item.learnedTask}}次</text>
									</template>
								</view>
							</view>
						</block>
					</template>
					<template v-else>
						<view class="no-datas">暂无数据</view>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props:{
			lessondata:Object,
			lessonTabIndex:{
				type:Number,
				default:0
			},
			swiperHeight:Number
		},
		data() {
			return {
				
			};
		},
		methods:{
			lessontabChange(e) {
				this.$emit('lessontabChange',e.detail.current)
			},
			openCourseList(lesson){
				uni.navigateTo({
					// 跳转课程列表传参 lesson 是Object类型 所以需要用JSON.stringify 转换成字符串
					url:"../../pages/course-list/course-list?lesson="+ JSON.stringify(lesson)//encodeURIComponent(lesson)
				})
			}
		}
	}
</script>

<style lang="scss">
.lesson-process-card {
		margin: 20rpx 5%;
		padding: 20rpx;
		box-shadow: 5rpx 5rpx 10rpx #888888;
		border: 1rpx solid #c2c2c2;
		border-radius: 10rpx;

		>.first-line {
			font-size: 30rpx;
			font-weight: 600;

			text {
				padding: 8rpx 10rpx;
				border-radius: 10rpx;
				&.math-word{
					color: white;
					background-color: #31BFFF;
				}
				&.math-season{
					border: 2rpx solid #60CDFF;
					color: #60CDFF;
					background-color: white;
					margin: 0 15rpx;
				}
				&.chinese-word{
					color: white;
					background-color: #FF7C64;
				}
				&.chinese-season{
					border: 2rpx solid #FFA797;
					color: #FFA797;
					background-color: white;
					margin: 0 15rpx;
				}
				&.english-word{
					color: white;
					background-color:#A9DD38;
				}
				&.english-season{
					border: 2upx solid #A9DD39;
					color: #A9DD39;
					background-color: white;
					margin: 0 15rpx;
				}
			}
		}
		>.second-line{
			margin-top: 20rpx;
			font-size: 25rpx;
			color: #C2C2C2;
		}
		>.third-line{
			font-size: 30rpx;
			display: flex;
			justify-content: space-between;
			color: #C2C2C2;
			margin-top: 30rpx;
		}
	}
</style>
