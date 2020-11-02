<template>
  <div class="center" ref="centerid">
    <transition name="move" mode="out-in">
        <router-view></router-view>
    </transition>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import footerBar from './footerBar.vue'
  export default {
    name: 'centerBar',
    components: {
      footerBar
    },
  }
</script>

<style lang="scss" type="text/css" scoped>
.center{
	position: absolute;
	left: 201px;
	top: 60px;
	right: 0px;
	bottom: 0;
	z-index: 998;
	background-color: #f6f5f5;
	overflow: hidden;
    overflow-y: auto;
    overflow-x: auto;
    min-width: 800px;
	.center-title{
		height: 45px;
		line-height: 45px;
		padding-left: 20px;
		background-color: #fff;
		p{
			padding-left: 30px;
			background: url(/@/assets/images/pos.png) 0 center no-repeat;
		}
  }
  .positionStyle{
    height: 38px;
    position: relative;
  }
	.center-main{
		.part-title{
      padding: 20px 0 12px 20px;
		}
		.part-main{
      .tabView{
        position: absolute;
        top: 0px;
        padding-left: 20px;
        margin-bottom: 1px;
        li{
          border-top: 2px solid #ebebeb;
          border-right: 1px solid #fff;
          float: left;
          padding:0 20px;
          text-align: center;
          height: 38px;
          line-height: 38px;
          background-color: #ebebeb;
          box-sizing: border-box;
          cursor: pointer;
          a{
            display: inline-block;
            width: 100%;
          }
          &:hover{
            border-top: 2px solid #409eff;
            a{
              color: #409eff;
            }
          }
        }
        li:last-child{
          border-right: none;
        }
        li.active{
          background-color: #fff;
          border-top: 2px solid #409eff;
          &:hover{
            border-bottom: none;
          }
        }
      }
      .part-detail{
        margin-left: 20px;
        padding-left: 20px!important;
        margin-right: 20px;
        padding-right: 20px;
        padding-bottom: 15px!important;
        padding-top: 15px!important;
        background-color: #fff;
        box-shadow:0 0 8px rgba(0,0,0,.08);
      }
			.part-top{
				@extend .pm20;
        @extend .bgfff;
        @extend .borderShadow;
        margin-top: 0;
			}
			.part-bottom{
        @extend .borderShadow;
				.part-bottom-tit{
					font-size: 12px;
          padding-bottom:20px;
          ul{
            position: relative;
            li:not(:last-child) {
              @extend .base-li;
              margin-right: 25px;
            }
            li:first-child{
              margin-right: 30px;
            }
            li:last-child{
              position: absolute;
              right: 0;
              top: -6px;
            }
          }
				}
				@extend .pm20;
				@extend .bgfff;
				padding-bottom: 20px;
				.layui-table{
					margin: 0;
					th,td{
						font-size: 12px;
					}
				}
			}
			.fbox {
			    display: inline-block;
			    padding-bottom: 20px;
			}
			.input_lab {
			    font-size: 12px;
			    display: block;
			    padding-bottom: 10px;
			}
			.input_a {
			    width: 190px;
          height: 38px;
          line-height: 1.3;
          line-height: 38px\9;
          border-width: 1px;
          border-color: #e6e6e6;
          border-style: solid;
          background-color: #fff;
          border-radius: 2px;
          display: block;
          padding-left: 10px;
          outline: 0;
          -webkit-appearance: none;
          transition: all .3s;
          -webkit-transition: all .3s;
          box-sizing: border-box;
			}
			.myselect {
			    width: 190px;
			    height: 38px;
			    border: 1px solid #e6e6e6;
			    color: #333333;
			    padding-left: 10px;
			}
			.lilbtn_c {
			    display: inline-block;
			    border: none;
			    cursor: pointer;
			    border-radius: 2px;
			    width: 120px;
			    height: 38px;
			    text-align: center;
			    line-height: 38px;
			    color: #ffffff;
			    background: #5a8bff;
			    margin-top: 20px;
			}
		}
	}
}
</style>
