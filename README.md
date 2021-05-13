#  @burgeon/internationalization

#### 介绍
@burgeon/internationalization  

是上海伯俊中台事业部产品中心项目架构私有依赖包仓库中针对于后期的海外用户有国际化需求开发的语言包功能模块;

秉承前端项目工程化的思想,  独立模块依赖包便于后期迭代维护;

#### 安装教程

一. 简易化安装依赖: 

   1. 命令行: npm install @burgeon/internationalization --registry http://47.102.123.140:4873;

   2. 优缺点:

        优点: 简单易用,不用切源;  

        缺点: 单行命令过多;

二. nrm安装依赖: 

   1. 命令行: 

         npm install nrm -g;  

         nrm add XXX http://47.102.123.140:4873;  

         nrm use XXX;  

         npm install @burgeon/internationalization;  

   2. 优缺点:
   
        优点: 引入nrm管理依赖包来源; 多源情景下切源方便;   

        缺点: 初期命令行相应较多; 

#### 使用说明

>1. 全局(index.js)引入并挂载
```
  import i18n from '@burgeon/internationalization/i18n/i18n.js';
  window.vmI18n = i18n;
```

>2. 在X.vue中使用
```
   1）注意要在该vue文件中的data中return一下：
     data() {
       return { vmI18n: window.vmI18n,}
     }
   2）具体使用方法：
     a. data中：vmI18n.t('btn.manualCreation')
     b. method中：this.vmI18n.t('btn.manualCreation')
     c. 标签中：<td> {{vmI18n.t("common.all")}} </td>
     d. 暂不支持在独立的js文件中使用
```

#### 版本说明

|  Version  |  Description  |
|  ---  | --- |
| v1.0.0 |  DEMO(已撤销)   |
| v1.0.1 |  初始化中文版语言包   |
| v1.0.2 |  更新说明文档   |
| v1.0.3 |  废弃   |
| v1.0.4 |  update:modalTips.h2   |
| v1.0.5 |  update:modalTips.a3   |
| v1.0.6 |  add:form_label.proReturnStatus   |
| v1.0.7 |  add for batchTables.vue   |
| v1.0.8 |  add for splitOrder.vue   |
| v1.0.9 |  add:btn.batch_cancelHold   |
| v1.0.10 |  update:btn.changeGoods   |
| v1.0.11 |  add for sendSingleRule.js   |
| v1.0.12 |  add:modalTitle.a4   |
| v1.0.13 |  add:btn.copyPermissions   |
| v1.0.14 |  add for returngoodmanagement.js - WaterMark   |
| v1.0.15 |  add some  |
| v1.0.16 |  add:modalTips.dq  |
| v1.0.17 |  update:modalTips.e7  |
| v1.0.18 |  update:modalTips.f9  |
| v1.0.19 |  add:modalTips.dr/ds  |
| v1.0.20 |  add:modalTips.dt  |
| v1.0.21 |  del repetitive modalTips.ye(to modalTips.du)  |
| v1.0.22 |  add some  |
| v1.0.23 |  add some for promotion  |
| v1.0.24 |  add some for judge  |
| v1.0.25 |  excerpt tipsMessage from zh/en.js  |
| v1.0.26 |  update invoice_otice to invoiceNotice  |
| v1.0.27 |  update module.exports  |
| v1.0.28 |  add modalTips.ev  |
| v1.0.29 |  add modalTips.ew  |
| v1.0.30 |  add modalTips.ex  |
| v1.0.31 |  add modalTips.ey ~ ez  |
| v1.0.32 |  add modalTips.fa ~ fd  |
| v1.0.33 |  add btn.cashOnDelivery/nonPreSale/preSaleBalancePaid  |
| v1.0.34 |  add modalTips.fe ~ ff  |
| v1.0.35 |  add modalTips.fg  |
| v1.0.36 |  add modalTips.fh ~ fm  |
| v1.0.37 |  remove Duplicate keys  |
| v1.0.38 |  add modalTips.fh ~ fm  |
| v1.0.39 |  update modalTips.fp  |
| v1.0.40 |  add btn.batch_addGift/batch_deleteGift/batch_replaceGoods/preSaleAdvanceDeliveryMarking  |