<template>
  <div class="tableobj">
    <!--下拉框-->
    <el-dropdown
      v-if="search.display == 'OBJ_SELECT' && !search.conds"
      :ref="'select'+search.colname"
      class="EditSelect has-popover"
      :hide-on-click="false"
      placement="bottom-start"
      trigger="click"
      @visible-change="visiblechange"
    >
      <el-input
        v-model="inputValue"
        :placeholder="ChineseDictionary.PLEASESELECT"
        :class="search.colname+'input'"
        readonly
      >
        <i
          slot="append"
          class="iconfont iconDelete"
          @click="deleteQuery"
        >&#xe6bb;</i>
        <i
          slot="append"
          class="iconfont"
        >&#xe616;</i>
      </el-input>

      <el-dropdown-menu
        slot="dropdown"
        :class="search.colname"
        class="searchDropdown"
      >
        <el-dropdown-item>
          <label
            class="first"
            @click="handleCommand(null,$event)"
          >
            {{ ChineseDictionary.ALL }}
          </label>
        </el-dropdown-item>
        <el-dropdown-item
          v-for="(item, index) in search.combobox"
          :key="'' + item.colid + index"
        >
          <label @click.prevent="handleCommand(item,$event)">
            <input
              type="checkbox"
              :checked="selectedOption.indexOf(item.limitval)>=0"
            >{{ item.limitdesc }}
          </label>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- fk 下拉-->
    
    <!-- 遮挡输入建议组件的盒子，点击唤出下拉多选弹出框 -->
    <span
      v-if="search.fkobj?search.fkobj.searchmodel == 'mrp':false"
      class="clickbox"
      @click.stop="fkPoroverClick(search.colname,$event)"
    />
    <el-popover
      v-if="search.display == 'OBJ_FK' && (search.fkobj.searchmodel == 'drp' || search.fkobj.searchmodel == 'mrp' || !search.fkobj.searchmodel) "
      v-model="fkPopover[search.colname]"
      placement="bottom"
      :class="searchobj[search.colname] && searchobj[search.colname].length >=1?'has-popover':''"
      title=""
      trigger="manual"
    >
      <el-autocomplete
        v-if="search.fkobj.searchmodel == 'mrp'" 
        :ref="'autocomplete'+search.colname"
        slot="reference"
        v-model="inputValue"
        :popper-class="'fkAutocomplete '+search.inputname+' '+search.colname"
        :class="'EditText fkinput '+search.fkobj.searchmodel"
        :disabled="true"
        :data-index="search.colid"
      >
        <i
          slot="append"
          class="iconfont iconDelete"
          @click="deleteQuery"
        >&#xe6bb;</i>
        <i
          slot="append"
          class="iconfont"
          @click.stop="fkPoroverClick(search.colname,$event)"
        >&#xe622;</i>
      </el-autocomplete>
      <el-autocomplete
        v-else  
        :ref="'autocomplete'+search.colname"
        slot="reference"
        v-model="inputValue"
        :popper-class="'fkAutocomplete '+search.inputname+' '+search.colname"
        :trigger-on-focus="false"
        :placeholder="ChineseDictionary.PLEASEENTER"
        :class="'EditText fkinput '+search.fkobj.searchmodel"
        :disabled="searchobj[search.colname]&&searchobj[search.colname].length >1?true:false"
        :data-index="search.colid"
        :fetch-suggestions="querySearch"
        @change.native="fkInputChange(search.colname,search.inputname)"
        @keyup.13.native="fkInputEnter(search.colname,search.inputname,$event)"
        @select="handleSelect"
      >
        <i
          slot="append"
          class="iconfont iconDelete"
          @click="deleteQuery"
        >&#xe6bb;</i>
        <i
          v-if="search.fkobj.searchmodel == 'drp'"
          slot="append"
          class="iconfont"
          @click.stop="fkPoroverClick(search.colname,$event)"
        >&#xe621;</i>
        <i
          v-if="search.fkobj.searchmodel == 'mrp'"
          slot="append"
          class="iconfont"
          @click.stop="fkPoroverClick(search.colname,$event)"
        >&#xe622;</i>
        <template slot-scope="{ item }">
          <span
            v-for="(m,i) in item"
            v-if="i!='id'&&i!='value'"
            :class="m"
            :title="m"
          >{{ m }}</span>
        </template>
      </el-autocomplete>
      <fktable
        v-if="!search.fkobj.url && fkPopover[search.colname]"
        :fkid="search.colid"
        :input-box="search.fkobj.searchmodel == 'mrp' ? true : false"
        :default-selected-ids="fixedcolumns[search.colname] || []"
        :single="(search.fkobj.searchmodel == 'drp' || !search.fkobj.searchmodel)?true:false"
        :data-index="search.colid"
        :itemdata="{pid:searchobj[search.colname],valuedata:inputValue,fkdisplay:search.fkobj.searchmodel}"
        :colname="search.colname"
        :precolnameslist="search.precolnameslist"
        :inputname="search.inputname"
        @pop="fktableShow"
      />
      <iframetable
        v-if="search.fkobj.url && fkPopover[search.colname]"
        :fkid="search.fkobj.url"
        :data-index="index"
        @pop="fktableShow"
      />
    </el-popover>
    <!-- fk 弹框 -->
    <div
      v-if="search.display == 'OBJ_FK' && (search.fkobj.searchmodel == 'mop' || search.fkobj.searchmodel == 'pop')"
      v-model="fkPopover[search.colname]"
      placement="bottom"
      :class="inputValue.length>0 && searchobj[search.colname] && searchobj[search.colname].length>0?'has-popover':''"
      trigger="manual"
      popper-class="fkMorePopover"
    >
      <el-autocomplete
        :ref="'autocomplete'+search.colname"
        slot="reference"
        v-model="inputValue"
        :popper-class="'fkAutocomplete '+search.inputname+' '+search.colname "
        :trigger-on-focus="false"
        :placeholder="ChineseDictionary.PLEASEENTER"
        class="mrp EditText isDropdown fkinput"
        :data-index="search.colid"
        :disabled="inputValue.length>0 && searchobj[search.colname]&&searchobj[search.colname].length >0?true:false"
        :fetch-suggestions="querySearch"
        @keyup.13.native="fkInputEnter(search.colname,search.inputname,$event)"
        @change.native="fkInputChange(search.colname,search.inputname)"
        @select="handleSelect"
      >
        <i
          slot="append"
          class="iconfont iconDelete"
          @click="deleteQuery"
        >&#xe6bb;</i>
        <i
          v-if="search.fkobj.searchmodel == 'pop'"
          slot="append"
          class="iconfont"
          @click.stop="fkDialogShow(search)"
        >&#xe624;</i>
        <i
          v-if="search.fkobj.searchmodel == 'mop'"
          slot="append"
          class="iconfont"
          @click="fkDialogShow(search)"
        >&#xe62f;</i>
        <el-popover
          v-if="search.fkobj.searchmodel == 'mop'"
          :ref="'popover'+search.colname"
          slot="append"
          popper-class="tips-popover"
          placement="right-start"
          width="90"
          trigger="click"
          @show="axiosTipsList"
        >
          <ul class="fkMore">
            <li @click="fkDialogShow(search)">
              {{ ChineseDictionary.MORESCREENING }}
            </li>
            <li
              v-if="search.fkobj.reftable !== 'VP_C_VIP_ACC'"
              @click.stop="chooseFileImport"
            >
              {{ ChineseDictionary.IMPORT }}
            </li>
            <li
              v-for="item in modelList"
              @click="chargeClick(item)"
            >
              <span :title="item.key">{{ item.key }}</span>
              <i
                v-if="item.value"
                class="iconfont"
                @click="axiosDeleteScreen($event, item)"
              >&#xe6b4;</i>
            </li>
          </ul>
          <i
            slot="reference"
            class="iconfont"
          >&#xe61f;</i>
        </el-popover>
        <template slot-scope="{ item }">
          <span
            v-for="(m,i) in item"
            v-if="i!='id'&&i!='value'"
            :class="m"
            :title="m"
          >{{ m }}</span>
        </template>
      </el-autocomplete>
      <div
        v-if="search.fkobj.searchmodel == 'mop'"
        style="display: none;"
      >
        <el-upload
          class="upload-panel"
          action="/p/cs/menuimport"
          :data="{table: search.fkobj.reftable}"
          :on-success="handleSuccess"
          :on-error="handleError"
          :file-list="importFlies"
        >
          <span :id="'tableImportFile'+search.colid">{{$t('tableobj.clickUpload')}}</span>
        </el-upload>
      </div>
    </div>
    <!-- 弹框多选 -->
    <fkdialog
      v-if="mopdialog.dialog && search.fkobj.reftable !== 'VP_C_VIP_ACC'"
      :tablename="mopdialog.tablename"
      :tableid="mopdialog.tableid"
      :right-list="mopdialog.lists"
      :is-object="true"
      :append-to-body="true"
      :fkshow.sync="mopdialog.dialog"
      @easyData="getMopdialog"
    />
    <advanced
      v-if="mopdialog.dialog && search.fkobj.reftable === 'VP_C_VIP_ACC'"
      :search-conditions="mopdialog.lists"
      @advancedData="getMopdialog"
      @dialogClose="dialogClose"
    />
  </div>
</template>

<script>
  import { post } from '../../__utils__/request';
  import fkdialog from '../tablelist/fkdialog.vue';
  import fktable from '../tablelist/fktable.vue';
  // import i18n from '../../assets/js/i18n'

  export default {
    // 列表查询条件的各种类型的输入框,
    name: 'tableobj',
    data() {
      return {
        // 弹框多选
        mopdialog: {
          dialog: false,
          lists: {},
          tablename: '',
          tableid: '',
          item: {}
        },
        fkPopover: {},
        inputValue: '', // input中显示的内容
        searchobj: {},
        modelList: [], // 多选框保存的模板列表
        importFlies: [],
        selectedOption: [], // 保留选中select options(value值)
        allSuggest: [], // 下拉选项
        formObj: {// 查询条件
          table: '',
          column_include_uicontroller: true,
          fixedcolumns: {},
          multiple: []
        },
      };
    },
    props: {
      fixedcolumns: {
        type: Object
      },
      search: {
        type: Object
      },
      chineseDictionary: {
        type: Object
      },
      defaultVal: {
        type: Boolean
      },
      searchComponent: {
        type: Boolean,
        default: false
      }
    },
    components: {
      fkdialog,
      fktable,
      advanced: () => import('../views/custompage/crm/advancedSearch.vue')
    },

    beforeCreate() {
      this.$t = $i18n.t.bind($i18n)
    },
    
    created() {
      const _self = this;
      $('body').click(() => {
        _self.fkPopover[_self.search.colname] = false;
      });
      // 判断下拉框的默认值
      if (_self.search.display === 'OBJ_SELECT' && !_self.search.conds) {
        //      _self.inputValue = _self.search.default || _self.ChineseDictionary.ALL;
        const combobox = _self.search.combobox;
        const defaultArray = (_self.search.default || '').split(',');
        _self.inputValue = '';
        for (const box of combobox) {
          if (defaultArray.includes(box.limitval)) {
            _self.searchobj[_self.search.colname] = [`=${box.limitval}`];
            _self.selectedOption.push(box.limitval);
            _self.inputValue = _self.inputValue === '' ? box.limitdesc : `${_self.inputValue},${box.limitdesc}`;
          }
        }
        if (_self.selectedOption.length === 0) {
          _self.searchobj[_self.search.colname] = undefined;
          _self.inputValue = _self.ChineseDictionary.ALL;
        }
      }
      if (_self.search.display === 'OBJ_FK') {
        if (_self.search.default) {
          _self.inputValue = _self.search.default;
          _self.searchobj[_self.search.colname] = [_self.search.refobjid];
        }
      }
    },
    mounted() {
      if (this.searchComponent) {
        this.$nextTick(() => {
          this.inputValue = this.search.default;
        });
      }
    },
    watch: {
      defaultVal(val) {
        if (val) {
          const _self = this;
          _self.inputValue = _self.search.default;
        }
      }
    },
    computed: {

    },
    methods: {
      fkInputChange(colname, inputname) { // 外健手动输入支持下拉筛选
        const _self = this;
        // 如果现在的值等于上次选中的值,则不做任何操作
        if (_self.inputValue === _self.handleSelectValue) return;
        _self.allSuggest = [];
        _self.handleSelectValue = undefined;
        _self.inputValue = _self.chineseEng(_self.inputValue);
        _self.searchobj[inputname] = _self.inputValue;
        _self.searchobj[colname] = undefined;
        _self.$emit('changeQuery', _self.searchobj, _self.inputValue);
      },
      //    录值回车
      fkInputEnter(colname, inputname, event) {
        const _self = this;
        if (_self.inputValue == _self.handleSelectValue && _self.searchobj[colname]) {
          return;
        }
        if (_self.allSuggest.length > 0 && _self.inputValue != _self.handleSelectValue && _self.inputValue) {
          if (_self.allSuggest.length === 1) {
            _self.searchobj[colname] = [_self.allSuggest[0].id];
            _self.searchobj[inputname] = undefined;
            _self.inputValue = _self.chineseEng(_self.allSuggest[0].value);
            _self.handleSelectValue = _self.inputValue;
          } else {
            delete _self.searchobj[colname];
            _self.searchobj[inputname] = _self.chineseEng(_self.inputValue);
            _self.inputValue = _self.chineseEng(_self.inputValue);
          }
        } else if (_self.inputValue == _self.handleSelectValue) {
          delete _self.searchobj[inputname];
        } else {
          _self.searchobj[colname] = undefined;
          _self.searchobj[inputname] = _self.chineseEng(_self.inputValue);
          _self.inputValue = _self.chineseEng(_self.inputValue);
        }
        _self.$emit('changeQuery', _self.searchobj, _self.inputValue);
        _self.$emit('enterSearch');

        //      $('.fkAutocomplete.' + colname).css('display', 'none')
      },

      querySearch(queryString, cb) { // 外健下拉筛选
        const _self = this;
        // 清空下拉
        _self.allSuggest = [];
        _self.handleSelectValue = undefined;

        let ak = '';
        const colid = _self.search.colid;
        const colname = _self.search.colname;
        if (_self.search.isuppercase) {
          if (queryString) {
            ak = queryString.toString().toLocaleUpperCase();
            _self.inputValue = ak;
          }
        } else {
          ak = queryString;
        }
        ak = _self.chineseEng(ak);

        if (ak) {
          const obj = {
            ak,
            colid,
            fixedcolumns: {},
          };
          if (_self.search.precolnameslist && _self.search.precolnameslist.length > 0) {
            obj.fixedcolumns.precolnameslist = JSON.stringify(_self.search.precolnameslist);
          }
          obj.fixedcolumns = JSON.stringify(obj.fixedcolumns);
          _self.$ajax.dataAjax('/p/cs/fuzzyquerybyak', obj, (res) => {
            if (res.code == 0) {
              _self.allSuggest = res.data;
              cb(res.data);
            }
          });
        } else {
          cb([]);
        }
      },
      chineseEng(str) { // 中英文转换
        let tmp = '';
        if (!str) {
          return tmp;
        }
        if (str.length == 0) {
          return tmp;
        }
        for (var i = 0; i < str.length; i++) {
          if (str.charCodeAt(i) == 65292) { // 如果位于全角！到全角～区间内  str.charCodeAt(i) >= 65281 && str.charCodeAt(i) <= 65374
            tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
          } else if (str.charCodeAt(i) == 12288) { // 全角空格的值，它没有遵从与ASCII的相对偏移，必须单独处理
            tmp += ' ';
          } else { // 不处理全角空格，全角！到全角～区间外的字符
            tmp += str[i];
          }
        }
        const pattern = new RegExp("'|@|`|~|#|&");
        let rs = '';
        for (var i = 0; i < tmp.length; i++) {
          rs += tmp.substr(i, 1).replace(pattern, '');
        }
        return rs;
      },
      fkPoroverClick(value, event) {
        const _self = this;
        $('.main-content').trigger('click');
        if (_self.fkPopover[value]) _self.fkPopover[value] = false;
        else _self.fkPopover[value] = true;
      },
      // 删除小图标点击
      deleteQuery() {
        const _self = this;

        const colname = _self.search.colname;
        const inputname = _self.search.inputname;
        if (_self.mopdialog.item.fkobj)_self.mopdialog.item.fkobj.rightList = {};
        if (_self.search.display === 'OBJ_SELECT') {
          _self.inputValue = _self.ChineseDictionary.ALL;
          _self.searchobj[colname] = undefined;
          _self.selectedOption = [];
        } else {
          _self.inputValue = '';
          _self.searchobj[colname] = undefined;
          _self.searchobj[inputname] = undefined;
        }
        _self.$emit('changeQuery', _self.searchobj, _self.inputValue);
      },
      fktableShow(obj) { // 下拉多选确认
        const _self = this;

        const cloinputName = obj.index;

        if (!jQuery.isArray(obj.item)) { // 单选
          delete _self.searchobj[obj.inputname];
          if (obj.idArr.length > 4) {
            _self.inputValue = this.$t('searchComponent.selectedItems',{num: obj.idArr.length});
          } else {
            _self.inputValue = obj.desc.join(',');
            _self.handleSelectValue = obj.desc.join(',');
          }

          if (obj.idArr.length == 0) {
            _self.searchobj[cloinputName] = undefined;
          } else {
            _self.searchobj[cloinputName] = obj.idArr;
          }

          _self.fkPopover[cloinputName] = false;
        } else { // 多选
          if (obj.idArr.length > 0) {
            _self.$set(_self.searchobj, cloinputName, obj.idArr);
            if (_self.formObj.multiple.indexOf(cloinputName) >= 0) {

            } else {
              _self.formObj.multiple.push(cloinputName);
            }
          } else {
            _self.searchobj[cloinputName] = undefined;
            const index = _self.formObj.multiple.indexOf(cloinputName);

            if (index >= 0) {
              _self.formObj.multiple.splice(index, 1);
            }
          }
          _self.inputValue = obj.desc.join(',');

          _self.searchobj[obj.inputname] = undefined;
        }

        //      当前项获取焦点
        $(_self.$el).find('input').focus();
        _self.$emit('changeQuery', _self.searchobj, _self.inputValue);
      },
      fkDialogShow(option) {
        const _self = this;
        // console.log(option)
        $('.admin-container').trigger('click');
        if (!option) option = _self.search;
        if (option.fkobj.searchmodel == 'pop') {
          _self.SingleSelect.show = true;
          this.selectOperation.pageSize = 10;
          this.selectOperation.curpage = 1;
          this.selectOperation.startindex = 0;

          $.each(_self.fkPopover, (index, item) => {
            _self.fkPopover[index] = false;
          });

          _self.SelectionData.item = option;
          _self.getSelectConfig();
        } else {
          _self.mopdialog.dialog = true;
          _self.mopdialog.tablename = option.fkobj.reftable;
          _self.mopdialog.tableid = option.fkobj.reftableid;
          _self.mopdialog.lists = option.fkobj.rightList || {};
          _self.mopdialog.item = option;
        }
      },
      // 获取保存的模板
      axiosTipsList() {
        const searchParam = new URLSearchParams();
        searchParam.append('tableid', this.search.fkobj.reftableid);
        post('/p/cs/getMultiQuery', searchParam).then((res) => {
          if (res.data.code === 0) {
            this.modelList = res.data.data;
          }
        });
      },

      chargeClick(item) {
        const self = this;
        self.mopdialog.dialog = true;
        self.mopdialog.tablename = self.search.fkobj.reftable;
        self.mopdialog.tableid = self.search.fkobj.reftableid;
        self.mopdialog.lists = JSON.parse(JSON.parse(item.value).text);
        $('.admin-container').trigger('click');
      },

      axiosDeleteScreen(event, item) {
        event.stopPropagation();
        const searchParam = new URLSearchParams();
        searchParam.append('tableid', this.search.fkobj.reftableid);
        searchParam.append('modelname', item.key);
        post('/p/cs/delMultiQuery', searchParam).then((res) => {
          if (res.data.code === 0) {
            this.axiosTipsList();
          }
        });
      },

      // 选择文件
      chooseFileImport() {
        $(`#tableImportFile${this.search.colid}`).trigger('click');
      },
      // 导入成功
      handleSuccess(response) {
        const _self = this;
        //        console.log(response);
        if (response.code === 0) {
          _self.$message({ type: 'success', message: response.message });
          _self.mopdialog.tablename = _self.search.fkobj.reftable;
          _self.mopdialog.tableid = _self.search.fkobj.reftableid;
          _self.mopdialog.dialog = true;
          _self.mopdialog.lists = response.data.text;
          $('.admin-container').trigger('click');
        } else {
          _self.$message.error(response.message);
        }
      },
      // 导入失败
      handleError(err) {
        this.$message.error(JSON.parse(err.message).message);
      },

      getSelectConfig() {
        // 更新数据: SelectionData.config 弹出框输入配置
        const item = this.SelectionData.item;
        const self = this;
        self.SelectionData.config = []; // 请求前清空旧数据
        axios({
          url: '/p/cs/getTableQuery',
          type: 'post',
          params: {
            tableid: item.fkobj.reftableid,
            getcmd: 'n',
            table: item.fkobj.reftable
          }
        })
          .then((res) => {
            for (let i = 0; i < res.data.datas.dataarry.length; i++) {
              const element = res.data.datas.dataarry[i];
              element.value = '';
              if (element.display === 'OBJ_CHECK') {
                element.value = element.limitval === 'Y';
              }
              if (element.default) {
                element.value = element.default;
              }
              self.SelectionData.config.push(element);
            }
          // self.SelectionData.config = res.data.datas.dataarry
          });
      },
      /* 关闭高级搜索 */
      dialogClose() {
        this.mopdialog.dialog = false;
      },
      getMopdialog(obj) { // 弹框多选确认
        const item = obj ? JSON.parse(obj) : false;
        const _self = this;

        if (_self.formObj.multiple.indexOf(this.mopdialog.item.colname) >= 0) {

        } else {
          _self.formObj.multiple.push(this.mopdialog.item.colname);
        }
        if (_self.search.fkobj.reftable === 'VP_C_VIP_ACC') {
          if (item) {
            _self.inputValue = this.$t('messages.selectedData',{num: item.count});
            _self.searchobj[_self.search.colname] = item.condition;
            _self.searchobj[_self.search.inputname] = undefined;
          } else {
            _self.inputValue = '';
            _self.searchobj[_self.search.colname] = undefined;
            _self.searchobj[_self.search.inputname] = undefined;
          }
        } else if (item.total > 0) {
          _self.inputValue = this.$t('messages.selectedData',{num: item.total});
          _self.searchobj[_self.search.colname] = item.idArray;
          _self.searchobj[_self.search.inputname] = undefined;
        } else {
          _self.inputValue = '';
          _self.searchobj[_self.search.colname] = undefined;
          _self.searchobj[_self.search.inputname] = undefined;
        }
        _self.$emit('changeQuery', _self.searchobj, _self.inputValue, obj);
        _self.mopdialog.item.fkobj.rightList = obj;
      },
      //    下拉选择
      handleSelect(value) {
        const _self = this;
        const colname = _self.search.colname;
        const inputname = _self.search.inputname;

        _self.searchobj[colname] = [value.id];
        _self.searchobj[inputname] = undefined;
        _self.inputValue = value.value;
        _self.handleSelectValue = value.value;
        _self.$emit('changeQuery', _self.searchobj, _self.inputValue);
      },

      visiblechange(value) { // 查询条件的select
        const _self = this;
        if (!value) {
          if (!_self.selectedOption) {
            _self.inputValue = _self.ChineseDictionary.ALL;
          }
        } else {
          const width = $(_self.$refs[`select${_self.search.colname}`].$el).width();
          $('.searchDropdown').width(width);
        }
      },
      // 查询条件的select
      handleCommand(command, event) {
        // label和input会重复触发这个请求,过滤掉label
        const _self = this;
        const colinputName = _self.search.colname;
        let desc;
        if (!command) {
          desc = _self.ChineseDictionary.ALL;
          if (_self.inputValue.indexOf(_self.ChineseDictionary.ALL) >= 0) {
          } else {
            _self.searchobj[colinputName] = undefined;
            _self.selectedOption = [];
          }
          _self.inputValue = desc;
          _self.$emit('changeQuery', _self.searchobj, _self.inputValue);
          $(`.tableobj .${colinputName}input`).find('input').trigger('click');
          return;
        }

        desc = command.limitdesc;
        const limitval = command.limitval;

        if (_self.selectedOption.indexOf(limitval) > -1) {
          // 取消
          const index = _self.selectedOption.indexOf(limitval);
          _self.selectedOption.splice(index, 1);
          _self.searchobj[colinputName].splice(index, 1);
          // input中显示值处理
          const arr = _self.inputValue.split(',');
          arr.splice(index, 1);
          _self.inputValue = arr.join(',');

          // 判断是否为空
          if (_self.searchobj[colinputName].length === 0) {
            _self.searchobj[colinputName] = undefined;
            _self.inputValue = _self.ChineseDictionary.ALL;
          }
        } else {
          // 选中
          if (_self.searchobj[colinputName]) {
            _self.searchobj[colinputName].push(`=${limitval}`);
          } else {
            _self.searchobj[colinputName] = [`=${limitval}`];
          }
          _self.selectedOption.push(limitval);
          if (_self.selectedOption.length === 1) {
            _self.inputValue = desc;
          } else {
            _self.inputValue += `,${desc}`;
          }
        }
        _self.$emit('changeQuery', _self.searchobj, _self.inputValue);
      },
    }
  };
</script>

<style lang="less">
  .tableList .searchList .demo-form-inline > div.el-form-item .tableobj{
    position: relative;
    .clickbox {
        width: 80%;
        height: 100%;
        background: red;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        z-index: 1;
      }
      .clickbox:hover+.has-popover .el-input {
         input{
            background: rgba(0, 0, 0, 0.1);
          }
          .el-input-group__append {
            .iconDelete {
              display: inline-block;
            }
          }
        }
    .el-input-group__append {
      width: auto;
      padding: 0;
      background: white;
      border-radius: 0;
      .iconDelete {
        display: none;
        background: #918f8f;
        color: white;
        border-radius: 2px;
        margin-right: 0;
        vertical-align: top;
        height: 22px;
      }
      i {
        margin-right: 4px;
        color: #0F8EE9;
      }
      i:last-child {
        margin-right: 0;
      }
    }
    .has-popover {
      .el-input.is-disabled:hover{
        input{
          background: rgba(0, 0, 0, 0.1);
        }
        .el-input-group__append {
          .iconDelete {
            display: inline-block;
          }
        }
      }
      .el-input.is-disabled .el-input__inner {
        background-color: inherit;
        color: inherit;
        cursor: default;
      }
      &.EditSelect {
        width: 100%;
        .el-input:hover{
          input{
            background: rgba(0, 0, 0, 0.1);
          }
          .el-input-group__append {
            .iconDelete {
              display: inline-block;
            }
          }
        }
        input {
          border-radius: 2px;
          height: 24px;
          box-sizing: border-box;
          padding: 0 4px;
          font-size: 12px;
        }
        i {
          font-size: 18px;
          margin-right: 2px;
          background-color: #ffffff;
        }
        .el-input-group__append {
          position: absolute;
          top: 1px;
          right: 1px;
          background: white;
          border: 0 none;
          height: 22px;
          line-height: 22px;
          border-bottom-right-radius: 2px;
          border-top-right-radius: 2px;

          &:hover {
            cursor: pointer;
          }
          .iconDelete {
            background-color: #918f8f;
            font-size: 12px;
            margin-right: 0;
            right: 12px;
          }
        }
      }

    }


  }

</style>
