
<template>
  <div class="pageBody">
    <el-button type="primary" size="mini" class="typeSelector">查333333333333询</el-button>
    <el-button type="primary" size="small" class="typeSelector">{{eventParentOptions}}</el-button>

    <div v-for="item of 4" :key="item">
      <div style="float:left">
        <div position:relative>
          <el-progress type="circle" :percentage="80" color="#8e71c7">Done</el-progress>
        </div>
        <div position:absolute>
          <el-tag type="success">标签二</el-tag>
        </div>
      </div>
    </div>
  </div>
</template>
    
    <script>
export default {};
</script>
    
    <style>
</style>
    