<template>
  <div class="wphemail">
    <Form :label-width="80">
      <FormItem
        label="插入字段："
        class="mailFormItem"
      >
        <ul>
          <li
            v-for="(row,index) of lists"
            :key="index"
          >
            <a @click="row.click">{{ row.label }}</a>
          </li>
        </ul>
      </FormItem>
      <FormItem
        label="标题："
        class="mailFormItem"
        style="width:25%;"
      >
        <Input
          v-model="saveObj.MAIL_TITLE"
          placeholder="JIT订单下发通知"
        />
      </FormItem>
      <FormItem
        label="内容："
        class="mailFormItem"
      >
        <div class="item-area">
          <component
            :is="currentView"
            :ref="currentView+objid"
            :storage-item="storageItem"
            :itemdata="itemdata"
            :tab-action="!modify"
            @getChangeItem="getChangeItem"
          />
        </div>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  import editor from 'framework/components/wang-editor/wang-editor';
  import axios from 'axios';

  export default {
    name: 'WphEmailSend',
    components: {
      editor
    },
    props: {
      objid: {
        type: String
      },
      objList: {
        type: Array
      },
      refresh: Boolean,
      save: Boolean,
      tablename: {
        type: String
      },
      isdisabled: {
        type: Boolean
      },
      isActive: {
        type: Boolean
      },
      editsave: Boolean,
      stopsave: Boolean,
      selectItem: {},
      tabConfig: {},
      status: {}, // 整体状态,是否可编辑
      ExportFlag: {} // 导入状态
    },
    data() {
      return {
        lists: [
          {
            label: '品牌',
            click: () => this.setVariable('品牌')
          },
          {
            label: '订单号',
            click: () => this.setVariable('订单号')
          },
          {
            label: '入库单号',
            click: () => this.setVariable('入库单号')
          },
          {
            label: '到货仓',
            click: () => this.setVariable('到货仓')
          },
          {
            label: '商品总数量',
            click: () => this.setVariable('商品总数量')
          }
        ],
        modify: false, // 是否修改
        currentView: '', // 控制富文本
        storageItem: {
          // 存储表
          name: 'PS_C_PRO',
          id: this.objid
        },
        itemdata: {
          // 富文本的传值
          colid: this.objid,
          valuedata: ''
        },
        saveObj: {
          // 保存数据
          MAIL_TITLE: '',
          MAIL_CONTENT: ''
        }
      };
    },
    watch: {
      refresh(val) {
        console.log('refresh');
      },
      // save(val) {
      //   if (val) {
      //     this.saveCurrent().then(() => this.$emit('changeSave', false)).catch(() => this.$emit('changeSave', false));
      //   }
      // },
      editsave(val) {
        console.log('editsave');
      },
      itemdata: {
        handler(obj, oldobj) {
          this.saveObj.MAIL_CONTENT = obj.valuedata;
        },
        deep: true
      }
    },
    computed: {},
    methods: {
      getChangeItem(value) {
        this.itemdata.valuedata = value.valuedata;
      },
      // 获取变量
      getVariableRest() {
        const self = this;

        const rows = ['品牌', '订单号', '入库单号', '到货仓', '商品总数量', '预计发货时间', '预计到货时间', '箱号', '物流公司', '发货实体仓'];
        self.lists = rows.map((row) => ({
          label: row,
          click: () => self.setVariable(row)
        }));
      },
      setVariable(s) {
        const self = this;
        const val = self.itemdata.valuedata || '';
        self.itemdata.valuedata = `${val}<font color="#4d80bf">$${s}$&nbsp;</font>`;
        self.$refs[`editor${self.objid}`].getData(self.itemdata);
      },
      setDetail(details) {
        const self = this;
        self.$set(self.itemdata, 'valuedata', details);
        self.currentView = 'editor';
        self.formObj = null;

        self.$nextTick(() => {
          if (self.$refs[`editor${self.objid}`]) {
            self.$refs[`editor${self.objid}`].getData(self.itemdata);
          }
        });
      },
      // 获取当前数据
      getData() {
        const self = this;
        const obj = {
          // table:self.tablename,
          objid: self.$route.params.itemId === 'New' ? '-1' : self.$route.params.itemId,
        };
        axios({
          method: 'post',
          url: '/p/cs/selectVipcomMailSetColumn',
          data: obj
        }).then((res) => {
          if (res.data.code === 0) {
            const row = res.data.data;
            self.saveObj.MAIL_CONTENT = row.MAIL_CONTENT;
            self.itemdata.valuedata = row.MAIL_CONTENT;
            self.saveObj.MAIL_TITLE = row.MAIL_TITLE;
            self.$nextTick(() => {
              if (self.$refs[`editor${self.objid}`]) {
                self.$refs[`editor${self.objid}`].getData(self.itemdata);
              }
            });
          }
        });
      },
      // 保存当前单据
      // flag 主表保存成功后的标志
      saveCurrent(flag) {
        const self = this;
        const obj = {
          objid: self.$route.params.itemId === 'New' ? '-1' : self.$route.params.itemId,
          fixcolumn: {
            ST_C_VIPCOM_MAIL: self.saveObj
          }
        };
        const data = new URLSearchParams();
        data.append('param', JSON.stringify(obj));
        return axios({
          url: '/p/cs/saveVipcomMail',
          method: 'post',
          data
        }).then(res => {
          if (!flag) {
            if (res.data.code === 0) {
                self.$Message.success('保存成功!');
            } else {
              // self.$Message.error('保存失败');
            }
          }
        });
      },
      refreshGetData() {
        this.$emit('changeRefresh', false);
      },
      changeSave() {
        this.$emit('changeSave', val);
      },
      newLySave() {
        this.$emit('changeHasContent', true);
        this.$emit('objectSave');
      },
      noContent() {
        // 定制界面没有明细
        this.$emit('changeHasContent', false);
      },
      errorHasContent() {
        // 定制界面存在明细，且走上面的保存
        this.$emit('changeHasContent', true);
      },
      changeEditSave() {
        this.$emit('changeEditSave');
      },
      objectEdit() {
        this.$emit('objectEdit');
      },
      changeStopSave() {
      }
    },
    mounted() {
      this.modify = true;
      this.getVariableRest();
      this.setDetail('');
      // 默认子明细需要保存
      this.errorHasContent();
      if (this.$route.params.itemId !== 'New') {
        this.getData();
      }
      // 监听主表的保存成功事件
      window.addEventListener('customizeClick', (data) => {
        console.log('customizeClick::data', data);
        if(data.detail.type === 'save'){
          let flag = typeof(data.detail.mainTableParame)=== "undefined"?false:true;
          this.saveCurrent(flag);
        }
        // if ( && ) {
        //   // 主表有修改保存
        //   this.saveCurrent(true);
        // } else {
        //   // 主表没有修改保存
        //   this.saveCurrent();
        // }
      });
    },
    created() {
    }
  };
</script>
<style lang='less' scoped>
  @import "~professionalComponents/common/css/theme.less";

  .wphemail {
    position: relative;

    .mailFormItem {
      //width: 25%;
      margin-bottom: 8px;

      .burgeon-form-item-content > .burgeon-input-wrapper > .burgeon-input {
        display: inline-block;
        width: 100%;
        height: 18px;
        line-height: 1.5;
        padding: 0px;
        font-size: 12px;
        border: 1px solid #bfcbd9;
        border-radius: 2px;
        color: #515a6e;
        background-color: #fff;
        background-image: none;
        position: relative;
        cursor: text;
        transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
        box-shadow 0.2s ease-in-out;
      }
    }


    ul {
      display: flex;
      flex-direction: row;
      flex-flow: wrap;

      li {
        margin: 0px 20px;

        label {
          min-width: 100px;
          text-align: right;
        }
      }
    }
  }
</style>
