import businessButton from 'burgeonComponents/businessButton';

  export default {
    components: {
      businessButton
    },
    props: {
      idArray: {
        type: Array
      }
    },
    data() {
      return {
        vmI18n:$i18n,
        time: new Date(),
        btnConfig: {
          typeAll: 'default', // 按钮统一风格样式
          btnsite: 'right', // 按钮位置 (right , center , left)
          buttons: [
            {
              type: '', // 按钮类型
              text: $i18n.t('common.cancel'), // 取消
              icon: '', // 按钮图标
              size: 'small', // 按钮大小
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.$emit('closeActionDialog');
              }, // 按钮点击事件
            },
            {
              text: $i18n.t('common.determine'), // 确定
              size: 'small', // 按钮大小
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.confirm();
              }, // 按钮点击事件
            }
          ],
        },
      };
    },
    methods: {
      renderTime(date) {
        const dateee = new Date(date).toJSON();
        return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
      },
      confirm() {
        const data = {
          title: $i18n.t('modalTitle.epostponep'), // '延期',
          tablename: 'ST_C_SHOP_ITEM_VIRTUAL_HIGH_STOCK',
          objids: this.idArray,
          newEndTime: this.renderTime(this.time)
        };
        const formdata = new FormData();
        formdata.append('param', JSON.stringify(data));
        this.service.strategyPlatform.delayEndTime(formdata).then((res) => {
          if (res.data.data.code == 0) {
            this.$Message.success(res.data.data.message);
            this.$emit('confirmImport');
            this.$emit('closeActionDialog');
          } else if (res.data.data.code == -2) {
            this.$Modal.confirm({
              className: 'ark-dialog',
              title: '',
              content: res.data.data.message,
              mask: true,
              showCancel: true,
              onOk: () => {
                this.confirm();
              },
              onCancel: () => {
                this.$Message.info($i18n.t('modalTips.ep')); // '点击了取消!'
              }
            });
          } else {
            // this.$Message.error(res.data.data.message);
          }
          console.log(res);
        });
      }
    }
  };
