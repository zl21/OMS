<template>
  <div class="queryDesc">
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