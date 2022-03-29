
  import jordanBtn from 'professionalComponents/businessButton';
  import publicMethodsUtil from '@/assets/js/public/publicMethods';

  export default {
    components: {
      jordanBtn
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
        exportBtnConfig: {
          typeAll: 'error', // 按钮统一风格样式
          btnsite: 'right', // 按钮位置 (right , center , left)
          buttons: [
            {
              type: '', // 按钮类型
              text: '取消', // 按钮文本
              icon: '', // 按钮图标
              size: '', // 按钮大小
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.$emit('closeActionDialog');
              } // 按钮点击事件
            },
            {
              type: '', // 按钮类型
              text: '确认', // 按钮文本
              icon: '', // 按钮图标
              size: '', // 按钮大小
              disabled: false, // 按钮禁用控制
              btnclick: async () => {
                const self = this;
                const param = {
                  id: self.$route.params.itemId,
                  ids: this.idArray,
                };
                const formdata = new FormData();
                formdata.append('param', JSON.stringify(param));
                formdata.append('menu', 'o2o结算对账汇总主表');
                const res = await self.service.financeCenter.settleAccountNewProExport(
                  formdata,
                );
                if (res.data.code === 0) {
                  publicMethodsUtil.downloadUrlFile(res.data.data);
                  self.$emit('closeActionDialog', true);
                } else {
                  self.$message.error(res.data.message);
                }
              } // 按钮点击事件
            }
          ]
        }
      };
    }
  };