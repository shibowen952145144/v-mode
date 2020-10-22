<template>
  <div>
    <hm-header>注册</hm-header>

    <hm-logo></hm-logo>
    <van-field
      v-model="username"
      required
      label="用户名"
      placeholder="请输入用户名"
      :error-message="usernameErrMsg"
      clearable
      @input="checkUsername"
      @clear="clearusername"
    />
    <van-field
      v-model="password"
      required
      label="密码"
      placeholder="请输入密码"
      :error-message="passwordErrMsg"
      clearable
      @input="checkPassword"
      @clear="clearPassword"
    />
    <van-field
      v-model="nickname"
      required
      label="昵称"
      placeholder="请输入昵称"
      :error-message="nicknameErrMsg"
      clearable
      @input="checkNickname"
      @clear="clearNickname"
    />
    <hm-button @click.native="startRegister">注册用户</hm-button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      password: "",
      username: "",
      nickname: "",
      usernameErrMsg: "",
      passwordErrMsg: "",
      nicknameErrMsg: "",
    };
  },
  methods: {
    // 用户名的校验
    checkUsername() {
      let res = /^\d{3,8}$/;
      if (res.test(this.username)) {
        this.usernameErrMsg = "";
      } else {
        this.usernameErrMsg = "用户名校验失败";
      }
    },
    clearusername() {
      this.username = "";
      this.usernameErrMsg = "";
    },
    checkPassword() {
      let res = /^\d{1,5}$/;
      if (res.test(this.password)) {
        this.passwordErrMsg = "";
      } else {
        this.passwordErrMsg = "密码校验失败";
      }
    },
    clearPassword() {
      this.passwordErrMsg = "";
      this.password = "";
    },
    checkNickname() {
      let res = /^[\u4e00-\u9fa5]{2,7}$/;
      if (res.test(this.nickname)) {
        this.nicknameErrMsg = "";
      } else {
        this.nicknameErrMsg = "昵称校验失败";
      }
    },
    clearNickname() {
      this.nicknameErrMsg = "";
      this.nickname = "";
    },
    startRegister() {
      if (
        this.username !== "" &&
        this.nickname !== "" &&
        this.password !== "" &&
        this.usernameErrMsg === "" &&
        this.nicknameErrMsg === "" &&
        this.passwordErrMsg === ""
      ) {
        axios
          .post("http://localhost:3000/register", {
            username: this.username,
            nickname: this.nickname,
            password: this.password,
          })
          .then((res) => {
            // console.log("注册成功", res.data);
            const { statusCode, message, data } = res.data;
            if (res.data.statusCode === 200) {
              // 提示 成功
              this.$toast.success(message);
              // 跳转到 login 顺便传给 login 所需要的数据
              this.$router.push({
                name: "login",
                params: {
                  username: this.username,
                  password: this.password,
                },
              });
              this.$router.params;
            } else {
              this.$toast.fail(message);
            }
          });
      } else {
        this.$toast.fail("校验失败");
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
