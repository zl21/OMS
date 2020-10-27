<!-- 条件设置-->
<template>
  <div class="batchInfoSet">
    <div class="title">
      <i class="iconfontPromotion burgeon-iconliuchengtiaojian" />
      <!-- <span>条件信息设置</span>  -->
      <span>{{ vmI18n.t("other.info_set") }}</span>
    </div>
    <!--商品来源-->
    <div class="info-row row">
      <!-- <div class="form_label">商品来源：</div> -->
      <div class="form_label">{{ vmI18n.t("form_label.goods_source") }}：</div>
      <div class="form_content">
        <SingleBox
          :value="infoData.products_origin"
          :options="groups.productsOrigin"
          @changeSingle="productsFromChange"
        />
      </div>
    </div>
    <!--赠品翻倍-->
    <div class="info-row row">
      <!-- <div class="form_label">赠品翻倍：</div> -->
      <div class="form_label">{{ vmI18n.t("form_label.double_gifts") }}：</div>
      <div class="form_content">
        <SingleBox
          :value="infoData.gift_doubles"
          :options="groups.giftDoubles"
          @changeSingle="checkBuyerLimitFrequencyChange"
        />
        <!-- <div class="form_item">,最大翻倍次数</div> -->
        <div class="form_item">
          ,{{ vmI18n.t("form_label.max_doubling_times") }}
        </div>
        <div class="form_el_input form_item doubleNum">
          <input
            v-model="infoData.max_doubles_limits"
            oninput="this.value= this.value.match(/^[1-9]\d{0,2}/) ? this.value.match(/^[1-9]\d{0,2}/)[0] : ''"
            placeholder
          />
        </div>
      </div>
    </div>
    <!--选择商品方式-->
    <div class="info-row row">
      <!-- <div class="form_label">赠送方式：</div> -->
      <div class="form_label">{{ vmI18n.t("form_label.giving_ways") }}：</div>
      <div class="form_content">
        <SingleBox
          :value="infoData.gift_methods"
          :options="groups.batchGiftMethods"
          @changeSingle="checkGiftChange"
        />
      </div>
    </div>
    <!--商品列表-->
    <batchTables
      :product-list="infoData.list"
      :products_columns="products_columns"
      :gift_columns="gift_columns"
      :itemdata="itemdata"
      :itemdata_gift="itemdata_gift"
      @addRowData="addRowData"
      @deleteRowData="deleteRowData"
      @addList="addList"
      @blurValue="blurValue"
      @batchImport="batchImport"
    />
  </div>
</template>
<script>
  import batch_info_set from "@/js/pages/promotionCenter/details/batch_info_set.js";
  export default batch_info_set;
</script>

<style lang="less">
@import "./../less/common.less";
@lineHeight: 24px;
@inputWidth: 400px;
@fontSize: 12px;
.batchInfoSet {
  padding: 10px;
  border: 3px solid rgb(235, 235, 235);
  .title {
    i {
      font-size: 36px;
      color: rgb(236, 110, 78);
    }
    > span {
      line-height: 36px;
      font-size: 20px;
      font-weight: 600;
    }
  }
  .info-row.row {
    display: flex;
  }
  .row {
    margin: 20px 0px;
    .form_label {
      text-align: center;
      display: inline-block;
      font-size: 12px;
      width: 150px;
      height: 100%;
      line-height: @lineHeight;
      padding: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .item-input {
      label.title {
        width: 90px;
        text-align: center;
      }
      .input-wrap {
        .input-inner {
          // width: @inputWidth;
          .el-input {
            //width: @inputWidth;
            font-size: @fontSize;
            .el-input__inner {
              font-size: @fontSize;
              border-radius: 2px;
              height: @lineHeight;
              line-height: @lineHeight;
              padding: 0 5px;
            }
          }
        }
      }
      .el-select {
        width: 300px;
        .el-input {
          font-size: 12px;
          .el-input__inner {
            font-size: @fontSize;
            height: @lineHeight;
            line-height: @lineHeight;
            border-radius: 2px;
          }
        }
      }
    }
    .burgeon-date-picker {
      .burgeon-date-picker-rel {
        .burgeon-input-wrapper {
          .burgeon-input-icon-normal + .burgeon-input {
            padding: 0;
          }
        }
      }
    }
    .form_content {
      height: 100%;
      line-height: @lineHeight;
      display: inline-block;
      vertical-align: top;
      width: calc(100% - 150px);
      .form_item {
        display: inline;
      }
      .form_el_input {
        width: @inputWidth;
        height: 100%;
        input {
          width: calc(100% - 10px);
          height: 100%;
          padding: 0 5px;
          border-radius: 2px;
          border: 1px solid #dcdfe6;
          box-sizing: border-box;
        }
      }
    }
    .form_button {
      padding: 5px 0 5px;
      text-align: right;
      > button {
        height: 24px;
        line-height: 24px;
        padding: 0 8px;
        border: 1px solid #fd6442;
        font-size: 12px;
        background: #fff;
        color: #fd6442;
        border-radius: 2px;
        //margin-right: 5px;
      }
    }
    .red {
      padding: 5px;
      color: red;
    }
    .form_content .form_el_input.doubleNum {
      display: inline-block;
      width: 60px;
      height: 24px;
    }
    .content_pro_list {
      width: 100%;
      display: flex;
      .detailtable {
        flex: 1;
        flex-direction: column;
      }
      .detailtable:first-child {
        padding-right: 8px;
        box-sizing: border-box;
      }
      .detailtable:last-child {
        padding-left: 8px;
        box-sizing: border-box;
      }
    }
  }
  .row {
    table tr td .item-input .input-wrap .input-inner p.mop {
      right: 16px;
    }
    .el-autocomplete {
      width: 300px;
      .el-input {
        font-size: 12px;
        .el-input__inner {
          text-align: left;
          font-size: 12px;
          height: 24px;
          line-height: 24px;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>
