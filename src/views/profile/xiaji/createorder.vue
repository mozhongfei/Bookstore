<template>
  <div class="create-order">
    <nav-bar class="pf-bar">
      <div slot="center">订单预览</div>
    </nav-bar>

    <div class="address-wrap">
      <div class="name" @click="goTo">
        <span style="margin-right: 20px">{{ address.name }}</span>
        <span>{{ address.phone }}</span>
      </div>
      <div class="address">
        {{ address.province }} {{ address.city }} {{ address.county }}
        {{ address.address }}
      </div>
      <van-icon class="arrow" name="arrow" />
    </div>
    <div class="good">
      <div class="good-item" v-for="(item, index) in cartList" :key="index">
        <div class="good-img"><img v-lazy="item.goods.cover_url" alt="" /></div>
        <div class="good-desc">
          <div class="good-title">
            <span>{{ item.goods.title }}</span>
            <span>x{{ item.num }}</span>
          </div>
          <div class="good-btn">
            <div class="price">
              <small>¥</small> {{ item.goods.price + ".00" }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <van-submit-bar
      class="submit-all"
      :price="total * 100"
      button-text="生成订单"
      @submit="handleCreateOrder"
    >
      商品金额
    </van-submit-bar>

    <van-popup
      closeable
      :close-on-click-overlay="false"
      v-model="showPay"
      :show="showPay"
      position="bottom"
      :style="{ height: '40%' }"
      @close="close"
    >
      <van-grid :border="false" :column-num="2">
        <van-grid-item>
          支付宝二维码<br />
          <van-image width="150" height="150" :src="aliyun" />
        </van-grid-item>
        <van-grid-item>
          微信二维码<br />
          <van-image width="150" height="150" :src="wechat" />
        </van-grid-item>
      </van-grid>
    </van-popup>
  </div>
</template>
    
<script>
import NavBar from "components/common/navbar/NavBar";
import {
  getOrderPreview,
  createOrder,
  payOrder,
  statusOrder,
} from "@/network/order";
import { Toast } from "vant";

export default {
  name: "createorder",
  data() {
    return {
      cartList: [],
      address: {},
      showPay: false,
      orderNo: "",
      aliyun: "",
      wechat: "",
      init: () => {
        // 轻提示
        Toast.loading({ message: "加载中...", forbidClick: true });
        getOrderPreview().then((res) => {
          let address = res.address.filter((n) => n.is_default == "1");
          if (address.length == 0) {
            this.address = {
              address: "还没有设置默认地址，请选择或填写地址信息",
            };
          } else {
            this.address = address[0];
          }
          this.cartList = res.carts;
          // 清除轻提示
          Toast.clear();
        });
      },
    };
  },
  methods: {
    goTo() {
      this.$router.push({ path: "/Address" });
    },
    handleCreateOrder() {
      const params = {
        address_id: this.address.id,
      };
      createOrder(params).then((res) => {
        Toast("创建订单成功");
        this.$store.dispatch("updateCart");
        this.showPay = true;
        // 订单ID
        this.orderNo = res.id;
        // 支付二维码，获取阿里的沙箱支付信息
        payOrder(this.orderNo, { type: "aliyun" }).then((res) => {
          // 将二维码图片赋值给state下面到的aliyun
          this.aliyun = res.qr_code_url;
          this.wechat = res.qr_code_url;
        });
        // 每隔2秒轮询查看
        const timer = setInterval(() => {
          // 订单状态
          statusOrder(this.orderNo).then((res) => {
            console.log(res);
            if (res == "1") {
              // 停止轮询
              clearInterval(timer);
              // 支付成功后跳转到订单状态
              this.$router.push({
                path: "/orderdetail",
                query: { id: this.orderNo },
              });
            }
          });
        }, 10000);
      });
    },
    close() {
      this.$router.push({ path: "/orderdetail", query: { id: this.orderNo } });
    },
  },
  components: {
    NavBar,
  },
  mounted() {
    this.init();
  },
  computed: {
    total() {
      let sum = 0;
      this.cartList.forEach((item) => {
        sum += parseInt(item.num) * parseFloat(item.goods.price);
      });
      return sum;
    },
  },
};
</script>

<style scoped lang="scss">
.pf-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.create-order {
  background: #f9f9f9;
  .address-wrap {
    text-align: left;
    margin-bottom: 20px;
    background: #fff;
    position: relative;
    margin-top: 44px;
    font-size: 14px;
    padding: 15px;
    color: #222333;
    .name,
    .address {
      margin: 10px 0;
    }
    .arrow {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
    }
    &::before {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;
      background: -webkit-repeating-linear-gradient(
        135deg,
        #ff6c6c 0,
        #ff6c6c 20%,
        transparent 0,
        transparent 25%,
        #1989fa 0,
        #1989fa 45%,
        transparent 0,
        transparent 50%
      );
      background: repeating-linear-gradient(
        -45deg,
        #ff6c6c 0,
        #ff6c6c 20%,
        transparent 0,
        transparent 25%,
        #1989fa 0,
        #1989fa 45%,
        transparent 0,
        transparent 50%
      );
      background-size: 80px;
      content: "";
    }
  }
  .good {
    margin-bottom: 120px;
  }
  .good-item {
    padding: 10px;
    background: #fff;
    display: flex;
    .good-img {
      img {
        width: 100px;
        height: auto;
      }
    }
    .good-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      padding: 20px;
      .good-title {
        display: flex;
        justify-content: space-between;
      }
      .good-btn {
        display: flex;
        justify-content: space-between;
        .price {
          font-size: 16px;
          color: red;
          line-height: 28px;
        }
        .van-icon-delete {
          font-size: 20px;
          margin-top: 4px;
        }
      }
    }
  }
  .pay-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 10px 0;
    padding-bottom: 50px;
    border-top: 1px solid #e9e9e9;
    div {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: 10px 0;
      font-size: 14px;
      span:nth-child(2) {
        color: red;
        font-size: 18px;
      }
    }
    .pay-btn {
      position: fixed;
      bottom: 7px;
      right: 0;
      left: 0;
      width: 90%;
      margin: 0 auto;
    }
  }
}
.submit-all {
  margin-bottom: 50px;
  z-index: 9 !important;
}
</style>
