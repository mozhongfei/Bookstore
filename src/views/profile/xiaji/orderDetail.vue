<template>
  <div class="order-detail-box">
    <nav-bar class="pf-bar">
      <div slot="center">订单详情</div>
    </nav-bar>

    <div class="order-status">
      <div class="status-item">
        <label>订单状态：</label>
        <span>{{ statusString }}</span>
      </div>
      <div class="status-item">
        <label>订单编号：</label>
        <span>{{ detail.order_no }}</span>
      </div>
      <div class="status-item">
        <label>下单时间：</label>
        <span>{{ detail.created_at }}</span>
      </div>

      <van-button
        v-if="detail.status == 1"
        @click="showPayFn"
        style="margin-bottom: 10px"
        color="#1baeae"
        block
        >去支付</van-button
      >
      <van-button v-if="detail.status == 2" @click="handleConfirmOrder" block
        >确认订单</van-button
      >
    </div>
    <div class="order-price">
      <div class="price-item">
        <label>商品金额：</label>
        <span>¥ {{ total + ".00" }}</span>
      </div>
      <div class="price-item">
        <label>配送方式：</label>
        <span>普通快递</span>
      </div>
    </div>

    <van-card
      v-for="item in detail.orderDetails.data"
      :key="item.id"
      :num="item.num"
      :price="item.price + '.00'"
      desc="全场包邮"
      :title="item.goods.title"
      :thumb="item.goods.cover_url"
    />

    <div style="width: 100%; height: 50px"></div>

    <van-popup
      v-model="showPay"
      :show="showPay"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <div :style="{ width: '90%', margin: '0 auto', padding: '50px 0' }">
        <van-grid :border="false" :column-num="2">
          <van-grid-item text="支付宝">
            支付宝二维码<br />
            <van-image width="150" height="150" :src="aliyun" />
          </van-grid-item>
          <van-grid-item text="微信支付">
            微信二维码<br />
            <van-image width="150" height="150" :src="wechat" />
          </van-grid-item>
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>
    
<script>
import NavBar from "components/common/navbar/NavBar";
import { Dialog, Toast } from "vant";
import {
  confirmOrderD,
  getOrderDetail,
  express,
  payOrder,
  statusOrder,
} from "@/network/order";

export default {
  name: "orderDetail",
  data() {
    return {
      orderNo: "", // 订单ID
      detail: {
        // 订单详情
        orderDetails: {
          data: [],
        },
        status: 0, // 初始状态为0
      },
      showPay: false,
      aliyun: "",
      wechat: "",
      init: () => {
        const { id } = this.$route.query;
        this.orderNo = id;
        // 订单详情
        getOrderDetail(id).then((res) => {
          console.log(res);
          this.detail = res;
        });
      },
    };
  },
  methods: {
    showPayFn() {
      this.showPay = true;
      payOrder(this.orderNo, { type: "aliyun" }).then((res) => {
        this.aliyun = res.qr_code_url;
        this.wechat = res.qr_code_url;
      });

      const timer = setInterval(() => {
        statusOrder(this.orderNo).then((res) => {
          console.log(res);
          if (res == "2") {
            clearInterval(timer);
            this.showPay = false;
            router.push({ path: "/orderdetail", query: { id: this.orderNo } });
          }
        });
      }, 2000);
    },

    handleConfirmOrder() {
      // 提示信息
      Dialog.confirm({
        title: "是否确认订单",
      })
        .then(() => {
          confirmOrderD(this.orderNo).then((res) => {
            Toast("确认成功");
            this.init();
          });
        })
        .catch(() => {});
    },
    close() {
      Dialog.close();
    }
  },
  components: {
    NavBar,
  },
  mounted() {
    Toast.loading({ message: "加载中...", forbidClick: true });
    this.init();
    Toast.clear();
  },
  computed: {
    statusString() {
      // 1下单 2支付 3发货 4收货 5过期
      let status = ["", "已下单", "已支付", "等待发货", "确认收货", "已过期"];
      // 返回状态
      return status[this.detail.status];
    },
    total() {
      let sum = 0;
      // 遍历已选购物车商品价钱
      this.detail.orderDetails.data.forEach((item) => {
        // 求和
        sum += item.num * item.price;
      });
      // 返回总金额
      return sum;
    },
  },
};
</script>

<style scoped lang='scss'>
.pf-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.order-detail-box {
  text-align: left;
  background: #f7f7f7;
  .order-status {
    background: #fff;
    margin-top: 44px;
    padding: 20px;
    font-size: 15px;
    .status-item {
      margin-bottom: 10px;
      label {
        color: #999;
      }
      span {
      }
    }
  }
  .order-price {
    background: #fff;
    margin: 20px 0;
    padding: 20px;
    font-size: 15px;
    .price-item {
      margin-bottom: 10px;
      label {
        color: #999;
      }
     
    }
  }
  .van-card {
    margin-top: 0;
  }
  .van-card__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
