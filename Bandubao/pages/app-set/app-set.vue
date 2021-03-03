<template>
	<view class="body">
		<view class="clear-cache" @tap="clearCache">
			<text>清除缓存</text>
			<text>总计：{{currentCacheSize}}</text>
		</view>
		<view class="about-us">
			<text>关于我们</text>
			<text>></text>
		</view>
		<button type="primary" @tap="dologout">退出登录</button>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				currentCacheSize:0
			};
		},
		methods:{
			clearCache(){},
			dologout(){}
		}
	}
</script>

<style lang="scss">
.body {
	padding: 30rpx;
	view{
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
		border-bottom: 2rpx solid #a4a8ad;
	}
	button{
		width: 80%;
	}
}
</style>
