import axios from 'axios';
import { listeningToKeydownMixin } from '@/assets/js/mixins/listeningToKeydown';

export default {
  mixins: [listeningToKeydownMixin],
  data() {
    return {
      vmI18n: window.vmI18n,
      childArr: [],
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: window.vmI18n.t('common.cancel'), // 取消 按钮文本
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            } // 按钮点击事件
          },
          {
            type: '', // 按钮类型
            text: window.vmI18n.t('common.determine'), // 确定 按钮文本
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {} // 按钮点击事件
          }
        ]
      },
      dragList: []
    };
  },
  props: {
    componentData: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    const self = this;
    // 请求数据
    self.typeName = self.componentData.typeName;
    self.getData();
    const node = document.querySelector('#container');
    let draging = null;
    node.ondragstart = event => {
      event.dataTransfer.setData('te', event.target.innerText);
      draging = event.target;
    };
    node.ondragover = event => {
      event.preventDefault();
      const target = event.target;
      if (target.nodeName === 'LI' && target !== draging) {
        if (self._index(draging) < self._index(target)) {
          target.parentNode.insertBefore(draging, target.nextSibling);
        } else {
          target.parentNode.insertBefore(draging, target);
        }
      }
      const parentNode = document.getElementById('container').childNodes;
      const childArr = [];
      for (let i = 0; i < parentNode.length; i++) {
        childArr[i] = {
          isfilter: parentNode[i].getAttribute('isfilter') != null,
          label: parentNode[i].getAttribute('label'),
          orderno: (i + 1) * 10,
          colname: parentNode[i].getAttribute('colname'),
          id: parentNode[i].getAttribute('id')
        };
      }
      self.childArr = childArr;
    };
    // 完成拖拽后
    node.ondrop = () => {
      const param = {
        tableName: self.typeName,
        useronfigList: self.childArr
      };
      axios({
        url: '/api/cs/oc/oms/v1/saveQueryListConfig',
        method: 'post',
        data: param
      }).then(() => {
        self.$parent.$parent.$parent.getHeaderList();
      });
    };
  },
  methods: {
    onKeyDown(e) {
      if (e.keyCode == 27) {
        this.$parent.$parent.closeConfirm();
        this.$parent.$parent.$parent.publicBouncedIndex = {
          name: 'testModal'
        };
      }
    },
    saveDragData() {
      const self = this;
      if (self.childArr.length !== 0) {
        // 保存
        const param = {
          tableName: self.typeName,
          useronfigList: self.childArr
        };
        axios({
          url: '/api/cs/oc/oms/v1/saveQueryListConfig',
          method: 'post',
          // cancelToken: true,
          data: param
        }).then(res => {
          if (res.data.code === 0) {
            // self.$Message.success("保存成功");
            self.$parent.$parent.$parent.getHeaderList();
          } else {
            self.$Message.warning({
              content: res.data.message,
              duration: 5,
              top: 80
            });
          }
        });
      }
    },
    // 获取拖拽数据
    getData() {
      const self = this;
      const fromdata = new FormData();
      const param = {
        table: self.typeName,
        column_include_uicontroller: true,
        fixedcolumns: {},
        multiple: [],
        startindex: 0
      };
      fromdata.append('param', JSON.stringify(param));
      axios({
        url: '/api/cs/oc/oms/v1/queryListConfig',
        method: 'post',
        data: fromdata
      }).then(res => {
        const formArr = [];
        res.data.date.forEach((item, index) => {
          formArr[index] = {
            isfilter: item.tabth.isfilter,
            label: item.tabth.name,
            orderno: item.tabth.orderno,
            colname: item.tabth.colname,
            id: item.tabth.colid
          };
        });
        self.dragList = formArr;
      });
    },
    //
    _index(el) {
      let index = 0;
      if (!el || !el.parentNode) {
        return -1;
      }
      while (el && (el = el.previousElementSibling)) {
        index++;
      }
      return index;
    },
    // 判断当前是否显示
    checkbox(e, item) {
      const self = this;
      self.dragList.forEach(ele => {
        if (item.label === ele.label) {
          if (e.target.checked) {
            ele.isfilter = true;
          } else {
            ele.isfilter = false;
          }
        }
      });
      // 保存
      const param = {
        tableName: self.typeName,
        useronfigList: self.dragList
      };
      console.log(param);
      axios({
        url: '/api/cs/oc/oms/v1/saveQueryListConfig',
        method: 'post',
        data: param
      }).then(res => {
        console.log(res);
        // self.$parent.$parent.$parent.getHeaderList();
      });
    }
  }
};
