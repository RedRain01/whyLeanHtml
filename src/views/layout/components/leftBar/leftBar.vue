<template>
  <div class="left">
    <div class="left-menu">
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router>
        <leftBarItem :routes='items'></leftBarItem>
      </el-menu>
    </div>
  </div>
</template>

<script>
import leftBarItem from "./leftBarItem.vue";
export default {
  name: "leftBar",
  data() {
    return {
      items: [
				
		{
          icon: "fontFamily sdh-icon-web-icon-",
          index: "/paymentFlow",
          title: "订单产生",
          childs: []
        },
        {
          icon: "fontFamily sdh-icon-huihuilicaishi",
          index: "/staffInfo",
          title: "订单信息",
          childs: []
        },
        {
          icon: "fontFamily sdh-icon-jiaoseguanli",
          index: "/roleManager",
          title: "flink处理后",
          childs: []
        },
        {
          icon: "fontFamily sdh-icon-tuikuan",
          index: "/refundFlow",
          title: "汇总",
          childs: []
				}
      ]
    };
  },
  methods: {
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  components: {
    leftBarItem
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
.left{
	background-color: #fff;
	position: absolute;
	width: 200px;
	top:60px;
	bottom: 0;
	z-index: 8;
	.left-title{
		height: 45px;
		line-height: 45px;
		padding-left: 25px;
		background-color: #5a8bff;
		color: #fff;
		.title{
			padding-left: 30px;
			/* background: url(../../../../assets/images//10menu.png) 0 center no-repeat; */
		}
	}
	.left-menu{
    position: absolute;
    bottom: 0;
    top: 45px;
		width: 220px;
	    overflow: scroll;
	    overflow-x: hidden;
	    li{
	    	list-style: none;
	    	line-height: 45px;
	    	a{
	    		display: block;
			    overflow: hidden;
			    padding-left: 60px;
			    line-height: 40px;
			    color: #333;
			    transition: all .3s;
			    position: relative;
			    text-decoration: none;
			    font-size: 14px;
	    	}
	    }
	    li.open{
	    	height: auto;
	    	.sub-menu{
	    		background: #f5f5f5;
	    	}
	    	.active{
	    		.arrow{
			    	position: absolute;
			    	top: 16px;
		    		right: 25px;
			    	width: 10px;
			    	height: 10px;
			    	/* background: url(../images/xia.png) center center no-repeat; */
			    }
	    	}
	    }
	    .i02{
	    	/* background: url(../images/2trans.png) 25px center no-repeat; */
	    	border-top: solid 1px #f5f5f5;
	    	&:hover{
	    		border-left: 2px solid #5a8bff
	    	}
	    }
	    .i03{
	    	/* background: url(../images/3list.png) 25px center no-repeat; */
	    	border-top: solid 1px #f5f5f5;
	    }
	    .i04{
	    	/* background: url(../images/4user.png) 25px center no-repeat; */
	    	border-top: solid 1px #f5f5f5;
	    }
	    .i05{
	    	/* background: url(../images/5good.png) 25px center no-repeat; */
	    	border-top: solid 1px #f5f5f5;
	    }
	    .i06{
	    	/* background: url(../images/6store.png) 25px center no-repeat; */
	    	border-top: solid 1px #f5f5f5;
	    }
	    .i07{
	    	/* background: url(../images/7down.png) 25px center no-repeat; */
	    	border-top: solid 1px #f5f5f5;
	    }
	    .arrow{
	    	position: absolute;
	    	top: 16px;
    		right: 25px;
	    	width: 10px;
	    	height: 10px;
	    	/* background: url(../images/you.png) center center no-repeat; */
	    }
	}
}
.left-menu {
  .el-menu {
    padding-right: 12px;
  }
}
</style>
