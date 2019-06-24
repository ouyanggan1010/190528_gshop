/*包含多个基于state的getter计算属性的对象*/
export default {
	totalCount(state){
		return state.cartFoods.reduce((total,food)=>{
			return food.count + total;
		},0)
	},
	totalPrice(state){
		return state.cartFoods.reduce((total,food)=>{
			return (food.count * food.price) + total;
		},0)
	},
	//得到评分满意的数量
	positiveSize(state){
		const ratings=state.ratings;
		return ratings.reduce((total,e,i)=>{
			if(e.rateType===0){
				return ++total;
			}
			return total;
		},0)
	}
}