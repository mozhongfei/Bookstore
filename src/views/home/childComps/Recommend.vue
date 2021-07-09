<template>
  <div class="recommend">
      <div class="recommend-item" v-for="item in recommends.slice(0,4)" :key="item.id">
          <a href="" @click.prevent="goShop(item.id)">
              <img v-lazy="item.cover_url" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>
    
<script>
export default {
  name: "Recommend",
  data() {
    return {};
  },
  props: {
      recommends: {
          type: Array,
          default() {
              return [];
          }
      }
  },
  methods: {
      goShop(id) {
          this.$router.push({path:'/shopcart',query:{id}})
      }
  },
  components: {
  },
};
</script>

<style scoped lang="scss">
.recommend{
    display: flex;
    width: 100%;
    text-align: center;
    padding: 15px 0 30px;
    border-bottom: 8px solid #eee;
}
.recommend-item{
    flex: 1;
    img{
        width: 70px;
        height: 70px;
        margin-bottom: 10px;
    }
    img[lazy="loading"] {
		width: 70px;
		height: 70px;
	}
}
</style>
