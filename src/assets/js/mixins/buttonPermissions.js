// 定制页面按钮权限

 export default {
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
        // if (DATA in result) result = result.DATA;
        independent = result;
        const a = [];
        this[arrry].buttons.forEach((item) => {
          // 设置、收藏等图标按钮的配置
          if (!item.text && item.icon) {
            a.push(item);
          }
        });

        const c = [];
        result.forEach((element) => {
          // 有下拉项的处理
          if (element.child) {
            this.buttonChild(element, this[arrry].buttons, c);
          }
          // 普通btn（无child）的处理
          this[arrry].buttons.forEach((btn) => {
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
        btns.forEach(sItem => {
          if (item.webname == sItem.webname) {
            sItem.webid = item.webid;
            sItem.webname = item.webname;
            sItem.text = item.webdesc;
            ar.push(sItem);
          }
        });
      });
      obj.menus = ar;
      arr.push(obj);
    }
  }
};
