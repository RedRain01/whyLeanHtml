<template>
  <div class="pageBody">
    <div class="positionBar">
      <span class="fontFamily sdh-icon-dingwei"></span>&nbsp;&nbsp;当前位置 >flink处理后
    </div>
    <div class="titleSlot">搜索</div>
    <div class="searchBar">
      <el-form :inline="true" :model="serchName" class="demo-form-inline">
        <el-form-item label="选择商品">
          <el-select v-model="sp" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="购买人">
          <el-select v-model="userCode" placeholder="请选择">
            <el-option
              v-for="item in optionsMen"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分111111111区">
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
          <el-button
            type="primary"
            size="small"
            class="typeSelector"
            @click="cleanRedisFun()"
          >清空redis</el-button>
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
  </div>
</template>

<script>

import { addOrderDetil, findRedis, cleanRedis } from "@/api/role/role.js";
import moment from "moment";
export default {
  name: "staffInfo",
  data() {
    return {
      sp: "",
      userCode: "",
      partitionNum: "",
      jg: "",
      num: "",
      addMsg: "",
      options: [
        {
          value: "c1",
          label: "诺基亚"
        },
        {
          value: "c2",
          label: "iphone"
        },
        {
          value: "c3",
          label: "华为"
        },
        {
          value: "c4",
          label: "小米"
        },
        {
          value: "c5",
          label: "oppo"
        },
        {
          value: "c6",
          label: "一加"
        },
        {
          value: "c7",
          label: "三星"
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
        },
        {
          value: "z2",
          label: "张子铭"
        },
        {
          value: "z3",
          label: "张子忠"
        },
        {
          value: "z4",
          label: "张子德"
        },
        {
          value: "z5",
          label: "张子高"
        },
        {
          value: "z6",
          label: "章蒋"
        },
        {
          value: "z7",
          label: "欧阳"
        }
      ],
      optionsParti: [
        {
          value: "0",
          label: "分区0"
        },
        {
          value: "1",
          label: "分区1"
        },
        {
          value: "2",
          label: "分区2"
        },
        {
          value: "3",
          label: "分区3"
        },
        {
          value: "4",
          label: "分区4"
        },
        {
          value: "5",
          label: "分区5"
        },
        {
          value: "",
          label: "均匀分区"
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
    firstQuery() {
      //       let route001 = [
      //   {
      //     path: "/ttt",
      //     name: "ttt",
      //     component: resolve => require(["@/components/liftscore/ttt.vue"], resolve)
      //   }
      // ];  
    //  var dddd=this.$router.options.routes;
      let routes22 = 
        {
          path: "/liftscore",
          name: "liftscore",
          component: resolve =>
            require(["@/components/liftscore/liftscore.vue"], resolve)
        }

            localStorage.setItem("aaa", this.$store.state.dynamicRouters );  
  //            var eeee=this.$store.state.dynamicRouters;
  //  console.log()
  //   this.$store.commit('updateRouter',routes22);

  //   var ttttt=this.$store.state.dynamicRouters;
  //         debugger

      // this.$store.state.dynamicRouters.push(routes22);
      // var dddss=this.$store.state.dynamicRouters;
      // debugger
      // console.log();
     // this.$router.push({ name: "liftscore" });
      // var data = {
      //   cargoNum: this.sp,
      //   price: this.jg,
      //   quantity: this.num,
      //   userCode: this.userCode,
      //   partitionNum: this.partitionNum
      // };
      // this.queryWorkerList(data);
    },
    cleanRedisFun() {
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
