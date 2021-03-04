<template>
	<view class="body">
		<view class="member-head">
			<view class="left">
				<view>{{userinfo.userName}}</view>
				<view>{{userinfo.ismember?"您已是会员":"您还未添加会员"}}</view>
			</view>
			<image :src="userinfo.avatar" mode="widthFix"></image>
		</view>
		<!-- 会员切换选择面板 -->
		<view class="member-box">
			<swiper class="swiper" previous-margin="100rpx" next-margin="100rpx" @change="swiperChange">
				<swiper-item v-for="(item,i) in swiper.list" :key="i">
					<view class="memberinfo-card" :class="{'active':i==swiper.index}">
						<view>{{item.title}}</view>
						<view>{{item.subtitle}}</view>
						<view><text>{{item.discountsinfo}}</text></view>
						<view>
							<text>￥ {{item.currentprice}}</text>
							<text>原价￥ {{item.oldprice}}</text>
						</view>
						<text v-if="i==swiper.index">√</text>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 支付方式 -->
		<view class="pay-way">
			<radio-group name="payway" @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd">
					<view>
						<view>
							<uni-icons class="weixin" type="weixin" size="25" color="#58bc58"></uni-icons>
							<text>微信支付</text>
						</view>
					</view>
					<view>
						<radio value="wx" checked="true" />
					</view>
				</label>
				<label class="uni-list-cell uni-list-cell-pd">
					<view>
						<view class="iconfont icon-zhifubao"></view>
						<text>支付宝支付</text>
					</view>
					<view>
						<radio value="zfb" />
					</view>
				</label>
			</radio-group>
		</view>
		<!-- 支付按钮 -->
		<view class="bottom-button">
			<button type="primary" @tap="dopay">立即抢购 （{{swiper.list[swiper.index].currentprice}}元）</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				currentpayway: "wx",
				swiper: {
					index: 0,
					list: [{
							title: "终身会员",
							subtitle: "一次购买 终身受益",
							discountsinfo: "小学语数外三科 \n 价值2万+ \n 一次付费 终身免学费",
							currentprice: 1988,
							oldprice: 2600
						},
						{
							title: "三年会员",
							subtitle: "超值实惠",
							discountsinfo: "小学语数外三科 \n 价值2万+ \n 三年免学费",
							currentprice: 1288,
							oldprice: 1900
						},
						{
							title: "一年会员",
							subtitle: "超值实惠",
							discountsinfo: "小学语数外三科 \n 价值2万+ \n 一年免学费",
							currentprice: 588,
							oldprice: 1200
						},
					]
				}
			};
		},
		computed: mapState(['userinfo']),
		methods: {
			...mapMutations(['updateUserinfo']),
			swiperChange(e) {
				console.log("==" + e.detail.current);
				this.swiper.index = e.detail.current
			},
			radioChange(e) {
				this.currentpayway = e.target.value
			},
			dopay() {
				this.userinfo.ismember = true
				this.updateUserinfo(this.userinfo)
				if (this.currentpayway === 'wx') {
					let orderInfo = {
						"appid": "wx688d407f389fa7dd",
						// "appid": "wxc589d3c10e27848d",
						"partnerid": " 1509934871",
						"prepayid": " wx0318103759266350b5f468241802430900",
						"package": "Sign=fangxiaoxuebao",
						"noncestr": "K6QkIazV2poFwuhE",
						"timestamp": 1562148617,
						"sign": "1F9ACDBAF3961BA9DFD4B07A1C84D623"
					}
					uni.requestPayment({
						provider: 'wxpay',
						orderInfo: JSON.stringify(orderInfo),
						success: function(res) {
							console.log('success:' + JSON.stringify(res));
						},
						fail: function(err) {
							console.log('fail:' + JSON.stringify(err));
						}
					});
				} else if (this.currentpayway === 'zfb') {
					uni.requestPayment({
						provider: 'alipay',
						orderInfo: 'app_id=ali688d407f389fa7dd&method=post&format=JSON&charset=UTF-8&sign_type=RSA2&version=1.0&return_url=baidu&notify_url=biadu&timestamp=1562148617&sign=1F9ACDBAF3961BA9DFD4B07A1C84D623&biz_content=1&tradeNO=sdf34324231', //微信、支付宝订单数据
						success: function(res) {
							console.log('success:' + JSON.stringify(res));
						},
						fail: function(err) {
							console.log('fail:' + JSON.stringify(err));
						}
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	.body {
		padding-bottom: 100rpx;
		height: 1600px;
		background-color: #F0F7FF;
	}

	.member-head {
		display: flex;
		justify-content: space-between;
		background: linear-gradient(to right, #FFBF4A, #FF8D3C); //从左到右过度到更深的颜色
		padding: 25rpx;
		height: 260rpx;
		border-radius: 0 0 20% 20%;

		view {
			color: #FFFFFF;
			font-size: 40rpx;

			view:nth-of-type(2) {
				margin-top: 15rpx;
				font-size: 30rpx;
			}
		}

		image {
			border-radius: 100%;
			width: 150rpx;
		}
	}

	.member-box {
		transform: translateY(-60rpx);

		swiper {
			height: 520rpx;
		}

		.memberinfo-card {
			background-color: #FFFFFF;
			border-radius: 50rpx;
			padding: 30rpx;
			margin: 60rpx 20rpx auto 20rpx;
			z-index: 2;

			view:nth-of-type(1) {
				font-size: 40rpx;
				font-weight: bold;
			}

			view:nth-of-type(2) {
				font-size: 20rpx;
				color: #FE7B62;
			}

			view:nth-of-type(3) {
				margin: 30rpx 0;
				padding: 15rpx;
				background-color: #F0F7FF;
				font-size: 20rpx;
				border-radius: 10rpx;
			}

			view:nth-of-type(4) {
				font-size: 40rpx;
				color: #FE7B62;

				text:nth-of-type(2) {
					font-size: 25rpx;
					color: #A8ADB1;
					text-decoration: line-through;
					margin-left: 10rpx;
				}
			}

			>text {
				float: right;
				transform: translate(48upx, 6upx);
				color: white;
				font-weight: bold;
				font-size: 35upx;
			}
		}

		.memberinfo-card.active {
			padding: 60rpx;
			border: 2rpx solid #FE7B62; //注意需要设置偏移时，如果目标被其它元素包括，需要同时设置其父元素偏移量
			transform: translateY(-60rpx);
			background: radial-gradient(circle at bottom right, #FE7B62 60rpx, #FFFFFF 0); //设置右下角圆角
		}
	}

	.pay-way {
		margin-right: 25upx;

		label {
			>view {
				display: flex;

				>view {
					margin: -7rpx 0 0 10rpx;
				}

				.uni-icons {
					margin-left: 10rpx;
					margin-right: 5rpx;
				}

				.icon-zhifubao {
					color: #0BA2F8;
					font-size: 32upx;
					margin-right: 0;
				}

			}
		}
	}

	.bottom-button {
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		align-items: center;
		display: flex;

		button {
			width: 80%;
			border-radius: 50upx;
			background-color: #FE7B62;
		}

		button.button-hover {
			//button-hover button 组件自带的点击class名称
			background-color: #FE7B62;
		}
	}
</style>
