<template>
	<div>
		<div class="goods">
			<div class="menu-wrapper">
				<ul ref='menuUl'>
					<li class="menu-item" v-for="(good,index1) in goods" :key="index1" :class="{current:index1===currentIndex}" @click="clickMenuItem(index1)">
						<span class="text bottom-border-1px">
							<img class="icon" v-if="good.icon" :src="good.icon">
							{{good.name}}
						</span>
					</li>
				</ul>
			</div>
			<div class="foods-wrapper">
				<ul ref='foodsUl'>
					<li class="food-list-hook" v-for="(good,index2) in goods" :key="index2">
						<h1 class="title">{{good.name}}</h1>
						<ul>
							<li class="food-item bottom-border-1px" v-for="(food,index3) in good.foods" :key="index3"  @click="showFood(food)">
								<div class="icon">
									<img width="57" height="57" :src="food.icon">
								</div>
								<div class="content">
									<h2 class="name">{{food.name}}</h2>
									<p class="desc">{{food.description}}</p>
									<div class="extra">
										<span class="count">月售 {{food.sellCount}} 份</span>
										<span>好评率 {{food.rating}}%</span></div>
									<div class="price">
										<span class="now">￥{{food.price}}</span>
										<span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
									</div>
									<div class="cartcontrol-wrapper">
										<CartControl :food="food" />
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		    <Food :food="food" ref="food" />
		</div>
	    <ShopCart :goods="goods" />
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	import {mapState} from 'vuex'
	import CartControl from '../../../components/CartControl/CartControl.vue'
	import Food from '../../../components/Food/Food.vue'
	import ShopCart from '../../../components/ShopCart/ShopCart.vue'
	export default {
		components:{
			CartControl,
			Food,
			ShopCart
		},
		data(){
			return {
				//右侧滑动的Y轴坐标（滑动过程中实时变化）
				scrollRY:0,
				//左侧滑动的Y轴坐标（滑动过程中实时变化）
				scrollLY:0,
				//所有右侧分类li的top组成的数组（列表第一次显示后就不再变化）
				topsR:[],
				//所有左侧分类li的top组成的数组（列表第一次显示后就不再变化）
				topsL:[],
				//右侧滑动对象
				menuScroll:'',
				//左侧滑动对象
				foodsScroll:'',
				//判断是否是手动滚动
				scrollTouch:true,
				//左侧的li下标
				currentIndex: 0,
				//需要显示的food
				food:{}
			}
		},
		computed:{
			...mapState(['goods'])
		},
		watch:{
			currentIndex(val){
				//改变左侧的滑动位置
				let {topsL,menuScroll,_scrollTo,scrollLY} = this;
				const ulH = this.$refs.menuUl.offsetHeight;
				const liH = this.$refs.menuUl.getElementsByClassName('menu-item')[0].offsetHeight;
    		    const menuH = document.getElementsByClassName('menu-wrapper')[0].offsetHeight;
    		    if(topsL[val] < scrollLY || (topsL[val] + liH - scrollLY) > menuH){
    		    	const t = _scrollTo(ulH,topsL[val],menuH);
	        		menuScroll.scrollTo(0, -t);
    		    }
			}
		},
        mounted(){
        	this.$store.dispatch('getShopGoods',()=>{//数据更新后执行
        		this.$nextTick(()=>{
        			//非事件触发的回调函数可以加一个'_'用来区分函数类型
        			this._initScroll();
        			this._initTops();
        		});
        	});
        },
        methods:{
        	//初始化滚动条
        	_initScroll(){
        		//左侧滑动
    			this.menuScroll = new BScroll('.menu-wrapper',{
    				probeType:2,
    				click:true
    			});
    			//右侧滑动
    			this.foodsScroll = new BScroll('.foods-wrapper',{
    				probeType:2//手指离开后不会触发，因为惯性的滑动不会触发
    			});
    			//给右侧列表绑定scroll监听
    			this.foodsScroll.on('scroll',({x,y})=>{
    				this.scrollRY = Math.abs(y)
    				this._changeIndex();
    			});
    			//给右侧列表绑定滚动结束监听
    			this.foodsScroll.on('scrollEnd',({x,y})=>{
    				this.scrollRY = Math.abs(y)
    				this._changeIndex();
    			});
    			this.foodsScroll.on('touchEnd',({x,y})=>{
    				this.scrollTouch = true;
    			});
    			//给左侧列表绑定scroll监听
    			this.menuScroll.on('scroll',({x,y})=>{
    				this.scrollLY = Math.abs(y)
    			});
    			//给左侧列表绑定滚动结束监听
    			this.menuScroll.on('scrollEnd',({x,y})=>{
    				this.scrollLY = Math.abs(y)
    			});
        	},
        	//初始化tops
        	_initTops(){
        		//1.初始化tops
        		let topsR = [];
        		let topsL = [];
        		//2.收集
        		//找到所有右侧分类的li
        		const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook');
        		Array.prototype.slice.call(lis).forEach((li,i)=>{
        			topsR[i] = li.offsetTop;
        		});
        		//找到所有左侧分类的li
        		const lisL = this.$refs.menuUl.getElementsByClassName('menu-item');
        		Array.prototype.slice.call(lisL).forEach((li,i)=>{
        			topsL[i] = li.offsetTop;
        		});
        		//3.更新数据
        		this.topsR=topsR;
        		this.topsL=topsL;
        	},
        	//点击左侧li
        	clickMenuItem(index){
        		this.scrollTouch = false;
        		let {menuScroll,foodsScroll,topsR,_scrollTo} = this;
        		//使右侧列表滑动到某个位置
        		const ulH = this.$refs.foodsUl.offsetHeight;
        		const foodsH = document.getElementsByClassName('foods-wrapper')[0].offsetHeight;
        		const t = _scrollTo(ulH,topsR[index],foodsH);
        		this.currentIndex = index;
        		foodsScroll.scrollTo(0, -t);
        	},
        	//左侧右侧滑动到对于位置
        	_scrollTo(childH,top,parentH){
        		let t = 0;
        		if((childH-top) >= parentH){
        			t = top
        		}else{
        			t = childH - parentH;
        		}
        		return t;
        	},
        	//改变index的值
        	_changeIndex(){
        		const {scrollRY,topsR} = this;
        		if(this.scrollTouch){
        			this.currentIndex = topsR.findIndex((top,index,arr)=>{
						if(arr[index+1]){
							return scrollRY>=top && scrollRY<arr[index+1]
						}else{
							return scrollRY>=top
						}
					});
        		}
        	},
        	//点击某个食品li
        	showFood(food){
        		//设置food
        		this.food = food;
        		//显示food(父组件调用子组件对象的方法)
        		this.$refs.food.toggleShow();
        	}
        }
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../../common/stylus/mixins.styl"
    .goods
        display: flex
        position: absolute
        top: 195px
        bottom: 46px
        width: 100%
        background: #fff
        overflow: hidden
        .menu-wrapper
            flex: 0 0 80px
            width: 80px
            background: #f3f5f7
            .menu-item
                display: table
                height: 54px
                width: 56px
                padding: 0 12px
                line-height: 14px
                &.current
                    position: relative
                    z-index: 10
                    margin-top: -1px
                    background: #fff
                    color: $green
                    font-weight: 700
                    .text
                        border-none()
                .icon
                    display: inline-block
                    vertical-align: top
                    width: 12px
                    height: 12px
                    margin-right: 2px
                    background-size: 12px 12px
                    background-repeat: no-repeat 
                .text
                    display: table-cell
                    width: 56px
                    vertical-align: middle
                    bottom-border-1px(rgba(7, 17, 27, 0.1))
                    font-size: 12px 
        .foods-wrapper
            position: relative
            flex: 1
            .food-list-hook,
            >ul
                position: relative 
            .posTitle
                position: fixed
                top: 0
                left: 0
                width: 100%
            .title,
            .posTitle
                padding-left: 14px
                height: 26px
                line-height: 26px
                border-left: 2px solid #d9dde1
                font-size: 12px
                color: rgb(147, 153, 159)
                background: #f3f5f7    
            .food-item
                display: flex
                margin: 18px
                padding-bottom: 18px
                bottom-border-1px(rgba(7, 17, 27, 0.1))   
                &:last-child
                    border-none()
                    margin-bottom: 0      
                .icon
                    flex: 0 0 57px
                    margin-right: 10px 
                .content
                    flex: 1      
                    .name
                        margin: 2px 0 8px 0  
                        height: 14px
                        line-height: 14px
                        font-size: 14px
                        color: rgb(7, 17, 27)  
                    .desc, .extra
                        line-height: 10px
                        font-size: 10px
                        color: rgb(147, 153, 159)  
                    .desc
                        line-height: 12px
                        margin-bottom: 8px  
                    .extra
                        .count
                            margin-right: 12px      
                    .price
                        font-weight: 700
                        line-height: 24px  
                        .now
                            margin-right: 8px
                            font-size: 14px
                            color: rgb(240, 20, 20)    
                        .old
                            text-decoration: line-through
                            font-size: 10px
                            color: rgb(147, 153, 159)      
                    .cartcontrol-wrapper
                        position: absolute
                        right: 0
                        bottom: 8px               
</style>