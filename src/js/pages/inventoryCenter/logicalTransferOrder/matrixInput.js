// import R3 from '@syman/burgeon-r3';
// import DragDialog from 'framework/components/dialog/dragDialog.vue';
import matrix from '@/views/pages/inventoryCenter/logicalTransferOrder/matrixPop';

const {store} = R3;
const port = require('@/config/config/orderDetailConnector').default;

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
    stopsave: Boolean, // 停止矩阵保存
  },
  data() {
    return {
      shippingWarehouse: port[this.tablename].shippingWarehouse || '', // 发货店仓取值字段
      visible: false, // select框
      sub: -1, // 下拉下标
      search: '', // 搜索
      lists: [], // select列表
      generalLoading: false, // 加载
      Dialog: false, // 弹框
      distribId: '', // 配销中心
      cp_c_phy_warehouse_id: '', // add by  wdq 20190521   实体仓逻辑
      count: '', // 数量
      isInputShow: false, // 配置的数量框是否显示
      hideCommodityInput: port[this.tablename].hideCommodityInput, // 商品编码输入框是否隐藏  (分货单的不要显示)
      matrixcoll: '', // 数量字段名
      matrixnum: 1, // 默认数量,
      matrixInput: false, // 定制页面是否显示数量框
      judgeUser: false, // 判断是用户清空的还是我清空的
      customData: {}, // 定制页面新增时保存矩阵数据
      NoImport: false, // 表示点击选择的或entry选择的下拉值(true)
      singleData: {}, // 单条码定制界面新增
      judgeSingle: false, // 判断是单条码还是款号(true单条码)
      compositionFlag: false,
    };
  },
  methods: {
    changeStopSave() {
      this.$emit('changeStopSave');
    }, // 初始化主表保存有错变量
    objectEdit(data) {
      this.$emit('objectEdit', data);
    }, // 告诉父组件先保存主表
    changeEditSave() {
      this.$emit('changeEditSave');
    }, // 初始化主表保存完毕的变量
    newLySave(e) {
      this.$emit('newLySave', e);
    }, // 触发保存
    changeSave(val) {
      this.$emit('changeSave', val);
    }, // 改变save
    countChange(event) {
      const value = event.target.value;
      const isNum = /^[0-9]*$/.test(value);// 判断输入的是否是数字
      this.$set(this, 'count', event.target.value = (isNum && Number(value) !== 0) ? Number(value) : '');
      if (this.objid == -1) {
        const index = this.inputList.findIndex(n => n.name === $it('tL.quantities'));
        if (index != -1) {
          this.inputList[index].valuedata = this.count;
          this.$emit('getChangeItem', this.inputList[index]);
        }
      }
    }, // 数量改变
    async getStyle() {
      console.log('port.judgePro', port.judgePro);
      // 修改后已验证
      const params = {
        param: {
          ECODE: this.search,
          // CP_C_STORE_ID: this.distribId,
          CP_C_PHY_WAREHOUSE_ID: this.cp_c_phy_warehouse_id
        }
      };
      if (!port[this.tablename].paramsNoStore) {
        params.param.CP_C_STORE_ID = this.distribId
      }
      this.generalLoading = true
      const {data: {code, data}} = await this.service.common.publicUrlParamsGet(port.judgePro, {params});
      if (code === 0) {
        return data;
      }
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
        if (val.clear) this.search = '';// 清空数据
        return this.$refs.searchInput.focus();// 取消直接关掉
      }
      this.search = '';
      this.judgeUser = true;
      this.$refs.searchInput.focus();
      /* this.$emit('objectSave'); */
      this.$emit('refreshGetData');// 刷新数据
      this.$emit('refreshItem');// 向上派发父组件刷新
    }, // 取消不刷新数据，确认刷新数据
    async getData() {
      const formdata = new FormData();
      const param = {
        GLOBAL: this.search.toLocaleUpperCase(), // 搜索字段
        PAGENUM: 1,
        PAGESIZE: 10,
        CONDITION: {},
        TABLENAME: 'PS_C_PRO'
      };
      formdata.append('param', JSON.stringify(param));
      const res = await this.service.common.screenresult(formdata);
      const data = res.data;
      if (data.code === 0) {
        this.lists = data.data.list;
        this.loading = false;
        document.addEventListener('click', this.close);
      }
    }, // 获取select数据
    optionClick(val, index) {
      this.NoImport = true;
      this.sub = index;
      this.search = val.ECODE;
      this.visible = false;
      this.entry();
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
      this.findId();
      this.NoImport = true;
      if (this.sub !== -1) {
        this.sub > this.lists.length - 1
          ? (this.lists.length === 0 ? '' : this.search = this.lists[0].ECODE.toLocaleUpperCase())
          : this.search = this.lists[this.sub].ECODE.toLocaleUpperCase();
        this.sub = -1;
      }
      if (this.search.trim() === '') return this.visible = false;
      const index = this.inputList.findIndex(n => n.cusurl === 'custompage/matrix');
      if (this.objid == -1) {
        if (index != -1 && this.inputList[index].matrix !== undefined) {
          this.$delete(this.inputList[index], 'matrix');
        }
      }// 新增先初始化
      this.visible = false;// 关闭下拉框
      console.log(111, this.distribId, this.cp_c_phy_warehouse_id, port[this.tablename].isStoreId, port[this.tablename].hasStock)
      if ((this.distribId === '' || this.distribId === undefined)
        && (this.cp_c_phy_warehouse_id === '' || this.cp_c_phy_warehouse_id === undefined)
        && !port[this.tablename].isStoreId
        && port[this.tablename].hasStock) { // 店仓id为空 或者 isStoreId参数为false
        return this.$message({
          message: $it('tip.dh'), // '请先选择店仓',
          center: true,
          type: 'warning'
        });
      }
      this.getStyle().then((data) => {
        console.log('data', data);
        this.generalLoading = false
        if (data === undefined) return;
        if (data.TYPE === 'proEcode') { // 商品编码
          this.Dialog = true;
          this.$refs.searchInput.blur();
          this.judgeSingle = false;
        } else { // SKU编码
          const obj = {};
          obj[(this.tablename === 'DL_B_TRAN_OUT' || this.tablename === 'DL_B_TRAN_OUT_POS') ? port[this.tablename].special : port[this.tablename].tableName] = [{
            /* ID: this.selectItem.tableid,//子表ID */
            PS_C_SKU_ECODE: this.search, // SKU编码
            // PS_C_SKU_ID: data.PS_C_SKU_ID, // skuID
            ID: -1, // skuID
          }];
          obj[(this.tablename === 'DL_B_TRAN_OUT' || this.tablename === 'DL_B_TRAN_OUT_POS') ? (port[this.tablename].special) : port[this.tablename].tableName][`${this.matrixcoll}`] = this.count === '' ? this.matrixnum : this.count;// 数量
          if (this.objid == -1) {
            if (index !== -1) {
              if (this.inputList[index].matrix !== undefined) this.$delete(this.inputList[index], 'matrix');
              const QTY = this.inputList.findIndex(n => n.colname === 'QTY');
              if (QTY !== -1) {
                this.$set(this.inputList[QTY], 'valuedata', this.count === '' ? this.matrixnum : this.count);
                this.$emit('getChangeItem', this.inputList[QTY]);
              }
              /* this.$set(this.inputList[index],'matrix', Object.assign({},obj)); */
            }
            this.$emit('itemInputEnter', {
              PS_C_SKU_ECODE: this.search,
              PS_C_SKU_ID: data.PS_C_SKU_ID,
              QTY: 1
            });/* 专为促销而增向上传递数据 */
            this.singleData = obj;
            this.judgeSingle = true;
            this.newLySave(obj);
          } else {
            this.singleData = obj;
            this.judgeSingle = true;
            this.$emit('objectEdit', this.singleData);
          }
        }
      });// 查找配销中心
    }, // 判断是条码还是商品编码: 弹出通用矩阵
    close() {
      this.visible = false;
    }, // 关闭select
    stop(e) {
      e.stopPropagation();
    }, // 阻止冒泡
    selectOption(e) {
      const event = e;
      if (event.keyCode === 40) { // 下
        if (this.sub === this.lists.length - 1) return;
        this.sub++;
      } else if (event.keyCode === 38) { // 上
        if (this.sub === 0) return;
        this.sub--;
      }
      /* e.stopPropagation(); */
    }, // 快捷键选择编码
    findId() {
      if (!this.distribId) {
        const str = this.$route.path.split('/');
        const formData = document.querySelector(`#${str[4]}-${str[5]}-${str[6]}`).__vue__.formData
        this.distribId = formData.SENDER_STORE_ID || formData.CP_C_DEST_ID || formData.CP_C_ORIG_ID || formData[this.shippingWarehouse];
        console.log(formData)
      }

      /* let id = '';
       const data = this.selectItem.updateData[this.tablename];
       if (this.$route.params.itemId == 'New' && Object.keys(data.add).length !== 0) {
         if (data.add[this.tablename].CP_C_STORE_ID) id = data.add[this.tablename].CP_C_STORE_ID;
         if (!id && data.add[this.tablename].CP_C_DEST_ID) id = data.add[this.tablename].CP_C_DEST_ID;
         if (!id && data.add[this.tablename].SENDER_STORE_ID) id = data.add[this.tablename].SENDER_STORE_ID;
         if (!id && data.add[this.tablename].CP_C_PHY_WAREHOUSE_ID) this.cp_c_phy_warehouse_id = data.add[this.tablename].CP_C_PHY_WAREHOUSE_ID;
       } else if (Object.keys(data.modify).length !== 0) {
         if (Object.keys(data.default).length && data.modify[this.tablename].CP_C_STORE_ID) id = data.modify[this.tablename].CP_C_STORE_ID;
         if (!id && data.modify[this.tablename].CP_C_DEST_ID) id = data.modify[this.tablename].CP_C_DEST_ID;
         if (!id && data.modify[this.tablename].SENDER_STORE_ID) id = data.modify[this.tablename].SENDER_STORE_ID;
         if (!id == '' && data.modify[this.tablename].CP_C_PHY_WAREHOUSE_ID) this.cp_c_phy_warehouse_id = data.modify[this.tablename].CP_C_PHY_WAREHOUSE_ID;
       }
       if (!id && Object.keys(data.default).length !== 0) {
         if (data.default[this.tablename].CP_C_STORE_ID) id = data.default[this.tablename].CP_C_STORE_ID;
         if (!id && data.default[this.tablename].CP_C_DEST_ID) id = data.default[this.tablename].CP_C_DEST_ID;
         if (!id && data.default[this.tablename].SENDER_STORE_ID) id = data.default[this.tablename].SENDER_STORE_ID;
         if (!id && data.default[this.tablename].CP_C_PHY_WAREHOUSE_ID) this.cp_c_phy_warehouse_id = data.default[this.tablename].CP_C_PHY_WAREHOUSE_ID;
       }

       this.distribId = id;*/

      //   if (Object.prototype.toString.call(this.objList) === '[object Array]') {
      //     let id = '';
      //     this.objList.map((obj) => {
      //       if (obj.childs) {
      //         obj.childs.map((data) => {
      //           if (data.colname === 'CP_C_STORE_ID') id = data.pid;
      //           if (id === '' && data.colname === 'CP_C_DEST_ID') id = data.pid;
      //           if (id === '' && data.colname === 'SENDER_STORE_ID') id = data.pid;
      //           if (data.colname === 'CP_C_PHY_WAREHOUSE_ID') this.cp_c_phy_warehouse_id = data.pid;
      //           /* if(data.name === '配销中心') this.distribId = data.refobjid; */
      //         });
      //       }
      //     });
      //     this.distribId = id;
      //   }
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
    }, // 新增定制页面防止单对象数据未填完，处理矩阵不关闭的情况
  },
  watch: {
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
      this.search = val.match(/[\w,-]*/ig)[0].toLocaleUpperCase();
      if (oldval.toLocaleUpperCase() === val) return;
      const index = this.inputList.findIndex(n => n.cusurl === 'custompage/matrix');
      /* if(index !== -1) {
        this.$set(this.inputList[index],'valuedata', val);
        if(this.inputList[index].matrix !== undefined) this.$delete(this.inputList[index],'matrix');
      }
      if(this.objid == -1) {
        this.$emit('getChangeItem', this.itemdata);
      } */
      this.customData = {};
      this.$emit('noContent');// 只用于定制页面保存用的（定制页面没有明细）
      if (this.objid == -1 && !this.judgeUser && index != -1) {
        this.$set(this.inputList[index], 'valuedata', val);
        if (this.inputList[index].matrix !== undefined) this.$delete(this.inputList[index], 'matrix');
        this.$emit('getChangeItem', this.itemdata);
      } else {
        this.judgeUser = false;
      }
      if (this.search === '') return this.visible = false;// 关闭select
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
        this.customData = {};// 清空定制页面矩阵的数据
        this.$emit('noContent');
      }
    }, // 监听弹框
    objList: {
      handler() {
        this.findId();
      },
      deep: true
    }, // 监听店仓的变化
    async save(val) {
      if (val && this.isCustom) {
        this.$emit('noContent');
        /* 款号新增 */
        if (Object.keys(this.customData).length !== 0 && !this.judgeSingle) {
          // matrixApi
          const params = {
            table: this.tablename === 'DL_B_TRAN_OUT_POS' ? this.tablename.replace('_POS', '') : this.tablename, // 表名
            objid: this.objid, // 主表ID
            data: JSON.stringify(this.customData)
          };
          try {
            // 修改后未验证
            const res = await this.service.common.publicUrlParams(port[this.tablename].amendBody, params);
            const data = res.data;
            if (data.code === 0) {
              this.customData = {};
              this.search = '';// 清空
              this.judgeUser = true;// 表示我手动清空的
            } else {
              let errorData;
              if (data.data) {
                errorData = data.data;
                errorData.unshift({message: data.message});
                store.commit('errorDialog', { // 其它报错
                  message: {data: errorData}
                });
              } else {
                store.commit('errorDialog', { // 其它报错
                  message: data.message
                });
              }
              this.$emit('errorHasContent');
            }
            this.$emit('changeSave', false);
          } catch (error) {
            this.$emit('changeSave', false);
          }
        }
        /* 单条码新增 */
        if (Object.keys(this.singleData).length !== 0 && this.judgeSingle) {
          const params = {
            table: this.tablename, // 表名
            objid: this.objid, // 主表ID
            fixcolumn: JSON.stringify(this.singleData)
          };
          try {
            const res = await this.service.common.publicUrlParams(port[this.tablename].singleCode, params);
            const resData = res.data;
            if (resData.code === 0) {
              this.$message({
                message: $it('tip.dg'),
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
                errorData.unshift({message: resData.message});
                store.commit('errorDialog', { // 其它报错
                  message: {data: errorData}
                });
              } else {
                store.commit('errorDialog', { // 其它报错
                  message: resData.message
                });
              }
            }
          } catch (error) {
            this.$emit('changeSave', false);
          }
        }
      }
    }, // 新增定制界面保存
    async editsave(val) {
      if (this.judgeSingle && val) {
        this.judgeSingle = false;// 初始化
        try {
          const res = await this.service.common.publicUrlParams(port[this.tablename].singleCode, {
            table: this.tablename, // 表名
            objid: this.objid, // 主表ID
            fixcolumn: JSON.stringify(this.singleData)
          });
          const resData = res.data;
          if (resData.code === 0) {
            this.$message({
              message: $it('tip.dg'),
              center: true,
              type: 'success'
            });
            this.search = '';
            this.count = '';
            this.singleData = {}; // 清空单条码新增数据
            this.$refs.searchInput.focus();
            this.$emit('refreshGetData');// 更新数据
            this.$emit('refreshItem');// 向上派发父组件刷新
          } else {
            let errorData;
            if (resData.data) {
              errorData = resData.data;
              errorData.unshift({message: resData.message});
              store.commit('errorDialog', { // 其它报错
                message: {data: errorData}
              });
            } else {
              store.commit('errorDialog', { // 其它报错
                message: resData.message
              });
            }
          }
          this.$emit('changeEditSave');
        } catch (error) {
          this.$emit('changeEditSave');
        }
      }
    }
  },
  components: {
    matrix,
    DragDialog: $R3_CPS.components.dragDialog
  },
  mounted() {
    this.inputList.map((obj) => {
      if (obj.name === $it('tL.quantities')) {
        this.matrixcoll = obj.colname;
        this.matrixnum = obj.defnum;// 默认数量
        this.isInputShow = obj.qtyisshow;
      }
    });
    if (this.isCustom) {
      this.matrixInput = port[this.tablename].matrixInput;// 定制界面的数量框是否显示
    }
  },
  activated() {
    /* $('.ff-search-input.pinyin').val(this.search) */
  }
};
