<template>
  <div class="custom-modal-confirm-wrapper">
    <!-- <div class="custom-modal-confirm-header">
      <i class="iconfont custom-modal-confirm-icon iconbj_doubt fcWarning "></i>
      <div class="custom-modal-confirm-body">
        当前的操作会执行全量导出，导出时间可能会比较慢！是否继续导出？
      </div>
    </div> -->
    <div style="width:400px">
      <p class="custom-dialog-body-p">本次操作将提交至后台处理，是否确认提交？</p>
      <p class="custom-dialog-body-p">提交后可通过<a href="/SYSTEM/TABLE/CP_C_TASK/24386">[我的任务]</a>进行查看</p>
    </div>
    <businessButton :btn-config="btnConfig" />
  </div>
</template>

<script>
import businessButton from 'professionalComponents/businessButton';
import R3 from '@syman/burgeon-r3';
const { network } = R3;

const EXPORT_URI_LIST = [
  {
    tableName: 'ORDEREXPORTVIEW',
    url: '/p/cs/exportOrder',
  }
];

export default {
  components: {
    businessButton,
  },
  data() {
    return {
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: window.vmI18n.t('common.cancel'), // 取消 按钮文本
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.closeConfirm();
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('common.determine'), // 确定 按钮文本
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: async () => {
              const route = this.$route.params;
              const { tableName } = route;
              const targetTable = EXPORT_URI_LIST.find(i => i.tableName === tableName);
              const formConfig = this.$store.state[`S.${route.tableName}.${route.tableId}`].formItems.data;
              const { defaultrange, start } = this.$store.state[`S.${route.tableName}.${route.tableId}`].ag.datas;
              const params = Object.assign({}, {
                table: route.tableName,
                fixedcolumns: formConfig,
                startIndex: start,
                range: defaultrange,
              });
              const tableLabel = this.getTableLabel(route.tableName);
              const query = new FormData();
              query.append('searchdata', JSON.stringify(params));
              query.append('filename', tableLabel);
              query.append('menu', tableLabel);
              query.append('showColumnName', true);
              query.append('filetype', '.xlsx');
              const res = await network.post(targetTable.url, query);
              if (res.data.code === 0) {
                this.closeConfirm();
              }
            } // 按钮点击事件
          }
        ]
      },
    }
  },
  methods: {
    closeConfirm() {
      const _this = this;
      // 元数据配置窗口特殊处理
      _this.$parent.$parent.closeActionDialog();
    },
    getTableLabel(table) {
      switch(table) {
        case 'ORDEREXPORTVIEW':
          return '订单报表导出';
        default:
          return '';
      }
    },
  },
}
</script>

<style scoped>
  .custom-modal-confirm-wrapper{
    width: 350px;
  }
  .custom-modal-confirm-header{
    padding: 10px 20px 0;
    display: flex;
    align-items: center;
  }
  .custom-modal-confirm-icon{
    color: #f7b901;
    font-size: 28px;
    margin-right: 10px;
    display: inline-block;
  }
  .custom-modal-confirm-body {
    border: none;
    resize: none;
    max-height: 200px;
    overflow: auto;
    width: 100%;
    color: rgb(102, 102, 102);
    line-height: 150%;
  }
  .custom-dialog-body-p{
    padding: 5px 0;
  }
</style>