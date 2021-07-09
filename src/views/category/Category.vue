<template>
  <div>
    <nav-bar class="cg-bar">
      <div slot="center">
        购物车(<span style="color: red">{{ $store.state.cartCount }}</span
        >)
      </div>
    </nav-bar>

    <div class="cart-box">
      <div class="cart-body">
        <van-checkbox-group
          v-model="result"
          ref="checkboxGroup"
          @change="group"
        >
          <van-swipe-cell
            :right-width="50"
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="good-item">
              <van-checkbox :name="item.id" />
              <div class="good-img">
                <img v-lazy="item.goods.cover_url" alt="" />
              </div>
              <div class="good-desc">
                <div class="good-title">
                  <span>{{ item.goods.title }}</span>
                  <span>x{{ item.goods.stock }}</span>
                </div>
                <div class="good-btn">
                  <div class="price">
                    <small>￥</small>{{ item.goods.price + ".00" }}
                  </div>
                  <van-stepper
                    integer
                    :min="1"
                    :max="item.goods.stock"
                    v-model="item.num"
                    :name="item.id"
                    async-change
                    @change="onChange"
                  />
                </div>
              </div>
            </div>
            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="delCart(item.id)"
              />
            </template>
          </van-swipe-cell>
        </van-checkbox-group>
      </div>
      <van-submit-bar class="submit-all" :price="total * 100" button-text="结算" @submit="onsubmit">
        <van-checkbox @click="checkA" v-model="checkAll">全选</van-checkbox>
      </van-submit-bar>

      <div class="empty" v-if="!list.length">
        <img
          class="empty-cart"
          src="https://oss.shop.eduwork.cn/product/2020-0820-5f3e15bc69891.png"
          alt="空购物车"
        />
        <div class="title">购物车空空如也</div>
        <van-button round color="#1baeae" type="primary" block @click="goto"
          >前往购物</van-button
        >
      </div>
    </div>
  </div>
</template>
    
<script>
import NavBar from "components/common/navbar/NavBar";
import { Toast } from "vant";
import { checkedCart, modifyCart, getCart, deleteCart } from "network/category";

export default {
  name: "Category",
  data() {
    return {
      checkAll: false,
      list: [],
      result: [],
      sum: 0,
      value: 1,
      init: () => {
        Toast.loading({ message: "加载中...", forbidClick: true });

        getCart("include=goods").then((res) => {
          this.list = res.data;
          console.log(this.list);

          this.result = res.data
            .filter((n) => n.is_checked == 1)
            .map((item) => item.id);
          // console.log(this.result);

          Toast.clear();
        });
      },
    };
  },
  methods: {
    onChange(value, detail) {
      Toast.loading({ message: "修改中...", forbidClick: true });
      console.log(value, detail.name);
      modifyCart(detail.name, { num: value }).then((res) => {});
      Toast.clear();
    },
    checkA() {
      console.log(this.checkAll);
      this.$refs.checkboxGroup.toggleAll(this.checkAll);
    },
    goto() {
      this.$router.push("/home");
    },
    group(result) {
      console.log(result);
      if (result.length == this.list.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }

      checkedCart({ cart_ids: result }).then((res) => {});
    },
    delCart(id) {
      deleteCart(id).then((res) => {
        this.init();
        this.$store.dispatch("updateCart");
      });
    },
    onsubmit() {
      if (this.result.length == 0) {
        Toast.filter('请选择商品结算');
        return;
      }else {
        this.$router.push('/createorder')
      }
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
      this.sum = 0;
      this.list.filter(item => this.result.includes(item.id)).forEach(item => {
       this.sum += parseFloat(item.goods.price) *  parseInt(item.num)     
       console.log(this.sum);
      });
      return this.sum
    }
  }
};
</script>

<style scoped lang="scss">
.cg-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.cart-box {
  .cart-body {
    margin: 60px 0 100px 0;
    padding-left: 1px;
    .good-item {
      display: flex;
      .van-checkbox {
        margin-left: 10px;
      }
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
    .delete-button {
      width: 50px;
      height: 100%;
    }
  }
  .empty {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    margin-top: 200px;
    .empty-cart {
      width: 150px;
      margin-bottom: 20px;
    }
    .van-icon-smile-o {
      font-size: 50px;
    }
    .title {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
  .submit-all {
    margin-bottom: 50px;
    .van-checkbox {
      margin-left: 0px;
    }
    .van-submit-bar__text {
      margin-right: 10px;
    }
    .van-submit-bar__button {
      background: red;
    }
  }
  .van-checkbox__icon--checked .van-icon {
    background-color: red;
    border-color: red;
  }
}
</style>
