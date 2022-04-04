<template>
  <div>
    <div class="top">
      <div class="top-logopos"></div>
      <div class="top-right">
        <div class="top-infopos">
          <span style="color: black; font-size: 14px;">您好,{{userName}}</span>
          &nbsp;&nbsp;
          <span @click="logout" style="cursor: pointer;color: #4877e6; font-size: 14px;">注销登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { logout, getUserInfo } from "@/api/login/login";
export default {
  name: "topBar",
  data() {
    return {
      userName: ""
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {			
      var user = JSON.parse(localStorage.getItem("user"));
      this.userName = user.name;
    },
    //退出登录
    logout() {
      this.$confirm("您确定要退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success ",
        showClose: false,
        closeOnClickModal: false
      })
        .then(() => {
          var data = {
            token: localStorage.getItem("Authorization")
          };
          logout(data)
            .then(result => {
              if (result.message == "成功") {
                localStorage.removeItem("Authorization");
                this.$message({
                  type: "success",
                  message: "注销登录成功！"
                });
                this.$router.push("/login"); // 跳转到登录页面
                //	window.open(process.env.HOME_URL+'login','_self');
              } else {
                this.$message({
                  type: "error",
                  message: "登出失败"
                });
              }
            })
            .catch(err => {
              //	this.$router.push("/login"); // 跳转到登录页面
              this.$message({
                type: "info",
                message: "已取消登出22"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消登出33"
          });
        });
    }
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
.top {
  background-color: #fff;
  height: 60px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  .top-right {
    height: 59px;
    position: absolute;
    left: 200px;
    right: 0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    h3 {
      font-size: 18px;
      font-weight: normal;
      float: left;
      margin-left: 30px;
      height: 60px;
      line-height: 60px;
    }
  }
}
.top-logopos {
  position: absolute;
  left: 0;
  width: 200px;
  height: 60px;
  line-height: 60px;
  background-color: #4877e6;
}
.top-logopos img {
  padding: 10px 0 0 23px;
}
.top-right {
  background-color: #393d49;
  color: #fff;

  .top-infopos a {
    color: #ccc;
    &:hover {
      color: #fff;
    }
  }
}
.top-infopos {
  position: absolute;
  right: 0;
  height: 60px;
  line-height: 60px;
  padding-right: 30px;
  a {
    color: #5a8bff;
    font-size: 14px;
    padding-left: 15px;
  }
}
.logout {
  cursor: pointer;
}
.normalem {
  font-style: normal;
}
</style>
