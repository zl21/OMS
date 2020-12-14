<template>
    <div :class="prefixCls">
        <div class = "complex-spin-fix" v-if="loading">
             <Spin fix >
                <Icon type="ios-loading" size=30 class="demo-spin-icon-load"></Icon>
            </Spin>
        </div>
         
        <div class="dialog-item dialog_left">
            <!--tree-->
            <div class="left_top">
                <div>筛选条件</div>
                <div>
                    <icon v-if="showTree===true" :custom="icon_open[1]" @click="treeOpen(showTree)"></icon>
                    <icon v-if="showTree===false" :custom="icon_open[0]" @click="treeOpen(showTree)"></icon>
                    <icon :custom="icon_refresh"  @click="refreshall"></icon>
                </div>
            </div>
            <div class="left_center">
                 <div class = "complex-spin-fix" v-if="treeLoading">
                    <Spin fix >
                        <Icon type="ios-loading" size=30 class="demo-spin-icon-load"></Icon>
                    </Spin>
                </div>
                <Tree :data="treeLists" show-checkbox
                      ref="Tree"
                      @on-select-change="getSelectedNodes"
                      @on-check-change="getCheckedNodes"
                ></Tree>
            </div>
        </div>
        <div class="dialog-item dialog_center">
             <div class = "complex-spin-fix" v-if="tableLoading">
                <Spin fix >
                    <Icon type="ios-loading" size=30 class="demo-spin-icon-load"></Icon>
                </Spin>
            </div>
            <div >
                <Tabs size="small" @on-click="tabClick" :animated="false">
                    <TabPane v-for="(item,key) in TabPaneData"  :key="key" :label="item.tab" >
                        <div class="dialog_center_page" >
                            <div class="dialog_p10">
                                <Page :total="item.total"
                                       size="small"
                                      :page-size="item.pageSize"
                                      :current="item.pageNum"
                                      @on-change="pageChange"
                                      @on-page-size-change="pageChangeSize"
                                      :page-size-opts="item.pageOptions"
                                      show-total  show-sizer show-elevator/>
                            </div>
                            <div class="table">
                                <Table :columns="item.columns"
                                       ref="Table"
                                       :highlight-row='true'
                                       :clickTimerTask="100"
                                       :height="item.height"
                                       @on-row-dblclick="rowdbClick"
                                       @on-row-click="rowClick"
                                        v-bind="item.tableprops"
                                        v-on="item.tablevent"
                                       :data="item.list"
                                >
                                </Table>
                            </div>
                            <div class="dialog_center_bottom">
                                <div class="dialog_center_bottom_fix">
                                    <i-input
                                        @on-change="inputchange"
                                        @on-keydown="inputkeydown"
                                        search
                                        @on-search="inputsearch"
                                    >
                                        <span slot="prepend">{{item.searchName}}</span>
                                    </i-input>
                                </div>
                                <template v-if="item.checked!==undefined">
                                    <Checkbox
                                        :value="false"
                                        @on-change="checkboxchange"
                                        size="small">排除</Checkbox>
                                </template>
                            </div>

                        </div>
                    </TabPane>
                </Tabs>
            </div>

        </div>
        <div class="dialog-operation" v-if="index === 0">
            <div>
                <Icon custom="operation-icon iconfont iconbj_open" @click="operationTwo"></Icon>
                <icon custom="operation-icon iconfont iconbj_left" @click="operation"></icon>
            </div>
        </div>
        <div class="dialog-item dialog_right">
            <div class="left_top right_top">
                <div>已选中({{resultMessage.total || 0 }})</div>
                <div>
                    <Icon v-if="saveShow" :custom="icon_save" @click="saveFun"></Icon>
                    <icon :custom="icon_delect" @click="delecFun"></icon>
                </div>
            </div>
            <div class="right_center">
                <ul v-if="resultMessage.list.length>0">
                    <li v-for="(item,index) in resultMessage.list">
                        <p>{{ item.exclude? '排除：' : '' }}{{item.screen_string}}</p>
                        <i class="iconfont iconbj_delete2" @click="deleteLi(index,item)"></i>
                    </li>
                </ul>

            </div>

        </div>
    </div>
</template>
<script>
import Icon from '../icon';
import Tree from '../tree/tree.vue';
import Tabs from '../tabs/tabs.vue';
import Table from '../table/table.vue';
import Input from '../input/input.vue';
import Checkbox from '../checkbox/checkbox.vue';
import Page from '../page/page.vue';

import burgeonConfig from '../../assets/config';

const prefixCls = `${burgeonConfig.prefixCls}-dialog`;

export default {
  name: 'Complexs',
  components: {
    Icon,
    Tree,
    Tabs,
    Table,
    Input,
    Checkbox,
    Page
  },
  props: {
    treedata: {
      type: Array,
      default() {
        return [];
      }
    },
    componentData: {
      type: Array,
      default() {
        return [];
      }
    },
    resultData: {
      type: Object,
      default() {
        return {};
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    treeLoading: {
      type: Boolean,
      default: false
    },
    tableLoading: {
      type: Boolean,
      default: false
    },
    saveShow: {
      type: Boolean,
      default: true
    },
    open: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: Boolean,
      default: false
    },
    icon_open: {
      type: Array,
      default() {
        return ['iconfont iconbj_shrink', 'iconfont iconbj_eapansion'];
      }
    },
    icon_refresh: {
      type: String,
      default: 'iconfont  iconbj_remove'
    },
    icon_save: {
      type: String,
      default: 'iconfont  iconbj_save'
    },
    icon_delect: {
      type: String,
      default: 'iconfont  iconbj_delete'
    },
    checkedList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      columns: [],
      treeNewData: {},
      prefixCls: prefixCls,
      showTree: this.open,
      component: [
        {
          tab: '筛选结果',
          columns: [],
          list: [],
          search: '',
          pageOptions: [10, 20, 50, 100],
          height: 200,
          searchName: '全局检索',
          checked: false
        }
      ],
      resultRightData: {
        total: 0,
        list: []
      },
      templateName: '',
      index: 0
    };
  },
  computed: {
    treeLists() {
      this.treeNewData = this.treedata;
      return this.treeNewData;
    },
    TabPaneData() {
      let data = Object.assign(this.component, this.componentData);
      return data;
    },
    resultMessage() {
      let data = Object.assign(this.resultRightData, this.resultData);
      return data;
    }
  },
  methods: {
    getSelectedNodes(obj) {
      this.$emit('on-select-tree', obj, this);
    },
    getCheckedNodes(obj) {
      this.$emit('on-change-tree', obj, this);
    },
    tabClick(index) {
      this.index = index;
      this.$emit('on-click-tab', index, this);
    },
    pageChange(index) {
      this.$emit('on-change-page', index, this);
    },
    pageChangeSize(index) {
      this.$emit('on-change-pageSize', index, this);
    },
    rowdbClick(index, row) {
      this.$emit('on-row-dblclick', index, row, this);
    },
    rowClick(index, row) {
      this.$emit('on-row-click', index, row, this);
    },
    inputchange(event) {
      this.$emit('on-change', event, this);
    },
    inputkeydown(event) {
      this.$emit('on-keydown', event, this);
    },
    inputsearch(event) {
      this.$emit('on-search', event, this);
    },
    checkboxchange(value) {
      this.$emit('on-checkbox-change', value, this);
    },
    operationTwo() {
      this.$emit('on-transfer-two', this);
    },
    operation() {
      this.$emit('on-transfer', this);
    },
    deleteLi(index, tem) {
      this.$emit('on-delectli', index, tem, this);
    },
    treeOpen(checked) {
      this.showTree = !checked;
      this.treeNewData.forEach(item => {
        item.expand = !item.expand;
      });
    },
    refreshall() {
      this.$emit('on-refresh', this);
    },
    saveFun() {
      this.$Modal.confirm({
        title: '保存为模板',
        render: h => h('Input', {
            props: {
              value: this.templateName,
              placeholder: '请输入模板名称'
            },
            on: {
              'on-change': val => {
                this.templateName = val.target.value;
              }
            }
          }),
        mask: true,
        width: 400,
        closable: true,
        showCancel: true,
        onOk: obj => {
          this.$emit('on-saveBtn', this.templateName, this);
          this.templateName = '';
        },
        onCancel: () => {
          this.templateName = '';
        }
      });
    },
    delecFun() {
      this.$emit('on-deleBtn', this);
    },
    shiftAdd(obj) {
      this.$emit('on-shiftAdd', obj);
    },
    ctrlAdd(obj){
      this.$emit('on-ctrlAdd', obj);
    }
  },
  mounted() {
    /**/
  },
  created() {}
};
</script>
