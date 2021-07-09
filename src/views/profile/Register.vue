<template>
  <div>
    <nav-bar class="rs-bar">
      <div slot="center">用户注册</div>
    </nav-bar>

    <div style="margin-top: 50px">
      <div style="text-align: center; padding-top: 50px">
        <van-image
          width="10rem"
          height="10rem"
          fit="contain"
          src="https://img01.yzcdn.cn/vant/logo.png"
        />
      </div>
    </div>

    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="name"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
       <van-field
        v-model="password_confirmation"
        type="password"
        name="password_confirmation"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '请填写一致密码' }]"
      />
       <van-field
        v-model="email"
        name="email"
        label="电子邮箱"
        placeholder="电子邮箱"
        :rules="[{ required: true, message: '请填写正确的电子邮箱格式' }]"
      />
      <div style="margin: 16px">
          <div class="link-login" @click="$router.push('/login')">
              已有账号,立刻登录
          </div>
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { register } from "network/user";
import { Notify, Toast } from 'vant';

export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      password_confirmation: '',
      email: '',
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      if (this.password != this.password_confirmation) {
          Notify('两次密码输入不一致');
      }else {
          register(values).then( res => {
              if (res.status == '201') {
                  Toast.success('注册成功');
                  setTimeout(() => {
                      this.$router.push('/login')
                  }, 1000);
              }
          })
      }
    },
  },
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.rs-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.link-login{
    font-style: 14px;
    margin-bottom: 20px;
    color: #42b983;
}
</style>
