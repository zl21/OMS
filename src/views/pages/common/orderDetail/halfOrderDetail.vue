<template>
  <div class="ff-order-detail" v-loading="fileImport">
    <div class="ff-order-detail-search-box">
      <matrix-input
        @refreshGetData="refreshData"
        @changeSave="changeSave"
        @newLySave="newLySave"
        @noContent="noContent"
        @errorHasContent="errorHasContent"
        @changeEditSave="changeEditSave"
        @objectEdit="objectEdit"
        @changeStopSave="changeStopSave"
        :stopsave="stopsave"
        :isCustom="isCustom"
        :selectItem="selectItem"
        :objid="objid"
        :objList="objList"
        :activeObj="activeObj"
        :tablename="tablename"
        :inputList="inputList"
        :isdisabled="isdisabled"
        :isActive="isActive"
        :save="save"
        :editsave="editsave"
        ref="inputMatrix"
      ></matrix-input>
    </div>

    <!--条码录入框-->
    <page-nation
      :currentPag="currentPage"
      :pageSize="pageSize"
      :total="total"
      :searchNation="searchNation"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @detail-delete="detailDelete"
      @detail-updateDiscount="updateDiscount"
      :isDeleteBtn="isDeleteBtn && isActive && !isdisabled"
      :isUpdateDiscountBtn="isUpdateDiscountBtn && isActive && !isdisabled"
      :hasImport="tablename === 'DL_B_TRAN_OUT' ? true : false"
      @detailImport="detailImport"
    ></page-nation>
    <!-- 分页 -->
    <div class="ff-order-detail-content">
      <div
        class="ff-order-detail--box"
        v-loading="tableLoading"
        :class="{ 'ff-order-detail--box-full': !matrixShow }"
        v-show="listShow"
      >
        <custom-table
          ref="custom"
          :tHead="tHead"
          :tBody="tBody"
          :subtotalRow="subtotalRow"
          :objList="objList"
          :activeSub="activeSub"
          :isdisabled="isdisabled"
          :isActive="isActive"
          @popShow="popShow"
          @loadChange="loadChange"
          @change="checkChange"
          @amendChange="amendChange"
          @asc="asc"
          @des="des"
        ></custom-table>
        <!-- 表格 -->
      </div>
      <div
        class="ff-popper-class-triangle"
        :style="{ transform: `translate3d(-4px,${translate}px,0)` }"
        v-if="matrixShow"
      ></div>
      <div
        class="ff-o-popper-class-box"
        :style="{ overflow: loading ? 'hidden' : 'auto' }"
        v-show="matrixShow"
        :class="{ 'ff-popper-class-box-full': !listShow }"
      >
        <div
          class="ff-list-hidden-show"
          @click="
            listShow = !listShow;
            matrixShow = true;
          "
          :title="listShow ? '收起列表' : '显示列表'"
        >
          <i class="iconfont" v-show="!listShow">&#xe610;</i>
          <i class="iconfont" v-show="listShow">&#xe611;</i>
        </div>
        <div
          class="ff-o-popper-class"
          v-loading="hasMatch ? loading || revealLoading : loading"
          ref="detail"
        >
          <matrix
            v-if="visible"
            :edit="true"
            :objid="objid"
            :selectItem="selectItem"
            :objList="objList"
            :encode="activeObj.PS_C_PRO_ECODE"
            :priceList="activeObj.PRICE_LIST"
            :tablename="tablename"
            :loading="loading"
            :matchTableData="matchTableData"
            :isdisabled="isdisabled"
            :isActive="isActive"
            :general="general"
            :btnFlag="btnFlag"
            :isStockBtn="isStockBtn"
            :isStockNoEnoughBtn="isStockNoEnoughBtn"
            :isDetailMatrix="isDetailMatrix"
            @enterSave="enterSave"
            @matrixSave="matrixSave"
            @loadChange="loadChange"
            @amendData="amendData"
            @inputFocus="inputFocus"
            ref="matrixOne"
          ></matrix>
          <matrix
            ref="matrixTwo"
            v-if="visible && hasMatch"
            :reveal="true"
            :objid="objid"
            :isdisabled="isdisabled"
            :isActive="isActive"
            :selectItem="selectItem"
            :objList="objList"
            :encode="activeObj.PS_C_PRO_ECODE"
            :tablename="tablename"
            :loading="revealLoading"
            @match="match"
            @loadChange="revealLoadChange"
          ></matrix>
          <div v-if="tBody.length === 0" class="ff-matrix--nodata">暂无数据</div>
        </div>
      </div>
      <div
        class="ff-matrix-hidden-show"
        @click="
          matrixShow = !matrixShow;
          listShow = true;
        "
        :title="matrixShow ? '收起矩阵' : '显示矩阵'"
      >
        <i class="iconfont" v-show="!matrixShow">&#xe610;</i>
        <i class="iconfont" v-show="matrixShow">&#xe611;</i>
      </div>
    </div>
    <!--右侧悬浮框-->
    <!-- 提示框 -->
    <drag-dialog
      v-if="tipsDialog.show"
      :title="tipsDialog.title"
      :visible.sync="tipsDialog.show"
      :close-on-click-modal="false"
      :showClose="true"
      size="mini"
      class="tipsDialog"
      :class="tipsDialog.type"
    >
      <error-tips
        :errorMessage="tipsDialog.errorList"
        :DialogBack="tipsDialog.backBtn"
        :DialogClass="tipsDialog.type"
        v-on:refreshbizlines="errorDialogClose"
      ></error-tips>
    </drag-dialog>
    <Modal
      class="orderDetailModal"
      :mask="true"
      v-model="updateSalePriceFlag"
      :loading="discountLoading"
      :title="'批量修改折扣'"
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
          <FormItem label="修改类型" prop="UPDATE_TYPE">
            <Select
              style="width: 160px"
              :transfer="true"
              v-model="updateSalePriceModal.UPDATE_TYPE"
              @on-change="updateTypeChange"
            >
              <Option
                v-for="item in updateTypeArr"
                :key="item.key"
                :value="item.key"
              >{{ item.showName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="折扣" prop="SALE_DISCOUNT">
            <Input
              v-model="updateSalePriceModal.SALE_DISCOUNT"
              placeholder="请输入折扣"
              @on-change="saleDiscountChange"
              :regx="/^\d*\.{0,1}\d{0,2}$/"
            />
          </FormItem>
          <FormItem label="价格" prop="SALE_PRICE">
            <Input
              v-model="updateSalePriceModal.SALE_PRICE"
              placeholder="请输入价格"
              @on-change="salePriceChange"
              :regx="/^\d*\.{0,1}\d{0,2}$/"
            />
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
  import halfOrderDetail from "@/js/pages/common/orderDetail/halfOrderDetail";
  export default halfOrderDetail;
</script>
<style lang="less" scoped type="text/less">
  @import "~@/css/pages/common/orderDetail/halfOrderDetail"; 
</style>