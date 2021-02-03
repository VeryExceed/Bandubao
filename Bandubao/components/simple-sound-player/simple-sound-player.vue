<template>
	<view>
		<view class="sound-play-comp" @tap="playVoice()">
			<text>{{voiceDuration}}s</text>
			<image :src="soundImagesrc" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	let innerAudioContext = null;
	export default {
		data() {
			return {
				voiceDuration:0,
				audioPaused:true,
				soundImagesrc:""
			}
		},
		props:{
			soundImagesrcarr:{//图片路径数组，第一个为静态图片，第二个为动态图片，格式如：["../../static/img/course-main/pause.png","../../static/img/course-main/play-sound.gif"]
				type:Array,
				default:[]
			},
			playOnload:{
				type:Boolean,
				default:false
			},
			audioSrc:{
				type:String,
				default:""
			}
			
		},
		mounted() {
			console.log("simplesound mounted");
			this.initVoice()
		},
		destroyed(){
			console.log("组件销毁");
			innerAudioContext.destroy();
		},
		methods: {
			initVoice(){
				innerAudioContext = uni.createInnerAudioContext()
				console.log("this.playOnload"+this.playOnload);
				if(this.playOnload){
					innerAudioContext.autoplay = true;//默认false
					this.soundImagesrc = this.soundImagesrcarr[1];
					this.audioPaused = false;
				}else{
					innerAudioContext.autoplay = false;
					this.soundImagesrc = this.soundImagesrcarr[0];
					this.audioPaused = true;
				}
				
				
				// innerAudioContext.src = 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3';
				// src 路径中不支持有中文,m4a格式 Android和iOS都支持
				innerAudioContext.src = this.audioSrc;
				innerAudioContext.onCanplay(() => {
				  this.voiceDuration = innerAudioContext.duration?Math.round(innerAudioContext.duration):0;
				});
				innerAudioContext.onPlay(() => {
				  console.log('开始播放');
				});
				innerAudioContext.onEnded(() => {
				  this.soundImagesrc = this.soundImagesrcarr[0];
				  // #ifdef APP-PLUS
				  this.audioPaused = true;
				  // #endif
				});
				innerAudioContext.onError((res) => {
				  console.log(res.errMsg);
				  console.log(res.errCode);
				});
				// console.log("innerAudioContext.paused="+innerAudioContext.paused+"=="+JSON.stringify(innerAudioContext));
			},
			playVoice(){
				// console.log("innerAudioContext.paused="+innerAudioContext.paused+"=="+JSON.stringify(innerAudioContext));
				if(this.audioPaused){
					this.play()
					// this.audioPaused = false;
				}else{
					this.pause()
					// this.audioPaused = true;
				}
				this.audioPaused = !this.audioPaused;
			},
			play(){
				this.soundImagesrc = this.soundImagesrcarr[1];
				innerAudioContext.play()
			},
			pause(){
				this.soundImagesrc = this.soundImagesrcarr[0];
				innerAudioContext.pause()
			}
		}
	}
</script>

<style lang="less">
.sound-play-comp{
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #000000;
		background-color: #F7F8F9;
		width: 200upx;
		padding: 20upx;
		border-radius: 50upx;
		cursor: pointer;
		image{
			width: 40upx;
		}
	}
</style>
