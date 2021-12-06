<template>
  <div class="changeInternalRemarks">
    <Form :model="formData" :label-width="90">
      <FormItem label="修改内部备注:">
        <Input
          v-model="formData.remark"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 4 }"
          placeholder="请输入内部备注"
        ></Input>
      </FormItem>
    </Form>
    <div class="btnList">
      <OmsButton class="Bthstyle" :btn-config="btnConfig" />
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>

export default {
  data() {
    return {
      formData: {
        remark: '', // 修改内部备注
      },
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: $it('com.cancel'), // 取消
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            }, // 按钮点击事件
          },
          {
            text: $it('com.determine'), // 确定
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.determine();
            }, // 按钮点击事件
          }
        ],
      },
      spinShow: false,
    }
  },
  props: {
    componentData: {
      type: Object,
    }
  },
  methods: {
    determine() {
      let data;
      if (typeof this.componentData.ids === 'string') {
        data = this.componentData.ids;
      } else {
        data = typeof this.componentData.ids === 'number' ? this.componentData.ids : this.componentData.ids.join(',');
      }
      this.$Modal.fcWarning({
        content: '是否确定修改内部备注？',
        mask: true,
        onOk: () => {
          const fromdata = new FormData();
          const param = {
            ids: data,
            insideRemark: this.formData.remark,
            order_flag: 1,
            cover: true,
          };
          fromdata.append('param', JSON.stringify(param));
          this.spinShow = true;
          this.$network.post('/api/cs/oc/oms/v1/BacthUpdateInsideRemark', param).then(res => {
            this.spinShow = false;
            this.$parent.$parent.closeConfirm();
            if (res.data.code === 0) {
              this.$Modal.fcSuccess({
                content: res.data.message
              })
              this.$parent.$parent.$parent.load();
            } else {
              this.$Modal.error({
                content: res.data.message
              })
            }
          })
        },
      })
    },
  }
}
</script>

<style lang="less" scoped>
</style>
