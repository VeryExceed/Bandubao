<template>
	<view>
		<uni-nav-bar leftIcon="closeempty" rightIcon="mic-filled" @clickLeft="leftClick" color="#aa00ff" fixed>
			<view class="exam-bar-middle">
				练习 {{currentSubjectNum}}/{{subjectInfos.subjectNum}}
			</view>
		</uni-nav-bar>
		<!-- 答题区 -->
		<view class="subject-area">
			<!-- 题目命题 -->
			<view class="subject-title">
				<block v-for="(title,i) in currentSubject.subjectTitle"> :key="i"
					<view>
						<template v-if="title.type=='text'">
							<view>{{title.content}}</view>
						</template>
					</view>
				</block>
			</view>
			<!-- 题目选择 -->
			<!-- 题目解析 -->
		</view>
		
		<!-- 底部操作区 草稿、收藏、下一题 -->
		<view class="next-subject-btn">
			<view>
				<view :class="['uni-icon','uni-icon-compose',{active:draftselected}]" @tap="selectOne('draft')"></view>
				<view>草稿</view>
			</view>
			<view>
				<view :class="['uni-icon','uni-icon-star',{active:storeselected}]" @tap="selectOne('store')"></view>
				<view>收藏</view>
			</view>
			<button type="primary" :class="{'disabled':!isAnswered}">{{btntext}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				subjectInfos: {
					subjectNum: 4,
					subjects: []
				},
				currentSubjectNum: 1,
				isAnswered: false,
				btntext: "下一题",
				draftselected: false,
				storeselected: false,
				currentSubject:{} //用来接收当前题目的信息
			};
		},
		onLoad() {
			this.$http.get('/api/subjectInfo',{})
				.then(res=>{
					console.log('res==' +JSON.stringify(res.data));
					this.subjectInfos = res.data
					
				})
				.catch(err=>{
					
				});
		},
		methods: {
			leftClick() {
				uni.navigateBack()
			},
			selectOne(selected) {
				if (selected == "draft") {
					this.draftselected = !this.draftselected
					uni.showToast({
						// 如果为true 那么打开草稿 如皋为flase 取消草稿
						title: this.draftselected ? "打开草稿" : "取消草稿"
					})
				} else if (selected == "store") {
					this.storeselected = !this.storeselected
					uni.showToast({
						title: this.storeselected ? "收藏成功" : "取消收藏"
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.uni-navbar__header-container.uni-navbar__content_view {
		display: flex;
		justify-content: center;
	}

	.uni-navbar__header.uni-navbar__content_view {
		margin: 40upx 0 10upx 0;
	}

	.uni-navbar__content {
		width: 100%;
	}

	.next-subject-btn {
		width: 100%;
		position: fixed;
		bottom: 1rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;

		button {
			border-radius: 50rpx;
			width: 50%;
			height: fit-content;

			&.disabled {
				background-color: #aecdef;
			}
		}

		view {
			margin-left: 15rpx;

			view:nth-of-type(1) {
				font-size: 60rpx;
				color: #ADB2B6;

				&.active {
					color: #58BC58;
				}
			}
		}
	}
</style>
