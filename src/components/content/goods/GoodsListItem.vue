<template>
  <div class="goods-item">
    <img v-lazy="product.cover_url" alt="" />
    <div class="goods-info">
      <p>{{ product.title }}</p>
      <span class="price"><small>￥</small>{{ product.price }}</span>
      <span :class="['collect', { active: flag }]" @click.stop="collect">{{
        aa
      }}</span>
    </div>
  </div>
</template>
    
<script>
import { collect } from "network/collect";

export default {
  name: "GoodsListItem",
  data() {
    return {
      flag: false,
      list: [],
      aa : this.product.collects_count
    };
  },
  props: {
    product: Object,
    default() {
      return {};
    },
    list3: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    collect() {
      this.flag = !this.flag;
      if (this.flag) {
          this.aa += 1;
      }else{
          this.aa -= 1;

      }
      
      collect(this.product.id);
    },
  },
  components: {},
  mounted() {
    if (this.list3.includes(this.product.id)) {
        this.flag = true
    }
    // console.log(this.list3.includes(this.product.id));
  },
};
</script>

<style scoped lang='scss'>
.goods-item {
  width: 46%;
  padding-bottom: 40px;
  text-align: center;
  position: relative;
  img {
    width: 100%;
    border-radius: 5px;
  }
  img[lazy="loading"] {
    width: 100%;
    height: auto;
  }
  .goods-info {
    font-style: 12px;
    position: absolute;
    text-align: center;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      margin-bottom: 3px;
    }
    .price {
      color: red;
      margin-right: 20px;
    }
    .collect {
      position: relative;
    }
    .collect::before {
      content: "";
      position: absolute;
      width: 14px;
      height: 14px;
      left: -15px;
      top: 1px;
      background: url("~assets/img/home/星.svg") 0 0/14px 14px;
    }
    .active::before {
      background: url("~assets/img/home/星1.svg") 0 0/14px 14px;
    }
  }
}
</style>
