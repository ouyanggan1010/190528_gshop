<template>
	<header class="header">
		<slot name="search"></slot>
		<div class="header_title">
			<span class="header_title_text ellipsis">{{title}}</span>
		</div>
		<slot name="login"></slot>
	</header>
</template>

<script>
	export default {
        props:{
        	title:String
        }
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .header
        background-color #02a774
        position fixed
        z-index 2000
        left 0
        top 0
        width 100%
        height 45px
        .header_search
            display block
            position absolute
            left 15px
            top 50%
            transform translateY(-50%)
            width 10%
            height 50%
            .icon-sousuo
                font-size 25px
                color #fff
        .header_title
            display block
            position absolute
            top 50%
            left 50%
            transform translate(-50%,-50%)
            width 50%
            color #fff
            text-align center
            .header_title_text 
                font-size 20px
                color #fff
                display block
        .header_login
            display block
            font-size 14px
            color #fff
            position absolute
            right 15px 
            top 50%
            transform translateY(-50%)
            .header_login_text
                color #fff
</style>