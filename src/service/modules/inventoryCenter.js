// 库存中心
import R3 from '@syman/burgeon-r3';

const { network } = R3;
export default {
    sgPhyOutNoticesSendWMSAgainCondition: params => network.post('/p/cs/sgPhyOutNoticesSendWMSAgainCondition', params),
    getObject: params => network.post('/p/cs/getObject', params),
    getChannelSynstockQuery: params => network.post('/p/cs/getChannelSynstockQuery', params),
    exportPayableAdjustment: params => network.post('/p/cs/exportPayableAdjustment', params),
    getChannelStorageBufferQuery: params => network.post('/p/cs/getChannelStorageBufferQuery', params),
    // 平台店铺库存变动流水
    getChannelStorageFtpQuery: params => network.post('/p/cs/getChannelStorageFtpQuery', params), // 获取列表数据
};
