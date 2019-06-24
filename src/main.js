/*JS入口*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'
import './mock/mockServer'//加载mockServer即可
import VueLazyload from 'vue-lazyload'
import loading from './common/img/loading.gif'

Vue.component(Button.name,Button)
Vue.use(VueLazyload,{loading})

new Vue({
	el: '#app',
	render: h => h(App),
	router,
	store
})