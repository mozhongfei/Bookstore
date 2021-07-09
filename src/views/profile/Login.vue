<template>
  <div>
    <nav-bar class="rs-bar">
      <div slot="center">用户登录</div>
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
        v-model="email"
        name="email"
        label="电子邮箱"
        placeholder="电子邮箱"
        :rules="[{ required: true, message: '请填写正确的电子邮箱格式' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
          <div class="link-login" @click="$router.push('/register')">
              没有账号,立刻注册
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
import { login } from "network/user";
import { Toast } from 'vant';


export default {
  name: "Login",
  data() {
    return {
      password: "",
      email: "",
    };
  },
  methods: {
    onSubmit(values) {
      // console.log("submit", values);
      login(values).then( res => {
        window.localStorage.setItem('token', res.access_token)

        this.$store.commit('setIsLogin', true)

        Toast.success('登录成功')

        setTimeout(() => {
          this.$router.go(-1)
        }, 1000);
      })
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
