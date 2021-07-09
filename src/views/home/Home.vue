<template>
  <div class="home">
    <nav-bar class="home-bar">
      <div slot="center">图书兄弟</div>
    </nav-bar>

    <back-top v-show="IsTab" @bTop="bTop"></back-top>

    <tab-control
      v-show="IsTab"
      @tabClick="tabClick"
      :titles="['畅销', '新书', '精选']"
    ></tab-control>

    <div class="wrapper">
      <div class="content">
        <div ref="banref">
          <home-swiper :banners="banners"></home-swiper>

          <recommend :recommends="books"></recommend>
        </div>

        <tab-control
          @tabClick="tabClick"
          :titles="['畅销', '新书', '精选']"
        ></tab-control>

        <goods-list :goods="goods[temid].list"  :list3="list3"></goods-list>
      </div>
    </div>
  </div>
</template>
    
<script>
import NavBar from "components/common/navbar/NavBar";
import BackTop from "components/common/backtop/BackTop";
import HomeSwiper from "views/home/childComps/HomeSwiper.vue";
import { getHomeMultidata, getHomeGoods } from "network/home";
import Recommend from "views/home/childComps/Recommend.vue";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BScroll from "better-scroll";
import { collects } from "network/collect";


export default {
  name: "Home",
  components: {
    NavBar,
    Recommend,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper,
  },
  data() {
    return {
      books: [],
      temid: 0,
      bscroll: "",
      IsTab: false,
      banners: [],
      list3: [],
      goods: [
        {
          page: 1,
          list: [],
          name: "sales",
        },
        {
          page: 1,
          list: [],
          name: "recommend",
        },
        {
          page: 1,
          list: [],
          name: "new",
        },
      ],
    };
  },
  methods: {
    tabClick: function (index) {
      this.temid = index;
      this.fetchData();
    },

    fetchData() {
      this.$nextTick(() => {
        this.bscroll.refresh();
      });
    },

    bTop() {
      this.bscroll.scrollTo(0, 0);
    },
  },
  watch: {
    bscroll: "fetchData",
  },
  mounted() {
    this.bscroll = new BScroll(document.querySelector(".wrapper"), {
      probeType: 3,
      click: true,
      pullUpLoad: true,
    });

    this.bscroll.on("scroll", (position) => {
      // console.log(position.y);
      this.IsTab = -position.y > this.$refs.banref.offsetHeight;
    });
    //上拉加载数据
    this.bscroll.on("pullingUp", () => {
      const page = this.goods[this.temid].page + 1;
      const tp = this.goods[this.temid].name;

      getHomeGoods(tp, page).then((res) => {
        // console.log(res);
        this.goods[this.temid].list.push(...res.goods.data);
        this.goods[this.temid].page += 1;
      });

      //完成上拉请求
      this.bscroll.finishPullUp();
      // console.log(tp,page);
      // console.log(document.querySelector(".content").clientHeight);
      //重新计算高度
      this.bscroll.refresh();
    });
  },
  beforeCreate() {
    getHomeMultidata().then((res) => {
      this.books = res.goods.data;
      this.banners = res.slides;
    });
    getHomeGoods("sales").then((res) => {
      // console.log(res, 'sales');
      this.goods[0].list = res.goods.data;
    });
    getHomeGoods("recommend").then((res) => {
      // console.log(res,'recommend');
      this.goods[1].list = res.goods.data;
    });
    getHomeGoods("new").then((res) => {
      // console.log(res,'new');
      this.goods[2].list = res.goods.data;
    });
    // 获取收藏
    collects().then((res) => {
      const params = res.data;
      params.forEach((item) => {
        this.list3.push(item.goods_id);
      });
      // console.log(this.list3);
    });
  },
  computed: {},
};
</script>

<style scoped>
.home {
  height: 100vh;
  position: relative;
}
.home-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.wrapper {
  position: absolute;
  top: 45px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
