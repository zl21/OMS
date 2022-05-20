<template>
  <div class="ff-current-user-access-store">
    <el-popover
      ref="targetPopovers"
      v-model="popoverShow"
      popper-class="copy-popover--current"
      placement="bottom"
      width="220"
      trigger="manual"
    >
      <div
        v-if="!ischeckbox"
        v-loading="loading"
        class="popover-content"
      >
        <div class="table">
          <table>
            <thead>
              <tr>
                <th>{{$t('table.index')}}</th>
                <th>{{$t('input.storeCode')}}</th>
                <th>{{$t('input.storeName')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in lists"
                :key="item.ECODE"
                @click="choose(i)"
              >
                <td>
                  <input
                    v-model="item.checked"
                    :type="ischeckbox? 'checkbox' : 'radio'"
                  >{{ i+1 }}
                </td>
                <td>{{ item.ECODE }}</td>
                <td>{{ item.ENAME }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="page">
          <el-pagination
            small
            layout="prev, pager, next"
            :current-page.sync="currentPage"
            :total="total"
            @current-change="currentchange"
          />
        </div>
      </div>
      <fk-dialog
        v-if="ischeckbox && popoverShow"
        tablename="CP_C_STORE"
        tableid="23296"
        :can-chinese="true"
        :right-list="rightList"
        :fkshow.sync="popoverShow"
        :is-object="true"
        :title="$t('input.store')"
        @easyData="easyData"
      />
      <div
        slot="reference"
        class="ff-current-user-box"
        @mouseout.stop="mouseOut"
        @mouseover.stop="mouseOver"
      >
        <!--v-popover:targetPopovers-->
        <el-autocomplete
          ref="storeAutocomplete"
          v-model="queryString"
          popper-class="current-user-autocomplete"
          :trigger-on-focus="false"
          :fetch-suggestions="querySearch"
          :select-when-unmatched="true"
          @select="handleSelect"
          @focus="handleFocus"
        >
          <template slot-scope="{ item }">
            <span
              :class="item.ECODE"
              :title="item.ECODE"
            >{{ item.ECODE }}</span>
            <span
              :class="item.ENAME"
              :title="item.ENAME"
            >{{ item.ENAME }}</span>
          </template>
        </el-autocomplete>
        <span
          v-show="deleteIcon"
          class="ff-select-delete iconfont"
          @click="deleteStr"
        >&#xe6bb;</span>
        <i
          ref="focusIcon"
          class="iconfont iconres"
          @click.stop="focusAutocomplete"
        >{{ ischeckbox? '&#xe62f;' : '&#xe621;' }}</i>
      </div>
    </el-popover>
  </div>
</template>
<style lang="less" type="text/less">
  .copy-popover--current {
    z-index: 9999 !important;
    .popover-content {
      padding: 5px;
      /*height: 285px;*/
      overflow: hidden;
    }
    .table {
      width: 100%;
      table {
        width: 100%;
        thead {
          background-color: #f5f6fa;
          height: 26px;
          th {
            height: 26px;
            line-height: 26px;
            white-space: nowrap;
            padding: 0 5px;
            text-align: left;
            min-width: 50px;
            &:first-child {
              min-width: 30px;
            }
            input {
              vertical-align: middle;
            }
          }
        }
        tbody {
          tr {
            border-bottom: 1px solid #d8d8d8;
            td {
              height: 23px;
              line-height: 23px;
              white-space: nowrap;
              padding: 0 5px;
              text-align: left;
              min-width: 50px;
              &:first-child {
                min-width: 30px;
              }
              input {
                vertical-align: middle;
              }
            }
          }
        }
      }
    }
    .popover-content .page {
      position: static;
      display: flex;
      align-items: center;
      padding-top: 4px;
      background: #fff;
      .el-pagination {
        /*line-height: 14px;*/
        display: flex;
        align-items: center;
      }
      button {
        height: 14px;
        width: 14px;
        line-height: 14px;
        padding: 0;
        min-width: 14px;
      }
      .btn-next {
        margin-left: 0;
      }
      ul li {
        height: 14px;
        padding: 0 4px;
        line-height: 14px;
        width: auto;
        min-width: auto;
        border: none;
        &:last-child {
          height: 14px;
          padding: 0;
          line-height: 14px;
        }
      }
    }
  }
</style>
<style lang="less" type="text/less">
  .ff-current-user-box {
    position: relative;
    display: inline-block;
    input[type=text] {
      border: solid 1px #d8d8d8;
      border-radius: 0 2px 2px 0;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      color: #575757;
      float: left;
      font-size: 12px;
      height: 24px;
      padding: 0 20px 0 0;
      text-indent: 5px;
      width: 220px;
    }
    .iconfont {
      color: #0f8ee9;
      background-color: #fff;
      cursor: pointer;
      display: inline-block;
      font-size: 14px;
      height: 22px;
      border: 1px solid #D8D8D8;
      border-left: none;
      position: absolute;
      padding-right: 2px;
      padding-left: 1px;
      top: 0;
      right: 0;
    }
    .ff-select-delete {
      position: absolute;
      width: 14px;
      text-align: center;
      height: 24px;
      background-color: #918f8f;
      color: white;
      padding: 0;
      border-radius: 2px;
      box-sizing: border-box;
      top: 0;
      right: 21px;
      cursor: pointer;
      font-size: 14px;
    }
  }
</style>
<script>
  /* import Vue from 'vue' */
  import FkDialog from '../tablelist/fkdialog.vue';
  import { post } from '../../__utils__/request';
  import ChineseDictionary from '../../assets/js/ChineseDictionary';
  import i18n from '../../assets/js/i18n'

  export default {
    name: 'currentUserAccessStore',
    props: {
      ischeckbox: {
        type: Boolean,
        default: false
      },
      value: {}
    },
    data() {
      return {
        ChineseDictionary: '',
        query: [], // 传给父组件的
        rightList: {}, // 弹出多选
        queryString: '', // 搜索名字
        currentPage: 1, // 当前页
        total: 0, // 总数
        lists: [], // 表格数据
        loading: false, // 加载
        popoverShow: false, // 弹框显示消失
        deleteIcon: false,
        firstObj: ''
      };
    },
    components: {
      FkDialog
    },
    methods: {
      /* 多选 */
      easyData(val) {
        const data = JSON.parse(val);
        this.query = data.idArray;
        this.$set(this, 'queryString', this.$t('searchComponent.selectedItems',{num:data.total}));
        this.$emit('input', [...this.query]);
      },
      mouseOver() {
        if (!this.ischeckbox) return;// 单选没有
        if (this.queryString === '') {
          this.$refs.storeAutocomplete.$refs.input.$refs.input.removeAttribute('readonly');
          this.$refs.storeAutocomplete.$refs.input.$refs.input.style.background = '#fff';
        } else {
          this.$refs.storeAutocomplete.$refs.input.$refs.input.style.background = 'rgba(0, 0, 0, .1)';
          this.$refs.storeAutocomplete.$refs.input.$refs.input.setAttribute('readonly', true);
          this.deleteIcon = true;
        }
      },
      mouseOut() {
        if (!this.ischeckbox) return;// 单选没有
        if (this.queryString === '') {
          this.$refs.storeAutocomplete.$refs.input.$refs.input.removeAttribute('readonly');
        }
        this.$refs.storeAutocomplete.$refs.input.$refs.input.style.background = '#fff';
        this.deleteIcon = false;
      },
      handleFocus() {
        this.popoverShow = false;
      },
      /* 删除初始化 */
      deleteStr() {
        this.queryString = '';
        this.query = [];
        this.rightList = {};
        this.$emit('input', []);
        this.$refs.storeAutocomplete.$refs.input.$refs.input.removeAttribute('readonly');
        this.$refs.storeAutocomplete.$refs.input.$refs.input.style.background = '#fff';
        this.deleteIcon = false;
      },
      // 获取默认店仓
      axiosDefaultStore() {
        const param = {
          objid: -1,
          fixcolumn: {
            STORE_NAME: '',
          }
        };
        const searchParam = new URLSearchParams();
        searchParam.append('param', JSON.stringify(param));
        return post('/p/cs/cstorefuzzyquery', searchParam).then((res) => {
          if (res.data.code == 0) {
            const result = res.data.data ? res.data.data : [];
            this.total = result.length;
            this.lists = result.splice((this.currentPage - 1) * 10, 10).map((obj) => {
              obj.checked = false;
              return obj;
            });
          }
        });
      },
      // 获取店仓列表,模糊搜索
      querySearch(queryString, cb) {
        const _self = this;
        const param = {
          objid: -1,
          fixcolumn: {
            STORE_NAME: $.trim(queryString)
          }
        };
        const searchParam = new URLSearchParams();
        searchParam.append('param', JSON.stringify(param));
        post('/p/cs/cstorefuzzyquery', searchParam).then((res) => {
          if (res.data.code == 0) {
            const result = res.data.data ? res.data.data : [];
            this.firstObj = result.length === 0 ? '' : res.data.data[0];
            cb(result);
          }
        });
      },
      // 选择下拉列表中的项
      handleSelect(item) {
        this.query = [];
        if (item.hasOwnProperty('value')) {
          this.queryString = this.firstObj === '' ? '' : this.firstObj.ENAME;
          this.firstObj === '' ? '' : this.query.push(Object.assign({}, this.firstObj));
        } else {
          this.queryString = item.ENAME;
          this.query.push(Object.assign({}, item));
        }
        this.$emit('input', this.query);
        this.$emit('handleSelect');
      },
      // 选择店仓
      choose(i) {
        this.lists[i].checked = !this.lists[i].checked;
        this.query = [];
        const arr = [];
        if (this.ischeckbox) {
          this.lists.map((obj) => {
            if (obj.checked) {
              this.query.push(Object.assign({}, obj));
              arr.push(obj.ENAME);
            }
          });
          this.queryString = arr.join(',');
        } else {
          this.query.push(Object.assign({}, this.lists[i]));
          this.queryString = this.lists[i].ENAME;
          this.popoverShow = false;
        }
        this.$emit('input', [...this.query]);
        this.$emit('handleSelect');
      },
      // 当前页变化
      currentchange(val) {
        this.currentPage = val;
        this.axiosDefaultStore();
      },
      // 点击ICON显示popover
      focusAutocomplete() {
        if (this.popoverShow) return;
        this.popoverShow = true;
        this.loading = true;
        this.axiosDefaultStore().then(() => {
          this.loading = false;
        });
      },
      // 关闭弹框
      close() {
        this.popoverShow = false;
      },
      // 阻止冒泡
      stop(e) {
        e.stopPropagation();
      }
    },
    watch: {
      popoverShow(val) {
        if (val) {
          this.$refs.targetPopovers.$el.addEventListener('click', this.stop);
          document.addEventListener('click', this.close);
        } else {
          this.currentPage = 1;
          this.$refs.targetPopovers.$el.removeEventListener('click', this.close);
          document.removeEventListener('click', this.close);
        }
      },
      value() {
        if (this.ischeckbox) return;
        this.$emit('initialize');
      },
      queryString(val) {
        if (this.query.length === 0 && !this.ischeckbox) return;
        if (!this.query[0]) return;
        if (this.query[0].ENAME && val !== this.query[0].ENAME) {
          this.query = [];
          this.$emit('input', []);// 初始化
        }
      },
      /* '$refs["storeAutocomplete"].suggestionVisible' (val) {
        if(!val) this.$refs["storeAutocomplete"].highlightedIndex = 0;
      } */
    },

    beforeCreate() {
      this.$t = i18n.t.bind(i18n)
    },

    created() {
      this.ChineseDictionary = ChineseDictionary;
      this.$once('initialize', () => {
        if (this.value.length === 0) return this.queryString = '';
        this.queryString = this.value[0].ENAME;
      });
    },
  };
</script>
