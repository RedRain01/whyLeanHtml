<template>
  <div class="pageBody">
    <div class="positionBar">
      <span class="fontFamily sdh-icon-dingwei"></span>&nbsp;&nbsp;当前位置 >用户
    </div>
    <div class="titleSlot">搜索</div>
    <div class="searchBar">
      <el-form :inline="true" :model="serchName" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input placeholder="用户名" v-model="userCode " clearable size="medium"></el-input>
        </el-form-item>
        <el-button type="primary" size="small" class="typeSelector" @click="firstQuery()">查询</el-button>
        <el-button type="primary" size="small" class="typeSelector" @click="showAdd()">新增</el-button>
      </el-form>
    </div>
    <div class="dataBar">
      <el-table
        lazy
        ref="table1"
        :data="tableData2"
        border
        size="small"
        v-loading="loading1"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column prop="username" label="用户名" min-width="100"></el-table-column>
        <el-table-column prop="createBy" label="创建人" min-width="100"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="120">
          <template
            slot-scope="scope"
          >{{ scope.row.createTime | formatDate("YYYY-MM-DD HH:mm:ss") }}</template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :title="optionType=='update'?'编辑事件':'新增用户'"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :modal="false"
      width="35%"
    >
      <div style="padding-top:20px">
        <el-form :model="form" ref="form" :rules="rules" label-width="120px">
          <el-form-item label="用户名" prop="eventName" v-show="true">
            <el-input v-model="form.userName" type="text" clearable size="medium"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password" v-show="true">
            <el-input v-model="form.password" type="text" clearable size="medium"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align:right" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserFun()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { querySysUser, addSysUser } from "@/api/liftscore/user.js";
import moment from "moment";
export default {
  name: "staffInfo",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        userName: "",
        password: ""
      },
      countData: [],
      tableData2: [],
      userCode: ""
    };
  },
  mounted() {
      this.firstQuery()
  },
  methods: {
    cancelFun() {
      this.dialogFormVisible = false;
      this.optionType = "";
    },
    firstQuery() {
      var data = {
        username: this.userCode
      };
      querySysUser(data).then(response => {
        if (response.status == "success") {
          this.tableData2 = response.list;
        } else if (response.status == "error") {
          this.$message.error(response.msg);
        }
      });
    },
    showAdd() {
      this.dialogFormVisible = true;
      this.form.userName = "";
      this.form.password = "";
      var data = {};
    },
    addUserFun(data) {
      var data = {
        username: this.form.userName,
        password: this.form.password
      };
      addSysUser(data).then(response => {
        if (response.status == "success") {
          this.dialogFormVisible = false;
          this.$message.success("新增成功");
          this.firstQuery();
        } else if (response.status == "error") {
          this.$message.error(response.msg);
        }
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
