<template>
  <!-- 指定商品拆单 -->
  <div class="specifyGoods" v-loading="pageLoad">
    <div class="i_head">
      <div style="float:left;marginTop:8px;">
        <RadioGroup v-model="radioValue" @on-change="radioChange">
          <Radio label="2">
            <span>按页面已勾选订单</span>
          </Radio>
          <Radio label="1">
            <span>按筛选条件选中订单</span>
          </Radio>
        </RadioGroup>
      </div>
      <div style="float:right">
        商品SKU:
        <Input
          v-model="searchValue"
          icon="ios-search"
          style="width: 150px; marginRight:8px"
          @on-enter="search"
          @on-click="search"
        />
        <!-- 数量:
        <Input v-model="qty" style="width: 80px" />-->
      </div>
    </div>
    <div class="i_body">
      <Table :columns="columns" :data="data"></Table>
    </div>
    <div class="dialog-footer">
      <Button style="marginLeft:8px;" type="error" @click="confirm">确定</Button>
      <Button type="error" ghost @click="()=>{this.$parent.$parent.closeConfirm();}">取消</Button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      pageLoad: false,
      radioValue: '2',
      searchValue: '',
      qty: '1',
      columns: [
        {
          title: '商品SKU',
          key: 'ECODE'
        },
        {
          title: '商品名称',
          key: 'PS_C_PRO_ENAME'
        },
        {
          title: '商品SKU名称',
          key: 'SPEC'
        },
        // {
        //   title: '是否为赠品',
        //   key: 'IS_GIFT'
        // }
      ],
      data: []
    }
  },
  props: {
    componentData: {
      type: Object,
    }
  },
  mounted() {
    console.log(this.componentData);
  },
  methods: {
    radioChange(value) {
      console.log(value);
    },
    search(value) {   //sku查询
      let self = this;
      if (!self.searchValue) {
        self.$Message.warning('请输入商品SKU');
        return;
      }
      axios({
        url: '/p/cs/skuQuery',
        method: 'post',
        data: { isBlur: 'N', psCSku: { ECODE: self.searchValue } }
      }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          if (res.data.data.data.length == 0) {
            this.$Message.warning('查询数据为空!');
            return;
          }
          res.data.data.data[0].IS_GIFT = res.data.data.data[0].IS_GIFT == '0' ? '否' : '是'
          self.data = res.data.data.data
        } else {
          this.$Message.warning('sku查询失败!');
        }
      })
    },
    confirm() {
      let self = this;
      if (self.data.length == 0) {
        self.$Message.warning('sku不能为空!');
        return
      }
      let result = {}
      // if (self.qty == '') {
      //   self.$Message.warning('请输入数量!');
      //   return;
      // }
      if (self.radioValue == '1') {
        self.componentData.a_1['appiontSplitSkuCode'] = self.searchValue;
        // self.componentData.a_1['qty'] = self.qty;
        result = self.componentData.a_1
      } else if (self.radioValue == '2') {
        if (self.componentData.a_2.length == 0) {
          self.$Message.warning('请勾选订单数据!');
          return
        }
        result['ids'] = self.componentData.a_2;
        result['appiontSplitSkuCode'] = self.searchValue;
        // result['qty'] = self.qty;
      }
      console.log(this.componentData.a_1, result);
      this.pageLoad = true
      axios({
        url: '/api/cs/oc/oms/v1/saveAppointSplitOrderInfo',
        method: 'post',
        data: result
      }).then(res => {
        this.pageLoad = false
        console.log(res);
        if (res.data.code == 0) {
          self.$Message.success(res.data.message);
          self.$parent.$parent.$parent.getData();
          this.$parent.$parent.closeConfirm();
        } else {
          self.$Message.error(res.data.message);
          this.$parent.$parent.closeConfirm();
        }
      }).catch(() => {
        this.pageLoad = false
      })
    }
  }
}
</script>
<style lang="less">
.specifyGoods {
  .i_head {
    height: 30px;
  }
  .i_body {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .i_food {
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>