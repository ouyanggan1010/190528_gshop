<template>
    <div id="app">
        <router-view></router-view>
        <FooterGuide v-show="$route.meta.showFooter" />
    </div>
</template>

<script>
	import {mapActions} from 'vuex'
	import FooterGuide from './components/FooterGuide/FooterGuide.vue'
	export default {
        components:{
        	FooterGuide
        },
        methods:{
        	...mapActions(['getAddress','getUserInfo'])
        },
        mounted(){
        	//所有的初始化请求都可以放在App中
        	//this.$store.dispatch('getAddress'); 
        	//初始化请求地址信息
        	this.getAddress();
        	//初始化用户信息
        	this.getUserInfo();
        }
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    #app
        width 100%
        height 100%
        background #f5f5f5
</style>