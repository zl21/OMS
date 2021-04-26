import businessButton from 'professionalComponents/businessButton';
import axios from 'axios';

export default {
  components: {
    businessButton
  },
  data() {
    return {
      resData: {},
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        loading: false, // 按钮加载
        buttons: [{
            text: '新增',
            btnclick: () => {

            }
          },
          {
            text: '删除',
            btnclick: () => {
              this.del();
            }
          }
        ]
      },
      columns: [{
          type: 'selection',
          width: 30,
          align: 'right'
        },
        {
          type: 'index',
          width: 60,
          align: 'left',
          title: '序号'
        },
        {
          title: '供应商名称',
          key: 'supplierName'
        },
        {
          title: '默认供应商',
          key: 'defSupplier',
          render: (h, params) => h('Checkbox', {
            props: {
              value: params.row.defSupplier
            },
            on: {
              'on-change': (val) => {
                console.log(val);
                console.log(params);
                this.resData.supplier.data.forEach(item => {
                  if (val && item.ID !== params.row.ID) {
                    item.defSupplier = false;
                  } else if (val && item.ID == params.row.ID) {
                    item.defSupplier = true;
                  }
                });
              }
            }
          })
        }
      ],
      selectionData: []
    };
  },
  mounted() {
    this.getData();
  },
  activated() {
    this.getData();
  },
  methods: {
    onSelectionChange(selection) {
      this.selectionData = selection;
    },
    del() {
      const self = this;
      if (!self.selectionData.length) {
        self.$OMS2.omsUtils.msgTips(self, 'warning', 'df');
        return;
      }
      const delarr = self.selectionData.map(item => item.ID);
      const arr = [];
      self.resData.supplier.data.forEach(item => {
        if (!delarr.includes(item.ID)) {
          arr.push(item);
        }
      });
      self.resData.supplier.data = arr;
    },
    getData() {
      axios({
        url: 'http://ark-api.ark.burgeononline.com/mock/734/p/cs/SPUDetail',
        method: 'post',
        data: {
          ID: 1
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.resData = res.data.data;
        } else {
          this.$OMS2.omsUtils.msgTips(this, 'error', res.data.message, 0);
        }
      });
    }
  }
};
