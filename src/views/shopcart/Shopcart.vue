<template>
  <div>
    <nav-bar class="shopcart-bar">
      <div slot="center">商品详情:{{ $route.query.id }}</div>
    </nav-bar>

    <van-image
      style="margin-top: 44px"
      width="100%"
      lazy-load
      :src="goods.cover_url"
    />

    <van-card
      style="text-align: left"
      :num="goods.stock"
      :price="goods.price + '.00'"
      :desc="goods.description"
      :title="goods.title"
    >
      <template #tags>
        <van-tag plain type="danger">新书</van-tag>
        <van-tag
          plain
          type="danger"
          v-show="(goods.is_recommend = 1 ? true : false)"
          >推荐</van-tag
        >
      </template>
      <template #footer>
        <van-button type="warning" @click="handleAdd">加入购物车</van-button>
        <van-button type="danger" @click="goTOCart">立即购买</van-button>
      </template>
    </van-card>

    <van-tabs v-model="active" class="van-tabs__content">
      <van-tab title="概述">
        <div class="content" v-html="goods.details"></div>
      </van-tab>
      <van-tab title="热评">内容 2</van-tab>
      <van-tab title="相关图书">
        <goods-list :goods="like_goods"></goods-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
    
<script>
import NavBar from "components/common/navbar/NavBar";
import { getDetail } from "network/detail";
import GoodsList from "components/content/goods/GoodsList";
import { addCart } from "network/category";
import { Toast } from "vant";

export default {
  name: "Shopcart",
  data() {
    return {
      id: 1,
      goods: {},
      active: 0,
      like_goods: {},
    };
  },
  methods: {
    handleAdd() {
      addCart({ goods_id: this.id, num: 2 }).then((res) => {
        if (res.status == "201" || res.status == "204") {
          Toast.success("添加成功");
          this.$store.dispatch("updateCart");
        }
        // console.log(res.status);
      });
    },
    goTOCart() {
      addCart({ goods_id: this.id, num: 2 }).then((res) => {
        if (res.status == "201" || res.status == "204") {
          Toast.success("添加成功,显示购物车");
          this.$store.dispatch("updateCart");
          this.$router.push("/category");
        }
        // console.log(res.status);
      });
    },
  },
  mounted() {
    this.id = this.$route.query.id;

    getDetail(this.id).then((res) => {
      this.goods = res.goods;
      this.like_goods = res.like_goods;
      // console.log(res);
    });
  },
  components: {
    NavBar,
    GoodsList,
  },
  deactivated() {
    this.$destroy();
  },
};
</script>

<style scoped lang='scss'>
.shopcart-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.van-tabs__content {
  margin-bottom: 70px;
  .content {
    padding: 10px;

    img {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>
