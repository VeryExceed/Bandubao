<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* 每个页面公共css uni官方字体库 */
	@import '@/static/common/uni.css';
	/* 自定义字体库 */
	@import '@/static/common/icon.css';
</style>
