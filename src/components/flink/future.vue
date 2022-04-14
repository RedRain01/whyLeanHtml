<template>
  <div class="pageBody">
    <div class="positionBar">
      <span class="fontFamily sdh-icon-dingwei"></span>&nbsp;&nbsp;当前位置 > 业务场景
    </div>
    <div class="searchBar">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="业务场景">
          <el-input type="textarea" v-model="form.note1" rows="19"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        note1:"\n\n1：我认为流数据处理肯定会被更多公司使用，不管是物联网，还是电商，医疗，ai。更多场景都会需要更厉害的流处理方案\n\n" +

"2:希望有时间可以做一个flink与ClickHouse，和数据湖iceberg，hudi结合的数据平台\n\n" +

"3:新公司是做风控的，希望有机会把风控平台和flink，评分卡结合做一个灵活的风控系统和评分卡平台\n\n" +

"4：未来想学习深度学习，希望能有有趣的产出\n\n"
       }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
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
