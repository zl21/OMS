
// 数据约定 和 外键关联
import axios from 'axios';
import R3 from '@syman/burgeon-r3';
import service from '@/service/index';

const { store } = R3;
const groups = {
  platformTabs: [
    {
      title: '手机',
      value: 'WAP'
    },
    {
      title: '嗨淘',
      value: 'HITAO'
    },
    {
      title: 'TOP平台',
      value: 'TOP'
    },
    {
      title: '普通淘宝',
      value: 'TAOBAO'
    },
    {
      title: '聚划算',
      value: 'JHS'
    }
  ],
  orderTypes: [
    {
      title: '正常',
      value: '1'
    },
    {
      title: '换货',
      value: '2'
    },
    {
      title: '补发',
      value: '3'
    },
    {
      title: '预售',
      value: '9'
    },
    {
      title: '虚拟',
      value: '8'
    }
  ],
  actiTypes: [
    {
      title: '指定买赠',
      value: 'GA'
    },
    {
      title: '全场买赠',
      value: 'PA'
    }
  ],
  timeTypes: [
    {
      title: '下单时间',
      value: '1'
    },
    {
      title: '付款时间',
      value: '2'
    },
    {
      title: '定金时间',
      value: '3'
    }
  ],
  orderRemarks: [
    {
      title: '买家留言',
      value: '1'
    },
    {
      title: '卖家备注',
      value: '2'
    }
  ],
  gradientGift: [ // 梯度赠送
    {
      title: '否',
      value: '0'
    },
    {
      title: '是',
      value: '1'
    }
  ],
  buyerLimitFrequency: [ // 活动次数
    {
      title: '不限制',
      value: '0'
    },
    {
      title: '限制',
      value: '1'
    }
  ],
  productsJoin: [ // 商品参与方式
    {
      title: '非搭配商品',
      value: '1'
    },
    {
      title: '搭配商品',
      value: '2'
    }
  ],
  productsOrigin: [ // 商品来源
    {
      title: '系统商品SKU',
      value: '1'
    },
    {
      title: '平台SKUID',
      value: '2'
    },
    {
      title: '系统商品款号',
      value: '3'
    },
    {
      title: '平台商品ID',
      value: '4'
    }
  ],
  includeOrExclude: [ // 选择商品方式
    {
      title: '包含以下商品',
      value: '1'
    },
    {
      title: '排除以下商品',
      value: '2'
    }
  ],
  stepsType: [ // 阶梯类型
    {
      title: '数量阶梯',
      value: 'QTTY'
    },
    {
      title: '金额阶梯',
      value: 'AMOUNT_LIST'
    }
  ],
  giftDoubles: [ // 赠品翻倍
    {
      title: '不翻倍',
      value: '0'
    },
    {
      title: '翻倍',
      value: '1'
    }
  ],
  giftMethods: [ // 赠送方式
    {
      title: '全部送',
      value: '1'
    },
    {
      title: '顺序送',
      value: '2'
    },
    {
      title: '随机送',
      value: '3'
    }
  ],
  batchGiftMethods: [ // 批量赠送方式
    {
      title: '全部送',
      value: '1'
    }
  ],
  diffFilterPdts: [ // 满足条件 单选商品
    {
      title: '买商品列表不同商品',
      value: '1'
    },
    {
      title: '买商品列表任意商品',
      value: '2'
    },
  ]
};

const colGroups = function () { };
colGroups.prototype.groups = {};
colGroups.prototype.columnIds = {};

colGroups.prototype.getSelect = function () {
  if (!$.isEmptyObject(this.groups)) return this.groups;
  axios({
    method: 'get',
    url: '/p/cs/pm/v1/selectInit',
    params: {
      param: {}
    }
  }).then((res) => {
    if (res.data.code === 0) {
      this.groups = Object.assign(groups, res.data.data || []);
      store.commit('customize/forginkeys', { key: 'groups', value: this.groups });
    }
  });
};

colGroups.prototype.getPromField = async function () {
  if (!$.isEmptyObject(this.columnIds)) return this.columnIds;
  const res = await service.common.getPromField();
  if (res.data.code === 0) {
    console.log('getPromField------', res.data.data);
    this.columnIds = res.data.data || {};
    store.commit('customize/forginkeys', { key: 'columnIds', value: this.columnIds });
  }
};

colGroups.prototype.load = function () {
  this.getSelect();
  this.getPromField();
};

export default new colGroups();
