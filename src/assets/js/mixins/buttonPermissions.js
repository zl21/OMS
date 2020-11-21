// 定制页面按钮权限

export const buttonPermissionsMixin = {
  methods: {
    // 获取表单或表头数组
    getPermissions(arrry, params, isIndependent) {
      let independent = [];
      const query = {
        param: JSON.stringify({
          AD_ACTION_NAME: params
        })
      };
      console.log('this[arrry].buttons===', this[arrry].buttons)
      this.service.common.fetchActionsInCustomizePage(query).then(res => {
        const result = res.data.data || [];
        independent = result;
        const a = [];
        this[arrry].buttons.forEach((item, i) => {
          if (!item.text && item.icon) {
            a.push(item);
          }
        });
        
        const c = [];
        result.forEach((element, index) => {
          if (element.child) {
            this.buttonChild(element, this[arrry].buttons, c);
          }
          this[arrry].buttons.forEach((btn, btnIndex) => {
            if (element.webdesc && element.webdesc == btn.text) {
              c.push(btn);
            }
          });
        });
        this[arrry].loading = false;
        if (isIndependent) {
          return independent;
        }
        // console.log('c-----', c);
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
          if (item.webdesc == s_item.text) {
            ar.push(s_item);
          }
        });
      });
      obj.menus = ar;
      arr.push(obj);
    }
  }
};
