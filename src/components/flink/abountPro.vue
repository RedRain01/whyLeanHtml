<template>
  <div class="pageBody">
    <div class="positionBar">
      <span class="fontFamily sdh-icon-dingwei"></span>&nbsp;&nbsp;当前位置 > 功能流程
    </div>
    <div class="searchBar">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="数据产生">
          <el-input type="textarea" v-model="form.note1" rows="5"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="数据处理">
          <el-input type="textarea" v-model="form.note2" rows="8"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="数据展示">
          <el-input type="textarea" v-model="form.note3" rows="8"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="环境搭建">
          <el-input type="textarea" v-model="form.note4" rows="8"></el-input>
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
          "为了结果可控可见,产生数据控制在web页面，前端使用vue框架，后端使用springCloud，使用了SpringGateWay作为网关，采用轮询的负载均衡配置，可在服务器启动端口不同的相同服务，新增订单时为模拟快速新增环境使用了线程池发挥服务器性能，数据库采用mysql",
        note2:
          "数据传输：数据从应用落地到mysql，使用flume和flume-ng-sql插件同步数据到kafka指定分区，最后由flink读取kafka数据，处理数据后往下游hive或redis进行推送。\n数据处理：在flume中使用自定义拦截器进行分区指定，使得指定的数据进入kafka对应分区。\n在flink中，sink到hive的数据进入ods层的数据进行分桶写入hdfs文件系统，sink到dw层的与维表数据关联后sink到dw宽表中。\nsink到redis的数据进行window操作，使用触发器trigger不断输出aggregate算子聚合的数据，并把数据推送到redis，达到实时汇总的功能，初步实现一个大屏展示。\n事后总结：本次练习工程模拟的是处理商户订单，数据处理完后落地到redis和hive的ods和dw层。并在前端展示汇总情况。在开发的过程中发现，flume并不适合在订单这种业务下使用，因为flume-ng-sql采用分页查询的方式获取数据，如果中途数据有改动，将导致分页的数据错乱，造成丢数据，重复数据。这种业务模式下建议采用Canal获取mysql日志更为合适。",
        note3:
          "新增数据解释：目前sink到hive的数据暂时无法展示，sink到redis的数据我使用了前端插件v-charts进行了动态展现，可以一边新增数据，一边查看实时汇总结果。在数据产生页面，选择选择商品和选择分区的“均匀”选项，意味着，你产生的数据包括选项里的所有可选项，且概率是相同的，其中分区决定的是kafka的分区\n图形解释：\n饼状图可以查看数据在各个端口的分布情况，目前程序的负载均衡是轮询模式，所以每次新增的数据应该是均匀的\n条形图为每款手机五分钟内的销量情况，只统计五分钟内的数据，超过五分钟就会清零，会实时的推送五分钟内的手机新增情况\n",
        note4:
          "数据产生：搭建springcloud工程组，安装mysql\n数据传输：安装flume，安装flume-ng-sql，安装zookeeper集群，安装kafka集群，安装flink on yarn集群\n数据保存：安装redis，安装hadoop集群，安装hive\n数据展示：搭建vue工程，使用v-charts插件展示实时动态数据\n"
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
