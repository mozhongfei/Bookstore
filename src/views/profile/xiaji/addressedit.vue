<template>
  <div class="address-edit-box">
    <nav-bar class="pf-bar">
      <div slot="center">{{ title }}</div>
    </nav-bar>

    <van-address-edit
      class="edit"
      :area-list="areaList"
      :address-info="addressInfo"
      :show-delete="type == 'edit'"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>
    
<script>
import NavBar from "components/common/navbar/NavBar";
import { Toast } from "vant";
import {
  addRess,
  editRess,
  delAddress,
  getAddressDetail,
} from "network/address";
import { tdist } from "@/aaa/123";

export default {
  name: "addressedit",
  data() {
    return {
      areaList: {
        province_list: {}, // 省
        city_list: {}, // 市
        county_list: {}, // 县
      },
      type: "add",
      addressId: "",
      // title: {},
      searchResult: [],
      addressInfo: {},
    };
  },
  methods: {
    onSave(content) {
      const params = {
        name: content.name,
        address: content.addressDetail,
        phone: content.tel,
        province: content.province,
        city: content.city,
        county: content.county,
        is_default: content.isDefault ? 1 : 0,
      };

      if (this.type == "edit") {
        //修改地址信息
        editRess(this.addressId, params).then((res) => {});
      } else {
        //调用接口保存地址
        addRess(params);
      }
      Toast("保存成功");
      setTimeout(() => {
        this.$router.back();
      }, 1000);
    },
    onDelete() {
      //删除地址
      delAddress(this.addressId).then((res) => {
        Toast("删除成功");
        setTimeout(() => {
          this.$router.back();
        }, 1000);
      });
    },
  },
  components: {
    NavBar,
  },
  mounted() {
    // 省市区 列表 构造出来
    let _province_list = {}; // 省列表
    let _city_list = {}; // 市列表
    let _county_list = {}; // 县列表
    //遍历所有 省数据
    tdist.getLev1().forEach((p) => {
      _province_list[p.id] = p.text;
      tdist.getLev2(p.id).forEach((c) => {
        _city_list[c.id] = c.text;
        tdist.getLev3(c.id).forEach((q) => {
          _county_list[q.id] = q.text;
        });
      });
    });
    //获取地址列表
    this.areaList.province_list = _province_list;
    this.areaList.city_list = _city_list;
    this.areaList.county_list = _county_list;
    console.log(this.areaList);

    // 接收参数
    this.type = this.$route.query.type;
    this.addressId = this.$route.query.addressId;
    // console.log(this.type, this.addressId);

    if (this.type == "edit") {
      getAddressDetail(this.addressId).then((res) => {
        const info = res;
        // 定义一个空的区域码
        let _areaCode = "";

        const province = tdist.getLev1();
        // Object中entries属性可以拿到键和值
        // 区-市-省，反着拿
        Object.entries(this.areaList.county_list).forEach(([id, text]) => {
          // 先找出当前对应的区
          if (text == info.county) {
            // 找到区对应的几个省份
            const provinceIndex = province.findIndex(
              (item) => item.id.substr(0, 2) == id.substr(0, 2)
            );
            // 找到区对应的几个市区
            const cityItem = Object.entries(this.areaList.city_list).filter(
              ([cityId, city]) => cityId.substr(0, 4) == id.substr(0, 4)
            )[0];
            // 对比找到的省份和接口返回的省份是否相等，因为有一些区会重名
            if (
              province[provinceIndex].text == info.province &&
              cityItem[1] == info.city
            ) {
              _areaCode = id;
            }
          }
        });

        this.addressInfo = {
          name: info.name,
          tel: info.phone,
          province: info.province,
          city: info.city,
          county: info.county,
          areaCode: _areaCode,
          addressDetail: info.address,
          isDefault: info.is_default == 1 ? true : false,
        };
      });
    }
  },
  computed: {
    //修改标题显示信息
    title() {
      return this.type == "add" ? "新增地址" : "编辑地址";
    },
  },
};
</script>

<style scoped lang='scss'>
.pf-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.edit {
  .van-field__body {
    textarea {
      height: 26px !important;
    }
  }
}
.address-edit-box {
  margin-top: 44px;
  .van-address-edit {
    ::v-deep.van-button--danger {
      background: var(--color-tint);
      border-color: var(--color-tint);
    }
    .van-switch--on {
      background: var(--color-tint);
    }
  }
}
</style>
