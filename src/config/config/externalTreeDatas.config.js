/* 树结构界面配置 */

import service from '@/service/index';

// paramObj is assigned a value but never used  no-unused-vars
const tableNameList = [
  {
    table: 'CP_C_HRORG', // 组织档案
    center: 'userCenter',
    api: 'hrorgTree',
    json: {
      tableName: 'CP_C_HRORG'
    },
  },
  {
    table: 'GROUPS_VIRTUAL_TABLE', //角色档案 
    center: 'userCenter',
    api: 'groupsTree',
  },
  {
    table: 'USERS', //用户档案 
    center: 'userCenter',
    api: 'hrorgTree',
    json: {
      tableName: 'USERS',
    },
    query: {
      CP_C_HRORG_ID: 'ID'
    },
  },
  {
    table: 'ST_C_ORDER_WAREHOUSE', // 分仓规则
    center: 'strategyPlatform',
    api: 'strategyTree',
    json: {
      tableName: 'ST_C_ORDER_WAREHOUSE'
    },
    query: {
      CP_C_SHOP_IDS: 'ID'
    }
  },
  {
    table: 'PS_C_PRO_CLASSIFY', // 商品分类
    center: 'commodityCenter',
    api: 'queryClassifyTree'
  },
  {
    table: 'ST_C_SYNC_STOCK_STRATEGY', // 同步店铺库存策略
    center: 'strategyPlatform',
    api: 'strategyTree',
    json: {
      tableName: 'ST_C_SYNC_STOCK_STRATEGY'
    }
  },
  {
    table: 'ST_C_SHOP_STRATEGY', // 店铺库存策略/店铺策略
    center: 'strategyPlatform',
    api: 'strategyTree',
    json: {
      tableName: 'ST_C_SHOP_STRATEGY'
    }
  },
  {
    table: 'V_CP_C_REGION_ALIAS', // 国家省市区
    center: 'basicData',
    api: 'selectTree',
    query: {
      CP_C_REGION_ID: 'ID'
    }
  },
  {
    table: 'ST_C_VIPCOM_PROJECT', // 档期日程规划
    center: 'strategyPlatform',
    api: 'getScheduleTree',
    query: {
      CP_C_SHOP_ID: 'ID'
    }
  },
  {
    table: 'ST_C_ASSIGN_LOGISTICS', // 物流规则
    center: 'strategyPlatform',
    api: 'ST_C_ASSIGN_LOGISTICSselectTree',
    query: {
      CP_C_PHY_WAREHOUSE_ID: 'ID'
    }
  },
  {
    table: 'ST_C_WAREHOUSE_LOGISTICS_SET', // 仓库物流设置
    center: 'strategyPlatform',
    api: 'getLogisticsTree',
    query: {
      CP_C_PHY_WAREHOUSE_ID: 'ID'
    }
  },
  {
    table: 'ST_C_AUTO_AUDIT', // 审单策略
    center: 'strategyPlatform',
    json: { tableName: 'ST_C_AUTO_AUDIT' },
    api: 'strategy',
    query: {
      CP_C_PHY_WAREHOUSE_ID: 'ID'
    }
  },
  {
    table: 'ST_C_MERGE_ORDER', // 合单策略
    center: 'strategyPlatform',
    json: { tableName: 'ST_C_MERGE_ORDER' },
    api: 'mergeOrderTree',
    query: {
      CP_C_SHOP_IDS: 'ID'
    }
  },
  {
    table: 'ST_C_TMALL_EXCHANGE_ORDER', // 天猫换货策略
    center: 'strategyPlatform',
    api: 'tamallTree',
    query: {
      CP_C_SHOP_ID: 'ID'
    }
  },
];

export default tableNameList;
