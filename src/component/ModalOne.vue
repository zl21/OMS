<template>
  <div class="clonePopUp">
    <div class="pop-title">
      <div class="pop-input">
        <ul>
          <li>
            <span>源表表名：</span>
            {{ o_table_name }}
          </li>
          <li class="resTop">
            <span><sub> *</sub>版本号：</span>
            <span class="version">
              <DropDownSelectFilter
                :single="true"
                :data="version.data"
                :total-row-count="version.totalRowCount"
                :data-empty-message="version.dataEmptyMessage"
                :auto-data="version.AutoData"
                @on-popper-show="getVersion"
                @on-fkrp-selected="getVersionID"
                @on-input-value-change="fuzzyquerybyak"
                @on-clear="clear"
              />
            </span>
          </li>
          <li>
            <span><sub> *</sub>目标表名：</span>
            <input
              v-model="t_table_name"
              type="text"
            >
          </li>
          <li>
            <span><sub> *</sub>目标描述：</span>
            <input
              v-model="s_table_name"
              type="text"
            >
          </li>
        </ul>
      </div>
      <div class="pop-btn">
        <button
          class="sav-btn"
          @click="save"
        >
          <span>确定</span>
        </button>
        <button
          class="cancel-btn"
          @click="cancel"
        >
          <span>取消</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>

  const {
    network,
    urlSearchParams
  } = R3.default;
  export default {
    name: 'ClonePopUp',
    props: {
      objList: {
        type: Array,
        default: () => []
      },
      actionId: {// 获取自定按钮ID
        type: [Number, String],
        default: () => ''
      },
    },
    data() {
      return {
        o_table_name: '', // 源表表名
        t_table_name: '', // 目标表名
        s_table_name: '', // 目标描述
        versionNumber: '', // 版本号
        errorDialog: false, // errorDialog
        errorDialogClass: 'error', // 弹框类型
        errorDialogTitle: '错误', // 弹框标题
        errorData: [{ message: '' }], // 弹框内容
        errorDialogBack: false, // 是否有返回按钮
        chineseName: {}, // 名字集合
        version: {
          data: {},
          totalRowCount: 39,
          pageSize: 10,
          AutoData: [],
          dataEmptyMessage: '数据加载中...', // 无数据的提示
          columns: ['name', 'value'] // 展现的组
        }
      };
    },
    components: {},
    methods: {
      clear() {
        this.version.ID = '';
      },
      getVersionID(value) {
        this.version.ID = value[0].ID;
      },
      getVersion() {
        const searchdata = {
          isdroplistsearch: true,
          table: 'AD_VERSION',
          startindex: 0,
          range: 10,
          fixedcolumns: {
            ISACTIVE: ['=Y'],
            STATUS: ['=1']
          }
        };
        network
          .post('/p/cs/QueryList', urlSearchParams({ searchdata }))
          .then((res) => {
            if (res.data.code === 0) {
              this.version.data = res.data.data;
              this.version.totalRowCount = res.data.data.totalRowCount;
              this.version.pageSize = res.data.data.totalRowCount.defaultrange;
            }
          });
      },
      fuzzyquerybyak(value) {
        const searchdata = {
          ak: value,
          colid: '99467',
          fixedcolumns: {}
        };
        network
          .post('/p/cs/fuzzyquerybyak', urlSearchParams(searchdata))
          .then((res) => {
            if (res.data.code === 0) {
              this.version.AutoData = res.data.data;
            }
          });
      },
      save() {
        if (!this.t_table_name.trim()) {
          const data = {
            mask: true,
            title: '警告',
            content: '请输入目标表名'
          };
          this.$Modal.fcWarning(data);
          return;
        }
        if (!this.s_table_name.trim()) {
          const data = {
            mask: true,
            title: '警告',
            content: '请输入目标描述'
          };
          this.$Modal.fcWarning(data);
          return;
        }
        if (!this.version.ID) {
          const data = {
            mask: true,
            title: '警告',
            content: '请输入版本号'
          };
          this.$Modal.fcWarning(data);
          return;
        }
        this.$loading.show();
        const searchdata = {
          srctable: this.o_table_name, // 源表表名
          destable: this.t_table_name.trim(), // 目标表名
          destdesc: this.s_table_name.trim(), // 目标描述
          ad_version_id: this.version.ID
        };
        network.post('/api', searchdata)
          .then((res) => {
            const { tableName } = this.$route.params;
            if (res.data.code !== 0) {
              this.$loading.hide(tableName);
              return;
            }
            const data = {
              mask: true,
              title: '成功',
              content: '克隆成功'
            };
            this.$loading.hide(tableName);
            this.$Modal.fcSuccess(data);
            this.$emit('closeActionDialog', true); // 关闭弹框
          });
      }, // 确定
      cancel() {
        this.$emit('closeActionDialog', false); // 关闭弹框
      }, // 取消
    },
   
    mounted() {
    },
    destroyed() {
      const dom = document.getElementById('dropDownSelectPopper');
      if (dom) {
        dom.parentNode.removeChild(dom);
      }
    },
  };
</script>
<style lang="less" scoped type="text/less">
.clonePopUp {
  font-size: 12px;
  height: 174px;
  sub{
    color: red;
    font-size: 16px;
    margin-right: 5px;

  }
  .pop-title {
    // width: 400px;
    height: 152px;
    box-sizing: border-box;
  }
  .pop-input {
    padding-top: 10px;
    ul {
      list-style: none;
    }
    li {
      margin-bottom: 10px;
      .version {
        width: 228px;
        height: 22px;
        border-radius: 2px;
      }
    }
    .resTop{
      margin-bottom: 15px;
    }
    span {
      display: inline-block;
      width: 100px;
      text-align: right;
    }
    input {
      border: 1px solid #d8d8d8;
      width: 228px;
      height: 24px;
      padding: 0 7px;
      border-radius: 2px;
      font-size: 12px;
      color: #575757;
      transition: border-color 0.2s ease;
      margin-left: -1px;
    }
    input:focus {
      border-color: #0f8ee9;
    }
  }
  .pop-btn {
    text-align: right;
    padding: 6px 40px 0 0;
    .sav-btn,
    .cancel-btn {
      padding: 0 18px;
      width: 66px;
      height: 24px;
      box-sizing: border-box;
      background-color: #fff;
      border: 1px solid;
      color: #fd6442;
      font-size: 12px;
      border-radius: 2px;
      span {
        color: #fd6442;
      }
    }
    .sav-btn:hover,
    .cancel-btn:hover {
      background-color: rgba(253, 100, 66, 0.3);
      color: rgba(253, 100, 66, 0.6);
    }
  }
}
</style>
