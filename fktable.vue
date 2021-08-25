<template>
  <div class="fktable">
    <!-- <input
      v-if="inputBox == true"
      type="text"
      id="fkDim"
      v-model="fkDimVal"
      @input="fkDimSearch()"
    /> -->
    <Select
        ref="SelectAutoFocus"
        id="fkDim"
        v-if="inputBox == true"
        v-model="fkDimVal"
        filterable
        remote
        @on-change="vagenChange"
        :label-in-value = true
        :remote-method="fkDimSearch">
        <Option v-for="(option, index) in fkDimData" :value="option.id" :key="index">{{option.value}}</Option>
    </Select>
    <div class="table">
      <table>
        <thead>
          <tr>
            <th v-for="(item, index) in fnfiltersId(tabth, 'ID')" :key="this">
              <input
                type="checkbox"
                @click.stop="checkBoxAll"
                v-model="checkboxAll"
                v-if="!single"
              />
              {{ ChineseDictionary.NUMBER }}
            </th>
            <th v-for="(item, index) in fnfiltersId(tabth)" :key="this">
              {{ item.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in tabrow"
            :key="index"
            :data-index="index"
            :class="{ selected: active == index }"
            @dblclick.stop="colorChange(item[0], index, $event)"
          >
            <td :data-id="item[0]">
              <label>
                <input
                  type="checkbox"
                  name
                  @click.stop="checkBoxChange($event, index, item)"
                  v-if="!single"
                  :data="fkobj.idArr.indexOf(item[0]) >= 0"
                  :checked="fkobj.idArr.indexOf(item[0]) >= 0 ? true : false"
                />
                <span v-if="!single">{{ index + startindex + 1 }}</span>
              </label>
              <input
                type="radio"
                name="fktableSingle"
                :checked="fkobj.idArr.indexOf(item[0]) >= 0 ? true : false"
                @click.stop="checkBoxChange($event, index, item)"
                v-if="single"
              />
              <span v-if="single" @click.stop="indexClick(item, index)">{{
                index + startindex + 1
              }}</span>
            </td>
            <template v-for="(temp, index2) in item">

              <td
                v-if="index2 > 0" :key="index2"
                :data-val="tabth[index2].colname"
                @click.stop="colorChange(item, index, $event)"
              >
                {{ temp }}
              </td>

            </template>
          </tr>
        </tbody>
      </table>
      <p v-if="dataEmpty.flag">
        <span>{{ dataEmpty.message }}</span>
      </p>
    </div>
    <div class="page" v-if="totalRowCount > 0 && range <= totalRowCount">
      <!-- <el-pagination
        small
        layout="prev, pager, next"
        @current-change="currentchange"
        :page-size="range"
        :current-page="Number(visible)"
        :total="
          Math.ceil(totalRowCount / range) > 500 ? 500 * range : totalRowCount
        "
      ></el-pagination> -->
      <Page 
          :current="Number(visible)"
          :page-size="range"
          @on-change="currentchange" 
          :total="Math.ceil(totalRowCount / range) > 500 ? 500 * range : totalRowCount"
          size="small"/>
    </div>
  </div>
</template>

<script>
import fktable from "./js/fktable.js";
export default fktable;
</script>

<style lang="less" scoped>
@import "css/fktable.less";
</style>>
