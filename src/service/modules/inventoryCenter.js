// 库存中心
import R3 from '@syman/burgeon-r3';

const { network } = R3;
export default {
    sgPhyOutNoticesSendWMSAgainCondition: params => network.post('/p/cs/sgPhyOutNoticesSendWMSAgainCondition', params)

};
