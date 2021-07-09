<template>
  <van-swipe class="my-swipe" v-if="banners.length" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(item,value) in banners" :key="value">
        <img v-lazy="item.img_url" alt="">
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: "HomeSwiper",
  data() {
    return {};
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {},
  components: {},
};
</script>

<style scoped>
img{
    width: 100%;
    height: auto;
}
img[lazy="loading"] {
		width: 30px;
		height: 30px;
	}
</style>
