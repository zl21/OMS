// 接口平台

export default {
  // 淘宝商品下载
  // tbGoodsDownload: params => $network.post('/p/cs/ip/v1/order/download/productDownLoad', params),
  itemDownload: params => $network.post('/p/cs/itemDownload', params),
  // 淘宝订单
  tbOrderDownLoad: params => $network.post('/p/cs/ip/v1/order/download/tbOrderDownLoad', params),
  // 淘宝订单/京东订单/JITX订单 下载
  // orderDownload: params => $network.post('/p/csrefundDownload/ip/v1/order/download/orderDownLoad', params),
  orderDownload: params => $network.post('/p/cs/orderDownload', params),
  // 淘宝退单/京东退单/通用接口退单 退单下载
  // refundDownload: params => $network.post('/p/cs/ip/v1/order/download/orderRefundDownLoad', params),
  refundDownload: params => $network.post('/p/cs/refundDownload', params),
  // 淘宝换货单接口
  exchangeDownload: params => $network.post('/p/cs/exchangeDownload', params),
  // 拒绝换货
  exchangeRefuseReason: params => $network.post('/p/cs/ip/v1/exchange/exchangeRefuseReason', params),
  exchangeRefuse: params => $network.post('/p/cs/ip/v1/exchange/taobaoTransNoChangeAgree', params),
  // 寻仓订单下载
  downLoadVipDelivery: params => $network.post('/p/cs/downLoadVipDelivery', params),
  // 唯品会退供单
  downLoadVipOrderRefund: params => $network.post('/p/cs/downLoadVipOrderRefund', params),
  // 实效订单下载
  downLoadVipTimeOrder: params => $network.post('/p/cs/downLoadVipTimeOrder', params),
  // 取消实效订单下载
  downLoadVipCancelTimeOrder: params => $network.post('/p/cs/downLoadVipCancelTimeOrder', params),

};
