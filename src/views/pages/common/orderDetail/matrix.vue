<template>
  <div
    class="ff-matrix--table ff-matrix--big-table"
    :class="{'ff-matrix--min-table': general && !isDetailMatrix}"
    v-loading="saveLoading"
  >
    <div class="ff-matrix--head" v-if="general" :class="{'ff-matrix--head-no-data' : !hasStock}">
      <span>
        商品编码︰{{encode}}&nbsp;&nbsp;&nbsp;
        <span v-if="general && btnFlag">商品名称︰{{ename}}</span>&nbsp;&nbsp;&nbsp;
        <span v-if="general && btnFlag">吊牌价︰{{priceList}}</span>
      </span>
      <span class="ff-matrix--matching" v-if="hasStock">
        <!--数量匹配︰
          <label class="ff-matrix&#45;&#45;radio-one">
            <input type="radio" value="one" v-model="pickerG" /> 在库
          </label>
          <label>
            <input type="radio" value="two" v-model="pickerG" /> 可用
        </label>-->
        <button class="ff-matrix-btn ff-matrix-btn-cancel" @click="matchStock" v-show="isStockBtn">
          <span>匹配在库</span>
        </button>
        <button
          class="ff-matrix-btn ff-matrix-btn-cancel"
          @click="matchNoEnoughUsable"
          v-show="isStockNoEnoughBtn  && isActive && !isdisabled"
        >
          <span>匹配库存不足商品</span>
        </button>
        <button
          class="ff-matrix-btn ff-matrix-btn-cancel"
          @click="matchUsable"
          v-show="isUsefulStockBtn  && isActive && !isdisabled"
        >
          <span>匹配可用</span>
        </button>
      </span>
      <span class="ff-matrix--clear" @click="empty" v-else>
        <i class="iconfont icon-qingkong"></i>
        {{chinese.EMPTY}}
      </span>
    </div>
    <div class="ff-matrix--choose" v-if="general && hasStock">
      <span v-show="tablename !== 'OC_B_RETURN_ORDER'">
        <!--{{tablename === 'DL_B_RETAIL'? '门店': '店仓'}}︰{{store}}-->
        {{hasReceiving? '发货店仓': '店仓'}}︰{{store}}
        <label
          class="ff-matrix--active-two ff-matrix--active-label"
          v-if="!cp_c_phy_warehouse_id || distribIds !== '' && isStoreFlag"
        >
          <input type="checkbox" v-model="usable" />
          {{hasReceiving? '发货可用' : '可用'}}
        </label>
        <label
          class="ff-matrix--active-one ff-matrix--active-label"
          v-if="isStoreFlag && (!isDetailMatrix || showDetailStock)"
        >
          <input type="checkbox" v-model="stock" />
          {{hasReceiving? '发货在库' : '在库'}}
        </label>
        <!--<label class="ff-matrix&#45;&#45;active-three ff-matrix&#45;&#45;active-label" v-if="hasReceiving">-->
        <!--<input type="checkbox" v-model="stockReceiving" /> 收货在库-->
        <!--</label>-->
        <!--<label class="ff-matrix&#45;&#45;active-four ff-matrix&#45;&#45;active-label" v-if="hasReceiving">-->
        <!--<input type="checkbox" v-model="usableReceiving" /> 收货可用-->
        <!--</label>-->
        <!--{{hasReceiving? '' : '（ 彩色区为发货店仓库存情况 ）'}}-->
      </span>
      <span v-if="!hasReceiving" :class="isShow ? 'showColor' : 'ff-matrix--clear'" @click="empty">
        <i class="iconfont">&#xe648;</i>
        {{chinese.EMPTY}}
      </span>
    </div>
    <div class="ff-matrix--choose" v-if="general && hasStock && hasReceiving">
      <span>
        收货店仓︰{{takeStockName}}
        <!--<label class="ff-matrix&#45;&#45;active-three ff-matrix&#45;&#45;active-label" v-if="hasReceiving">-->
        <!--<input type="checkbox" v-model="stockReceiving" /> 收货在库-->
        <!--</label>-->
        <label class="ff-matrix--active-four ff-matrix--active-label" v-if="hasReceiving">
          <input type="checkbox" v-model="usableReceiving" /> 收货可用
        </label>
        <label class="ff-matrix--active-six ff-matrix--active-label" v-if="hasQtyPrein">
          <input type="checkbox" v-model="preinReceiving" /> 收货在途
        </label>
        <label class="ff-matrix--active-five ff-matrix--active-label" v-if="hasRetail">
          <input type="checkbox" v-model="retailReceiving" /> 零售数量
        </label>
      </span>
      <span
        v-if="hasReceiving  && isActive && !isdisabled"
        :class="isShow ? 'showColor' : 'ff-matrix--clear'"
        @click="empty"
      >
        <i class="iconfont">&#xe648;</i>
        {{chinese.EMPTY}}
      </span>
    </div>
    <div class="ff-matrix--reveal-choose" v-if="reveal">
      <label
        :class="{'ff-matrix--radio-one': index === 0}"
        v-for="(list, index) of matchData.data"
        :key="index"
      >
        <input type="radio" :value="index" v-model="pickerR" />
        {{list.label}}
      </label>
      <!--<label>
        <input type="radio" :value="index" v-model="pickerR" :disabled="isdisabled" /> {{matchData.secondName}}
      </label>-->
    </div>
    <div
      class="ff-matrix--table-content"
      :class="{'ff-matrix--edit-reveal': edit || reveal, 'ff-matrix--reveal': reveal }"
    >
      <table>
        <thead>
          <tr class="ff-matrix--edit-color">
            <th class="ff-matrix-th-head">
              <div class="ff-matrix-th-head-box">
                <span>颜色</span>
                <span>尺寸</span>
              </div>
            </th>
            <th v-for="(size, index) of tHead">{{size.name}}</th>
            <th class="ff-matrix-font--red">行合计</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key, index) of tBody" :key="index">
            <td class="ff-matrix--edit-color">{{key}}</td>
            <td v-for="(list, sub) of tHead" class="ff-matrix--table-align" :key="sub">
              <ul v-if="reveal">
                <li
                  class="ff-matrix--table-reveal"
                  v-if="value[list.name].count !== undefined"
                >{{value[list.name].count}}</li>
              </ul>
              <ul v-if="edit || general">
                <li v-if="stock" class="ff-matrix--active-one">{{value[list.name].stock}}</li>
                <li v-if="usable" class="ff-matrix--active-two">{{value[list.name].usable}}</li>
                <!--<li v-if="stockReceiving" class="ff-matrix&#45;&#45;active-three">{{value[list.name].stockReceiving}}</li>-->
                <li
                  v-if="usableReceiving"
                  class="ff-matrix--active-four"
                >{{value[list.name].usableReceiving}}</li>
                <li
                  v-if="preinReceiving"
                  class="ff-matrix--active-six"
                >{{value[list.name].preinReceiving}}</li>
                <li
                  v-if="retailReceiving"
                  class="ff-matrix--active-five"
                >{{value[list.name].retailReceiving}}</li>
                <li v-if="value[list.name].disabled" class="ff-matrix--table-disabled">
                  <span>{{value[list.name].count}}</span>
                </li>
                <li v-else class="ff-matrix--table-compile">
                  <input
                    v-if="value[list.name].count !== undefined"
                    type="text"
                    :disabled="isdisabled || !isActive"
                    :data-id="`${index}-${sub}`"
                    :value="value[list.name].count"
                    class="ff-matrix--input"
                    :class="{'ff-matrix--input-tip': control[value[list.name].TAG],'ff-matrix--input-disabled': isdisabled || !isActive}"
                    @focus="inputFocus($event)"
                    @keyup.enter="keyEntry"
                    @input="countChange($event, key, list, value[list.name].TAG)"
                    @blur="inputBlur(value[list.name].TAG)"
                    slot="reference"
                  />
                  <div class="ff-input--prompt" v-if="control[value[list.name].TAG]">
                    <i class="iconfont icon-caution"></i>
                    <span>输入值不能大于4位数</span>
                  </div>
                </li>
              </ul>
            </td>
            <td class="ff-matrix--table-align ff-matrix-font--red">
              <ul>
                <li v-if="stock">{{calculateByType(value, "stock")}}</li>
                <li v-if="usable">{{calculateByType(value, "usable")}}</li>
                <!--<li v-if="stockReceiving"></li>-->
                <li v-if="usableReceiving">{{calculateByType(value, "usableReceiving")}}</li>
                <li v-if="preinReceiving">{{calculateByType(value, "preinReceiving")}}</li>
                <li v-if="retailReceiving">{{calculateByType(value, "retailReceiving")}}</li>
                <li>{{calculateRow(value, tally, key)}}</li>
              </ul>
            </td>
          </tr>
          <tr class="ff-matrix--table-total">
            <td class="ff-matrix--edit-color">合计</td>
            <td
              v-for="(size, index) of tHead"
              class="ff-matrix--table-align"
            >{{calculateLine(size, tally)}}</td>
            <td>{{calculateTotal(tally)}}</td>
          </tr>
        </tbody>
      </table>
      <button
        class="ff-matrix-btn ff-matrix-btn-cancel"
        @click="matching"
        v-if="reveal"
        :disabled="!isActive || isdisabled"
        :class="{'ff-btn-disabled': !isActive || isdisabled}"
      >
        <span>{{chinese.MATCH}}</span>
      </button>
    </div>
    <div class="ff-matrix--footer" v-if="general">
      <!--<i class="iconfont icon-tishi "></i>-->
      <!--<span class="ff-matrix-hint">提示︰</span>-->
      <span class="ff-matrix--des"></span>
      <span>该矩形框表示︰条码档案不存在该条码！</span>
    </div>
    <div class="ff-matrix--box-btn" v-if="general && btnFlag">
      <button
        class="ff-matrix-btn ff-matrix-btn-cancel"
        @click="confirm"
        @keyup.enter="confirm"
        ref="btnConfirm"
      >
        <span>{{chinese.CONFIRM}}</span>
      </button>
      <button class="ff-matrix-btn ff-matrix-btn-cancel" @click="cancel">
        <span>{{chinese.CANCEL}}</span>
      </button>
    </div>
  </div>
</template>
<script>
  import matrix from "@/js/pages/common/orderDetail/matrix.js";
  export default matrix;
</script>
<style lang="less" scoped>
  @import "~@/css/pages/common/orderDetail/matrix"; 
</style>
