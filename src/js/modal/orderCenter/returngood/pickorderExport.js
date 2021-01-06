import businessButton from 'professionalComponents/businessButton';

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
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [{
          type: '', // 按钮类型
          text: window.vmI18n.t('common.cancel'), // 取消 按钮文本
          icon: '', // 按钮图标
          size: 'small', // 按钮大小
          disabled: false, // 按钮禁用控制
          btnclick: () => {
            this.$emit('closeActionDialog');
          }, // 按钮点击事件
        },
          {
            type: '', // 按钮类型
            text: window.vmI18n.t('common.determine'), // 确定 按钮文本
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
          const download_file = {};
          if (typeof download_file.iframe === 'undefined') {
            const iframe = document.createElement('iframe');
            download_file.iframe = iframe;
            document.body.appendChild(download_file.iframe);
          }
          download_file.iframe.src = res.data.data;
          download_file.iframe.style.display = 'none';
          this.$emit('closeActionDialog');
        } else {
          this.$Message.error(res.data.message);
        }
      });
    }
  }
};
