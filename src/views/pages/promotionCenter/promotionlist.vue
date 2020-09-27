<template>
  <div
    v-loading="loadings"
    class="promactiqueryList"
  >
    <div style="height: 160px;">
      <!-- 过滤器 -->
      <div class="body_select_three">
        <!--促销编号--->
        <div class="item_three_1">
          <span>
            <i class="query_titile">促销编号:</i>
            <input
              v-model="acti_no"
              type="text"
              class="pure_text"
              style="width: calc(100% - 60px)"
              @keyup="formUserKeyUp"
            >
          </span>
        </div>
        <!-- 活动日期 -->
        <div class="item_three_1">
          <span>
            <i class="query_titile">活动日期:</i>
            <el-date-picker
              v-model="acti_date"
              class="M_date_clas"
              format="yyyy-MM-dd"
              value-format="yyyyMMdd"
              type="daterange"
              placeholder="选择日期范围"
            />
          </span>
        </div>
        <!-- 活动名称 -->
        <div class="item_three_1">
          <span>
            <i class="query_titile">活动名称:</i>
            <input
              v-model="acti_name"
              type="text"
              class="pure_text"
              style="width: calc(100% - 60px)"
              @keyup="formUserKeyUp"
            >
          </span>
        </div>
        <!-- 线下门店 -->
        <!-- <div class="item_three_1">
          <myInputLd :isActive="true" :isDisabled="false" :itemdata="my_input_st.itemdata"></myInputLd>
        </div>-->
        <!-- 线上门店 -->
        <div class="item_three_1">
          <TableInput
            :is-active="true"
            :is-disabled="false"
            :itemdata="my_input_sh.itemdata"
          />
        </div>
        <!-- 商品 -->
        <div class="item_three_1">
          <span>
            <i class="query_titile">参与商品:</i>
            <TableInput
              style="width: calc(100% - 60px)"
              :is-active="true"
              :isdisabled="false"
              :itemdata="product.itemdata_xitong"
              :has-label="false"
              :is-promotion="true"
            />
          </span>
        </div>
        <!-- 分组-->
        <div class="item_three_1">
          <span>
            <i class="query_titile">分组名称:</i>
            <input
              v-model="acti_group"
              type="text"
              class="pure_text"
              style="width: calc(100% - 60px)"
              @keyup="formUserKeyUp"
            >
          </span>
        </div>
        <!--操作人-->
        <div class="item_three_1">
          <span>
            <i class="query_titile">操作人:</i>
            <input
              v-model="release_name"
              type="text"
              class="pure_text"
              style="width: calc(100% - 60px)"
              @keyup="formUserKeyUp"
            >
          </span>
        </div>
        <!--促销状态-->
        <div class="item_three_1">
          <span>
            <i class="query_titile">促销状态:</i>
            <div class="query_select">
              <Select
                v-model="STATUS"
                multiple
              >
                <Option
                  v-for="item in diStatusArr"
                  :key="item.value"
                  :value="item.value"
                >{{ item.label }}</Option>
              </Select>
            </div>
          </span>
        </div>
        <div class="item_three_1" />
        <div class="item_three_1" />
        <div class="item_three_1" />

        <!-- 搜索按钮 -->
        <div class="item_three_1 button-right">
          <button
            type="button"
            class="burgeon-btn burgeon-btn-posdefault burgeon-btn-circle"
            style="background: rgb(235, 72, 50); color: rgb(255, 255, 255);"
            @click="getData"
          >
            <i class="burgeon-icon burgeon-icon-ios-search" />
            <span>搜索</span>
          </button>
          <button
            type="button"
            class="burgeon-btn burgeon-btn-posdefault burgeon-btn-circle"
            style="background: rgb(15, 51, 101); color: rgb(255, 255, 255); border-color: rgb(15, 51, 101);"
            @click="Reset"
          >
            <!---->
            <i class="burgeon-icon burgeon-icon-ios-refresh" />
            <span>重置</span>
          </button>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="head_botton">
        <button
          class="white"
          @click="promotionClick"
        >
          新增
        </button>
        <button
          class="white"
          @click="promotionBlukClick"
        >
          批量新增
        </button>
        <button
          class="white"
          @click="publish"
        >
          发布
        </button>
        <button
          class="white"
          @click="actOffline"
        >
          下线
        </button>
        <button
          class="white"
          @click="copy"
        >
          复制
        </button>
        <button
          class="white"
          @click="deleteActi"
        >
          删除
        </button>
        <button
          class="white"
          @click="setGroup"
        >
          设置分组
        </button>
        <button
          class="white"
          @click="simulation"
        >
          模拟仿真
        </button>
        <Favorite />
      </div>
    </div>
    <!-- 列表部分 -->
    <div class="main_body">
      <el-tabs
        v-model="activeName"
        type="border-card"
      >
        <el-tab-pane
          :label="tabTotal.one"
          name="1"
        >
          <!-- hasNation 是否自动计算序号 -->
          <aTable
            ref="agGridChild1"
            :ag-table-config="agTableConfig1"
            @on-page-change="pageChange1"
            @on-page-size-change="pageSizeChange1"
            @on-row-dblclick="handDblClick"
          />
        </el-tab-pane>

        <el-tab-pane
          :label="tabTotal.two"
          name="2"
        >
          <aTable
            ref="agGridChild2"
            :ag-table-config="agTableConfig2"
            @on-page-change="pageChange2"
            @on-page-size-change="pageSizeChange2"
            @on-row-dblclick="handDblClick"
          />
        </el-tab-pane>

        <el-tab-pane
          :label="tabTotal.three"
          name="3"
        >
          <aTable
            ref="agGridChild3"
            :ag-table-config="agTableConfig3"
            @on-page-change="pageChange3"
            @on-page-size-change="pageSizeChange3"
            @on-row-dblclick="handDblClick"
          />
        </el-tab-pane>

        <el-tab-pane
          :label="tabTotal.four"
          name="4"
        >
          <aTable
            ref="agGridChild4"
            :ag-table-config="agTableConfig4"
            @on-page-change="pageChange4"
            @on-page-size-change="pageSizeChange4"
            @on-row-dblclick="handDblClick"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="promactiIcon">
      <div class="legend">
        <span style="font-weight: bold;">图例:</span>
        <p>
          <span>提交状态:&nbsp;</span>
          <button class="color-blue">
            已发布
          </button>
        </p>
        <p>
          <span>草稿状态:&nbsp;</span>
          <button class="color-italic-black">
            草稿
          </button>
        </p>
        <p>
          <span>下线/过期状态:&nbsp;</span>
          <button class="color-italic-grey">
            下线
          </button>
          <button class="color-italic-grey">
            过期
          </button>
        </p>
      </div>
    </div>
    <div />
    <Mydialog
      v-if="dataError.show"
      :title="dataError.title"
      :visible.sync="dataError.show"
      :show-close="false"
      class="messageDialog"
      :close-on-click-modal="false"
      :class="dataError.type"
    >
      <errorMessage
        :error-message="dataError.errorList"
        :dialog-back="dataError.backBtn"
        :dialog-class="dataError.type"
        @refreshbizlines="errorDialogClose"
      />
    </Mydialog>
    <dialogVisible
      :dialog-visible="dialog_visible"
      :check-list="checkList"
      :set-group-table-data="setGroupTableData"
      @closeDialog="closeDialog"
    />
    <!-- 查看日志弹框 -->
    <Modal v-model="modal">
      <Table
        :columns="logData.columns"
        :data="logData.data"
        :height="300"
      />
      <div slot="footer">
        <Button
          type="error"
          @click="closeModal"
        >
          关闭
        </Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import axios from 'axios';
  // import myInput from 'framework/components/element/input';
  import customTable from 'framework/components/table/P_customTable.vue';
  // import currentUserAccessDistrib from '@/components/input/currentUserAccessDistrib';
  // import currentUserAccessFirstLevel from '@/components/input/P_currentUserAccessfirstLevel'; // 促销大类
  // import currentUserAccessLastLevel from '@/components/input/P_currentUserAccesslastLevel'; // 促销中类
  // import currentUserAccessStore from '@/components/input/currentUserAccessStore';
  // import matrixInput from '@/jordanComponents/views/onlinePromotion/components/P_matrixInput';
  import errorMessage from 'framework/components/tablelist/error.vue';
  import Mydialog from 'framework/components/dialog/mydialog.vue';
  // import { post } from '@/utils/request';
  // import myInputLd from 'framework/components/element/input';
  import TableInput from 'framework/components/element/input';
  import aTable from 'professionalComponents/table/agGridTable.vue';
  import dialogVisible from './setGroup';
  import Favorite from './components/favorite';


  const baseColumnDefs = [
    {
      headerName: '序号',
      field: 'SERIAL_NO',
      pinned: 'left',
      maxWidth: 120,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      sort: 'asc',
      suppressMovable: true
    },
    {
      headerName: '促销编号',
      field: 'ACTI_NO',
    },
    {
      headerName: '活动名称',
      field: 'ACTI_NAME',
    },
    {
      headerName: '参与店铺',
      field: 'STORE_NAMES',
    },
    {
      headerName: '活动时间段',
      field: 'ACTI_DATE',
    },
    {
      headerName: '失效下线时间',
      field: 'DOWN_TIME',
    },
    {
      headerName: '剩余可送',
      field: 'STOCK',
    },
    {
      headerName: '已送数量',
      field: 'SEND',
    },
    {
      headerName: '状态',
      field: 'status',
    },
    {
      headerName: '分组名称',
      field: 'GROUP_NAME',
    },
    {
      headerName: '优先级',
      field: 'LEVEL',
    },
    {
      headerName: '创建人',
      field: 'OWNERENAME',
    },
    {
      headerName: '创建时间',
      field: 'CREATIONDATE',
    },
    {
      headerName: '修改人',
      field: 'OWNERENAME',
    },
    {
      headerName: '修改时间',
      field: 'MODIFIEDDATE',
    },
    {
      headerName: '备注',
      field: 'REMARK',
    },
    {
      headerName: '操作',
      field: 'ACTION_LOG',
    }
  ];
  export default {
    data() {
      return {
        modal: false, // 查看日志弹框
        logData: {
          columns: [
            {
              title: '序号',
              type: 'index',
              width: 60,
              align: 'center'
            },
            {
              title: '操作时间',
              key: 'creationdate'
            },
            {
              title: '操作人',
              key: 'operator'
            },
            {
              title: '操作描述',
              key: 'describes'
            }
          ],
          data: []
        },
        buttons: [], // 按钮权限列表
        checkedArr1: [],
        checkedArr2: [],
        checkedArr3: [],
        checkedArr4: [],
        my_input_sh: {
          itemdata: {
            col: 1,
            // colid: this.$store.state.forginkeys.columnIds.shop || '1700805184',
            colid: '1700805184',
            colname: 'CP_C_SHOP_ID', // 当前字段的名称
            datelimit: 'all',
            display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
            fkdisplay: 'mrp', // 外键关联类型
            fkdesc: '店铺',
            inputname: 'CP_C_SHOP:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
            isfk: true, // 是否有fk键
            isnotnull: false, // 是否必填
            isuppercase: false, // 是否转大写
            length: 65535, // 最大长度是多少
            name: '店铺名称', // input前面显示的lable值
            readonly: false, // 是否可编辑，对应input   readonly属性
            reftable: 'CP_C_SHOP', // 对应的表
            // reftableid: 24475, //对应的表ID
            row: 1,
            statsize: -1,
            type: 'STRING', // 这个是后台用的
            valuedata: '' // 这个是选择的值
          }
        },
        my_input_st: {
          itemdata: {
            col: 1,
            colid: 1700805185,
            colname: 'CP_C_STORE_ID', // 当前字段的名称
            datelimit: 'all',
            display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
            fkdisplay: 'mrp', // 外键关联类型
            fkdesc: '店铺',
            inputname: 'CP_C_STORE.ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
            isfk: true, // 是否有fk键
            isnotnull: false, // 是否必填
            isuppercase: false, // 是否转大写
            length: 65535, // 最大长度是多少
            name: '线下门店', // input前面显示的lable值
            readonly: false, // 是否可编辑，对应input   readonly属性
            reftable: 'CP_C_RSTORE', // 对应的表
            // reftableid: 23296, //对应的表ID
            row: 1,
            statsize: -1,
            type: 'STRING', // 这个是后台用的
            valuedata: '' // 这个是选择的值
          }
        },
        dataError: {
          show: false, // 控制警告弹框显示
          title: '错误', // 弹框标题
          type: 'warning', // 类型警告
          backBtn: true, // 是否显示返回按钮
          errorList: [{ message: '确定执行下线操作？' }] // 提示内容
        },
        dialog: {
          visible: true, // 控制查看日志弹窗
          param: {},
          title: ''
        }, // 查看日志传参
        query: {
          store: [], // 门店
          firstLevel: [], // 促销大类
          lastLevel: [], // 店仓名称
          distrib: '', // 配销中心,
          storeType: true
        },
        firstLevel: '',
        lastLevel: '',
        param: {},
        loadings: false, // 下拉框默认loadings值
        acti_date: [], // 时间
        distrib_id: [], // 配销中心
        storeId: '', // 门店
        acti_pro: '', // 商品
        release_name: '', // 操作人
        acti_no: '', // 促销编号
        acti_name: '', // 促销名称
        acti_group: '', // 分组设置
        activeName: '1', // 根据这个，判断是第几个tab
        // Myinput: [],
        // sheetWidth: 0,
        tabulation: [], // 列表数据
        inputList: [
          {
            colname: 'PS_C_PRO_ECODE',
            cusurl: 'custompage/matrix',
            display: 'text',
            name: '商品编码',
            pid: '',
            tablename: 'DL_B_TRAN_PLAN_ITEM',
            type: 'STRING',
            value: '',
            valuedata: ''
          }
        ],
        isActive: true, // 表示是否激活状态(false禁用input)
        isCustom: false,
        isdisabled: false, // 表示是否可编辑(true禁用input)
        objid: -1,
        selectItem: {},
        tablename: 'DL_B_PAND', // 表名
        agTableConfig1: {
          isIndex: true,
          tableHeight: '450px',
          columnDefs: baseColumnDefs,
          rowData: [],
          renderArr: {
            ACTION_LOG: (params) => {
              // console.log("params :>> ", params);
              if (!params.data.ACTION_LOG) return;

              const resultElement = document.createElement('div');
              const iTag = document.createElement('div');
              iTag.style.color = '#0f8ee9';
              iTag.style.textDecoration = 'underline';
              iTag.innerText = params.data.ACTION_LOG;
              iTag.style.cursor = 'pointer';
              iTag.onclick = () => {
                // console.log(params.data);
                this.viewLog(params.data);
              };
              resultElement.appendChild(iTag);
              return resultElement;
            }
          },
          pagenation: {
            // 设置总条数
            total: 0,
            // 条数
            pageSize: 20,
            // 页数
            current: 1,
            pageSizeOpts: [20, 50, 150, 1000]
          }
        }, // 全部
        agTableConfig2: {
          isIndex: true,
          tableHeight: '450px',
          columnDefs: baseColumnDefs,
          rowData: [],
          renderArr: {
            ACTION_LOG: (params) => {
              // console.log("params :>> ", params);
              if (!params.data.ACTION_LOG) return;

              const resultElement = document.createElement('div');
              const iTag = document.createElement('div');
              iTag.style.color = '#0f8ee9';
              iTag.style.textDecoration = 'underline';
              iTag.innerText = params.data.ACTION_LOG;
              iTag.style.cursor = 'pointer';
              iTag.onclick = () => {
                // console.log(params.data);
                this.viewLog(params.data);
              };
              resultElement.appendChild(iTag);
              return resultElement;
            }
          },
          pagenation: {
            // 设置总条数
            total: 0,
            // 条数
            pageSize: 20,
            // 页数
            current: 1,
            pageSizeOpts: [20, 50, 150, 1000]
          }
        }, // 已发布
        agTableConfig3: {
          isIndex: true,
          tableHeight: '450px',
          columnDefs: baseColumnDefs,
          rowData: [],
          renderArr: {
            ACTION_LOG: (params) => {
              // console.log("params :>> ", params);
              if (!params.data.ACTION_LOG) return;

              const resultElement = document.createElement('div');
              const iTag = document.createElement('div');
              iTag.style.color = '#0f8ee9';
              iTag.style.textDecoration = 'underline';
              iTag.innerText = params.data.ACTION_LOG;
              iTag.style.cursor = 'pointer';
              iTag.onclick = () => {
                // console.log(params.data);
                this.viewLog(params.data);
              };
              resultElement.appendChild(iTag);
              return resultElement;
            }
          },
          pagenation: {
            // 设置总条数
            total: 0,
            // 条数
            pageSize: 20,
            // 页数
            current: 1,
            pageSizeOpts: [20, 50, 150, 1000]
          }
        }, // 草稿
        agTableConfig4: {
          isIndex: true,
          tableHeight: '450px',
          columnDefs: baseColumnDefs,
          rowData: [],
          renderArr: {
            ACTION_LOG: (params) => {
              // console.log("params :>> ", params);
              if (!params.data.ACTION_LOG) return;

              const resultElement = document.createElement('div');
              const iTag = document.createElement('div');
              iTag.style.color = '#0f8ee9';
              iTag.style.textDecoration = 'underline';
              iTag.innerText = params.data.ACTION_LOG;
              iTag.style.cursor = 'pointer';
              iTag.onclick = () => {
                // console.log(params.data);
                this.viewLog(params.data);
              };
              resultElement.appendChild(iTag);
              return resultElement;
            }
          },
          pagenation: {
            // 设置总条数
            total: 0,
            // 条数
            pageSize: 20,
            // 页数
            current: 1,
            pageSizeOpts: [20, 50, 150, 1000]
          }
        }, // 下线/过期
        STATUS: [1, 2], // 状态 1.草稿，2.已发布，3.下线
        diStatusArr: [
          {
            value: 1,
            label: '草稿'
          },
          {
            value: 2,
            label: '已发布'
          },
          {
            value: 3,
            label: '下线'
          }
        ],
        fixedHeight: 351, // 固定高度
        dialog_visible: false,
        checkList: [], // 表格复选框选中的id
        setGroupTableData: [], // 设置分组列表
        product: {
          itemdata_xitong: {
            col: 1,
            // colid: this.$store.state.forginkeys.columnIds.sku || '1700806532',
            colid: '1700806532',
            colname: 'PS_C_PRO_ID',
            datelimit: 'all',
            display: 'text',
            fkdesc: '参与商品',
            fkdisplay: 'drp',
            inputname: 'PS_C_PRO_ID:ECODE',
            isfk: true,
            isnotnull: false,
            isuppercase: true,
            length: 65535,
            name: '参与商品',
            readonly: false,
            reftable: 'PS_C_PRO',
            reftableid: 23281,
            row: 1,
            statsize: -1,
            type: 'STRING',
            valuedata: ''
          }
        }
      };
    },
    watch: {
      activeName() {
        this.getData();
      }
    },
    components: {
      customTable,
      aTable,
      // currentUserAccessFirstLevel,
      // currentUserAccessLastLevel,
      // currentUserAccessStore,
      // currentUserAccessDistrib,
      // matrixInput,
      // myInput,
      Mydialog,
      errorMessage,
      // myInputLd,
      dialogVisible,
      Favorite,
      TableInput
    },
    created() {
      this.times(); // 默认时间
    },
    computed: {
      commodity() {
        return this.inputList[0].valuedata;
      },
      tabTotal() {
        return {
          one: `全部(${this.agTableConfig1.pagenation.total})`,
          two: `已发布(${this.agTableConfig2.pagenation.total})`,
          three: `草稿(${this.agTableConfig3.pagenation.total})`,
          four: `下线/过期(${this.agTableConfig4.pagenation.total})`
        };
      }
    },
    mounted() {
      this.getPermissions();
    },
    methods: {
      // 分页change 事件
      pageChange1(val) {
        this.agTableConfig1.pagenation.current = val;
        this.getData();
      },
      // 切换分页条数
      pageSizeChange1(val) {
        this.agTableConfig1.pagenation.pageSize = val;
        this.getData();
      },
      // 分页change 事件
      pageChange2(val) {
        this.agTableConfig2.pagenation.current = val;
        this.getData();
      },
      // 切换分页条数
      pageSizeChange2(val) {
        this.agTableConfig2.pagenation.pageSize = val;
        this.getData();
      },
      // 分页change 事件
      pageChange3(val) {
        this.agTableConfig3.pagenation.current = val;
        this.getData();
      },
      // 切换分页条数
      pageSizeChange3(val) {
        this.agTableConfig3.pagenation.pageSize = val;
        this.getData();
      },
      // 分页change 事件
      pageChange4(val) {
        this.agTableConfig4.pagenation.current = val;
        this.getData();
      },
      // 切换分页条数
      pageSizeChange4(val) {
        this.agTableConfig4.pagenation.pageSize = val;
        this.getData();
      },
      getExtendObj() {
        return {
          getRowStyle(params) {
            // console.log("params :>> ", params);
            // 设置行样式
            if (params.data.STATUS === 1) {
              // 草稿
              return { color: '#323233' };
            } if (params.data.STATUS === 2) {
              // 已发布
              return { color: 'blue' };
            } 
            // 下线过期
            return { color: 'gray' };
          }
        };
      },
      // 查找
      getData() {
        const currentPage = this[`agTableConfig${this.activeName}`].pagenation
          .current;
        const pageSize = this[`agTableConfig${this.activeName}`].pagenation
          .pageSize;
        this.loadings = true;
        this.axios({
          url: '/p/cs/pm/v1/selectPmList',
          method: 'POST',
          data: {
            param: JSON.stringify({
              ACTISTATUS: this.STATUS.join(',').replace('bSelect-all', 0), // 活动状态
              SHOP_IDS: this.my_input_sh.itemdata.pid, // 线上店铺ID（1010修改，前端传单个门店）0
              ACTI_PRO: this.product.itemdata_xitong, // 款号0
              ACTI_DATE: this.acti_date ? this.acti_date.join('-') : '', // 活动日期0
              ACTI_NAME: this.acti_name, // 活动名称
              GROUP_NAME: this.acti_group, // 活动分组
              RELEASE_NAME: this.release_name, // 发布人
              ACTI_NO: this.acti_no,
              PAGE: {
                CURRENT_PAGE: currentPage, // 当前页码
                PAGE_SIZE: pageSize // 分页单位
              }
            })
          }
        }).then((res) => {
          this.loadings = false;
          if (res.data.code === 0) {
            const data = res.data.data;
            // console.log("data :>> ", this.$print(data));
            // this.activeName = '1' // 全部
            if (data && data.ACTI_ALL_INFO) {
              data.ACTI_ALL_INFO.forEach((item, index) => {
                item.SERIAL_NO = (currentPage - 1) * pageSize + index + 1;
                item.ACTION_LOG = '查看日志';
              });
              this.agTableConfig1.rowData = data.ACTI_ALL_INFO || [];
              this.agTableConfig1.pagenation.total = data.ACTI_ALL_NUM;

              this.$refs.agGridChild1.agGridTable(
                this.agTableConfig1.columnDefs,
                this.agTableConfig1.rowData,
                this.getExtendObj()
              );
            }
            // this.activeName = '2' // 已发布
            if (data && data.ACTI_RELEASE_INFO) {
              data.ACTI_RELEASE_INFO.forEach((item, index) => {
                item.SERIAL_NO = (currentPage - 1) * pageSize + index + 1;
                item.ACTION_LOG = '查看日志';
              });
              this.agTableConfig2.rowData = data.ACTI_RELEASE_INFO || [];
              this.agTableConfig2.pagenation.total = data.ACTI_RELEASE_NUM;

              this.$refs.agGridChild2.agGridTable(
                this.agTableConfig2.columnDefs,
                this.agTableConfig2.rowData,
                this.getExtendObj()
              );
            }
            // this.activeName = '3' // 草稿
            if (res.data.data && res.data.data.ACTI_DRAFT_INFO) {
              data.ACTI_DRAFT_INFO.forEach((item, index) => {
                item.SERIAL_NO = (currentPage - 1) * pageSize + index + 1;
                item.ACTION_LOG = '查看日志';
              });
              this.agTableConfig3.rowData = data.ACTI_DRAFT_INFO || [];
              this.agTableConfig3.pagenation.total = data.ACTI_DRAFT_NUM;

              this.$refs.agGridChild3.agGridTable(
                this.agTableConfig3.columnDefs,
                this.agTableConfig3.rowData,
                this.getExtendObj()
              );
            }

            // this.activeName = '4' // 下线过期
            if (res.data.data && res.data.data.ACTI_OVER_INFO) {
              data.ACTI_OVER_INFO.forEach((item, index) => {
                item.SERIAL_NO = (currentPage - 1) * pageSize + index + 1;
                item.ACTION_LOG = '查看日志';
              });
              this.agTableConfig4.rowData = data.ACTI_OVER_INFO || [];
              this.agTableConfig4.pagenation.total = data.ACTI_OVER_NUM;

              this.$refs.agGridChild4.agGridTable(
                this.agTableConfig4.columnDefs,
                this.agTableConfig4.rowData,
                this.getExtendObj()
              );
            }
          }
        });
      },
      timestampToTime(timestamp) {
        const date = new Date(timestamp); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000

        const Y = `${date.getFullYear()}.`;

        const M = `${date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1}.`;

        const D = `${date.getDate()} `;

        const h = `${date.getHours()}:`;

        const m = `${date.getMinutes()}:`;

        let s = date.getSeconds();
        if (Number(s) < 10) {
          s = `0${s}`;
        }

        return Y + M + D + h + m + s;
      },
      // 关闭弹框
      closeModal() {
        this.modal = false;
      },
      // 查看日志方法
      viewLog(e) {
        const self = this;
        const formData = new FormData();
        formData.append('param', JSON.stringify({ promActiId: e.ACTI_ID }));

        axios({
          method: 'post',
          url: '/p/cs/cpromLogQuery',
          data: formData
        }).then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            if (res.data.data.length === 0) {
              self.$message.warning('查询数据为空');
            } else {
              self.logData.data = res.data.data;
              self.$message.success(res.data.message);
              self.modal = true;
            }
          } else {
            self.$message.error(res.data.message);
          }
        });
      },
      // 获取button数组
      getPermissions() {
        const independent = [];
        const buttons = [];
        axios({
          method: 'get',
          url: '/p/cs/fetchActionsInCustomizePage',
          params: {
            param: {
              AD_ACTION_NAME: 'promactiquerylist'
            }
          }
        }).then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            res.data.data.map((item) => {
              buttons.push(item.webid);
            });
          }
        });
        this.buttons = buttons;
        console.log(this.buttons);
      },
      errorDialogClose(value, option) {
        if (option) {
          this.downLine();
        } else {
          this.dataError.show = false;
        }
      },
      actOffline() {
        const newList = [];
        const newIds = [];
        this.$refs[`agGridChild${this.activeName}`].AGTABLE.getSelect().forEach(
          (item) => {
            newList.push(item);
            newIds.push(item.ACTI_ID);
          }
        );
        if (newList.length < 1) {
          this.$message({
            message: '请至少选择一个',
            type: 'warning'
          });
          return;
        }
        // STATUS === 1 草稿 ，STATUS === 2 已发布，STATUS === 3 下线过期
        const flag = newList.some(item => item.STATUS === 3);
        if (flag) {
          this.$message({
            message: '选择的促销活动已经下线/过期',
            type: 'warning'
          });
          return;
        }
        this.dataError.show = true;
      },
      copy() {
        const selectedData = this.$refs[
          `agGridChild${this.activeName}`
        ].AGTABLE.getSelect();
        if (selectedData.length === 0) {
          this.$message.warning('请选择一条数据进行复制操作');
          return;
        }
        if (selectedData.length > 1) {
          this.$message.warning('只能选取一条数据');
        } else {
          const ACTI_ID = selectedData[0].ACTI_ID;
          const IS_BATCH = selectedData[0].IS_BATCH;
          if (IS_BATCH) {
            this.$store.commit('TabOpen', {
              id: -1, // id
              type: 'action', // 类型action
              name: 'batchActivity', // 文件名
              label: '批量新增促销活动', // tab中文名
              query: Object.assign({
                id: -1, // id
                copy: ACTI_ID,
                tabTitle: '批量新增促销活动' // tab中文名
              }) // 带的参数
            });
          } else {
            this.$store.commit('TabOpen', {
              id: -1, // id
              type: 'action', // 类型action
              name: 'addOrEditActi', // 文件名
              label: '新增促销活动', // tab中文名
              query: Object.assign({
                id: -1, // id
                copy: ACTI_ID,
                tabTitle: '新增促销活动' // tab中文名
              }) // 带的参数
            });
          }
        }
      },
      promotionClick() {
        this.$store.commit('customize/TabOpen', {
          id: -1, // id
          type: 'action', // 类型action
          name: 'addOrEditActi', // 文件名
          label: '新增促销活动', // tab中文名
          query: Object.assign({
            id: -1, // id
            tabTitle: '新增促销活动' // tab中文名
          }) // 带的参数
        });
      },
      promotionBlukClick() {
        // 【批量新增】
        this.$store.commit('customize/TabOpen', {
          id: -1, // id
          type: 'action', // 类型action
          name: 'batchActivity', // 文件名
          label: '批量新增促销活动', // tab中文名
          query: Object.assign({
            id: -1, // id
            tabTitle: '批量新增促销活动' // tab中文名
          }) // 带的参数
        });
      },
      publish() {
        const newList = [];
        let flag = false;
        const newIds = [];
        this.$refs[`agGridChild${this.activeName}`].AGTABLE.getSelect().map(
          (item) => {
            newList.push(item);
            newIds.push(item.ACTI_ID);
          }
        );
        if (newList.length < 1) {
          this.$message({
            message: '请至少选择一个',
            type: 'warning'
          });
          return false;
        }
        flag = newList.every(item => item.STATUS === 1);
        if (!flag) {
          this.$message({
            message: '选择的促销活动已经发布',
            type: 'warning'
          });
          return false;
        }
        this.dataError.show = false; // 关闭弹框
        this.axios({
          url: '/p/cs/pm/v1/updatePmStatus',
          method: 'POST',
          data: {
            param: JSON.stringify({
              objid: -1, // 默认参数 保持格式统一 传死-1
              isBatch: true, // 是否批量 传true
              fixcolumn: {
                ids: newIds, // 促销活动ID
                status: 2 // 3表示下线
              }
            })
          }
        }).then((res) => {
          if (res.data.code === 0) {
            this.getData();
            this.$message({
              message: res.data.message,
              type: 'success'
            });
          } else {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
          }
        });
      }, // 发布
      deleteActi() {
        // 删除
        const newIds = [];
        this.$refs[`agGridChild${this.activeName}`].AGTABLE.getSelect().forEach(
          (item) => {
            newIds.push(item.ACTI_ID);
          }
        );
        if (newIds.length < 1) {
          this.$message({
            message: '请至少选择一个',
            type: 'warning'
          });
          return;
        }
        this.axios({
          url: '/p/cs/pm/v1/deletePm',
          method: 'POST',
          data: {
            param: JSON.stringify({
              objid: newIds // 默认参数 保持格式统一 传死-1
            })
          }
        }).then((res) => {
          if (res.data.code === 0) {
            this.getData();
            this.$message({
              message: res.data.message,
              type: 'success'
            });
          } else {
          // this.$message({
          //   message: res.data.message,
          //   type: "success"
          // });
          }
        });
      },
      setGroup() {
        // 设置分组
        const newList = [];
        const newIds = [];
        this.$refs[`agGridChild${this.activeName}`].AGTABLE.getSelect().forEach(
          (item) => {
            newList.push(item);
            newIds.push(item.ACTI_ID);
          }
        );
        if (newList.length < 1) {
          this.$message({
            message: '请先勾选需要分组的促销',
            type: 'warning'
          });
          return;
        }
        // STATUS === 1 草稿 ，STATUS === 2 已发布，STATUS === 3 下线过期
        const flag = newList.some(item => item.STATUS === 3);
        if (flag) {
          this.$message({
            message: '存在【下线过期】的促销，请重新选择',
            type: 'warning'
          });
        } else {
          this.checkList = newList;
          // self.dialog_visible = true;
          const formData = new FormData();
          formData.append('param', JSON.stringify({ objids: newIds }));
          axios({
            method: 'post',
            url: '/p/cs/pm/v1/selectPmGroup',
            data: formData
          }).then((res) => {
            // console.log(res);
            if (res.data.code === 0) {
              this.setGroupTableData = res.data.data;
              this.dialog_visible = true;
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      },
      closeDialog() {
        this.dialog_visible = false;
      },
      simulation() {
        // 模拟仿真
        this.$store.commit('TabOpen', {
          id: -1, // id
          type: 'action', // 类型action
          name: 'simulation', // 文件名
          label: '模拟仿真', // tab中文名
          query: Object.assign({
            id: -1, // id
            tabTitle: '模拟仿真' // tab中文名
          }) // 带的参数
        });
      },
      times() {
        // 默认时间
        const start = '';
        const end = '';
        this.acti_date = [start, end];
        const _this = this;
        // 有 -
        // let start = '2018-09-13'
        // let end = '2018-10-18'
        this.acti_date = [start.split('-').join(''), end.split('-').join('')];
        axios.post('/p/cs/getweekdate').then((res) => {
          if (res.data.code === 0) {
            _this.acti_date = [res.data.data.START_WEEK, res.data.data.END_WEEK];
          }
        });
      },
      Reset() {
        // this.acti_date = "";
        this.acti_no = ''; // 活动编号
        this.times(); // 活动日期:
        this.acti_name = ''; // 活动名称
        this.actiTypes = ['bSelect-all']; // 活动类型:
        this.orderTypes = ['bSelect-all']; // 订单类型:
        this.my_input_sh.itemdata.valuedata = ''; // 线上店铺
        this.my_input_sh.itemdata.pid = ''; // 线上店铺
        this.product.itemdata_xitong.valuedata = ''; // 参与商品
        this.product.itemdata_xitong.pid = ''; // 参与商品
        this.product.itemdata_xitong.channelList = ''; // 参与商品
        this.acti_group = ''; // 分组
        this.release_name = ''; // 操作人
        this.STATUS = [1, 2]; // 状态
      }, // 重置
      handDblClick(row, index) {
        // 双击事件
        const ACTI_ID = row.ACTI_ID;
        const typeId = row.PROM_TYPE_ID;
        const IS_BATCH = row.IS_BATCH;
        this.axios({
          method: 'post',
          url: '/p/cs/pm/v1/selectPm',
          data: {
            param: JSON.stringify({
              objid: ACTI_ID,
              prom_type_id: typeId
            })
          }
        }).then((res) => {
          if (res.data.code === 0) {
            // sq存储一套作为清空操作的初始数据
            // let scheme_dataInit = JSON.stringify(res.data.data.scheme_arr);
            // 存储种类id保存草稿时需要
            if (IS_BATCH) {
              this.$store.commit('TabOpen', {
                id: ACTI_ID, // id
                type: 'action', // 类型action
                name: 'batchActivity', // 文件名
                label: '批量新增促销活动', // tab中文名
                query: Object.assign({
                  id: ACTI_ID, // id
                  tabTitle: '批量新增促销活动' // tab中文名
                }) // 带的参数
              });
            } else {
              this.$store.commit('customize/TabOpen', {
                id: ACTI_ID, // id
                type: 'action', // 类型action
                name: 'addOrEditActi', // 文件名
                label: '编辑促销活动', // tab中文名
                query: Object.assign({
                  id: ACTI_ID, // id
                  tabTitle: '编辑促销活动' // tab中文名
                }) // 带的参数
              });
            }
          }
        });
      },
      downLine() {
        const newList = [];
        const newIds = [];
        this.$refs[`agGridChild${this.activeName}`].AGTABLE.getSelect().forEach(
          (item) => {
            newList.push(item);
            newIds.push(item.ACTI_ID);
          }
        );
        if (newList.length < 1) {
          this.$message({
            message: '请至少选择一个',
            type: 'warning'
          });
          return false;
        }
        // STATUS === 1 草稿 ，STATUS === 2 已发布，STATUS === 3 下线过期
        const flag = newList.some(item => item.STATUS === 3);
        if (flag) {
          this.$message({
            message: '选择的促销活动已经下线/过期',
            type: 'warning'
          });
          return false;
        }
        this.dataError.show = false; // 关闭弹框
        this.axios({
          url: '/p/cs/pm/v1/updatePmStatus',
          method: 'POST',
          data: {
            param: JSON.stringify({
              objid: -1, // 默认参数 保持格式统一 传死-1
              isBatch: true, // 是否批量 传true
              fixcolumn: {
                ids: newIds, // 促销活动ID
                status: 3 // 3表示下线
              }
            })
          }
        }).then((res) => {
          if (res.data.code === 0) {
            // console.log("0", res.data.code);
            this.getData();
            this.$message({
              message: res.data.message,
              type: 'success'
            });
          }
        });
      },
      formUserKeyUp(event) {
        if (event.keyCode === 13) {
          this.getData();
        }
      }
    }
  };
</script>
<style lang="less">
@import "~@/assets/css/css_1_3/datepicker";
.promactiqueryList {
  display: flex;
  flex-direction: column;
  height: 100%;
  .overall {
    width: 300px;
    text-align: center;
    h1 {
      font-size: 12px;
      color: #e80000;
      text-align: left;
      padding-bottom: 10px;
    }
    p {
      margin-bottom: 7px;
      color: red;
      font-size: 12px;
      line-height: 16px;
    }
    .selectcomp {
      display: flex;
      padding: 0 18px;
      justify-content: flex-start;
      .title {
        font-size: 12px;
      }
      .item-select {
        width: calc(~"100% - 57px");
        .el-input__inner {
          width: 100%;
        }
      }
    }
  }
  .btn_overall {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-top: 7px;
    button {
      box-sizing: border-box;
      height: 24px;
      width: auto;
      margin-right: 8px;
      margin-left: 0px;
      padding: 0 8px;
      background: #fff;
      color: #fd6442;
      border: 1px solid #fd6442;
      border-radius: 2px;
      font-size: 12px;
      &:hover {
        border-color: rgba(253, 100, 66, 0.6);
        color: rgba(253, 100, 66, 0.6);
      }
    }
  }
  .head_botton {
    font-size: 0;
    margin: 9px 0;
    button {
      height: 24px;
      min-width: 50px;
      line-height: 24px;
      padding: 0 8px;
      border: 1px solid #fd6442;
      font-size: 12px;
      background: #fff;
      color: #fd6442;
      border-radius: 2px;
      margin-right: 5px;
    }
    .active {
      background: #fd6442;
      color: #fff;
      margin-right: 8px;
    }
  }
  .body_select_three {
    box-sizing: border-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -ms-flex-align: center;
    align-items: center;
    border: 1px solid #e7e7e7;
    font-size: 12px;
    margin: 10px 0px;

    .item_three_1 {
      box-sizing: border-box;
      -ms-flex: 1 1 24%;
      width: 25%;
      padding: 5px;
      color: #575757;
      .title {
        width: 60px;
      }
      .input-wrap {
        input {
          height: 24px;
          background-color: #fff;
          border-radius: 0 2px 2px 0;
        }
        .popover-icon {
          color: #0f8ee9;
          font-size: 14px;
        }
      }
      span {
        display: flex;
        align-items: center;
        color: #575757;
        .el-date-editor {
          .el-range-input {
            font-size: 12px;
          }
        }
        .query_titile {
          width: 60px;
          display: block;
          font-style: normal;
          text-align: right;
          padding-right: 6px;
        }
        .query_select {
          width: calc(100% - 60px);
        }
        input {
          background: #fff;
        }
        .pure_text {
          border-radius: 2px;
          border: 1px solid #dcdfe6;
          text-indent: 5px;
          height: 24px;
        }
        b {
          color: #f50505;
        }
      }
      .el-autocomplete {
        width: 100%;
        .el-input {
          font-size: 12px;
          width: 100%;
        }
      }
      .ff-current-user-box {
        width: 100%;
        input {
          width: 100%;
          line-height: 24px;
        }
        .iconres {
          border: none;
          height: 15px;
          top: 5px;
          right: 3px;
        }
      }
      .dialog-select.selectcomp {
        width: 100%;
      }
      .my-input {
        width: 100%;
        .title {
          width: 56px;
          display: flex;
          align-items: center;
        }
        .el-autocomplete,
        .el-dropdown {
          width: 100%;
        }
        .el-input__inner {
          height: 24px;
          padding: 0 4px;
          font-size: 12px;
          &:hover,
          &:focus {
            border-color: #bfcbd9;
          }
          .el-autocomplete {
            width: 100%;
          }
        }
        .popover-icon {
          i {
            color: #0f8ee9;
          }
        }
      }
      .M_date_clas {
        border: 1px solid #dcdfe6;
        width: calc(100% - 60px);
        border-radius: 2px;
        .el-input__inner {
          height: 24px;
          line-height: 24px;
          padding: 0 4px;
        }
        .el-input__icon.el-icon-date {
          color: #0f8ee9;
        }
      }
      .item-select {
        .el-input__inner {
          width: 100%;
          height: 24px;
          line-height: 22px;
        }
      }
      .burgeon-btn-posdefault {
        display: inline-flex;
        span {
          color: white;
        }
      }
    }
    .button-right {
      text-align: right;
      margin: 0;
    }
  }
  .main_body {
    flex: 20;
    display: flex;
    flex-direction: column;
    // margin-bottom: 10px;
    // margin-top: 20px;
    position: relative;
    overflow: inherit;
    .el-tabs--border-card > .el-tabs__header .el-tabs__item {
      margin-top: 2px;
    }
    .el-tabs--border-card
      > .el-tabs__header
      .el-tabs__item:not(.is-disabled):hover {
      color: #fd6442;
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
      border-top: 1px solid #ddd;
      border-radius: 3px;
      color: #fd6442;
    }
    .el-tabs--border-card > .el-tabs__header {
      background-color: #fff;
    }
    .el-tabs--border-card {
      background: #fff;
      border: 0;
      -webkit-box-shadow: 0 0 0 0;
      box-shadow: 0 0 0 0;
    }
    .el-tabs__content {
      padding: 0;
      border: 1px solid #e4e7ed;
      border-top: none;
    }
  }
  /*.main_body_card {*/
  /*flex: 1;*/
  /*display: flex;*/
  /*flex-direction: column;*/

  /*.el-tabs--card {*/
  /*.el-tabs__header {*/
  /*margin: 0 !important;*/
  /*}*/
  /*}*/
  /*&.border {*/
  /*border: 1px solid #d4d4d4;*/
  /*border-top: 0;*/
  /*}*/
  /*}*/
  .evaluate_body {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    position: relative;
    padding: 0 12px;
  }
  .evaluate_body_pagination {
    padding: 10px 0 10px 10px;
    display: flex;
    .el-pagination {
      flex: inherit;
    }
    .exportprofititem {
      font-size: 12px;
      display: flex;
      align-items: center;
      cursor: pointer;
      color: #20a0ff;
    }
  }
  .evaluate_table_centen {
    overflow-x: auto;
    overflow-y: auto;
    width: 100%;
    position: relative;
    font-size: 12px;
    height: 100%;
    &.border {
      border: 1px solid #d4d4d4;
    }
  }
  .evaluate_table_top {
    height: 27px;
    overflow: hidden;
    display: inline-block;
    float: left;
    min-width: 100%;
    tbody {
      display: inline-block;
      min-width: 100%;
      border-bottom: 1px solid #d8d8d8;
      background-color: #f5f6fa;
      padding-left: 10px;
    }
    tr {
      height: 27px;
    }
    td {
      word-break: keep-all;
      white-space: nowrap;
      padding: 3px 5px;
      min-width: 120px;
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: nowrap;
      text-align: left;
      padding-left: 8px;
      span {
        position: relative;
      }
      i {
        position: absolute;
        cursor: pointer;
        font-size: 20px;
      }
      i:first-child {
        top: 1px;
        left: -6px;
        color: #97a8be;
      }
      i:last-child {
        bottom: 0px;
        left: -6px;
        color: #97a8be;
      }
      i.active {
        color: #48576a;
      }
    }
    input {
      position: relative;
      top: 2px;
      margin-right: 2px;
    }
    .copy_tr {
      position: relative;
      z-index: -1;
      i {
        position: relative;
        top: 0;
        left: 0;
        font-size: 12px;
        color: #0f8ee9;
      }
    }
  }
  .evaluate_table_div {
    overflow-x: auto;
    overflow-y: auto;
    z-index: 9;
    min-height: 27px;
    flex: 1;
    margin-top: 27px;
    display: flex;
    flex-direction: column;
    height: calc(~"100% - 27px");
  }
  .evaluate_table_bottom {
    margin-bottom: 20px;
    position: relative;
    z-index: 2;
    background: #fff;
    font-size: 12px;
    display: inline-block;
    min-width: 100%;
    tr {
      border-bottom: 1px solid #d8d8d8;
      min-width: 100%;
      display: inline-block;
      padding-left: 10px;
    }
    td {
      word-break: keep-all;
      white-space: nowrap;
      padding: 3px 5px;
      min-width: 120px;
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: nowrap;
      text-align: left;
      padding-left: 8px;
      i {
        cursor: pointer;
        font-size: 12px;
        color: #0f8ee9;
      }
    }
    input {
      position: relative;
      top: 2px;
      margin-right: 5px;
    }
    tr:hover {
      background: #f8f7f7;
    }
  }
  .EvaluationDetails {
    min-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 250px;
  }
}
</style>
<style lang="less">
.promactiqueryList {
  .el-tabs__item {
    height: 32px;
    line-height: 32px;
    color: #575757;
  }
  .el-tabs.el-tabs--card {
    display: flex;
    flex-direction: column;
    flex: 1;
    .el-tabs__content {
      display: flex;
      flex-direction: column;
      flex: 1;
      .el-tab-pane {
        border: 1px solid #d4d4d4;
        border-top: 1px solid #fff;
        display: flex;
        flex: 1;
        flex-direction: column;
      }
      .ff-custom--table {
        margin-right: 0;
      }
      .ff-custom--table .ff-custom--table-content th {
        min-width: 110px;
      }
      .ff-custom--table .ff-custom--table-total table th {
        min-width: 110px;
      }
    }
  }
  .el-tabs__item.is-active {
    color: #fd6442;
  }
  .el-tabs__header {
    margin: 0 !important;
  }
  .el-tabs__nav {
    margin-left: 15px;
    .el-tabs__item {
      font-size: 12px;
      line-height: 28px;
      height: 28px;
    }
  }
}
.promactiIcon {
  height: 20px;
  line-height: 30px;
  display: flex;
  font-size: 10px;
  bottom: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  flex: 1;
  -webkit-box-flex: 15;
  -ms-flex: 15;
  flex: 1;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  margin-bottom: 10px;
  position: relative;
  > div {
    flex: 1;
  }
  .legend {
    > p {
      display: inline-block;
      button {
        border: 1px solid #575757;
        margin-right: 2px;
        background: white;
        padding: 0px 3px;
      }
      .color-blue {
        color: #00f;
        font-weight: 400;
      }
      .color-italic-grey {
        color: #999;
      }
      .color-italic-black {
        color: #000;
      }
      margin-right: 3px;
    }
  }
}
</style>
