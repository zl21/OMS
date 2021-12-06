import axios from 'axios';

export default {
  components: {},
  data() {
    return {
      resData: [],
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        loading: false, // 按钮加载
        buttons: [{
          text: $it('btn.newSKU'), // 新增SKU
          btnclick: () => {

          }
        },
        {
          text: $it('btn.fastNew'), // 快速新增
          btnclick: () => {

          }
        },
        {
          text: $it('btn.applyToAllColumn'), // 应用到所有列
          btnclick: () => {
            this.useAllColumns();
          }
        }

        ]
      },
      clickColumns: '',
      columns: [{
        type: 'index',
        width: 60,
        align: 'center',
        title: $it('tL.serialNo'), // 序号
      },
      {
        title: $it('tL.code_SKU'), // SKU编码
        key: 'ECODE'
      },
      {
        title: $it('fL.skuName'), // SKU名称
        key: 'ENAME'
      },
      {
        title: '销售状态',
        key: 'salesStatus'
      }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  activated() {
    this.getData();
  },
  methods: {
    getData() {
      axios({
        // url: 'http://ark-api.ark.burgeononline.com/mock/734/p/cs/SPUDetail',
        url: '/p/cs/ps/pro//v1/list/sku/3',
        method: 'post',
      }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.resData = res.data.data;
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    onColumnClick(e, column) {
      this.clickColumns = column.key;
    },
    useAllColumns() {
      this.resData.forEach(ele => {
        ele[this.clickColumns] = $it('btn.applyToAllColumn');
      });
    },
    onSelectionChange(selection) {
      console.log(selection);
    }
  }
};
