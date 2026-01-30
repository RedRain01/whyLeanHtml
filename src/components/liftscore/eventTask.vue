<template>
  <div class="pageBody">
    <div class="searchBar">
      <el-form :inline="true" :model="serchName" class="demo-form-inline">
        <el-form-item label="类型">
          <el-select size="mini" v-model="evenOrderTypeSerc" placeholder="请选择">
            <el-option v-for="item in  eventTypeOptions" :key="item.value" :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select size="mini" v-model="eventOrderStaSerc" placeholder="请选择">
            <el-option v-for="item in optionsState" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="时期">
          <el-select v-model="eventOrderDate" filterable allow-create default-first-option placeholder="日期">
            <el-option v-for="item in eventOrderDateOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="mini" class="typeSelector" @click="firstQuery()">查询</el-button>
          <el-button type="primary" size="mini" class="typeSelector" @click="createEventOrder()">开始</el-button>


          <el-popover
  placement="top"
  width="160"
  v-model="visible">
  <p>这是一段内容这是一段内容确定删除吗？</p>
  <div style="text-align: right; margin: 0">
    <el-button size="mini" type="text" @click="visible = false">取消</el-button>
    <el-button type="primary" size="mini"   @click="deleteEventOrder()" >确定</el-button>
  </div>
  <el-button  type="primary" size="mini" class="typeSelector" slot="reference">删除</el-button>
</el-popover>


       <!-- <el-button type="primary" size="mini" class="typeSelector" @click="deleteEventOrder()">删除</el-button> -->
        </el-form-item>
      </el-form>
    </div>

    <div class="dataBar">
      <el-table lazy ref="table1" :data="tableDataEventOrder" size="small" v-loading="loading1" highlight-current-row
        style="width: 100%" @row-dblclick="dbclickFun" max-height="1000">
        <el-table-column label="" min-width="100">
          <template slot-scope="scope">

            <p>{{ scope.row.eventName }}</p>

            <el-progress v-if="(scope.row.num * 100 / scope.row.fullNum) > 100" :color=scope.row | dateFormat :text-inside="false" :show-text="true" :stroke-width="18"  :percentage=(scope.row.num*100/scope.row.fullNum).toFixed(2)> </el-progress>
            <el-progress v-if="(scope.row.num * 100 / scope.row.fullNum) <= 100" :color=scope.row | dateFormat  :text-inside="true" :show-text="true" :stroke-width="18"  :percentage=(scope.row.num*100/scope.row.fullNum).toFixed(2)> </el-progress>


            <!-- 新增事件树弹框start -->
            <!--
               
                <el-progress v-if="scope.row.eventType!='01' && (scope.row.num*100/scope.row.fullNum)>100" :color=scope.row|dateFormat :text-inside="false"  :show-text="true" :stroke-width="18" :percentage=(scope.row.num*100/scope.row.fullNum).toFixed(2)> </el-progress>
              <el-progress v-if="scope.row.eventType!='01' && (scope.row.num*100/scope.row.fullNum) <=100" :color=scope.row|dateFormat :text-inside="true"  :show-text="true" :stroke-width="18" :percentage=(scope.row.num*100/scope.row.fullNum).toFixed(2)> </el-progress>
              <el-progress v-if="scope.row.eventType=='01'  && (scope.row.num*100/scope.row.fullNum)>100" :color=scope.row|dateFormat001  :text-inside="true"  :show-text="true" :stroke-width="18" :percentage=100>  </el-progress>
              <el-progress v-if="scope.row.eventType=='01' && (scope.row.num*100/scope.row.fullNum) <=100" :color=scope.row|dateFormat001  :text-inside="true"  :show-text="true" :stroke-width="18" :percentage=100>  </el-progress>
              
                -->
          </template>
        </el-table-column>

        <el-table-column label="开始" min-width="100">
          <template slot-scope="scope">
            <el-button v-if="scope.row.state == '0' && scope.row.proportion > 0" type="primary"
              @click="startTask(scope.row)" icon="el-icon-success">开始</el-button>
            <el-button v-if="scope.row.state == '1' && scope.row.proportion > 0" type="primary" @click="endTaskFun(scope.row)"
              icon="el-icon-success">完成</el-button>
            <el-button v-if="scope.row.state == '2' && scope.row.proportion > 0" type="primary" @click="endTaskFun(scope.row)"
              icon="el-icon-success">提交</el-button>
            <el-button v-if="scope.row.proportion == 0" type="primary" @click="endTaskFun(scope.row)"
              icon="el-icon-success">提交</el-button>
            <el-button v-if="scope.row.state == '3' && scope.row.proportion > 0" type="primary" @click="startTask(scope.row)"
              icon="el-icon-success">再次</el-button>
          </template>
        </el-table-column>

        <el-table-column label="质量" min-width="80">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.quality" v-if="scope.row.proportion != 0" show-text></el-rate>
            <el-input v-model="scope.row.eventName" v-if="scope.row.proportion == 0" placeholder="事件名" type="text" clearable
              size="medium" maxlength="10"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="满分" min-width="80">
          <template slot-scope="scope">
            <el-tag type="success"> {{ scope.row.fullNum }}</el-tag>
          </template>
        </el-table-column>


        <el-table-column label="满分" min-width="80">
          <template slot-scope="scope">
            <el-tag type="success"> {{ scope.row.creatDate }}</el-tag>
          </template>
        </el-table-column>


        <el-table-column label="数量" min-width="120">
          <template slot-scope="scope">

            <el-time-picker  is-range  v-show="scope.row.eventType == 0"
      v-model="scope.row.datestr"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      placeholder="选择时间范围"
      format="HH:mm"
      value-format="HH:mm"
      :picker-options="{ format: 'HH:mm' }"  />


            <el-input v-model="scope.row.inputNum" v-show="scope.row.eventType == 1" style="width: 200px;"
              placeholder="数量"></el-input>
          </template>
        </el-table-column>


        <el-table-column label="分数" min-width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row | scoreFilter">{{ scope.row.score > 1 ? scope.row.score : '零' }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新增事件树弹框start -->
    <el-dialog title :visible.sync="dialogFormVisible" :close-on-click-modal="false" :modal="false" width="40%">
      <div style="padding-top:20px">
        <el-table lazy ref="table1" :data="tableDataTaskSplit" size="small" v-loading="loading1" highlight-current-row
          style="width: 100%" @row-dblclick="dbclickFun" max-height="1000">
          <el-table-column align="left" label="分数" min-width="100">
            <template slot-scope="scope">
              <el-time-picker size="mini" is-range value-format="yyyy-MM-dd HH:mm:ss" v-model="scope.row.twoTime"
                range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>

              <el-select size="mini" v-model="scope.row.quality" placeholder="请选择">
                <el-option v-for="(item, key) in eventQualityOptions" :key="key" clearable :label="item"
                  :value="key"></el-option>
              </el-select>
            </template>
          </el-table-column>

          <!-- <el-table-column fixed="right" label="质量" width="100">
            <template slot-scope="scope">
              <el-select size="mini" v-model="scope.quality" placeholder="请选择">
                <el-option
                  v-for="(item,key) in eventQualityOptions"
                  :key="key"
                  clearable
                  :label="item"
                  :value=scope.quality
                ></el-option>
              </el-select>
            </template>
          </el-table-column>-->

          <el-table-column align="right">
            <template slot-scope="scope">
              <el-button type="success" size="mini" @click="updateTaskSplitFun(scope.row)">提交</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="text-align:right" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 新增事件树弹框end  -->
  </div>
</template>

<script>
Vue.filter("dateFormat", function (dataStr) {
  var score = (dataStr.num / dataStr.fullNum) * 100;
  switch (true) {
    case score < 1:
      return "";
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
Vue.filter("dateFormat001", function (dataStr) {
  switch (true) {
    case dataStr.state == "0":
      return "#EBEEF5";
    case dataStr.state == "1":
      return "#67C23A";
    case dataStr.state == "2":
      return "#E6A23C";
    default:
      return "#409EFF";
  }
});
Vue.filter("scoreFilter", function (dataStr) {
  switch (true) {
    case dataStr.score < 30:
      return "danger";
    case dataStr.score < 70:
      return "warning";
    case dataStr.score < 100:
      return "success";
    default:
      return "info";
  }
});

Vue.filter("dateFormat002", function (dataStr) {
  return [dataStr.startTime, dataStr.endTime];
});

import {
  queryEventOrder,
  deleteEventOrder,
  distincEventOrderDate,
  startEvenTask,
  endEvenTask,
  startTaskOrder,
  updateTaskSplit
} from "@/api/liftscore/liftscore.js";
import moment from "moment";
export default {
  name: "staffInfo",
  data() {
    return {
       startTime: '',
        endTime: '',
      percentage: 100,
      value1: new Date(2016, 9, 10, 18, 40),
      value2: new Date(2016, 9, 10, 18, 40),
      testDate: new Date(),
      value4: ["2022-03-25 07:41:19", "2022-03-25 07:41:01"],
      value3: null,
      dialogFormVisible: false,
      tableDataEventOrder: [],
      tableDataTaskSplit: [],
      eventOrderStaSerc: "",
      eventOrderDate: [],
      evenOrderTypeSerc: "",
      eventQualityOptions: {
        "5": "完美",
        "4": "优秀",
        "3": "良好",
        "2": "合格",
        "1": "差劲"
      },
      eventOrderDateOptions: [],
      options: [
        {
          value: "",
          label: ""
        },
        {
          value: "00",
          label: "时间"
        },
        {
          value: "11",
          label: "长度"
        },
        {
          value: "01",
          label: "单次"
        }
      ],
      eventTypeOptions: [
        {
          value: "",
          label: ""
        },
        {
          value: "00",
          label: "时间类型"
        },
        {
          value: "01",
          label: "单次事件"
        },
        {
          value: "11",
          label: "长度类型"
        }],
      optionsState: [
        {
          value: "",
          label: ""
        },
        {
          value: "00",
          label: "初始"
        },
        {
          value: "01",
          label: "单进行"
        },
        {
          value: "21",
          label: "长进行"
        },
        {
          value: "22",
          label: "待续"
        },
        {
          value: "11",
          label: "完成"
        }
      ],
      visible: false,
      form: {
        eventId: "",
        eventName: "",
        eventType: "",
        proportion: "",
        remark: "",
        startTime: "",
        endTime: "",
        parent: "",
        level: "",
        eventSort: "",
        fullNum: "",
        price: ""
      }
    };
  },
  mounted() {
    this.firstQuery()
    this.distinctQuery()
  },
  methods: {
    formatText(percentage) {
      return `${percentage}%`;
    },
    updateTaskSplitFun(data) {
      var data = {
        startTime: data.startTime + "",
        endTime: data.endTime + "",
        twoTime: data.twoTime + "",
        quality: data.quality,
        splitId: data.splitId,
        taskId: data.taskId
      };
      updateTaskSplit(data).then(response => {
        if (response.status == "success") {
          this.$message.success("成功");
          this.dialogFormVisible = false;
          this.firstQuery();
        } else if (response.status == "error") {
          this.$message.error(response.msg);
        }
      });
    },
    dbclickFun(data) {
      var taskId = data.id;
      this.dialogFormVisible = true;
      var taskTimeSplitTab = [];
      var timeSplit = data.timeSplite.split("/");
      if (timeSplit.length < 1) {
        this.tableDataTaskSplit = [];
      } else {
        for (let index = 0; index < timeSplit.length; index++) {
          var oneTaskTimeSplit = timeSplit[index].split("_");
          for (let j = 0; j < oneTaskTimeSplit.length; j++) {
            var obj = {
              startTime: oneTaskTimeSplit[0],
              endTime: oneTaskTimeSplit[1],
              twoTime: [oneTaskTimeSplit[0], oneTaskTimeSplit[1]],
              quality: oneTaskTimeSplit[2],
              splitId: oneTaskTimeSplit[3],
              taskId: taskId
            };
          }
          taskTimeSplitTab.push(obj);
        }
        this.tableDataTaskSplit = taskTimeSplitTab;
      }
      // 调用 oneSideTime1B|E 如上图后端返回结果
    },
    resetForm() {
      if (this.$refs["form"] !== undefined) {
        this.$refs["form"].resetFields();
      }
      this.form.eventId = "00";
      this.form.eventName = "";
      this.form.eventType = "";
      this.form.eventSort = "";
    },
    startTask(data) {
      // debugger
      // var data = {
      //   id: data.id,
      //   eventId: data.eventId 
      // };
      startEvenTask(data).then(response => {
        if (response.status == "success") {
          this.$message.success("成功");
          this.firstQuery();
        } else if (response.status == "error") {
          this.$message.error(response.msg);
        }
      });
    },
    endTaskFun(data) {
      debugger;
      console.log(data);
      console.log(data.inputNum);
      if (
        typeof data.quality === "undefined" ||
        data.quality == null ||
        data.quality === ""
      ) {
        this.$message.error("选择质量");
        return;
      } else {
        var data = {
          id: data.id,
          eventId: data.eventId,
          eventOrderId: data.eventOrderId,
          num: data.inputNum,
          startTime: data.startTime,
          endTime: data.endTime,
          fullNum: data.fullNum,
          eventName: data.eventName,
          quality: data.quality,
          userCode:data.userCode,
          creatDate: data.creatDate,
          start:data.datestr[0]+':00',
          end:data.datestr[1]+':00'
        };
        endEvenTask(data).then(response => {
          debugger;
          if (response.status == "success") {
            this.$message.success("修改成功");
            this.firstQuery();
          } else if (response.status == "error") {
            this.$message.error(response.msg);
          }
        });
      }
    },
    //
    createEventOrder() {
      var data = {
      };
      startTaskOrder(data).then(response => {
        if (response.status == "success") {
          this.$message.success("修改成功");
          this.firstQuery();
        } else if (response.status == "error") {
          this.$message.error(response.msg);
        }
      });
    },
    deleteEventOrder() {
      this.visible=false
      var data = {
        state: this.eventOrderStaSerc,
        createDate: this.eventOrderDate,
        eventType: this.evenOrderTypeSerc
      };
      deleteEventOrder(data)
        .then(response => {
          debugger
          if (response.status == "success") {
            this.tableDataEventOrder = response.data;
            this.loading = false;
          } else if (response.status == "error") {
            this.$message.error(response.msg);
          }
        })
        .catch(error => {
          this.addMsg = "查询异常";
        });
        this.firstQuery()
    },
    firstQuery() {
      this.distinctQuery()
      debugger
      var data = {
        state: this.eventOrderStaSerc,
        createDate: this.eventOrderDate,
        eventType: this.evenOrderTypeSerc
      };
      this.loading = true;
      queryEventOrder(data)
        .then(response => {
          debugger
          if (response.status == "success") {
            this.tableDataEventOrder = response.data;
            this.loading = false;
          } else if (response.status == "error") {
            this.$message.error(response.msg);
          }
        })
        .catch(error => {
          this.addMsg = "查询异常";
        });
    },
    distinctQuery() {
      debugger
      var data = {
      };
      distincEventOrderDate(data)
        .then(response => {
          debugger
          if (response.status == "success") {
            this.eventOrderDateOptions = response.data;
            this.loading = false;
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
