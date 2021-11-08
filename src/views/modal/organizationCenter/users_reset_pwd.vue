<!--
 * @Author: your name
 * @Date: 2021-06-16 11:01:13
 * @LastEditTime: 2021-08-26 11:08:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/modal/organizationCenter/users_reset_pwd.vue
-->
<template>
  <div class="users_reset_pwd">
    <FormLayout
      :defaultColumn="defaultColumn"
      ref="FormLayout"
      :defaultconfig="config"
    >
    </FormLayout>

    <OmsButton :btn-config="btnConfig" />
  </div>
</template>

<script>
import { OmsButton } from 'burgeonComponents'
import service from '@/service/index';

export default {
  components: {
    OmsButton
  },
  data() {
    return {
      defaultColumn: 1,
      config: [
        {
          item: {
            type: 'Input', // 组件类型
            required: true, // 是否必填
            field: 'pwd',
            label: '新密码',
            props: {
              type: "password",
              value: '',
              regx: /^[A-Za-z0-9`~!@#$%^&*-=_+,.\/\\;':"]+$/
            }
          }
        },
      ],
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right',
        buttons: [
          {
            disabled: false,
            text: "确定",
            btnclick: () => {
         
              if (this.$refs.FormLayout.formData.pwd.length < 6) {
                this.$Message.warning('密码长度必须大于6位！');
                return
              }
              let data = {
                USERS: {
                  "ID": this.$parent.$parent.idArray[0],
                  "PASSWORD": this.$refs.FormLayout.formData.pwd
                }
              }
              service.organizationCenter.usersSave(data).then(res => {
                if (res.data.code == 0) {
                   this.$emit('closeActionDialog', false)
                  this.$Message.success(res.data.message);
                }
              })

            }, // 按钮点击事件
          }
        ],
      },
    }
  }
}
</script>

<style>
</style>