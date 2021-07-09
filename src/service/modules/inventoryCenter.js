// 库存中心
import R3 from '../../../static/r3.publish/r3.min.js';

const { network } = R3;
export default {
    // 出库通知单-（按查询条件重传WMS按钮
    sgPhyOutNoticesSendWMSAgainCondition: params => network.post('/p/cs/sgPhyOutNoticesSendWMSAgainCondition', params),
    // 库存同步队列表
    getChannelSynstockQuery: params => network.post('/p/cs/getChannelSynstockQuery', params),
    // 库存计算缓存池
    getChannelStorageBufferQuery: params => network.post('/p/cs/getChannelStorageBufferQuery', params),
    // 平台店铺库存变动流水
    getChannelStorageFtpQuery: params => network.post('/p/cs/getChannelStorageFtpQuery', params), // 获取列表数据
};
