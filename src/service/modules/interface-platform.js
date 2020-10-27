// 接口平台
import R3 from '@syman/burgeon-r3';
import httpServer from 'framework/__utils__/request';
const {network} = R3;
export default {
  // 淘宝订单/京东订单/JITX订单 下载
  orderDownload: (params) => network.post('/p/cs/orderDownload', params),
  // 淘宝退单/京东退单/通用接口退单 退单下载
  refundDownload: (params) => network.post('/p/cs/refundDownload', params),
  // 淘宝换货单接口
  exchangeDownload: (params) => network.post('/p/cs/exchangeDownload', params),
  // 寻仓订单下载
  downLoadVipDelivery: (params) => network.post('/p/cs/downLoadVipDelivery', params),
  // 唯品会退供单
  downLoadVipOrderRefund: (params) => network.post('/p/cs/downLoadVipOrderRefund', params),
  // 实效订单下载
  downLoadVipTimeOrder: (params) => network.post('/p/cs/downLoadVipTimeOrder', params),
  // 取消实效订单下载
  downLoadVipCancelTimeOrder: (params) => network.post('/p/cs/downLoadVipCancelTimeOrder', params),
  // 通用接口下载
  /**
   * 经销订单下载 分销商订单下载 /p/cs/orderDownload 
   * 分销商品下载 /p/cs/itemDownload
   * 通用商品下载 /p/cs/stdp/item/get
   * 分销退单下载 /p/cs/refundDownload
   * "/p/cs/stdp/order/get
   */
  publicOrderDownload: (url,params) => network.post(url, params),


}
