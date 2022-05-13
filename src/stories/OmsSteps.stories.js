import OmsSteps from '../view/OmsSteps.vue'
import Md from './md/OmsSteps.md'
import { action } from "@storybook/addon-actions";

export default {
	title: 'Basic/OmsSteps',
	component: OmsSteps,
	parameters: {
		notes: Md,
	},
	argTypes: {
		current: {
			control: { type: 'select' },
			options: [0, 1, 2, 3],
		},
	},
}

const Template = (args, { argTypes }) => ({
	components: { OmsSteps },
	props: Object.keys(argTypes),
	template: '<OmsSteps v-bind="$props" @labelClick="lClick" />',
	methods: {
		lClick: action(""),
	}
})

export const Default = Template.bind({})
Default.args = {
	steps: [
		{
			class: 'iconios-card',
			content: "基础信息",
			// content: window.vmI18n.t('other.basic_info'),
			finish: false
		},
		{
			class: 'iconios-calendar',
			content: "条件信息",
			// content: window.vmI18n.t('other.condition_info'),
			finish: false
		},
		{
			class: 'iconios-list-box-outline',
			content: "赠品信息",
			// content: window.vmI18n.t('other.gift_info'),
			finish: false
		},
		{
			class: 'iconios-laptop',
			content: "活动概览",
			// content: window.vmI18n.t('other.activity_overview'),
			finish: false
		}
	],
	current: 0,
}