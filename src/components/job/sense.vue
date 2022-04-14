<template>
  <div class="pageBody">
    <div class="positionBar">
      <span class="fontFamily sdh-icon-dingwei"></span>&nbsp;&nbsp;当前位置 > 流程
    </div>
    <div class="searchBar">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="数据流程">
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
       "\n我常常思考人生的意义，答案我心里也有。我们并不存在于书里故事里，所以我们没有已经设定好的意义，我们是我们故事的书写者，自己写自己的故事，自己演自己的故事，"
       +"可以成精彩有意义的人生，也可以成没有色彩的世界。并不是说要往高出爬才对，但是要做你心里想做的事。才能过得开心一点\n" +

"\n这也是我最后一个个人工程“新月系统”的产生原因，我希望每天给自己打分，看看自己是不是过得让自己满意。也希望可以激励自己每天的质量能更高一点\n" ,
    
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
