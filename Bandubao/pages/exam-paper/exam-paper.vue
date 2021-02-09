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
				<block v-for="(title,i) in currentSubject.subjectTitle" :key="i">
					<view>
						<template v-if="title.type=='text'">
							<view>{{title.content}}</view>
						</template>
						<template v-else-if="title.type=='image'">
							<image :src="title.url" mode="aspectFit"></image>
						</template>
						<template v-else-if="title.type=='input'">
							<input type="text" class="answer-fill-area" v-model="youanswer" @input="onInput" />
						</template>
					</view>
				</block>
			</view>
			<!-- 题目选择 -->
			<!-- select是选择题 -->
			<!-- <template v-if="currentSubject.type=='select'"> -->
			<view>
				<block v-for="(option,i) in currentSubject.options" :key="i">
					<view class="subject-option" :class="{'selected-correct':(-1!=selectOptionIndex && i==currentSubject.correctAnswer),'selected-wrong':(i==selectOptionIndex && i!=currentSubject.courrectAnswer)}"
					 @tap="selectoneOption(i,option)">
						<text v-if="currentSubject.type=='select'">{{option.number}}. </text>
						<text>{{option.content}}</text>
					</view>
				</block>
			</view>
			<!-- </template> -->
			<!-- correctorWrong判断题 -->
			<!-- <template v-if="currentSubject.type=='correctorWrong'">
				<view></view>
			</template> -->
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
			<button type="primary" :class="{'disabled':!isAnswered}" @tap="gonextsubject">{{btntext}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				subjectInfos: {
					// subjectNum: 4,
					// subjects: []
				},
				currentSubjectNum: 1,
				isAnswered: false,
				btntext: "下一题",
				draftselected: false,
				storeselected: false,
				currentSubject: {}, //用来接收当前题目的信息
				selectOptionIndex: -1,
				isanswercorrect: false
			};
		},
		watch: { // 侦听属性，多用于一步请求的数据联动
			currentSubjectNum() {
				this.currentSubject = this.subjectInfos.subjects[this.currentSubjectNum - 1]
			}
		},
		onLoad() {
			this.$http.get('/api/subjectInfo', {})
				.then(res => {
					// console.log('res==' + JSON.stringify(res.data));
					this.subjectInfos = res.data
					this.currentSubject = this.subjectInfos.subjects[this.currentSubjectNum - 1]
				})
				.catch(err => {

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
			},
			onInput(e) {

			},
			gonextsubject() {
				// 点击下一题页数++
				if (this.currentSubjectNum < this.subjectInfos.subjectNum) {
					this.currentSubjectNum++
					this.draftselected = false; // 点击下一题初始化
					this.storeselected = false;
					this.selectOptionIndex = -1;
					this.isAnswered = false;
					uni.pageScrollTo({
						scrollTop:0,
						duration:100
					});
				}
			},
			selectoneOption(i, option) {
				if (!this.isAnswered) {
					this.selectOptionIndex = i //等于当前题目的key值 i
					this.isAnswered = true;
					if (i == option.correctAnswer) { // 当前i 等于正确的答案时
						this.isanswercorrect = true  
					}
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

	.subject-area {
		background-color: #f7f8f9;
		min-height: 1200rpx;
		margin-top: 120rpx;

		.subject-title {
			background-color: #FFFFFF;
			padding-left: 30rpx;

			image {
				max-width: 80%;
				max-height: 300rpx;
			}
		}

		.answer-fill-area {
			border: 2rpx solid #09BB07;
			width: 200rpx;
			align-content: center;
		}
	}

	.subject-option {
		margin: 30rpx;
		padding: 20rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;

		text:first-of-type {
			font-weight: bold;
		}

		&.selected-correct {
			border: 3rpx solid #44DD8E;
		}

		&.selected-wrong {
			border: 3rpx solid #FF6776;
		}
	}
</style>
