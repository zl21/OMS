/*
 * @Author: your name
 * @Date: 2021-05-19 17:55:24
 * @LastEditTime: 2021-06-22 11:46:46
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/config/config/event.config.js
 */
//定制事件配置类
import DropDownConfig from 'burgeonConfig/config/dropDown.config';
class BurgeonEvent {
    static target;
    constructor() {
    }

    // 分页change 事件
    static pageChange(val, funName) {
        BurgeonEvent.target.agTableConfig.pagenation.current = val;
        BurgeonEvent.target[funName]();
    }
    // 切换分页条数
    static pageSizeChange(val, funName) {
        BurgeonEvent.target.agTableConfig.pagenation.pageSize = val;
        BurgeonEvent.target[funName]();
    }
    // 切换标签 执行搜索
    static labelClick(item, funName) {
        BurgeonEvent.target.statusData = item;
        BurgeonEvent.target.agTableConfig.pagenation.current = 1;
        BurgeonEvent.target[funName]();
    }

    // 单击某二行时触发
    static onRowDblclick(row) {
        R3.store.commit('global/tabOpen', {
            type: 'C',
            customizedModuleName: 'orderManageDetail',
            customizedModuleId: row.ID,
            label: $i18n.t('panel_label.retailInvoice_details'),
        });
    }

    static onSortChanged(funName) {
        BurgeonEvent.target[funName]();
    }

    // 高级搜索
    static search() { }
    // DropDownSelectFilter禁止用户输入
    static onDropChange(value) {
        console.log('onDropChange::', value);
    }
    // 清除某个检索项值
    static clearItem(funName) {
        BurgeonEvent.target[funName]();
    }
    // 清除检索项
    static clearAll(funName) {
        BurgeonEvent.target.selectValue = [];
        setTimeout(() => { BurgeonEvent.target[funName](); }, 100);
    }

    static dropDownClickChange(val, eventList = []) {
        const self = BurgeonEvent.target;
        // val !== '新增'
        if (val !== 'Newly added') {
            if(!self.vueAgTable){
                self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              }
        }
        DropDownConfig.target = BurgeonEvent.target;
        DropDownConfig.configHandler(val, 0, eventList);
        // eslint-disable-next-line default-case
    }

    //文本输入回车查询;
    static inputenter(funName) {
        BurgeonEvent.target[funName]();
    }

    // 展开 并获取from页面数据
    static shutDownOrbounceOff() {
        const self = BurgeonEvent.target;
        let arrayType = self.iconDownIcon.split(' ').includes('iconios-arrow-down');
        self.iconDownIcon = `ark-icon iconfont ${(arrayType) ? 'iconios-arrow-up' : 'iconios-arrow-down'}`;
        self[`${(arrayType) ? 'selectValue' : 'highSearchData'}`] = [];
        self.clearFromListValue = true;
        self.isShowSeniorOrOrdinary = !self.isShowSeniorOrOrdinary;
        if (!arrayType) {
            setTimeout(() => {
                self.$comUtils.setTableHeight(self, 30);
                self.$refs.agGridChild.agGridTable(self.agTableConfig.columnDefs, self.agTableConfig.rowData);
            }, 500);
            // 设置普通搜索默认选项
            self.setSearchOption();
        }
        self.getHeaderList();
    }
}

export default BurgeonEvent;