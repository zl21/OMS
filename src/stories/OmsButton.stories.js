import OmsButton from '../view/OmsButton.vue'
import buttonMd from './md/OmsButton.md'
import { action } from "@storybook/addon-actions";

import '@syman/ark-ui/dist/styles/bjIconfonts/iconfont.css';

export default {
	title: 'Basic/OmsButton',
	component: OmsButton,
	parameters: {
		notes: buttonMd,
	},
	// argTypes: {
	// backgroundColor: { control: 'color' },
	// size: {
	//   control: { type: 'select' },
	//   options: ['small', 'medium', 'large'],
	// },
	// },
}

const Template = (args, { argTypes }) => ({
	components: { OmsButton },
	props: Object.keys(argTypes),
	template: '<OmsButton v-bind="$props" @dropDownClick="dropClick" @onClick="onClick"/>',
	methods: {
		dropClick: action("")
	}
})

export const Default = Template.bind({})
Default.args = {
	btnConfig: {
		loading: false,
		typeAll: 'default',
		btnsite: 'left',
		buttons: [
			{
				text: '保存',
				isShow: true,
				type: 'primary',
				size: 'small',
				icon: 'ios-download-outline',
				disabled: false,
				ghost: false,
				shape: 'circle',
				class: 'my-class',
				btnclick: () => {
					const _this = this;
				},
			},
			{
				text: '刷新',
				disabled: false,
				btnclick: () => {
					const _this = this;
				},
			},
			{
				text: '审核',
				disabled: true,
				btnclick: () => {
					const _this = this;
				},
			},
		],
	},
}

export const Drop = Template.bind({})
Drop.args = {
	btnConfig: {
		loading: false,
		typeAll: 'default',
		btnsite: 'left',
		buttons: [
			{
				type: 'primary',
				dropDown: true,
				menuText: '批量处理',
				menus: [
					{
						webname: 'x',
						text: '批量下发WMS',
					}
				],
			},
			{
				text: '作废',
				disabled: true,
				btnclick: () => {
					const _this = this;
				},
			},
		],
	},
}

/* export const Right = Template.bind({})
Right.args = {
	btnConfig: {
		// btnsite: 'right',
		buttons: [
			{
				text: '刷新',
				disabled: false,
				btnclick: () => {
					const _this = this;
				},
			},
			{
				text: '审核',
				disabled: true,
				btnclick: () => {
					const _this = this;
				},
			},
		],
		buttonsRight: [
			{
				text: '查找',
				size: 'large',
				shape: 'circle',
				icon: 'ios-search',
				webname: 'search',
				btnclick: () => {
					// this.agTableConfig.pagenation.current = 1;
					// this.query();
				}, // 按钮点击事件
			},
			{
				text: '重置',
				size: 'large',
				shape: 'circle',
				icon: 'ios-refresh',
				webname: 'reset',
				btnclick: () => {
					// this.reset();
					// if (this.$refs.dynamicSearch) this.$refs.dynamicSearch.reset();
				}, // 按钮点击事件
			},
		],
	},
} */