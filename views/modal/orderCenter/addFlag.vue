<!--
 * @Author: your name
 * @Date: 2021-06-08 14:29:58
 * @LastEditTime: 2021-06-09 17:25:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/modal/orderCenter/addFlag.vue
-->
<template>
  <div class="OC_ORDER_ADD_LABEL">
    <div class="tbody">
      <CheckboxGroup v-model="social">
        <Checkbox
          v-for="(item, index) in flagList"
          :key="index"
          :label="item.ID.val"
        >
          <span>{{ item.DESCRIPTION.val }}</span>
        </Checkbox>
      </CheckboxGroup>
      <Icon type="ios-settings" v-if="componentData.title == '添加标记'" @click="setting" style="fontsize: 20px" />
    </div>
    <div class="footer">
      <businessButton :btn-config="btnConfig"></businessButton>
    </div>
    <Modal v-model="modal" title="标记管理" footer-hide :mask="true" @on-ok="asyncOK">
      <div class="modalModule" style="max-height:350px;overflow:scroll">
        <Button @click="addList" style="marginBottom:5px">添加</Button>
        <Table :columns="table.columns" :data="table.data"></Table>
        <businessButton :btn-config="modalBtnConfig"></businessButton>
      </div>
    </Modal>
  </div>
</template>

<script>
import businessButton from 'professionalComponents/businessButton';
export default {
  components: {
    businessButton
  },
  props: {
    componentData: {
      type: Object
    }
  },
  mounted() {
    this.getList();
    console.log(this.$parent);
  },
  data() {
    return {
      modal: false,
      btnConfig: {
        typeAll: 'default',
        btnsite: 'right',
        buttons: [
          {
            text: $i18n.t('common.cancel'), // 返回
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            }
          },
          {
            text: $i18n.t('common.determine'), // 确定
            btnclick: () => {
              this.determine()
            }
          },
        ]
      },
      modalBtnConfig:{
        typeAll: 'default',
        btnsite: 'right',
        buttons: [
          {
            text: $i18n.t('common.cancel'), // 取消
            btnclick: () => {
              this.modal = false;
            }
          },
          {
            text: $i18n.t('common.determine'), // 确定
            btnclick: () => {
              this.asyncOK()
            }
          },
        ]
      },
      social: [],
      flagList: [],
      table: {
        columns: [
          {
            title: '序号',
            key: 'index',
            render: (h, params) => {
              return h('span', {}, params.index + 1)
            }
          },
          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              if (params.row.IS_SYSTEM == 0) {
                return h('a', {
                  on: {
                    click: () => {
                      let del = this.table.data.splice(params.index, 1);
                      if(del[0].ID >0){
                          del[0].isDelete = 1;
                          this.delData.push(del[0]);
                      }
                    }
                  }
                }, '删除')
              } else {
                return '';
              }
            }
          },
          {
            key: 'DESCRIPTION',
            render: (h, params) => {
              if (params.row.IS_SYSTEM == 0) {
                return h('Input', {
                  props: {
                    value: params.row.DESCRIPTION,
                    maxlength:6
                  },
                  on: {
                    'on-change': (val) => {
                      console.log(val);
                      params.row.DESCRIPTION = val.target.value;
                      this.table.data[params.index] = params.row;
                    }
                  }
                })
              } else {
                return h('span', {}, params.row.DESCRIPTION);
              }
            },
            renderHeader:(h , params) => {
                return h('div' , [
                    h('span' , {}, '标记说明'),
                    [h('Poptip' , {
                        props:{
                            trigger:'hover',
                            content:'不可超过6个汉字',
                            transfer:true
                        },
                        style:{
                            width:'30px',
                            height:'15px'
                        }
                    } , [h('Icon' , {
                    props:{
                        type:'ios-information-circle'
                    },
                    style:{
                        'margin-left':'10px'
                    }
                } , '')])],
                ])
            }
          },
          {
            title: '备注',
            key: 'REMARK',
            render: (h, params) => {
              if (params.row.IS_SYSTEM == 0) {
                return h('Input', {
                  props: {
                    value: params.row.REMARK
                  },
                  on: {
                    'on-change': (val) => {
                      console.log(val);
                      params.row.REMARK = val.target.value;
                      this.table.data[params.index] = params.row;
                    }
                  }
                })
              } else {
                return h('span', {}, params.row.REMARK);
              }
            }
          }
        ],
        data: []
      },
      oldTableData:[],
      delData:[],   //记录删除的数据
    }
  },
  methods: {
    determine() {
      const self = this;
      if (!self.social.length) {
        self.$OMS2.omsUtils.msgTips(self, 'warning', self.componentData.title == '添加标记' ? '请选择需要添加的标记!' : '请选择需要取消的标记', 0);
        return;
      }
      let obj = {
          orderIds:self.componentData.ids,
          ids:self.social
      }
      self.service.orderCenter[ self.componentData.title == '添加标记' ? 'addOrderLable' : 'cancelOrderLable'](obj).then(res=>{
          console.log(res);
          if(res.data.code == 0){
              self.$OMS2.omsUtils.msgTips(self, 'success' , res.data.message, 0);
              self.$parent.$parent.$parent.query();
              this.$parent.$parent.closeConfirm();
          }else {
              res.data.data.errors.forEach((element,index) => {
                  element.index = index+1;
              });
              this.$Modal.confirm({
                title: res.data.message,
                width: 500,
                mask: true,
                className: 'ark-dialog',
                render: (h) => {
                if (res.data.data) {
                    return h('Table', {
                    props: {
                        columns: [
                        {
                            title:'序号',
                            key:'index'
                        },
                        {
                            title:'单据编号',
                            key:'billNo'
                        },
                        {
                            title: $i18n.t('modalTitle.a6'), // '提示信息',
                            key: 'message',
                        },
                        ],
                        data: res.data.data.errors,
                    },
                    })
                }
                return false
                },
            })
            self.$parent.$parent.$parent.query();
          }
      })
    },
    asyncOK() {
      const self = this;
      let modifyData = self.diffArr();
      modifyData = modifyData.concat(self.delData);
      for (const iterator of modifyData) {
          if(!iterator.DESCRIPTION){
              self.$OMS2.omsUtils.msgTips(self, 'warning', '标记说明不能为空!', 0);
              return;
          }
      }
      self.service.orderCenter.saveLable(modifyData).then(res=>{
          console.log(res);
          if(res.data.code == 0){
              self.$OMS2.omsUtils.msgTips(self, 'success', res.data.message, 0);
              this.modal = false;
              self.getList()
          }else {
              self.$OMS2.omsUtils.msgTips(self, 'error', res.data.message, 0);
              this.modal = false;
              self.getList()
          }
      })
    },
    addList() {
      const self = this;
      self.table.data.push({
        ID:'-1',
        DESCRIPTION: '',
        REMARK: '',
        IS_SYSTEM:0,
      })
    },
    getList() {
      const self = this;
      let obj = { "table": "OC_B_LABEL", "startindex": 0, "range": 10, "fixedcolumns": {"ISACTIVE":["Y"]}, "column_include_uicontroller": true, "isolr": false };
      let formdata = new FormData();
      formdata.append('searchdata', JSON.stringify(obj));
      self.service.orderCenter.queryFlagList(formdata).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          self.flagList = res.data.data.row;
        } else {
          self.$OMS2.omsUtils.msgTips(self, 'warning', res.data.message, 0);
        }
      })
    },
    setting() {
      const self = this;
      self.modal = true;
      let obj = { "table": "OC_B_LABEL", "startindex": 0, "range": 10, "fixedcolumns": {"ISACTIVE":["Y"]}, "column_include_uicontroller": true, "isolr": false };
      let formdata = new FormData();
      formdata.append('searchdata', JSON.stringify(obj));
      self.service.orderCenter.queryFlagList(formdata).then(res => {
        if (res.data.code == 0) {
          let arr = res.data.data.row.map(item => {
            return {
              REMARK: item.REMARK.val,
              DESCRIPTION: item.DESCRIPTION.val,
              IS_SYSTEM: item.IS_SYSTEM.val,
              ID: item.ID.val
            };
          });
          self.table.data = arr;
          this.oldTableData = JSON.stringify(arr);
        } else {
          self.$OMS2.omsUtils.msgTips(self, 'warning', res.data.message, 0);
        }
      })
    },
    diffArr(){
        const self = this;
        const oldTableData = JSON.parse(self.oldTableData);
        const newTableData = self.table.data;
        let arr = [];
        for (const newData of newTableData) {
            
            if(!(oldTableData.some(item => {
                return item.ID == newData.ID && item.DESCRIPTION == newData.DESCRIPTION && item.REMARK == newData.REMARK;
            }))){
                arr.push(newData);
            }

        };
        return arr;
    }
  }
}
</script>

<style scoped lang="less">
.OC_ORDER_ADD_LABEL {
  .tbody {
    display: flex;
    justify-content: space-between;
    height: 200px;
    padding: 5px;
  }
}
</style>