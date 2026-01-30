<template>
  <div class="pageBody">
    <div style="width: 90%;">
      <ve-line
      ref="lineChart"
      width="1800px" height="400px"
      :data="chartData"
      :extend="lineExtend"
    />


      <ve-pie width="1200px" height="400px" :data="portData"  :extend="pieExtend"></ve-pie>
    </div>

    <el-form :inline="true" :model="serchName" class="demo-form-inline">
      <el-form-item>
        <el-form-item label="折线统计间隔天数111">
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

      <el-form-item label="时期">
          <el-select v-model="eventOrderDate" filterable allow-create default-first-option placeholder="日期">
            <el-option v-for="item in eventOrderDateOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      <el-button type="primary" size="small" class="typeSelector"  @click="test(eventOrderDate)">刷新</el-button>
    </el-form>
  </div>
</template>

<script>
import { countTop } from "@/api/payment/payment.js";
import moment from "moment";
import { returnStatistical } from "@/api/liftscore/liftscore.js";

import {
  queryEventOrder,
  distincEventOrderDate,
  countScore15day,
  statistics24h,
  endEvenTask,
  startTaskOrder,
  updateTaskSplit
} from "@/api/liftscore/liftscore.js";
export default {
  name: "staffInfo",
  data() {
    this.chartSettings = {};
    return {
      evenOrderTypeSerc: "",
      evenOrderTypeSerc: 1,
      eventOrderDate: '',
      eventOrderDateOptions: [],
      dateParam: '',
      pieExtend: {
        series: {
          label: {
            show: true, // ✅ 显示数值
            formatter: '{b}: {c} ({d}%)', // 名称: 数值 (百分比)
            color: '#000'
          }
        }
      },
      lineExtend: {
        series: {
          label: {
            show: true,          // ✅ 显示数值
            position: 'top',     // 数值位置：top / inside / bottom 等
            color: '#000'
          }
        }
      },
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
        columns: ["name", "value"],
        rows: [
          { name: "20200101", value: 100 },
          { name: "20200113", value: 20 }
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
    this.distinctQuery()
  },

  methods: {
    test(date1) {
      var data = {
        date: date1
      };
      statistics24h(data).then(response => {
        this.portData.columns =response.data.columns; 
        this.portData.rows = response.data.rows
      });
      
      countScore15day(data).then(response => {
        this.chartData.columns =response.data.columns; 
        this.chartData.rows = response.data.rows
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
    },
    distinctQuery() {
      debugger
      var data = {
      };
      var datass=[]
      distincEventOrderDate(data)
        .then(response => {
          debugger
          if (response.status == "success") {
            this.eventOrderDateOptions = response.data;
            datass= response.data;
            this.loading = false;
            this.test(datass[0])
          } else if (response.status == "error") {
            this.$message.error(response.msg);
          }
        })
        .catch(error => {
          this.addMsg = "查询异常";
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
