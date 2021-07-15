// 库存中心
import R3 from '@syman/burgeon-r3';

const { network } = R3;
export default {
    // 出库通知单-（按查询条件重传WMS按钮
    sgPhyOutNoticesSendWMSAgainCondition: params => network.post('/p/cs/sgPhyOutNoticesSendWMSAgainCondition', params),
    // 库存同步队列表
    getChannelSynstockQuery: params => network.post('/p/cs/getChannelSynstockQuery', params),
    // 库存同步队-导出
    getChannelSynstockExport: params => network.post('/p/cs/getChannelSynstockQuery/export', params), // 导出
    // 库存计算缓存池
    getChannelStorageBufferQuery: params => network.post('/p/cs/getChannelStorageBufferQuery', params),
    // 平台店铺库存变动流水
    getChannelStorageFtpQuery: params => network.post('/p/cs/getChannelStorageFtpQuery', params), // 获取列表数据
    // 仓间调拨-审核
    transferAudit: params => network.post('/p/cs/transfer/audit', params),

};
