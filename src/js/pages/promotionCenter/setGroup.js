import axios from 'axios';
import myInputLd from 'framework/components/element/input';
import businessButton from 'professionalComponents/businessButton';
export default {
  name: 'DialogVisible',
  data() {
    return {
      buttonConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: window.vmI18n.t('common.cancel'), // 取消 按钮文本
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$emit('closeActionDialog', false);
            } // 按钮点击事件
          },
          {
            type: '', // 按钮类型
            text: window.vmI18n.t('common.determine'), // 确定 按钮文本
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.download();
            } // 按钮点击事件
          }
        ]
      },
      itemdata: {
        name: '分组名称：',
        setGroupName: '',
        radio: '1'
      },
      visible: true,
      tableData: [],
      headOne: [
        { label: '活动名称', name: 'ENAME' },
        { label: '参与店铺', name: 'SHOP_NAME' },
        { label: '原分组名称', name: 'PM_GROUP' },
        { label: '优先级', name: 'PM_PRIORITY' }
      ],
      headTwo: [
        { label: '活动名称', name: 'ENAME' },
        { label: '参与店铺', name: 'SHOP_NAME' },
        { label: '原分组名称', name: 'PM_GROUP' }
      ],
      tHead: [
        {
          label: '活动名称',
          name: 'ENAME'
        },
        {
          label: '参与店铺',
          name: 'SHOP_NAME'
        },
        {
          label: '原分组名称',
          name: 'PM_GROUP'
        },
        {
          label: '优先级',
          name: 'PM_PRIORITY'
        }
      ]
      // dialogVisible:true
    };
  },
  props: ['dialogVisible', 'checkList', 'setGroupTableData'],
  components: {
    myInputLd,
    businessButton
  },
  computed: {},
  watch: {
    'itemdata.radio': {
      handler(val) {
        this.tHead = val == 1 ? this.headOne : this.headTwo;
      }
    },
    setGroupTableData: {
      handler() {
        if (this.setGroupTableData.length > 0) {
          this.tableData = this.setGroupTableData;
        }
      }
    }
  },
  methods: {
    getDataInit() {
      const _self = this;
      const formData = new FormData();
      formData.append('param', JSON.stringify({ objids: this.checkList }));
      axios({
        method: 'post',
        url: '/p/cs/pm/v1/selectPmGroup',
        data: formData
      }).then(res => {
        console.log(res);
        if (res.data.code === 0) {
          this.tableData = res.data.data;
        } else {
          _self.$message.error(res.data.message);
        }
      });
    },
    del(scope) {
      console.log(scope);
      this.tableData.splice(scope.$index, 1);
    },
    confirm() {
      const self = this;
      const mapArr = [];
      const promActis = [];
      if (this.itemdata.radio == 1 && this.itemdata.setGroupName == '') {
        self.$message.error('请填写分组名称');
        return;
      }
      self.tableData.forEach(item => {
        mapArr.push(Number(item.PM_PRIORITY));
        promActis.push({ id: item.ID, pm_priority: item.PM_PRIORITY });
      });
      const setArr = new Set(mapArr); // 去重复
      console.log(setArr.size < mapArr.length ? '有重复' : '无重复');
      if (setArr.size < mapArr.length) {
        self.$message.error('有重复优先级');
        return;
      }
      const formData = new FormData();
      formData.append('param', JSON.stringify({ promActis, group_status: this.itemdata.radio, pm_group: this.itemdata.setGroupName }));
      axios({
        method: 'post',
        url: '/p/cs/pm/v1/updatePmGroup',
        data: formData
      }).then(res => {
        console.log(res);
        if (res.data.code === 0) {
          self.$message.success('设置分组成功');
          self.closeDialog();
        } else {
          self.$message.error(res.data.message);
        }
      });
    },
    closeDialog() {
      this.itemdata.setGroupName = '';
      this.itemdata.radio = '1';
      this.$emit('closeDialog');
    }
  }
};
