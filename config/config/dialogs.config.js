//定制弹窗配置类
class DialogConfig {
    constructor() {
    }

    static config() {
        return this.customConfig = Object.fromEntries(Object.entries(this.customConfig).map(([key, value]) => {
            // (如果目标对象与源对象有同名属性，或多个) ==> 源对象有同名属性，则后面的属性会覆盖前面的属性
            // return [key, Object.assign(this.baseObj, value)];
            return [key, Object.fromEntries(Object.entries(this.baseObj).concat(Object.entries(value)))];
        }))
    }
}

DialogConfig.target;
DialogConfig.baseObj = {
    titleAlign: 'center',
    data: {},
    keepAlive: true,
    footerHide: true,
    maskClosable: true,
}

DialogConfig.customConfig = {
    // 零售发货单详情
    address: {
        title: window.vmI18n.t('modalTitle.modify_shipping_address'),
        width: 650,
        url: 'modal/orderCenter/resolveAddress',
        name: 'addressDialog',
        excludeString: 'addressDialog'
    },
    blacklist: {
        title: window.vmI18n.t('modalTitle.blacklist'),
        width: 400,
        url: 'order/joinBlackList',
        name: 'blackListDialog',
        excludeString: 'blackListDialog'
    },
    addGift: {
        title: window.vmI18n.t('btn.addGift'),
        width: 1000,
        url: 'modal/orderCenter/addGiftItem',
        name: 'addGiftDialog',
        excludeString: 'addGiftDialog'
    },
    changeSku: {
        title: window.vmI18n.t('btn.replaceGoods'),
        width: 800,
        url: 'modal/orderCenter/replaceGoodsDetail',
        name: 'changeSkuDialog',
        excludeString: 'changeSkuDialog'
    },
    modifyRemark: {
        title: window.vmI18n.t('btn.modifyRemarks'),
        width: 480,
        url: 'modal/orderCenter/changeRemark',
        name: 'modifyRemarkDialog',
        excludeString: 'modifyRemarkDialog'
    }
}

export default DialogConfig;