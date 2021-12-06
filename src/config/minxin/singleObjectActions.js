export default () => ({
  updated() {
    const { itemId, tableId, tableName } = this.$router.currentRoute.params;
    if (tableName === 'OC_B_COMPENSATE_ORDER') { // 判断是否为需要操作的表
      setTimeout(() => {
        const { detail } = R3.store.state.customize.COMPENSATE;
        // R3.store.commit('customize/REDUNDANT_ORDER_ID', 'zhoulan');
        // R3.store.commit('customize/COMPENSATE', { detail: [] });
      }, 500);
    }
    // 隐藏标准保存按钮
    let tableNameArr = ['OC_B_COMPENSATE_ORDER', 'OC_B_REFUND_ORDER_EXTRA'];
    if (tableNameArr.includes(tableName)) {
      const actionMODIFY = document.getElementById('actionMODIFY');
      if (actionMODIFY) actionMODIFY.style.display = 'none';
    }

    // 隐藏刷新
    let tableNameA = ['PS_C_SPECGROUP'];
    if (tableNameA.includes(tableName)) {
      const ActionMODIFY = document.getElementById('refresh');
      if (ActionMODIFY) ActionMODIFY.style.display = 'none';
    }
    // 刷新子表
    // if (tableName === 'OC_B_REFUND_ORDER_EXTRA' && itemId == 'New' ) { // 判断是否为需要操作的表
      // R3.store.commit('customize/clear', true);
    // }
  },
  methods: {
    PAYSAVE() {
      setTimeout(async () => {
        let ID = this.$route.params.itemId;
        let main, obj, modifyData, flag;
        if (ID == 'New') {
          ID = '-1';
          main = this.$store.state["V.OC_B_COMPENSATE_ORDER.10813.New"].updateData.OC_B_COMPENSATE_ORDER.changeData;
          main.ID = '-1';
          for (const key in main) {
            if (main[key] instanceof Array && main[key].length) {
              main[key] = main[key][0].ID || '';
            }
          }
        } else {
          main = {};
          obj = {};
          const key = `V.OC_B_COMPENSATE_ORDER.10813.${ID}`;
          const form = this.$store.state[key].mainFormInfo.formData.data.addcolums[1].childs;
          const form2 = this.$store.state[key].mainFormInfo.formData.data.addcolums[2].childs;
          form.forEach(it => {
            obj[it.colname] = it.valuedata;
            if (it.isfk) obj[it.colname] = it.refobjid;
          })
          form2.forEach(it => {
            obj[it.colname] = it.valuedata;
            if (it.isfk) obj[it.colname] = it.refobjid;
          })
          Object.assign(main, obj); // 详情-主表未修改前数据
          const defaultData = this.$store.state[key].updateData.OC_B_COMPENSATE_ORDER.default.OC_B_COMPENSATE_ORDER; // 详情-主表未修改前数据
          const updateData = this.$store.state[key].updateData.OC_B_COMPENSATE_ORDER.changeData; // 详情-主表修改后数据（含复杂类型
          modifyData = this.$store.state[key].updateData.OC_B_COMPENSATE_ORDER.modify.OC_B_COMPENSATE_ORDER; // 详情-主表修改后数据
          Object.assign(main, modifyData); // 详情-主表未修改前数据
          // 主表数据特殊处理：
          delete main.OWNERID
          main.ID = ID;
        }
        // 必填校验
        if (!main.CP_C_PHY_WAREHOUSE_ID) return this.$Message.warning($it('tip.ks')) //'实体仓库为必填项，请填写后保存！'
        if (ID != '-1' && !main.ACTUAL_COMPENSATE_FEE) return this.$Message.warning($it('tip.kt')) //'实际赔付金额为必填项，请填写后保存！'
        const payData = R3.store.state.customize.COMPENSATE;
        main.REDUNDANT_ORDER_ID = payData.other.orderId;
        const OC_B_COMPENSATE_ORDER_ITEM = payData.detail;
        const IDS = R3.store.state.customize.COMPENSATE.deleteIds;
        if (ID != '-1' && !Object.keys(modifyData).length && !IDS.length && !OC_B_COMPENSATE_ORDER_ITEM.length) {
          return // 未修改 点保存无反应
        }
        if (!OC_B_COMPENSATE_ORDER_ITEM.length) {
          this.$Message.warning('请添加商品明细！');
          return
        } else {
          for (const i of OC_B_COMPENSATE_ORDER_ITEM) {
            if (i.COMPENSATE_AMT == '0.00' || i.COMPENSATE_AMT == 0) {
              this.$Message.warning('明细赔付金额不能为0，请重新录入！');
              flag = true;
              break
            }
          }
          if (flag) return
        }
        const { data: { code, data, message } } = await this.service.orderCenter.paySaveApi({ OC_B_COMPENSATE_ORDER: main, OC_B_COMPENSATE_ORDER_ITEM, IDS }).catch(e => {
          console.error('save error !');
        });
        if (code == 0) {
          this.$Message.success(message);
          R3.store.commit('customize/COMPENSATE', { detail: []}); // 清空明细
          setTimeout(() => {
            /* 
            const _self = this;
            const { fullPath } = _self.$route;
            const { keepAliveModuleName, tableName } = _self.$store.state.global.activeTab;
            R3.store.commit('global/tabCloseAppoint', {
              routeFullPath: fullPath,
              stopRouterPush: true,
              keepAliveModuleName,
              tableName
            });
            */
            if (ID == '-1') {
              $omsUtils.tabCloseAppoint(this);
              this.$destroy(true);
              this.$store.commit("global/tabOpen", {
                id: data.objId,
                type: "V",
                tableName: "OC_B_COMPENSATE_ORDER",
                tableId: '10813'
              });
            } else {
              $omsUtils.tabCloseAppoint(this);
              this.$destroy(true);
              this.$store.commit("global/tabOpen", {
                type: "S",
                tableName: "OC_B_COMPENSATE_ORDER",
                tableId: '10813',
                back: true,
              });
            }
          }, 200);
        }
      }, 100);
    },
    async EXTRASAVE(){
      let {itemId,tableId,tableName} = this.$route.params;
      let routeUrl = `V.${tableName}.${tableId}.${itemId}`;
      let mainOrder = this.$store.state[routeUrl].updateData[tableName].changeData;
      let OC_B_REFUND_ORDER_ITEM = JSON.parse(JSON.stringify(R3.store.state.customize.extraoOrderDetails)) //明细
      // let IDS // 删除ids
      let ID
      if(itemId === 'New'){
        OC_B_REFUND_ORDER_ITEM.forEach(i => {
          i.OC_B_ORDER_ITEM_ID = i.ID
          i.ID = '-1'
        });
      }else{
        // 获取已入库删除ids
        let arr1 = JSON.parse(sessionStorage.getItem('copyDetails')) //详情带过来的明细
        // IDS = [...arr1].filter(x => [...OC_B_REFUND_ORDER_ITEM].every(y => y.ID !== x.ID)).map(it => it.ID); // 已经删除的Ids
        // 编辑  删除为编辑数据
        OC_B_REFUND_ORDER_ITEM.forEach((item,i)=>{
          if(item.ID !== '-1' && (arr1.every(y => y.QTY_REFUND == item.QTY_REFUND) && arr1.every(y => y.AMT_ACTUAL_REFUND == item.AMT_ACTUAL_REFUND))) {
            OC_B_REFUND_ORDER_ITEM[i] = null
          }
        })

      }
      // 处理主表数据
      for( let key in mainOrder){
        if (mainOrder[key] instanceof Array) {
          if(key === 'SOURCE_BILL_NO')
            mainOrder[key]  =  mainOrder[key][0].BILL_NO
          else
            mainOrder[key]  =  mainOrder[key][0].ID
        }
      }
      // 校验 
      let regxArr = ['SOURCE_CODE','PAY_TYPE','PAY_NO'];
      for( let key in mainOrder){
        if (regxArr.includes(key) && !mainOrder[key]) {
          if (key === 'PAY_TYPE') {
            this.$Message.error($it('tip.kq')) //支付方式不能为空！
            return;
          }else if(key === 'SOURCE_CODE'){
            this.$Message.error($it('tip.ho')) //原平台单号不能为空！
            return;
          }else if(key === 'PAY_NO'){
            this.$Message.error($it('tip.kr')) //支付账号不能为空！
            return;
          }
        }
      }
      // ID
      itemId === 'New' ? mainOrder.ID = '-1' : mainOrder.ID = itemId;
      // 保存
      // 处理明细
      OC_B_REFUND_ORDER_ITEM = OC_B_REFUND_ORDER_ITEM.filter(i => i !== null);
      let OC_B_REFUND_ORDER_ITEM_Arr = []
      if(OC_B_REFUND_ORDER_ITEM.length){
          OC_B_REFUND_ORDER_ITEM_Arr = OC_B_REFUND_ORDER_ITEM.map(i =>{
            i.ISACTIVE === '是' ?  i.ISACTIVE = 'Y' :  i.ISACTIVE = 'N';
            return i;
        })
      }
      const { data: { code, data, message} } = await this.service.orderCenter.extraSaveApi({ OC_B_REFUND_ORDER_EXTRA: mainOrder, OC_B_REFUND_ORDER_ITEM:OC_B_REFUND_ORDER_ITEM_Arr, ID });
      if (code == 0) {
        this.$Message.success(message);
        if (itemId === 'New') {
          $omsUtils.tabCloseAppoint(this);
          this.$destroy(true);
          this.$store.commit('global/tabOpen', {
            type: 'V',
            id: data.objId,
            tableId: '10825',
            label: $it('menu.ax'), //额外退款编辑
            tableName: 'OC_B_REFUND_ORDER_EXTRA'
          });
        }else{
          $omsUtils.tabCloseAppoint(this);
          this.$destroy(true);
          this.$store.commit("global/tabOpen", {
            type: "S",
            tableName: "OC_B_REFUND_ORDER_EXTRA",
            tableId: '10825',
            back: true,
          });
        }
        
      }
    }
  },
});
