import downLoadTaobaoGoods from 'branchComponent/modal/CommodityCenter/downLoadTaobaoGoods' //商品中心-淘宝商品-下载商品弹框
import downLoadJingdongGoods from 'branchComponent/modal/CommodityCenter/downLoadJingdongGoods' //商品中心-京东商品-下载商品弹框
import downLoadPublic from 'branchComponent/modal/CommodityCenter/downLoadPublic' //商品中心-通用商品-下载商品弹框
import downLoadVipGoods from 'branchComponent/modal/CommodityCenter/downLoadVipGoods' //商品中心-唯品会商品-下载商品弹框
import channelInventory from 'branchComponent/modal/InventoryCenter/channelInventory' //库存中心-平台店铺商品表(商品按查询条件同步)
import taoBaoExchangeBillDownload from 'branchComponent/modal/InterfacePlatform/taoBaoExchangeBillDownload' //接口平台-淘宝换货单接口列表界面(换货单下载)
import taobaoReturnListDownload from 'branchComponent/modal/InterfacePlatform/taobaoReturnListDownload' //接口平台-淘宝退单接口列表界面(淘宝退单下载)
import downLoadJingdongOrder from 'branchComponent/modal/InterfacePlatform/downLoadJingdongOrder' //接口平台-京东订单接口列表界面(下载订单)
import downLoadJDChargeback from 'branchComponent/modal/InterfacePlatform/downLoadJDChargeback' //接口平台-京东退单接口列表界面(下载退单)
import downLoadJitxOrder from 'branchComponent/modal/InterfacePlatform/downLoadJitxOrder' //接口平台-JITX订单接口列表界面(下载订单)
import downLoadVipDelivery from 'branchComponent/modal/InterfacePlatform/downLoadVipDelivery' //接口平台-JITX寻仓接口列表界面(寻仓订单下载)
import downLoadVipRetreatSupply from 'branchComponent/modal/InterfacePlatform/downLoadVipRetreatSupply' //接口平台-唯品会退供单列表界面(退供单下载)
import downLoadVipTimeOrder from 'branchComponent/modal/InterfacePlatform/downLoadVipTimeOrder' //接口平台-唯品会时效订单列表界面(时效订单下载)
import downLoadVipCancelTimeOrder from 'branchComponent/modal/InterfacePlatform/downLoadVipCancelTimeOrder' //接口平台-唯品会取消时效订单列表界面(取消时效订单下载)


/**
 * 财务中心
 */
// 唯品会 进度/月结 账单 - 下载账单
import downLoadVipBill from 'branchComponent/modal/FinanceCenter/downLoadVipBill.vue'

// 唯品会 进度/月结 账单聚合表  - 生成销售单
import generateSalesOrder from 'branchComponent/modal/FinanceCenter/generateSalesOrder.vue'

export default {
  // 商品中心-淘宝商品-下载商品弹框
  DOWMLOADTAOBAOGOODS: {
    component: downLoadTaobaoGoods,
  },
  // 京东商品-下载
  DOWNLOADJINGDONGGOODS: {
    component: downLoadJingdongGoods,
  },
  // 通用商品-下载
  DOWNLOADPUBLIC: {
    component: downLoadPublic,
  },
  // 唯品会商品-下载
  DOWNLOADVIPGOODS: {
    component: downLoadVipGoods,
  },
  // 库存中心-平台店铺商品表(商品按查询条件同步)
  CHANNELINVENTORY: {
    component: channelInventory,
  },
  downLoadVipBill: {
    component: downLoadVipBill,
  },
  generateSalesOrder: {
    component: generateSalesOrder,
  },
  // 接口平台
  TAOBAOEXCHANGEBILLDOWNLOAD: {
    component: taoBaoExchangeBillDownload,
  },
  TAOBAORETURNLISTDOWNLOAD: {
    component: taobaoReturnListDownload,
  },
  DOWNLOADJINGDONGORDER: {
    component: downLoadJingdongOrder,
  },
  DOWNLOADJDCHARGEBACK: {
    component: downLoadJDChargeback,
  },
  DOWNLOADJITXORDER: {
    component: downLoadJitxOrder,
  },
  DOWNLOADVIPDELIVERY: {
    component: downLoadVipDelivery,
  },
  DOWNLOADVIPRETREATSUPPLY: {
    component: downLoadVipRetreatSupply,
  },
  DOWNLOADVIPTIMEORDER: {
    component: downLoadVipTimeOrder,
  },
  DOWNLOADVIPCANCELTIMEORDER: {
    component: downLoadVipCancelTimeOrder,
  },
}
