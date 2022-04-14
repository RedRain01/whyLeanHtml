<template>

  <div class="pageBody">
    
    <div class="positionBar">
      <span class="fontFamily sdh-icon-dingwei"></span>&nbsp;&nbsp;当前位置 >求职
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="个人简介">
         <Resume></Resume>
      </el-tab-pane>
      <el-tab-pane label="工作经历">
          <Experience></Experience>
      
      </el-tab-pane>
      <el-tab-pane label="知识分享">
      <Knowledge></Knowledge>
      </el-tab-pane>
        <el-tab-pane label="价值观">
        <Sense></Sense>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>


import Experience from '@/components/job/experience.vue'
import Knowledge from '@/components/job/knowledge.vue'
import Resume  from '@/components/job/resume.vue'
import Sense from '@/components/job/sense.vue'
export default {
   components : {
    Experience,
    Knowledge,
    Resume,
    Sense
  },
  data() {
    return {
      
    };
  },
  mounted() {

  },
  methods: {
    
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
  margin: 0 5px;
  background-color: #fff;
  padding: 2px 4px;
}

.typeSelector {
  margin-left: 35px;
}

.dataBar {
  margin: 0px 5px 0 5px;
  background-color: #fff;
  padding: 5px 4px;
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
