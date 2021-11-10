<!-- 开发文档：http://knowledge.ark.burgeononline.com/repository#/entryComponents/2/914142/2/2061 -->
<template>
  <div class="customized-modal" style="width: 430px">
    <Spin v-if="spinShow" size="large" fix />
    <OmsForm :form-config="downLoadFormConfig">
      <template #compile="{ rowData }">
        <div class="import-box" @click="importBoxOpen(rowData.item)">
          <!-- 导入 -->
          [{{ vmI18n.t("btn.import") }}]
        </div>
      </template>
    </OmsForm>
    <OmsButton class="modal-footer" :btn-config="downLoadBtnConfig" />
    <!-- 确认下载弹框 订单下载-->
    <Modal
      v-model="downLoadModal"
      class="downLoadModal"
      :title="modalTitle"
      width="450"
      :mask="true"
      @on-ok="downLoadOk"
      @on-cancel="downLoadCancel"
    >
      <p>
        <!-- 订单下载任务已经发送，任务ID： -->
        {{ vmI18n.t("modalTips.bn") }}
        <span class="taskID" @click="taskIDClick">{{ taskId }}</span>
        <!-- ，请前往接口下载任务表查看下载进度！ -->
        {{ vmI18n.t("modalTips.bo") }}
      </p>
    </Modal>

    <OmsDialog
      ref="dialog"
      :title="dialogConfig.title"
      :component-data="dialogConfig.componentData"
      :name="dialogConfig.name"
      :url="dialogConfig.url"
      :width="540"
      :basePathName="dialogConfig.basePathName"
    />
  </div>
</template>

<script>
import OmsForm from "burgeonComponents/view/OmsForm";
import OmsButton from "burgeonComponents/view/OmsButton";
import OmsDialog from "burgeonComponents/view/OmsDialog";
// import i18n from "@burgeon/internationalization/i18n";

// import CustomConfig from "@/config/customized.config.js";
// const modalConfig = CustomConfig.cusDownLoadAllConfig;

const DownLoad = {
  name: 'DownLoad',
  components: {
    OmsDialog,
    OmsForm,
    OmsButton,
  },
  props: {
    objList: {
      type: Array,
      defalut: () => [],
    },
    idArray: {
      type: Array,
      defalut: () => [],
    },
    webid: {
      type: Number,
    },
    tablename: {
      type: String,
    },
    selectRowData: {
      type: Array,
      defalut: () => [],
    },
  },
  data() {
    return {
      spinShow: false, // loading动画
      // vmI18n: i18n,
      downLoadModal: false,
      taskId: "",
      tableName: this.$route.params.tableName
        ? this.$route.params.tableName
        : "CantNotFind_tableName",
      downLoadBtnConfig: {
        typeAll: "default", // 按钮统一风格样式
        btnsite: "right", // 按钮位置 (right , center , left)
        buttons: [
          {
            type: "", // 按钮类型
            text: $i18n.t("common.cancel"), // 取消 按钮文本
            icon: "", // 按钮图标
            size: "", // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$emit("closeActionDialog", false);
            }, // 按钮点击事件
          },
          {
            type: "", // 按钮类型
            text: $i18n.t("btn.download"), // 下载 按钮文本
            icon: "", // 按钮图标
            size: "", // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              // this.modalConfig[this.tableName].determine(this);
              console.log('click::', new Date());
              this.okHandel();
            }, // 按钮点击事件
          },
        ],
      },
      downLoadFormConfig: {},
      dialogConfig: {
        title: $i18n.t("btn.import"),
        componentData: {
          tableName: "IP_C_STANDPLAT_PRO",
          returnData(data) {
            this.downLoadFormConfig.formValue.sp_ids = data;
          },
        },
        name: "importTable",
        basePathName: "business-components",
        url: "importTable",
      },
    };
  },
  computed: {
    modalConfig() {
      return this.$OMS2.cusDownLoadAllConfig;
    },
    modalTitle() {
      let title = this.modalConfig[this.tableName].modalTitle
        ? this.modalConfig[this.tableName].modalTitle
        : $i18n.t("modalTitle.orderDownload");
      return title;
    },
  },
  mounted() {
    const self = this;
    window.custSelf = self
    this.downLoadFormConfig = this.modalConfig[this.tableName].formConfig;
    if (this.$route.params.tableName == "IP_B_JITX_DELIVERY") {
      self.downLoadFormConfig.formValue.order_status = "NEW";
    }
    // 初始化
    if (this.modalConfig[this.tableName].init) {
      this.modalConfig[this.tableName].init(self)
    }
  },
  methods: {
    okHandel: _.throttle(function () {
      const self = this;
      console.log('determine::', new Date());
      self.modalConfig[self.tableName].determine(self);
    }, 3000, { 'trailing': false }),
    downLoadOk() {
      const self = this;
      self.$emit("confirmImport");
      self.$emit("closeActionDialog");
    },
    downLoadCancel() {
      const self = this;
      self.$emit("confirmImport");
      self.$emit("closeActionDialog");
    },
    taskIDClick() {
      const self = this;
      self.$emit("confirmImport");
      self.$emit("closeActionDialog");
      this.downLoadModal = false;
      this.$store.commit("customize/TabOpen", {
        id: this.taskId,
        type: "singleView", // 类型action
        name: "singleView",
        label: $i18n.t("common.interface_download_taskTable_edit"), // 接口下载任务表编辑 tab中文名
        query: {
          id: this.taskId,
          pid: "24775",
          ptitle: $i18n.t("common.interface_download_taskTable"), // 接口下载任务表
          ptype: "table",
          tabTitle: $i18n.t("common.interface_download_taskTable_edit"), // 接口下载任务表编辑
          tableName: "IP_T_CONSUMER_LOG",
        },
      });
    },
    // 打开导入弹窗
    importBoxOpen() {
      const _this = this;
      // 导入
      this.dialogConfig = {
        title: $i18n.t("btn.import"),
        componentData: {
          // 导入：key存在则在配置中找(tableName_webname)
          tableName: "IP_C_STANDPLAT_PRO",
          webname: "",
          returnData(data) {
            this.downLoadFormConfig.formValue.sp_ids = data;
          },
        },
        name: "importTable",
        basePathName: "business-components",
        url: "importTable",
        width: 450,
      };
      this.$refs.dialog.openConfirm();
    },
  },
  destroyed() {
    window.custSelf = null
  }
};

export default DownLoad;
</script>

<style >
.downLoadTaobaoOrder .ark-radio-group {
  display: flex !important;
}

.downLoadModal .taskID {
  color: blue;
  cursor: pointer;
}

.import-box {
  font-size: 14px;
  text-align: right;
  color: #0f8ee9;
  line-height: 32px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
