<template>
  <div>
    <hm-header>登录</hm-header>

    <hm-logo></hm-logo>

    <van-field
      v-model="username"
      required
      clearable
      label="用户名"
      placeholder="请输入用户名"
      @input="inputUsername"
      @clear="clearusername"
      :error-message="usernameErrMsg"
    />
    <van-field
      v-model="password"
      required
      clearable
      label="密码"
      placeholder="请输入密码"
      :error-message="passwordErrMsg"
      @input="inputPassword"
      @clear="clearPassword"
    />

    <hm-button @click.native="startLogin">登录</hm-button>
    <div class="registe">
      <span>未注册的用户到这里</span>
      <router-link class="link" to="/register"> 注册新用户 </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "", //用户名
      password: "", //密码
      usernameErrMsg: "",
      passwordErrMsg: "",
    };
  },
  // created() {
  //   const { username, password } = this.$router.params;
  //   if (password && username) {
  //     this.password = password;
  //     this.username = username;
  //   }
  // },
  methods: {
    // 用户名的校验
    inputUsername() {
      let reg = /^\d{1,8}$/;
      if (reg.test(this.username)) {
        this.usernameErrMsg = "";
      } else {
        this.usernameErrMsg = "用户名格式不正确";
      }
    },
    clearusername() {
      this.username = "";
      this.usernameErrMsg = "";
    },
    // 密码的校验
    inputPassword() {
      let reg = /^\d{1,5}$/;
      if (reg.test(this.password)) {
        this.passwordErrMsg = "";
      } else {
        this.passwordErrMsg = "密码格式不正确";
      }
    },
    clearPassword() {
      this.passwordErrMsg = "";
      this.password = "";
    },

    startLogin() {
      if (
        this.usernameErrMsg === "" &&
        this.passwordErrMsg === "" &&
        this.username !== "" &&
        this.password !== ""
      ) {
        axios
          .post("http://localhost:3000/login", {
            username: this.username,
            password: this.password,
          })
          .then((res) => {
            const { statusCode, message, data } = res.data;
            if (res.data.statusCode === 200) {
              // 保存 token 保存登录的 token和用户信息
              localStorage.setItem("token", data.token);
              localStorage.setItem("user_id", data.user.id);

              this.$toast.success(message);
              // 跳转到  个人中心
              this.$router.push("/user");
            } else {
              this.$toast.fail(message);
            }
          });
      } else {
        this.$toast.fail("失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.registe {
  color: #cccccc;
  font-size: 14px;
  text-align: right;
  padding: 0 10px;
  .link {
    color: aquamarine;
  }
}
// 添加自己的样式   确保样式不被其他（hmheader.vue）里面的样式所影响
</style>
