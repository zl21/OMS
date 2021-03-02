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
    data() {
      return {
        btnConfig: {
          typeAll: 'error', // 按钮统一风格样式
          btnsite: 'right', // 按钮位置 (right , center , left)
          buttons: [
            {
              text: window.vmI18n.t('common.cancel'), // 取消 按钮文本
              btnclick: () => {
                this.$parent.$parent.closeConfirm();
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
        axios({
          url: '/api/cs/oc/oms/v1/exportOcBReturnAfSendManual',
          method: 'post',
          data: {
            ids: this.idArray,
            table: this.$route.params.tableName
          }
        }).then(res=>{
          console.log(res);
        });
      }
    }
  };
</script>
