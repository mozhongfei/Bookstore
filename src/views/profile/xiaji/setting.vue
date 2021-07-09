<template>
  <div>
    <nav-bar class="pf-bar">
      <div slot="center">账号管理</div>
    </nav-bar>


  </div>
</template>
    
<script>
import NavBar from "components/common/navbar/NavBar";


export default {
  name: "setting",
  data() {
    return {};
  },
  methods: {
    
  },
  components: {
    NavBar,
  },

};
</script>

<style scoped>
.pf-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.btn{
  margin: 10px;
  margin-top: 100px;
}
</style>
