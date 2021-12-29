// 库存中心
import R3 from '@syman/burgeon-r3';

const {network} = R3;
export default {
    // 出库通知单-（按查询条件重传WMS按钮
    sgPhyOutNoticesSendWMSAgainCondition: params => network.post('/p/cs/sgPhyOutNoticesSendWMSAgainCondition', params),
    // 库存同步队列表
    getChannelSynstockQuery: params => network.post('/p/cs/getChannelSynstockQuery', params),
    // 库存计算缓存池
    getChannelStorageBufferQuery: params => network.post('/p/cs/getChannelStorageBufferQuery', params),
    // 平台店铺库存变动流水
    getChannelStorageFtpQuery: params => network.post('/p/cs/getChannelStorageFtpQuery', params), // 获取列表数据
    // 配销仓明细
    objectTab: params => network.post('/p/cs/objectTab', params),

    // 店仓评分
    queryShareScoreFactor: params => network.post('/p/cs/sg/ScoreStrategy/queryShareScoreFactor', params),
    queryByPhyWarehouseId: params => network.post('/p/cs/sg/ScoreStrategy/queryByPhyWarehouseId', params),
    ScoreStrategySave: params => network.post('/p/cs/sg/ScoreStrategy/save', params),
    deleteByStoreIds: params => network.post('/p/cs/sg/ScoreStrategy/deleteByStoreIds', params),

    // 寻源策略
    sgChannelSourceStrategySave: params => network.post('/p/cs/sg/SgChannelSourceStrategy/save', params), // 寻源策略主表明细表保存
    SgChannelSourceStrategyRuleItemQuery: params => network.post('/p/cs/sg/SgChannelSourceStrategyRuleItem/query', params), // 寻源规则查询
    SgChannelSourceStrategyRuleItemNewLine: params => network.post('/p/cs/sg/SgChannelSourceStrategyRuleItem/newLine', params), // 寻源规则新增行
    SgChannelSourceStrategyForceItemDelete: params => network.post('/p/cs/sg/SgChannelSourceStrategyForceItem/delete', params), // 强制寻源规则删除
    SgChannelSourceStrategyForceItemQuery: params => network.post('/p/cs/sg/SgChannelSourceStrategyForceItem/query', params), // 强制寻源规则查询
    SgChannelSourceStrategyRuleItemDelete: params => network.post('/p/cs/sg/SgChannelSourceStrategyRuleItem/delete', params), // 寻源规则删除行
    SgChannelSourceStrategyQuery: params => network.post('/p/cs/sg/SgChannelSourceStrategy/query', params), // 寻源策略查询详情
    exeAction: params => network.post('/p/cs/exeAction', params), // 结案
    SgChannelSourceStrategyWarehouseItemQuery: params => network.post('/p/cs/sg/SgChannelSourceStrategyWarehouseItem/query', params), // 仓优先查询列表
    SgChannelSourceStrategyWarehouseItemDel: params => network.post('/p/cs/sg/SgChannelSourceStrategyWarehouseItem/delete', params), // 仓优先查删除行


    // 共享池库存梯度策略
    sgSyncGradientStrategyShareSave: params => network.post('/p/cs/sg/SgSyncGradientStrategyShare/save', params), // 共享池库存梯度策略 - 保存
    SgSyncGradientStrategyShareQueryList: params => network.post('/p/cs/sg/SgSyncGradientStrategyShare/queryList', params), // 共享池 - 列表
    sgSyncGradientStrategyShareQueryById: params => network.post('/p/cs/sg/SgSyncGradientStrategy/queryById', params), // (配销仓/共享池) - 详情
    SgSyncGradientStrategyItemQuery: params => network.post('/p/cs/sg/SgSyncGradientStrategyItem/query', params), // (配销仓/共享池) - 右侧店铺表格详情
    SgSyncGradientStrategyCondItemDelete: params => network.post('/p/cs/sg/SgSyncGradientStrategyCondItem/delete', params), // (配销仓/共享池)  - 条件明细 - 删除
    SgSyncGradientStrategyShopItemDelete: params => network.post('/p/cs/sg/SgSyncGradientStrategyShopItem/delete', params), // (配销仓/共享池)  - 店铺明细 -删除


    // 配销仓梯度策略
    SgSyncGradientStrategySaSave: params => network.post('/p/cs/sg/SgSyncGradientStrategySa/save', params), // 配销仓梯度策略  - 保存
    SgSyncGradientStrategySaQueryList: params => network.post('/p/cs/sg/SgSyncGradientStrategySa/queryList', params), // 配销仓 - 列表




    // 渠道库存管理
    shopSelectByName: params => network.post('/p/cp/shop/selectByName', params),// 平台店铺查询（左侧列表）
    queryDevOpsInfoList: params => network.post('/p/cs/sg/channel/queryDevOpsInfoList', params),// 平台商品查询接口
    queryDevOpsInfo: params => network.post('/p/cs/sg/sa/queryDevOpsInfo', params),// 配销仓库
    addAllocationBill: params => network.post('/p/cs/sg/share/addAllocationBill', params),// 调入库存
    shareQueryDevOpsInfo: params => network.post('/p/cs/sg/share/queryDevOpsInfo', params),// 共享池库存列表查询
    saveDevOpsInfo: params => network.post('/p/cs/sg/channel/saveDevOpsInfo', params),// 按钮通用(停止/开启平台库存同步、是否转仓、设定安全库存)
    IncSyncStorage: params => network.post('/p/cs/sg/channel/IncSyncStorage', params),// 手动增量库存同步
    syncChannelStorage: params => network.post('/p/cs/sg/channel/syncChannelStorage', params),// 库存同步
    updateBySaStoreType: params => network.post('/p/cs/sg/channel/updateBySaStoreType', params),// 修改商品标签
    download: params => network.post('/p/cs/sg/channel/download', params),// 导出
    checkSkuStorage: params => network.post('/p/cs/sg/channel/checkSkuStorage', params),// 修改特殊条码比例
    platformInventory: params => network.post('/p/cs/sg/channel/download/platformInventory', params),// 下载平台库存
    downloadAllShopSaleStorage: params => network.post('/p/cs/sg/channel/download/allShopSaleStorage', params),//  下载全店在售库存


};
