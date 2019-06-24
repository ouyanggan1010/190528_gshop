/*状态对象*/
export default {
	backStageUrl:"http://localhost:4000",
	latitude: 40.10038, // 纬度
	longitude:  116.36867, // 经度
	address: {},//根据经纬度获取地址信息对象
	categorys: [],//获取食品分类列表
	shops: [],//商家数组
	userInfo:{},//用户登录信息
	goods:[],//商品列表
	ratings:[],//商家评价列表
	info:{},//商家信息
	cartFoods:[],//购物车中食物的列表
	searchShops:[],//搜索得到的商家列表
}
