import Buttonmap from 'framework/assets/js/buttonmap'; // 实际上没用到
import ChineseDictionary from 'framework/assets/js/ChineseDictionary';
import FkDialog from 'framework/components/tablelist/fkdialog';
import GroupTree from 'framework/components/tree/groupTree';
import businessBtn from 'professionalComponents/businessButton';
import buttonPermissionsMixin from '@/assets/js/mixins/buttonPermissions';
/* import Vue from 'vue' */

export default {
  mixins: [buttonPermissionsMixin],
  props: {},
  components: {
    FkDialog,
    GroupTree,
    businessBtn
  },
  data() {
    return {
      vmI18n:$i18n,
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'left', // 按钮位置 (right , center , left)
        buttons: [
          {
            text: $i18n.t('btn.delete'), // 删除 按钮文本
            webname: '',
            btnclick: () => {
              this.deleteAuthority();
            } // 按钮点击事件
          },
          {
            text: $i18n.t('btn.refresh'), // 按钮文本
            webname: '',
            btnclick: () => {
              this.refresh();
            } // 按钮点击事件
          }
        ]
      },
      Buttonmap: '',
      ChineseDictionary: '',
      actionFlag: { deleteFlag: false, saveFlag: false, freshFlag: false }, // 动作权限
      storage: { id: '', name: '' },
      userList: [], // 显示的用户列表
      userCache: [], // 缓存的用户列表——弃用
      userAuthorityList: [], // 用户权限列表
      userId: this.$route.query.cid || 0, // 当前用户id/选中的用户id
      userQuery: '', // 用户搜索条件
      userSearchFlag: false, // 搜索操作标识
      treeRefresh: false,
      userAuthorityQuery: '', // 用户权限搜索权限
      authorityFlag: false, // checkbox 全选
      searchQuery: {
        userList: '' // 分页搜索条件
      },
      loadNumber: {
        userList: 0 // 已加载的记录数
      },
      totalNumber: {
        userList: 0 // 总记录数
      },
      axiosLoad: {
        userList: true // 请求状态 true空闲/false请求未返回
      },
      page: {
        curFirst: true,
        dialogShow: false,
        focus: false,
        disabled: false,
        rightList: {}
      }, // fkdialog 需要的参数
      commodityResult: '', // 下拉筛选条件
      loadSize: 300, // 单页加载内容
      loadFlag: false // 加载初始化状态
    };
  },
  created() {
    this.axiosAction();
    this.Buttonmap = Buttonmap;
    this.ChineseDictionary = ChineseDictionary;
  },
  watch: {
    userAuthorityList: {
      handler(val) {
        let flag;
        if (val.length <= 0) flag = false;
        else flag = val.every(item => item.checked);
        this.authorityFlag = flag;
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 前提:公共逻辑处理必须使用jordanButton组件才可以使用公共逻辑
      // 参数1  关于是否是定制页面:action 半定制页面:halfaCustom （目前不生效）
      // 参数2  buttons父级json
      // 参数3  true逻辑处理 false定制页面自行处理  按钮权限
      // 逻辑处理则直接调用
      // this.getPermissions("action", "btnConfig");
      this.getPermissions('btnConfig', 'commodityAuthority');
      // 定制页面自行处理
      // let buttonList = this.getPermissions("action", "btnConfig",true)
    });
    const _self = this;

    this.storage.id = this.$route.query.cid || '15';
    this.storage.name = this.$route.query.tableName || 'ps_c_pro';

    // 判断链接是否来自用户权限控制
    if (_self.$route.query.from && _self.$route.query.from === 'tab') {
      _self.axiosUserName();
    } else {
      //        this.axiosUser(_self.userQuery, true);
      this.axiosGroup();
    }

    // 监听滚动条,50%自动加载下一页
    $('.commodityAuthority .table-scroll-body').scroll((event) => {
      const $this = $(event.target);
      const target = $this.attr('data-target');
      if (undefined != target) {
        const percent = $this.scrollTop() / ($this.find('.table').height() - $this.height());
        if (percent > 0.5 && this.axiosLoad.userList && this.loadNumber[target] < this.totalNumber[target]) this.loadPage(target);
      }
    });
  },
  computed: {},
  methods: {
    // 发送请求,通过用户id获取用户信息
    // 修改为用户组查询
    async axiosUserName() {
      const _self = this;
      const param = new URLSearchParams();
      param.append('param', JSON.stringify({ GROUPS_ID: Number(_self.userId) }));
      const res = await this.service.common.groupQueryName(param);
      if (res.data.data) _self.userQuery = res.data.data.name;
      _self.axiosGroup();
    },
    // 发送请求,获取用户的action权限
    axiosAction() {
      this.actionFlag.deleteFlag = true;
      this.actionFlag.saveFlag = true;
    },
    // 用户组模糊搜索
    axiosGroup() {
      this.userSearchFlag = true;
      $('.commodityAuthority .tab-pane')
        .find('.table-body')
        .scrollTop(0);
    },
    // 树节点搜索完成
    searchFinish(value) {
      this.userSearchFlag = value;
    },
    // 切换用户组tree
    selectTreeItem(object) {
      const _self = this;
      if (_self.userId !== object.ID) {
        _self.userId = object.ID;
        _self.axiosUserAuthority();
        _self.treeRefresh = false;
      }
    },

    // 发送请求,获取指定用户的权限
    async axiosUserAuthority() {
      const _self = this;
      const param = new URLSearchParams();
      param.append('param', JSON.stringify({ GROUPS_ID: _self.userId }));
      try {
        const res = await this.service.common.cuserspro(param);
        if (res.data.code === 0) {
          const result = res.data.data;
          for (const g of result) {
            g.checked = false;
          }
          _self.userAuthorityList = result;
          if (_self.actionFlag.freshFlag) {
            _self.$message({ message: '刷新成功', type: 'success' });
            _self.actionFlag.freshFlag = false;
          }
        } else if (_self.actionFlag.freshFlag) {
          _self.actionFlag.freshFlag = false;
        }
      } catch (e) {
        if (_self.actionFlag.freshFlag) {
          _self.actionFlag.freshFlag = false;
        }
      }
    },
    // 插入用户权限按钮触发,显示筛选dialog
    insertUserAuthority() {
      this.page.dialogShow = true;
    },
    // 用户列表中点击选择一个用户,获取对应的权限------------------弃用
    selectOne(obj) {
      if (!obj.checked) {
        const _self = this;
        for (const u of _self.userList) {
          u.checked = false;
        }
        _self.userId = obj.ID;
        _self.axiosUserAuthority();
        _self.$set(obj, 'checked', true);
      }
    },
    // 标准保存接口----删除
    async deleteAuthority() {
      const _self = this;
      const param = {
        table: 'CP_C_HRUSERS_PRO',
        objid: 0,
        isdelmtable: false,
        data: { CP_C_HRUSERS_PRO: [] }
      };
      for (const u of _self.userAuthorityList) {
        if (u.checked) param.data.CP_C_HRUSERS_PRO.push(u.ID);
      }
      if (param.data.CP_C_HRUSERS_PRO.length > 0) {
        const res = await this.service.common.objectDelete(param);
        if (res.data.code >= 0) {
          _self.$message({ message: res.data.message, type: 'success' });
          _self.axiosUserAuthority();
        }
      } else {
        _self.$message('没有选中');
      }
    },
    // 下拉筛选,auto-complete组件调用方法
    async querySearch(queryString, cb) {
      if (queryString.length <= 0) {
        cb([]);
      } else {
        const param = new URLSearchParams();
        param.append('query', `{'query':'${queryString}'}`);
        const res = await this.service.common.cprolikequery(param);
        if (res.data.code === 0) {
          const result = res.data.data;
          cb(result);
        }
      }
    },
    // 选中下拉的筛选条件,auto-complete组件调用方法
    handleSelect(item) {
      const _self = this;
      if (_self.userId === 0) {
        _self.$message('未选中用户');
        return;
      }
      const insertParam = [];
      insertParam.push({
        ID: -1,
        GROUPS_ID: _self.userId,
        PS_C_PRO_ID: item.ID
      });
      _self.insertAuthority(insertParam);
      _self.commodityResult = '';
      _self.page.disabled = true;
    },

    // 弹出框多选组件,确定调用方法
    async easyData(result) {
      result = JSON.parse(result);
      const _self = this;
      if (_self.userId === 0) {
        _self.$message('未选中用户');
        return;
      }
      const param = new URLSearchParams();
      param.append('param', JSON.stringify(result.value));
      const res = await this.service.common.screenresult(param);
      if (res.data.code === 0) {
        const searchResult = res.data.data.list;
        if (searchResult.length <= 0) return;
        const insertList = [];
        for (const sr of searchResult) {
          insertList.push({
            ID: -1,
            GROUPS_ID: _self.userId,
            PS_C_PRO_ID: sr.ID
          });
        }
        _self.insertAuthority(insertList);
      }
    },
    // 发送请求,插入用户权限
    async insertAuthority(insertList) {
      const _self = this;
      const insertParam = {
        table: 'CP_C_HRUSERS_PRO',
        objid: 0,
        data: { CP_C_HRUSERS_PRO: insertList }
      };
      const param = new URLSearchParams();
      param.append('table', insertParam.table);
      param.append('objid', insertParam.objid);
      param.append('data', JSON.stringify(insertParam.data));
      try {
        const res = await _self.service.common.objectSave(param);
        _self.page.disabled = false;
        if (res.data.code === 0) {
          _self.$message({ message: res.data.message, type: 'success' });
        }
        _self.axiosUserAuthority();
      } catch (e) {
        _self.page.disabled = false;
      }
    },
    // 全选/取消
    handleChangeAll() {
      const _self = this;
      if (_self.authorityFlag) for (const u of _self.userAuthorityList) _self.$set(u, 'checked', true);
      else for (const u of _self.userAuthorityList) _self.$set(u, 'checked', false);
    },
    // 字符串匹配,标红
    matchWords(value) {
      if (value == null || value == '') return '';
      if (this.userQuery === '') return value;
      const searchQuery = this.userQuery.replace(/[\@\#\$\%\^\&\*\{\}\:\"\L\<\>\?\+\.\(\)\[\]\\]/g, q => `\\${q}`);
      return value.replace(new RegExp(searchQuery, 'gi'), word => `<span class="color-red">${word}</span>`);
    },
    // 刷新操作
    refresh() {
      this.axiosAction();
      this.actionFlag.freshFlag = true;
      this.userQuery = '';
      this.userAuthorityQuery = '';
      this.userId = this.$route.query.cid || 0;
      this.loadFlag = false;
      //        this.axiosUser(this.userQuery);
      this.treeRefresh = true;
      $('.commodityAuthority .tab-pane')
        .find('.table-body')
        .scrollTop(0);
    },

    // 发送请求,预加载下一页记录
    async loadPage(target) {
      const _self = this;
      _self.axiosLoad[target] = false;
      const param = new URLSearchParams();
      param.append(
        'QUERY',
        JSON.stringify({
          QUERY: _self.searchQuery[target],
          PAGENUM: Number(_self.loadNumber[target] / _self.loadSize) + 1,
          PAGESIZE: _self.loadSize
        })
      );
      const res = await this.service.common.chrusersquery(param);
      const result = res.data.data;
      if (!_self.loadFlag) {
        for (const user of result.list) {
          if (user.ID == _self.userId) {
            _self.loadFlag = true;
            _self.$set(user, 'checked', true);
            break;
          }
        }
        _self[target] = _self[target].concat(result.list);
      }
      _self.loadNumber[target] = result.endRow;
      _self.totalNumber[target] = result.total;
      _self.axiosLoad[target] = true;
    }
  }
};
