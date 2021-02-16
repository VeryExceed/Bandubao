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
						<view :class="['iconfont',{'icon-hongbao1':item.type=='PT'},{'icon-qianbao1':item.type=='DLB'},{'bonus-color-default':item.state=='past'},{'bonus-color-active':item.state=='current'},{'bonus-color-future':item.state=='future'}]"
						 @tap="showBonus(item,i)"></view>
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
			<block v-for="(item,i) in taskListInfo" :key="i">
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
					<template v-else>
						<button type="primary" size="mini" disabled>已领取</button>
					</template>
				</view>
			</block>
		</scroll-view>
		<!-- 领取红包 -->
		<view class="modal-window" v-show="bonusShow">
			<view class="bonus-after-sign">
				<view class="above">
					<view>任务完成</view>
					<view>点击拆开红包</view>
					<view @tap="separateBonus">
						<view>開</view>
					</view>
				</view>
			</view>
		</view>

		<view class="modal-window" v-show="aftergetbonusShow" @tap="closeafterbonus">
			<view class="bonus-after-sign">
				<view class="above">
					<view>{{todaybonusnum}} ￥</view>
					<view>恭喜你成功领取红包</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				taskListInfo: [],
				signinBonusinfo: [],
				todaybonusnum: 0,
				bonusShow: false,
				aftergetbonusShow: false
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
		methods: {
			getCurrentWeekBonusInfo() {
				//设置当前日期
				let weeknum = new Date().getDay();
				console.log(weeknum);
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
			goWork(i) {
				let me = this;
				uni.showModal({
					title: "任务窗口",
					content: "确认完成任务吗？",
					success: function(res) {
						if (res.confirm) {
							me.taskListInfo[i].state = 'torecieve'
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			torecieve(i) {
				let sum = ''
				if(this.taskListInfo[i].sum == '随机奖励'){
					sum = (Math.random() + 0.1).toFixed(2)
				}else {
					let len = this.taskListInfo[i].sum.length
					sum = this.taskListInfo[i].sum.substr(0, len - 1)
				}
				this.todaybonusnum = sum;
				this.bonusShow = true;
				this.taskListInfo[i].state = 'recieved'
			},
			showBonus(item, i) {
				if (item.state == 'current') {
					if(!item.isSigned) { //今日未签到的才签到
						this.bonusShow = !this.bonusShow;
						this.todaybonusnum = item.sum;
						this.signinBonusinfo[i].isSigned = true
						// item.isSigned = true;经过序列化后的对象，发生变化并不会对原对象产生影响
					}else {
						uni.showToast({
							title:'您已领取红包！' //uniapp toast不可改变宽高 不可超过8个字符
						})
					}
				}
			},
			separateBonus(item, i) {
				this.bonusShow = !this.bonusShow //打开红包
				this.aftergetbonusShow = true //领取红包
			},
			closeafterbonus() {
				this.aftergetbonusShow = false //点击关闭红包
				this.taskListInfo.sort(function(a,b){
					if(a.state == 'todo' && b.state == 'recieved') {
						return -1; //a 排在 b前
					}else if (b.state == 'todo' && a.state == 'recieved') {
						return 1; //b 排在a前
					}
				})
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

				.bonus-color-default,
				.bonus-color-active,
				.bonus-color-future {
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

						.icon-hongbao1 {
							font-size: 35rpx;
							color: #EF5650;
							margin-right: 10rpx;
							margin-top: -7rpx;
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

	.modal-window {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 998;
		background-color: rgba(0, 0, 0, 0.3);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.bonus-after-sign {
			background-color: #EF5650;
			z-index: 999;
			border-radius: 50rpx;
			width: 50%;
			height: 40%;

			.above {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 70%;
				background-color: #FE856A;
				border-radius: 50upx 50upx 40% 40%;
				color: yellow;

				view:nth-of-type(1) {
					font-size: 35rpx;
				}

				view:nth-of-type(2) {
					font-size: 25rpx;
				}

				view:nth-of-type(3) {
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 100%;
					background-color: yellow;
					width: 150rpx;
					height: 150rpx;
					transform: translateY(75px); //y轴方向向下偏移量

					view {
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 100%;
						color: red;
						width: 130rpx;
						height: 130rpx;
						border: 2rpx solid #d1d167;
						font-size: 40rpx;
					}
				}

			}
		}
	}
</style>
