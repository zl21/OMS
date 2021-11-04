// 定制页面数据权限
// import axios from 'axios';

export default {
  methods: {
    getDataAccess(table, callback) {
      const data = {
        table
      };
      this.service.orderCenter.getSingleObjectPermission(data).then((res) => {
        callback(res.data.data);
      });
    },
    // 设置表单或表头数组
    setFormPermissions(parent, child, param) {
      if (param == 'add') {
        if (parent.style == 'popInput') {
          if (child.isRead == 'N' && child.isWrite == 'N') {
            parent.itemdata.readonly = true;
          } else if (child.isRead == 'N') {
            parent.itemdata.readonly = true;
          } else if (child.isWrite == 'N') {
            parent.itemdata.readonly = true;
          }
          // else{
          //   parent.itemdata.readonly = false;
          // }
          // ele.style = "" //控制字段隐藏
        } else if (parent.style != '') {
          if (child.isRead == 'N' && child.isWrite == 'N') {
            parent.disabled = true;
          } else if (child.isRead == 'N') {
            parent.disabled = true;
          } else if (child.isWrite == 'N') {
            parent.disabled = true;
          }
        }
      } else if (param == 'detail') {
        if (parent.style == 'popInput') {
          if (child.isRead == 'N' && child.isWrite == 'N') {
            parent.style = '';
          } else if (child.isRead == 'N') {
            parent.style = '';
          } else if (child.isWrite == 'N') {
            parent.itemdata.readonly = true;
          }
          // else{
          //   parent.itemdata.readonly = false;
          // }
          //  //控制字段隐藏
        } else if (parent.style != '') {
          if (child.isRead == 'N' && child.isWrite == 'N') {
            parent.style = '';
          } else if (child.isRead == 'N') {
            parent.style = '';
          } else if (child.isWrite == 'N') {
            parent.disabled = true;
          }
        }
      }
    },

    // 设置表头数据
    setTablePermissions(arrays, res) {
      const __columns = [];

      arrays.forEach((parent) => {
        res.SENSITIVE_COLUMNS.forEach((child) => {
          if (parent.dataAcessKey == child.ecode) {
            if (child.isRead == 'N') {
              parent.__isShow = false;
            }
          }
        });
      });
      arrays.forEach((value) => {
        if (value.__isShow != false) {
          __columns.push(value);
        }
      });

      return __columns;
    }
  }
};
