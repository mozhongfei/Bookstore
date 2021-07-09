<template>
  <div>
    <nav-bar class="pf-bar">
      <div slot="center">关于我们</div>
    </nav-bar>


  </div>
</template>
    
<script>
import NavBar from "components/common/navbar/NavBar";


export default {
  name: "about",
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
