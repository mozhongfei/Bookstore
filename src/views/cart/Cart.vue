<template>
  <div>
    <nav-bar class="cart-bar">
      <div slot="center">商品分类</div>
    </nav-bar>

    <div id="mainbox">
      <div class="ordertab">
        <van-tabs v-model="active" @click="tabClick">
          <van-tab title="销量排序"></van-tab>
          <van-tab title="价格排序"></van-tab>
          <van-tab title="评价排序"></van-tab>
        </van-tabs>
      </div>

      <van-sidebar class="leftmenu" v-model="activeKey">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item
            v-for="item in carts.slice(0, 5)"
            :key="item.id"
            :title="item.name"
            :name="item.name"
          >
            <van-sidebar-item
              v-for="sub in item.children.slice(0, 5)"
              :key="sub.id"
              :title="sub.name"
              @click="getGoods(sub.id)"
            />
          </van-collapse-item>
        </van-collapse>
      </van-sidebar>
      <div class="goodslist">
        <div class="content">
          <van-card
            v-for="item in showGoods"
            @click.native="itemClick(item.id)"
            :key="item.id+shu()"
            :num="item.sales"
            :tag="item.sales > 1000 ? '爆款' : '促销'"
            :price="item.price"
            :desc="item.updated_at"
            :title="item.title"
            :thumb="item.cover_url"
            :lazy-load="true"
          />
        </div>
      </div>
    </div>

    <back-top v-show="IsTab" @bTop="bTop"></back-top>

  </div>
</template>
    
<script>
import NavBar from "components/common/navbar/NavBar";
import { getCart, getCartGoods } from "network/cart";
import BScroll from "better-scroll";
import BackTop from 'components/common/backtop/BackTop'


export default {
  name: "Cart",
  data() {
    return {
      activeKey: 0,
      activeName: "1",
      active: 0,
      IsTab: false,
      orders: ["sales", "price", "comments_count"],
      count: "sales",
      goodsId: 0,
      init: "",
      bscroll: {},
      goods: {
        sales: {
          page: 1,
          list: [],
        },
        price: {
          page: 1,
          list: [],
        },
        comments_count: {
          page: 1,
          list: [],
        },
      },
      carts: [],
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.count].list;
    },
  },
  created() {
    this.init = () => {
      getCartGoods("sales", this.goodsId).then((res) => {
        this.goods.sales.list = res.goods.data;
      });
      getCartGoods("price", this.goodsId).then((res) => {
        this.goods.price.list = res.goods.data;
      });
      getCartGoods("comments_count", this.goodsId).then((res) => {
        this.goods.comments_count.list = res.goods.data;
        // console.log(this.goods);
      });
    };
    this.init();
  },
  methods: {
    tabClick(index) {
      this.count = this.orders[index];
      getCartGoods(this.count, this.goodsId).then((res) => {
        this.goods[this.count].list = res.goods.data;
        this.bscroll.refresh();
      });
      // console.log(this.count, this.goodsId);
    },
    getGoods(id) {
      this.goodsId = id;
      this.init();
      // console.log(this.count, this.goodsId);
    },
    fetchData() {
      this.$nextTick(() => {
        this.bscroll.refresh();
      });
    },
    shu() {
      return Math.random()
    },
    bTop() {
      this.bscroll.scrollTo(0,0,300)
    },
    itemClick(id) {
       this.$router.push({path:'/shopcart',query:{id}})
    }
  },
  components: {
    NavBar,
    BackTop
  },
  watch: {
    bscroll: "fetchData",
  },
  mounted() {
    getCart().then((res) => {
      // console.log(res);
      this.carts = res.categories;
    });

    this.bscroll = new BScroll(document.querySelector(".goodslist"), {
      probeType: 3,
      click: true,
      pullUpLoad: true,
    });

    this.bscroll.on("scroll", (position) => {
      // console.log(position.y);
      this.IsTab = -position.y > 300;
    });
    //上拉加载数据
    this.bscroll.on("pullingUp", () => {
      const page = this.goods[this.count].page + 1;

      getCartGoods(this.count, this.goodsId, page).then((res) => {
        this.goods[this.count].list.push(...res.goods.data);
        this.goods[this.count].page += 1
      });

      //完成上拉请求
      this.bscroll.finishPullUp();
      // console.log(page);
      // console.log(document.querySelector(".content").clientHeight);
      //重新计算高度
      this.bscroll.refresh();
    });
  },
};
</script>

<style scoped lang='scss'>
.cart-bar {
  background-color: var(--color-tint);
  color: #fff;
}

#mainbox {
  margin-top: 45px;
  display: flex;
  .ordertab {
    height: 40px;
    position: fixed;
    top: 44px;
    right: 0;
    left: 130px;
    z-index: 20;
  }
  .leftmenu {
    width: 130px;
    position: fixed;
    top: 95px;
    left: 0;
  }
  .goodslist {
    flex: 1;
    height: 100vh;
    position: absolute;
    top: 85px;
    left: 130px;
    right: 0;
    padding: 10px;
    .van-card__thumb {
      width: 68px;
    }
    .content {
      margin-bottom: 50px;
    }
  }
}
</style>
