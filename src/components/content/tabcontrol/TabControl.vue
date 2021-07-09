<template>
    <div class="tab-control">
        <div class="tab-control-item" v-for="(item,index) in titles" 
        :key="index" @click="dian(index)" 
        :class="{active: index == countIndex}">
            <span>{{item}}</span>
        </div>
    </div>
</template>
    
<script>
export default {
  name: "TabControl",
  props: {
      titles: {
          type: Array,
          default() {
              return [];
          }
      }
  },
  data() {
    return {
        countIndex: ''
    };
  },
  methods: {
      dian(index) {
          this.countIndex = index;
          this.$emit('tabClick',index)
      }
  },
  components: {

  },
};
</script>

<style scoped lang='scss'>
    .tab-control{
        display: flex;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-style: 14px;
        background-color: #fff;
        width: 100%;

        position: sticky;
        position: -webkit-sticky;
        top: 43px;
        z-index: 10;
        .tab-control-item{
            flex: 1;
            span{
                padding: 5px;
            }
        }
        .active{
            color: var(--color-tint);
            span{
                border-bottom: 3px solid var(--color-tint);
            }
        }
    }
</style>
