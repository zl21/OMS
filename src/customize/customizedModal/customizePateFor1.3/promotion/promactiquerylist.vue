<template>
  <div
    v-loading="loadings"
    class="promactiquery"
  >
    <div style="height: 140px;">
      <div class="head_botton">
        <button
          v-if="buttons.indexOf(3194) >=0"
          class="active"
          @click="Demand"
        >
          查找
        </button>
        <button
          v-if="buttons.indexOf(3195)>=0"
          class="white"
          @click="promotionClick"
        >
          新增促销活动
        </button>
        <button
          v-if="buttons.indexOf(3196)>=0"
          @click="Dialog"
        >
          批量活动下线
        </button>
        <button
          v-if="buttons.indexOf(3197)>=0"
          @click="copy"
        >
          复制
        </button>
      </div>
      <!-- 过滤器 -->
      <div class="body_select_three">
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
        <!-- 配销中心 -->
        <!-- <div class="item_three">
          <span>
            <i class="query_titile">配销中心:</i>
                <current-user-access-distrib
                  style="width: calc(100% - 60px)"
                  v-model="Mitemdata1.itemdata.valuedata"
                  :ischeckbox="true"
                ></current-user-access-distrib>
         </span>
        </div>-->
        <!--门店 -->
        <div class="item_three_1">
          <!-- <span>
           <i class="query_titile">门店:</i>
            <current-user-access-store
              v-model="query.store"
               style="width: calc(100% - 60px)"
              :ischeckbox="false"
              ref=" easyData"
            ></current-user-access-store>
          </span>-->
          <myInputLd
            :is-active="true"
            :is-disabled="false"
            :itemdata="my_input_st.itemdata"
          />
        </div>
        <div class="item_three_1">
          <!-- <span>
           <i class="query_titile">门店:</i>
            <current-user-access-store
              v-model="query.store"
               style="width: calc(100% - 60px)"
              :ischeckbox="false"
              ref=" easyData"
            ></current-user-access-store>
          </span>-->
          <myInputLd
            :is-active="true"
            :is-disabled="false"
            :itemdata="my_input_sh.itemdata"
          />
        </div>
        <!-- 商品 -->
        <div class="item_three_1">
          <span>
            <i class="query_titile">商品:</i>
            <matrix-input
              ref="lists"
              style="width: calc(100% - 60px)"
              :select-item="selectItem"
              :objid="objid"
              :tablename="tablename"
              :input-list="inputList"
              :isdisabled="isdisabled"
              :is-active="isActive"
            />
          </span>
        </div>
        <!-- 促销名称 -->
        <div class="item_three_1">
          <span>
            <i class="query_titile">促销名称:</i>
            <input
              v-model="acti_name"
              type="text"
              class="pure_text"
              style="width: calc(100% - 60px)"
            >
          </span>
        </div>

        <!--  促销大类 -->
        <div class="item_three_1">
          <span>
            <i class="query_titile">促销大类:</i>
            <current-user-access-first-level
              v-model="query.firstLevel"
              style="width: calc(100% - 60px)"
              :ischeckbox="false"
            />
          </span>
        </div>
        <!-- 促销中类 -->
        <div class="item_three_1">
          <span>
            <i class="query_titile">促销中类:</i>
            <current-user-access-last-Level
              v-model="query.lastLevel"
              style="width: calc(100% - 60px)"
              :ischeckbox="false"
            />
          </span>
        </div>
        <!-- 操作人 -->
        <div class="item_three_1">
          <span>
            <i class="query_titile">操作人:</i>
            <input
              v-model="release_name"
              type="text"
              class="pure_text"
              style="width: calc(100% - 60px)"
            >
          </span>
        </div>
        <!-- 发布状态 -->
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
          <div class="evaluate_body_pagination">
            <el-pagination
              :current-page="tableActiveName1.page.currentPage"
              :page-sizes="tableActiveName1.page.pageSizes"
              :page-size="tableActiveName1.page.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableActiveName1.page.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
          <!-- hasNation 是否自动计算序号 -->
          <custom-table
            v-if="activeName === '1'"
            ref="custom"
            class="M_customtable"
            :has-checked="true"
            :has-nation="true"
            :is-check-active="true"
            :is-total="true"
            :t-head="tableActiveName1.tHead"
            :t-body="tableActiveName1.tBody"
            :operation="true"
            @handDblClick="handDblClick"
            @change="tdChange1"
            @viewLog="viewLog"
          />
        </el-tab-pane>

        <el-tab-pane
          :label="tabTotal.two"
          name="2"
        >
          <div class="evaluate_body_pagination">
            <el-pagination
              :current-page="tableActiveName2.page.currentPage"
              :page-sizes="tableActiveName2.page.pageSizes"
              :page-size="tableActiveName2.page.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableActiveName2.page.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
          <custom-table
            v-if="activeName === '2'"
            ref="custom"
            class="M_customtable"
            :has-checked="true"
            :is-total="true"
            :is-check-active="true"
            :has-nation="true"
            :t-head="tableActiveName2.tHead"
            :t-body="tableActiveName2.tBody"
            :operation="true"
            @handDblClick="handDblClick"
            @change="tdChange2"
            @viewLog="viewLog"
          />
        </el-tab-pane>

        <el-tab-pane
          :label="tabTotal.three"
          name="3"
        >
          <div class="evaluate_body_pagination">
            <el-pagination
              :current-page="tableActiveName3.page.currentPage"
              :page-sizes="tableActiveName3.page.pageSizes"
              :page-size="tableActiveName3.page.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableActiveName3.page.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
          <custom-table
            v-if="activeName === '3'"
            ref="custom"
            class="M_customtable"
            :has-checked="true"
            :is-total="true"
            :is-check-active="true"
            :has-nation="true"
            :t-head="tableActiveName3.tHead"
            :t-body="tableActiveName3.tBody"
            :operation="true"
            @handDblClick="handDblClick"
            @change="tdChange3"
            @viewLog="viewLog"
          />
        </el-tab-pane>

        <el-tab-pane
          :label="tabTotal.four"
          name="4"
        >
          <div class="evaluate_body_pagination">
            <el-pagination
              :current-page="tableActiveName4.page.currentPage"
              :page-sizes="tableActiveName4.page.pageSizes"
              :page-size="tableActiveName4.page.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableActiveName4.page.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
          <custom-table
            v-if="activeName === '4'"
            ref="custom"
            class="M_customtable"
            :has-checked="true"
            :is-total="true"
            :is-check-active="true"
            :has-nation="true"
            :t-head="tableActiveName4.tHead"
            :t-body="tableActiveName4.tBody"
            :operation="true"
            @handDblClick="handDblClick"
            @change="tdChange4"
            @viewLog="viewLog"
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
  // import myInput from "@/components/element/input";
  // @/components/table/P_customTable
  import currentUserAccessDistrib from 'framework/components/input/currentUserAccessDistrib.vue';
  
  // ../../../components/input/currentUserAccessDistrib.vue
  // @/components/input/currentUserAccessDistrib
  import currentUserAccessFirstLevel from 'framework/components/input/P_currentUserAccessfirstLevel.vue'; // 促销大类
  import currentUserAccessLastLevel from 'framework/components/input/P_currentUserAccesslastLevel.vue'; // 促销中类
  import currentUserAccessStore from 'framework/components/input/currentUserAccessStore.vue';
  import matrixInput from 'framework/components/input/P_matrixInput.vue'; // 商品模糊查询
  import errorMessage from 'framework/components/tablelist/error.vue';
  import Mydialog from 'framework/components/dialog/mydialog.vue';
  // import { post } from '@/utils/request';

  import myInputLd from 'framework/components/element/input.vue';
  import customTable from 'framework/components/table/P_customTable.vue';
  import '../../../../assets/css/css_1_3/datepicker.less';

  export default {
    // name: 'Promactiquerylist',
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
            colid: 1700805184,
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
            name: '线上店铺', // input前面显示的lable值
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
        Mitemdata1: {
          // 配销中心
          itemdata: {
            col: 1,
            colid: 138222,
            colname: 'CP_C_STORE_IDS', // 当前字段的名称
            datelimit: 'all',
            display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
            fkdisplay: 'mrp', // 外键关联类型
            fkdesc: '配销中心',
            inputname: 'CP_C_DISTRIB_ID', // 这个是做中文类型的模糊查询字段，例如ENAME
            isfk: true, // 是否有fk键
            isnotnull: false, // 是否必填
            isuppercase: false, // 是否转大写
            length: 20, // 最大长度是多少
            name: '配销中心', // input前面显示的lable值
            readonly: false, // 是否可编辑，对应input   readonly属性
            reftable: 'CP_C_DISTRIB_NOPERM', // 对应的表
            reftableid: 24334, // 对应的表ID
            row: 1,
            statsize: -1,
            type: 'STRING', // 这个是后台用的
            valuedata: '' // 这个是选择的值
          }
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
        loading: true,
        firstLevel: '',
        lastLevel: '',
        param: {},
        loading: true, // 页面loading值
        loadings: false, // 下拉框默认loadings值
        acti_date: [], // 时间
        distrib_id: [], // 配销中心
        storeId: '', // 门店
        acti_pro: '', // 商品
        release_name: '', // 操作人
        acti_name: '', // 促销名称
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
        tableActiveName1: {
          // 全部列表
          page: {
            currentPage: 1, // 第几页
            pageSize: 200,
            total: 0,
            pageSizes: [20, 50, 100, 200],
            orderBy: {},
            flagId: null
          },
          tHead: [
            // {
            //   label: "配销中心",//名称
            //   name: 'DISTRIB_NAME',
            //   order: false,

            // },
            {
              label: '经销商',
              name: 'CUSTOMER_NAME'
            },
            {
              label: '店铺',
              name: 'SHOP_NAME'
            },
            {
              label: '活动时间段',
              name: 'ACTI_DATE'
            },
            {
              label: '活动名称',
              name: 'ACTI_NAME'
            },
            {
              label: '类型',
              name: 'ACTI_TYPE'
            },
            {
              label: '状态',
              name: 'status'
            },
            {
              label: '操作人',
              name: 'RELEASE_NAME'
            },
            {
              label: '创建时间',
              name: 'CREATIONDATE'
            }
          ],
          tBody: []
        },
        tableActiveName2: {
          // 已发布
          page: {
            currentPage: 1, // 第几页
            pageSize: 200,
            total: 0,
            pageSizes: [20, 50, 100, 200],
            orderBy: {},
            flagId: null
          },
          tHead: [
            // {
            //   label: "配销中心",//名称
            //   name: 'DISTRIB_NAME',
            // },
            {
              label: '经销商',
              name: 'CUSTOMER_NAME'
            },
            {
              label: '店铺',
              name: 'SHOP_NAME'
            },
            {
              label: '活动时间段',
              name: 'ACTI_DATE'
            },
            {
              label: '活动名称',
              name: 'ACTI_NAME'
            },
            {
              label: '类型',
              name: 'ACTI_TYPE'
            },
            {
              label: '状态',
              name: 'status'
            },
            {
              label: '操作人',
              name: 'RELEASE_NAME'
            },
            {
              label: '创建时间',
              name: 'CREATIONDATE'
            }
          ],
          tBody: []
        },
        tableActiveName3: {
          // 草稿
          page: {
            currentPage: 1, // 第几页
            pageSize: 200,
            total: 0,
            pageSizes: [20, 50, 100, 200],
            orderBy: {},
            flagId: null,
            status: 1
          },
          tHead: [
            // {
            //   label: "配销中心",//名称
            //   name: 'DISTRIB_NAME',
            // },
            {
              label: '经销商',
              name: 'CUSTOMER_NAME'
            },
            {
              label: '店铺',
              name: 'SHOP_NAME'
            },
            {
              label: '活动时间段',
              name: 'ACTI_DATE'
            },
            {
              label: '活动名称',
              name: 'ACTI_NAME'
            },
            {
              label: '类型',
              name: 'ACTI_TYPE'
            },
            {
              label: '状态',
              name: 'status'
            },
            {
              label: '操作人',
              name: 'RELEASE_NAME'
            },
            {
              label: '创建时间',
              name: 'CREATIONDATE'
            }
          ],
          tBody: []
        },
        tableActiveName4: {
          // 下线/过期
          page: {
            currentPage: 1, // 第几页
            pageSize: 200,
            total: 0,
            pageSizes: [20, 50, 100, 200],
            orderBy: {},
            flagId: null,
            status: 3
          },
          tHead: [
            // {
            //   label: "配销中心",//名称
            //   name: 'DISTRIB_NAME',
            // },

            {
              label: '经销商',
              name: 'CUSTOMER_NAME'
            },
            {
              label: '店铺',
              name: 'SHOP_NAME'
            },
            {
              label: '活动时间段',
              name: 'ACTI_DATE'
            },
            {
              label: '活动名称',
              name: 'ACTI_NAME'
            },
            {
              label: '类型',
              name: 'ACTI_TYPE'
            },
            {
              label: '状态',
              name: 'status'
            },
            {
              label: '操作人',
              name: 'RELEASE_NAME'
            },
            {
              label: '创建时间',
              name: 'CREATIONDATE'
            }
          ],
          tBody: []
        },
        STATUS: 2, // 状态 1.草稿，2.已发布，3.下线
        diStatusArr: [{
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
                      }]
      };
    },
    watch: {
      acti_date: {
        handler: 'clearPage',
        immediate: true
      },
      'Mitemdata1.itemdata.valuedata': {
        handler: 'clearPage',
        immediate: true // 立即先去执行handler方法
      },
      'query.store': {
        handler: 'clearPage',
        immediate: true
      },
      commodity: {
        handler: 'clearPage',
        immediate: true
      },
      'query.firstLevel': {
        handler: 'clearPage',
        immediate: true
      },
      acti_name: {
        handler: 'clearPage',
        immediate: true
      },
      'query.lastLevel': {
        handler: 'clearPage',
        immediate: true
      },
      release_name: {
        handler: 'clearPage',
        immediate: true
      }
    },
    components: {
      customTable,
      currentUserAccessFirstLevel,
      currentUserAccessLastLevel,
      currentUserAccessStore,
      currentUserAccessDistrib,
      matrixInput,
      Mydialog,
      errorMessage,
      myInputLd
    },
    created() {
      const type = 'mounted';

      this.times(type); // 默认时间

      document.onkeydown = function (e) { // Enter查询
        const key = window.event.keyCode;
        if (key == 13) {
          this.Demand();
        }
      };
    },
    computed: {
      commodity() {
        return this.inputList[0].valuedata;
      },
      tabTotal() {
        return {
          one: `全部(${this.tableActiveName1.page.total})`,
          two: `已发布(${this.tableActiveName2.page.total})`,
          three: `草稿(${this.tableActiveName3.page.total})`,
          four: `下线/过期(${this.tableActiveName4.page.total})`
        };
      }
    },
    mounted() {
      this.getPermissions();
    },
    methods: {
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
              // 处理日期格式
              res.data.data.map((item) => {
                item.creationdate = self.timestampToTime(item.creationdate);
              });
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
      tdChange1(index) {
        const checked = this.tableActiveName1.tBody[index].checked;
        if (checked) {
          this.checkedArr1.push(index);
        } else {
          const i = this.checkedArr1.indexOf(index);
          this.checkedArr1.splice(i, 1);
        }
      },
      tdChange2(index) {
        const checked = this.tableActiveName2.tBody[index].checked;
        if (checked) {
          this.checkedArr2.push(index);
        } else {
          const i = this.checkedArr2.indexOf(index);
          this.checkedArr2.splice(i, 1);
        }
      },
      tdChange3(index) {
        const checked = this.tableActiveName3.tBody[index].checked;
        if (checked) {
          this.checkedArr3.push(index);
        } else {
          const i = this.checkedArr3.indexOf(index);
          this.checkedArr3.splice(i, 1);
        }
      },
      tdChange4(index) {
        const checked = this.tableActiveName4.tBody[index].checked;
        if (checked) {
          this.checkedArr4.push(index);
        } else {
          const i = this.checkedArr4.indexOf(index);
          this.checkedArr4.splice(i, 1);
        }
      },
      clearPage() {
        // 清除分页
        this[`tableActiveName${this.activeName}`].page.currentPage = 1;
        this[`tableActiveName${this.activeName}`].page.pageSize = 200;
        this[`tableActiveName${this.activeName}`].tBody = [];
      },
      errorDialogClose(value, option) {
        if (option) {
          this.downLine();
        } else {
          this.dataError.show = false;
        }
      },
      Dialog() {
        const newList = [];
        let flag = false;
        const newIds = [];
        this[`tableActiveName${this.activeName}`].tBody.map((item) => {
          item.checked ? newList.push(item) : '';
          item.checked ? newIds.push(item.ACTI_ID) : '';
        });
        if (newList.length < 1) {
          this.$message({
            message: '请至少选择一个',
            type: 'warning'
          });
          return false;
        }
        newList.map((item) => {
          item.status == '下线过期' ? (flag = true) : '';
        });
        if (flag) {
          this.$message({
            message: '选择的促销活动已经下线/过期',
            type: 'warning'
          });
          return false;
        }
        this.dataError.show = true;
      },
      copy() {
        if (this[`checkedArr${this.activeName}`].length > 1) {
          this.$message.warning('只能选取一条数据');
        } else {
          const index = this[`checkedArr${this.activeName}`][0];
          const _this = this[`tableActiveName${this.activeName}`].tBody[index];
          const ACTI_ID = _this.ACTI_ID;
          const typeId = _this.PROM_TYPE_ID;
          const PROM_TYPE_NAME = _this.PROM_TYPE_NAME; // 二类名称
          const PROM_TYPE_BRIEF = _this.PROM_TYPE_BRIEF; // 二类描述
          const STATUS = _this.STATUS;
          this.axios({
            method: 'post',
            url: '/p/cs/cpromactiquery',
            data: {
              param: JSON.stringify({
                objid: ACTI_ID,
                prom_type_id: typeId
              })
            }
          }).then((res) => {
            if (res.data.code === 0) {
              this.$store.state.customize.dataTwo = res.data.data;
              // sq存储一套作为清空操作的初始数据
              const scheme_dataInit = JSON.stringify(res.data.data.scheme_arr);
              this.$store.commit('customize/jordanStore/scheme_dataRecover', JSON.parse(scheme_dataInit));
              // 存储种类id保存草稿时需要
              this.$store.state.customize.jordanStore.sch_type_id = res.data.data.basic_info.sch_type_id;
              this.$store.commit('TabHref', {
                id: ACTI_ID, // id
                type: 'action', // 类型action
                name: 'promotion', // 文件名
                label: '编辑促销活动', // tab中文名
                query: Object.assign({
                  id: ACTI_ID, // id
                  typeId,
                  tabTitle: '编辑促销活动', // tab中文名
                  prom_type_name: PROM_TYPE_NAME, // 二类名称
                  prom_type_brief: PROM_TYPE_BRIEF, // 二类描述
                  status: 1,
                  copy: true
                }) // 带的参数
              });
            }
          });
        }
      },
      promotionClick() {
        this.$store.commit('customize/TabOpen', {
          id: 1, // id
          type: 'action', // 类型action
          name: 'promotion', // 文件名
          label: '新增促销活动', // tab中文名
          query: Object.assign({
            id: -1, // id
            tabTitle: '新增促销活动' // tab中文名
          }) // 带的参数
        });
      },
      times(type) {
        // 默认时间
        this.tableActiveName1.tBody.map((item, index) => {
          item.checked = false;
          if (item.STATUS == 1) {
            item.black = true;
          } else if (item.STATUS == 2) {
            item.blue = true;
          } else {
            item.grey = true;
          }
          item.start = (this.tableActiveName1.page.currentPage - 1)
            * this.tableActiveName1.page.pageSize
            + Number(index)
            + 1;
        });
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
            if (type === 'mounted') {
              this.Demand();
            }
          }
        });
      },
      Demand() {
        // 点击查找
        const currentPage = this[`tableActiveName${this.activeName}`].page
          .currentPage;
        const pageSize = this[`tableActiveName${this.activeName}`].page.pageSize;
        this[`tableActiveName${this.activeName}`].tBody = [];
        const distribIds = [];
        if (this.Mitemdata1.itemdata.valuedata.length > 0) {
          this.Mitemdata1.itemdata.valuedata.map((e) => {
            distribIds.push(e.ID);
          });
        }

        this.loadings = true;

        this.axios({
          url: '/p/cs/cpromactiquerylist',
          method: 'POST',
          data: {
            param: JSON.stringify({
              DISTRIB_ID: distribIds || [], // 配销中心ID
              // "STORE_ID":this.query.store.length > 0 && this.query.store[0].ID?this.query.store[0].ID: "",		   //门店ID（1010修改，前端传单个门店）0
              STORE_IDS: this.my_input_st.itemdata.pid, // 线下门店ID（1010修改，前端传单个门店）0
              SHOP_IDS: this.my_input_sh.itemdata.pid, // 线上店铺ID（1010修改，前端传单个门店）0
              ACTI_PRO: this.inputList[0].valuedata, // 款号0
              ACTI_DATE: this.acti_date ? this.acti_date.join('-') : '', // 活动日期0
              ACTI_NAME: this.acti_name, // 活动名称
              PROM_SCOPE:
                this.query.firstLevel.length > 0
                  ? this.query.firstLevel[0].ID
                  : '', // 促销大类0
              PROM_TYPE:
                this.query.lastLevel.length > 0 ? this.query.lastLevel[0].ID : '', // 促销中类
              RELEASE_NAME: this.release_name, // 发布人0
              PAGE: {
                CURRENT_PAGE: currentPage, // 当前页码
                PAGE_SIZE: pageSize // 分页单位
              },
              ACTISTATUS: Array.isArray(this.STATUS) ? this.STATUS.join(',').replace('bSelect-all', 0) : `${this.STATUS}`
            })
          }
        }).then((res) => {
          this.loadings = false;
          if (res.data.code === 0) {
            this.tableActive = true;
            // this.activeName = '1' // 全部
            if (res.data.data && res.data.data.ACTI_ALL_INFO) {
              res.data.data.ACTI_ALL_INFO.map((e) => {
                e.SHOP_NAME = e.SHOP_NAME ? e.SHOP_NAME.join(',') : e.SHOP_NAME;
                e.DISTRIB_NAME = e.DISTRIB_NAME
                  ? e.DISTRIB_NAME.join(',')
                  : e.DISTRIB_NAME;
              });
              this.tableActiveName1.tBody = res.data.data.ACTI_ALL_INFO;
              this.tableActiveName1.page.total = res.data.data.ACTI_ALL_NUM;
              this.tableActiveName1.tBody.map((item, index) => {
                if (item.STATUS == 1) {
                  item.black = true;
                  item.status = '草稿';
                } else if (item.STATUS == 2) {
                  item.blue = true;
                  item.status = '已发布';
                } else {
                  item.grey = true;
                  item.status = '下线过期';
                }
                item.start = (this.tableActiveName1.page.currentPage - 1)
                  * this.tableActiveName1.page.pageSize
                  + Number(index)
                  + 1;
              });
            } else {
              this.tableActiveName1.page.total = 0;
            }
            if (res.data.data && res.data.data.ACTI_RELEASE_INFO) {
              // this.activeName = '2' // 已发布
              res.data.data.ACTI_RELEASE_INFO.map((e) => {
                e.blue = true;
                e.SHOP_NAME = e.SHOP_NAME ? e.SHOP_NAME.join(',') : e.SHOP_NAME;
                e.DISTRIB_NAME = e.DISTRIB_NAME
                  ? e.DISTRIB_NAME.join(',')
                  : e.DISTRIB_NAME;
                if (e.STATUS == 1) {
                  e.status = '草稿';
                } else if (e.STATUS == 2) {
                  e.status = '已发布';
                } else if (e.STATUS == 3) {
                  e.status = '下线过期';
                }
              });

              this.tableActiveName2.tBody = res.data.data.ACTI_RELEASE_INFO;
              this.tableActiveName2.page.total = res.data.data.ACTI_RELEASE_NUM;
              this.tableActiveName2.tBody.map((item, index) => {
                item.start = (this.tableActiveName2.page.currentPage - 1)
                  * this.tableActiveName2.page.pageSize
                  + Number(index)
                  + 1;
              });
            } else {
              this.tableActiveName2.page.total = 0;
            }
            if (res.data.data && res.data.data.ACTI_DRAFT_INFO) {
              // this.activeName = '3' // 草稿
              res.data.data.ACTI_DRAFT_INFO.map((e) => {
                e.SHOP_NAME = e.SHOP_NAME ? e.SHOP_NAME.join(',') : e.SHOP_NAME;
                e.DISTRIB_NAME = e.DISTRIB_NAME
                  ? e.DISTRIB_NAME.join(',')
                  : e.DISTRIB_NAME;
                if (e.STATUS == 1) {
                  e.status = '草稿';
                } else if (e.STATUS == 2) {
                  e.status = '已发布';
                } else if (e.STATUS == 3) {
                  e.status = '下线过期';
                }
              });

              this.tableActiveName3.tBody = res.data.data.ACTI_DRAFT_INFO;
              this.tableActiveName3.page.total = res.data.data.ACTI_DRAFT_NUM;
              this.tableActiveName3.tBody.map((item, index) => {
                item.start = (this.tableActiveName3.page.currentPage - 1)
                  * this.tableActiveName3.page.pageSize
                  + Number(index)
                  + 1;
              });
            } else {
              this.tableActiveName3.page.total = 0;
            }
            if (res.data.data && res.data.data.ACTI_OVER_INFO) {
              // this.activeName = '4' // 下线过期
              res.data.data.ACTI_OVER_INFO.map((e) => {
                e.grey = true;
                e.SHOP_NAME = e.SHOP_NAME ? e.SHOP_NAME.join(',') : e.SHOP_NAME;
                e.DISTRIB_NAME = e.DISTRIB_NAME
                  ? e.DISTRIB_NAME.join(',')
                  : e.DISTRIB_NAME;
                if (e.STATUS == 1) {
                  e.status = '草稿';
                } else if (e.STATUS == 2) {
                  e.status = '已发布';
                } else if (e.STATUS == 3) {
                  e.status = '下线过期';
                }
              });

              this.tableActiveName4.tBody = res.data.data.ACTI_OVER_INFO;
              this.tableActiveName4.page.total = res.data.data.ACTI_OVER_NUM;
              this.tableActiveName4.tBody.map((item, index) => {
                item.start = (this.tableActiveName4.page.currentPage - 1)
                  * this.tableActiveName4.page.pageSize
                  + Number(index)
                  + 1;
              });
            }
          } else {
            this.tableActiveName4.page.total = 0;
          }
        }).catch(() => {
          this.loadings = false;
        });
        this.checkedArr1 = [];
        this.checkedArr2 = [];
        this.checkedArr3 = [];
        this.checkedArr4 = [];
      },
      Release() {
        // 点击查找已发布
        const currentPage = this[`tableActiveName${this.activeName}`].page
          .currentPage;
        const pageSize = this[`tableActiveName${this.activeName}`].page.pageSize;
        this[`tableActiveName${this.activeName}`].tBody = [];
        const distribIds = [];
        if (this.Mitemdata1.itemdata.valuedata.length > 0) {
          this.Mitemdata1.itemdata.valuedata.map((e) => {
            distribIds.push(e.ID);
          });
        }
        this.axios({
          url: '/p/cs/cpromactiquerylist',
          method: 'POST',
          data: {
            param: JSON.stringify({
              DISTRIB_ID: distribIds || [], // 配销中心ID
              // "STORE_ID":this.query.store.length > 0 && this.query.store[0].ID?this.query.store[0].ID: "",		   //门店ID（1010修改，前端传单个门店）0
              STORE_IDS: this.my_input_st.itemdata.pid, // 线下门店ID（1010修改，前端传单个门店）0
              SHOP_IDS: this.my_input_sh.itemdata.pid, // 线上店铺ID（1010修改，前端传单个门店）0
              ACTI_PRO: this.inputList[0].valuedata, // 款号0
              ACTI_DATE: this.acti_date ? this.acti_date.join('-') : '', // 活动日期0
              ACTI_NAME: this.acti_name, // 活动名称
              PROM_SCOPE:
                this.query.firstLevel.length > 0
                  ? this.query.firstLevel[0].ID
                  : '', // 促销大类0
              PROM_TYPE:
                this.query.lastLevel.length > 0 ? this.query.lastLevel[0].ID : '', // 促销中类
              RELEASE_NAME: this.release_name, // 发布人0
              STATUS: 2, // 1.草稿，2.已发布，3.下线  （首次进入不传状态）
              PAGE: {
                CURRENT_PAGE: currentPage, // 当前页码
                PAGE_SIZE: pageSize // 分页单位
              }
            })
          }
        }).then((res) => {
          this.loading = false;
          if (res.data.code === 0) {
            this.tableActive = true;
            if (res.data.data) {
              if (res.data.data.ACTI_RELEASE_INFO) {
                // this.activeName = '2' // 已发布
                res.data.data.ACTI_RELEASE_INFO.map((e) => {
                  e.blue = true;
                  e.SHOP_NAME = e.SHOP_NAME ? e.SHOP_NAME.join(',') : e.SHOP_NAME;
                  e.DISTRIB_NAME = e.DISTRIB_NAME
                    ? e.DISTRIB_NAME.join(',')
                    : e.DISTRIB_NAME;
                  if (e.STATUS == 1) {
                    e.status = '草稿';
                  } else if (e.STATUS == 2) {
                    e.status = '已发布';
                  } else if (e.STATUS == 3) {
                    e.status = '下线过期';
                  }
                });

                this.tableActiveName2.tBody = res.data.data.ACTI_RELEASE_INFO;
                this.tableActiveName2.page.total = res.data.data.ACTI_RELEASE_NUM;
                this.tableActiveName2.tBody.map((item, index) => {
                  item.start = (this.tableActiveName2.page.currentPage - 1)
                    * this.tableActiveName2.page.pageSize
                    + Number(index)
                    + 1;
                });
              }
            }
          }
        });
      },
      Draft() {
        // 点击查找草稿
        const currentPage = this[`tableActiveName${this.activeName}`].page
          .currentPage;
        const pageSize = this[`tableActiveName${this.activeName}`].page.pageSize;
        this[`tableActiveName${this.activeName}`].tBody = [];
        const distribIds = [];
        if (this.Mitemdata1.itemdata.valuedata.length > 0) {
          this.Mitemdata1.itemdata.valuedata.map((e) => {
            distribIds.push(e.ID);
          });
        }
        this.axios({
          url: '/p/cs/cpromactiquerylist',
          method: 'POST',
          data: {
            param: JSON.stringify({
              DISTRIB_ID: distribIds || [], // 配销中心ID
              // "STORE_ID":this.query.store.length > 0 && this.query.store[0].ID?this.query.store[0].ID: "",		   //门店ID（1010修改，前端传单个门店）0
              STORE_IDS: this.my_input_st.itemdata.pid, // 线下门店ID（1010修改，前端传单个门店）0
              SHOP_IDS: this.my_input_sh.itemdata.pid, // 线上店铺ID（1010修改，前端传单个门店）0
              ACTI_PRO: this.inputList[0].valuedata, // 款号0
              ACTI_DATE: this.acti_date ? this.acti_date.join('-') : '', // 活动日期0
              ACTI_NAME: this.acti_name, // 活动名称
              PROM_SCOPE:
                this.query.firstLevel.length > 0
                  ? this.query.firstLevel[0].ID
                  : '', // 促销大类0
              PROM_TYPE:
                this.query.lastLevel.length > 0 ? this.query.lastLevel[0].ID : '', // 促销中类
              RELEASE_NAME: this.release_name, // 发布人0
              STATUS: 1, // 1.草稿，2.已发布，3.下线  （首次进入不传状态）
              PAGE: {
                CURRENT_PAGE: currentPage, // 当前页码
                PAGE_SIZE: pageSize // 分页单位
              }
            })
          }
        }).then((res) => {
          this.loading = false;
          if (res.data.code === 0) {
            this.tableActive = true;
            if (res.data.data && res.data.data.ACTI_DRAFT_INFO) {
              // this.activeName = '3' // 草稿
              res.data.data.ACTI_DRAFT_INFO.map((e) => {
                e.SHOP_NAME = e.SHOP_NAME ? e.SHOP_NAME.join(',') : e.SHOP_NAME;
                e.DISTRIB_NAME = e.DISTRIB_NAME
                  ? e.DISTRIB_NAME.join(',')
                  : e.DISTRIB_NAME;
                if (e.STATUS == 1) {
                  e.status = '草稿';
                } else if (e.STATUS == 2) {
                  e.status = '已发布';
                } else if (e.STATUS == 3) {
                  e.status = '下线过期';
                }
              });

              this.tableActiveName3.tBody = res.data.data.ACTI_DRAFT_INFO;
              this.tableActiveName3.page.total = res.data.data.ACTI_DRAFT_NUM;
              this.tableActiveName3.tBody.map((item, index) => {
                item.start = (this.tableActiveName3.page.currentPage - 1)
                  * this.tableActiveName3.page.pageSize
                  + Number(index)
                  + 1;
              });
            }
          }
        });
      },
      Over() {
        // 点击查找下线过期
        const currentPage = this[`tableActiveName${this.activeName}`].page
          .currentPage;
        const pageSize = this[`tableActiveName${this.activeName}`].page.pageSize;
        this[`tableActiveName${this.activeName}`].tBody = [];
        const distribIds = [];
        if (this.Mitemdata1.itemdata.valuedata.length > 0) {
          this.Mitemdata1.itemdata.valuedata.map((e) => {
            distribIds.push(e.ID);
          });
        }
        this.axios({
          url: '/p/cs/cpromactiquerylist',
          method: 'POST',
          data: {
            param: JSON.stringify({
              DISTRIB_ID: distribIds || [], // 配销中心ID
              // "STORE_ID":this.query.store.length > 0 && this.query.store[0].ID?this.query.store[0].ID: "",		   //门店ID（1010修改，前端传单个门店）0
              STORE_IDS: this.my_input_st.itemdata.pid, // 线下门店ID（1010修改，前端传单个门店）0
              SHOP_IDS: this.my_input_sh.itemdata.pid, // 线上店铺ID（1010修改，前端传单个门店）0
              ACTI_PRO: this.inputList[0].valuedata, // 款号0
              ACTI_DATE: this.acti_date ? this.acti_date.join('-') : '', // 活动日期0
              ACTI_NAME: this.acti_name, // 活动名称
              PROM_SCOPE:
                this.query.firstLevel.length > 0
                  ? this.query.firstLevel[0].ID
                  : '', // 促销大类0
              PROM_TYPE:
                this.query.lastLevel.length > 0 ? this.query.lastLevel[0].ID : '', // 促销中类
              RELEASE_NAME: this.release_name, // 发布人0
              STATUS: 3, // 1.草稿，2.已发布，3.下线  （首次进入不传状态）
              PAGE: {
                CURRENT_PAGE: currentPage, // 当前页码
                PAGE_SIZE: pageSize // 分页单位
              }
            })
          }
        }).then((res) => {
          this.loading = false;
          if (res.data.data && res.data.data.ACTI_OVER_INFO) {
            // this.activeName = '4' // 下线过期
            res.data.data.ACTI_OVER_INFO.map((e) => {
              e.grey = true;
              e.SHOP_NAME = e.SHOP_NAME ? e.SHOP_NAME.join(',') : e.SHOP_NAME;
              e.DISTRIB_NAME = e.DISTRIB_NAME
                ? e.DISTRIB_NAME.join(',')
                : e.DISTRIB_NAME;
              if (e.STATUS == 1) {
                e.status = '草稿';
              } else if (e.STATUS == 2) {
                e.status = '已发布';
              } else if (e.STATUS == 3) {
                e.status = '下线过期';
              }
            });
            this.tableActiveName4.tBody = res.data.data.ACTI_OVER_INFO;
            this.tableActiveName4.page.total = res.data.data.ACTI_OVER_NUM;
            this.tableActiveName4.tBody.map((item, index) => {
              item.start = (this.tableActiveName4.page.currentPage - 1)
                * this.tableActiveName4.page.pageSize
                + Number(index)
                + 1;
            });
          }
        });
      },
      handDblClick(index) {
        // 双击事件
        const _this = this[`tableActiveName${this.activeName}`].tBody[index];
        const ACTI_ID = _this.ACTI_ID;
        const typeId = _this.PROM_TYPE_ID;
        const PROM_TYPE_NAME = _this.PROM_TYPE_NAME; // 二类名称
        const PROM_TYPE_BRIEF = _this.PROM_TYPE_BRIEF; // 二类描述
        const STATUS = _this.STATUS;
        this.axios({
          method: 'post',
          url: '/p/cs/cpromactiquery',
          data: {
            param: JSON.stringify({
              objid: ACTI_ID,
              prom_type_id: typeId
            })
          }
        }).then((res) => {
          if (res.data.code === 0) {
            this.$store.state.customize.dataTwo = res.data.data;
            // sq存储一套作为清空操作的初始数据
            const scheme_dataInit = JSON.stringify(res.data.data.scheme_arr);
            this.$store.commit('customize/jordanStore/scheme_dataRecover', JSON.parse(scheme_dataInit));
            // 存储种类id保存草稿时需要
            this.$store.state.customize.jordanStore.sch_type_id = res.data.data.basic_info.sch_type_id;
            this.$store.commit('customize/TabHref', {
              id: ACTI_ID, // id
              type: 'action', // 类型action
              name: 'promotion', // 文件名
              label: '编辑促销活动', // tab中文名
              query: Object.assign({
                id: ACTI_ID, // id
                typeId,
                tabTitle: '编辑促销活动', // tab中文名
                prom_type_name: PROM_TYPE_NAME, // 二类名称
                prom_type_brief: PROM_TYPE_BRIEF, // 二类描述
                status: STATUS
              }) // 带的参数
            });
          }
        });
      },
      downLine() {
        // 点击下线
        const newList = [];
        let flag = false;
        const newIds = [];
        this[`tableActiveName${this.activeName}`].tBody.map((item) => {
          item.checked ? newList.push(item) : '';
          item.checked ? newIds.push(item.ACTI_ID) : '';
        });
        if (newList.length < 1) {
          this.$message({
            message: '请至少选择一个',
            type: 'warning'
          });
          return false;
        }
        newList.map((item) => {
          item.status == '下线过期' ? (flag = true) : '';
        });
        if (flag) {
          this.$message({
            message: '选择的促销活动已经下线/过期',
            type: 'warning'
          });
          return false;
        }
        this.dataError.show = false; // 关闭弹框
        this.axios({
          url: '/p/cs/promActiStatusUpdate',
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
            console.log('0', res.data.code);
            this.Demand();
            this.$message({
              message: res.data.message,
              type: 'success'
            });
          } else if (res.data.code === -1) {
            if (res.data.data) {
              this.Demand();
            // this.$message({
            //       message: res.data.data[0].message + res.data.data.message,
            //       type: "warning"
            //     });
            }
          }
        });
      },
      handleCurrentChange(val) {
        // 第几页
        if (this.activeName == 1) {
          this.tableActiveName1.page.currentPage = Number(val);
          this.Demand();
        } else if (this.activeName == 2) {
          this.tableActiveName2.page.currentPage = Number(val);
          this.Release();
        } else if (this.activeName == 3) {
          this.tableActiveName3.page.currentPage = Number(val);
          this.Draft();
        } else {
          this.tableActiveName4.page.currentPage = Number(val);
          this.Over();
        }
      },
      handleSizeChange(val) {
        // //一页多少条数据
        if (this.activeName == 1) {
          this.tableActiveName1.page.currentPage = 1;
          this.tableActiveName1.page.pageSize = Number(val);
          this.Demand();
        } else if (this.activeName == 2) {
          this.tableActiveName2.page.currentPage = 1;
          this.tableActiveName2.page.pageSize = Number(val);
          this.Release();
        } else if (this.activeName == 3) {
          this.tableActiveName3.page.currentPage = 1;
          this.tableActiveName3.page.pageSize = Number(val);
          this.Draft();
        } else {
          this.tableActiveName4.page.currentPage = 1;
          this.tableActiveName4.page.pageSize = Number(val);
          this.Over();
        }
      }
    }
  };
</script>
<style lang="less">
.promactiquery {
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
    margin-bottom: 10px;

    .item_three_1 {
      box-sizing: border-box;
      -ms-flex: 1 1 24%;
      width:25%;
      padding:5px;
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
        .query_select{
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
    }
  }
  .main_body {
    flex: 20;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    margin-top: 20px;
    position: relative;
    overflow: hidden;
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
.promactiquery {
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
