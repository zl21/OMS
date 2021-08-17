# fkdialog

## Props

<!-- @vuese:fkdialog:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|serviceId|-|`String`|`false`|r3-cp|
|version|-|`String`|`false`|-|
|tablename|兼容老接口返回的数据结构（eg.斯凯奇|`String`|`false`|-|
|tableid|表名|`String` /  `Number`|`false`|-|
|rightList|表id|`Object` /  `String`|`false`|-|
|modalAppendToBody|-|`Boolean`|`false`|true|
|appendToBody|將蒙层放在body上|`Boolean`|`false`|false|
|fkshow|是否将弹框放在body|`Boolean`|`false`|true|
|isObject|显示|`Boolean`|`false`|false|
|title|判断是否是单对象|`String`|`false`|default: '弹框多选'|
|canChinese|标题|`Boolean`|`false`|true|
|isOneData|是否可以模糊搜索中文|`Boolean`|`false`|false|

<!-- @vuese:fkdialog:props:end -->


## Events

<!-- @vuese:fkdialog:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|dialogClose|-|-|
|easyData|-|-|

<!-- @vuese:fkdialog:events:end -->


