export default {
  props: {
    idArray: {
      type: Array
    }
  },
  data() {
    return {
      vmI18n:$i18n,
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [{
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
            type: '', // 按钮类型
            text: $i18n.t('common.determine'), // 确定
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.determine();
            }, // 按钮点击事件
          }
        ],
      },
    };
  },
  methods: {
    determine() {
      this.service.orderCenter.pickOrderExport({ idList: this.idArray }).then(res=>{
        console.log(res);
        if (res.data.code == 0) {
          const downloadFile = {};
          if (typeof downloadFile.iframe === 'undefined') {
            const iframe = document.createElement('iframe');
            downloadFile.iframe = iframe;
            document.body.appendChild(downloadFile.iframe);
          }
          downloadFile.iframe.src = res.data.data;
          downloadFile.iframe.style.display = 'none';
          this.$emit('closeActionDialog');
        } else {
          this.$Message.error(res.data.message);
        }
      });
    }
  }
};
