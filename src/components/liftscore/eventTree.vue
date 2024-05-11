<template>
  <div class="pageBody">
    <el-button type="primary" size="mini" class="typeSelector" @click="queryTree()">查询</el-button>

    <div class="custom-tree-container">
      <div class="block">
        <el-tree
          :data="eventDate"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :node-contextmenu="clickTree()"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label}}</span>
            <span>
              <el-button
                type="text"
                size="mini"
                v-if="data.identity!='11'"
                @click="() => append(data)"
              >append</el-button>
              <el-button type="text" size="mini" @click="() => show(data)">show</el-button>
              <el-button
                type="text"
                size="mini"
                v-if="data.identity!='00'"
                @click="() => remove(node, data)"
              >Delete</el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>

    <!-- 新增事件树弹框start -->
    <el-dialog
      :title="optionType=='update'?'编辑事件':'新增事件'"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :modal="false"
      width="35%"
    >
      <div style="padding-top:20px">
        <el-form :model="form" ref="form" :rules="rules" label-width="120px">
          <el-form-item label="事件名称" prop="eventName" v-show="true">
            <el-input v-model="form.eventName" type="text" clearable size="medium"></el-input>
          </el-form-item>
          <el-form-item label="分数占比" prop="proportion">
            <div class="block">
              <el-slider
                v-model="form.proportion"
                step="5"
                range:marks="marks"
                show-stops
                show-input
              ></el-slider>
            </div>
          </el-form-item>
          <el-form-item
            label="身份"
            v-show="optionType=='add'"
            :label-width="formLabelWidth"
            prop="workerType"
          >
            <el-select v-model="form.nodeIdentity" clearable size="medium">
              <el-option
                v-for="(item,key) in eventNodeTypeOptions"
                :key="key"
                clearable
                :label="item"
                :value="key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="事件类型"
            :label-width="formLabelWidth"
            prop="workerType"
            v-show="form.nodeIdentity=='11'&&optionType=='add'"
          >
            <el-select v-model="form.eventType" clearable size="medium">
              <el-option
                v-for="(item,key) in eventTypeOptions"
                :key="key"
                clearable
                :label="item"
                :value="key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="预计额度"
            prop="eventName"
            id="fullNumInp"
            v-show="form.nodeIdentity=='11'&&form.eventType!='01'"
          >
            <el-input v-model="form.fullNum" type="text" clearable size="medium"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="name">
            <el-input v-model="form.remark" type="text" clearable size="medium" maxlength="10"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align:right" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEventFun()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增事件树弹框end  -->
  </div>
</template>

<script>
import {
  addEvent,
  queryEventByUserCode,
  queryParentMap,
  queryEventOrder,
  startEvenTask,
  endEvenTask,
  delEventRecurse,
  updateEvent
} from "@/api/liftscore/liftscore.js";
import moment from "moment";
export default {
  data() {
    var data = [];
    return {
      ttt: 50,
      eventDate: data,
      dialogFormVisible: false,
      optionType: "",
      dataTreDele: [],
      form: {
        eventId: "",
        eventName: "",
        eventType: "",
        proportion: "",
        remark: "",
        parent: "",
        level: "",
        eventSort: "",
        fullNum: "",
        price: "",
        nodeIdentity: ""
      },
      levelOptions: {
        /* 状态 */
        "00": "一级",
        "01": "二级 "
      },
      eventTypeOptions: {
        "00": "时间类型",
        "11": "长度类型",
        "01": "单次事件"
      },
      eventNodeTypeOptions: {
        "01": "分类",
        "11": "任务"
      }
    };
  },
  mounted() {
    this.queryTree();
  },
  methods: {
    tttt() {},
    clickTree() {
      console.log("------66666--------------");
    },
    append(data) {
      this.resetForm();
      this.form.eventName ='';
      this.form.proportion = 0;
      this.form.remark = '';
      this.form.fullNum =0;
      this.form.eventType ='';
      this.form.nodeIdentity = '';
      this.form.parent = data.id;
      this.form.level = data.level;
      this.dialogFormVisible = true;
      this.optionType = "add";
    },
    show(data) {
      this.resetForm();
      this.form.eventId = data.eventId;
      this.form.eventName = data.eventName;
      var iii = parseInt(data.proportion);
      this.form.proportion = iii;
      this.form.remark = data.remark;
      this.form.fullNum = data.ullNum;
      this.form.eventType = data.eventType;
      this.form.nodeIdentity = data.identity;
      this.dialogFormVisible = true;
      this.optionType = "update";
    },
    remove(node, data) {
      this.dataTreDele = data;
      this.$confirm("你将删除该节点，以及其下所有的任务?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        data: data
      })
        .then(() => {
          delEventRecurse(this.dataTreDele).then(response => {
            if (response.status == "success") {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.queryTree();
            } else if (response.status == "error") {
              this.$message.error(response.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

      // const parent = node.parent;
      // const children = parent.data.children || parent.data;
      // const index = children.findIndex(d => d.id === data.id);
      // children.splice(index, 1);
    },

    resetForm() {
      if (this.$refs["form"] !== undefined) {
        this.$refs["form"].resetFields();
      }
      this.form.eventId = "";
      this.form.eventName = "";
      this.form.eventType = "";
      this.form.remark = "";
      this.form.parent = "";
      this.form.level = "";
      this.form.eventSort = "";
      this.form.fullNum = "";
      this.form.price = "";
      this.form.nodeIdentity = "";
    },
    //new ing 获取树形
    queryTree() {
      queryEventByUserCode().then(response => {
        if (response.status == "success") {
          this.eventDate = response.data;
        } else if (response.status == "error") {
          this.$message.error(response.msg);
        } else {
        }
      });
    },
    //new ing 新增事件
    addEventFun() {
      console.log("-----55-------"+this.form)
      debugger
      if (this.form.nodeIdentity == "01") {
        //分类
        if (this.form.eventName == null || this.form.eventName == "") {
          this.$message.error("名称不能为空");
          return;
        } else if (this.form.proportion == null || this.form.proportion == "") {
          this.$message.error("占比不能为空");
          return;
        }
      } else if (this.form.nodeIdentity == "11") {
        //任务
        if (this.form.eventName == null || this.form.eventName == "") {
          this.$message.error("名称不能为空");
          return;
        } else if (this.form.proportion == null || this.form.proportion == "") {
          this.$message.error("占比不能为空");
          return;
        } else if (
          this.form.nodeIdentity == null ||
          this.form.nodeIdentity == ""
        ) {
          this.$message.error("身份不能为空");
          return;
        } else if (this.form.eventType == null || this.form.eventType == "") {
          this.$message.error("类型不能为空");
          return;
        }

        if (this.form.eventType == "00" || this.form.eventType == "11") {
          //时间长度类型
          if (this.form.fullNum == null || this.form.fullNum == "") {
            this.$message.error("额度不能为空");
            return;
          }
        }
        //任务
      } else {
        this.$message.error("身份信息错误");
        return;
      }

      if (this.optionType == "add") {
        debugger
        var data = {
          eventName: this.form.eventName,
          eventType: this.form.eventType,
          level: this.form.level + 1,
          proportion: this.form.proportion,
          ullNum: this.form.fullNum,
          remark: this.form.remark,
          parent: this.form.parent,
          identity: this.form.nodeIdentity,
          eventSort: this.form.eventSort
        };
        addEvent(data).then(response => {
          if (response.status == "success") {
            this.dialogFormVisible = false;
            this.$message.success("新增成功");
            this.queryTree();
          } else if (response.status == "error") {
            this.$message.error(response.msg);
          } else {
          }
        });
      } else if (this.optionType == "update") {
        debugger
        var data = {
          eventName: this.form.eventName,
          eventId: this.form.eventId,
          proportion: this.form.proportion,
          ullNum: this.form.fullNum,
          remark: this.form.remark
        };
        updateEvent(data).then(response => {
          if (response.status == "success") {
            this.$message.success("修改成功");
            this.dialogFormVisible = false;
            this.queryTree();
          } else if (response.status == "error") {
            this.$message.error(response.msg);
          }
        });
      }
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
