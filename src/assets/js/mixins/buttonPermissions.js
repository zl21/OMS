// 定制页面按钮权限

export const buttonPermissionsMixin = {
  methods: {
    // 获取表单或表头数组,arrry=btnConfig
    getPermissions(arrry, params, isIndependent) {
      let independent = [];
      const query = {
        param: JSON.stringify({
          AD_ACTION_NAME: params
        })
      };
      // console.log('this[arrry].buttons===', this[arrry].buttons)
      if (this[arrry] == undefined) return;
      this.service.common.fetchActionsInCustomizePage(query).then(res => {
        const result = res.data.data || [];
        independent = result;
        const a = [];
        this[arrry].buttons.forEach((item, i) => {
          // 设置、收藏等图标按钮的配置
          if (!item.text && item.icon) {
            a.push(item);
          }
        });

        const c = [];
        result.forEach((element, index) => {
          // 有下拉项的处理
          if (element.child) {
            this.buttonChild(element, this[arrry].buttons, c);
          }
          // 普通btn（无child）的处理
          this[arrry].buttons.forEach((btn, btnIndex) => {
            if (element.webname && element.webname == btn.webname) {
              btn.webid = element.webid;
              btn.webname = element.webname;
              btn.text = element.webdesc;
              c.push(btn);
            }
          });
        });
        this[arrry].loading = false;
        if (isIndependent) {
          return independent;
        }
        this[arrry].buttons = [...c, ...a];
      });
    },
    buttonChild(ele, btns, arr) {
      const obj = {};
      const ar = [];
      obj.menuText = ele.caption;
      obj.dropDown = true;
      ele.child.forEach(item => {

        btns.forEach(s_item => {
          if (item.webname == s_item.webname) {
            s_item.webid == item.webid
            s_item.webname = item.webname;
            s_item.text = item.webdesc;
            ar.push(s_item);
          }
        });
      });
      obj.menus = ar;
      arr.push(obj);
    }
  }
};
