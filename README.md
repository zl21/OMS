#  @burgeon/internationalization

### 介绍
@burgeon/internationalization  

是上海伯俊中台事业部产品中心项目架构私有依赖包仓库中针对于后期的海外用户有国际化需求开发的语言包功能模块；

秉承前端项目工程化的思想,  独立模块依赖包便于后期迭代维护。

### 安装教程

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
        
### Properties & API

| Name |  Type  |   Description  |
| :--- | --- | :--- |
| locale             |  String     | 当前使用的语言  |
| editI18n             |  Function     | 用于新增/修改  |

* editI18n( )
```
import i18n from '@burgeon/internationalization/i18n';
const obj = {
    common: {
        all: '所有',
    }
}
i18n.editI18n(obj);
window.$i18n = i18n;
console.log($i18n.t(common.all));
```

### Usage Example

>1. 全局(index.js)引入并挂载
```
  import i18n from '@burgeon/internationalization/i18n';
  window.$i18n = i18n;
```

>2. 在X.vue中使用
```
   1）注意要在该vue文件中的data中return一下：
     data() {
       return { vmI18n: $i18n,}
     }
   2）具体使用方法：
     a. data中：$i18n.t('btn.manualCreation')
     b. method中：$i18n.t('btn.manualCreation')
     c. 标签中：<td> {{vmI18n.t("common.all")}} </td>
     d. 独立的js文件中：$i18n.t()或引用后直接使用
```

### Q & A

> Q：如何快速查询并使用？
> A：[网站查询](http://101.132.182.36:20000/)

> Q：……
> A：……

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
| v1.0.41 |  同步zh_CN  |
| v1.0.42 |  默认中文  |
| v1.0.43 |  add btn.modify_sellerNotes/btn.sortForm/btn.order_detailed/   |
| v1.0.44 |  add modalTips.ga/gb   |
| v1.0.45 |  index.js   |
| v1.0.46 |  update modalTips.ga/gb |
| v1.0.47 |  新增操作语言包的API |
| v1.0.48 |  add |
| v1.0.49 |  登录页语言 |
| v1.0.50 |  解决ja.js文件被删除导致的报错 |
| v1.0.51 |  add page、btn |
| v1.0.52 |  add 共n条 |
| v1.0.53 |  add btn |
| v1.0.54 |  update form_label.queryTime |
| v1.0.55 | 英文包 |
| v1.0.56 | reset form_label.queryTime, add orderTime |
| v1.0.57 | add for 零售-详情 |
| v1.0.58 | 构建报错修复 |
| v1.0.59 | add modalTips.gd |
| v1.0.60 | add 退换-新增 |
| v1.0.61 | add for 组件库 |
| v1.0.62 | add for 策略 |
| v1.0.63 | modalTips：! -> ！ |
| v1.0.64 | add for 组件库 |
| v1.0.65 | add ja-JP |
| v1.0.66 | add sheet v3 |
| v1.0.67 | Information -> Info |
| v1.0.68 | 翻译 |
| v1.0.69 | add and 翻译 |
| v1.0.70 | add menu |
| v1.0.71 | add plHolder. |
| v1.0.72 | add tips.ju |
| v1.0.73 | add tips.jn、jv; tips翻译 |
| v1.0.74 | add 登录提示 |
| v1.0.75 | add menu.b0 |
| v1.0.76 | add sheet v4 |
| v1.0.77 | add for 国家省市区详情 |
| v1.0.78 | add for logistics |
| v1.0.79 | add sheet v5 |
| v1.0.80 | add sheet v6 |
| v1.0.81 | add for sku |
| v1.0.82 | add sheet v6 |
| v1.0.83 | add 翻译 |
| v1.0.84 | add for 退换 |
| v1.0.85 | add modalTips.kp |
| v1.0.86 | add other…… |
| v1.0.87 | add modalTips |
| v1.0.88 | add modalTips/form_label |
