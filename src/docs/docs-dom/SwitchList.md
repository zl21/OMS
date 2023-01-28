# switchList

### 一、组件说明
#### 1. 概述
多条件组合的组件，包含switch 和 两个 input 控件的组合表单控件。
#### 2. 应用场景
用于多条件的组合表单控件。

### 二、使用说明
1. 引用
```
import switchList from 'professionalComponents/switchList';
```
2. 应用
```
<switchList :switchList="switchListdata" />
```
```
export default {
  components: {
    switchList
  },
  data() {
    return {
      switchListdata: {
        label: '包裹属性',
        list: [
          {
            style: 'width: 150px;',
            isok: true,
            val: false,
            value: '',
            value2: '',
            disabled: false,
            placeholder: '开始值  大于等于',
            placeholder1: '结束值',
            label: '区间范围',
            name: '商品数量',
            symbol: '至',
            pkgAttributeType: 1,
            regx: /^[1-9]\d*$/,
            regx2: /^[1-9]\d*$/,
            maxlength: 18,
            type: '件'
          },
          {
            style: 'width: 150px;',
            isok: true,
            val: false,
            value: '',
            value2: '',
            disabled: false,
            placeholder: '开始值  大于等于',
            placeholder1: '结束值',
            label: '区间范围',
            name: '单据金额',
            pkgAttributeType: 2,
            symbol: '至',
            regx: /^\d+(\.\d{0,2})?$/,
            regx2: /^\d+(\.\d{0,2})?$/,
            maxlength: 18,
            type: '元'
          },
          {
            style: 'width: 150px;',
            isok: true,
            val: false,
            value: '',
            value2: '',
            disabled: false,
            placeholder: '开始值  大于等于',
            placeholder1: '结束值',
            label: '区间范围',
            pkgAttributeType: 3,
            name: '包裹重量',
            symbol: '至',
            regx: /^\d+(\.\d{0,2})?$/,
            regx2: /^\d+(\.\d{0,2})?$/,
            maxlength: 18,
            type: 'kg'
          }
        ]
      }
    }
  }
}
```
![image.png](data:image/png;base64,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)
### 三、API

#### switchList Props

属性 | 说明 | 类型 | 默认值
---|---|---|---
| isok | 是否必填 | Boolean | - |
| name | 开关的标题 | String | - |
| label | 字段名称 | String | - |
| symbol | 两个input控件之间的描述文字，如`至` | String | - |
| type | 第二个input控件后的描述文字，如`元` | String | - |
| value | 第一个input控件的值 | String | - |
| value2 | 第二个input控件的值 | String | - |
| placeholder | 第一个input控件的占位文本 | String | - |
| placeholder1 | 第二个input控件的占位文本 | String | - |
| regx | 第一个input控件的正则 | Reg | - |
| regx2 | 第二个input控件的正则 | Reg | - |
| style | 两个input控件的样式 | String | - |
| maxlength | 最大输入长度 | Number | - |

