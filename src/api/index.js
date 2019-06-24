/*
 * 包含多个接口请求的函数的模块
 * 与后台交互模块
 * 函数的返回值是promise对象
 */
import ajax from './ajax'
const BASE_URL = '/api'
//1、根据经纬度获取位置详情  geohash(经纬度)
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
//2、获取食品分类列表
export const reqCategorys = () => ajax(`${BASE_URL}/index_category`)
//3、根据经纬度获取商铺列表  latitude(纬度) longitude(经度)
export const reqShops = ({
	latitude,
	longitude
}) => ajax(`${BASE_URL}/shops`, {
	latitude,
	longitude
})
//4、根据经纬度和关键字搜索商铺列表  keyword(关键字) geohash(经纬度)
export const reqCategorysSearch = ({
	keyword,
	geohash
}) => ajax(`${BASE_URL}/search_shops`, {
	keyword,
	geohash
})
//5、获取一次性验证码
export const reqCaptcha = () => ajax(`${BASE_URL}/captcha`)
//6、用户名密码登陆  name(用户名) pwd(密码) captcha(验证码)
export const reqPwdLogin = ({
	name,
	pwd,
	captcha
}) => ajax(`${BASE_URL}/login_pwd`, {
	name,
	pwd,
	captcha
}, 'POST')
//7、发送短信验证码  phone(手机号)
export const reqSendCode = ({
	phone
}) => ajax(`${BASE_URL}/sendcode`, {
	phone
})
//8、手机号验证码登陆  phone(手机号) code(验证码)
export const reqSmsLogin = ({
	phone,
	code
}) => ajax(`${BASE_URL}/login_sms`, {
	phone,
	code
},'POST')
//9、根据会话获取用户信息
export const reqUserInfo = () => ajax(`${BASE_URL}/userinfo`)
//10、用户登出
export const reqLogout = () => ajax(`${BASE_URL}/logout`)
/*不需要代理*/
//11、获取商家商品数组
export const reqShopGoods = () => ajax('/shop_goods')
//12、获取商家评价数组
export const reqShopRatings = () => ajax('/shop_ratings')
//13、获取商家信息
export const reqShopInfo = () => ajax('/shop_info')