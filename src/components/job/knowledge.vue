<template>
  <div class="pageBody">
    <div class="positionBar">
      <span class="fontFamily sdh-icon-dingwei"></span>&nbsp;&nbsp;当前位置 > 知识分享
    </div>
    <div class="searchBar">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="知识分享">
          <el-input type="textarea" v-model="form.note1" rows="54"></el-input>
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
          "\n\n我虽然有记笔记的习惯，但整理归纳的笔记不多，仅分享以下希望得到大佬指教 \n\n" +
         "1：因为虚拟机非正常关闭引起的异常解决：https://blog.csdn.net/qq_35022803/article/details/109287086?spm=1001.2014.3001.5501\n\n" +
         "2：MYSQL初步认识：https://blog.csdn.net/qq_35022803/article/details/124171555\n\n" +
          "3：Eureka初步了解 ：https://blog.csdn.net/qq_35022803/article/details/124171555?spm=1001.2014.3001.5502\n\n" +
          "4：初步了解jvm：https://blog.csdn.net/qq_35022803/article/details/124171631\n\n" +
          "5：线程池了解：https://blog.csdn.net/qq_35022803/article/details/124171987\n\n" +
          "6：java锁初步认识：https://blog.csdn.net/qq_35022803/article/details/124172072\n\n" 
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
