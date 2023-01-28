## 布局规范

##### 注：
- 如非必要不过度嵌套标签
- 如布局相同，可在原有的class上面下文规范中的相应类名
		例：<div class="otherClass cus-list"></div>
- 仅针对于相对规范的定制页面
- 定制页面样式，请用主题库变量
		import 'omsTheme/public.less';
		.color{
				background: @base-color;
		}

###   定制页面 - 列表

```
<div class="otherClass cus-list">
  <div class="list-btn"></div> <!-- 按钮 -->
  <div class="list-main">
    <div class="list-form"></div> <!-- 表单 -->
    <div class="list-table"></div> <!-- 表格 -->
  </div>
</div>
```

###   定制页面 - 单对象
```
<div class="otherClass cus-obj">
  <div class="obj-btn"></div> <!-- 按钮 -->
  <div class="obj-main">
    <div class="obj-form"></div> <!-- 表单 -->
    <div class="obj-table"></div> <!-- 表格 -->
  </div>
</div>
```
###   弹窗

> 弹窗底部的按钮遵循：
1. ‘取消’在左，‘确定’在右;
2. ‘取消’的type为‘’或‘default’，‘确定’的type为‘primary’


- 定制弹窗、动作定义弹窗
```
<!-- customized-modal -->
<div class="cus-modal" style="width:400px">
	<OmsForm :form-config="formConfig" />
	<OmsButton :btn-config="buttonConfig" />
</div>
```
- Ark Modal弹窗组件
```
<!-- ark Modal -->
<Modal class-name="ark-dialog">
	<!-- 如果需要自定义弹窗底部的按钮，该底部dom上添加class="modal-footer"  -->
	<OmsButton class="modal-footer"  :btn-config="buttonConfig"  />
</Modal>
```
- 通过实例调用Ark Modal
```
this.$Modal.error({
	className: 'ark-dialog',
	title: $it('mT.tips'), // 提示,
	titleAlign: 'left',
	mask: true,
	draggable: true
});
```

### loading
```
// 全局指令 v-loading
   <div v-loading="pageLoad"></div>
```

### button （OmsButton组件）功能按钮分类
> 按钮权限控制时，需接口（fetchActionsInCustomizePage）返回数据加个按钮类型字段 如下：default、primary、warning

```
		{
			type:"default/primary/warning",
			//ghost: true,(暂时不放开)
		 	text: '默认/主要/谨慎',
			disabled:true, // 是否禁止操作
		}
		btnConfig: {
				typeAll: 'default', // 按钮统一风格样式
				loading: false, // 按钮加载
				buttons: [
				  {
					type: 'default',
					// ghost: true,
					text: '默认',
				  },
				  {
					type: 'primary',
					text: '主要',
					disabled:true,
				  },
				  {
					type: 'warning',
					text: '谨慎',
					disabled:false,
				  }
				]
		}
```

### steps 步骤条
```
		<Steps class="steps-content">
			<Step v-for="(item,index) in steps" 
				:key="index"
				:title="item.name"
				:icon="item.icon"
				:content="item.date ? item.date : item.content" 
				:status="item.status">
			</Step>
		</Steps>
		// 状态条数据格式
		<script>
			export default {
			data(){
					steps: [{
						name: '平台付款',
						date: '2021-01-01 00:00:00',
						icon: 'iconfont icon-qian',
						status: 'finish', // wait、process、finish、error
					}, {
						name: '订单审单',
						content: '排队中,请耐心等候',
						icon: 'iconfont icon-dingdan',
						status: 'process',
					}, {
						name: '推送仓库',
						icon: 'iconfont icon-weibiaoti-4',
						status: 'wait',
					}],
				}
			}
		</script>
```
		<Steps class="steps-content">
			<Step v-for="(item,index) in steps" 
				:key="index"
				:title="item.name"
				:icon="item.icon"
				:content="item.date ? item.date : item.content" 
				:status="item.status">
			</Step>
		</Steps>
		// 状态条数据格式
		<script>
			export default {
			data(){
					steps: [{
						name: '平台付款',
						date: '2021-01-01 00:00:00',
						icon: 'iconfont icon-qian',
						status: 'finish', // wait、process、finish、error
					}, {
						name: '订单审单',
						content: '排队中,请耐心等候',
						icon: 'iconfont icon-dingdan',
						status: 'process',
					}, {
						name: '推送仓库',
						icon: 'iconfont icon-weibiaoti-4',
						status: 'wait',
					}],
				}
			}
		</script>
