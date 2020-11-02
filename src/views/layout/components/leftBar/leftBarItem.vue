<template>
  <div>
   <template v-for="item in routes">
      <template v-if="item.childs.length!=0">
          <el-submenu :index="item.index" :key="item.index">
              <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
              <template v-for="child in item.childs">
                <leftbaritem :is-next='true' class="nextmenu" v-if="child.childs&&child.childs.length>0" :routes="[child]" :key="child.index"></leftbaritem>
                  <template v-else>
                    <el-menu-item :index="child.index" :key="child.index">
                        <i :class="child.icon"></i>{{ child.title }}
                    </el-menu-item>
                  </template>
              </template>
          </el-submenu>
      </template>
      <template v-else>
          <el-menu-item :index="item.index" class="downClass" :key="item.index">
              <i :class="item.icon"></i>&nbsp;&nbsp;{{ item.title }}
          </el-menu-item>
      </template>
  </template>
  </div>
</template>

<script>
export default {
  name: "leftBarItem",
  props: {
    routes: {
      type: Array
    },
    isNext: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" type="text/css" scoped>
.el-submenu {
  border-top: 1px solid #f5f5f5;
  .el-submenu{
    border-top: none;
  }
}
.el-icon-arrow-down:before{
   color: #4976e7;
}
.downClass{
  border-top: 1px solid #f5f5f5
}
</style>
