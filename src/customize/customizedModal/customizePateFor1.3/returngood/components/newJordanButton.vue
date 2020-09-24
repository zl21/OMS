<template>
  <div class="one_button">
    <div class="demo-spin-container" v-if="btnConfig.loading">
      <Spin fix></Spin>
    </div>
    <div class="buttonBox" :class="btnConfig.btnsite">
      <div v-for="(item , index) in btnConfig.buttons" :key="index">
        <div class="buttonGroup" v-if="( item.isShow === false || item.isShow )? item.isShow : true">
          <Button
            @click.native="item.btnclick"
            :ref="item.ref"
            :type="item.type ? item.type : btnConfig.typeAll"
            :size="item.size ? item.size : 'small'"
            :custom-icon="item.icon ? item.icon : ''"
            :disabled="item.disabled ? item.disabled : false"
            :ghost="item.ghost ? false : true"
          >{{item.text}}</Button>
        </div>
      </div>
    </div>
    <Form :model="btnConfig.formItem" :label-width="100">
      <FormItem label="选择打印模板:">
        <Select v-model="btnConfig.formItem.select">
          <!-- <Option value="TM">标准条码打印</Option>
          <Option value="XM">标准箱码打印</Option> -->
          <Option v-for="item in btnConfig.formItem.options" :key="item.id" :value="item.value">
            {{item.label}}
          </Option>
        </Select>
      </FormItem>
    </Form>
  </div>

</template>

<script>

  import myInputLd from 'framework/components/element/input.vue' //为多选+导入组件专属引入
  export default {
    data() {
      return {
        items:{
          style: "select", //下拉框类型
          label: "付款方式", //下拉框前的值
          width: "6", //所占宽度宽度
          value: "PAY_TYPE", //输入框的值
          disabled: false,
          isShow:true,
          dataAcessKey: "PAYTYPENAME",
          selectChange: () => {
            let self = this;
            // self.watch_paytype();
          }, //选中事件，默认返回选中的值
          options: [
            //下拉框选项值
          ]
        }
        // buttons: [
        //   {
        //     type: 'fcdefault',  //按钮类型
        //     text: 'fcdefault',  //按钮文本
        //     icon: 'logo-facebook', //按钮图标
        //     size: 'large',  //按钮大小
        //     disabled: 'disabled', //按钮禁用控制
        //     isShow: false
        //   }
        // ]
      };
    },

    props: {
      btnConfig: {
        type: Object
      }
    },

    methods: {
      button(ref) {
        this.$emit("buttonEvent", ref, this);
      }
    },
    components:{
      myInputLd
    }
  };
</script>

<style lang='less' scoped>
  .one_button {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    position: relative;
    /* select下拉框样式调整 */
    .popSelect  {
      height: 24px;
      line-height: 24px;
    }
    .loading {
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: #ccc;
      opacity:0.5;
      .demo-spin-container{
        display: inline-block;
        width: 60px;
        height: 30px;
        position: relative;
        border: 1px solid #eee;
      }
    }

    .buttonBox {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      // flex-direction: row;
      // .ark-btn-ghost.ark-btn-error {
      //   color: #fd6442 !important;
      // }
    }
    .buttonBox .buttonGroup {
      margin: 0px 0px 8px 8px;
      margin-bottom: 0px;
    }

    .left {
      justify-content: flex-start;
    }
    .center {
      justify-content: center;
    }
    .right {
      justify-content: flex-end;
    }
  }
</style>


