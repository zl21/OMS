import matrix from '@/views/pages/common/orderDetail/matrix.vue';
import DragDialog from 'framework/components/dialog/dragDialog.vue';
import axios from 'framework/__utils__/request';
import port from '@/views/pages/common/orderDetail/connector.js';
// import store from '@/store';
import store from '@/config/store/store'; 

export default {
  props: {
    selectItem: {}, // tab信息
    objid: {}, // 主表ID
    tablename: {}, // 主表名
    objList: {}, // 用来查询配销中心
    /* isInputShow: {
      type: Boolean,
      default: false
    },//配置的数量框是否显示 */
    inputList: {}, // 配的数量字段名集合
    isdisabled: {
      type: Boolean,
      default: false
    }, // 用于判断状态是否变更
    isActive: Boolean, // 用来禁用input框的
    itemdata: {},
    save: {}, // 保存
    isCustom: {}, // 判断是定制界面里的矩阵还是配置的矩阵
    editsave: Boolean, // 判断编辑的时候主表是否保存完毕
    stopsave: Boolean // 停止矩阵保存
  },
  data() {
    return {
      visible: false, // select框
      sub: -1, // 下拉下标
      search: '', // 搜索
      lists: [], // select列表
      generalLoading: false, // 加载
      Dialog: false, // 弹框
      distribId: '', // 配销中心
      count: '', // 数量
      isInputShow: false, // 配置的数量框是否显示
      matrixcoll: '', // 数量字段名
      matrixnum: 1, // 默认数量,
      matrixInput: false, // 定制页面是否显示数量框
      judgeUser: false, // 判断是用户清空的还是我清空的
      customData: {}, // 定制页面新增时保存矩阵数据
      NoImport: false, // 表示点击选择的或entry选择的下拉值(true)
      singleData: {}, // 单条码定制界面新增
      judgeSingle: false, // 判断是单条码还是款号(true单条码)
      compositionFlag: false
    };
  },
  methods: {
    changeStopSave() {
      this.$emit('changeStopSave');
    }, // 初始化主表保存有错变量
    objectEdit() {
      this.$emit('objectEdit');
    }, // 告诉父组件先保存主表
    changeEditSave() {
      this.$emit('changeEditSave');
    }, // 初始化主表保存完毕的变量
    newLySave() {
      this.$emit('newLySave');
    }, // 触发保存
    changeSave(val) {
      this.$emit('changeSave', val);
    }, // 改变save
    countChange(event) {
      const value = event.target.value;
      const isNum = /^[0-9]*$/.test(value); // 判断输入的是否是数字
      this.$set(
        this,
        'count',
        (event.target.value = isNum && Number(value) !== 0 ? Number(value) : '')
      );
      if (this.objid == -1) {
        const index = this.inputList.findIndex(n => n.name === '数量');
        if (index != -1) {
          this.inputList[index].valuedata = this.count;
          this.$emit('getChangeItem', this.inputList[index]);
        }
      }
    }, // 数量改变
    getStyle() {
      return axios({
        url: port.judgePro,
        method: 'get',
        params: {
          param: {
            ECODE: this.search,
            CP_C_STORE_ID: this.distribId
          }
        }
      }).then((res) => {
        const data = res.data;
        if (data.code === 0) {
          return data.data;
        }
      });
    }, // 判断是条码还是商品编码
    changeHeight(val) {
    /* let height = Number.parseInt(this.$refs['popMatrix'].$el.style.height);
      this.$nextTick(() => {
        if (val.judge) {
          this.$refs['popMatrix'].$el.style.height = `${(height + val.count * 25) % 2 !== 1 ? height + val.count * 25 + 1 : height + val.count * 25}px`;
        } else {
          this.$refs['popMatrix'].$el.style.height = `${(height - val.count * 25) % 2 !== 1 ? height - val.count * 25 - 1 : height - val.count * 25}px`;
        }
      }) */
    }, // 计算高度
    generalLoadChange() {
      this.generalLoading = false;
    /* if (this.Dialog) {
        this.$nextTick(() => {
          let width = this.$refs['popMatrix'].$el.clientWidth;
          let height = this.$refs['popMatrix'].$el.clientHeight;
          this.$refs['popMatrix'].$el.style.width = width % 2 === 1 ? `${width + 1}px` : `${width}px`;
          this.$refs['popMatrix'].$el.style.height = height % 2 === 1 ? `${/!*port[this.tablename].hasStock? height + 50 : *!/height }px` : `${/!*port[this.tablename].hasStock? height + 51 : *!/height + 1}px`;
        })
      } */
    }, // 关闭通用的loading
    refreshData(val) {
      this.Dialog = false;
      if (!val.status) {
        if (val.clear) this.search = ''; // 清空数据
        return this.$refs.searchInput.focus(); // 取消直接关掉
      }
      this.search = '';
      this.judgeUser = true;
      this.$refs.searchInput.focus();
      /* this.$emit('objectSave'); */
      this.$emit('refreshGetData'); // 刷新数据
      this.$emit('refreshItem'); // 向上派发父组件刷新
    }, // 取消不刷新数据，确认刷新数据
    getData() {
      axios({
        url: '/p/cs/screenresult',
        method: 'post',
        data: {
          param: JSON.stringify({
            GLOBAL: this.search.toLocaleUpperCase(), // 搜索字段
            PAGENUM: 1,
            PAGESIZE: 10,
            CONDITION: {},
            TABLENAME: 'PS_C_PRO'
          })
        }
      }).then((res) => {
        const data = res.data;
        if (data.code === 0) {
          this.lists = data.data.list;
          this.loading = false;
          document.addEventListener('click', this.close);
        }
      });
    }, // 获取select数据
    optionClick(val, index) {
      this.NoImport = true;
      this.sub = -1;
      this.search = val.ECODE;
      this.visible = false;
    // this.entry();
    }, // 修改search
    handFocus(event) {
      if (event.target.value.trim() === '') return;
      this.visible = true;
      this.getData();
      event.stopPropagation();
    }, // 聚焦时触发事件
    keyinput(event) {
      if (this.compositionFlag) {
        if (event.target.value) {
          event.target.type = 'password';
        }
      }
    },
    keyup(event) {
      if (this.compositionFlag) {
        event.target.type = 'text';
        this.search = event.target.value;
        this.compositionFlag = false;
      } else {
        this.search = event.target.value;
      }
    },
    composition(event, type) {
      if (type === 'start') {
        this.compositionFlag = true;
      } else {
        this.compositionFlag = false;
      }
    },
    /* handBlur () {
      this.visible = false;
    },//商品编码input失焦 */
    entry() {
      this.findId(); // 查找配销中心
      this.NoImport = true;
      if (this.sub !== -1) {
        this.search = this.lists[this.sub].ECODE.toLocaleUpperCase();
        this.sub = -1;
      }
      if (this.search.trim() === '') return (this.visible = false);
      const index = this.inputList.findIndex(
        n => n.cusurl === 'custompage/matrix'
      );
      if (this.objid == -1) {
        if (index != -1 && this.inputList[index].matrix !== undefined) {
          this.$delete(this.inputList[index], 'matrix');
        }
      } // 新增先初始化
      this.visible = false; // 关闭下拉框
      if (this.distribId === '' || this.distribId === undefined) {
        return this.$message({
          message: '请先选择店仓',
          center: true,
          type: 'warning'
        }); 
      }
      this.getStyle().then((data) => {
        if (data === undefined) return;
        if (data.TYPE === 'proEcode') {
          // 商品编码
          this.Dialog = true;
          this.generalLoading = true;
          this.$refs.searchInput.blur();
          this.judgeSingle = false;
        } else {
          // SKU编码
          const obj = {};
          obj[
            this.tablename === 'DL_B_TRAN_OUT'
            || this.tablename === 'DL_B_TRAN_OUT_POS'
              ? port[this.tablename].special
              : port[this.tablename].tableName
          ] = {
            /* ID: this.selectItem.tableid,//子表ID */
            PS_C_SKU_ECODE: this.search, // SKU编码
            PS_C_SKU_ID: data.PS_C_SKU_ID // skuID
          };
          obj[
            this.tablename === 'DL_B_TRAN_OUT'
            || this.tablename === 'DL_B_TRAN_OUT_POS'
              ? port[this.tablename].special
              : port[this.tablename].tableName
          ][`${this.matrixcoll}`] = this.count === '' ? this.matrixnum : this.count; // 数量
          /* if (this.objid == -1) { */
          if (index !== -1) {
            if (this.inputList[index].matrix !== undefined) { this.$delete(this.inputList[index], 'matrix'); }
          /* this.$set(this.inputList[index],'matrix', Object.assign({},obj)); */
          }
          if (!this.isCustom) {
            this.$emit('objectEdit');
          } else {
            this.$emit('itemInputEnter');
          }
          this.newLySave();
          this.singleData = obj;
          this.judgeSingle = true;
        // return;
        /* } */
        }
      });
    }, // 判断是条码还是商品编码: 弹出通用矩阵
    close() {
      this.visible = false;
    }, // 关闭select
    stop(e) {
      e.stopPropagation();
    }, // 阻止冒泡
    selectOption(e) {
      const event = e;
      if (event.keyCode === 40) {
        // 下
        if (this.sub === this.lists.length - 1) return;
        this.sub++;
      } else if (event.keyCode === 38) {
        // 上
        if (this.sub === 0) return;
        this.sub--;
      }
    /* e.stopPropagation(); */
    }, // 快捷键选择编码
    findId() {
      if (Object.prototype.toString.call(this.objList) === '[object Array]') {
        let id = '';
        this.objList.map((obj) => {
          if (obj.childs) {
            obj.childs.map((data) => {
              if (data.colname === 'CP_C_STORE_ID') id = data.pid;
              if (id === '' && data.colname === 'CP_C_DEST_ID') id = data.pid;
              if (id === '' && data.colname === 'CP_C_ORIG_ID') id = data.pid;
            /* if(data.name === '配销中心') this.distribId = data.refobjid; */
            });
          }
        });
        this.distribId = id;
      }
    }, // 查询店仓ID
    amendData(val) {
      this.$emit('changeContent', Object.keys(val).length !== 0);
    },
    itemInputEnter() {
      this.$emit('getChangeItem', this.itemdata);
      this.$emit('itemInputEnter');
    }, // 新增时向上派发事件
    customize(val) {
      this.customData = val;
    } // 新增定制页面防止单对象数据未填完，处理矩阵不关闭的情况
  },
  watch: {
    inputList: {
      handler(val) {
        if (val[0].valuedata === '') this.search = '';
      },
      deep: true
    },
    visible(val) {
      if (val) {
        this.$el.addEventListener('keyup', this.selectOption);
      } else {
        this.$el.removeEventListener('keyup', this.selectOption);
        document.removeEventListener('click', this.close);
      }
    }, // 控制下拉
    search(val, oldval) {
      $('.pinyin').val(val);
      this.search = val.match(/[\w]*/gi)[0].toLocaleUpperCase();
      if (oldval.toLocaleUpperCase() === val) return;
      const index = this.inputList.findIndex(
        n => n.cusurl === 'custompage/matrix'
      );
      /* if(index !== -1) {
        this.$set(this.inputList[index],'valuedata', val);
        if(this.inputList[index].matrix !== undefined) this.$delete(this.inputList[index],'matrix');
      }
      if(this.objid == -1) {
        this.$emit('getChangeItem', this.itemdata);
      } */
      this.customData = {};
      this.$emit('noContent'); // 只用于定制页面保存用的（定制页面没有明细）
      if (this.objid == -1 && !this.judgeUser && index != -1) {
        this.$set(this.inputList[index], 'valuedata', val);
        if (this.inputList[index].matrix !== undefined) { this.$delete(this.inputList[index], 'matrix'); }
        this.$emit('getChangeItem', this.itemdata);
      } else {
        this.judgeUser = false;
      }
      if (this.search === '') return (this.visible = false); // 关闭select
      this.loading = true;
      if (this.NoImport) {
        this.NoImport = false;
      } else {
        this.visible = true;
      }
      this.getData();
    }, // 搜索字段
    Dialog(val) {
      if (!val) {
        this.$emit('changeContent', false);
      } else {
        this.customData = {}; // 清空定制页面矩阵的数据
        this.$emit('noContent');
      }
    }, // 监听弹框
    objList: {
      handler() {
        this.findId();
      },
      deep: true
    }, // 监听店仓的变化
    save(val) {
      if (val && this.isCustom) {
        this.$emit('noContent');
        /* 款号新增 */
        if (Object.keys(this.customData).length !== 0 && !this.judgeSingle) {
          axios({
            url: port[this.tablename].amendBody,
            method: 'post',
            data: {
              table:
                this.tablename === 'DL_B_TRAN_OUT_POS'
                  ? this.tablename.replace('_POS', '')
                  : this.tablename, // 表名
              objid: this.objid, // 主表ID
              data: JSON.stringify(this.customData)
            }
          })
            .then((res) => {
              const data = res.data;
              if (data.code === 0) {
                this.customData = {};
                this.search = ''; // 清空
                this.judgeUser = true; // 表示我手动清空的
              } else {
                let errorData;
                if (data.data) {
                  errorData = data.data;
                  errorData.unshift({ message: data.message });
                  store.commit('errorDialog', {
                    // 其它报错
                    message: { data: errorData }
                  });
                } else {
                  store.commit('errorDialog', {
                    // 其它报错
                    message: data.message
                  });
                }
                this.$emit('errorHasContent');
              }
              /* else if(data.message === undefined || (data.ext && data.ext.msgtype === 2)) {
                          let matrixData = res.data.data.error || res.data.data;
                          matrixData.unshift({message: res.data.message});
                          store.commit('errorDialog',{ //其它报错
                            message: {data: matrixData}
                          })
                        } */
              this.$emit('changeSave', false);
            })
            .catch(() => this.$emit('changeSave', false));
        /* this.$emit('changeSave', false) */
        }
        /* 单条码新增 */
        if (Object.keys(this.singleData).length !== 0 && this.judgeSingle) {
          axios({
            url: port[this.tablename].singleCode,
            method: 'post',
            data: {
              table: this.tablename, // 表名
              objid: this.objid, // 主表ID
              fixcolumn: JSON.stringify(this.singleData)
            }
          })
            .then((res) => {
              const resData = res.data;
              if (resData.code === 0) {
                this.$message({
                  message: '单条码新增成功',
                  center: true,
                  type: 'success'
                });
                this.search = '';
                this.count = '';
                this.singleData = {};
                this.$refs.searchInput.focus();
              } else {
                this.$emit('errorHasContent');
                let errorData;
                if (resData.data) {
                  errorData = resData.data;
                  errorData.unshift({ message: resData.message });
                  store.commit('errorDialog', {
                    // 其它报错
                    message: { data: errorData }
                  });
                } else {
                  store.commit('errorDialog', {
                    // 其它报错
                    message: resData.message
                  });
                }
              }
              this.$emit('changeSave', false);
            })
            .catch(() => this.$emit('changeSave', false)); // 直接触发保存接口并刷新数据
        }
      }
    }, // 新增定制界面保存
    editsave(val) {
      if (this.judgeSingle && val) {
        axios({
          url: port[this.tablename].singleCode,
          method: 'post',
          data: {
            table: this.tablename, // 表名
            objid: this.objid, // 主表ID
            fixcolumn: JSON.stringify(this.singleData)
          }
        })
          .then((res) => {
            const resData = res.data;
            if (resData.code === 0) {
              this.$message({
                message: '单条码新增成功',
                center: true,
                type: 'success'
              });
              this.search = '';
              this.count = '';
              this.$refs.searchInput.focus();
              this.$emit('refreshGetData'); // 更新数据
              this.$emit('refreshItem'); // 向上派发父组件刷新
            } else {
              let errorData;
              if (resData.data) {
                errorData = resData.data;
                errorData.unshift({ message: resData.message });
                store.commit('errorDialog', {
                  // 其它报错
                  message: { data: errorData }
                });
              } else {
                store.commit('errorDialog', {
                  // 其它报错
                  message: resData.message
                });
              }
            }
            this.$emit('changeEditSave');
          })
          .catch(() => this.$emit('changeEditSave')); // 直接触发保存接口并刷新数据
      }
    }
  },
  components: {
    matrix,
    DragDialog
  },
  mounted() {
    this.inputList.map((obj) => {
      if (obj.name === '数量') {
        this.matrixcoll = obj.colname;
        this.matrixnum = obj.defnum; // 默认数量
        this.isInputShow = obj.qtyisshow;
      }
    });
    if (this.isCustom) {
      this.matrixInput = port[this.tablename].matrixInput; // 定制界面的数量框是否显示
    }
  },
  activated() {
    $('.ff-search-input.pinyin').val(this.search);
  }
};
