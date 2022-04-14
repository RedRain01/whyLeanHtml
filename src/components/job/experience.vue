<template>
  <div class="pageBody">
    <div class="positionBar">
      <span class="fontFamily sdh-icon-dingwei"></span>&nbsp;&nbsp;当前位置 > 工作经历
    </div>
    <div class="searchBar">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="工作经历">
          <el-input type="textarea" v-model="form.note1" rows="42"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="重点工程">
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
          "我的项目经历与使用技术栈：顺序按时间顺序\n" +
          "银盛金融集团：\n" +
          "1：（2017）小额贷款：JAVA，springcloud，angularJs\n" +
          "后台web管理系统的开发，用户权限，ztree树形权限控制，逾期数据拉取。因为小贷政策收紧，项目组后黄了\n\n" +
          "2：（2018）门户改造：JAVA，springCloud，vue，redis\n" +
          "根据老门户功能一比一复制开发新门户，hibernate+jsp改造成springcloud+vue\n\n" +
          "3:（2018）云商服：JAVA，hibernate，jsp\n" +
          "在公司的老平台上新增一个模块来做电脑端审核，包括同步费率\n\n" +
          "4:（2019）tms：JAVA，hibernate，jsp\n" +
          "pos机进销存，巡检\n\n" +
          "5:（2019）数据同步：JAVA,kafka，mogodb\n" +
          "业务端数据从Oracle表同步到kafka，再清洗到mongodb\n\n" +
          "6:（2019）接口开发：JAVA,SpringBoot，mogodb，Hessian，Dubbo\n" +
          "向外提供大数据的mongodb接口给业务部门使用\n\n" +
          "7:（2020）风控系统：数据清洗，web系统优化\n" +
          "风控数据清洗，风控系统维护，接入国家反欺诈报文开发\n\n" +
          "个人项目：\n" +
          "8:（2020）flink项目：Springcloud，SpringGateway，Redis，Kafka，mysql，flume，flink，vue，hadoop，hdfs\n" +
          "实时同步mysql数据到flink，hdfs\n\n" +
          "启元信息科技有限公司\n" +
          "9:（2021）风控系统：JAVA,Camunda（工作流）,es,Mongodb,风控建模\n" +
          "风控建模，评分卡开发，风控数据清洗\n\n" +
          "10:（2021）催收系统：java\n" +
          "脱敏，维护\n\n" +
          "个人项目：\n" +
          "11:（2022）新月系统：Springcloud，SpringGateway，SpringSecurity，Jwt，Redis，vue\n" +
          "用户设定每日计划，根据计划完成情况评分，展示每日评分，当日24小时花销\n\n"+
            "github地址：https://github.com/RedRain01\n" +
            "新月系统地址：http://redrain.top:8211/ 或者 http://redrain.cloud:8211  user：test，password：test\n" +
            "csdn个人主页：https://blog.csdn.net/qq_35022803?type=blog\n"  ,
        note2:
          "\n\n1:安装mysql，zookeeper集群，kafka，hadoop集群，hive，flume，redis,flink\n\n" +
          "2:在hadoop集群验证启动flink任务\n\n" +
          "3：调试flume与mysql数据同步\n\n" +
          "4：整合hive与mysql元数据信息\n\n" +
          "5：搭建后端springcloud工程组，搭建前端vue工程\n\n" +
          "6：本地机器与公网服务器做内网穿透，使得外网可以访问本地服务\n\n"
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
