<template>
  <div class="pageBody">
    <div class="positionBar">
      <span class="fontFamily sdh-icon-dingwei"></span>&nbsp;&nbsp;当前位置 >flink处理后
    </div>
    <div class="titleSlot">搜索</div>
    <div class="searchBar">
      <el-form :inline="true" :model="serchName" class="demo-form-inline">
        <el-form-item label="选择商1114444444品">
          <el-select v-model="sp" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="购买人123">
          <el-select v-model="userCode" placeholder="请选择">
            <el-option
              v-for="item in optionsMen"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="分区">
          <el-select v-model="partitionNum" placeholder="请选择">
            <el-option
              v-for="item in optionsParti"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格">
          <el-input placeholder="价格" v-model.trim="jg" clearable size="medium"></el-input>
        </el-form-item>
        <el-form-item label="购买数量">
          <el-input placeholder="购买数量" v-model.trim="num" clearable size="medium"></el-input>
        </el-form-item>
        <template></template>
        <el-form-item>
          <el-button type="primary" size="small" class="typeSelector" @click="firstQuery()">生成</el-button>
          <el-button type="primary" size="small" class="typeSelector" @click="nextQuery()">查询消费</el-button>
          <el-button type="primary" size="small" class="typeSelector" @click="cleanRedisFun()">清空redis</el-button>
          <el-button type="primary" size="small" class="typeSelector" @click="addFunLoad()">新增</el-button>

        </el-form-item>
      </el-form>
    </div>
    <div class="dataBar">
      <el-input
        type="textarea"
        :autosize="{ minRows: 8, maxRows: 4}"
        placeholder="请输入内容"
        v-model="addMsg"
      ></el-input>
    </div>
        <el-dialog :title="optionType=='update'?'编辑职工信息':'新增职工信息'" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :modal="false" width="35%">
        <div style="padding-top:20px">
            <el-form :model="form" ref="form" :rules="rules" label-width="120px">
                <el-form-item label="事件id" prop="sn" v-show="true">
                    <el-input v-model="form.eventId" type="text" readonly clearable size="medium"></el-input>
                </el-form-item>
                <el-form-item label="事件名称" prop="name">
                    <el-input v-model="form.eventName" type="text" clearable size="medium" maxlength='10'></el-input>
                </el-form-item>
                <el-form-item label="事件类型" :label-width="formLabelWidth" prop="workerType">
                    <el-select v-model="form.eventType" clearable size="medium">
                        <el-option v-for="(item,key) in eventTypeOptions" :key="key" clearable :label="item" :value="key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="事件归属" :label-width="formLabelWidth" prop="state">
                    <el-select v-model="form.eventSort" clearable size="medium">
                        <el-option v-for="(value,key) in eventSortOptions" :key="key" clearable :label="value" :value="key">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div style="text-align:right" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateWorkerF()">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import { addEvent} from "@/api/liftscore/liftscore.js";
import moment from "moment";
export default {
  name: "staffInfo",
  data() {
    return {
      sp: "",
       dialogFormVisible: false,
        form: {
                eventId: '',
                eventName: '',
                eventType: '',
                eventSort: ''
            },
              eventSortOptions: { /* 状态 */
                '00': '学习',
                '01': '健康'
            },
             eventTypeOptions: { 
                '00': '时间类型',
                '01': '次数类型' },
      userCode: "",
      partitionNum:"",
      jg: "",
      num: "",
      addMsg: "",
      options: [
        {
          value: "c1",
          label: "诺基亚"
        },
        {
          value: "",
          label: "均匀"
        }
      ],
      optionsMen: [
        {
          value: "z1",
          label: "张子玲"
        }
      ],
      optionsParti: [
        {
          value: "0",
          label: "分区0"
          }
      ]
    };
  },
  mounted() {},
  methods: {
    cancelFun() {
      this.dialogFormVisible = false;
      this.optionType = "";
    },
     addFunLoad() {
            this.resetForm();
            this.dialogFormVisible = true;
            this.optionType = "add";
        }, 
         resetForm() {
            if (this.$refs["form"] !== undefined) {
                this.$refs["form"].resetFields();
            }
            this.form.eventId = '00';
            this.form.eventName='';
            this.form.eventType='';
            this.form.eventSort='';
        },
                updateWorkerF() {
            if (this.form.eventId == null || this.form.eventId == "") {
                this.$message.error("请填写姓名");
                return;
            } else if (this.form.eventName == null || this.form.eventName == "") {
                this.$message.error("手机号不能为空");
                return;
            } else if (this.form.eventType == null || this.form.eventType == "") {
                this.$message.error("请选择正确的状态");
                return;
            } else if (this.form.eventSort == null || this.form.eventSort == "") {
                this.$message.error("请选择职工类型");
                return;
            }
            if (this.optionType=="add") {
                var data = {
                    eventId: this.form.eventId,
                    eventName: this.form.eventName,
                    type: this.form.eventType,
                    sort:this.form.eventSort
                }
                addEvent(data).then(response => {
                    if (response.status == 'success') {
                        this.dialogFormVisible = false;
                        this.$message.success('新增成功');
                        this.firstQuery();
                    } else if (response.status == 'error') {
                        this.$message.error(response.msg);
                    } else {

                    }
                })
            } else if (this.optionType=="update"){
               var data = {
                    eventId: this.form.eventId,
                    eventName: this.form.eventName,
                    eventType: this.form.eventType,
                    eventSort:this.form.eventSort
                }
                addEvent(data).then(response => {
                    if (response.status == 'success') {
                        this.dialogFormVisible = false;
                        this.$message.success('修改成功');
                        this.firstQuery();
                    } else if (response.status == 'error') {
                        this.$message.error(response.msg);
                    } else {

                    }
                })
            }

        },
    firstQuery() {
      var data = {
        cargoNum: this.sp,
        price: this.jg,
        quantity: this.num,
        userCode: this.userCode,
        partitionNum: this.partitionNum

      };
      this.queryWorkerList(data);
    },
    cleanRedisFun(){
  var data = {};
      cleanRedis(data)
        .then(response => {
          this.addMsg = response;
        })
        .catch(error => {
          this.addMsg = "查询异常";
        });
    },
    nextQuery() {
      var data = {};
      findRedis(data)
        .then(response => {
          this.addMsg = response;
        })
        .catch(error => {
          this.addMsg = "查询异常";
        });
    },
    queryWorkerList(data) {
      this.loading = true;
      addOrderDetil(data)
        .then(response => {
          this.addMsg = response;
          this.loading = false;
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
