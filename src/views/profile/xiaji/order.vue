<template>
  <div class="order-box">
    <nav-bar class="pf-bar">
      <div slot="center">我的订单</div>
    </nav-bar>

     <van-tabs ref="tabs" @click="onChangeTab" class="order-tab">
      <van-tab title="全部"></van-tab>
      <van-tab title="待付款"></van-tab>
      <van-tab title="已支付"></van-tab>
      <van-tab title="发货"></van-tab>
      <van-tab title="交易完成"></van-tab>
      <van-tab title="过期"></van-tab>
    </van-tabs>
    <div class="content">
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        class="order-list-refresh"
      >
        <van-list
          v-model="loading"
          :loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          @offset="10"
        >
          <div
            @click="goTo(item.id)"
            class="order-item-box"
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="order-item-header">
              <span style="line-height: 30px"
                >订单号：{{ item.order_no }} <br />
                创建时间：{{ item.created_at }}</span
              >
            </div>
            <van-card
              v-for="sub in item.orderDetails.data"
              :key="sub.id"
              :num="sub.num"
              :price="sub.goods.price"
              desc="全场包邮"
              :title="sub.goods.title"
              :thumb="sub.goods.cover_url"
            />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>

  </div>
</template>
    
<script>
import NavBar from "components/common/navbar/NavBar";
import { getOrderList } from "@/network/order";

export default {
  name: "order",
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      list: [],
      page: 1,
      totalPage: 0,
      status: 0,
    };
  },
  methods: {
    loadData()  {
      // 请求订单数据
      getOrderList({
        page: this.page, // 当前是那一页的参数
        status: this.status, // 订单状态 1下单 2支付 3发货 4收货 5过期
        include: "orderDetails.goods", // 订单详情（包含商品信息)
      }).then((res) => {
        // 重新加载订单列表
        this.list = this.list.concat(res.data);
        this.loading = false;
        // 接口中的页数传递给变量总页数
        this.totalPage = res.meta.pagination.total_pages;
        // 如果总页数等于当前页
        if (this.page >= this.totalPage) {
          this.finished = true;
        }
      });
    },
    onLoad() {
      // 如果当前页小于总页数的时候
      if (!this.refreshing && this.page < this.totalPage) {
        // 加载的时候 当前页面等于当前页面+1
        this.page = this.page + 1;
      }
      // 如果下面的refreshing加载状态为真的话
      if (this.refreshing) {
        // list为空
        this.list = [];
        // 加载状态设置成假
        this.refreshing = false;
      }
      this.loadData();
    },
    onRefresh() {
        // 是否处于加载状态，加载过程中不触发load事件
      this.refreshing = true;
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      // 页面初始化为 1
      this.page = 1;
      this.onLoad();
    },
    onChangeTab(name) {
       this.status = name;
      this.onRefresh();
    },
    goTo(id) {
      this.$router.push({ path: "/orderdetail", query: { id } });
    }
  },
  components: {
    NavBar,
  },
  mounted() {
    this.onRefresh();
  },
};
</script>

<style scoped lang='scss'>
.pf-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.order-box {
  text-align: left;
  .order-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    width: 100%;
    height: 44px;
    line-height: 44px;
    padding: 0 10px;
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    .order-name {
      font-size: 14px;
    }
  }
  .order-tab {
    margin-top: 44px;
    position: fixed;
    left: 0;
    z-index: 1000;
    width: 100%;
    border-bottom: 1px solid #e9e9e9;
  }
  .content {
    height: 100vh;
    overflow: hidden;
    overflow-y: scroll;
    padding-top: 100px;
  }
  .order-list-refresh {
    .van-card__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .van-pull-refresh__head {
      background: #f9f9f9;
    }
    .order-item-box {
      margin: 20px 10px;
      background-color: #fafafa;
      .order-item-header {
        padding: 10px 20px 0 20px;
        display: flex;
        justify-content: space-between;
      }
      .van-card {
        background-color: #ffffff;
        border-radius: 3px;
        margin-top: 10px;
      }
    }
  }
}
</style>
