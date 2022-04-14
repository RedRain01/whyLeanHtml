<template>
  <div class="pageBody">
    <div class="positionBar">
      <span class="fontFamily sdh-icon-dingwei"></span>&nbsp;&nbsp;当前位置 >flink
    </div>
    <el-tabs type="border-card">
        <el-tab-pane label="产生订单">
        <RoleManager></RoleManager>
      </el-tab-pane>
        <el-tab-pane label="动态统计">
        <StaffInfo></StaffInfo>
      </el-tab-pane>
      <el-tab-pane label="业务场景">
        <Summary></Summary>
      </el-tab-pane>
      <el-tab-pane label="开发流程">
        <AbountPro></AbountPro>
      </el-tab-pane>
      <el-tab-pane label="流程图">
        <Structure></Structure>
      </el-tab-pane>
       <el-tab-pane label="未来">
        <Future></Future>
      </el-tab-pane>
    
    </el-tabs>
  </div>
</template>
<script>
import AbountPro from "@/components/flink/abountPro.vue";
import StaffInfo from "@/components/flink/staffInfo.vue";
import Summary from "@/components/flink/summary.vue";
import Structure from "@/components/flink/structure.vue";
import RoleManager from "@/components/flink/roleManager.vue";
import Future from "@/components/flink/future.vue";
export default {
  components: {
    AbountPro,
    StaffInfo,
    Summary,
    Structure,
    Future,
    RoleManager
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.pageBody {
  font: 14px Helvetica Neue, Helvetica, PingFang SC, \5fae\8f6f\96c5\9ed1,
    Tahoma, Arial, sans-serif;
}

.positionBar {
  margin-top: 3px;
  height: 45px;
  line-height: 45px;
  padding-left: 20px;
  background-color: #fff;
}

.titleSlot {
  margin: 10px 20px;
}

.searchBar {
  margin: 0 5px;
  background-color: #fff;
  padding: 2px 4px;
}

.typeSelector {
  margin-left: 35px;
}

.dataBar {
  margin: 0px 5px 0 5px;
  background-color: #fff;
  padding: 5px 4px;
}

.el-table thead tr th {
  /* 表头颜色 */
  background-color: rgb(168, 168, 168);
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
