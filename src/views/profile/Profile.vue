<template>
  <div>
    <nav-bar class="pf-bar">
      <div slot="center">个人中心</div>
    </nav-bar>

    <div class="user-box">
      <div class="user-info">
        <div class="info">
          <img src="~assets/img/profile/user.png" alt="" />
          <div class="user-desc">
            <span>昵称: {{user.name}}</span>
            <span>登录名: {{user.email}}</span>
            <span class="name">个性签名: 进步如逆水行舟,不进则退</span>
          </div>
        </div>
      </div>

      <ul class="user-list">
        <li class="van-hairline--bottom" @click="goTo('/collect')">
          <span>我的收藏</span>
          <van-icon name="arrow" />
        </li>
        <li class="van-hairline--bottom" @click="goTo('/order')">
          <span>我的订单</span>
          <van-icon name="arrow" />
        </li>

        <li class="van-hairline--bottom" @click="goTo('/setting')">
          <span>账号管理</span>
          <van-icon name="arrow" />
        </li>
        <li class="van-hairline--bottom" @click="goTo('/address')">
          <span>地址管理</span>
          <van-icon name="arrow" />
        </li>

        <li class="van-hairline--bottom" @click="goTo('/about')">
          <span>关于我们</span>
          <van-icon name="arrow" />
        </li>
      </ul>
    </div>

    <div class="btn">
      <van-button type="primary" round block @click="btn">退出登录</van-button>
    </div>
  </div>
</template>
    
<script>
import NavBar from "components/common/navbar/NavBar";
import { logout, getUser } from "network/user";
import { Toast } from "vant";

export default {
  name: "Profile",
  data() {
    return {
        user: {},
    };
  },
  methods: {
    btn() {
      logout().then((res) => {
        if (res.status == "204") {
          Toast.success("退出成功");
          window.localStorage.setItem("token", "");

          this.$store.commit("setIsLogin", false);

          setTimeout(() => {
            this.$router.push("/login");
          }, 500);
        }
      });
    },
    goTo(path,query) {
      this.$router.push({path, query: query || {}})
    }
  },
  components: {
    NavBar,
  },
  mounted() {
    getUser().then( res => {
      console.log(res);
      this.user = res
    })
  },
};
</script>

<style scoped lang="scss">
.pf-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.btn {
  margin: 10px;
  // margin-top: 100px;
}

.user-box{
  margin-top: 65px;
  .user-header{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 44px;
    padding: 0 10px;
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    .user-name{
      font-size: 14px;
    }
  }
  .user-info{
    width: 94%;
    margin: 10px;
    height: 115px;
    background: linear-gradient(90deg,#31c7A7, #A1c7c7);
    box-shadow: 0 2px 5px #269090;
    border-radius: 6px;
    margin-top: 50px;
    text-align: left;
    .info{
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 25px 20px;

      img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-top: 4px;
      }
      .user-desc {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        line-height: 20px;
        font-size: 14px;
        color: #fff;
        span{
          color: #fff;
          font-size: 14px;
          padding: 2px 0;
        }
      }
      .account-setting {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 13px;
        color: #fff;
        .van-icon-setting-o {
          font-size: 16px;
          vertical-align: -3px;
          margin-right: 4px;
        }
      }
    }
  }
  .user-list{
    padding: 0 8px;
    margin-top: 40px;
    li {
      padding-left: 5px;
      padding-right: 5px;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      .van-icon-arrow{
        margin-top: 13px;
      }
      margin: 20px 0 !important;
      background: #ffffff;
      border-radius: 3px;
    }
  }
}
</style>
