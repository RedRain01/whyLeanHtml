<template>
  <div class="pageBody">
    <div class="positionBar">
      <span class="fontFamily sdh-icon-dingwei"></span>&nbsp;&nbsp;当前位置 > 功能流程
    </div>
    <div class="searchBar">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="技术总结">
          <el-input type="textarea" v-model="form.note1" rows="25"></el-input>
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
        note1:
          "这次工程的开始是为了学习flink，但是过程中学习了不少与flink相关的上下游知识，但是都是浅尝则止，不然此次学习工程就会推迟很久完成，希望以后能在工作中遇到的时候深入学习，再把学到的新知识记录下来。技术是用来解决问题的，在使用场景下打磨技术才是最好的。学习技术的过程中应该越来越指向简单，从黑盒变成白盒，所有执行都应该清楚。这只是一个flink的基础学习，以后会更新更复杂的场景。也希望能在学习过程中与大佬与其同行，在学技术的路上真的觉得还是有老司机带路好，不仅开车快而且还很稳。",
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
