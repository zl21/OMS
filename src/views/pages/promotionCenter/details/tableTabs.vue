<template>
  <div class="detailTabs">
    <slot name="MatchOperate"></slot>

    <!--因为element-ui 不可编辑tab标签内容  因此需要重写组件-->
    <tabList :currentTab.sync="currentTab" :panels="productsArrs">
      <div slot="tab_content">
        <div v-for="(panel,index) in productsArrs" :key="index" v-if="showContent(index)">
          <div class="detail_rules" v-if="panel.rules && panel.rules.length>0">
            <CTSIT v-for="(rule,_index) in panel.rules" :key="_index" :rule="rule"></CTSIT>
          </div>
          <detailTable
            :tColumns="columns"
            :tData="productsArrsView[index].data"
            :current.sync="productsArrsView[index].current"
            :total="productsArrsView[index].total"
            :itemdata="itemdata"
            :pageSize="productsArrsView[index].pageSize"
            @alertRowData="alertOneTableRowData"
            @deleteRowData="deleteOneTableRowData"
            @on-page-change ="onePageChange"
            @on-page-size-change="onOnePageSizeChange"
          >
            <div slot="action" class="form_button">
              <ButtonFkDialog :itemdata="itemdataFk"  @getFkChooseItem="getOnePageButtonFkChoose"></ButtonFkDialog>
              <button class="white"  @click="addOneTableRowData(index)">新增</button>
              <button class="white"  @click="importData">导入</button>
            </div>
          </detailTable>
        </div>
      </div>
    </tabList>

     <!--导入组件-->
    <!-- <div  v-if="show_dialog">
      <Modal class="dialog" v-model="show_dialog" :footer-hide="dialogSet.footerHide"  :title="dialogSet.dialogTitle"   :mask="dialogSet.mask"  >
          <component :ref="popDialog"   :componentData="dialogModal"  v-bind:is="currentView"  @returnData="returnData"  ></component>
      </Modal>
    </div> -->
    <div  v-if="show_dialog">
      <Modal class="dialog" v-model="show_dialog" :footer-hide="dialogSet.footerHide"  :title="dialogSet.dialogTitle"   :mask="dialogSet.mask"  >
        <importDialog :componentData="dialogModal" @returnData="returnData" ></importDialog>
      </Modal>
    </div>
  </div>
</template>
<script>
import detailTable from "./table";
import CTSIT from "./CTSIT";
import tabList from "./tab_list";
import ButtonFkDialog from  "./../components/buttonFkDialog";
// const _import = file =>
//   require("@/jordanComponents/views/" + file + ".vue").default;
import importDialog from "./../components/importDialog";
export default {
  name: "detailTabs",
  components: {
    detailTable,
    CTSIT,
    tabList,
    ButtonFkDialog,
    importDialog
  },
  computed: {
    currentTab: {
      get() {
        return this.current;
      },
      set(val) {
        this.$emit("update:current", val);
      }
    },
    itemdataFk(){
      try{
        let itemdata = JSON.parse(JSON.stringify(this.itemdata));
        itemdata.isOneData = false;
        itemdata.fkdisplay = 'mop';
        itemdata.isObject = true;
        return itemdata;
      }catch(e){}
    },
  },
  props: {
    current: {
      type: Number
    }, // 当前默认展示的tab
    productsArrs: {
      type: Array
    },
    columns: {
      type: Array
    },
    itemdata: {
      type: Object
    },
    productsArrsView:{
      type:Array
    },
    moduleMode:{
      type:String
    }
  },
  data() {
    return {
      // currentView:'',  //弹框
      // popDialog:'',     
      dialogModal:{},   //弹框传参
      show_dialog:false,   //弹框是否关闭
      dialogSet:{       //弹框层设置  标题、 隐藏底部 、是否遮罩
         dialogTitle:'',
         footerHide:true,
         mask:true,
      }
    };
  },
  methods: {
    showContent(index) {
      return this.currentTab == index;
    },
    /**
     * @tabindex 标记第几个表格
     */
    addOneTableRowData(tabindex) {
      this.$emit("addOneTableRowData", tabindex);
    },
    /**
     * @rowindex 行数据的标记
     */
    deleteOneTableRowData(row,currentPage ,pageSize) {
      let tabindex = Number(this.currentTab);
      if (tabindex >= 0) this.$emit("deleteOneTableRowData", tabindex, row,currentPage ,pageSize);
    },
    /**
     * 修改表格数据
     */
    alertOneTableRowData(row ,currentPage ,pageSize,force){
       let tabindex = Number(this.currentTab);
       if (tabindex >= 0)  this.$emit('alertOneTableRowData', tabindex,row ,currentPage , pageSize ,force);
    },
    onePageChange(val){
      let tabindex = Number(this.currentTab);
      if (tabindex >= 0) this.$emit("onePageChange", tabindex, val);
    },
    onOnePageSizeChange(val){
      let tabindex = Number(this.currentTab);
      if (tabindex >= 0) this.$emit("onOnePageSizeChange", tabindex, val);
    },
    getOnePageButtonFkChoose(val){
      let tabindex = Number(this.currentTab);
      if (tabindex >= 0) this.$emit("getOnePageButtonFkChoose", tabindex, val);
    },
    /**
     * 导入
     */
    importData(){
      let self = this;
      this.dialogModal = {};
      this.dialogModal.tableName = this.itemdata.reftable||'PS_C_SKU';
      this.dialogModal.mode = this.moduleMode;
      // let  _component = "poptabdialog";
      // Vue.component(
      //   _component,
      //   Vue.extend(_import("onlinePromotion/components/importDialog"))
      // );
      // self.currentView = _component;
      self.dialogSet.dialogTitle = '导入';
      self.show_dialog = true;
    },
    /**
     * 返回值，用于弹框返回解析
     */
    returnData(data){
        let tabindex = Number(this.currentTab);
        this.$emit('returnOneTableData',data,tabindex)
    },
    /**
     * 关闭弹框
     */
    closeDialog(){
       this.show_dialog = false;
    }

  },
  mounted() {}
};
</script>
