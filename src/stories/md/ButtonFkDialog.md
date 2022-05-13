## buttonFkDialog user manual

### 一. 组件说明
#### 1. 介绍
点击按钮弹出外键关联弹框。

![buttonFkDialog001](https://img-blog.csdnimg.cn/20210628113848377.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzQ4Nzg3Ng==,size_16,color_FFFFFF,t_70#pic_center)

#### 2. 使用场景
适用于复杂筛选功能，比如排除（实现类似反选）

### 二. 配置项说明
`使用案例：促销活动-模拟仿真-批量新增 (@burgeon/project-logic/js/pages/promotionCenter/simulation.js`

![buttonFkDialog002](https://img-blog.csdnimg.cn/2021062811383510.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzQ4Nzg3Ng==,size_16,color_FFFFFF,t_70#pic_center)

### 三. 使用说明

1. 引用：
```
import ButtonFkDialog from 'professionalComponents/buttonFkDialog.vue';
components: {
    ButtonFkDialog
},
```

2. 定义配置项，如：

```
  itemdataFk: {
    colid: 1700806533,
    colname: 'PS_C_PRO_ID',
    fkdesc: '门店档案',
    fkdisplay: 'mop',
    isfk: true,
    isnotnull: false,
    name: '',
    readonly: false,
    reftable: 'PS_C_SKU',
    reftableid: 24801,
    valuedata: '',
    isObject: true,
    isSimulation: true,
    isGetValue: true,
    isOneData = false,
  },
```

3. 使用组件：

```
<ButtonFkDialog
    :itemdata="itemdataFk"
    @getFkChooseItem="getButtonFkChoose"
/>
```

------------

&copy;撰写：zhou.l@burgeon.cn
