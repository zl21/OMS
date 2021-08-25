<template>
  <my-dialog
    :title="title"
    :visible.sync="t_dialog_show"
    :show-close="true"
    :has-width="true"
    :close-on-click-modal="false"
    :append-to-body="appendToBody"
    :modal-append-to-body="modalAppendToBody"
    class="ark-dialog"
    @MyDialogClose="dialogClose"
  >
    <template #title>
      {{title}}
    </template>
    
    <div v-loading.lock="confirmLoading" class="fkdialog">
      <div class="dialog_left">
        <div class="left_top">
          <span>{{ vmI18n.t("SCREENCONDITION") }}</span>
          <span>
            <i v-if="!open_close_icon" class="iconfont" @click="nodeOpen"
              >&#xe61a;</i
            >
            <i v-if="open_close_icon" class="iconfont" @click="nodeCLose"
              >&#xe62c;</i
            >
            <i class="iconfont" @click="clearNode">&#xe61d;</i>
          </span>
        </div>
        <div id="left_scroll_center" class="left_center">
          <tree
            v-loading.lock="tree_loading"
            :tree_lists="tree_lists"
            class="left-tree"
            @tree_change="tree_change"
          />
        </div>
      </div>
      <div
        class="dialog_center"
        :class="{ 'second-width': activeName === 'second' }">
        <el-tabs v-model="activeName">
          <el-tab-pane
            :label="vmI18n.t('SELECTEDRESULTS')"
            name="first"
            class="el-tab-auto"
          >
            <!-- <el-pagination
              :current-page="l_center_data.l_currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="l_center_data.l_page_size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="l_center_data.total"
              @size-change="l_handleSizeChange"
              @current-change="l_handleCurrentChange"
            /> -->
            <Page 
             class-name="dfkialogPage"
             :show-total="true"
             :current="l_center_data.l_currentPage"
             :total="l_center_data.total"
             :page-size="l_center_data.l_page_size"
             :page-size-opts="[10, 20, 50, 100]"
             @on-change="l_handleCurrentChange" 
             @on-page-size-change="l_handleSizeChange" 
             pager-count = "5"
             size="small" 
             show-elevator 
             show-sizer/>
            <show-table-data
              ref="screen_ck"
              v-loading.lock="l_screenLoading"
              :table_head="l_table_data.header"
              :table_data="l_table_data.body[l_center_data.l_currentPage - 1]"
              :table_checked="
                l_table_data.checked[l_center_data.l_currentPage - 1]
              "
              :current-page="l_center_data.l_currentPage - 1"
              :size-page="l_center_data.l_page_size"
              id_name="first"
              @center_change="center_change"
              @single="single"
            />
          </el-tab-pane>
          <el-tab-pane
            :label="vmI18n.t('VIEWTHESELECTEDRESULTS')"
            name="second"
            class="el-tab-auto"
          >
            <!-- <el-pagination
              :current-page="r_center_data.r_currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="r_center_data.r_page_size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="r_center_data.total"
              @size-change="r_handleSizeChange"
              @current-change="r_handleCurrentChange"
            /> -->
            <Page 
             class-name="dfkialogPage"
             :show-total="true"
             :current="r_center_data.r_currentPage"
             :total="r_center_data.total"
             :page-size="r_center_data.r_page_size"
             :page-size-opts="[10, 20, 50, 100]"
             @on-change="l_handleCurrentChange" 
             @on-page-size-change="l_handleSizeChange" 
             pager-count = "5"
             size="small" 
             show-elevator 
             show-sizer/>
            <show-table-data
              ref="result_ck"
              :table_head="r_table_data.header"
              :table_data="r_table_data.body[r_center_data.r_currentPage - 1]"
              :current-page="r_center_data.r_currentPage - 1"
              :size-page="r_center_data.r_page_size"
              :table_checked="
                r_table_data.checked[r_center_data.r_currentPage - 1]
              "
              id_name="second"
              @center_change="center_change"
            />
          </el-tab-pane>
        </el-tabs>
        <div v-if="activeName === 'first'" class="center_bottom">
          <el-input
            ref="searchWord"
            v-model="searchWord"
            @keyup.enter.native="keyupWord"
            @change="searchWordChange"
          >
            <i
              slot="suffix"
              class="el-icon-search el-input__icon"
              @click="onIconClick"
            />
            <template slot="prepend">
              {{ vmI18n.t("GLOBALSEARCH") }}
            </template>
          </el-input>
          <div class="center-exclude">
            <label for="exclude">
              <input
                id="exclude"
                v-model="exclude"
                type="checkbox"
                name=""
                value=""
              />
              <span class="checked-box" />
              <span> {{ vmI18n.t("EXCLUDE") }}</span>
            </label>
          </div>
        </div>
        <div v-if="activeName !== 'first'" class="center_bottom center-b-t">
          <el-input
            ref="searchResult"
            v-model="searchResult"
            @keyup.enter.native="keyupSearch"
            @change="searchResultChange"
          >
            <i
              slot="suffix"
              class="el-icon-search el-input__icon"
              @click="onSearchResult"
            />
            <!-- 查询结果 -->
            <template slot="prepend">
              {{ vmI18n.t("other.queryResults") }}
            </template>
          </el-input>
        </div>
      </div>
      <div v-if="activeName === 'first'" class="dialog-operation">
        <div
          class="operation-more operation-icon iconfont operation-hover"
          @click="addCondition"
        >
          &#xe606;
        </div>
        <div
          class="operation-single iconfont operation-icon operation-hover"
          @click="center_change(single_data)"
        >
          &#xe613;
        </div>
      </div>
      <div class="dialog_right">
        <div class="right_top">
          <span>{{ vmI18n.t("HASBEENSELECTED") }}</span
          ><span>(</span
          ><span
            >{{ r_center_data.rightTotal }} {{ vmI18n.t("common.piece") }}</span
          ><span>)</span>

          <span>
            <i class="iconfont" @click="showOrHidden = true">&#xe61c;</i>
            <i class="iconfont" @click="clearAllResult">&#xe61e;</i>
          </span>
        </div>
        <div class="right_center">
          <ul>
            <li v-for="(item, index) in r_result" :key="index">
              <p>{{ item.exclude ? "排除：" : "" }}{{ item.screen_string }}</p>
              <i class="iconfont icon-fork" @click="deleteList(index)" />
            </li>
          </ul>
        </div>
        <div class="right_bottom">
          <el-button @click="dialogClose">
            {{ vmI18n.t("CANCEL") }}
          </el-button>
          <el-button @click="dialogConfirm">
            {{ vmI18n.t("CONFIRM") }}
          </el-button>
        </div>
      </div>
      <div v-if="showOrHidden" class="modalDiv">
        <div class="modalCenter">
          <div class="modalTitle">
            <span class="modalText">{{ vmI18n.t("POTX") }}</span>
            <i
              class="iconfont icon-cha1"
              @click="showOrHidden = !showOrHidden"
            />
          </div>
          <div class="modalContent">
            <i class="iconfont muBan">&#xe637;</i>
            <div class="textCenter">
              {{ vmI18n.t("PAGENAME") }}：<input
                v-model="module_name"
                type="text"
              />
            </div>
            <div class="modalBtn">
              <button class="btn" @click="result_save">
                <span>{{ vmI18n.t("ENSURE") }}</span>
              </button>
              <button class="btn" @click="showOrHidden = !showOrHidden">
                <span>{{ vmI18n.t("CANCEL") }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="errorDialog" class="fk-error-dialog">
      <div class="fk-error-dialog-box">
        <div class="fk-error-dialog-title">
          <!-- 警告 -->
          {{ vmI18n.t("modalTitle.warning") }}
          <span class="fk-error-icon">
            <i class="iconfont icon-cha1" @click="errorDialog = false" />
          </span>
        </div>
        <div class="fk-error-dialog-body">
          <div class="fk-body-top">
            <div class="fk-body-top-left">
              <i class="iconfont">&#xe631;</i>
            </div>
            <div class="fk-body-top-right">
              <p v-for="(list, index) in errorData" :key="index">
                {{ list.message }}
              </p>
            </div>
          </div>
          <div class="fk-body-bottom">
            <!-- 确定 -->
            <el-button @click="errorDialogClose">
              {{ vmI18n.t("common.determine") }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </my-dialog>
</template>

<script>
/* type="ecmascript-6" */
import i18n from "@burgeon/internationalization/i18n";
import MyDialog from "framework/components/dialog/mydialog.vue";
import DragDialog from "framework/components/dialog/mydialog.vue";
import tree from "framework/components/tablelist/tree.vue";
import ShowTableData from "framework/components/views/custompage/ShowTableData.vue";
window.$i18n = i18n;

export default {
  props: {
    serviceId: {
      type: String,
      default: "r3-cp",
    },
    version: {
      type: String,
    }, // 兼容老接口返回的数据结构（eg.斯凯奇
    tablename: {
      type: String,
    }, // 表名
    tableid: [String, Number], // 表id
    rightList: [Object, String],
    modalAppendToBody: {
      type: Boolean,
      default: true,
    }, // 將蒙层放在body上
    appendToBody: {
      type: Boolean,
      default: false,
    }, // 是否将弹框放在body
    fkshow: {
      type: Boolean,
      default: true,
    }, // 显示
    isObject: {
      type: Boolean,
      default: false,
    }, // 判断是否是单对象
    title: {
      type: String,
      default: "弹框多选",
      // default: $i18n.t('modalTitle.a7')
    }, // 标题
    canChinese: {
      type: Boolean,
      default: true,
    }, // 是否可以模糊搜索中文
    isOneData: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      $i18n: i18n,
      vmI18n: i18n,
      confirmLoading: false, // 页面loading
      t_dialog_show: true, // 弹框显示
      ChineseDictionary: {}, // 名字集合
      activeName: "first", // tab名
      table_name: "PS_C_PRO", // 测试表名
      trigger_focus: false,
      open_close_icon: false, // 筛选结果展开收拢
      code_name: "", // 配置项
      /* 以上公共部分 */

      errorDialog: false, // errorDialog
      errorDialogClass: "error", // 弹框类型
      warnDialogClass: "warning",
      // errorDialogTitle: '错误', // 弹框标题
      errorDialogTitle: $i18n.t("modalTitle.error"), // 弹框标题
      errorData: [{ message: "" }], // 弹框内容
      errorDialogBack: false, // 是否有返回按钮
      /* 弹框部分 */

      tree_loading: false, // 节点树loading
      l_screen_result_save: {}, // 左边刷选结果保存
      tree_lists: [], // 左边列表树
      isTreeOrSearch: true, // 判断点的是左边树还是搜索的
      /* 以上左边树数据 */

      l_center_data: {
        l_currentPage: 1, // 当前页
        l_page_size: 50, // 页面显示个数
        total: 0, // 总个数
      }, // 筛选结果分页组件数据
      l_table_data: {
        header: {},
        body: [],
        checked: [],
      }, // 左边筛选结果table数据
      l_screenLoading: false, // loading
      searchWord: "", // 筛选结果检索
      exclude: false, // 排除选项
      /* 以上筛选结果数据 */

      r_result: [], // 右边数据渲染列表
      /* r_send_result: [
      {
        CONDITION: {},
        ID: []
      }
    ],//有筛选条件的排序项 */
      /* r_condition: [],//保存筛选结果同条件下的排除选项
    r_null_obj: {
      condition: {},
      ID: []
    },//保存没有筛选条件下的排除项 */
      /* r_result_checked: [],//保存筛选项 */
      request_param: {}, // 保存模板用的数据
      /* light_sub: -1,//高亮下标 */
      optimize_request: {}, // 优化请求用的
      r_result_length: -1, // 用于请求优化
      /* 以上右边列表数据 */

      r_screenLoading: false, // loading
      single_data: [], // 保存筛选结果的高亮项
      searchResult: "", // 选中结果全局检索
      r_center_data: {
        r_currentPage: 1, // 当前页
        r_page_size: 50, // 页面显示个数
        total: 0, // 总个数
        rightTotal: 0, // 右边条件查询的总数
      },
      r_table_data: {
        header: {},
        body: [],
        checked: [],
      }, // 右边筛选结果table数据
      /* restaurants: [],//模糊搜索的数据 */
      /* 以上选中结果数据 */

      showOrHidden: false, // 模态框的显示
      module_name: "", // 模板名
      /* 以上模板框数据 */
      /* param:{
        "TABLENAME":"表名",
        "CONDITION":{
          "AKNAME":['ID','ID','ID']
        },
        "ID": {
          "IN": ['ID', 'ID', 'ID'],
          "NOTIN": [
            {
              "condition": {
                "AKNAME": ['ID', 'ID', 'ID'],
              },
              "ID": ['ID', 'ID', 'ID']
            }
          ],
        },
        'NOTIN': [],
        "EXCLUDE":{
          "AKNAME":['ID','ID','ID']
        },
        "PAGENUM":"页数",
        "PAGESIZE":"每页显示数量"
      } */
    };
  },
  components: {
    tree,
    ShowTableData,
    MyDialog,
    // errorMessage,
    DragDialog,
  },
  methods: {
    MyDialogClose() {
      this.$emit("dialogClose");
    }, // 关闭弹框向上派发事件
    nodeOpen() {
      const list = $(".dislogtree .node");
      const arr = this.tree_lists.map((obj) => {
        obj.show = true;
        return Object.assign({}, obj);
      });
      this.$set(this, "tree_lists", arr);
      this.$nextTick(() => {
        list.each((index, item) => {
          $(item).find(".title i").css("transform", "rotate(90deg)");
          $(item).find("ul").slideDown();
        });
        this.open_close_icon = true;
      });
    }, // 左边节点树打开
    nodeCLose() {
      const _self = this;
      const list = $(".dislogtree .node");
      list.each((index, item) => {
        $(item).find(".title i").css("transform", "rotate(0deg)");
        $(item).find("ul").slideUp();
      });
      this.open_close_icon = false;
    }, // 左边节点树关闭
    clearNode() {
      this.isTreeOrSearch = true; // 表示不是搜索的
      //        this.searchWord = '';//清空搜索
      this.l_table_data.body = []; // 清空table数据
      this.l_center_data.l_currentPage = 1; // 页码重置
      this.l_screen_result_save = {}; // 清空保存的选中的
      this.$refs.screen_ck.val_arr = []; // 清空子组件选中的
      this.$refs.screen_ck.l_sub = []; // 清空高亮
      this.single_data = []; // 清空父组件选中的
      this.tree_lists = this.tree_lists.map((obj, index) => {
        obj.checked = [];
        obj.VALUE.forEach((n) => {
          n.ischecked = false;
        });
        return obj;
      }); // 清空选中的
      this.screen_request(); // 从新获取数据
    }, // 清空左边选中项并重新获取数据
    tree_change(val) {
      const screen = {};
      this.isTreeOrSearch = true; // 表示不是搜索的
      //        this.searchWord = '';//清空搜索
      /* console.log(val) */
      this.l_table_data.body = []; // 清空数据
      /* this.l_table_data.checked = [];//清空数据 */
      this.l_center_data.l_currentPage = 1; // 页码重置
      /* if (!this.exclude) {//不排除选中项 */
      val.map((obj) => {
        if (obj.checked.length === 0) return; // 没有选中项
        screen[obj.AKNAME] = obj.checked;
      });
      this.l_screen_result_save = screen; // 保存筛选结果
      this.$refs.screen_ck.val_arr = []; // 清空子组件选中的
      this.$refs.screen_ck.l_sub = []; // 清空高亮
      this.single_data = []; // 清空父组件选中的
      this.screen_request(); // 获取筛选结果数据
    }, // 左边列表勾选变化时
    screen_request() {
      this.l_screenLoading = true;
      const paramObj = {
        TABLENAME: this.tablename, // 表名
        CONDITION: this.l_screen_result_save, // 左边选中的列表
        GLOBAL: this.isTreeOrSearch ? "" : this.searchWord.trim(), // 全局搜索值
        PAGENUM: this.l_center_data.l_currentPage, // 当前页
        PAGESIZE: this.l_center_data.l_page_size, // 每页显示个数
      };
      const param = new FormData();
      param.append("param", JSON.stringify(paramObj));
      console.log("522::");
      this.service.promotionCenter.screenresult(param).then((res) => {
        const response = this.version == "1.4" ? res.data.data : res.data;
        if (res.data.code !== 0) {
          return;
        }
        this.l_screenLoading = false;
        this.$nextTick(() => {
          this.code_name = response.akname.split(",");
          this.l_center_data.total = response.data.total; // 筛选结果总数
          this.l_table_data.header = JSON.parse(response.header); // 头部信息
          this.l_table_data.body[this.l_center_data.l_currentPage - 1] =
            response.data.list; // body信息
        });
      });
    }, // 左边列表勾选变化获取数据
    screen_request_initialize() {
      this.l_screenLoading = true;
      const paramObj = {
        TABLENAME: this.tablename, // 表名
        CONDITION: this.l_screen_result_save, // 左边选中的列表
        GLOBAL: this.searchWord.trim(), // 全局搜索值
        PAGENUM: this.l_center_data.l_currentPage, // 当前页
        PAGESIZE: this.l_center_data.l_page_size, // 每页显示个数
      };
      const param = new FormData();
      param.append("param", JSON.stringify(paramObj));
      console.log("595::");
      return this.service.promotionCenter
        .screenresult(param, { serviceId: this.serviceId })
        .then((res) => {
          const response = this.version == "1.4" ? res.data.data : res.data;
          if (res.data.code !== 0) {
            return;
          }
          this.l_screenLoading = false;
          this.$nextTick(() => {
            this.code_name = response.akname.split(",");
            this.l_center_data.total = response.data.total; // 筛选结果总数
            this.l_table_data.header = JSON.parse(response.header); // 头部信息
            this.l_table_data.body[this.l_center_data.l_currentPage - 1] =
              response.data.list; // body信息
          });
        });
    }, // 初始化
    addCondition() {
      // 添加节点的
      const screen = {};
      const id_list = [];
      const screen_string = []; // 筛选显示字段
      let unmber = false;
      this.tree_lists.map((obj, index) => {
        const checked_obj = obj;
        if (checked_obj.checked.length === 0) return; // 父节点下面没有勾选的直接return
        const not_checked_s = [];
        screen[obj.AKNAME] = [];
        checked_obj.VALUE.map((n_obj) => {
          // 循环子列表
          const judge = checked_obj.checked.findIndex((n) => n_obj.ID === n); // 查找列表中选中对象的下标
          if (judge !== -1) {
            // 右边只显示(排除或不排除)勾选的项
            screen[checked_obj.AKNAME].push(n_obj.ID); // 放入相应表数组中
            not_checked_s.push(n_obj.NAME); // 加入名字集合
            id_list.push(n_obj.ID); // 所有id集合
            unmber = true;
          }
        });
        screen_string.push(not_checked_s.join()); // 拼接字段
      });
      if (!unmber) return; // 没选return
      this.r_result.unshift({
        // 向数组的头部添加
        screen_string: screen_string.join(" / "), // 筛选条件拼接
        screen, // 各个主节点下的子节点勾选
        exclude: this.exclude, // 判断是否排除勾选项
        id_list, // ID集合
        /* ID: this.r_result.length + '_choose', */
      }); // 把筛选的值放入渲染数组
      //        }else {
      //          //添加搜索的
      //        }
      /* this.r_result_checked.push(this.r_result.length-1 + '_choose'); */
      /* 1、每次添加完是否要清楚数据 */
      this.clearNode();
      this.right_request_center();
    }, // 点击添加条件并清空选中项，不重新获取数据
    /* 以上左边树的所有相关事件 */

    single(val) {
      this.single_data = val;
    }, // 单击保存子组件传过来的数据
    l_handleCurrentChange(val) {
      this.l_center_data.l_currentPage = val; // 页码重置
      if (this.l_table_data.body[this.l_center_data.l_currentPage - 1]) return; // 已存在数据就不用获取了
      this.screen_request();
    }, // 当前页变化
    l_handleSizeChange(val) {
      this.l_table_data.body = []; // 清空table数据
      this.$refs.screen_ck.val_arr = []; // 清空子组件选中的
      this.$refs.screen_ck.l_sub = []; // 清空高亮
      this.single_data = []; // 清空父组件选中的
      /* this.l_table_data.checked = [];//清空checked数据 */
      this.l_center_data.l_page_size = val; // 改变每页显示个数
      this.l_center_data.l_currentPage = 1; // 页码重置
      this.screen_request();
    }, // 页数变化
    onIconClick() {
      const _this = this;
      this.isTreeOrSearch = false; // 表示是搜索的
      this.l_table_data.body = []; // 清空table数据
      this.l_center_data.l_currentPage = 1; // 页码重置
      this.l_screen_result_save = {}; // 清空保存的选中的
      this.$refs.screen_ck.val_arr = []; // 清空子组件选中的
      this.$refs.screen_ck.l_sub = []; // 清空高亮
      this.single_data = []; // 清空父组件选中的
      this.tree_lists = this.tree_lists.map((obj, index) => {
        obj.checked = [];
        return obj;
      }); // 清空选中的
      this.l_screenLoading = true;
      const paramObj = {
        TABLENAME: this.tablename, // 表名
        CONDITION: this.l_screen_result_save, // 左边选中的列表
        GLOBAL: this.searchWord.trim(), // 全局搜索值
        PAGENUM: this.l_center_data.l_currentPage, // 当前页
        PAGESIZE: this.l_center_data.l_page_size, // 每页显示个数
      };
      const param = new FormData();
      param.append("param", JSON.stringify(paramObj));
      console.log("737::");
      this.service.promotionCenter.screenresult(param).then((res) => {
        const response = this.version == "1.4" ? res.data.data : res.data;
        if (res.data.code !== 0) {
          return;
        }
        this.l_screenLoading = false;
        let r_data_length = false;
        this.$nextTick(() => {
          this.l_center_data.total = response.data.total; // 筛选结果总数
          this.l_table_data.header = JSON.parse(response.header); // 头部信息
          this.l_table_data.body[this.l_center_data.l_currentPage - 1] =
            response.data.list; // body信息
          response.data.list.map((obj) => {
            let judgeTerm = false; // 用来判断搜索字段与查询到的数据相匹配
            this.code_name.map((codeName) => {
              if (
                obj[codeName].toLowerCase() ===
                _this.searchWord.trim().toLowerCase()
              )
                judgeTerm = true;
            });
            if (judgeTerm) {
              const index = _this.r_result.findIndex(
                (n) => obj.ID === n.screen && _this.exclude === n.exclude
              ); // 找到相同项
              if (index === -1) {
                // 没找到在添加
                _this.r_result.unshift({
                  screen_string: obj[this.code_name[0]], // 商品款号
                  screen: obj.ID, // 商品ID
                  exclude: this.exclude, // 判断是否排除勾选项
                  id_list: [obj.ID], // ID集合
                  /* CONDITION: Object.keys(_this.l_screen_result_save).length === 0? 0 : _this.r_send_result.length - 1 //表示是有筛选条件的下标 */
                  /* ID: this.r_result.length + '_choose',//ID
                  checked: true,//是否勾选 */
                }); // 把筛选的值放入数组
              }
              r_data_length = true; // 表示有完全一样的
            }
          });
          if (r_data_length) {
            _this.right_request_center(); // 重新获取数据
          }
        });
        /* this.l_table_data.checked[this.l_center_data.l_currentPage-1] = [];//选中的选项 */
      });
    }, // 筛选结果全局检索 图标点击
    keyupWord() {
      this.onIconClick();
    }, // enter快捷
    /* 以上筛选结果的相关事件 */
    searchWordChange(a) {
      let str = "";
      if (this.canChinese) {
        str = a.match(/[A-Za-z0-9\u4e00-\u9fa5]*/g);
      } else {
        str = a.match(/[A-Za-z0-9]*/g);
      }
      this.$refs.searchWord.currentValue = str[0];
      this.searchWord = str[0];
    }, // 搜索全局检索限制
    searchResultChange(a) {
      let str = "";
      if (this.canChinese) {
        str = a.match(/[A-Za-z0-9\u4e00-\u9fa5]*/g);
      } else {
        str = a.match(/[A-Za-z0-9]*/g);
      }
      this.$refs.searchResult.currentValue = str[0];
      this.searchResult = str[0];
    }, // 搜索查询结果限制
    center_change(val) {
      const _this = this;
      if (this.activeName === "first") {
        if (val instanceof Array) {
          if (val.length === 0) return;
          val.map((obj) => {
            const val_obj = obj;
            const index = _this.r_result.findIndex((n) => {
              if (val_obj.ID === n.screen && _this.exclude === n.exclude)
                return true;
            }); // 找到相同项
            if (index !== -1) return; // 说明已经存在了
            _this.r_result.unshift({
              screen_string: obj[this.code_name[0]], // 商品款号
              screen: obj.ID, // 商品ID
              exclude: _this.exclude, // 判断是否排除勾选项
              id_list: [obj.ID], // ID集合
            }); // 把筛选的值放入数组
          });
        } else {
          const index = _this.r_result.findIndex((n) => {
            if (val.ID === n.screen && _this.exclude === n.exclude) return true;
          }); // 找到相同项
          if (index === -1) {
            // 没找到在添加
            this.r_result.unshift({
              screen_string: val[this.code_name[0]], // 商品款号
              screen: val.ID, // 商品ID
              exclude: this.exclude, // 判断是否排除勾选项
              id_list: [val.ID], // ID集合
            }); // 把筛选的值放入数组
          } else {
            // 找到弹出提示已存在
            this.$Message.warning($i18n.t("modalTips.go")); // message: '该记录已在已选中列表中'
          }
        }
        this.$refs.screen_ck.val_arr = []; // 清空选中的
        this.$refs.screen_ck.l_sub = []; // 清空高亮
        this.$refs.screen_ck.r_click_id = 0; // 清空shift高亮
        this.single_data = []; // 清空选中的
        this.right_request_center();
      } else {
        const index = _this.r_result.findIndex((n) => {
          if (val.ID === n.screen && n.exclude === true) return true;
        }); // 找到相同项
        if (index === -1) {
          // 没找到在添加
          this.r_result.unshift({
            screen_string: val[this.code_name[0]], // 商品款号
            screen: val.ID, // 商品ID
            exclude: true, // 一定是排除项
            id_list: [val.ID], // ID集合
          }); // 把筛选的值放入数组
        } else {
          // 找到提示已存在
          this.$Message.warning($i18n.t("modalTips.go"));
          // this.$message({
          //   // message: '该记录已在已选中列表中',
          //   message: $i18n.t('modalTips.go'),
          //   center: true,
          //   type: 'warning'
          // });
        }
        this.onSearchResult(); // 显示查询结果的数据
        this.request_total(); // 查询查询条件的总数
        /* this.r_result_checked.push(this.r_result.length - 1 + '_choose');//使添加的直接勾选 */
      }
    }, // 将筛选结果勾选的集合或选中结果的排除项添加到右边列表
    /* 以上筛选结果和选中结果的公共事件 */

    right_dispose() {
      const _this = this;
      const CONDITION = [];
      const EXCLUDE = [];
      const IN = [];
      const NOTIN = [];
      this.r_result.map((obj) => {
        if (obj.screen instanceof Object) {
          // 是对象说明是左边的节点树
          if (obj.exclude) {
            // 排除项
            EXCLUDE.push(obj.screen);
          } else {
            // 非排除项
            CONDITION.push(obj.screen);
          }
        } else if (obj.exclude) {
          // 排除项
          NOTIN.push(obj.screen);
        } else {
          // 非排除项
          IN.push(obj.screen);
        }
      });
      const param = {
        TABLENAME: this.tablename, // 表名
        CONDITION, // 各个父节点下面的勾选的子节点
        IN: [...[...new Set(IN)]], // 中间的勾选项
        NOTIN: [...[...new Set(NOTIN)]], // 中间的排除勾选项
        EXCLUDE, // 排除的各个父节点下面的勾选的子节点
        GLOBAL: this.searchResult.trim(), // 全局搜索值
        PAGENUM: this.r_center_data.r_currentPage, // 当前页
        PAGESIZE: this.r_center_data.r_page_size, // 每页显示的个数
      };
      this.optimize_request = param; // 用于请求优化
      this.request_param = {
        TABLENAME: this.tablename, // 表名
        CONDITION, // 各个父节点下面的勾选的子节点
        IN: [...[...new Set(IN)]], // 中间的勾选项
        NOTIN: [...[...new Set(NOTIN)]], // 中间的排除勾选项
        EXCLUDE, // 排除的各个父节点下面的勾选的子节点
        GLOBAL: this.searchResult.trim(), // 全局搜索值
      }; // 传给后台用的
      return param;
    }, // 右边列表的数据处理
    request_total() {
      this.request_param.GLOBAL = "";
      const paramObj = this.request_param;
      const param = new FormData();
      param.append("param", JSON.stringify(paramObj));
      console.log("1008::");
      this.service.promotionCenter.screenresultcheck(param).then((res) => {
        const response = this.version == "1.4" ? res.data.data : res.data;
        if (res.data.code !== 0) {
          return;
        }
        this.r_center_data.rightTotal = response.data.total; // 选中结果总数
      });
    }, // 获取总数
    right_dispose_request() {
      this.confirmLoading = true;
      this.r_screenLoading = true;
      const param = new FormData();
      param.append("param", JSON.stringify(this.optimize_request));
      console.log("1033::");
      this.service.promotionCenter.screenresultcheck(param).then((res) => {
        const response = this.version == "1.4" ? res.data.data : res.data;
        this.confirmLoading = false;
        if (res.data.code !== 0) {
          return;
        }
        this.r_center_data.total = response.data.total; // 选中结果总数
        if (!this.searchResult.trim())
          this.r_center_data.rightTotal = response.data.total; // 选中结果总数
        this.r_table_data.header = JSON.parse(response.header); // 头部信息
        this.r_table_data.body[this.r_center_data.r_currentPage - 1] =
          response.data.list; // body信息
        /* this.r_table_data.checked[this.r_center_data.r_currentPage-1] = []; //选中项保存 */
        this.r_screenLoading = false;
      });
    }, // 通过右边列表情况查询中间数据发起请求
    clearAllResult() {
      this.r_result = []; // 清空右边列表数据
      this.r_table_data.body = []; // 清空数据
      this.r_send_result = [
        {
          CONDITION: {},
          ID: [],
        },
      ]; // 初始化有筛选条件的排除项
      this.r_center_data.r_currentPage = 1; // 初始化当前页
      this.r_center_data.total = 0;
      this.right_dispose(); // 只有每次点击second时在处理数据
      this.r_center_data.rightTotal = 0; // 查询选中结果条件总数清空
      /* this.right_request_center(); */
    }, // 清除右边所有条件并计算数据在请求
    deleteList(i) {
      this.r_result.splice(i, 1); // 删除这项
      if (this.r_result.length === 0) {
        this.r_table_data.body = []; // 清空数据
        this.r_center_data.r_currentPage = 1; // 初始化当前页
        this.r_center_data.total = 0; // 总条数
        this.right_dispose(); // 只有每次点击second时在处理数据
        this.r_center_data.rightTotal = 0; // 查询选中结果条件总数清空
      } else {
        this.right_request_center(); // 重新获取数据
      }
    }, // 删除选择项
    /* 以上右边列表相关事件 */

    r_handleSizeChange(val) {
      this.r_table_data.body = []; // 清空数据
      /* this.r_table_data.checked = [];//清空勾选项数据 */
      this.r_center_data.r_currentPage = 1; // 初始化当前页
      this.r_center_data.r_page_size = val; // 改变每页显示个数
      this.optimize_request.PAGENUM = 1; // 页码要变化
      this.optimize_request.PAGESIZE = val; // 每页显示个数变化
      this.right_dispose_request(); // 获取数据
    }, // 页数变化发送数据不变化
    r_handleCurrentChange(val) {
      this.r_center_data.r_currentPage = val; // 初始化当前页
      if (this.r_table_data.body[this.r_center_data.r_currentPage - 1]) return; // 已存在数据就不用获取了
      this.optimize_request.PAGENUM = val; // 页码要变化
      this.right_dispose_request(); // 获取数据
    }, // 当前页变化发送数据不变化
    onSearchResult() {
      if (this.r_result.length === 0 && !this.searchResult.trim()) return;
      this.optimize_request.GLOBAL = this.searchResult.trim(); // 选中结果的筛选条件不变的
      this.r_table_data.body = []; // 清空数据
      this.r_center_data.r_currentPage = 1; // 初始化当前页
      this.right_dispose(); // 只有每次点击second时在处理数据
      this.r_screenLoading = true;
      const param = new FormData();
      param.append("param", JSON.stringify(this.optimize_request));
      console.log("1112::");
      this.service.promotionCenter.screenresultcheck(param).then((res) => {
        const response = this.version == "1.4" ? res.data.data : res.data;
        if (res.data.code !== 0) {
          return;
        }
        this.r_center_data.total = response.data.total; // 筛选结果总数
        this.r_table_data.header = JSON.parse(response.header); // 头部信息
        this.r_table_data.body[this.r_center_data.r_currentPage - 1] =
          response.data.list; // body信息
        /* this.r_table_data.checked[this.r_center_data.r_currentPage-1] = []; //选中项保存 */
        this.r_screenLoading = false;
      });
    }, // 选中结果全局检索
    keyupSearch() {
      this.onSearchResult();
    }, // enter快捷
    /* 以上选中结果的相关事件 */

    right_request_center() {
      this.r_table_data.body = []; // 清空数据
      /* this.$refs['result_ck'].r_click_sub = -1;//清除子组件的点击高亮 */
      /* this.r_table_data.checked = [];//清空勾选项数据 */
      this.r_center_data.r_currentPage = 1; // 初始化当前页
      this.right_dispose(); // 只有每次点击second时在处理数据
      this.right_dispose_request(); // 获取数据
    }, // 处理一遍发送数据并请求中间查看选中结果的数据
    /* tab切换成second时的事件 */

    result_save() {
      if (!this.module_name.trim()) {
        this.errorDialogClass = "warning";
        this.errorData = [
          {
            // message: '模板名称不能为空'
            message: $i18n.t("modalTips.gp"),
          },
        ];
        this.errorDialog = true;
        return;
      }
      this.right_dispose(); // 重新计算一遍
      this.request_param.GLOBAL = ""; // 只传条件
      const text = JSON.stringify({
        result: this.r_result, // 渲染列表
        /* condition: this.r_send_result//条件集合 */
      });
      const multiQuery = {
        value: this.request_param,
        text,
      };
      const param = new FormData();
      param.append("tableid", this.tableid);
      param.append("modelname", this.module_name);
      param.append("multiQuery", JSON.stringify(multiQuery));
      console.log("1234::");
      this.service.promotionCenter.setMultiQuery(param).then((res) => {
        const res_data = res.data;
        if (res_data.code !== 0) {
          return;
        }
        this.$message({
          // message: '保存成功',
          message: $i18n.t("modalTips.z9"),
          center: true,
          type: "success",
        });
        this.showOrHidden = false; // 关闭模板框
      });
    }, // 保存右边列表并发送给后台
    /* 以上时保存模板时的事件 */

    dialogClose() {
      $(".fkDialog .el-dialog__header .el-dialog__headerbtn").trigger("click");
      this.t_dialog_show = false;
      this.$emit("dialogClose");
      /* this.l_screen_result_save = {};//初始化
      this.request_param = {};//初始化 */
    }, // 关闭弹出框
    dialogConfirm() {
      $(".fkDialog .el-dialog__header .el-dialog__headerbtn").trigger("click");
      this.right_dispose(); // 处理数据
      this.request_param.GLOBAL = ""; // 只传条件
      // 判断是否只能选中一条数据
      if (this.isOneData && this.r_result.length > 1) {
        // this.$message.warning('只能选取一条数据!');
        this.$Message.warning($i18n.t("modalTips.q2"));
        return;
      }
      if (true) {
        this.confirmLoading = true;
        const param = new FormData();
        param.append("param", JSON.stringify(this.request_param));
        console.log("1300::");
        this.service.promotionCenter.screenresultcheck(param).then((res) => {
          const response = this.version == "1.4" ? res.data.data : res.data;
          this.confirmLoading = false;
          if (res.data.code !== 0) {
            return;
          }
          if (response.ids.length > 8000) {
            return this.$Message.warning($i18n.t("modalTips.q2"));
            // this.$message({
            //   // message: '查询数量已超过上限，请修改查询条件!',
            //   message: $i18n.t('modalTips.gq'),
            //   center: true,
            //   type: 'warning'
            // });
          }
          this.$emit(
            "easyData",
            JSON.stringify({
              value: this.request_param, // 传向后台的数据
              total: this.r_center_data.rightTotal, // 条数
              lists: {
                result: this.r_result, // 渲染列表
                /* condition: this.r_send_result//条件集合 */
              }, // 右边选中列表
              nameList: response.data.list, // name集合
              idArray: response.ids, // 选中结果所有id
            })
          );
          this.t_dialog_show = false;
        });
      } else {
        this.$emit(
          "easyData",
          JSON.stringify({
            value: this.request_param, // 传向后台的数据
            total: this.r_center_data.rightTotal, // 条数
            lists: {
              result: this.r_result, // 渲染列表
              /* condition: this.r_send_result//条件集合 */
            }, // 右边选中列表
            idArray: [],
          })
        );
        this.t_dialog_show = false;
      }
    }, // 确认弹出框
    closeDialog() {
      this.t_dialog_show = false;
    },
    /* 以上关闭弹框并向父组件传递数据 */

    entry_page() {
      this.tree_loading = true;
      if (this.rightList instanceof Object) {
        if (Object.keys(this.rightList).length !== 0) {
          this.r_result = this.rightList.result.map((obj) => obj); // 显示右边数据
          /* this.r_send_result = this.rightList.condition.map(obj => obj);//筛选条件 */
        }
      } else {
        const r_obj = JSON.parse(this.rightList);
        if (
          Object.prototype.toString.call(r_obj.lists) !== "[object Undefined]"
        ) {
          this.r_result = r_obj.lists.result;
          /* if(!!r_obj.lists.condition && r_obj.lists.condition.length !== 0) {
            this.r_send_result = r_obj.lists.condition;
          } */
        } else {
          /* console.log(r_obj.text) */
          const obj_result = JSON.parse(r_obj.text);
          this.r_result = obj_result.result.map((obj) => obj);
          /* if(!!obj_result.condition && obj_result.condition.length !== 0) {
            this.r_send_result = obj_result.condition;
          } */
        }
      }
      /* this.r_result_checked = this.rightList.map((obj) => {
      if(obj.checked)return obj.ID
    });//勾选选中的 */
      const param = new FormData();
      param.append("param", JSON.stringify({ TABLENAME: this.tablename }));
      console.log("1384::");
      this.service.promotionCenter
        .screen(param, { serviceId: this.serviceId })
        .then((res) => {
          const response = res.data;
          if (response.code !== 0) {
            return;
          }
          this.tree_lists = response.data.map((obj) => {
            obj.checked = [];
            obj.VALUE.forEach((n) => {
              n.ischecked = false;
            });
            obj.show = false;
            return obj;
          });
          this.tree_loading = false;
        })
        .catch(() => {
          this.tree_loading = false;
          this.dialogClose();
        });
      this.screen_request_initialize().then(() => {
        if (this.r_result.length !== 0) {
          // 先拿到配置的名字
          this.right_dispose();
          this.right_dispose_request();
        }
      }); // 获取初始数据
    }, // 初始化
    errorDialogClose(value, option) {
      this.errorDialog = false;
    }, // 关闭弹框
  },
  watch: {
    activeName(val) {
      if (val === "second") {
        if (
          this.r_result_length !== this.r_result.length &&
          this.r_result.length !== 0
        ) {
          // 右边列表数据变化时在获取数据
          this.right_request_center(); // 获取中间的数据
        }
      } else {
        this.r_result_length = this.r_result.length;
      }
    },
    t_dialog_show(val) {
      this.$emit("update:fkshow", val); // 关闭弹框
    },
    showOrHidden(a) {
      if (a) this.module_name = ""; // 清空模板名
    },
  },
  mounted() {
    this.entry_page();
    if (this.$route.params["0"] == "table/SG_B_CHANNEL_PRODUCT") {
      const madel = document.documentElement.querySelector(".v-modal");
      madel.style.zIndex = 1998;
    }
  },
  created() {
    const _self = this;
    this.t_dialog_show = this.fkshow;
    // _self.ChineseDictionary = ChineseDictionary;
  },
};
</script>
<style lang="less" type="text/less">
@import "~omsTheme/public.less";
// 框架有样式 -- 覆盖修改
.detailtable .form_button .buttonFk button {
  background-color: transparent;
  border: none;
}
.ark-dialog {
  .fkdialog {
    .dialog_left {
      flex: 1;
      width: auto;
      box-shadow: none;
      .dislogtree {
        .title {
          i,
          label,
          input,
          span {
            display: inline-block;
            vertical-align: middle;
          }
        }
      }
      .left_top {
        span i {
          color: @base-color;
        }
      }
    }
    .dialog_center {
      flex: 3;
      // width: auto;
      box-shadow: none;
      .el-tabs .el-tabs__header .el-tabs__nav .el-tabs__active-bar {
        background-color: @base-color;
      }
      .el-pagination {
        .el-pagination__jump {
          margin-left: 0;
        }
      }
      .center_bottom {
        .el-input {
          input {
            border-radius: 0;
            height: @base-color;
            line-height: @base-color;
          }
        }
        .center-exclude label {
          input,
          span:last-child {
            vertical-align: middle;
          }
        }
      }

      .pagination__jump {
        margin-left: 0;
      }
    }
    .dialog-operation {
      flex: 0.3;
      // width: auto;
      border-color: #f3f3f3;
      .operation-icon {
        color: @base-color;
        font-size: 14px;
        line-height: 19px;
        border-radius: 3px;
      }
    }
    .dialog_right {
      flex: 1;
      // width: auto;
      .right_top {
        color: @base-color;
        span {
          &:nth-child(3),
          :last-child,
          &:last-child {
            i {
              color: @base-color;
            }
            color: @base-color;
          }
        }
      }
      .right_bottom {
        padding: 0;
        height: auto;
        & > button {
          #bundle > .basicBtn;
          color: @base-color;
          &:last-child {
            color: #fff;
            background: @base-color;
            border: 1px solid @base-color;
            margin-right: 0;
          }
        }
      }
    }
  }
}
.dfkialogPage{
  margin: 10px 0;
}
</style>
