// 定制页面按钮权限
import axios from "axios";
export const buttonPermissionsMixin = {
  methods: {
    // 获取表单或表头数组
    getPermissions(arrry, params, isIndependent) {
      let independent = []
      axios({
        method: "get",
        url: "/p/cs/v2/fetchActionsInCustomizePage",
        params: {
          param: {
            AD_ACTION_NAME: params
          }
        }
      })
        .then(res => {
          let result = res.data.data || []
          independent = result
          let a = []
          this[arrry].buttons.forEach((item, i) => {
            if (!item.text && item.icon) {
              a.push(item)
            }
          })
          console.log(a, 'a')
          let c = []
          result.forEach((element, index) => {
            if (element.child) {
              this.buttonChild(element, this[arrry].buttons, c);
            }
            this[arrry].buttons.forEach((btn, btnIndex) => {
              if (element.webdesc && element.webdesc == btn.text) {
                c.push(btn)
              }
            });
          });
          this[arrry].loading = false
          if (isIndependent) {
            return independent
          } else {
            this[arrry].buttons = [...c, ...a]
          }
        });
    },
    buttonChild(ele, btns, arr) {
      let obj = {};
      let ar = [];
      obj['menuText'] = ele.caption;
      obj['dropDown'] = true;
      ele.child.map(item => {
        btns.map(s_item => {
          if (item.webdesc == s_item.text) {
            ar.push(s_item);
          }
        })

      });
      obj['menus'] = ar;
      arr.push(obj);
    }
  }
};
