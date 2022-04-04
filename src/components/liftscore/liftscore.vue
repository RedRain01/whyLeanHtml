<template>

  <div class="pageBody">
    
    <div class="positionBar">
      <span class="fontFamily sdh-icon-dingwei"></span>&nbsp;&nbsp;当前位置 >生活的分
    </div>
    <el-tabs type="border-card">
     
    <el-tab-pane>
        <span slot="label">
          <i class="el-icon-date"></i> 今日分数
        </span>
       <EventCount></EventCount>
      </el-tab-pane> 
      <el-tab-pane label="事件列表">
      <EventTask></EventTask>
      </el-tab-pane>
      <el-tab-pane label="任务树">
        <EventTree></EventTree>
      </el-tab-pane>
      <el-tab-pane label="任务统计">
        <StatisticalEvent></StatisticalEvent>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>


import StatisticalEvent from '@/components/liftscore/statisticalEvent.vue'
import EventTask from '@/components/liftscore/eventTask.vue'
import EventTree from '@/components/liftscore/eventTree.vue'
import EventCount from '@/components/liftscore/eventCount.vue'
export default {
    components: {
    EventTree,
    EventCount,
    EventTask,
    StatisticalEvent
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
