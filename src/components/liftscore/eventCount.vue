
<template>
  <div class="pageBody">
    <el-form :inline="true" :model="serchName" class="demo-form-inline">
      <el-form-item></el-form-item>

      <el-form-item label="查看时间选择">
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="dateParam"
          type="datetime"
          placeholder="选择时间"
        ></el-date-picker>
      </el-form-item>
      <el-button type="primary" size="mini" class="typeSelector" @click="countQuery()">查询</el-button>
    </el-form>
    <div v-for="item of countData" :key="item">
      <div style="float:left">
        <div position:relative>
          <el-progress type="circle" :percentage="item.score" :color="item.score|dateFormat003"></el-progress>
        </div>
        <div position:absolute>
          <el-tag type="success">{{item.eventName}}</el-tag>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
Vue.filter("dateFormat003", function(score) {
  switch (true) {
    case score < 30:
      return "#B22222";
    case score < 60:
      return "#F56C6C";
    case score < 80:
      return "#409EFF";
    case score < 100:
      return "#67C23A";
    default:
      return "#000000";
  }
});
import VueRouter from "vue-router";
import { countToday } from "@/api/liftscore/liftscore.js";
export default {
  data() {
    return {
      dateParam:'',
      countData: []
    };
  },
  mounted() {
    this.countQuery();
  },
  methods: {
    countQuery() {
      var data = {
        creatDate:this.dateParam
      };
      countToday(data).then(response => {
        if (response.status == "success") {
          this.countData = response.list;
        } else if (response.status == "error") {
          this.$message.error(response.msg);
        } else {
        }
      });
    }
  }
};
</script>
    
<style>
</style>
    