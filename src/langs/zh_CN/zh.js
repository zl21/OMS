/**
 * 本中文语言包文档说明：
 * 1.本js采用exports的方式暴露了一个语言包对象；
 * 2.最小对象单位中的key和value提取自OMS2.0标品的所有定制页面及定制弹窗的中文变量；
 * 3.上述中的key按首字母升序排列。
 */

import tipsMessage from './tipsMessage'

export default {
  tip_info: "切换成功！",
  tip_type: "success",
  welcome: '欢迎登录',
  username: "请输入用户名！",
  password: "请输入密码！",
  login: '登录',
  logout: "退出",
  message: {
    'hello': '你好,世界'
  },

  com: {
    total: '共',
    piece: '条',
    all: '全部', //全部
    baseInformation: '基本信息', //Base Information
    cancel: '取消', //取消
    cancelled: '已取消', //已取消
    submitted: '已提交', //已提交
    city: '市',
    close: '关闭', //关闭
    consigneeInformation: '收货人信息', //收货人信息
    copy: '复制', //复制
    custAudited: '已客审',
    delivered_or_not: '全选',
    detailed_info: '明细信息',
    details: '详情', //详情
    determine: '确定', //确定
    downloadNow: '立即下载',
    endDate: '结束日期',
    exclude_province: '排除省',
    exclude_region: '排除区域',
    financeAudited: '已财审',
    journal: '日志', //
    more: '更多', //更多
    no: '否', // 否,NO
    province: '省',
    refresh_succee: '刷新成功', //刷新成功 ,Refresh Succee
    region: '区',
    remarksInfo: '备注信息', //备注信息
    return: '返回', //返回
    reviewed: '已审核', //已审核
    searching: '检索',
    selectAll: '全选',
    startDate: '开始日期',
    tag: '标签', //标签
    tips: '提示', //提示
    to: '至', //至
    toBeReviewed: '待审核', //待审核
    unAudit: '未审核', //未审核
    voided: '已作废',
    warning: '警告', //警告
    yes: '是', //是 ,YES
    address: {
      placeName0: '杭州',
      province0: '浙江省',
      city0: '杭州市',
      erea0: '余杭区',
      addressDetails0: '良睦路999号乐佳国际大厦2号楼小邮局',
      mobile0: '13012345678',
      phone0: '057112345678',
      name: '乾宝贝最可爱',
      placeName1: '杭州',
      province1: '浙江省',
      city1: '杭州市',
      erea1: '余杭区',
      addressDetails1: '文一西路1001号阿里巴巴淘宝城5号小邮局',
      mobile1: '13012345678',
      phone1: '057112345678',
      name1: '阿里巴巴',
    },
    everyday: '每天',
    monthly: '每月',
    yearly: '每年'
  },

  other: {
    a0: '自定义关键字',
    a1: '清空明细',
    a2: '系统SPU编码',
    a3: '系统SKU编码',	
    a4: '渠道仓 - 库存比例',
    a5: '类型值',
    a6: '安全库存数',
    a7: '商品来源类型',
    a8: '库存比例',
    a9: '启动自动审核',
    aa: '单据标签',
    ab: '释放时间',
    ac: '不限',
    ad: '仅限同款',
    ae: '仅限同吊牌价',
    af: '款号',
    ag: '商家最优',
    ah: '顾客最优',
    ai: '梯度送',
    aj: '指定时间点',
    ak: '仅限VIP生日当日',
    al: '仅限VIP生日当周',
    am: '仅限VIP生日当月',
    an: '全部换',
    ao: '固定时长',	
    ap: '预售HOLD单',
    ak: '据预计发货时间提前',	
    ar: '排除商品',
    as: '',
    at: '全国（含港澳台地区）',	
    au: '自定义',
    av: '仅限会员',
    aw: '是否积分',
    ax: '门店档案',
    ay: '会员等级',
    az: '保存行',
    b0: '删除选中行',	
    b1: '添加支持省份',
    b2: '商品不能为空',	
    b3: '特价不能为空',
    b4: '最多导入10000条数据',
    b5: '3期',
    b6: '6期',
    b7: '12期',
    b8: '排名在',	
    b9: '之间',
    ba: '标准商品档案',
    bb: '购物券',
    bc: '赠送券',
    bd: '赠送积分',	
    be: '大于等于',
    bf: '大于',
    bg: '等于',
    bh: '配送省份',
    bi: '购买',
    bj: '仅限活动日期',
    bk: '自定义时间范围',
    bl: '梯度换',
    bm: '按系统创建时间等待',
    bn: '分钟后自动审核',
    bo: '单据创建方式',
    bp: '补发',
    bq: '换货',
    br: '城市',
    bs: '系统SKU编码',
    bt: '平台SKUID',
    bu: '正常订单',
    bv: '预售订单',
    bw: '换货订单',
    bx: '预售识别规则',
    by: '固定时间',
    bz: '付款后',
    c0: '排除地区',
    c1: '普通订单',
    c2: '预售订单',
    c3: '货到付款订单',
    c4: '日期类型',
    c5: '',
    c6: '指定地址',    
    c7: '包含',
    c9: '系统商品款号',
    ca: '排除具体区域',
    cb: '物流派送范围编辑',
    cc: '修改人名称',
    cd: '日志类型',
    ce: '区域级别',
    cf: '',
    cg: '',
    ch: '',
    ci: '',
    cj: '',
    cm: '',
    cl: '',
    cn: '',
    co: '',
    cp: '',
    cq: '',
    cr: '',
    cs: '',
    ct: '',
    cu: '',
    cv: '',
    cw: '',
    cx: '',
    cy: '',
    cz: '',
    phoneNumber: '手机号',
    user: '账号',
    pwd: '密码',
    verticalCode: '验证码',
    pwdLogin: '密码登录',
    vCodeLogin: '验证码登录',
    live: '直播',
    fixedBudget: '定预',
    allAdvance: '全预',
    selfPrediction: '自预',
    queryResults: '查询结果',
    fullPayment: '全部付款',
    activity_overview: '活动概览',
    addTo_original_remarks: '追加到原备注',
    basicActivity: '基础活动',
    basic_info: '基础信息',
    billCode: '账单编码',
    billTime: '账单时间',
    blessingBag: '福袋',
    color: '颜色', //颜色
    common: '普通',
    condition_info: '条件信息',
    confirmPrinting: '确定打印',
    day: '天',
    Designated_free_purchase: '指定买赠',
    download_template: '下载模版',
    downloadMethod: '下载方式',
    draft_status: '草稿状态',
    exchangeAmounts: '换货金额',
    exchangeQuantity: '换货数量', //换货数量
    fixed_settlement: '固定结算',
    gift_info: '赠品信息',
    gift_list: '赠品列表',
    gift_set: '赠品信息设置',
    goods_quantity: '商品数量',
    goods: '商品', //商品
    hour: '小时',
    info_set: '条件信息设置',
    legend: '图例',
    minute: '分钟',
    myMission: '我的任务', //我的任务
    newWarehouse_change: '新增仓库改仓',
    no_double: '不翻倍',
    noDataAvailable: '暂无数据',
    offline_expired_status: '下线/过期状态',
    offline_expired: '下线/过期',
    orderState: '订单状态',
    originalWarehouseOutOfStock_change: '原仓缺货改仓',
    otherAmounts: '其他金额', //其他金额
    override_original_remarks: '覆盖原备注',
    participating_goods: '参与商品',
    payment_date: '付款日期',
    platformDelivery: "平台发货", //平台发货
    postage_compensation: '邮费赔付',
    postage: '邮费',
    price_compensation: '价格赔付',
    printing: '打印',
    product_list: '商品列表',
    product_related_info: '商品相关信息',
    piece: '件',
    refundablePostage: '应退邮费', //应退邮费
    refundAmountGoods: '商品应退金额',
    refundNumber: '退单号',
    returnGood: '退货',
    sales_price: '销售价',
    sendAll: '全部送',
    settlementAmountConsignment: '代销结算金额', //代销结算金额
    shop: '店铺', //店铺
    simulation_order_setup: '模拟订单设置',
    size: '尺码',
    sizes: '尺寸', //尺寸
    submission_status: '提交状态',
    systemCommodity_SKU: '系统商品SKU',
    systemNotes: '系统备注', //系统备注
    systemVoid: '系统作废', //系统作废
    sysWrongJudgment_change: '系统错判改仓',
    toBeDelivered: '待发货',
    total: '合计', //合计
    totalAmountReturnOrder: '退货单总金额', //退货单总金额
    trialCalculation_results: '试算执行结果',
    unlimited: '不限制',
    upload_files: '上传文件',
    uploadVoucher: '上传凭证', //上传凭证
    view_log: '查看日志',
    warehouseDelivery: "仓库发货", //仓库发货    
    nonMatchingGoods: '非搭配商品', // 非搭配商品
    preSale: '预售', // 预售
    depositTime: '定金时间', // 定金时间
    buyAndGive: '全场买赠', // 全场买赠
    excludeFollowingItems: '排除以下商品', // 排除以下商品
    outOfStock: '缺货',
    RefundSuccessful: '退款成功',
    payType: '支付类型',
    auditError: '审核失败',
    multipleOutOfStock: '多次缺货',
    manual: '手动',
    noDefectiveProductAllocation: '无次品调拨',
    defectiveProductsAllocated: '次品已调拨',
    defectiveProductsNotAllocated: '次品未调拨',
    platForm: '平台',
    warehousingLogicalWarehouse: '入库逻辑仓库',
    accountsReceivablePrice: '应收价',
    amountReceivable: '应收金额',
    thePromotion: '执行促销',
    sendGoodsShopWarehouse: '发货店仓',
    receiveGoodsShopWarehouse: '收货仓库',
    dropTheAmount: '吊牌金额',
    retailAmount: '零售金额'
  },

  btn: {
    a0: '收起列表',
    a1: '显示列表',
    a2: '收起矩阵',
    a3: '显示矩阵',
    a4: '下载平台库存',
    a5: '下载平台商品',
    a6: '修改同步比例',
    a7: '设定安全库存',
    a8: '调入库存',
    a9: '同步库存',
    aa: '是否转仓',
    ab: '修改商品类型',
    ac: '手动增量同步库存',
    ad: '修改商品标签',
    ae: '清空条件',
    af: '新增行',
    ag: '删除行',
    ah: '取消发布',
    ai: '批量活动下线',
    aj: '清空',
    ak: '匹配库存不足商品',
    al: '匹配在库',
    am: '匹配可用',
    an: '提交',
    ao: '取消提交',
    ap: '结案',
    aq: '库存同步',
    ar: '库存发布',
    as: '生成盈亏',
    at: '排除导入',
    au: '更新',
    av: '重导',
    aw: '手工导入',
    ax: '',
    ay: '',
    az: '',
    // b------------------------------------------------------------------------
    newSKU: '新增SKU',
    fastNew: '快速新增',
    applyToAllColumn: '应用到所有列',
    addManually: '手工新增',
    replaceDetail: '替换明细',
    addGoods: '添加商品',
    designGoods: '指定商品',
    forceMatching: '强制匹配',
    searchReturnOrder: '查询退单',
    clearReturnOrder: '清除退单',
    previous: '上一步',
    next: '下一步',
    authorityYes: '授权成功',
    authorityNo: '授权失败',
    addDetail: '新增明细',
    deleteDetail: '删除明细',
    markCancel: '标记取消',
    preSaleBalancePaid: '预售尾款已付',
    nonPreSale: '非预售',
    cashOnDelivery: '货到付款',
    add_collocation: '添加搭配',
    add_ladder: '添加阶梯',
    add: '新增', //新增
    addGift: "添加赠品", //添加赠品
    additionalRefund: '额外退款', //额外退款
    add_splitOrder: '添加到待拆单', //添加到待拆单
    afterSalesAudit: '售后审核', //售后审核
    appointGoods_splitOrder: "指定商品拆单", //指定商品拆单
    audit: '审核', //审核
    back: '返回',
    batch_add: '批量新增', //批量新增
    batch_chargeback: "批量退单", //批量退单
    batch_holdOrder: '批量Hold单', //批量Hold单
    batchModify_logistics: '批量修改物流', //批量修改物流
    batchModify_remarks: '批量修改备注', //批量修改备注
    batchModify_warehouse: '批量修改仓库', //批量修改仓库
    batchModify: '批量修改',
    batchModifyGoods: "批量改商品", //批量改商品
    batchOriginalReturn: '批量原退', //批量原退
    batchSplitOrder: "批量拆单", //批量拆单
    batch_addGift: "批量添加赠品", //批量添加赠品
    batch_deleteGift: "批量删除赠品", //批量删除赠品
    batch_replaceGoods: "批量替换商品", //批量替换商品
    beOut_of_stock: '缺货重新占单', //缺货重新占单
    copyPermissions: '复制权限',
    cancel_automaticRefund: '取消自动退款', //取消自动退款
    cancel_mergeOrders: "取消合并订单", //取消合并订单
    cancelBlocking: '取消拦截', //取消拦截
    cancelHold: '取消Hold', //取消Hold
    batch_cancelHold: '批量取消Hold', //批量取消Hold
    changeAddress: '修改地址', //修改地址
    changeTo_platformShipment: "更改为平台发货", //更改为平台发货
    collection: "收藏", //收藏
    copyOrder: "复制订单", //复制订单
    confirm_splitOrder: "确认拆单", //确认拆单
    createOrder: '创建订单', //创建订单
    custAudit: '客审',
    dealInOrder_download: '经销订单下载',
    deAudit: '反审核', //反审核
    deCustAudit: '反客审',
    delete_collocation: '删除搭配',
    delete_ladder: '删除阶梯',
    delete: '删除',
    deleteGift: "删除赠品", //删除赠品
    distributionChargeback_download: '分销退单下载',
    distributionOrder_download: '分销订单下载',
    distributionProduct_download: '分销商品下载',
    download: '下载',
    downloadProgressBill: '进度账单下载',
    draft: '草稿',
    empty: '清除', //清除
    expedited_shipment: '加急发货', //加急发货
    export: "导出", //导出
    financeAudit: '财审',
    find: '查找',
    forcedStorage: '强制入库',
    fubaoOut_of_stock: '福袋缺货重新占单', //福袋缺货重新占单
    generalGoods_download: '通用商品下载',
    generalOrder_download: '通用订单下载',
    generate: '生成',
    giftDelivery_copy: "赠品出库复制", //赠品出库复制
    holdOrder: 'Hold单', //hold单
    import: "导入", //导入
    increase: "添加", // 添加
    invoiceNotice: '开票通知', //开票通知
    lostOrder_copy: '丢单复制', //丢单复制
    mandatoryCompletion: '强制完成', //强制完成
    manual_matching: '手工匹配',
    manualCreation: '手工创建', //手工创建
    manualMarking: '手工打标', //手工打标
    mark_efective_product_transferred: '标记次品已调拨',
    mergeOrders: "合并订单", //合并订单
    missedCopy: "漏发复制", //漏发复制
    modify_logistics: '修改物流',
    modify_returnWarehouse: '修改退回仓库', //修改退回仓库
    modify: '修改', //修改
    modifyRemarks: '修改备注', //修改备注
    modifyWarehouse: '修改仓库', //修改仓库
    modify_sellerNotes: '修改卖家备注', //修改卖家备注
    monthlyBillDownload: '月结账单下载',
    new_chargeback: '新增退单', //新增退单
    new_workOrder: '新增工单', //新增工单
    note_import: '备注导入', //备注导入
    offline: '下线',
    orderBlocking: '订单拦截', //订单拦截
    orderCancel: '订单取消', //订单取消
    original_single_null_and_void_copy: "原单无效复制", //原单无效复制
    out_of_stock_splitOrder: "缺货拆单", //缺货拆单
    overdue: '过期',
    order_detailed: '订单明细', //订单明细
    publish: '发布',
    published: '已发布',
    preSaleAdvanceDeliveryMarking: '定金预售提前发货打标', //定金预售提前发货打标
    query: '查询',
    rark_refundComplete: '标记退款完成',
    recordInvoice: '记录发票', //记录发票
    refresh: '刷新',
    release_inventory: "释放库存", //释放库存
    replaceGoods: "替换商品", //替换商品
    changeGoods: '更换商品',
    reset: '重置',
    retransmission_WMS: '重传WMS', //重传WMS
    returnCopy: '退换货复制', //退换货复制
    save: '保存',
    saveDraft: '保存草稿',
    search: '搜索', //搜索
    sellerNotesImport: '卖家备注导入', //卖家备注导入
    set_groups: '设置分组',
    cancel_groups: '取消分组',
    simulation_trial_calculation: '仿真试算',
    simulation: '模拟仿真',
    splitOrder: '拆分订单', //拆分订单
    sortForm: '排序表单', //排序表单
    text: '按钮',
    virtualWarehous: '虚拟入库', //虚拟入库
    void: '作废',
    wrong_sending_forced_matching: '错发强制匹配',
    wrongCopy: "错发复制", //错发复制    
    show: '显示',
    hide: '隐藏',
  },

  pH: {
    a0: '（为空不做控制，关键字依次填写，用中文“；”隔开）',
    a1: '选择日期范围',
    a2: '请输入用户名',
    a3: '请输入密码',
    a4: '输入后请按Enter',
    a5: '请输入要查寻的功能名',
    a6: '请输入手机号',
    a7: '请输入验证码',
    a8: '请输入短信验证码',
    a9: '获取验证码',
    aa: '请输入拒绝打款原因',
    ab: '中台系统当前店铺的库存',
    ac: '线上平台当前店铺的库存',
    ad: '供货配销仓的可用库存的合计',
    ae: '',
    af: '',
    ag: '',
    ah: '',
    ai: '',
    aj: '',
    ak: '',
    al: '',
    am: '',
    an: '',
    ao: '',
    ap: '',
    aq: '',
    ar: '',
    as: '',
    at: '',
    au: '',
    av: '',
    aw: '',
    ax: '',
    ay: '',
    az: '',
    // b------------------------------------------------------------------------
    chargebackNumber: '请输入退单编号',
    consignee: '请输入收货人',
    enter: '请输入', //请输入 ,Please enter
    organizationCode_or_name: '请输入机构编码或名称', //请输入机构编码或名称,Please enter the organization code or name
    phone_number: '请输入手机号码',
    userName: '用户名', //用户名,User name
    z0: '多个平台单号，用逗号分隔',
    z1: '请输入平台单号',
    z2: '请选择订单状态',
    z3: '多个退供单号，用逗号隔开',
    z4: '请输入商品SKU',
  },

  unit: { // 单位
    yuan: '元',
    volume: '体积(cm3)',
    grossWeight: '毛重',
    netWeight: '净重',
    unit: '单位',
  },

  menu: { // 菜单labelName
    a0: '物流公司档案',
    a1: '新增逻辑仓',
    a2: '新增别名',
    a3: '新增区域',
    a4: '渠道仓档案',
    a5: '国家省市区编辑',
    a6: '组合福袋商品编辑',
    a7: '商品SPU',
    a8: '商品SKU',
    a9: 'SKU快速生成',
    aa: '商品自定义属性',
    ab: '组合商品',
    ac: '商品分类',
    ad: '促销活动',
    ae: '物流区域设置新增',
    af: '仓库物流优先级方案新增',
    ag: '快递赔付方案编辑',
    ah: '店铺授权',
    ai: '订单自动审核编辑',
    aj: '发货单派单规则',
    ak: '唯品会预警通知',
    al: '档期日程规划',
    am: '仓库物流设置',
    an: '商品价格策略',
    ao: '直播解析策略',
    ap: '分仓规则',
    aq: '分物流规则',
    ar: '特殊物流方案',
    as: '物流派送范围',
    at: 'HOLD单策略',
    au: '天猫换货策略',
    av: '审单策略',
    aw: '已发货退款单编辑',
    ax: '额外退款编辑',
    ay: 'JIT配货单-换吊牌',
    az: '退换货新增',
    // b------------------------------------------------------------------------
    b0: '退货单新增',
    b1: 'SKU编辑',
    b2: 'SPU编辑',
    b3: '快速生成',
    b4: '国家省市区',
    b5: '物流公司档案编辑',
    b6: '渠道仓编辑',
    b7: '退货单详情',
    b8: '换货单详情',
    b9: '',
    ba: '',
    bb: '',
    bc: '',
    bd: '',
    be: '',
    bf: '',
    bg: '',
    bh: '',
    bi: '',
    bj: '',
    bk: '',
    bl: '',
    bm: '',
    bn: '',
    bo: '',
    bp: '',
    bq: '',
    br: '',
    bs: '',
    bt: '',
    bu: '',
    bv: '',
    bw: '',
    bx: '',
    by: '',
    bz: '',
  },

  pL: { // 面板title
    // c------------------------------------------------------------------------
    c0: '退款又发货',
    c1: '退款未入库',
    c2: '退款后换货发货',
    c3: '急速退款发货预警',
    c4: '结算单产生汇总方式',
    c5: '结算单单号规则',
    c6: '参与对账单据类型',
    c7: '',
    c8: '',
    c9: '',
    ca: '',
    cb: '',
    cc: '',
    cd: '',
    ce: '',
    cf: '',
    cg: '',
    ch: '',
    ci: '',
    cj: '',
    ck: '',
    cl: '',
    cm: '',
    cn: '',
    co: '',
    cp: '',
    cq: '',
    cr: '',
    cs: '',
    ct: '',
    cu: '',
    cv: '',
    cw: '',
    cx: '',
    cy: '',
    cz: '',
    // a------------------------------------------------------------------------
    a0: '退货单',
    a1: '退换货单',
    a2: '退换货单详情',
    a3: '退单编号查询',
    a4: '等待出库',
    a5: '换货待发货',
    a6: '分仓规则编辑',
    a7: '商品明细',
    a8: '创建内容',
    a9: '入库单结单',
    aa: '创建条件',
    ab: '按未拣货数创建',
    ac: '入库单',
    ad: '拣货单',
    ae: '执行动作',
    af: '包裹属性',
    ag: '开始值 大于等于',
    ah: '结束值',
    ai: '区间范围',
    aj: '默认物流',
    ak: '单据金额',
    al: '物流信息',
    am: '包裹重量',
    an: '特殊物流方案新增',
    ao: '自动分配',
    ap: '按时间点创建',
    aq: '启用物流',
    ar: '物流分配',
    as: '备用条码',
    at: 'SKU基本信息',
    au: '创建拣货单',
    av: '创建入库单',
    aw: '物理属性',
    ax: '业务信息',
    ay: 'SKU信息',
    az: '供应商',
    // b------------------------------------------------------------------------
    b0: '供货逻辑仓',
    b1: '平台物流对应',
    b2: '物流单号解析配置',
    b3: '创建拣货单',
    b4: '固定属性',
    b5: '自定义属性',
    b6: '商品维度',
    b7: '修改类型',
    b8: '配销仓',
    b9: '共享池',
    ba: '比例',
    bb: '商家条码id',
    bc: '来源聚合仓名称',
    bd: '调入量',
    be: '配销仓库存梯度策略',
    bf: '强制寻源规则',
    bg: '共享库存',
    bh: '独享库存',
    bi: '来源配销仓名称',
    bj: '寻源规则',
    bk: '评分策略',
    bl: '已结案',
    bm: '订单收货地址',
    bn: '待分配',
    bo: '待传WMS',
    bp: '配货中',
    bq: '取消/作废',
    br: '平台发货失败',
    bs: '待换货',
    bt: '待确认-换货完成',
    bu: '已揽收',
    bv: '已签收',
    bw: '查询条件设置',
    bx: '传WMS失败',
    by: '传WMS成功',
    bz: '限制条件',
    edit_order_dispatch_rule: '订单派单规则编辑',
    add_claimForm: '赔付单新增', // 赔付单新增,Add ClaimForm
    add_retail_shipping_order: '零售发货单新增', //零售发货单新增
    addPromotion: '新增促销活动',
    addReturnOrder: '退换货订单新增', //退换货订单新增
    all: '全部',
    barCode_details: '条码明细',
    basicData: '基础资料', //基础资料
    batchAddPromotion: '批量新增促销活动',
    billingNoticeEdit: '开票通知编辑', //开票通知编辑
    brand_authority: '品牌权限', //品牌权限，Brand authority,
    combinedCommodity_details: '组合商品明细',
    combinedCommodity_edit: '组合商品档案编辑',
    combinedCommodity: '组合商品档案',
    commodity_authority: '商品权限', //商品权限,Commodity authority
    company_authority: '公司权限', //公司权限,Company authority
    details_claimForm: '赔付单详情', // 赔付单详情
    distributionCenter_authority: '配销中心权限', //配销中心权限，Distribution center authority,
    editPromotion: '编辑促销活动',
    enterInfo: '录入信息', //录入信息
    exchangeInfo: '换货人信息', //换货人信息
    express_compensation_scheme: '快递赔付方案',
    extraRefundEdit: '额外退款编辑', //额外退款编辑
    forcedStorage: '退换货订单', //退换货订单
    generate_replacement_order: '是否生成换货单',
    interface_download_taskTable_edit: '接口下载任务表编辑',
    interface_download_taskTable: '接口下载任务表',
    log: '日志',
    logisticsAreaSetting: '物流区域设置', //物流区域设置
    operationLog: '操作日志', //操作日志
    order_detailed: '订单明细', //订单明细
    orderManager_edit: '订单管理编辑', //订单管理编辑
    orderManager: '订单管理', //订单管理
    orderSplit: '订单拆分', //订单拆分
    payableAdjust_details: '赔付单明细', //赔付单明细
    payableAdjustmentList: '赔付单', //赔付单
    promotionList: '促销活动',
    refundSlipDetails: '退款单详情',
    retailInvoice_details: '零售发货单详情', //零售发货单详情
    retail_shipping_order: '零售发货单', // 零售发货单
    return_warehousing_manual_matching: '退货入库-手工匹配',
    return_warehousing_wrong_delivery_forced_matching: '退货入库-错发强制匹配',
    returnAmount: '退货金额', //退货金额
    returnAndExchange_info: '退换货信息', //退换货信息
    ReturnOrderDetails: '退换货订单详情', //退换货订单新增
    returnTreasury: '退货入库',
    returnTreasuryAdd: '退货入库新增',
    returnTreasuryDetails: '退货入库详情',
    role_authority: '角色权限', //角色权限,Role authority
    scanDetails: '扫描明细', //扫描明细
    scanInfo: '扫描信息', //扫描信息
    scannAndWarehous: '扫描入库', //扫描入库
    setWarehouseLogistics: '仓库物流优先级设置',
    supplier_authority: '供应商权限', //供应商权限,Supplier authority
    vipshopWarehouseEntry: '唯品会入库单',
    warehouse_authority: '店仓权限', //店仓权限,Warehouse authority'
    warehouse_logistics_priority_scheme: '仓库物流优先级方案',
    warehouse_receipt: '出仓单',
    JITchangeBrand: 'JIT配货单换吊牌',
  },

  fL: { // 检索表单label
    i0: '是否参与对账',
    i1: '结算类型',
    i2: '首字符',
    i3: '流水号位数',
    i4: '',
    i5: '',
    i6: '',
    i7: '',
    i8: '',
    i9: '',
    // h------------------------------------------------------------------------
    h0: '原因备注',
    h1: '收货在途',
    h2: '零售数量',
    h3: '收货在库',
    h4: '收货可用',
    h5: '调拨类型',
    h6: '导入状态',
    h7: '逻辑调拨',
    h8: '非逻辑调拨',
    h9: '逻辑调拨单批量导入',
    ha: '聚合仓调拨单',
    hb: '聚合仓到配销仓调拨单',
    hc: '配销仓调拨单',
    hd: '配销仓到聚合仓调拨单',
    he: '操作日期',
    hf: '单据是否完成',
    hg: '寻源策略表',
    hh: '仓优先',
    hi: '条件信息导入',
    hj: '共享池库存梯度策略',
    hk: '盘点日期',
    hl: '预盈亏明细按条码',
    hm: '调整性质',
    hn: '生成盈亏',
    ho: '盘点类型',
    hp: '盘点店仓',
    hq: '盈亏状态',
    hr: '店仓名称',
    hs: '预盈亏明细',
    ht: '驳回原因',
    hu: '分货确认单',
    hv: '下单日期',
    hw: '是否自动结算',
    hx: '结算产生时间',
    hy: '单据业务类型',
    hz: '是否产生结算单',
    // g------------------------------------------------------------------------
    g0: '发货门店编码',
    g1: '出库通知单',
    g2: '平台地址',
    g3: '修改内部备注',
    g4: '修改聚合仓',
    g5: '启用自动审核',
    g6: '检查可合并订单',
    g7: '零元订单自动审核',
    g8: '全赠品订单开启自动审核',
    g9: '等待审核时间',
    ga: '反审核等待时间',
    gb: 'hold单等待时间',
    gc: '自动审核货到付款',
    gd: '排除物流公司',
    ge: '手工订单',
    gf: '自定义标签',
    gg: '订单折扣范围',
    gh: '单条码数量上限',
    gi: '反审核等待时间',
    gj: '是否正常订单',
    gk: '是否预售订单',
    gl: '是否换货订单',
    gm: '启用',
    gn: '支付账号',
    go: '单据备注',
    gp: '传DRP状态',
    gq: '传DRP次数',
    gr: '传DRP失败原因',
    gs: '平台退款原因',
    gt: '可用库存',
    gu: '其它HOLD单',
    gv: '丢件类型',
    gw: '丢件原因',
    gx: '原单金额',
    gy: '责任方',
    gz: '责任人',
    // f------------------------------------------------------------------------
    f0: '配销仓明细',
    f1: '未同步',
    f2: '同步成功',
    f3: '同步失败',
    f4: '计算完成',
    f5: '计算中',
    f6: '商品类型',
    f7: '独享库存明细',
    f8: '查询条件',
    f9: '共享库存明细',
    fa: '特殊条码按比例同步策略',
    fb: '来源平台',
    fc: '平台店铺档案',
    fd: '范围时间',
    fe: '店仓档案',
    ff: '物流轨迹',
    fg: '商品金额',
    fh: '商品优惠金额',
    fi: '总金额',
    fj: '已支付金额',
    fk: '代收(COD)金额',
    fl: '参与收货仓',
    fm: '促销大类',
    fn: '促销中类',
    fo: '选择活动类型',
    fp: '设置促销活动',
    fq: '试算并发布',
    fr: '活动频次',
    fs: '预售天数',
    ft: '活动范围',
    fu: '参与时间范围',
    fv: '活动方案',
    fw: '平台编号',
    fx: '是否自提',
    fy: '商品重量(KG)',
    fz: '发货门店名称',
    // e------------------------------------------------------------------------
    e0: '失败原因',
    e1: '详细信息',
    e2: '预计发货时间',
    e3: '自动同意换货',
    e4: '自动拒绝换货',
    e5: '退款申请时间',
    e6: '电话',
    e7: '邮编',
    e8: '平台交易状态',
    e9: '配送区域',
    ea: '拒绝打款原因',
    eb: '系统赠品',
    ec: '平台赠品',
    ed: '入库单号',
    ee: '到货仓',
    ef: '商品总数量',
    eg: '本单件数',
    eh: '原单件数',
    ei: '入库日期',
    ej: '大促',
    ek: '活动',
    el: '日常',
    em: '自动补货数量限制',
    en: '拣货单创建时间',
    eo: '唯品会专配',
    ep: '非唯品会专配',
    eq: '原角色',
    er: '目的角色',
    es: '名称',
    et: '复制方式',
    eu: '覆盖原有权限',
    ev: '保留原有权限',
    ew: '实体店仓',
    ex: '平台店铺',
    ey: '共享池档案',
    ez: '比例同步策略',
    // a------------------------------------------------------------------------
    a0: '收货地址就近',
    a1: '唯品会',
    a2: '仓库优先级',
    a3: '发货比例',
    a4: '发货数量',
    a5: '按收货地址',
    a6: '派单规则明细',
    a7: '分仓比例',
    a8: '杭州店仓',
    a9: '计算虚高库存前库存',
    aa: '省市区',
    ab: '详细地址',
    ac: '非赠品',
    ad: '应退运费',
    ae: '最终应退总金额',
    af: '发货实体仓',
    ag: '平台状态',
    ah: '订单金额',
    ai: '商品总金额',
    aj: '订单总金额',
    ak: '实付金额',
    al: '红包',
    am: '代收COD金额',
    an: '多包裹',
    ao: '服务单号',
    ap: '店铺授权',
    aq: '店铺昵称',
    ar: '完善信息',
    as: '授权有效时间',
    at: '卖家姓名',
    au: '所在省',
    av: '所在市',
    aw: "所在区\县",
    ax: '卖家地址',
    ay: '授权指引',
    az: '添加排除区域',
    b0: '切换为sku商品显示',
    b1: '切换为平台商品明细',
    b2: '零售价合计',
    b3: '商品优惠',
    b4: '订单优惠金额',
    b5: '支持省份',
    b6: '排除省份',
    b7: '删除区域',
    b8: '支持范围',
    b9: '申请时间',
    ba: '商品数字ID',
    bb: '省市搜索',
    bc: '策略ID',
    bd: '策略名称',
    be: '生效开始时间',
    bf: '生效结束时间',
    bg: '启用状态',
    bh: '最低成交单价',
    bi: '识别规则',
    bj: '支付时间',
    bk: '主播ID',
    bl: '主播昵称',
    bm: '订单标签',
    bn: '“播”标',
    bo: '日程规划名称',
    bp: '规划开始时间',
    bq: '规划结束时间',
    br: '补货独立入库',
    bs: '唯品会仓库',
    bt: '拣货单类型',
    bu: '未拣货数维度',
    bv: '创建峰值',
    bw: '自动拣货间隔时间',
    bx: '补货单',
    by: '预调拨',
    bz: '承运商',
    c0: '航空禁运',
    c1: '发货间隔',
    c2: '当日',
    c3: '次日',
    c4: '发货时间',
    c5: '到货间隔',
    c6: '到货时间',
    c7: '入库单结单时间',
    c8: '单PO下唯品会仓库维度',
    c9: 'PO维度',
    ca: '空运',
    cb: '汽运',
    cc: '拣货单创建方式',
    cd: '直播商品识别',
    ce: '换货地址',
    cf: '换货说明',
    cg: '或',
    ch: '偏差N元同意换货<=',
    ci: '有',
    cj: '没有',
    ck: '缺货自动拒绝',
    cl: '缺货自动拒绝换货原因',
    cm: '缺货自动拒绝文案',
    cn: '偏差N元自动拒绝',
    co: '偏差N元拒绝换货>',
    cp: '偏差N元自动拒绝换货原因',
    cq: '偏差N元自动拒绝文案',
    cr: '商品实退金额',
    cs: '最终实退总金额',
    ct: '订单优惠',
    cu: '零售价',
    cv: '查询原平台单号',
    cw: '最低成交价格',
    cx: 'PO编号',
    cy: '组合商品编码',
    cz: '组合商品名称',
    // d------------------------------------------------------------------------
    d0: '组合类型',
    d1: '普通组合明细',
    d2: '福袋组合明细',
    d3: '每组抽取数',
    d4: '销售状态',
    d5: '采购价',
    d6: '成本价',
    d7: '默认供应商',
    d8: '产品介绍',
    d9: "渠道仓编码",
    da: '渠道仓名称',
    db: '供货比例',
    dc: '区域编码',
    dd: '区域名称',
    de: '别名名称',
    df: '区域类型',
    dg: '国家',
    dh: '省份',
    di: '市级',
    dj: '区级',
    dk: '关联省',
    dl: '关联市',
    dm: '关联国家',
    dn: '关联区县',
    do: '前缀',
    dp: '后缀',
    dq: '平台物流编号',
    dr: '平台物流名称',
    ds: '物流公司编码',
    dt: '物流公司名称',
    du: '逻辑仓编码',
    dv: '逻辑仓名称',
    dw: '所属实体仓',
    dx: '仓库类型',
    dy: '主仓',
    dz: '负库存控制',
    type: '类型',
    ruleName: '规则名称',
    aconsignee_address: '收货人地址',
    aconsignee_area: '收货人区', //收货人区,
    activityDate: '活动日期',
    activityName: '活动名称',
    activityType: '活动类型',
    actualRefundAmount: '实际退款金额', //实际退款金额
    addressee_phone: '收件人手机', //收件人手机
    addressee: '收件人', //收件人
    adjustmentType: '调整类型',
    adjustEndTime: '调整结束时间', //调整结束时间
    apply_refundAmount: '申请退款金额',
    autoMatch: '是否自动匹配', //是否自动匹配
    automaticRelease: '自动释放',
    bankAccountNo: '开户行账号',
    bankOFdeposit: '开户银行',
    bar_code_does_not_match: '鞋盒条码与实物条码不符', //鞋盒条码与实物条码不符
    barCode: '条码', //条码
    bar_code: '条码编码',
    batchNumber: '批次号',
    batch_number: '批次编号',
    billing_status: '开票状态',
    billNo: '单据编号',
    billStatus: '单据状态',
    billType: '单据类型',
    buyer_HOLD: '买家HOLD单',
    buyer_message: '买家留言',
    buyerNotes: '买家备注', //买家备注
    BuyerPhoneNumber: '买家手机号', //买家手机号
    cellPhone_number: '手机号',
    changeOrderModify_time: '换货单修改时间',
    changeOrderStatus: '换货单状态',
    changeWarehouse_reasons: '改仓原因',
    channelType: '渠道类型', //
    chargebackModifyTime: '退单修改时间',
    chargebackNumber: '退单编号', //退单编号
    chargebackStatus: '退单状态',
    choose_product_ways: '选择商品方式',
    closingMan: '结案人',
    closingTime: '结案时间',
    collection_amount: '代收金额', //代收金额
    combinedCommodityType: '组合商品类型',
    commodityCode: '商品条码',
    commodityID: '商品ID',
    companyAddress: '公司地址',
    complete: '完成',
    confirmed_as_JITX: '确认为JITX',
    confirmed_as_non_JITX: '确认为非JITX',
    confirming: '确认中',
    consignee_city: '收货人市', //收货人市
    consignee_phone: '收货人手机', //收货人手机
    consignee_postcode: '收货人邮编', //收货人邮编
    consignee_province: '收货人省份', //收货人省份
    consignee_tel: '收货人电话', //收货人电话
    consignee: '收货人', //收货人
    contactNumber: '联系电话', //联系电话
    create_and_download: '创建并下载拣货单',
    creationDate: '创建日期', //
    current_remarks: '当前备注:',
    custAuditDate: '客审日期', //
    defectiveProduct_allocation_status: '次品调拨状态',
    defectiveProductRecord: '次品记录',
    deliverGoodsAddress: '发货地址', //发货地址
    delivery_warehouse: '发货仓库', //发货仓库
    depositOrderNo: '押金订单号',
    distribution_costs: '配送费用', //配送费用
    distribution_logistics: '配送物流', //配送物流
    distributionMode: '配送方式',
    documentDate: '单据日期', //单据日期
    double_gifts: '赠品翻倍',
    downloadOnly: '仅下载拣货单',
    downloadType: '下载类型',
    delayDate: '延期日期',
    effectiveDate: '生效日期',
    electronic_invoice: '电子发票',
    endDate: '结束日期',
    endTime: '结束时间',
    enterprise: '企业',
    exchangeDetails: '换货明细',
    exchangePending: '换货待处理',
    exchangePlatform_no: '换货平台单号',
    exchangePostage: '换货邮费',
    expressCompanyName: '快递公司名称', // Name of express company
    expressOutlets: '快递网点', //
    financeAuditDate: '财审日期', //
    free_quantity: '赠送数量',
    freight: '运费', //
    fullName: '姓名',
    gBCode: '国标码',
    gift: '赠品',
    giving_ways: '赠送方式',
    goods_participation_mode: '商品参与方式',
    goods_source: '商品来源',
    goodsMark: '商品标记', //商品标记
    goodsName: '商品名称', //商品名称
    goodsPID: '商品PID',
    gradient_gift: '梯度赠送',
    handler: '处理人',
    hOLD_reason: 'HOLD单原因',
    identificationNo: '识别号',
    in_order_stockNo: '入库单单号',
    in_warehouse: '入库仓库',
    internalRemarks: '内部备注', //内部备注
    invoice_or_not: '是否开票', //是否开票
    invoice_remarks: '发票备注',
    invoice_type: '发票类型',
    invoiceTitle_type: '抬头类型',
    invoiceTitle: '发票抬头',
    is_there_no_original_barcode: '是否无原单条码', //是否无原单条码
    issueBarcode: '发出条码', //发出条码
    ladderType: '阶梯类型',
    live_HOLD: '直播HOLD单',
    logic_warehouse: '逻辑仓库',
    logisticsCompany: '物流公司',
    logisticsNo: '物流编号',
    logisticsOrder_No: '物流单号', //物流单号
    lotType: '批次类型', //批次类型
    mailbox: '邮箱',
    match_smart_address: '智能匹配地址', //智能匹配地址
    max_doubling_times: '最大翻倍次数',
    max_times: '最大次数',
    meet_conditions: '满足条件',
    modify_remarks: '修改备注:',
    multiple: '倍数',
    namePayee: '收款人姓名', //收款人姓名
    newlyBuild: '新建',
    normal: '正常', //正常
    numberCode: '数字编号',
    offline_stores: '线下门店',
    offlineTime: '下线时间',
    one_participation_times: '单个买家参与活动次数',
    operator: '操作人',
    order_notes: '订单备注',
    orderNumber: '订单号', //订单号
    orderShop: '下单店铺', //下单店铺
    orderType: '订单类型',
    order_time: '订单时间',
    out_date: '出库日期',
    original_out_date: '原始出库日期', //
    originalDeliveryWarehouse: '原发货仓',
    originalOrder_No: '原单单号', //原单单号
    originalOrderNo: '原始订单编号', //原始订单编号
    originalOrderPlatform: '原平台单号', //原平台单号
    originalPlatformNo: '原始平台单号', //原始平台单号
    ownership: '日程归属',
    paper_invoice: '纸质发票',
    payableAdjustReason: '赔付原因',
    payableAdjustStandard: '赔付标准',
    payableAdjustType: '赔付类型', //
    payment_info: '支付信息', //支付信息
    paymentMethod: '付款方式', //付款方式
    personal: '个人',
    phone_number: '手机号码', //手机号码
    physicalWarehouseFile: '实体仓档案',
    physicalWarehouseName: '实体仓名称',
    pickingOrder_no: '拣货单号',
    platform_billNo: '平台单号',
    platform_marking: '平台标记',
    platform_returnOrder_no: '平台退货单号',
    platformCommodityID: '平台商品ID',
    platformExchangeOrder_no: '平台换货单号',
    PlatformModifyTime: '平台修改时间',
    platformProductsCode: '平台商品编码',
    platformProductsName: '平台商品名称',
    platformRefundNo: '平台退款单号',
    platformTime: '平台时间',
    platformType: '平台类型',
    preferential_info: '优惠信息', //优惠信息
    price: '价格',
    processor_remarks: '处理人备注',
    promotion_status: '促销状态',
    processing_status: '处理状态',
    promotionNo: '促销编号',
    proReturnStatus: '退货状态',
    purchase_ranking: '购买排名',
    purchaseQuantity: '购买数量', //购买数量
    qualityGoods: '正品', //正品
    queryTime: '查询时间',
    orderTime: '下单时间',
    reasonRefund: '退款原因', //退款原因
    receiptAddress: '收票地址',
    receivedBarcode: '实收条码', //实收条码
    receivedGBcode: '实收国标码', //实收国标码
    receiver_mobileNo: '收货人手机号',
    receiving_province: '收货省份',
    refundAmount: '退款金额', //退款金额
    refundClass: '退款分类', //退款分类
    refundDescription: '退款描述', //退款描述
    refundNoteDelivered: '已发货退款单', //已发货退款单
    refundOnly: '仅退款',
    refundType: '退款类型',
    region_details: '区域明细',
    release_after_fixedTime: '固定时长后释放',
    release_specified_timePoint: '指定时点释放',
    release_timePoint: '释放时点',
    remarks_content: '备注内容',
    remarksResponsibleParty: '判责方备注', //判责方备注
    reservedStockExchange: '换货预留库存',
    responsibleParty: '判责方', //判责方
    returnBatch: '退货批次', //退货批次
    returnDetails: '退货明细',
    returnLogisticsCompany: '退回物流公司', //退回物流公司
    returnLogisticsNumber: '退回物流单号',
    returnNo: '退供单号',
    returnNotes: '退换货备注', //退换货备注
    returnOrder_no: '退换货单号', //退换货单号
    returnOrderLog: '退货单日志',
    returnQuantity: '退货数量', //退货数量
    returnRefund: '退货退款',
    returnInformation: '返回信息',
    reviewer: '审核人',
    routing_info: '路由信息', //路由信息
    salesReturn_to_warehouse: '销退入库仓', //销退入库仓
    scansNumber: '扫描数量', //扫描数量
    scheduleOwnership: '档期日程归属',
    schemeDescription: '方案描述',
    schemeName: '方案名称',
    sellerNotes: '卖家备注', //卖家备注
    sending_address: '发件地址',
    service_charge: '服务费', //服务费
    settlement_price: '结算价',
    shipPhysicalWarehouse: '发货实体仓库',
    shipping_info: '发货信息', //发货信息
    skuName: 'SKU名称', //SKU名称
    source_billNo: '来源单据编号',
    sourceDocuments: '单据来源', //单据来源
    sourceNo: '来源单号',
    special_invoice: '专用发票',
    specialTreatmentType: '特殊处理类型', //特殊处理类型
    specs: '规格', //规格
    status_in_warehouse: '仓内状态', //仓内状态
    startTime: '开始时间', //开始时间
    staySellerAgrees: '待卖家同意',
    store: '门店', //门店
    storeID: '店铺ID',
    supplierID: '供应商ID',
    synchronizationStatus: '同步状态',
    synchronizedInventory: '同步库存数',
    telephoneNumber: '电话号码',
    ticket_info: '收票信息',
    timeRange: '时间范围',
    timeType: '时间类型',
    transactionAmount: '成交金额', //成交金额
    transportationMode: '运输方式',
    undeliveredCancel: '未发货取消',
    ungraded: '次品', //次品
    virtual_barcode: '虚拟条码',
    waitFor_afterSale_confirm: '等待售后确认', //等待售后确认
    waitFor_afterSale_review: '等待售后审核', //等待售后审核
    waitFor_return_warehous: '等待退货入库', //等待退货入库
    warehouse: '仓库',
    warehousingEntity: '入库实体仓库',
    whether_returned: '是否原退', //是否原退
    wMS_billNo: 'WMS单据编号',
    workOrder: '工单', //工单
    wrongOrNot: '是否错误',
    payAccount: '支付账号',
  },

  tL: { // 表头、表脚、表统计
    // a------------------------------------------------------------------------
    b0: '分货退货数量',
    b1: '聚合调拨数量',
    b2: '分货数量',
    b3: '寻源层级',
    b4: '发货方编码',
    b5: '发货方名称',
    b6: '收货方编码',
    b7: '收货方名称',
    b8: '总数量',
    b9: '传TMS失败',
    ba: '传DRP失败',
    bb: '已回单',
    bc: 'WMS实缺',
    bd: '其他',
    be: '打开',
    bf: '生效',
    bg: '已调度',
    bh: '待发运',
    bi: '在途',
    bj: '签收',
    bk: '行合计',
    bl: '未开始',
    bm: '导入中',
    bn: '已完成',
    bo: '异常终止',
    bp: '全盘',
    bq: '抽盘',
    br: '历史盘',
    bs: '分类全盘',
    bt: '未盈亏',
    bu: '已盈亏',
    bv: '盈亏单',
    bw: '盘盈',
    bx: '盘亏',
    by: '串码',
    bz: '',
    // c------------------------------------------------------------------------
    c0: '',
    c1: '',
    c2: '',
    c3: '',
    c4: '',
    c5: '',
    c6: '',
    c7: '',
    c8: '',
    c9: '',
    ca: '',
    cb: '',
    cc: '',
    cd: '',
    ce: '',
    cf: '',
    cg: '',
    ch: '',
    ci: '',
    cj: '',
    ck: '',
    cl: '',
    cm: '',
    cn: '',
    co: '',
    cp: '',
    cq: '',
    cr: '',
    cs: '',
    ct: '',
    cu: '',
    cv: '',
    cw: '',
    cx: '',
    cy: '',
    cz: '',
    // a------------------------------------------------------------------------
    itemNo01: 'SPU编码',
    itemNo02: 'SPU名称',
    a0: '期初可售数',
    a1: '变化数量',
    a2: '期末可售数',
    a3: '日程归属名称',
    a4: '实体可用数量',
    a5: '平台商品',
    a6: '上架状态',
    a7: '同步比例',
    a8: '平台库存下载时间',
    a9: '差异数',
    aa: '配销仓库存',
    ab: '安全库存',
    ac: '最后同步数',
    ad: '最后同步时间',
    ae: '同步失败的原因',
    af: '平台条码',
    ag: '来源配销仓',
    ah: '配销仓类型',
    ai: '来源仓库存',
    aj: '占用数',
    ak: '可用数',
    al: '来源聚合仓',
    am: '来源共享池',
    an: '店铺库存',
    ao: '判断条件',
    ap: '开始值',
    aq: '渠道内配销仓库存',
    ar: '渠道外配销仓库存',
    as: '计算状态',
    at: '平台库存',
    au: '发货方编码',
    av: '发货方名称',
    aw: '收货方编码',
    ax: '收货方名称',
    ay: '申请调拨数量',
    az: '实际调拨数量',
    internationalCode: '国际码',
    abbreviation: '简称',
    abnormalInfo: '异常信息', //异常信息
    activity_period: '活动时间段',
    actual_barcode: '实际发出条码',
    actual_transactionPrice: '实际成交价',
    add_manually: '是否手工新增',
    adjustment_amount: '调整金额', //调整金额
    aequenceNo: '顺序号',
    after_modification: '修改后',
    alipay: '支付宝号',
    amountDue: '应付金额',
    appleNumber: '申请数量', //申请数量
    articleNumber: '货号',
    auditTime: '审核时间', //审核时间
    before_modification: '修改前',
    brand: '品牌', //品牌 ,brand
    buyerNickname: '买家昵称', //买家昵称
    check_mainStore: '查看主店仓', //查看主店仓 ,Check the main store
    code_SKU: 'SKU编码',
    code: '编码',
    commodityDataNo: '商品数据编号',
    commoditySKU: '商品SKU',
    companyCode: '公司编码', //公司编码 ,Company code
    companyName: '公司名称', //公司名称 ,Company name
    compensation_expressCompany: '赔付快递公司',
    creationTime: '创建时间', //创建时间
    creator: '创建人',
    custAuditMan: '客审人',
    custAuditTime: '客审时间', //
    custName: '顾客姓名',
    custTelephone: '顾客电话',
    discount: '折扣',
    delivered_quantity: '已送数量',
    deliveryWarehouse_code: '发货仓库编码',
    deliveryWarehouse_name: '发货仓库名称',
    description: '说明', //说明 ,Description
    distribution_amount: '分销金额',
    distributionCenterCode: '配销中心编码', //配销中心编码 ,Distribution Center Code
    distributionCenterName: '配销中心名称', //配销中心名称 ,Distribution Center Name
    distributionTime: '配货时间', //配货时间
    edit: '编辑', //编辑 ,edit
    equal_amount: '平摊金额',
    exchangeQuantity: '换货数量', //换货数量
    expressCode: '快递编码',
    expressCompany: '快递公司',
    expressName: '快递名称',
    expressNo: '快递单号',
    extendedProperties: '扩展属性',
    failure_offline_time: '失效下线时间',
    financeAuditMan: '财审人',
    financeAuditTime: '财审时间', //
    flag: '旗帜', //旗帜
    gender: '性别', //性别
    generate_adjustment: '是否生成调整单',
    generate_error_adjustment: '是否生成错发调整单',
    generate_punching_headless_adjustment: '是否生成冲无头件调整单',
    generate_stock: '是否生成入库单',
    giftItemCode: '赠品商品编码',
    giftItemName: '赠送商品名称',
    given_total_quantity: '赠送总计数量',
    goodsInfo: '商品信息', //商品信息
    grouping: '分组',
    groupName: '分组名称',
    in_warehouse_goods_details: '入库单商品明细',
    itemNo: '商品款号',
    logContent: '日志内容',
    logicWarehouse: '逻辑仓',
    mainStore_warehouse: '制单主店仓', //制单主店仓 ,Main store warehouse
    match_or_not: '是否匹配',
    materialShortage: '实物报缺',
    modificationTime: '修改时间',
    new_address: '新地址',
    new_detailed_address: '新详细地址',
    new_receivingInfo: '新收货信息',
    no_original_barcode: '是否无原单条码',
    number_of_rows_per_group: '每组抽取行数',
    operation_description: '操作描述',
    operation: '操作',
    operatorName: '操作姓名',
    operatorTime: '操作时间',
    orderIdentification: '订单标识',
    orderNo: '订单编号',
    orderQuantity: '订单数量',
    orderTime: '下单时间', //下单时间
    original_deliveryWarehouse: '原发货仓库', //原发货仓库
    original_groupName: '原分组名称', //原分组名称
    outOfStock_quantity: '缺货数量',
    participating_stores: '参与店铺',
    payable_unitPrice: '应付单价',
    paymentTime: '付款时间', //付款时间
    paymentWay: '支付方式',
    per_given_quantity: '每次赠送数量',
    physical_warehouse: '实体仓库',
    physicalWarehouse: '实体仓',
    platform_barcode_ID: '平台条码ID',
    platform_model_ID: '平台款号ID',
    platform_orderNo: '平台单号', //平台单号
    platformInfo: '平台信息', //平台信息
    platform_store_title: '平台店铺标题',
    preferential_amount: '优惠金额', //优惠金额
    priority: '优先级',
    product_title: '商品标题',
    productName: '商品名称', //商品名称 ,Product Name
    productNo: '商品编码', // 商品编码,Product Number
    productSKUname: '商品SKU名称',
    promotionName: '促销名称',
    quantities: '数量',
    quantity_availableSale: '可售数量',
    quantity_demolished: '待拆数量',
    quantity_split: '拆分数量',
    receivingInfo: '收货信息', //收货信息
    refund_status: '退款状态',
    remarks: '备注',
    replicationReason: '复制原因', //复制原因
    rest_sent: '剩余可送',
    return_warehousing_log: '退货入库日志',
    returnGood: '退货',
    returnGoods: '退换货',
    revised_content: '修改内容',
    reviser: '修改人',
    roles: '角色', //角色 ,Roles
    rows: '行', //行 ,ROWS
    scanDeliveryTime: '扫描出库时间', //扫描出库时间
    seller_nickname: '卖家昵称',
    sensitiveColumn: '敏感列', //敏感列 ,Sensitive column
    serialNo: '序号', //序号 ,No
    settlementAmount: '结算金额',
    shippingAddress: '收货地址', //收货地址
    shopName: '店铺名称',
    standardPrice: '标准价',
    status: '状态',
    stock: '库存',
    storageQuantity: '入库数量',
    storehouse: '店仓', //店仓 ,Storehouse
    supplier_fullName: '供应商全称', // 供应商全称,Supplier's full name
    supplierCode: '供应商编码', //供应商编码 ,Supplier Code
    supplierName: '供应商名称', // 供应商名称,Supplier name
    suggested_deliveryWarehouse: '建议发货仓库', // 建议发货仓库
    tagPrice: '吊牌价', //吊牌价
    total_amountDue: '总应付金额',
    total: '总计', //总计 ,TOTAL
    totalOrderAmount: '订单总额', //订单总额
    totalSettlement: '结算总额',
    transactionAmount: '成交金额', //成交金额
    turnOff_match: '是否关闭匹配',
    unitPrice: '成交单价',
    unitPriceSettlement: '结算单价',
    unitReturnAmount: '单件退货金额',
    usable: '可用',
    view: '查看', //查看 ,view
    vip_nickname: '会员昵称',
    voidMan: '作废人',
    voidTime: '作废时间',
    warehouseName: '仓库名称',
    warehouseNo: '仓库编号',
    whetherGift: '是否赠品', //是否赠品
  },

  mT: { // 弹窗title
    az: '店铺库存 - 平台库存',
    ay: '店铺当前平台条码ID的保底量',
    ax: '',
    aw: '停用',
    av: '',
    au: '',
    at: '',
    as: '',
    ar: '',
    aq: '弹框多选',
    ap: '修改单据备注',
    ao: '会员加急发货打标',
    an: '中台系统当前店铺的库存',
    am: '店仓评分设置表',
    al: '成功',
    ak: '停止/开启平台库存同步',
    aj: '批量修改折扣',
    ai: '其他平台',
    ah: '批量替换下挂商品',
    ag: '售后复制',
    af: '店铺新增',
    ae: '满足以下条件的单据打“播”标',
    ad: '满足以下条件的单据会进行hold单',
    ac: '添加商品-已选',
    ab: '分仓策略-导入',
    aa: '清除失败提示框',
    th1: "替换前商品",
    th2: "替换后商品",
    a0: '店铺商品特殊设置明细', // 店铺商品特殊设置明细
    a1: '被替换商品SKU', // 被替换商品SKU
    a2: '批量新增条件信息导入', // 批量新增条件信息导入
    a3: '请选择仓库',
    a4: '替换后商品SKU',
    a5: '报错信息',
    a6: '提示信息',
    a7: '弹框多选',
    a8: '提示框',
    a9: '匹配失败提示框',
    // * 看开始的地方 aa…… 在上面
    add_adjustmentListDetails: '新增应付调整单明细', // 新增应付调整单明细
    batchImport: '批量导入', //批量导入
    blacklist: '加入黑名单', //加入黑名单
    data: '数据', //数据
    deleteDetails: '删除明细', //删除明细
    error: '错误', // 错误
    import: '导入', //导入 ,IMPORT
    manualWarehous: '手动入库', //手动入库
    matrixEntry: '矩阵录入', //矩阵录入
    modify_logisticsCompany: '修改物流公司', //修改物流公司
    modify_returnWarehouse: '修改退货仓库', //修改退货仓库
    modify_sellerNotes: '修改卖家备注', //修改卖家备注
    modify_shipping_address: '修改收货地址', //修改收货地址
    newReturnDetails: '新增退货明细', //新增退货明细
    orderDownload: '订单下载', // 订单下载
    originalChargebackDetails: '原始退单明细', // 原始退单明细
    query_OriginalOrderNo: '查询原始订单编号', // 查询原始订单编号
    select_logisticsCompany: '请选择物流公司', // 请选择物流公司
    sortForm: '排序表单', //排序表单
    tips: '提示', //提示 ,TIPS
    title: '标题', // 标题
    warning: '警告', //警告 ,WARNINGRNING
    postpone: '延期', //延期
    z0: '库存按查询条件同步', // 库存按查询条件同步
    z1: '商品按查询条件同步', // 商品按查询条件同步
  },

  tip: tipsMessage,
}