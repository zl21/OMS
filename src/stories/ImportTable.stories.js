import ImportTable from '../view/ImportTable.vue'
import Md from './md/OmsButton.md'
import { action } from "@storybook/addon-actions";

import '@syman/ark-ui/dist/styles/bjIconfonts/iconfont.css';
import i18n from "@burgeon/internationalization/i18n"; // 国际化
window.$i18n = i18n;
export default {
	title: 'Basic/ImportTable',
	component: ImportTable,
	parameters: {
		notes: Md,
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
	components: { ImportTable },
	props: Object.keys(argTypes),
	template: '<ImportTable v-bind="$props" @dropDownClick="dropClick" />',
	methods: {
		dropClick: action("")
	}
})

export const Default = Template.bind({})
Default.args = {
	componentData: { "tableName": "OUT_OF_STOCK_MEMO" }
}