/*ajax请求函数模块
  返回值是一个promise对象（异步返回的数据是response.data）
 * */
import axios from 'axios'

export default function ajax(url = '', data = {}, type = 'GET') {
	return new Promise(function(resolve, reject) {
		let pro;
		if(type === 'GET') {
			// 准备 url query 参数数据
			let str = ""; // 数据拼接字符串
			Object.keys(data).forEach((key) => {
				str += key + "=" + data[key] + "&";
			});
			if(str) {
				url += "?" + str.substring(0, str.lastIndexOf("&"));
			}
			// 发送 get 请求
			pro = axios.get(url);
		} else {
			// 发送 post 请求
			pro = axios.post(url, data);
		}
		pro.then(response => {
			resolve(response.data);
		}).catch(error => {
			reject(error)
		});
	});
}