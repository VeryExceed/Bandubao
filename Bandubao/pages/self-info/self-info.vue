<template>
	<view class="body">
		<!-- 头像 -->
		<view class="headphoto">
			<text>头像</text>
			<view class="headphoto-right" @tap="choosepic">
				<image :src="headphoto" mode="scaleToFill" lazy-load></image>
				<text>></text>
			</view>
		</view>
		<!-- 姓名 -->
		<view class="username">
			<text>姓名</text>
			<view class="username-right">
				<input type="text" v-model="username" maxlength="10"/>
				<text>></text>
			</view>
		</view>
		<!-- 性别-->
		<view class="sex" @tap="changeone()">
			<text>性别</text>
			<view class="sex-right">
				<text>{{sex}}</text>
				<text>></text>
			</view>
		</view>
		<!-- 生日 -->
		<picker mode="date" @change="bindDateChange" :value="birthday" start="1900-01-01" end="2200-12-31">
			<view class="birthday">
				<text>生日</text>
				<view class="birthday-right">
					<text>{{birthday}}</text>
					<text>></text>
				</view>
			</view>
		</picker>
		<!-- 就读城市 -->
		<view class="city" @tap="showMulLinkageThreePicker">
			<text>就读城市</text>
			<view class="city-right">
				<text>{{city}}</text>
				<text>></text>
			</view>
		</view>
		<!-- ID -->
		<view class="user-id">
			<text>ID</text>
			<view class="user-id-right">
				<text>{{userId}}</text>
			</view>
		</view>
		<!-- 当前年级 -->
		<view class="grade" @tap="showPopupGrade">
			<text>当前年级</text>
			<view class="grade-right">
				<text>{{userinfo.grade}}</text>
				<text>></text>
			</view>
		</view>
		<!-- 绑定手机号 -->
		<view class="bindPhone">
			<text>绑定手机号</text>
			<view class="bindPhone-right">
				<text>{{bindPhone}}</text>
			</view>
		</view>
		<!-- 保存 -->
		<view class="save-userinfo">
			<button type="primary" @tap="saveUserino">保存</button>
		</view>
		<mpvue-city-picker themeColor="#007AFF" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm"></mpvue-city-picker>
		<!-- 选择年级 -->
		<popup-grada ref="popupgradeself" @hidePopup="hidePopup"></popup-grada>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				headphoto:"../../static/img/firstpage/katoon2.jpg",
				username:"雯雯",
				sex:"女",
				birthday:"2021-02-17",
				city:"北京",
				userId:"213321123",
				bindPhone:"18388888181",
				cityPickerValueDefault:[0,0,1],
				showpopup:false
			};
		},
		computed:mapState(['userinfo']),
		methods:{
			...mapMutations(['updateUserinfo']),
			onConfirm(e){
				this.city=e.label
			},
			choosepic(){
				//从本地相册选择图片或使用相机拍照。
				uni.chooseImage({
					count:1,
					sizeType:['compressed'] ,// compressed 压缩图
					success: (res) =>{
					        // console.log(JSON.stringify(res.tempFilePaths));
							this.headphoto = res.tempFilePaths[0]
					    }
				})
			},
			changeone(){
				const arr =['不限','男','女']
				uni.showActionSheet({ //从底部向上弹出操作菜单
					 itemList: arr,
					    success: (res) => {
					       this.sex = arr[res.tabIndex]
					    }
				})
			},
			bindDateChange(e){
				this.birthday = e.target.value
			},
			
			showMulLinkageThreePicker(){
				this.$refs.mpvueCityPicker.show()
			},
			hidePopup(text) {
				this.userinfo.grade = text;
				this.updateUserinfo(this.userinfo)
			},
			showPopupGrade(){
				this.$refs.popupgradeself.showPopup()
			},
			saveUserino(){}
		}
	}
</script>

<style lang="scss">
.body {
	margin-top: 30rpx;
	>view{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 5%;
		margin-bottom: 50rpx;
		>view {
			display: flex;
			align-items: center;
			>text:last-child{
				margin-left: 20rpx;
			}
		}
	}
}
.birthday{
	display: flex;
	justify-content: space-between;
	margin: 0 5% 50upx 5%;
}
.headphoto-right>image{
	width: 100rpx;
	height: 100rpx;
	border-radius: 100%;
}
.username-right>input {
	width: 80upx;
}
.birthday-right>text:last-child{
	margin-left: 20rpx;
}
.save-userinfo>button{
	width: 40%;
	background-color: #4CD964;
}
</style>
