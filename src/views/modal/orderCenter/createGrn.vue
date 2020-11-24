<template>
  <div class="createGrn">
    <div class="form-body">
      <businessForm :form-config="formConfig" />
    </div>
    <div class="dialog-footer">
      <!-- 确定 -->
      <Button
        type="primary"
        size="small"
        @click="determine"
      >
        {{ vmI18n.t("common.determine") }}
      </Button>
      <!-- 取消 -->
      <Button
        type="error"
        ghost
        size="small"
        @click="
          () => {
            this.$emit('closeActionDialog');
          }
        "
      >
        {{ vmI18n.t("common.cancel") }}
      </Button>
    </div>
  </div>
</template>
<script>
  import businessForm from 'professionalComponents/businessForm';

  export default {
    components: {
      businessForm
    },
    data() {
      return {
        vmI18n: window.vmI18n,
        formConfig: {
          formData: [
            {
              style: 'popInput', // 输入框弹框单多选
              width: '24',
              dataAcessKey: 'SCHEDULEDATE',
              itemdata: {
                col: 1,
                colid: 1700820901,
                colname: 'SCHEDULEDATE', // 当前字段的名称
                datelimit: 'all',
                display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
                fkdisplay: 'mrp', // 外键关联类型
                fkdesc: '档期日程归属', // 配送物流
                inputname: 'CP_C_STORE_IDS:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
                isfk: true, // 是否有fk键
                isnotnull: false, // 是否必填
                isuppercase: false, // 是否转大写
                length: 65535, // 最大长度是多少
                name: '档期日程归属', // 配送物流 input前面显示的lable值
                readonly: false, // 是否可编辑，对应input   readonly属性
                reftable: 'ST_C_VIPCOM_ASCRIPTION', // 对应的表
                reftableid: 24574, // 对应的表ID
                row: 1,
                statsize: -1,
                type: 'STRING', // 这个是后台用的
                valuedata: '', // 这个是选择的值
              },
            },
            {
              style: 'select', // 下拉框类型
              label: '运输方式', // 付款方式 下拉框前的值
              width: '24', // 所占宽度宽度
              value: 'transportStyle', // 输入框的值
              disabled: false,
              selectChange: () => {
              }, // 选中事件，默认返回选中的值
              options: [
              // 下拉框选项值
              ],
            },
          ],
          formValue: {
            transportStyle: ''
          }
        },
      };
    },
    mounted() {
    },
    methods: {
      determine() {
            
      },
    }
  };
</script>
