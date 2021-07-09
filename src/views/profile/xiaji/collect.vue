<template>
  <div>
    <nav-bar class="pf-bar">
      <div slot="center">我的收藏</div>
    </nav-bar>
    
    <div class="good-box">
      <goods-list :goods="like_goods"  :list3="list3"></goods-list>
    </div>
    

  </div>
</template>
    
<script>
import NavBar from "components/common/navbar/NavBar";
import { collects } from "network/collect";
import GoodsList from "components/content/goods/GoodsList";

export default {
  name: "collect",
  data() {
    return {
      list3: [],
      like_goods: [],
    };
  },
  methods: {
    
  },
  components: {
    NavBar,
    GoodsList
  },
  beforeCreate() {
     // 获取收藏
    collects().then((res) => {
      const params = res.data;
      params.forEach((item) => {
        this.list3.push(item.goods_id);
         this.like_goods.push(item.goods) ;
      });
      console.log(this.like_goods);
    });
  }
};
</script>

<style scoped>
.pf-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.good-box{
  margin: 50px 0;
}
</style>
