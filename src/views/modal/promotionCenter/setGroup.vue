<!-- 设置分组 -->
<template>
  <div
    v-if="dialogVisible"
    class="setGroup customized-modal"
  >
    <el-dialog
      :visible.sync="dialogVisible"
      center
      title="设置分组"
      :before-close="closeDialog"
      width="60%"
    >
      <!-- 设置分组 -->
      <div class="setGroupEdit">
        <el-radio
          v-model="itemdata.radio"
          label="1"
        >
          {{ vmI18n.t('btn.set_groups') }}
        </el-radio>
        <!-- <input class="groupInput" type="text" v-model="itemdata.setGroupName" >-->
        <div class="setGroupName">
          <!-- 分组名称： -->
          <i class="labelTitle">{{ vmI18n.t('table_label.groupName') }}：</i><el-input
            v-model="itemdata.setGroupName"
            class="groupInput"
          />
        </div>
        <!-- 取消分组 -->
        <el-radio
          v-model="itemdata.radio"
          class="lastRadio"
          label="2"
        >
          {{ vmI18n.t('btn.cancel_groups') }}
        </el-radio>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            label="序号"
            width="50"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item,index) in tHead"
            :key="index"
            :prop="item.name"
            :label="item.label"
            :sortable="item.name=='PM_PRIORITY'"
            align="center"
            min-width="100"
          >
            <template slot-scope="scope">
              <div style="height:24px">
                <el-input
                  v-if="itemdata.radio == 1 && scope.column.property =='PM_PRIORITY'"
                  v-model="scope.row.PM_PRIORITY"
                  class="priority"
                  oninput="this.value.length ==1?this.value= this.value.replace(/[^1-9]/g, ''):this.value= this.value.replace(/\D/g, '')"
                />
                <span v-else>{{ scope.row[scope.column.property] }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <!-- 删除 -->
              <el-button
                type="text"
                size="small"
                @click="del(scope)"
              >
                {{ vmI18n.t('btn.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <OmsButton class="modal-footer" :btn-config="buttonConfig" />
    </el-dialog>
  </div>
</template>
<script>

  import setGroup from '@/js/modal/promotionCenter/setGroup';

  export default setGroup;
</script>
<style lang="less">
@import "~@/css/modal/promotionCenter/setGroup.less";
</style>
