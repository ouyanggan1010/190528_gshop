/*使用mockjs提供的mock数据接口*/
import Mock from 'mockjs'
import data from './data.json'
//返回goods的接口
Mock.mock('/shop_goods',{code:0,data:data.goods});
//返回ratings的接口
Mock.mock('/shop_ratings',{code:0,data:data.ratings});
//返回info的接口
Mock.mock('/shop_info',{code:0,data:data.info});
//export default 不需要暴露任何东西，只需要保证执行一次即可