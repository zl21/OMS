import axios from 'axios';

  export default {
    props: {

      idArr: {
        type: Array
      }
    },
    data() {
      return {
        time: new Date()
      };
    },
    methods: {
      renderTime(date) {
        const dateee = new Date(date).toJSON();
        return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      },
      confirm() {
        const data = {
          title: '延期',
          tablename: 'ST_C_SHOP_ITEM_VIRTUAL_HIGH_STOCK',
          objids: this.idArr,
          newEndTime: this.renderTime(this.time)
        };
        const formdata = new FormData();
        formdata.append('param', JSON.stringify(data));
        axios({
          url: '/p/cs/st/v1/delayEndTime',
          method: 'post',
          data: formdata
        }).then(res => {
          if (res.data.data.code == 0) {
            this.$Message.success(res.data.data.message);
            this.$emit('confirmImport');
            this.$emit('closeActionDialog');
          } else if (res.data.data.code == -2) {
            this.$Modal.confirm({
              title: '',
              content: res.data.data.message,
              mask: true,
              showCancel: true,
              onOk: () => {
                this.confirm();
              },
              onCancel: () => {
                this.$Message.info('点击了取消!');
              }
            });
          } else {
            this.$Message.error(res.data.data.message);
          }
          console.log(res);
        });
      },
      closeActionDialog() {
        this.$emit('closeActionDialog');
      }
    }
  };