<template>
  <div
    v-loading="fileImport"
    class="ff-order-detail"
  >
    <div class="ff-order-detail-search-box">
      <matrix-input
        ref="inputMatrix"
        :stopsave="stopsave"
        :is-custom="isCustom"
        :select-item="selectItem"
        :objid="objid"
        :obj-list="objList"
        :active-obj="activeObj"
        :tablename="tablename"
        :input-list="inputList"
        :isdisabled="isdisabled"
        :is-active="isActive"
        :editsave="editsave"
        @refreshGetData="refreshData"
        @changeSave="changeSave"
        @newLySave="newLySave"
        @noContent="noContent"
        @errorHasContent="errorHasContent"
        @changeEditSave="changeEditSave"
        @objectEdit="objectEdit"
        @changeStopSave="changeStopSave"
      />
    </div>

    <!--条码录入框-->
    <page-nation
      :current-pag="currentPage"
      :page-size="pageSize"
      :total="total"
      :search-nation="searchNation"
      :is-delete-btn="isDeleteBtn && isActive && !isdisabled"
      :is-update-discount-btn="isUpdateDiscountBtn && isActive && !isdisabled"
      :has-import="tablename === 'DL_B_TRAN_OUT' ? true : false"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @detail-delete="detailDelete"
      @detail-updateDiscount="updateDiscount"
      @detailImport="detailImport"
    />
    <!-- 分页 -->
    <div class="ff-order-detail-content">
      <div
        v-show="listShow"
        v-loading="tableLoading"
        class="ff-order-detail--box"
        :class="{ 'ff-order-detail--box-full': !matrixShow }"
      >
        <custom-table
          ref="custom"
          :t-head="tHead"
          :t-body="tBody"
          :subtotal-row="subtotalRow"
          :obj-list="objList"
          :active-sub="activeSub"
          :isdisabled="isdisabled"
          :is-active="isActive"
          @popShow="popShow"
          @loadChange="loadChange"
          @change="checkChange"
          @amendChange="amendChange"
          @asc="asc"
          @des="des"
        />
        <!-- 表格 -->
      </div>
      <div
        v-if="matrixShow"
        class="ff-popper-class-triangle"
        :style="{ transform: `translate3d(-4px,${translate}px,0)` }"
      />
      <div
        v-show="matrixShow"
        class="ff-o-popper-class-box"
        :style="{ overflow: loading ? 'hidden' : 'auto' }"
        :class="{ 'ff-popper-class-box-full': !listShow }"
      >
        <!-- 收起/显示列表 -->
        <div
          class="ff-list-hidden-show"
          :title="listShow ? $it('btn.a0') : $it('btn.a1')"
          @click="
            listShow = !listShow;
            matrixShow = true;
          "
        >
          <i
            v-show="!listShow"
            class="iconfont"
          >&#xe610;</i>
          <i
            v-show="listShow"
            class="iconfont"
          >&#xe611;</i>
        </div>
        <div
          ref="detail"
          v-loading="hasMatch ? (loading && ID!=='-1') || revealLoading : (loading && ID!=='-1')"
          class="ff-o-popper-class"
        >
          <matrix
            v-if="visible"
            ref="matrixOne"
            :edit="true"
            :objid="objid"
            :select-item="selectItem"
            :obj-list="objList"
            :encode="activeObj.PS_C_PRO_ECODE"
            :price-list="activeObj.PRICE_LIST"
            :active-obj="activeObj"
            :tablename="tablename"
            :loading="loading"
            :match-table-data="matchTableData"
            :isdisabled="isdisabled"
            :is-active="isActive"
            :general="general"
            :btn-flag="btnFlag"
            :is-stock-btn="isStockBtn"
            :is-stock-no-enough-btn="isStockNoEnoughBtn"
            :isUsefulStockBtn="isUsefulStockBtn"
            :is-detail-matrix="isDetailMatrix"
            @enterSave="enterSave"
            @matrixSave="matrixSave"
            @loadChange="loadChange"
            @amendData="amendData"
            @inputFocus="inputFocus"
          />
          <matrix
            v-if="visible && hasMatch"
            ref="matrixTwo"
            :reveal="true"
            :objid="objid"
            :isdisabled="isdisabled"
            :is-active="isActive"
            :select-item="selectItem"
            :obj-list="objList"
            :encode="activeObj.PS_C_PRO_ECODE"
            :active-obj="activeObj"
            :tablename="tablename"
            :loading="revealLoading"
            @match="match"
            @loadChange="revealLoadChange"
          />
          <div
            v-if="tBody.length === 0"
            class="ff-matrix--nodata"
          >
            <!-- 暂无数据 -->
            {{ $it('other.noDataAvailable') }}
          </div>
        </div>
      </div>
      <!-- 收起/显示矩阵 -->
      <div
        class="ff-matrix-hidden-show"
        :title="matrixShow ? $it('btn.a2') : $it('btn.a3')"
        @click="
          matrixShow = !matrixShow;
          listShow = true;
        "
      >
        <i
          v-show="!matrixShow"
          class="iconfont"
        >&#xe610;</i>
        <i
          v-show="matrixShow"
          class="iconfont"
        >&#xe611;</i>
      </div>
    </div>
    <!--右侧悬浮框-->
    <!-- 提示框 -->
    <drag-dialog
      v-if="tipsDialog.show"
      :title="tipsDialog.title"
      :visible.sync="tipsDialog.show"
      :close-on-click-modal="false"
      :show-close="true"
      size="mini"
      class="tipsDialog"
      :class="tipsDialog.type"
    >
      <error-tips
        :error-message="tipsDialog.errorList"
        :dialog-back="tipsDialog.backBtn"
        :dialog-class="tipsDialog.type"
        @refreshbizlines="errorDialogClose"
      />
    </drag-dialog>
    <!-- 批量修改折扣 -->
    <Modal
      v-model="updateSalePriceFlag"
      class="orderDetailModal"
      :mask="true"
      :loading="discountLoading"
      :title="$it('mT.aj')"
      @on-ok="updateDiscountCorfirm"
      @on-cancel="updateDiscountCancel"
    >
      <div class="orderContent">
        <Form
          :model="updateSalePriceModal"
          :rules="ruleValidate"
          label-position="right"
          :label-width="70"
          inline
        >
          <!-- 修改类型 -->
          <FormItem
            :label="$it('pL.b7')"
            prop="UPDATE_TYPE"
          >
            <Select
              v-model="updateSalePriceModal.UPDATE_TYPE"
              style="width: 160px"
              :transfer="true"
              @on-change="updateTypeChange"
            >
              <Option
                v-for="item in updateTypeArr"
                :key="item.key"
                :value="item.key"
              >
                {{ item.showName }}
              </Option>
            </Select>
          </FormItem>
          <!--折扣-->
          <FormItem
            :label="$it('table_label.discount')"
            prop="SALE_DISCOUNT"
          >
            <Input
              v-model="updateSalePriceModal.SALE_DISCOUNT"
              :placeholder="$it('table_label.enter')"
              :regx="/^\d*\.{0,1}\d{0,2}$/"
              @on-change="saleDiscountChange"
            />
          </FormItem>
          <!--价格-->
          <FormItem
            :label="$it('form_label.price')"
            prop="SALE_PRICE"
          >
            <Input
              v-model="updateSalePriceModal.SALE_PRICE"
              :placeholder="$it('table_label.enter')"
              :regx="/^\d*\.{0,1}\d{0,2}$/"
              @on-change="salePriceChange"
            />
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
  import logicalTransferOrderDetail from '@/js/pages/inventoryCenter/logicalTransferOrder/logicalTransferOrderDetail';

  export default logicalTransferOrderDetail;
</script>
<style lang="less" scoped type="text/less">
  @import "~@/css/pages/inventoryCenter/logicalTransferOrder/logicalTransferOrderDetail";
</style>
