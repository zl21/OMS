import axios from 'axios';
import dayjs from 'dayjs';
// import BusinessForm from 'professionalComponents/businessForm';
import BusinessBtn from 'professionalComponents/businessButton';

export default {
	components: {
		// BusinessForm,
		BusinessBtn,
	},
	props: {
		objList: {
			type: Array
		},
		idArray: {
			type: Array
		},
		webid: {
			type: Number
		},
		tablename: {
			type: String
		},
		rowData: {
			type: Array
		}
	},
	data() {
		return {
			// pageLoad: false,
			form: {
				status: 0,
				time: null
			},
			btnConfig: {
				typeAll: 'error', // 按钮统一风格样式
				btnsite: 'right', // 按钮位置 (right , center , left)
				buttons: [
					{
						type: '', // 按钮类型
						text: '确定', // 按钮文本
						icon: '', // 按钮图标
						size: '', // 按钮大小
						disabled: false, // 按钮禁用控制
						btnclick: () => {
							this.confirmChange();
						}
					},
					{
						type: '', // 按钮类型
						text: '取消', // 按钮文本
						icon: '', // 按钮图标
						size: '', // 按钮大小
						disabled: false, // 按钮禁用控制
						btnclick: () => {
							this.$emit('closeActionDialog');
						} // 按钮点击事件
					}
				]
			},
		};
	},
	mounted() {
		this.timeChange(dayjs().format('YYYY-MM-DD HH:mm:ss'))
		// const formData = new FormData();
		// formData.append('param', '{}');
		// this.pageLoad = true;
		// axios({
		// 	url: '/p/cs/exchangeRefuseReason',
		// 	method: 'post',
		// 	data: formData
		// }).then(res => {
		// 	this.pageLoad = false;
		// 	if (res.data.code === 1) {
		// 		const resData = JSON.parse(res.data.datas);
		// 		this.formConfig.formData[0].options = resData.map(val => ({
		// 			label: val.outRefuseCopywriting,
		// 			value: val.refuseReasonId
		// 		}));
		// 	} else {
		// 		this.$message.error('拒绝换货原因请求失败');
		// 	}
		// }).catch(() => {
		// 	this.pageLoad = false;
		// });
	},
	methods: {
		/**
		 * 预计解锁时间
		 * @param {string} time
		 * @param {string} type
		 */
		timeChange(time, type) {
			const _time = dayjs(time).valueOf(),
				currentTime = dayjs().valueOf(),
				currentTimeStr = dayjs(currentTime).format('YYYY-MM-DD HH:mm:ss');
			this.form.time = currentTime >= _time ? currentTimeStr : time;
		},

		confirmChange() {
			const param = {
				...this.form,
				ids: this.idArray
			}
			console.log('param: ', param);
			// const formValue = this.formConfig.formValue;
			// if (!formValue.refuseReasonId) {
			// 	this.$message.warning('拒绝换货原因不能为空');
			// 	return;
			// }
			// if (this.idArray.length === 0) {
			// 	this.$message.error('请先选择需要拒绝换货的单据！');
			// 	return;
			// }
			// const param = {
			// 	ids: this.idArray,
			// 	menu: '淘宝换货单接口',
			// 	refuseReasonId: formValue.refuseReasonId,
			// 	outRefuseCopywriting: formValue.outRefuseCopywriting
			// };
			// const fromdata = new FormData();
			// fromdata.append('param', JSON.stringify(param));
			// this.pageLoad = true;
			// axios({
			// 	url: '/p/cs/exchangeRefuse',
			// 	method: 'post',
			// 	data: fromdata
			// }).then(res => {
			// 	this.pageLoad = false;
			// 	if (res.data.code === 0) {
			// 		this.$message.success(res.data.message);
			// 		this.$emit('closeActionDialog', true);
			// 	} else {
			// 		// this.$message.error(res.data.message || '拒绝换货失败');
			// 		this.$emit('closeActionDialog', true);
			// 	}
			// }).catch(() => {
			// 	this.pageLoad = false;
			// });
		}
	}
};
