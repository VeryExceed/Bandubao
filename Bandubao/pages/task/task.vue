<template>
	<view>
		<view style="border-top: 5rpx solid #f7f8f9;"></view>
		<view class="signin-everyday">
			<view class="title">
				<text>每日签到</text>
				<text>签到有礼</text>
			</view>
			<view class="bonus-getting">
				<block v-for="(item,i) in signinBonusinfo" :key="i">
					<view class="one-day">
						<view>+{{item.sum}}</view>
						<view :class="['iconfont',{'icon-hongbao1':item.type=='PT'},{'icon-qianbao1':item.type=='DLB'},{'bonus-color-default':item.state=='past'},{'bonus-color-active':item.state=='current'},{'bonus-color-future':item.state=='future'}]"></view>
						<view v-if="item.state=='current'" style="color: #ff925b;">周{{item.week}}</view>
						<view v-else>周{{item.week}}</view>
					</view>
				</block>
			</view>
		</view>
		<view style="border-top: 10rpx solid #f7f8f9;"></view>
		<!-- 任务列表 -->
		<scroll-view scroll-y class="today-task">
			<view class="title">今日任务</view>
			<block v-for="(item,i) in taskListInfo"  :key="i">
				<view class="task-item">
					<view class="left">
						<view class="iconfont icon-renwu1"></view>
						<view class="describe-info">
							<text>{{item.title}}</text>
							<view>
								<view class="iconfont icon-hongbao1"></view>
								<text>{{item.sum}}</text>
							</view>
						</view>
					</view>
					<template v-if="item.state=='todo'">
						<button type="primary" size="mini" @tap="goWork(i)">去完成</button>
					</template>
					<template v-else-if="item.state=='torecieve'">
						<button type="primary" size="mini" style="background-color: #eeee36;" @tap="torecieve(i)">领取</button>
					</template>
					<template>
						<button type="primary" size="mini" disabled>已领取</button>
					</template>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				taskListInfo: [],
				signinBonusinfo: []
			};
		},
		onLoad() {
			this.$http.get('/api/taskcenter-info', {})
				.then(res => {
					// console.log('res=='+JSON.stringify(res.data));
					this.signinBonusinfo = res.data.signinBonusinfo
					this.taskListInfo = res.data.taskListInfo
					this.getCurrentWeekBonusInfo()
				})
				.catch(err => {

				});
		},
		methods:{
			getCurrentWeekBonusInfo() {
				//设置当前日期
				let weeknum = new Date().getDay();
				weeknum = weeknum == 0 ? 7 : weeknum;
				this.signinBonusinfo.forEach(function(e, i) {
					if (i < weeknum - 1) {
						e.state = 'past'
					} else if (i == weeknum - 1) {
						e.state = 'current'
						e.isSigned = false
					} else {
						e.state = 'future'
					}
				})
			},
			goWork(i){
				
			},
			toSource(i) {
				
			}
		}
	}
</script>

<style lang="scss">
	.signin-everyday {
		margin: 20rpx;

		>.title {
			text:nth-of-type(1) {
				border-left: 10rpx solid #007aff;
				border-radius: 5rpx;
				font-weight: bold;
				padding: 10rpx;
			}

			text:nth-of-type(2) {
				color: white;
				background-color: #ff7c64;
				text-align: center;
				border-radius: 26rpx 0 26rpx 0;
				padding: 10rpx;
				font-size: 25rpx;
				margin-left: 15rpx;
			}
		}

		.bonus-getting {
			display: flex;
			justify-content: space-between;

			.one-day {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding-top: 10rpx;
				view:first-of-type {
					font-size: 25rpx;
				}
				.bonus-color-default,.bonus-color-active,.bonus-color-future {
					font-size: 60rpx;
					border-radius: 100%;
					color: #D4D7D9;
				}
				.bonus-color-active {
					color: #FF925B;
				}
				.bonus-color-future {
					color: #FFAB9C;
				}
			}
		}
	}
	.today-task {
		margin: 20rpx;
		.title {
			border-left: 10rpx solid #007AFF;
			border-radius: 5rpx;
			font-weight: bold;
			padding: 10rpx;
			margin-bottom: 15rpx;
		}
		.task-item {
			border-top: 2rpx solid #EAEAEB;
			padding: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left {
				display: flex;
				.icon-renwu1 {
					display: flex;
					justify-content: center;
					align-items: center;
					margin: 15rpx;
					color: #01AFFE;
					font-size: 60rpx;
					font-weight: bold;
					border-radius: 100%;
					background-color: #D6F2FF;
					width: 100rpx;
					height: 100rpx;
				}
				.describe-info {
					margin-left: 15rpx;
					view {
						display: flex;
						.icon-hongbao1{
							font-size: 35rpx;
							color: #EF5650;
							margin-right: 10rpx;
						}
					}
				}
			}
			button {
				border-radius: 100rpx;
				margin-right: 30rpx;
				height: 60rpx;
				// justify-content: center;
				font-size: 25rpx;
			}
		}
	}
</style>
