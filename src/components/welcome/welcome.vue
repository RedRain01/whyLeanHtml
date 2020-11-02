<template>
  <div class="overview">
  </div>
</template>

<script>

export default {
  name: "welcome",
  data() {
    return {
      //联系人
      userStorage: {},
      arrays: [],
      localArray: [],
      contactman: "",
      userInfo: "",
      custInfo: "",
      year:'',//核心标准
      orderSums: "",
      showTag: false,
      tableData: []
    };
  },
  methods: {
    menuMethod(menus) {
      //给button添加isClick,初始化button样式
      menus.forEach(element => {
        if(element.childs.length!=0){
          element.childs.forEach(item => {
            if(item.childs.length!=0){
              this.menuMethod(item.childs);
            }else{
              item.isClick = false;
              this.arrays.forEach(it => {
                if (it.index == item.index) {
                  item.isClick = true;
                }
              });
            }
          });
        }else{
          element.isClick = false;
          this.arrays.forEach(it => {
            if (it.index == element.index) {
              element.isClick = true;
            }
          });
        }
      });
    },
    clickShow() {
      this.showTag = !this.showTag;
      if (this.showTag) {
        //展开时初始化menus样式
        this.menuMethod(this.menus);
      }
    },
    //添加删除快捷键
    addLimits(element) {
      var j = 0;
      var n = 0;
      this.isClickStyle(element.index,this.menus); //样式该变
      if (this.arrays.length == 0) {
        this.arrays.push(element);
      } else {
        this.arrays.forEach((item, i) => {
          if (item.index != element.index) {
            j++;
          } else {
            n = i;
          }
        });
        if (j == this.arrays.length) {
          //加入
          this.arrays.push(element);
        } else {
          //删除
          this.arrays.splice(n, 1);
        }
      }
      this.addItem(); //添加快捷键
    },
    addItem() {
      //添加快捷键
      var str = JSON.stringify(this.arrays);
      this.userStorage.usercode = this.userInfo.usercode;
      this.userStorage.arrays = str;
      this.localArray.forEach((item, i) => {
        if (item.usercode == this.userInfo.usercode) {
          this.localArray.splice(i, 1);
        }
      });
      this.localArray.push(this.userStorage);
      var arrStr = JSON.stringify(this.localArray);
      localStorage.localArray = arrStr;
    },
    initItem() {
      //初始化快捷键
      if (localStorage.localArray) {
        var arrStr = localStorage.localArray; //快捷键数组获取
        this.localArray = JSON.parse(arrStr);
        this.localArray.forEach(item => {
          if (item.usercode === this.userInfo.usercode) {
            var str = item.arrays;
            this.arrays = JSON.parse(str);
          }
        });
      }
    },
    isClickStyle(id,menus) {
      //按钮样式
      menus.forEach(item => {
        if (item.childs.length==0&&id==item.index) {
          item.isClick = !item.isClick;
        } else if (item.childs.length!=0){
          item.childs.forEach(it => {
            if (it.childs.length!=0) {
              this.isClickStyle(id,it.childs);
            } else{
              if (id == it.index) {
                it.isClick = !it.isClick;
              }
            }
          });
        }
        this.showTag = false;
        this.showTag = true;
      });
    },
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
.overviewtips{
  font-size: 12px;
  padding-left: 5px;
  color: #409eff;
}
.fastKey-tit .el-icon-circle-plus,
.fastKey-tit span {
  cursor: pointer;
}
.base-list-info {
  font-size: 14px;
  color: #666;
  li {
    height: 40px;
    line-height: 40px;
    label {
      padding-right: 5px;
    }
  }
}
.ul-fast-ctrl {
  padding: 10px;
  li {
    float: left;
    margin-right: 40px;
    a {
      color: #fff;
    }
    div {
      width: 140px;
      height: 34px;
      line-height: 34px;
      background-color: #fff;
    }
  }
}
.add-fastKey {
  position: relative;
  margin: 10px;
  .fastKey-tit {
    .el-icon-circle-plus,
    .el-icon-remove {
      font-size: 36px;
      color: #409eff;
      float: left;
      cursor: pointer;
    }
    span {
      height: 36px;
      line-height: 36px;
      padding-left: 10px;
      cursor: pointer;
    }
  }
}
.fastKey-list {
  width: 800px;
  position: absolute;
  top: 40px;
  left: 4px;
  box-shadow: 0 0px 5px #d1d4db;
  z-index: 1000;
  background-color: #fff;
  padding-bottom: 10px;
}
.list-choice {
  li {
    width: 25%;
    height: 36px;
    line-height: 36px;
    float: left;
    margin-bottom: 10px;
    button {
      padding: 8px 20px;
      font-size: 14px;
      border-radius: 4px;
      background-color: #fff;
      color: #409eff;
      box-sizing: border-box;
      border: 1px dashed #409eff;
      transition: all 0.5s;
    }
    button.is-click {
      background-color: #409eff;
      color: #fff;
      border: 1px solid #409eff;
    }
  }
}
.center .center-main .part-main .fastKey-list .part-detail {
  padding-top: 0px;
  padding-bottom: 0px;
}
.center .center-main .fastKey-list .part-title {
  padding: 12px 0 12px 20px;
}
.butItem {
  margin: 10px;
  margin-right: -60px;
  padding: 0px;
}
.part-order{
  .orderTotal{
    float: left;
    width: 30%;
    height: 180px;
    margin-left: 20px;
    background-color: white;
    hr{
      height:1px;border:none;border-top:1px solid #DCDCDC;
    }
    .heade{
      margin-top: 10px;
      i{
        display: inline-block;
        height: 15px;
        width: 5px;
        margin: auto 10px -3px 30px;
        background-color: red;
      }
    }
    .span{
      margin-left: 10px;
      float: left;
      span{
        height:25px;
        margin: 20px;
        display: block;
      }
    }
  }
}

</style>
