<template>
  <div class="address-box">
    <nav-bar class="pf-bar">
      <div slot="center">地址管理</div>
    </nav-bar>

    <div v-show="list.length == 0" class="dizhi">还没有地址信息,去添加把!</div>

    <div class="address-item">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>
    
<script>
import NavBar from "components/common/navbar/NavBar";
import { Toast } from "vant";
import { getAddress } from "network/address";


export default {
  name: "Address",
  data() {
    return {
      list: [],
      chosenAddressId: "1",
    };
  },
  methods: {
    onAdd() {
      Toast("新增地址");
      this.$router.push({path:'/addressedit', query: {type:'add'}})
    },
    onEdit(item, index) {
      Toast("编辑地址");
      this.$router.push({path:'/addressedit', query: {type:'edit', addressId: item.id}})

    },
  },
  components: {
    NavBar,
  },
  mounted() {
    //获取地址列表
    getAddress().then( res => {
      //如果地址为空,
      if (res.data.length==0) {
        // 初始化数组list
        this.list=[]
        return;
      }
      console.log(res);
      // 过滤地址数据
      this.list = res.data.map(item => {
        return {
          id: item.id,
          name:item.name,
          tel:item.phone,
          // 全部地址信息
          address:`${item.province} ${item.city} ${item.county} ${item.address}` ,
          // 判断默认地址
          isDefault: !!item.is_default
        }
      })
    })
  },
};
</script>

<style scoped lang='scss'>
.pf-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.dizhi{
  margin-top: 200px;
  text-align: center;
}

.address-box {
  height: 300px;
  ::v-deep.van-radio__icon {
    display: none;
  }
  .address-item {
    margin-top: 45px;
    .van-button {
      background: var(--color-tint);
      border-color: var(--color-tint);
    }
  }
}
.van-address-list__bottom {
  bottom: 100px !important;
}
</style>
