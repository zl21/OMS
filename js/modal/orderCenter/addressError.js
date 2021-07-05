  import businessActionTable from 'professionalComponents/businessActionTable';
  import businessButton from 'professionalComponents/businessButton';
  import loading from 'professionalComponents/loading.vue';
  import drpInput from 'professionalComponents/fkinput.vue';

  export default {
    components: {
      businessActionTable,
      businessButton,
      loading,
      drpInput
    },
    computed: {
      type() {
        let type;
        switch (this.$parent.title) {
        case '售价异常审批':
          type = 5; 
          break;
        case '异常商品修改':
          type = 3;
          break;
        case '异常地址匹配':
          type = 12;
          break;
        }
        return type;
      }
    },
    created() {
    },
    mounted() {
      this.query();
      console.log();
    },
    data() {
      return {
        vmI18n:$i18n,
        loading: false,
        itemdata_pro:[],
        itemdata_city:[],
        resultArr:[],
        tableConfig: {
          indexColumn: true, // 是否显示序号
          // isShowSelection: true, // 是否存在多选
          pageShow: true, // 控制分页是否显示
          searchInputShow: false, // 控制搜索框是否显示
          width: '', // 表格宽度
          height: '452',
          border: true, // 是否显示纵向边框
          total: 0, // 设置总条数
          pageSizeOpts: [10, 20, 30,50,100], // 每页条数切换的配置
          pageSize: 10, // 默认每页条数100条，产品要求
          pageIndex: 1, // 页码
          totalData: [],
          selectionData: [], // 勾选数据
          data: [],
          columns: [
            // {
            //   key: 'ID',
            //   title: '序号'
            // },
            {
              key: 'EXCEPTION_TYPE_NAME',
              title: '异常类型'
            },
            {
              key: 'CP_C_REGION_PROVINCE_ENAME',
              title: '省',
              render: (h, params) => {
                if (params.row.EXCEPTION_TYPE == 12) {
                  return h('div', {
                    style: {
                      width: '150px'
                    }
                  }, [
                    h('drpInput', {
                      props: {
                        colname: 'OLD_BARCODE',
                        style: 'popInput',
                        version: '1.4',
                        isActive: true,
                        itemdata: this.itemdata_pro[params.index]
                        // {
                        //   colid: 166974,
                        //   colname: 'CP_C_REGION_PROVINCE_ID',
                        //   fkdisplay: 'drp',
                        //   isfk: true, // 是否有fk键
                        //   isnotnull: true, // 是否必填
                        //   name: '',
                        //   readonly: false, // 是否可编辑，对应input   readonly属性
                        //   pid: params.row.CP_C_REGION_PROVINCE_ID,
                        //   valuedata: params.row.CP_C_REGION_PROVINCE_ENAME,
                        // },
                      },
                      style: {
                        marginRight: '5px',
                      },
                      on: {
                        getFkChooseItem: (val) => {
                          if(val.ID){
                            params.row.CP_C_REGION_PROVINCE_ENAME = val.ENAME.val;
                            params.row.CP_C_REGION_PROVINCE_ID = val.ID.val;
                            this.getResult(val , params.row , val.ID.val , val.ENAME.val)
                          }else if(val.id) {  //失去焦点时间
                            params.row.CP_C_REGION_PROVINCE_ENAME = val.value
                            params.row.CP_C_REGION_PROVINCE_ID = val.id
                            this.tableConfig.data[params.index] = params.row;
                            this.getResult(val , params.row , val.id , val.value)
                            // let arr = [];
                            // this.resultArr.forEach(item=>{
                            //   if(item.ID !== params.row.ID){
                            //     arr.push(item)
                            //   }
                            // });
                            // this.resultArr = arr;
                          }else {
                            params.row.CP_C_REGION_PROVINCE_ENAME = val.valuedata;
                            params.row.CP_C_REGION_PROVINCE_ID = val.pid;
                            this.getResult(val , params.row , val.pid , val.valuedata)
                            // let arr = [];
                            // this.resultArr.forEach(item=>{
                            //   if(item.ID !== params.row.ID){
                            //     arr.push(item)
                            //   }
                            // });
                            // this.resultArr = arr;
                          }
                        },
                      },
                    })
                  ]);
                }
                return h('span', {}, params.row.CP_C_REGION_PROVINCE_ENAME);
              }
            },
            {
              key: 'CP_C_REGION_CITY_ENAME',
              title: '市',
              render: (h, params) => {
                if (params.row.EXCEPTION_TYPE == 22) {
                  return h('div', {
                    style: {
                      width: '150px'
                    }
                  }, [
                    h('drpInput', {
                      props: {
                        colname: 'OLD_BARCODE',
                        style: 'popInput',
                        version: '1.4',
                        isActive: true,
                        itemdata: this.itemdata_city[params.index]
                        // {
                        //   colid: 167077,
                        //   colname: 'CP_C_REGION_CITY_ID',
                        //   fkdisplay: 'drp',
                        //   isfk: true, // 是否有fk键
                        //   isnotnull: true, // 是否必填
                        //   name: '',
                        //   readonly: false, // 是否可编辑，对应input   readonly属性
                        //   pid: params.row.CP_C_REGION_CITY_ID,
                        //   valuedata: params.row.CP_C_REGION_CITY_ENAME,
                        // },
                      },
                      style: {
                        marginRight: '5px',
                      },
                      on: {
                        getFkChooseItem: (val) => {
                          if(val.ID){
                            params.row.CP_C_REGION_CITY_ENAME = val.ENAME.val;
                            params.row.CP_C_REGION_CITY_ID = val.ID.val;
                            this.getResult(val , params.row , val.ID.val , val.ENAME.val)
                          }else if(val.id) {  //失去焦点事件
                            params.row.CP_C_REGION_CITY_ENAME = val.value
                            params.row.CP_C_REGION_CITY_ID = val.id
                            this.tableConfig.data[params.index] = params.row;
                            this.getResult(val , params.row , val.id , val.value)
                            // let arr = [];
                            // this.resultArr.forEach(item=>{
                            //   if(item.ID !== params.row.ID){
                            //     arr.push(item)
                            //   }
                            // });
                            // this.resultArr = arr;
                          }else {
                            params.row.CP_C_REGION_CITY_ENAME = val.valuedata;
                            params.row.CP_C_REGION_CITY_ID = val.pid;
                            this.getResult(val , params.row , val.pid , val.valuedata)
                        //     let arr = [];
                        // this.resultArr.forEach(item=>{
                        //   if(item.ID !== params.row.ID){
                        //     arr.push(item)
                        //   }
                        // });
                        // this.resultArr = arr;
                          }
                        },
                      },
                    })
                  ]);
                }
                return h('span', {}, params.row.CP_C_REGION_CITY_ENAME);
              }
            },
            //区取消,不做异常修改
            // {
            //   key: 'CP_C_REGION_AREA_ENAME',
            //   title: '区',
            //   render: (h, params) => {
            //     if (params.row.EXCEPTION_TYPE == 32) {
            //       return h('div', {
            //         style: {
            //           width: '150px'
            //         }
            //       }, [
            //         h('drpInput', {
            //           props: {
            //             colname: 'OLD_BARCODE',
            //             style: 'popInput',
            //             version: '1.4',
            //             isActive: true,
            //             itemdata: {
            //               colid: 167091,
            //               colname: 'CP_C_REGION_AREA_ID',
            //               fkdisplay: 'drp',
            //               isfk: true, // 是否有fk键
            //               isnotnull: false, // 是否必填
            //               name: '',
            //               readonly: false, // 是否可编辑，对应input   readonly属性
            //               pid: params.row.CP_C_REGION_AREA_ID,
            //               valuedata: params.row.CP_C_REGION_AREA_ENAME,
            //               // refcolval: {
            //               //   fixcolumn: 'C_UP_ID',
            //               //   expre: 'equal',
            //               //   srccol: 'CP_C_REGION_CITY_ID',
            //               // }, // 过滤配置
            //             },
            //           },
            //           style: {
            //             marginRight: '5px',
            //           },
            //           on: {
            //             getFkChooseItem: (val) => {
            //               if(val.ID){
            //                 params.row.CP_C_REGION_AREA_ENAME = val.ENAME.val;
            //                 params.row.CP_C_REGION_AREA_ID = val.ID.val;
            //                 this.getResult(val , params.row)
            //               }else {
            //                 params.row.CP_C_REGION_AREA_ENAME = '';
            //                 params.row.CP_C_REGION_AREA_ID = '';
            //                 let arr = [];
            //             this.resultArr.forEach(item=>{
            //               if(item.ID !== params.row.ID){
            //                 arr.push(item)
            //               }
            //             });
            //             this.resultArr = arr;
            //               }
            //             },
            //           },
            //         })
            //       ]);
            //     }
            //     return h('span', {}, params.row.CP_C_REGION_AREA_ENAME);
            //   }
            // },
            {
              key: 'PLATFORM_NAME',
              title: '平台类型'
            },
            {
              key: 'PROVINCE_CITY_AREA',
              title: '平台省市区'
            }
          ]
        },
        selectionData: [],
        btnConfig: {
          typeAll: 'default', // 按钮统一风格样式
          btnsite: 'right', // 按钮位置 (right , center , left)
          buttons: [
            {
              type: '', // 按钮类型
              text: $i18n.t('common.cancel'), // 取消 按钮文本
              icon: '', // 按钮图标
              size: '', // 按钮大小
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.$parent.$parent.closeConfirm();
              } // 按钮点击事件
            },
            {
              type: '', // 按钮类型
              text: $i18n.t('common.determine'), // 确定 按钮文本
              icon: '', // 按钮图标
              size: '', // 按钮大小
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.datermine();
              } // 按钮点击事件
            }
          ]
        }
      };
    },
    methods: {
      query() {
        const self = this;
        self.loading = true;
        self.service.orderCenter.getOcBOrderExceptions({
          EXCEPTION_TYPE: self.type,
          range: self.tableConfig.pageSize,
          startindex: self.tableConfig.pageIndex
        }).then(res=>{
          console.log(res);
          if (res.data.code == 0) {
            res.data.data.OC_B_ORDER_EXCEPTION.forEach(item=>{
              self.itemdata_pro.push({
                serviceId: 'r3-cp',
                colid: 166974,
                colname: 'CP_C_REGION_PROVINCE_ID',
                fkdisplay: 'drp',
                isfk: true, // 是否有fk键
                isnotnull: true, // 是否必填
                name: '',
                readonly: false, // 是否可编辑，对应input   readonly属性
                pid: item.CP_C_REGION_PROVINCE_ID,
                valuedata: item.CP_C_REGION_PROVINCE_ENAME,
              });
              self.itemdata_city.push({
                serviceId: 'r3-cp',
                colid: 167077,
                colname: 'CP_C_REGION_CITY_ID',
                fkdisplay: 'drp',
                isfk: true, // 是否有fk键
                isnotnull: true, // 是否必填
                name: '',
                readonly: false, // 是否可编辑，对应input   readonly属性
                pid: item.CP_C_REGION_CITY_ID,
                valuedata: item.CP_C_REGION_CITY_ENAME,
              })
            })
            self.tableConfig.data = res.data.data.OC_B_ORDER_EXCEPTION;
            self.tableConfig.total = res.data.data.totalRowCount;
          }
          self.loading = false;
        });
      },
      onSelect(sel) {
        this.selectionData = sel;
      },
      getResult(val , data , id , code){
        const self = this;
        //如果结果数据为空,则直接push数组
        if(self.resultArr.length){
          //判断是否已经操作过该ID数据
          if(self.resultArr.some(item=>item.ID == data.ID)){
            self.resultArr.forEach(item=>{
              if(item.ID == data.ID){
                item.CP_C_REGION_ID = id;
                item.CP_C_REGION_ENAME = code;
              }
            })
          }else {
            let obj = {
              EXCEPTION_TYPE:data.EXCEPTION_TYPE,// 处理异常类型
              ID:data.ID,
              CP_C_REGION_ID:id,// 省市区选择的id
              CP_C_REGION_ENAME:code// 省市区选择的name
            }
            self.resultArr.push(obj);
          }
        }else {
          let obj = {
            EXCEPTION_TYPE:data.EXCEPTION_TYPE,// 处理异常类型
            ID:data.ID,
            CP_C_REGION_ID:id,// 省市区选择的id
            CP_C_REGION_ENAME:code// 省市区选择的name
          };
          self.resultArr.push(obj);
        }
      },
      datermine() {
        const self = this;
        // 修改参数
        self.loading = true;
        self.service.orderCenter.batchSaveOcBOrderException(self.resultArr).then(res=>{
          console.log(res);
          if (res.data.code == 0) {
            $omsUtils.msgTips(self, 'success', res.data.message, 0);
            this.$parent.$parent.closeConfirm();
          } else {
            $omsUtils.msgTips(self, 'error', res.data.message, 0);
          }
          self.loading = false;
        });
      },
      pageChange(val) {
        console.log(val);
        this.tableConfig.pageIndex = val;
        this.query();
      },
      pageSizeChange(val) {
        console.log(val);
        this.tableConfig.pageSize = val;
        this.query();
      }
    }
  };