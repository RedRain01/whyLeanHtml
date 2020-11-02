<template>
 
</template>

<script>
export default {
  name: "footerBar",
  data() {
    return {
      homeUrl: process.env.HOME_URL
    };
  }
};
</script>

<style lang="scss" type="text/css" scoped>
.footer_line a {
  color: #898989;
  font-size: 12px;
  text-decoration: none;
}

.footer_line p {
  color: #898989;
  font-size: 12px;
  text-align: center;
}

.footer_line {
  height: 110px;
  margin: 0 auto;
  width: 780px;
  border-top: 1px solid #e9e9ea;
  padding-top: 15px;
  margin-top: 35px;
}
</style>
