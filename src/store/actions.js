/*通过mutations间接更新state的多个方法的对象*/
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
//请求函数
import { 
	reqAddress, 
	reqCategorys, 
	reqShops,
	reqUserInfo,
	reqLogout,
	reqShopInfo,
	reqShopRatings,
	reqShopGoods,
	reqCategorysSearch
} from '../api'

export default {
    //异步获取地址信息
    async getAddress({commit,state}){
    	//发送异步ajax请求
    	let result = await reqAddress(state.latitude + "," + state.longitude);
    	//提交一个mutation
    	if(result.code===0){
    		let address = result.data;
    		commit(RECEIVE_ADDRESS,{address})
    	}
    },
    //异步获取食品分类列表
    async getCategorys({commit,state}){
    	//发送异步ajax请求
    	let result = await reqCategorys();
    	//提交一个mutation
    	if(result.code===0){
    		let categorys = result.data;
    		commit(RECEIVE_CATEGORYS,{categorys})
    	}
    },
    //异步获取首页商家列表
    async getShops({commit,state}){
    	//发送异步ajax请求
    	let result = await reqShops(state);
    	//提交一个mutation
    	if(result.code===0){
    		let shops = result.data;
    		commit(RECEIVE_SHOPS,{shops})
    	}
    },
    //同步记录用户信息
    recordUser({commit},userInfo){
    	commit(RECEIVE_USERINFO,{userInfo})
    },
    //异步获取用户信息
    async getUserInfo({commit}){
    	//发送异步ajax请求
    	let result = await reqUserInfo();
    	//提交一个mutation
    	if(result.code===0){
    		let userInfo = result.data;
    		commit(RECEIVE_USERINFO,{userInfo})
    	}
    },
    //异步退出登录
    async getLogout({commit}){
    	//发送异步ajax请求
    	let result = await reqLogout();
    	//提交一个mutation
    	if(result.code===0){
    		commit(RECEIVE_LOGOUT)
    	}
    },
    //异步获取商品列表
    async getShopGoods({commit},callback){
    	//发送异步ajax请求
    	let result = await reqShopGoods();
    	//提交一个mutation
    	if(result.code===0){
    		let goods = result.data;
    		//这里数据已经更新，同步操作
    		commit(RECEIVE_GOODS,{goods});
    		//数据已经更新了，通知组件,相当于一个if语句，判断当有传参并且是函数的时候才执行
    		callback && callback()
    	}
    },
    //异步获取商家评价数组
    async getShopRatings({commit},callback){
    	//发送异步ajax请求
    	let result = await reqShopRatings();
    	//提交一个mutation
    	if(result.code===0){
    		let ratings = result.data;
    		commit(RECEIVE_RTINGS,{ratings})
    		callback && callback()
    	}
    },
    //异步获取商家信息
    async getShopInfo({commit},callback){
    	//发送异步ajax请求
    	let result = await reqShopInfo();
    	//提交一个mutation
    	if(result.code===0){
    		let info = result.data;
    		commit(RECEIVE_INFO,{info})
    		callback && callback()
    	}
    },
    //同步更新goods的food的count值
    updateFoodCount({commit},{isAdd,food}){
    	if(isAdd){//增加
    		commit(INCREMENT_FOOD_COUNT,{food})
    	}else{//减少
    		commit(DECREMENT_FOOD_COUNT,{food})
    	}
    },
    //同步删除totalCount的所有值
    clearCart({commit}){
    	commit(CLEAR_CART)
    },
    //异步搜索商家列表
    async getCategorysSearch({commit,state},keyword){
    	//发送异步ajax请求
    	let result = await reqCategorysSearch({keyword,geohash:state.latitude + "," + state.longitude});
    	//提交一个mutation
    	if(result.code===0){
    		let searchShops = result.data;
    		commit(RECEIVE_SEARCH_SHOPS,{searchShops})
    	}
    },
}