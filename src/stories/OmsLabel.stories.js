import OmsLabel from '../view/OmsLabel.vue'
import Md from './md/OmsLabel.md'
import { action } from "@storybook/addon-actions";

export default {
	title: 'Basic/OmsLabel',
	component: OmsLabel,
	parameters: {
		notes: Md,
	},
}

const Template = (args, { argTypes }) => ({
	components: { OmsLabel },
	props: Object.keys(argTypes),
	template: '<OmsLabel v-bind="$props" @labelClick="lClick" />',
	methods: {
		lClick: action(""),
	}
})

export const Default = Template.bind({})
Default.args = {
	labelList: [
		{
			label: '商品明细',
			value: 'detail'
		},
		{
			label: '操作日志',
			value: 'opera'
		}
	],
	isMultiSelect: false,
	labelDefaultValue: 'detail',

}