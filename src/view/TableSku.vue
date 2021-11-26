<!--
 * @Author: your name
 * @Date: 2021-11-01 13:50:01
 * @LastEditTime: 2021-11-02 18:08:09
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/src/view/tableSku.vue
-->
<template>
  <div class="tableSku">
    <!--不支持enter方法  弃用-->
    <!-- <AutoComplete
      v-model="value"
      @on-select="handleSelect"
      @on-search="handleSearch"
      placeholder
    >
      <Option v-for="item in queryList" :value="item[showCol]" :key="item[showCol]">
        <span v-for="(value, key, index) of item" :title="value" :key="index">{{value}}</span>
      </Option>
    </AutoComplete>-->
    <el-autocomplete
      :ref="'autocomplete'+itemdata.colname"
      v-model="value"
      class="table-input"
      :popper-class="'fkAutocomplete'+itemdata.colname"
      type="text"
      :fetch-suggestions="handleSearch"
      :trigger-on-focus="false"
      @select="handleSelect"
      @keyup.native="keyUp"
      @keyup.enter.native="autocompleteEnter"
      @blur="autocompleteBlur"
    >
      <template slot-scope="{ item }">
        <span
          v-for="(value, key, index) of item"
          :key="index"
          :class="`length${Object.keys(item).length - 2}`"
          :title="value"
        >{{ value }}</span>
      </template>
    </el-autocomplete>
  </div>
</template>

<script>
  import TableSku from 'burgeonComponents/js/tableSku';
  export default TableSku;
</script>
