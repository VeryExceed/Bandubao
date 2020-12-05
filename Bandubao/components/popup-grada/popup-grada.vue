<template>
	<view>
		<uni-popup ref="popup" :position="position">
			<view class="select-grade">
				<view>选择您所在的年级</view>
				<view>
					<button type="default" class="grade-btn" hover-class="grade-btn-hover" @tap="hidePopup('学龄前')">学龄前</button>
					<button type="default" class="grade-btn" hover-class="grade-btn-hover" @tap="hidePopup('一年级')">一年级</button>
				</view>
				<view>
					<button type="default" class="grade-btn" hover-class="grade-btn-hover" @tap="hidePopup('二年级')">二年级</button>
					<button type="default" class="grade-btn" hover-class="grade-btn-hover" @tap="hidePopup('三年级')">三年级</button>
				</view>
				<view>
					<button type="default" class="grade-btn" hover-class="grade-btn-hover" @tap="hidePopup('四年级')">四年级</button>
					<button type="default" class="grade-btn" hover-class="grade-btn-hover" @tap="hidePopup('五年级')">五年级</button>
				</view>
				<view>
					<button type="default" class="grade-btn" hover-class="grade-btn-hover" @tap="hidePopup('六年级')">六年级</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			position: {
				type: String,
				// 默认值 top 顶部 middle 居中 bottom 底部
				default: 'middle'
			}
		},
		methods: {
			hidePopup(text) {
				// 点击时获得当前年级
				this.$emit('hidePopup',text)
				// 关闭popup组件
				this.$refs.popup.close()
			},
			showPopup() {
				this.$refs.popup.open()
			}
		}
	}
</script>

<style scoped>
	.select-grade {
		background-color: #58bc58;
		border-radius: 10px;
		padding: 20px;
	}

	.select-grade .grade-btn {
		display: inline-block;
		border-radius: 40rpx;
		margin-right: 10rpx;
	}

	.grade-btn-hover {
		background-color: #007AFF;
		color: #FFFFFF;
	}

	.select-grade>view:first-child {
		font-weight: bold;
		display: flex;
		justify-content: center;
		margin-bottom: 20rpx;
	}
</style>
