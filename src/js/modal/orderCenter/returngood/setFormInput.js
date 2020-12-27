import axios from 'axios';
export default {
  data() {
    return {
      childArr: [],
      btnConfig: {
        typeAll: 'error', //按钮统一风格样式
        btnsite: 'right', //按钮位置 (right , center , left)
        buttons: [
          {
            type: '', //按钮类型
            text: '确定', //按钮文本
            icon: '', //按钮图标
            size: 'small', //按钮大小
            disabled: false, //按钮禁用控制
            btnclick: () => {} //按钮点击事件
          },
          {
            type: '',//按钮类型
            text: '取消', //按钮文本
            icon: '', //按钮图标
            size: 'small', //按钮大小
            disabled: false, //按钮禁用控制
            btnclick: () => {
              // this.$refs.changeLogistics.close();
              this.$parent.$parent.closeConfirm();
            } //按钮点击事件
          }
        ]
      },
      dragList: [],
      typeName: ''
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
    const node = document.querySelector('#setContainer');
    const draging = null;
    node.ondragstart = function(event) {
      event.dataTransfer.setData('te', event.target.innerText);
      draging = event.target;
    };
    node.ondragover = function(event) {
      event.preventDefault();
      const target = event.target;
      if (target.nodeName === 'LI' && target !== draging) {
        if (self._index(draging) < self._index(target)) {
          target.parentNode.insertBefore(draging, target.nextSibling);
        } else {
          target.parentNode.insertBefore(draging, target);
        }
      }
      const parentNode = document.getElementById('setContainer').childNodes;
      const childArr = [];
      for (let i = 0; i < parentNode.length; i++) {
        childArr[i] = {
          isfilter: parentNode[i].getAttribute('isfilter') == null ? false : true,
          label: parentNode[i].getAttribute('label'),
          orderno: (i + 1) * 10,
          colname: parentNode[i].getAttribute('colname'),
          id: parentNode[i].getAttribute('id')
        };
      }
      self.childArr = childArr;
    };
    // 完成拖拽后
    node.ondrop = function(event) {
      const param = {
        tableName: self.typeName,
        useronfigList: self.childArr
      };
      console.log(param);
      axios({
        url: '/p/cs/saveQueryListConfig',
        method: 'post',
        data: param
      }).then(res => {
        self.$parent.$parent.$parent.getHeaderList();
      });
    };
  },
  methods: {
    saveDragData() {
      const self = this;
      if (self.childArr.length !== 0) {
        // 保存
        const param = {
          tableName: self.typeName,
          useronfigList: self.childArr
        };
        axios({
          url: '/p/cs/saveQueryListConfig',
          method: 'post',
          data: param
        }).then(res => {
          if (res.data.code === 0) {
            // self.$Message.success("保存成功");
            self.$parent.$parent.$parent.getHeaderList();
          } else {
            self.$Message.warning(res.data.message);
          }
        });
      }
    },

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
      const index = 0;
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
        url: '/p/cs/saveQueryListConfig',
        method: 'post',
        data: param
      }).then(res => {
        self.$parent.$parent.$parent.getHeaderList();
      });
    }
  },
  created() {
    const _this = this;
    window.addEventListener('keydown', e => {
      let key = e.keyCode;
      if (key == 13) {
        _this.$parent.$parent.closeConfirm();
      } else if (key == 27) {
        _this.$parent.$parent.closeConfirm();
      }
    });
  },
  destroyed() {
    window.removeEventListener('keydown', this, false);
  }
};
