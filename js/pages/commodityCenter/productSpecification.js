import axios from 'axios';
import businessButton from 'professionalComponents/businessButton';

export default {
  components: {
    businessButton
  },
  data() {
    return {
      vmI18n:$i18n,
      resData: [],
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        loading: false, // 按钮加载
        buttons: [{
            text: '新增SKU',
            btnclick: () => {

            }
          },
          {
            text: '快速新增',
            btnclick: () => {

            }
          },
          {
            text: '应用到所有列',
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
          title: '序号'
        },
        {
          title: 'SKU编码',
          key: 'ECODE'
        },
        {
          title: 'SKU名称',
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
        ele[this.clickColumns] = '应用到所有列';
      });
    },
    onSelectionChange(selection) {
      console.log(selection);
    }
  }
};
