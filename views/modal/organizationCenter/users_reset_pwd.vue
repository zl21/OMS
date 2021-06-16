<!--
 * @Author: your name
 * @Date: 2021-06-16 11:01:13
 * @LastEditTime: 2021-06-16 14:00:59
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

    <businessButton :btn-config="btnConfig" />
  </div>
</template>

<script>
import businessButton from 'professionalComponents/businessButton';


export default {
  components: {
    businessButton
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
              console.log("ok");
              
              console.log(this.$refs.FormLayout.formData);
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