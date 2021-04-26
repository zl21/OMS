import publicMethodsUtil from '@/assets/js/public/publicMethods';
class WarningModal{
    static target;
    constructor() {
    }

    static param = {
        page: {
          pageSize: 999999,
          pageNum: 1,
        },
        label: target.labelData, // 标签
        queryInfo: target.queryInfoData, // 普通搜索
        status: target.statusData,
        highSearch: target.highSearchData,
      };

    static warningOk() {
      if (self.isExport) {
        // 有一项导出正在进行中
        commonUtils.msgTips(self, 'warning', 'f8');
      } else {
        self.isExport = true;
        const fromdata = new FormData();
        fromdata.append('param', JSON.stringify(this.param));
      }
      commonUtils.serviceHandler(self, 'orderCenter.exportOcBOrder', fromdata, 'part', function (res) {
        publicMethodsUtil.downloadUrlFile(res.data.data);
      });
      self.isExport = false;
    }


}

export default WarningModal;