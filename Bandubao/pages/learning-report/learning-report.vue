<template>
	<view class="body">
		<block v-for="(item,i) in weeklyReportInfo" :key="i">
			<view class="title">{{item.title}}</view>
			<view class="numbers">
				<view>
					<text>本周打卡</text>
					<view>
						<text>{{item.punckcarddays}}</text>
						<text>天</text>
					</view>
				</view>
				<view>
					<text>学习课程</text>
					<view>
						<text>{{item.learnedlessons}}</text>
						<text>节</text>
					</view>
				</view>
				<view>
					<text>攻克难题</text>
					<view>
						<text>{{item.resolvequestions}}</text>
						<text>道</text>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				weeklyReportInfo:[]
			};
		},
		onLoad() {
			this.$http.get('/api/weeklyReport',{})
			.then(res=>{
				console.log('res=='+JSON.stringify(res.data));
				this.weeklyReportInfo = res.data
			})
			.catch(err=>{
				
			});
		}
	}
</script>

<style lang="scss">
.body{
	background-color: #F0F7FF;
	padding-bottom:20rpx ;
}
view.title{
	height: 80rpx;
	background-color: #367FE8;
	display: felx;
	align-items: center;
	padding-left: 15rpx;
	color: #FFFFFF;
	font-size: 30rpx;
	margin: 0 3%;
	border-radius: 10rpx 10rpx 0 0;
}
view.numbers{
	display: flex;
	justify-content: space-between;
	margin: 0 3% 20rpx 3%;
	background-color:#FFFFFF;
	border-radius:0 0 10rpx 10rpx;
	>view:nth-of-type(2) {
		border-left: 2rpx solid #F0F7FF;
		border-right: 2rpx solid #F0F7FF;
	}
	>view{
		width: 33%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		>text{
			color: #888888;
		}
		view{
			text:nth-of-type(1) {
				font-size: 40rpx;
				padding-right: 10rpx;
				padding-bottom: 8rpx;
			}
		}
	}
}

</style>
