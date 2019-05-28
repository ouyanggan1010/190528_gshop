/*
 * 包含多个接口请求的函数的模块
 * 与后台交互模块
 * 函数的返回值是promise对象
 */
import ajax from './ajax'
//1、根据经纬度获取位置详情  geohash(经纬度)
export const reqAddress = (geohash) => ajax(`position/${geohash}`)
//2、获取食品分类列表
export const reqCategorys = () => ajax('/index_category')
//3、根据经纬度获取商铺列表  latitude(纬度) longitude(经度)
export const reqShops = ({
	latitude,
	longitude
}) => ajax('/shops', {
	latitude,
	longitude
})
//4、根据经纬度和关键字搜索商铺列表  keyword(关键字) geohash(经纬度)
export const reqCategorysSearch = ({
	keyword,
	geohash
}) => ajax('/search_shops', {
	keyword,
	geohash
})
//5、获取一次性验证码
export const reqCategorys = () => ajax('/captcha')
//6、用户名密码登陆  name(用户名) pwd(密码) captcha(验证码)
export const reqPwdLogin = ({
	name,
	pwd,
	captcha
}) => ajax('/login_pwd', {
	name,
	pwd,
	captcha
}, 'POST')
//7、发送短信验证码  phone(手机号)
export const reqSendCode = ({
	phone
}) => ajax('/sendcode', {
	phone
})
//8、手机号验证码登陆  phone(手机号) code(验证码)
export const reqSmsLogin = ({
	phone,
	code
}) => ajax('/login_sms', {
	phone,
	code
},'POST')
//9、根据会话获取用户信息
export const reqUser = () => ajax('/userinfo')
//10、用户登出
export const reqLogout = () => ajax('/logout')