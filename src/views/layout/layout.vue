<template>
  <div class="wrapper" id="wrapper">
    <topBar></topBar>
    <leftBar></leftBar>
    <centerBar></centerBar>
  </div>
</template>

<script>
import topBar from '@/views/layout/components/topBar.vue';
import leftBar from '@/views/layout/components/leftBar/leftBar.vue';
import centerBar from '@/views/layout/components/centerBar.vue';
export default {
  name: 'layout',
  components: {
    topBar,
    leftBar,
    centerBar
  }
}
</script>
