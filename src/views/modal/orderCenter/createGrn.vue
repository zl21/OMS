<template>
  <div class="createGrn">
    <div class="form-body">
      <div style="display:flex">
        <label>档期</label>
        <DropMultiSelectFilter
          :data="data1"
          :total-row-count="totalRowCount"
          :page-size="pageSize"
          :show-colname-key="'show'"
          :columns="columns"
          :data-empty-message="dataEmptyMessage"
          :auto-data="AutoData"
          @on-page-change="changePage1"
          @on-input-value-change="InputValueChange"
        />
      </div>
      <div style="display:flex">
        <label>运输方式</label>
        <Select>
          <Option>1</Option>
        </Select>
      </div>
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
  export default {
    data() {
      return {
        vmI18n: window.vmI18n,
        data1: {
          start: 0,
          tabth: [
            {
              colname: 'ID',
              name: 'ID',
              show: false
            },
            {
              colname: 'ECODE',
              name: '编码',
              show: false
            },
            {
              colname: 'MIXNAME',
              name: '[编码]名称',
              show: true
            },
            {
              colname: 'ENAME',
              name: '名称',
              show: false
            }
          ],
          row: [
            {
              ENAME: {
                val: '总部'
              },
              ECODE: {
                val: '00'
              },
              MIXNAME: {
                val: '[00]总部'
              },
              ID: {
                val: '4919'
              }
            },
            {
              ENAME: {
                val: '中央仓仓库'
              },
              ECODE: {
                val: '000'
              },
              MIXNAME: {
                val: '[000]中央仓仓库'
              },
              ID: {
                val: '1250'
              }
            },
            {
              ENAME: {
                val: '001'
              },
              ECODE: {
                val: '001'
              },
              MIXNAME: {
                val: '[001]001'
              },
              ID: {
                val: '4970'
              }
            }
          ]
        },
        totalRowCount: 39,
        pageSize: 10,
        AutoData: [],
        dataEmptyMessage: '数据加载中...', // 无数据的提示
        columns: ['name', 'value']// 展现的组
      };
    },
    methods: {
      determine() {
            
      }
    }
  };
</script>
