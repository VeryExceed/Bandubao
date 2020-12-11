<template>
	<view class="lesson-cat-less">
		<view class="line-title">
			<view class="left">{{lessonsubcat}}</view>
			<view class="right">
				<text>更多</text><text>></text>
			</view>
		</view>
		<template v-if="selectLessons.length>0">
			<block v-for="(item2,index) in selectLessons">
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
							<button type="primary" hover-class="none">会员免费</button>
						</view>
					</view>
				</view>
			</block>
		</template>
		<template v-else>
			<view class="no-data">暂无数据</view>
		</template>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			lessonsubcat:{
				type:String,
				default:""
			},
			yswtype:{
				type:String,
				default:""	
			},
				
			catetype: {
				type:String,
				default:""
			},
			selectLessons:{
				type:Array,
				default:[]
			}
			
		}
	}
</script>

<style lang="scss">
.line-title {
		display: flex;
		justify-content: space-between;
		>.left {
			margin-left: 15rpx;
			border-left: 8rpx solid #007AFF;
			border-radius: 5rpx;
			padding-left: 10rpx;
			font-size: 35rpx;
		}
		>.right {
			display: flex;
			margin-right: 20rpx;
			color: #A4A8AD;
			text:nth-of-type(2) {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 40rpx;
				height: 40rpx;
				border-radius: 100%;
				background-color: #A4A8AD;
				color: white;
				margin-left: 10rpx;
			}
		}
	}
	.lesson-intro {
		display: flex;
		margin: 20rpx;
		>image{
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
				&.second-line{
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
	.no-data{
		margin-left: 20upx;
	}
</style>
