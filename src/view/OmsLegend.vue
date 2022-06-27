<template>
  <div class="queryDesc legend-wrap">
    <div class="legend">
      <!-- 图例 -->
      <span style="font-weight: bold;">{{ vmI18n.t("other.legend") }}:</span>
      <p v-for="(item) in legendsList" :key="item.label">
        <span>{{ item.label }}:&nbsp;</span>
        <button
          :class="item.className"
          v-for="(item) in item.btns"
          :key="`btn-${item.btnText}`"
        >
          {{ item.btnText }}
        </button>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OmsLegend',
  props: {
    legends: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      legendsList: []
    }
  },
  created() {
    this.legendsList = this.legends.length 
      ? this.legends 
      : [
          {
            label: $i18n.t("other.submission_status"), // 提交状态
            btns: [
              { className: 'color-blue', btnText: $i18n.t("btn.published") } // 已发布
            ]
          },
          {
            label: $i18n.t("other.draft_status"), // 草稿状态
            btns: [
              { className: 'color-italic-black', btnText: $i18n.t("btn.draft") } // 草稿
              ]
            },
          {
            label: $i18n.t("other.offline_expired_status"), // 下线/过期状态
            btns: [
              { className: 'color-italic-grey', btnText: $i18n.t("btn.offline") }, // 下线
              { className: 'color-italic-grey', btnText: $i18n.t("btn.overdue") }, // 过期
            ] 
          }
        ]
  }
};
</script>
<style lang="less" scoped>
  .queryDesc.legend-wrap {
    height: 40px;
    line-height: 40px;
    margin: 0; // 避免动态渲染ag高度时10px误差
  }
</style>