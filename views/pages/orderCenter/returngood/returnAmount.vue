<!--
 * @Author: xx
 * @Date: 2021-05-21 18:08:56
 * @LastEditTime: 2021-05-21 18:13:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /front-standard-product/src/views/pages/orderCenter/returnOrder/return.vue
-->
<template>
  <div>
    <ul class="calculation-main">
      <li>
        <div class="calculation-item">
          <span>商品应退金额</span>
          <label>1495.00</label>
        </div>
        <div class="calculation-item bg">
          <span>商品实退金额</span>
          <label>1495.00</label>
        </div>
      </li>
      <li class="symbol">+</li>
      <li>
        <div class="calculation-item">
          <span>应退运费</span>
          <label>1495.00</label>
        </div>
      </li>
      <li class="symbol">+</li>
      <li>
        <div class="calculation-item">
          <span>调整金额</span>
          <label>1495.00</label>
        </div>
      </li>
      <li class="symbol">=</li>
      <li>
        <div class="calculation-item">
          <span class="black">最终应退总金额</span>
          <label>1495.00</label>
        </div>
        <div class="calculation-item bg">
          <span class="black">最终实退总金额</span>
          <label>1495.00</label>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
.calculation-main {
  display: flex;
  padding: 8px;
  background: fade(#4560ab, 8);
  li {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    .calculation-item {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      min-width: 50%;
      &.bg {
        background: fade(#4560ab, 10);
      }
      input {
        border: 1px solid #ccc;
        border-radius: 4px;
        height: 28px;
        text-align: center;
        z-index: 9;
      }
      span,
      label {
        height: 30px;
        line-height: 35px;
        font-weight: bold;
        font-size: 12px;
        color: #8d91a1;
        width: 100%;
        text-align: center;
      }
      label {
        height: 30px;
        line-height: 25px;
        font-size: 16px !important;
        color: #ff6951;
        .black {
          color: black;
        }
      }
    }
    &.symbol {
      flex: 0.1;
      font-size: 30px;
      color: #c3c6d2;
    }
  }
}
</style>