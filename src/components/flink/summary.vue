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
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="开发情况">
          <el-input type="textarea" v-model="form.note2" rows="14"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="环境">
          <el-input type="textarea" v-model="form.note3" rows="15"></el-input>
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
          "\n\n当业务的复杂度和数据量庞大到一定地步，将无法避免数据处理问题，以我曾就职的一家支付公司为例，一日的订单量是几十万，百万。在用户历史数据查询，代理商分润，月报表等业务场景下是无法仅靠原始数据完成的。\n\n 所以需要我们公司的大数据部门协助这些功能开发。我们大数据室的主要任务是数据离线同步，数据实时同步，数据备份，风控，报表，接口提供等工作。其中最重要的就是数据同步。 其实这就是大数据任务，为了应对 \n\n这些业务场景出现了很多优秀的工具，hadoop，hive，Kylin，hbase，ClickHouse ，iceberg，hudi，flink....等。 我们部门已经有一套完整成熟的离线数据处理方案，但实时数据处理系统还没有搭建起来，我们的技术选型是flink。\n\n因为我们认为flink作为流处理引擎是一个比spark更有优势的。 当然也因为我们看到flink的社区更活跃，而且已经有很多公司在使用flnk了，当然flink也有它的缺点，因为它更年轻，他的版本开发更快，它的新版本的新特性经常诱惑\n\n我们使用它们，而公司技术支撑是需要稳定的。所以我们慎重的在部分功能中使用了flink，并且做好完善的测试和恢复处理方案。本项目也是用于flink的学习和探索。我将在本项目使用flink实现公司的一些业务场景与flink的新特性",
        note2:
          "\n\n目前我使用了flink做了算子层面的学习，其中包括Flink的Streaming的Source，map，sink，window等算子学习，也有对flink的table，flinkCdc，flinkToHive的探索，如果你也感兴趣你可以在我的github主页上看\n\n到相关的工程，https://github.com/RedRain01。本项的flink任务目的是，将落地到mysql的数据实时同步到hdfs，并计算相关的销售量同步到统计图中，使用到的技术有，springcloud，springGateway，Redis，Kafka，mysql，flume，flink，vue，hadoop，hdfs等。",
        note3:
          "\n\n虽然我知道使用docker会减少很多在环境搭建上的精力，但鉴于公司也没有使用docker，和后期flink运行需要在yarn上启动，在没有了解docker和hadoop的搭配是否有坑的情况下，我选择单独的搭建这些环境，在我的台\n\n式机（16核32线程，64g内存，2.5Tb固态，10TB机械）搭建了hadoop集群，kafka集群，zookeeper，hive...等环境。",
        note4:
          "\n\n数据产生：搭建springcloud工程组，安装mysql\n数据传输：安装flume，安装flume-ng-sql，安装zookeeper集群，安装kafka集群，安装flink on yarn集群\n数据保存：安装redis，安装hadoop集群，安装hive\n\n数据展示：搭建vue工程，使用v-charts插件展示实时动态数据\n"
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
