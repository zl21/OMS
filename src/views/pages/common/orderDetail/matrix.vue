<template>
  <div
    v-loading="saveLoading"
    class="ff-matrix--table ff-matrix--big-table"
    :class="{'ff-matrix--min-table': general && !isDetailMatrix}"
  >
    <div
      v-if="general"
      class="ff-matrix--head"
      :class="{'ff-matrix--head-no-data' : !hasStock}"
    >
      <span>
        商品编码︰{{ encode }}&nbsp;&nbsp;&nbsp;
        <span v-if="general && btnFlag">商品名称︰{{ ename }}</span>&nbsp;&nbsp;&nbsp;
        <span v-if="general && btnFlag">吊牌价︰{{ priceList }}</span>
      </span>
      <span
        v-if="hasStock"
        class="ff-matrix--matching"
      >
        <!--数量匹配︰
          <label class="ff-matrix&#45;&#45;radio-one">
            <input type="radio" value="one" v-model="pickerG" /> 在库
          </label>
          <label>
            <input type="radio" value="two" v-model="pickerG" /> 可用
        </label>-->
        <button
          v-show="isStockBtn"
          class="ff-matrix-btn ff-matrix-btn-cancel"
          @click="matchStock"
        >
          <span>匹配在库</span>
        </button>
        <button
          v-show="isStockNoEnoughBtn && isActive && !isdisabled"
          class="ff-matrix-btn ff-matrix-btn-cancel"
          @click="matchNoEnoughUsable"
        >
          <span>匹配库存不足商品</span>
        </button>
        <button
          v-show="isUsefulStockBtn && isActive && !isdisabled"
          class="ff-matrix-btn ff-matrix-btn-cancel"
          @click="matchUsable"
        >
          <span>匹配可用</span>
        </button>
      </span>
      <span
        v-else
        class="ff-matrix--clear"
        @click="empty"
      >
        <i class="iconfont icon-qingkong" />
        {{ chinese.EMPTY }}
      </span>
    </div>
    <div
      v-if="general && hasStock"
      class="ff-matrix--choose"
    >
      <span v-show="tablename !== 'OC_B_RETURN_ORDER'">
        <!--{{tablename === 'DL_B_RETAIL'? '门店': '店仓'}}︰{{store}}-->
        {{ hasReceiving? '发货店仓': '店仓' }}︰{{ store }}
        <label
          v-if="!cp_c_phy_warehouse_id || distribIds !== '' && isStoreFlag"
          class="ff-matrix--active-two ff-matrix--active-label"
        >
          <input
            v-model="usable"
            type="checkbox"
          >
          {{ hasReceiving? '发货可用' : '可用' }}
        </label>
        <label
          v-if="isStoreFlag && (!isDetailMatrix || showDetailStock)"
          class="ff-matrix--active-one ff-matrix--active-label"
        >
          <input
            v-model="stock"
            type="checkbox"
          >
          {{ hasReceiving? '发货在库' : '在库' }}
        </label>
        <!--<label class="ff-matrix&#45;&#45;active-three ff-matrix&#45;&#45;active-label" v-if="hasReceiving">-->
        <!--<input type="checkbox" v-model="stockReceiving" /> 收货在库-->
        <!--</label>-->
        <!--<label class="ff-matrix&#45;&#45;active-four ff-matrix&#45;&#45;active-label" v-if="hasReceiving">-->
        <!--<input type="checkbox" v-model="usableReceiving" /> 收货可用-->
        <!--</label>-->
        <!--{{hasReceiving? '' : '（ 彩色区为发货店仓库存情况 ）'}}-->
      </span>
      <span
        v-if="!hasReceiving"
        :class="isShow ? 'showColor' : 'ff-matrix--clear'"
        @click="empty"
      >
        <i class="iconfont">&#xe648;</i>
        {{ chinese.EMPTY }}
      </span>
    </div>
    <div
      v-if="general && hasStock && hasReceiving"
      class="ff-matrix--choose"
    >
      <span>
        收货店仓︰{{ takeStockName }}
        <!--<label class="ff-matrix&#45;&#45;active-three ff-matrix&#45;&#45;active-label" v-if="hasReceiving">-->
        <!--<input type="checkbox" v-model="stockReceiving" /> 收货在库-->
        <!--</label>-->
        <label
          v-if="hasReceiving"
          class="ff-matrix--active-four ff-matrix--active-label"
        >
          <input
            v-model="usableReceiving"
            type="checkbox"
          > 收货可用
        </label>
        <label
          v-if="hasQtyPrein"
          class="ff-matrix--active-six ff-matrix--active-label"
        >
          <input
            v-model="preinReceiving"
            type="checkbox"
          > 收货在途
        </label>
        <label
          v-if="hasRetail"
          class="ff-matrix--active-five ff-matrix--active-label"
        >
          <input
            v-model="retailReceiving"
            type="checkbox"
          > 零售数量
        </label>
      </span>
      <span
        v-if="hasReceiving && isActive && !isdisabled"
        :class="isShow ? 'showColor' : 'ff-matrix--clear'"
        @click="empty"
      >
        <i class="iconfont">&#xe648;</i>
        {{ chinese.EMPTY }}
      </span>
    </div>
    <div
      v-if="reveal"
      class="ff-matrix--reveal-choose"
    >
      <label
        v-for="(list, index) of matchData.data"
        :key="index"
        :class="{'ff-matrix--radio-one': index === 0}"
      >
        <input
          v-model="pickerR"
          type="radio"
          :value="index"
        >
        {{ list.label }}
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
            <th
              v-for="(size, index) of tHead"
              :key="`'ff-matrix'+${index}`"
            >
              {{ size.name }}
            </th>
            <th class="ff-matrix-font--red">
              行合计
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(value, key, index) of tBody"
            :key="index"
          >
            <td class="ff-matrix--edit-color">
              {{ key }}
            </td>
            <td
              v-for="(list, sub) of tHead"
              :key="sub"
              class="ff-matrix--table-align"
            >
              <ul v-if="reveal">
                <li
                  v-if="value[list.name].count !== undefined"
                  class="ff-matrix--table-reveal"
                >
                  {{ value[list.name].count }}
                </li>
              </ul>
              <ul v-if="edit || general">
                <li
                  v-if="stock"
                  class="ff-matrix--active-one"
                >
                  {{ value[list.name].stock }}
                </li>
                <li
                  v-if="usable"
                  class="ff-matrix--active-two"
                >
                  {{ value[list.name].usable }}
                </li>
                <!--<li v-if="stockReceiving" class="ff-matrix&#45;&#45;active-three">{{value[list.name].stockReceiving}}</li>-->
                <li
                  v-if="usableReceiving"
                  class="ff-matrix--active-four"
                >
                  {{ value[list.name].usableReceiving }}
                </li>
                <li
                  v-if="preinReceiving"
                  class="ff-matrix--active-six"
                >
                  {{ value[list.name].preinReceiving }}
                </li>
                <li
                  v-if="retailReceiving"
                  class="ff-matrix--active-five"
                >
                  {{ value[list.name].retailReceiving }}
                </li>
                <li
                  v-if="value[list.name].disabled"
                  class="ff-matrix--table-disabled"
                >
                  <span>{{ value[list.name].count }}</span>
                </li>
                <li
                  v-else
                  class="ff-matrix--table-compile"
                >
                  <input
                    v-if="value[list.name].count !== undefined"
                    slot="reference"
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
                  >
                  <div
                    v-if="control[value[list.name].TAG]"
                    class="ff-input--prompt"
                  >
                    <i class="iconfont icon-caution" />
                    <span>输入值不能大于4位数</span>
                  </div>
                </li>
              </ul>
            </td>
            <td class="ff-matrix--table-align ff-matrix-font--red">
              <ul>
                <li v-if="stock">
                  {{ calculateByType(value, "stock") }}
                </li>
                <li v-if="usable">
                  {{ calculateByType(value, "usable") }}
                </li>
                <!--<li v-if="stockReceiving"></li>-->
                <li v-if="usableReceiving">
                  {{ calculateByType(value, "usableReceiving") }}
                </li>
                <li v-if="preinReceiving">
                  {{ calculateByType(value, "preinReceiving") }}
                </li>
                <li v-if="retailReceiving">
                  {{ calculateByType(value, "retailReceiving") }}
                </li>
                <li>{{ calculateRow(value, tally, key) }}</li>
              </ul>
            </td>
          </tr>
          <tr class="ff-matrix--table-total">
            <td class="ff-matrix--edit-color">
              合计
            </td>
            <td
              v-for="(size, index) of tHead"
              :key="`'ff-matrix--table'+${index}`"
              class="ff-matrix--table-align"
            >
              {{ calculateLine(size, tally) }}
            </td>
            <td>{{ calculateTotal(tally) }}</td>
          </tr>
        </tbody>
      </table>
      <button
        v-if="reveal"
        class="ff-matrix-btn ff-matrix-btn-cancel"
        :disabled="!isActive || isdisabled"
        :class="{'ff-btn-disabled': !isActive || isdisabled}"
        @click="matching"
      >
        <span>{{ chinese.MATCH }}</span>
      </button>
    </div>
    <div
      v-if="general"
      class="ff-matrix--footer"
    >
      <!--<i class="iconfont icon-tishi "></i>-->
      <!--<span class="ff-matrix-hint">提示︰</span>-->
      <span class="ff-matrix--des" />
      <span>该矩形框表示︰条码档案不存在该条码！</span>
    </div>
    <div
      v-if="general && btnFlag"
      class="ff-matrix--box-btn"
    >
      <button
        ref="btnConfirm"
        class="ff-matrix-btn ff-matrix-btn-cancel"
        @click="confirm"
        @keyup.enter="confirm"
      >
        <span>{{ chinese.CONFIRM }}</span>
      </button>
      <button
        class="ff-matrix-btn ff-matrix-btn-cancel"
        @click="cancel"
      >
        <span>{{ chinese.CANCEL }}</span>
      </button>
    </div>
  </div>
</template>
<script>
  import matrix from '@/js/pages/common/orderDetail/matrix';

  export default matrix;
</script>
<style lang="less" scoped>
  @import "~@/css/pages/common/orderDetail/matrix"; 
</style>
