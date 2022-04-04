<template>
  <div class="pageBody">
    <div width="1400px">
      <ve-line width="1400px" height="400px" :data="chartData"></ve-line>
      <ve-pie width="1200px" height="400px" :data="portData"></ve-pie>
    </div>

    <el-form :inline="true" :model="serchName" class="demo-form-inline">
      <el-form-item>
        <el-form-item label="折线统计间隔天数">
          <el-select size="mini" v-model="evenOrderTypeSerc" placeholder="请选择">
            <el-option
              v-for="item in  eventTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form-item>

      <el-form-item label="饼图日期选择">
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="dateParam"
          type="datetime"
          placeholder="选择日期时间"
        ></el-date-picker>
      </el-form-item>
      <el-button type="primary" size="small" class="typeSelector" @click="test()">刷新</el-button>
    </el-form>
  </div>
</template>

<script>
import { countTop } from "@/api/payment/payment.js";
import moment from "moment";
import { returnStatistical } from "@/api/liftscore/liftscore.js";
export default {
  name: "staffInfo",
  data() {
    this.chartSettings = {};
    return {
      evenOrderTypeSerc: "",
      evenOrderTypeSerc: 1,
      dateParam: '',
      eventTypeOptions: [
        {
          value: "1",
          label: "1"
        },
        {
          value: "3",
          label: "3"
        },
        {
          value: "7",
          label: "7"
        },
        {
          value: "30",
          label: "30"
        }
      ],
      i: 1,
      chartData: {
        columns: ["时间", "分数"],
        rows: [
          { 时间: "20200101", 分数: 100 },
          { 时间: "20200102", 分数: 90 },
          { 时间: "20200103", 分数: 80 },
          { 时间: "20200104", 分数: 70 },
          { 时间: "20200105", 分数: 60 },
          { 时间: "20200106", 分数: 50 },
          { 时间: "20200107", 分数: 40 },
          { 时间: "20200108", 分数: 30 },
          { 时间: "20200109", 分数: 20 }
        ]
      },
      portData: {
        columns: ["任务名称", "任务时间"],
        rows: [
          { 任务名称: "8488", 任务时间: 200 },
          { 任务名称: "8487", 任务时间: 100 }
        ]
      }
    };
  },
  mounted() {
    //  this.timer = setInterval(this.firstQuery, 7000);
  },
  methods: {
    test() {
      var data = {
        dayNum: this.evenOrderTypeSerc + "",
        creatDate: this.dateParam
      };
      returnStatistical(data).then(response => {
        this.chartData.rows = JSON.parse(response.msg).line;
        this.portData.rows = JSON.parse(response.msg).pie;
      });
    },

    firstQuery() {
      var myDate = new Date();
      var data = {};
      countTop(data)
        .then(response => {
          this.chartData.rows = response.order;
          this.portData.rows = response.port;
        })
        .catch(error => {
          this.loading = false;
        });
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
