<template>
<div class="body">
  <div class="container">
	<img :src="studentImg"  style="width:1200px; height:800px">
</div>

</div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'borrow',
  data () {
    return {
    // 图片路径
      studentImg: require('@/assets/images/ScreenClip.png'),
  }
  }
};
</script>

