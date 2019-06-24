<template>
	<div class="miste">
		<!--首页头部-->
		<HeaderTop :title="address.name">
			<router-link to="/search" slot="search" class="header_search">
				<i class="iconfont icon-sousuo"></i>
			</router-link>
			<router-link :to="userInfo._id?'/userInfo':'/login'" slot="login" class="header_login">
				<span class="header_login_text" v-if="userInfo._id"><i class="iconfont icon-person"></i></span>
				<span class="header_login_text" v-else>登录 | 注册</span>
			</router-link>
		</HeaderTop>
		<!--首页导航-->
		<nav class="miste_nav border-1px">
			<div class="swiper-container" v-if="categorysArr.length>0">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(categorys,index1) in categorysArr" :key="index1">
						<a href="javascript:;" class="link_to_food" v-for="(category,index2) in categorys" :key="index2">
							<div class="food_container">
							    <img v-lazy="imgBaseUrl+category.image_url" />
							</div>
							<span>{{category.title}}</span>
						</a>
					</div>
				</div>
				<!-- Add Pagination -->
                <div class="swiper-pagination"></div>
			</div>
			<img src="./images/msite_back.svg" alt="" v-else />
		</nav>
		<!--首页附近商家-->
		<div class="msite_shop_list border-1px">
		    <div class="shop_header">
		    	<i class="iconfont icon-xuanxiang shop_icon"></i>
		    	<span class="shop_header_title">附近商家</span>
		    </div>
		    <ShopList />
		</div>
	</div>
</template>

<script>
	import Swiper from 'swiper'
	import 'swiper/dist/css/swiper.min.css'//node_modules文件夹下的swiper/dist/css/swiper.min.css
	import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
	import ShopList from '../../components/ShopList/ShopList.vue'
	import {mapState} from 'vuex'
	
	export default {
		components:{
			HeaderTop,
			ShopList
		},
		data(){
			return {
				imgBaseUrl: 'https://fuss10.elemecdn.com'
			}
		},
		computed:{
			...mapState(['address','categorys','userInfo']),
			categorysArr() {
				let arr = [];
				let len = this.categorys.length;
				let j = (len % 8) === 0 ? len / 8 : (len / 8) + 1;
				for(let i = 0; i < j; i++) {
					let start = i * 8;
					let end = start + 8;
					arr[i]=this.categorys.slice(start, end);
				}
				return arr;
			}
		},
		watch: {
            categorys(value) {
                this.$nextTick(() => {
                    new Swiper('.swiper-container', {
                        pagination: {
                            el: '.swiper-pagination',
                        },
                        loop: true
                    })
                })
            }
        },
		mounted(){
			//请求食品分类列表
			this.$store.dispatch('getCategorys');
			//根据经纬度获取商铺列表
			this.$store.dispatch('getShops');
		},
        methods:{
        	
        }
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixins.styl' 
    .miste
        width 100%
        .miste_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
                width 100%
                height 100%
                .swiper-wrapper
                    width 100%
                    height 100%
                    .swiper-slide
                        display flex
                        justify-content center
                        align-items flex-start
                        flex-wrap wrap
                        .link_to_food
                            width 25%
                            .food_container
                                display block
                                width 100%
                                text-align center
                                padding-bottom 10px
                                font-size 0
                                img 
                                    display inline-block
                                    width 50px
                                    height 50px
                            span
                                display block
                                width 100%
                                text-align center
                                font-size 13px
                                color #666
                .swiper-pagination
                    >span.swiper-pagination-bullet-active
                        background #02a774            
        .msite_shop_list
            top-border-1px(#e4e4e4)   
            margin-top 10px
            background #fff
            .shop_header
                padding 10px 10px 0 10px
                .shop_icon
                    margin-left 5px
                    color #999
                .shop_header_title
                    color #999
                    font-size 14px
                    line-height 20px  
                                            
</style>