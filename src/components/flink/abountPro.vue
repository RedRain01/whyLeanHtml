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
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="开发流程">
          <el-input type="textarea" v-model="form.note2" rows="25"></el-input>
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
          "\n\n1:在页面选择商品与订单数量，后端接到请求后会使用线程池往mysql新增数据，为保证订单id单调递增，使用redis的incr命令。\n\n" +
          "2：业务设计场景是分布式的服务器上，所以订单表中记录服务的端口号\n\n" +
          "3：记录数据新增情况到redis，端口号，成功笔数，失败笔数\n\n" +
          "4：查询redis中数据新增情况\n\n" +
          "5：启动mysql的binlog日志\n\n" +
          "6：使用flume-ng-sql同步mysql中的数据到kafk\n\n" +
          "7：flink监听kafka里的数据，用窗口函数汇总到额度，并sink到kafka\n\n" +
          "8：基础数据落库到hdfs\n\n" +
          "9：在前端工程动态统计图展示redis中的数据变化。",
        note2:
          "\n\n1:安装mysql，zookeeper集群，kafka，hadoop集群，hive，flume，redis,flink\n\n" +
          "2:在hadoop集群验证启动flink任务\n\n" +
          "3：调试flume与mysql数据同步\n\n" +
          "4：整合hive与mysql元数据信息\n\n" +
          "5：搭建后端springcloud工程组，搭建前端vue工程\n\n" +
          "6：本地机器与公网服务器做内网穿透，使得外网可以访问本地服务\n\n",
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
