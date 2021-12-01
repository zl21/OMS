import ImportTable from '../view/ImportTable.vue'
import Md from './md/OmsButton.md'
import { action } from "@storybook/addon-actions";

// import i18n from "@burgeon/internationalization/i18n"; // 国际化
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