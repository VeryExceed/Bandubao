<template>
	<view class="body">
		<image class="learn" src="../../static/sharemenu/qq.png" mode="widthFix"></image>
		<text class="mobilenum">{{mobilenum}}</text>
		<text class="business">{{business}}</text>
		<button type="primary" class="phone-direct-login" @tap="doLogin">本机号码一键登录</button>
		<text class="login-otherway">其他登录方式</text>
		<text style="width: 80%;font-size: 25upx;color: #bbbdbe;position: absolute;bottom: 30upx;">
			登陆即同意
			<text style="color: #007AFF;">《用户协议》</text>
			和
			<text style="color: #007AFF;">《保密协议》</text>
			并授予应用获取本机号码
		</text>
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'//通过 mapState 辅助函数获取。
	export default {
		data() {
			return {
				mobilenum: "1323333336",
				business: "中国联通提供认证服务"
			};
		},
		methods:{
			...mapMutations(['login']), //使用对象展开运算符
			doLogin(){
				this.login()
				uni.showToast({
					title:'登录成功！',
					complete() {
						setTimeout(()=>{
							uni.navigateBack()
						},2000)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.body {
		display: flex;
		flex-direction: column;
		align-items: center;
		>.learn{
			margin-top: 220rpx;
			width: 200rpx;
		}
		>.mobilenum {
			margin-top: 20rpx;
			font-size: 30rpx;
		}
		>.business {
			margin-top: 10rpx;
			font-size: 25rpx;
			color: #cfd2d3;
		}
		>.phone-direct-login {
			margin-top: 50rpx;
			width: 80%;
			border-radius: 50rpx;
			color: white;
		}
		>.login-otherway {
			margin-top: 30rpx;
			font-size: 30rpx;
		}
	}
</style>
