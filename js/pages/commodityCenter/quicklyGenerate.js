import businessButton from 'professionalComponents/businessButton';
import axios from 'axios';
import comUtils from '@/assets/js/__utils__/common.js';

export default {
  components: {
    businessButton
  },
  computed: {
    spuid() {
      return this.$route.query.id;
    },
    classid() {
      return this.$route.query.classid;
    }
  },
  data() {
    return {
      vmI18n:$i18n,
      searchTreeData: '',
      endNodes: [],
      treeData: [],
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        loading: false, // 按钮加载
        buttons: [{
            text: '快速生成',
            btnclick: () => {
              this.quicklyGenerate();
            }
          },
          {
            text: '返回',
            btnclick: () => {
              comUtils.tabCloseAppoint(this);
                this.$destroy(true);
              $store.commit('customize/TabOpen', {
                id: this.spuid,
                type: 'action',
                name: 'PS_C_PRO',
                label: '快速生成', // 额外退款编辑
              });
            }
          }

        ]
      },
      table: {
        columns: [{
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '维度码',
            key: 'ECODE'
          },
          {
            title: '维度值',
            key: 'ENAME'
          }
        ],
        data: [],
        selectData: []
      }
    };
  },
  mounted() {
    this.getTree();
  },
  methods: {
    // 查询组织树
    getTree() {
      const formdata = new FormData();
      formdata.append('classifyId', this.classid);
      this.service.commodityCenter.treeLoad(formdata)
      .then(res => {
        console.log(res);
        if (res.data.code == 0) {
          res.data.data.forEach(item=>{ item.disableCheckbox = true; });
          this.treeData = res.data.data;
        }
      });
    },
    onCheckChange(e) {
      const arr = [];
      e.forEach(ele => {
        if (ele.endNode) {
          arr.push(ele);
        }
      });
      this.endNodes = arr;
      console.log(arr);
    },
    onColumnClick(e, data) {
      console.log(e);
      console.log(data);
    },
    onSelectionChange(e) {
      this.table.selectData = e;
    },
    toRight() {
      const self = this;
      const endNodes = this.endNodes;
      console.log(endNodes);
      const data = [];
      endNodes.forEach(item => {
        const obj = {};
        obj.ECODE = item.ecode;
        obj.ENAME = item.title;
        obj.ID = item.id;
        obj.PS_C_SPECGROUP_ID = item.PS_C_SPECGROUP_ID; // 组id
        data.push(obj);
      });

      self.table.data = data;
    },
    allToRight() {
      this.$refs.trees.handleCheck({
        checked: false,
        nodeKey: '2'
      });
    },
    toLeft() {
      // 先移除右边表格勾选数据
      const data = this.table.selectData.map(item => item.ECODE);
      const arr = [];
      this.table.data.forEach(item => {
        if (!data.includes(item.ECODE)) {
          arr.push(item);
        }
      });
      this.table.data = arr;

      // 左边取消勾选右边选中的表格数据
      this.forTree(this.treeData, data);
    },
    allToLeft() {

    },
    // 遍历组织树
    forTree(e, arr) {
      e.forEach(item => {
        if (item.children) {
          this.forTree(item.children, arr);
        } else if (arr.includes(item.ecode)) {
          // item.checked = false;
          this.$refs.trees.handleCheck({
            checked: false,
            nodeKey: item.nodeKey
          }); // 框架提供实例方法,取消勾选节点
        }
      });
      console.log(e);
    },
    // 快速生成
    quicklyGenerate() {
      // --------------------生成后端需要的数据-------------
      const self = this;
      if (!self.table.data.length) {
        self.$OMS2.omsUtils.msgTips(self, 'warning', 'fi');
        return;
      }
      const dataArry = self.table.data;
      const data = [];
      dataArry.forEach(item=>{
        const filter = data.filter(ele=>ele.specGroupId == item.PS_C_SPECGROUP_ID);
        if (filter.length) {
          filter[0].psCSpecObjs.push({
            ECODE: item.ECODE,
            ENAME: item.ENAME,
            ID: item.ID
          });
        } else {
          const obj = {};
          obj.specGroupId = item.PS_C_SPECGROUP_ID;
          obj.psCSpecObjs = [];
          obj.psCSpecObjs.push({
            ECODE: item.ECODE,
            ENAME: item.ENAME,
            ID: item.ID
          });
          data.push(obj);
        }
      });
      const obj = {};
      obj.spuId = self.spuid;
      obj.specGroupInfoVoList = data;
    // --------------------end-------------
      self.service.commodityCenter.quickAdd(obj)
      .then(res => {
        console.log(res);
        if (res.data.code == 0) {
          self.$OMS2.omsUtils.msgTips(self, 'success', res.data.message, 0);
          // 重新查询组织树
          this.getTree();
          this.table.data = [];
        }
      });
    },
    searchDimen() {
      // this.treeData = this.b;
      this.getTree();
    }
  }
};
