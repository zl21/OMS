import myInputLd from 'framework/components/element/input';

export default {
  name: 'DialogVisible',
  data() {
    return {
      vmI18n:$i18n,
      buttonConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [{
            type: '', // 按钮类型
            text: $it('common.cancel'), // 取消
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.closeDialog();
            } // 按钮点击事件
          },
          {
            type: '', // 按钮类型
            text: $it('common.determine'), // 确定
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.confirm();
            } // 按钮点击事件
          }
        ]
      },
      itemdata: {
        name: `${$it('table_label.groupName')}：`, // '分组名称：'
        setGroupName: '',
        radio: '1'
      },
      visible: true,
      tableData: [],
      headOne: [{
          label: $it('form_label.activityName'), // '活动名称',
          name: 'ENAME'
        },
        {
          label: $it('table_label.participating_stores'), // '参与店铺',
          name: 'SHOP_NAME'
        },
        {
          label: $it('table_label.original_groupName'), // '原分组名称',
          name: 'PM_GROUP'
        },
        {
          label: $it('table_label.priority'), // '优先级',
          name: 'PM_PRIORITY'
        }
      ],
      headTwo: [{
          label: $it('form_label.activityName'), // '活动名称',
          name: 'ENAME'
        },
        {
          label: $it('table_label.participating_stores'), // '参与店铺',
          name: 'SHOP_NAME'
        },
        {
          label: $it('table_label.original_groupName'), // '原分组名称',
          name: 'PM_GROUP'
        }
      ],
      tHead: [{
          label: $it('form_label.activityName'), // '活动名称',
          name: 'ENAME'
        },
        {
          label: $it('table_label.participating_stores'), // '参与店铺',
          name: 'SHOP_NAME'
        },
        {
          label: $it('table_label.original_groupName'), // '原分组名称',
          name: 'PM_GROUP'
        },
        {
          label: $it('table_label.priority'), // '优先级',
          name: 'PM_PRIORITY'
        }
      ]
      // dialogVisible:true
    };
  },
  props: ['dialogVisible', 'checkList', 'setGroupTableData'],
  components: {
    myInputLd,
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
    del(scope) {
      console.log(scope);
      this.tableData.splice(scope.$index, 1);
    },
    async confirm() {
      const self = this;
      const mapArr = [];
      const promActis = [];
      if (this.itemdata.radio == 1 && this.itemdata.setGroupName == '') {
        self.$Message.warning($it('modalTips.es')); // '请填写分组名称'
        return;
      }
      self.tableData.forEach(item => {
        mapArr.push(Number(item.PM_PRIORITY));
        promActis.push({
          id: item.ID,
          pm_priority: item.PM_PRIORITY
        });
      });
      const setArr = new Set(mapArr); // 去重复
      console.log(setArr.size < mapArr.length ? '有重复' : '无重复');
      if (setArr.size < mapArr.length) {
        self.$Message.warning($it('modalTips.et')); // '有重复优先级'
        return;
      }
      const formData = new FormData();
      formData.append('param', JSON.stringify({
        promActis,
        group_status: this.itemdata.radio,
        pm_group: this.itemdata.setGroupName
      }));
      const {
        data: {
          code,
          message
        }
      } = await this.service.promotionCenter.updatePmGroup(formData);
      if (code === 0) {
        self.$Message.success($it('modalTips.eu')); // '设置分组成功'
        self.closeDialog();
      } else {
        self.$Message.error(message);
      }
    },
    closeDialog() {
      this.itemdata.setGroupName = '';
      this.itemdata.radio = '1';
      this.$emit('closeDialog');
    }
  }
};
