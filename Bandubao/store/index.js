// <!-- 页面路径：store/index.js -->
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
    state:{//存放状态
       hasLogin:false,
	   userinfo:{
	   	userName:"雯雯",
	   	ismember:false,
	   	grade:"一年级",
	   	avatar:"../../static/img/firstpage/katoon2.jpg"
	   }
    },
	mutations:{
		login(state,userName) {
			state.userName = userName || '新用户';
			state.hasLogin =true;
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		},
		updateUserinfo(state,userinfo){
			state.userinfo = userinfo
		}
	}
})
export default store