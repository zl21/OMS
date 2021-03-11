<template>
  <div class="customReturnImport">
    <p>该导出会根据页面过滤条件导出,是否继续?</p>
    <div class="customReturnImport_foot">
      <businessButton :btn-config="btnConfig" />
    </div>
  </div>
</template>

<script>
  import R3 from '@syman/burgeon-r3';
  import businessButton from 'professionalComponents/businessButton';
  import axios from 'axios';

  export default {
    components: {
      businessButton
    },
    props: {
      idArray: {
        type: Array
      }
    },
    computed: {
      selectItem() {
        const str = this.$route.path.split('/');
        return R3.store.state[`S.${str[3]}.${str[4]}`];
      }, // 表信息
    },
    mounted() {
      console.log(this.selectItem);
    },
    data() {
      return {
        btnConfig: {
          typeAll: 'error', // 按钮统一风格样式
          btnsite: 'right', // 按钮位置 (right , center , left)
          buttons: [
            {
              text: window.vmI18n.t('common.cancel'), // 取消 按钮文本
              btnclick: () => {
                this.$emit('closeActionDialog');
              } // 按钮点击事件
            },
            {
              text: window.vmI18n.t('common.determine'), // 确定 按钮文本
              btnclick: () => {
                this.confirm();
              }
            }
          ]
        },
      };
    },
    methods: {
      confirm() {
        let obj = {};
        if (this.idArray.length) {
          obj = {
            ids: this.idArray,
            table: this.$route.params.tableName
          };
        } else {
          const data = JSON.parse(JSON.stringify(this.selectItem.formItems.data));
          for (const key in data) {
            if (key == 'CHECK_TIME' || key == 'FINANCIAL_AUDIT_TIME' || key == 'CREATIONDATE') {
              data[key] = `${data[key][0]}~${data[key][1]}`
            }
            if (!data[key]) {
              delete data[key];
            }
            if (data[key] instanceof Array) { // 过滤数组值为空问题
              if (!data[key][0]) {
                delete data[key];
              }
            }
          }
          obj = {
            table: this.$route.params.tableName,
            fixedcolumns: data
          };
        }
        axios({
          url: '/api/cs/oc/oms/v1/exportOcBReturnAfSendManual',
          method: 'post',
          data: obj
        }).then(res=>{
          if (res.data.code == 0) {
            window.location.href = res.data.data;
            this.$emit('closeActionDialog');
          } else {
            this.$Message.error(res.data.message);
          }
        });
      }
    }
  };
</script>
