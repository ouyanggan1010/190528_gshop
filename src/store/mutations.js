/*直接更新state的多个方法的对象*/
import Vue from 'vue'
import {
	RECEIVE_ADDRESS,
	RECEIVE_CATEGORYS,
	RECEIVE_SHOPS,
	RECEIVE_USERINFO,
	RECEIVE_LOGOUT,
	RECEIVE_GOODS,
	RECEIVE_RTINGS,
	RECEIVE_INFO,
	INCREMENT_FOOD_COUNT,
	DECREMENT_FOOD_COUNT,
	CLEAR_CART,
	RECEIVE_SEARCH_SHOPS
} from './types'
export default {
	//更新地址信息
	[RECEIVE_ADDRESS](state,{address}){
		state.address = address;
	},
	//更新食品分类列表
	[RECEIVE_CATEGORYS](state,{categorys}){
		state.categorys = categorys;
	},
	//更新首页商家列表
	[RECEIVE_SHOPS](state,{shops}){
		state.shops = shops;
	},
	//接收用户信息
	[RECEIVE_USERINFO](state,{userInfo}){
		state.userInfo = userInfo;
	},
	//清除用户信息
	[RECEIVE_LOGOUT](state){
		state.userInfo = {};
	},
	//更新商品列表
	[RECEIVE_GOODS](state,{goods}){
		state.goods = goods;
	},
	//更新商家评价数组
	[RECEIVE_RTINGS](state,{ratings}){
		state.ratings = ratings;
	},
	//更新商家信息
	[RECEIVE_INFO](state,{info}){
		state.info = info;
	},
	//增加 food 的 count
	[INCREMENT_FOOD_COUNT](state,{food}){
		if(!food.count){//第一次点击增加
			//food.count = 1;//给实例对象新增属性，不会触发视图更新
			Vue.set(food,"count",1);//让新增的属性有视图更新
			//第一次将food添加到cartFoods中
			state.cartFoods.push(food)
		}else{
			food.count++;
		}
	},
	//减少 food 的 count
	[DECREMENT_FOOD_COUNT](state,{food}){
		if(food.count){
			food.count--;
			if(food.count==0){
				//将food从cartFoods移除
				state.cartFoods.splice(state.cartFoods.indexOf(food),1)
			}
		}
	},
	//删除totalCount的所有值
	[CLEAR_CART](state){
		state.cartFoods.forEach((food)=>{
			Vue.delete(food,"count");
		});
		state.cartFoods=[]
	},
	//获取搜索得到的商家列表
	[RECEIVE_SEARCH_SHOPS](state,{searchShops}){
		console.log(searchShops)
		state.searchShops=searchShops
	},
}
