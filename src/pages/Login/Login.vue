<template>
	<div class="loginContainer">
		<div class="loginInner">
			<div class="login_header">
				<h2 class="login_logo">硅谷外卖</h2>
				<div class="login_header_title">
					<a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
					<a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
				</div>
			</div>
			<div class="login_content">
				<form @submit.prevent="login">
					<div :class="{on:loginWay}">
						<section class="login_message">
							<input type="tel" maxlength="11" placeholder=" 手机号" v-model="phone">
							<button :disabled="colorDisable(true)" class="get_verification" :class="{right_phone: colorDisable(false)}" @click.prevent="getCode">
								{{computedTime > 0 ? `已发送(${computedTime}秒)` : '获取验证码'}}
							</button>
						</section>
						<section class="login_verification">
							<input type="tel" maxlength="8" placeholder=" 验证码" v-model="code">
						</section>
						<section class="login_hint">
							温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
							<a href="javascript:;">《用户服务协议》</a>
						</section>
					</div>
					<div :class="{on:!loginWay}">
						<section>
							<section class="login_message">
								<input type="tel" maxlength="11" placeholder=" 手机/ 邮箱/ 用户名" v-model="name">
							</section>
							<section class="login_verification">
								<input type="password" maxlength="8" placeholder=" 密码" v-if="!showPwd" v-model="pwd">
								<input type="text" maxlength="8" placeholder=" 密码" v-else v-model="pwd">
								<div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
									<div class="switch_circle" :class="{right:showPwd}"></div>
									<span class="switch_text">{{showPwd?'abc':'...'}}</span>
								</div>
							</section>
							<section class="login_message">
								<input type="text" maxlength="11" placeholder=" 验证码" v-model="captcha">
								<img class="get_verification" :src="`${backStageUrl}/captcha`" alt="captcha" @click="getCaptcha" ref="captcha">
							</section>
						</section>
					</div>
					<button class="login_submit">登录</button>
				</form>
				<a href="javascript:;" class="about_us">关于我们</a>
			</div>
			<span class="go_back" @click="$router.back()">
				<i class="iconfont icon-jiantou2"></i>
			</span>
		</div>
		<AlertTip :alertText="alertText" @closeTip="closeTip" v-if="alertShow"></AlertTip>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import AlertTip from '../../components/AlertTip/AlertTip.vue'
	import {reqSendCode,reqSmsLogin,reqPwdLogin} from '../../api'
	export default {
		components:{
			AlertTip
		},
        data(){
        	return{
        		loginWay:true,//true代表短信登录；false代表密码登录
        		phone:"",//手机号
        		code:"",//短信验证码
        		computedTime:0,//计时的时间
        		showPwd: false,//判断密码的显示隐藏
        		name:"",//用户名
        		pwd:"",//密码
        		captcha:"",//图形验证码
        		alertText:"",//弹框提示信息
        		alertShow:false,//弹框的显示隐藏
        	}
        },
        computed:{
        	...mapState(['backStageUrl']),
        	rightPhone(){
        		const {phone} = this;
        		let reg = /^1(3|4|5|7|8)\d{9}$/
        		if(reg.test(phone)){
        			return true;
        		}
        		return false;
        	}
        },
        mounted(){
        	//更新图形验证码
        	this.getCaptcha();
        },
        methods:{
        	//判断获取短信验证码的可点击与颜色变化
        	colorDisable(bool){
        		const {rightPhone,computedTime}=this;
        		if(bool){
        			if(!rightPhone || computedTime>0){
        			    return true;
        		    }
        		}else{
        			if(rightPhone && !computedTime){
        			    return true;
        		    }
        		}
        		return false;
        	},
        	//点击获取图形验证码
        	getCaptcha(){
        		//每次指定src值要不一样
        		this.$refs.captcha.src=`${this.backStageUrl}/captcha?time=${Date.now()}`;
        	},
        	//关闭弹框
        	closeTip(){
        		this.alertShow = false;
        		this.alertText = '';
        	},
        	//显示弹框并赋值
        	showAlert(str){
        		this.alertShow = true;
        		this.alertText = str;
        	},
        	//异步获取短信验证码
        	async getCode(){
        		//启动倒计时
		        this.computedTime = 30;
		        this.set = setInterval(()=>{
		    		this.computedTime--;
		    		if(this.computedTime<=0){
		    			clearInterval(this.set);
		    			this.computedTime=0;
		    			this.set = null;
		    		}
		    	},1000);
		    	//请求验证码
		    	const {phone}=this;
		    	const result = await reqSendCode({phone});
		    	if(result.code == 1){
		    		this.showAlert(result.msg);
		    		if(this.computedTime){
		    			clearInterval(this.set);
		    			this.computedTime=0;
		    			this.set = null;
		    		}
		    	}
        	},
        	//点击登录按钮提交
        	async login(){
        		const {loginWay}=this;
        		let result;
        		//手机短信登录
        		if(loginWay){
        			const {rightPhone,phone,code}=this;
        			if(!rightPhone){
        				//手机号不正确
        				this.showAlert('手机号不正确');
        				return;
        			}else if(!/^\d{6}$/.test(code)){
        				//验证码不正确
        				this.showAlert('验证码不正确');
        				return;
        			}
    				result = await reqSmsLogin({phone,code});
        		}else{//用户名密码登录
        			const {name,pwd,captcha}=this;
        			if(!name){
        				//用户名不正确
        				this.showAlert('用户名不正确');
        				return;
        			}else if(!pwd){
        				//密码不正确
        				this.showAlert('密码不正确');
        				return;
        			}else if(!/^(\w|\d){4}$/.test(captcha)){
        				//图形验证码不正确
        				this.showAlert('图形验证码不正确');
        				return;
        			}
        			result = await reqPwdLogin({name,pwd,captcha});
        		}
        		if(result.code==1){
        			//更新图形验证码
        			this.getCaptcha();
        			//显示警告提示
					this.showAlert(result.msg);
				}else{
					//将用户信息存在vuex中
					const user = result.data;
					this.$store.dispatch('recordUser',user);
					//跳转到用户界面
					this.$router.replace('/profile');
				}
        	}
        }
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .loginContainer
        width 100%
        height 100%
        background #fff
        .loginInner
            padding-top 60px
            width 80%
            margin 0 auto
            .login_header
                .login_logo
                    font-size 40px
                    font-weight bold
                    color #02a774
                    text-align center 
                .login_header_title
                    padding-top 40px
                    text-align center  
                    >a
                        color #333
                        font-size 14px
                        padding-bottom 4px
                        &:first-child
                            margin-right 40px
                        &.on
                            color #02a774
                            font-weight 700
                            border-bottom 2px solid #02a774
            .login_content
                >form
                    >div
                        display none
                        &.on
                            display block
                        input
                            width 100%
                            height 100%
                            padding-left 10px
                            box-sizing border-box
                            border 1px solid #ddd
                            border-radius 4px
                            outline 0
                            font 400 14px Arial
                            &:focus
                                border 1px solid #02a774 
                        .login_message
                            position relative
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #fff  
                            .get_verification
                                position absolute
                                top 50%
                                right 10px
                                transform translateY(-50%)
                                border 0
                                color #ccc
                                font-size 14px
                                background transparent    
                                &.right_phone 
                                    color #000
                        .login_verification
                            position relative
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #fff    
                            .switch_button
                                font-size 12px
                                border 1px solid #ddd
                                border-radius 8px
                                transition background-color .3s,border-color .3s
                                padding 0 6px  
                                width 30px
                                height 16px
                                line-height 16px
                                color #fff
                                position absolute
                                top 50%
                                right 10px
                                transform translateY(-50%)  
                                &.off
                                    background #fff
                                    .switch_text
                                        float right
                                        color #ddd 
                                &.on
                                    background #02a774
                                >.switch_circle
                                    position absolute
                                    top -1px
                                    left -1px
                                    width 16px
                                    height 16px
                                    border 1px solid #ddd
                                    border-radius 50%
                                    background #fff
                                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                                    transition transform .3s 
                                    &.right
                                        transform: translateX(26px);
                        .login_hint
                            margin-top 12px
                            color #999
                            font-size 14px
                            line-height 20px
                            >a
                                color #02a774    
                    .login_submit
                        display block
                        width 100%
                        height 42px
                        margin-top 30px
                        border-radius 4px
                        background #4cd96f
                        color #fff 
                        text-align center
                        font-size 16px
                        line-height 42px
                        border 0   
                .about_us
                    display block
                    font-size 12px
                    margin-top 20px
                    text-align center
                    color #999    
            .go_back
                position absolute
                top 5px
                left 5px
                width 30px
                height 30px
                >.iconfont
                    font-size 20px
                    color #999                                           
</style>