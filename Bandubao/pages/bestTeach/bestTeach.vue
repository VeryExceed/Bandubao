<template>
	<view>
		<!-- 自定义导航栏 -->
		<uni-nav-bar @clickLeft="selectGradde" @clickRight="openWrongNote">
			<view class="lesson-bar-left" slot="left">
				<text>{{selectedGrade}}  ▼</text>
			</view>
			<view class="lesson-bar-middle">
				<button type="default" :class="{'select-active':selectActive}" @tap="selectLearnButtonChange('select')">选课</button>
				<button type="default" :class="{'select-active':!selectActive}" @tap="selectLearnButtonChange('learn')">上课</button>
			</view>
			<view class="lesson-bar-right iconfont icon-jiachang_cuotiben" slot="right"></view>
		</uni-nav-bar>
		<!-- 弹出年级选择 -->
		<popup-grada ref="popupGradeIndex" @hidePopup="hidePopup"></popup-grada>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectedGrade:'学龄前',
				selectActive:true
			};
		},
		methods:{
			selectGradde(){
				this.$refs.popupGradeIndex.showPopup()
			},
			openWrongNote(){
				
			},
			selectLearnButtonChange(text){
				if(text == 'select'){
					this.selectActive = true
				}else if (text == 'learn') {
					this.selectActive = false
				}
			},
			hidePopup(text) {
				this.selectedGrade = text
			}
		}
	}
</script>

<style lang="scss">
.lesson-bar-middle{
	display: flex;
	button{
		border-radius: 50rpx;
		background-color: #f7f8f9;
		width: 160rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 60rpx;
		&.select-active{
			color: #fff;
			background-color: #58bc58;
		}
	}
}
.lesson-bar-right {
	font-size: 38rpx;
}
.uni-navbar__header-container.uni-navbar__content_view{
	display: flex;
	justify-content: center;
}
.uni-navbar__header.uni-navbar__content_view {
	margin: 40rpx 0 10rpx 0;
}


</style>
