/*
 * @Author: your name
 * @Date: 2021-11-05 15:08:58
 * @LastEditTime: 2021-11-08 13:28:44
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /burgeon-project-logic/src/config/minxin/verticalTableDetailCustomize.js
 */
import singleObjectActions from './singleObjectActions';

export default () => verticalTableDetailCustomize(
	{
		mixins: [singleObjectActions(),],
		data() {
			return {};
		},
		watch: {},
		created() { },
		updated() { },
		mounted() { },
		methods: {},
	}
);
