## downLoad下载组件的使用说明

### 一. 组件说明
1. 标准界面的下载类动作定义；
2. 配置文件路径：/burgeon-project-logic/js/modal/interfacePlatform/downLoadAll.js

### 二. 配置项说明
1. index.js中添加/修改配置：

```javascript
const con = {
	'IP_B_CANCEL_TIME_ORDER_VIP':{}
}
CustomConfig.editDownLoadAllConfig(con); //  修改/传入配置
console.log('CustomConfig.cusDownLoadAllConfig::', CustomConfig.cusDownLoadAllConfig);
```


### 三. 使用说明

#### 1. 标准动作定义
	配置动作定义的脚本：CUSTOMIZED/DOWNLOADCOMMON
![](http://arkshare-file.oss-cn-hangzhou.aliyuncs.com/arkshare-pro/arkdocs/markdown/1622427759677/down.png)

#### 2. 全定制

1.引入组件：
```
import downLoad from 'professionalComponents/downLoad';
```
2.注册：
```
components: {
    downLoad,
},
```
3.使用组件：
	同导入组件的使用方式：[importTable使用文档](http://knowledge.ark.burgeononline.com/repository#/entryComponents/2/749656/1/2061 "importTable使用文档")

------------

&copy;撰写：zhou.l@burgeon.cn