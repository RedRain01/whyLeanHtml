<template>
<div class="body">
  <div class="container">
	<img :src="studentImg"  style="width:1200px; height:800px">
</div>

</div>
</template>


<script>
export default {
  name: 'structure',
  data () {
    return {
    // 图片路径
      studentImg: require('@/assets/images/ScreenClip.png'),
  }
  }
};
</script>

