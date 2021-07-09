<template>
    <div class="goods">
        <goods-list-item v-for="item in goods" :key='item.id+shu()' :list3="list3" :product="item" @click.native="itemClick(item.id)"></goods-list-item>
    </div>
</template>
    
<script>
import GoodsListItem from 'components/content/goods/GoodsListItem.vue';

export default {
  name: "GoodsList",
  data() {
    return {

    };
  },
  props: {
      goods: {
          type: Array,
          default() {
              return [];
          }
      },
      list3: {
          type: Array,
          default() {
              return [];
          }
      }
  },
  methods: {
      shu() {
          return Math.random()
      },
      itemClick(id) {
       this.$router.push({path:'/shopcart',query:{id}})
       if(this.$route.meta.title == '商品详情'){
           this.$router.go(0)
       };   
    }
  },
  components: {
      GoodsListItem
  },
};
</script>

<style scoped lang='scss'>
.goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 5px;
}
</style>
