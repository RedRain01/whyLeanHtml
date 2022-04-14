<template>
  <div class="pageBody">
    <div class="positionBar">
      <span class="fontFamily sdh-icon-dingwei"></span>&nbsp;&nbsp;当前位置 > 动态统计
    </div>

    <el-form :inline="true" :model="serchName" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" size="small" class="typeSelector" @click="firstQuery()">刷新</el-button>
      </el-form-item>
    </el-form>   
     <ve-line width="1400px" height="400px"  :data="chartData"></ve-line>
    <ve-pie width="1400px" height="400px"  :data="portData"></ve-pie>
    <el-form :inline="true" :model="serchName" class="demo-form-inline">
   
    </el-form>
  </div>
</template>

<script>
import { countTop } from "@/api/flink/flink.js";
export default {
  name: "staffInfo",
  data() {
    this.chartSettings = {};
    return {
      i: 1,
      chartData: {
        columns: ["商品", "订单金额"],
        rows: [
          { 商品: "诺基亚1", 订单金额: 1393 },
          { 商品: "诺基亚2", 订单金额: 445 },
          { 商品: "诺基亚3", 订单金额: 3530 },
          { 商品: "诺基亚4", 订单金额: 3530 },
          { 商品: "诺基亚5", 订单金额: 3530 },
          { 商品: "诺基亚6", 订单金额: 3530 },
          { 商品: "诺基亚7", 订单金额: 2923 }
        ]
      },
       portData: {
        columns: ["端口", "订单数量"],
        rows: [
          { 端口: "8488", 订单数量: 100 },
          { 端口: "8487", 订单数量: 100 }
    
        ]
      }
    };
  },
  mounted() {
   //  this.timer = setInterval(this.firstQuery, 7000);
  },
  methods: {
    firstQuery() {
     var myDate = new Date();
     console.log("----------------222----------"+myDate.toLocaleString())
      var data = {};
      countTop(data)
        .then(response => {
          this.chartData.rows = response.order;
          this.portData.rows = response.port;
        })
        .catch(error => {
          this.loading = false;
        });
         console.log("----------------333-------------"+myDate.toLocaleString())
    }
  }
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
  margin: 0 20px;
  background-color: #fff;
  padding: 15px 10px;
}

.typeSelector {
  margin-left: 35px;
}

.dataBar {
  margin: 20px 20px 0 20px;
  background-color: #fff;
  padding: 15px 10px;
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
