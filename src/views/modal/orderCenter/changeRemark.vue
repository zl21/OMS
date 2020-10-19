<template>
  <div class="jordanModal--">
    <Form :label-width="80" :model="formItem">
      <!-- <FormItem label="旗帜:"> -->
      <FormItem :label="vmI18n.t('table_label.flag')">
        <RadioGroup @on-change="radioChange" v-model="formItem.flag">
          <Radio :label="index" v-for="index of 5" :key="index">
            <img :src="'@/assets/image/img/' + index + '.png'" alt />
          </Radio>
        </RadioGroup>
      </FormItem>
      <!-- <FormItem label="当前备注:" v-if="componentData.SELLER_MEMO"> -->
      <FormItem
        :label="vmI18n.t('form_label.current_remarks')"
        v-if="componentData.SELLER_MEMO"
      >
        <p>{{ componentData.SELLER_MEMO }}</p>
      </FormItem>
      <!-- <FormItem label="修改备注:"> -->
      <FormItem :label="vmI18n.t('form_label.modify_remarks')">
        <Input
          :autosize="{ minRows: 2, maxRows: 5 }"
          @on-change="inputChange"
          type="textarea"
          v-model="formItem.textarea"
        ></Input>
      </FormItem>
      <FormItem>
        <RadioGroup @on-change="coverRadioChange" v-model="formItem.cover">
          <!-- <Radio label="true">覆盖原备注</Radio> -->
          <Radio label="true">{{
            vmI18n.t("other.override_original_remarks")
          }}</Radio>
          <!-- <Radio label="false">追加到原备注</Radio> -->
          <Radio label="false">{{
            vmI18n.t("other.addTo_original_remarks")
          }}</Radio>
        </RadioGroup>
      </FormItem>
    </Form>
    <businessButton :btnConfig="btnConfig"></businessButton>
    <Modal
      :mask="true"
      :z-index="2600"
      @on-keydown="onKeydownModal"
      @on-ok="ok"
      title="提示"
      v-model="confirmModal"
      width="300"
    >
      <!-- <p>是否确认修改备注！</p> -->
      <p>{{ vmI18n.t("modalTips.zh") }}</p>
    </Modal>
  </div>
</template>
<script>
import axios from "axios";
import businessButton from "professionalComponents/businessButton";
import businessActionTable from "professionalComponents/businessActionTable.vue";
import { listeningToKeydownMixin } from "@/assets/js/mixins/listeningToKeydown.js";

export default {
  mixins: [listeningToKeydownMixin],
  components: {
    businessButton,
    businessActionTable,
  },
  props: {
    componentData: {
      type: Object,
      default: {},
    },
  },
  computed: {},
  data() {
    return {
      vmI18n: window.vmI18n,
      // 提示
      confirmModal: false,
      formItem: {
        cover: "false",
        flag: "1",
        textarea: "",
      },
      btnConfig: {
        typeAll: "error", //按钮统一风格样式
        btnsite: "right", //按钮位置 (right , center , left)
        buttons: [
          {
            // text: "确定", //按钮文本
            text: vmI18n.t("common.determine"), //按钮文本
            size: "small", //按钮大小
            disabled: true, //按钮禁用控制
            btnclick: () => {
              this.determine();
            }, //按钮点击事件
          },
          {
            type: "", //按钮类型
            // text: "取消", //按钮文本
            text: vmI18n.t("common.cancel"), //按钮文本
            icon: "", //按钮图标
            size: "small", //按钮大小
            disabled: false, //按钮禁用控制
            btnclick: () => {
              // this.$refs.changeLogistics.close();
              this.$parent.$parent.closeConfirm();
            }, //按钮点击事件
          },
        ],
      },
    };
  },
  mounted() {
    if (this.componentData.ORDER_FLAG) {
      this.formItem.flag = this.componentData.ORDER_FLAG;
      this.btnConfig.buttons[0].disabled = false;
    }
    // ORDER_FLAG
  },
  methods: {
    onKeydownModal() {
      if (event.keyCode == 13 && this.btnConfig.buttons[0].disabled == false) {
        this.saveRemark();
      }
    },
    onKeyDown(e) {
      if (e.keyCode == 27) {
        console.log(this.confirmModal);
        if (!this.confirmModal) {
          this.$parent.$parent.closeConfirm();
          this.$parent.$parent.$parent.publicBouncedIndex = {
            name: "testModal",
          };
        } else {
          this.confirmModal = false;
        }
      }
      if (e.keyCode == 13 && this.btnConfig.buttons[0].disabled == false) {
        this.determine();
      }
      //  else if(e.keyCode == 13 && this.btnConfig.buttons[0].disabled == true){
      //   this.saveRemark();
      // }
    },
    determine() {
      let self = this;
      if (typeof self.componentData.status === "object") {
        if (
          self.componentData.status.includes(2) ||
          self.componentData.status.includes(1)
        ) {
          self.confirmModal = true;
        } else {
          self.saveRemark();
        }
      } else if (
        self.componentData.status === "1" ||
        self.componentData.status === "2"
      ) {
        self.confirmModal = true;
      } else {
        self.saveRemark();
      }
    },
    inputChange() {
      this.btnConfig.buttons[0].disabled = false;
    },
    // radio change事件
    coverRadioChange() {
      this.btnConfig.buttons[0].disabled = false;
    },
    // radio change事件
    radioChange() {
      this.btnConfig.buttons[0].disabled = false;
    },
    // 确定事件
    ok() {
      this.saveRemark();
    },
    // 保存备注
    saveRemark() {
      let self = this;
      let data =
        typeof self.componentData.ids === "number"
          ? self.componentData.ids
          : self.componentData.ids.join(",");
      let fromdata = new FormData();
      let param = {
        ids: data,
        remark: self.formItem.textarea,
        order_flag: self.formItem.flag,
        cover: self.formItem.cover,
      };
      fromdata.append("param", JSON.stringify(param));
      axios({
        url: "/api/cs/oc/oms/v1/remarkUpdate", //接口调整,切换服务地址
        method: "post",
        cancelToken: true,
        data: param,
      }).then((res) => {
        if (res.data.code === 0) {
          if (self.$route.query.id == 2627) {
            self.$Message.success(res.data.message);
            self.$parent.$parent.$parent.getData();
            self.$parent.$parent.closeConfirm();
            self.$parent.$parent.$parent.selection = [];
          } else {
            self.$Message.success(res.data.message);
            self.$parent.$parent.$parent.load();
            self.$parent.$parent.closeConfirm();
          }
        } else {
          self.$Message.error(res.data.message);
        }
      });
    },
  },
};
</script>

<style lang='less'>
/* radio框样式调整 */
.jordanModal-- {
  .burgeon-radio .burgeon-radio-inner:after {
    left: 2px !important;
    top: 2px !important;
  }

  .header {
    background-color: #eee;
    color: black;
    font-size: 13px;
  }

  .footer {
    width: 100%;
    margin-top: 20px;
  }

  img {
    width: 14px;
    height: auto;
  }
}
</style>
