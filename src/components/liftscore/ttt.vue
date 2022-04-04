<template>

<div class="body" style="width:2800px;height:2000px">
	<meta http-equiv="refresh" content="2;URL=/why_manager/#/liftscore">

  <div class="container">
	<section id="content">
			<h1 >你好，我自己</h1>
		 <div class="button">
			<!-- <span class="help-block u-errormessage" id="js-server-helpinfo">&nbsp;</span> -->
			<!-- <a href="#"></a>	 -->
		</div> <!-- button -->
	</section><!-- content -->
</div>
<!-- container -->
</div>
</template>

<script>
  export default {
    name: "NotFound",
    data() {
      return {
        initTime: 2
      }
    },
    methods: {
      leftTime() {
        this.initTime--
      }
    },
    created() {
      setInterval(this.leftTime, 1000)
    }
  }
</script>


<style scoped>
.body{
   background:url() 0 bottom repeat-x  #049ec4;
}
</style>
