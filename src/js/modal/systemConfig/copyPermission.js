import businessButton from 'burgeonComponents/businessButton';
import service from '@/service/index';

export default {
  name: 'CopyPermission',
  components: {
    businessButton
  },
  data() {
    return {
      vmI18n:$i18n,
      ID: this.$route.params.customizedModuleId && this.$route.params.customizedModuleId != 'New' ? this.$route.params.customizedModuleId : '-1', // 记录主界面传入的ID
      loading: false,
      filterDisabled: true,//控制目标角色是否禁用
      copyType: '', // 复制权限弹框  复制方式
      singlePermissionId: null, // 复制权限外键单选id
      multiplePermissionId: null, // 复制权限外键多选id
      backupsDropData: [], // 备份复制权限外键数据
      singleDropDownSelectFilterData: {}, // 复制权限外键单选数据
      singleAutoData: [], // 复制权限外键单选模糊搜索数据
      singleDefaultSelected: [], // 复制权限单选默认数据
      multipleDefaultSelected: [], // 复制权限多选默认数据
      multipleDropDownSelectFilterData: {}, // 复制权限外键多选数据
      multipleAutoData: [], // 复制权限外键多选模糊搜索数据
      totalRowCount: 0, // 复制权限外键数据的totalRowCount
      dropPageSize: 10, // 复制权限外键数据的pageSize
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            text: $i18n.t('common.cancel'), // 取消
            btnclick: () => {
              // this.$parent.close();
              // this.$emit('clearModify');
              this.$parent.$parent.closeConfirm();
            },
          },
          {
            text: $i18n.t('common.determine'), // 确定
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.confirmHandel();
            },
          },
        ]
      }
    };
  },
  mounted() {
    this.filterDisabled = true;
    this.getCopyPermissionData();
  },
  methods: {
    confirmHandel() {
      if (this.singlePermissionId === null) {
        this.$Message.warning({
          content: '请选择原角色！'
        });
        return;
      }
      if (this.multiplePermissionId === null) {
        this.$Message.warning({
          content: '请选择目的角色！'
        });
        return;
      }
      if (this.multiplePermissionId.indexOf(this.singlePermissionId.toString()) !== -1) {
        this.$Message.warning({
          content: '目的角色不能包含原角色，请重新选择！'
        });
        return;
      }
      if (this.copyType === '') {
        this.$Message.warning({
          content: '请选择复制方式！'
        });
        return;
      }
      this.copyPermission = false;
      const obj = {
        sourceid: this.singlePermissionId,
        targetids: this.multiplePermissionId,
        type: this.copyType
      };
      // this.loading = true;
      service.systemConfig.copyPermission({
        params: obj,
        success: (res) => {
          // this.loading = false;
          if (res.data.code === 0) {
            this.$parent.$parent.closeConfirm();
            this.$Message.success({
              content: res.data.message
            });
            this.$parent.$parent.$parent.getTableData();
          }
        }
      });
    },
    getCopyPermissionData() {
      service.systemConfig.cgroupsquery({
        params: { NAME: '' },
        success: (res) => {
          if (res.data.code === 0) {
            this.backupsDropData = res.data.data;
            this.totalRowCount = res.data.data.length;
            this.getSingleDropSelectData(1, res.data.data);
            this.getMultipleDropSelectData(1, res.data.data);
          }
        }
      });
    }, // 获取复制权限外键的数据
    getSingleDropSelectData(pageValue, data) {
      const start = (pageValue - 1) * this.dropPageSize;
      const tabth = [
        {
          colname: 'ID',
          name: 'ID',
          isak: false
        },
        {
          colname: 'NAME',
          name: '角色',
          isak: true
        }
      ];
      const row = data.slice(start, start + this.dropPageSize)
        .reduce((acc, cur) => {
          const obj = {
            ID: {
              val: cur.ID,
            },
            NAME: {
              val: cur.NAME
            }
          };
          acc.push(obj);
          return acc;
        }, []);
      this.singleDropDownSelectFilterData = {
        start,
        tabth,
        row
      };
    }, // 整合复制权限外键单选数据
    getMultipleDropSelectData(pageValue, data) {
      const start = (pageValue - 1) * this.dropPageSize;
      const tabth = [
        {
          colname: 'ID',
          name: 'ID',
          isak: false
        },
        {
          colname: 'NAME',
          name: '角色',
          isak: true
        }
      ];
      const row = data.slice(start, start + this.dropPageSize)
        .reduce((acc, cur) => {
          const obj = {
            ID: {
              val: cur.ID,
            },
            NAME: {
              val: cur.NAME
            }
          };
          acc.push(obj);
          return acc;
        }, []);
      this.multipleDropDownSelectFilterData = {
        start,
        tabth,
        row
      };
    }, // 整合复制权限外键多选数据
    singleDropSelected(val) {
      this.singlePermissionId = val[0].ID;
      this.filterDisabled = false
    }, // 外键单选，选中触发
    singleDropPageChange(val) {
      this.getSingleDropSelectData(val, this.backupsDropData);
    }, // 外键单选分页改变触发
    singlePopperHide() {
      this.getSingleDropSelectData(1, this.backupsDropData);
    }, // 外键单选popper隐藏时触发
    singleDropClear() {
      this.singlePermissionId = null;
       this.multiplePermissionId = null;
       this.multipleDefaultSelected = []
       this.filterDisabled = true
       
    }, // 单选清空时触发
    singleInputChange(val) {
      if (val) {
        this.singleAutoData = this.backupsDropData.reduce((acc, cur) => {
          if (cur.NAME && cur.NAME.indexOf(val) !== -1) {
            acc.push({ ID: cur.ID, NAME: cur.NAME });
          }
          return acc;
        }, []);
      } else {
        this.singleAutoData = [];
      }
    }, // 外键单选输入框值改变时触发
    multipleDropSelected(val) {
      this.multiplePermissionId = val.reduce((acc, cur) => {
        acc.push(cur.ID);
        return acc;
      }, []).join(',');
    }, // 外键多选，选中触发
    multipleDropPageChange(val) {
      this.getMultipleDropSelectData(val, this.backupsDropData);
    }, // 外键多选分页改变触发
    multiplePopperHide() {
      this.getMultipleDropSelectData(1, this.backupsDropData);
    }, // 外键多选popper隐藏时触发
    multipleDropClear() {
      this.multiplePermissionId = null;
    }, // 多选清空时触发
    multipleInputChange(val) {
      if (val) {
        this.multipleAutoData = this.backupsDropData.reduce((acc, cur) => {
          if (cur.NAME && cur.NAME.indexOf(val) !== -1) {
            acc.push({ ID: cur.ID, NAME: cur.NAME });
          }
          return acc;
        }, []);
      } else {
        this.multipleAutoData = [];
      }
    }, // 复制权限外键多选输入时触发
  }
};