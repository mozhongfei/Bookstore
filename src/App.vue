<template>
  <div id="app">
    <div id="nav">
      <keep-alive>
        <router-view />
      </keep-alive>
      <main-tab-bar />
    </div>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";

export default {
  name: "app",
  data() {
    return {
    };
  },
  components: {
    MainTabBar,
  },
  methods: {
  
  },
};
</script>

<style lang="scss">
@import "assets/css/base.css";
</style>
