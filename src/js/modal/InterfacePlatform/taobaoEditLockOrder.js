import axios from 'axios';
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
				status: 1,
				time: null
			},
			btnConfig: {
				typeAll: 'error', // 按钮统一风格样式
				btnsite: 'right', // 按钮位置 (right , center , left)
				buttons: [
					{
						type: '', // 按钮类型
						text: '取消', // 按钮文本
						icon: '', // 按钮图标
						size: '', // 按钮大小
						disabled: false, // 按钮禁用控制
						btnclick: () => {
							this.$emit('closeActionDialog');
						} // 按钮点击事件
					},
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
				]
			},
		};
	},
	watch: {
		"form.status"(val) {
			!val ? this.form.time = null : this.timeChange(this.$comUtils.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'));
		},
	},
	mounted() {
		// 初始时间
		this.timeChange(this.$comUtils.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'))
	},
	methods: {
		/**
		 * 预计解锁时间
		 * @param {string} time [时间，例：2021-09-30 00:00:00]
		 * @param {string} type [date/time/datatime]
		 */
		timeChange(time, type) {
			const _time = new Date(time).valueOf(),
				currentTime = new Date().getTime(),
				currentTimeStr = this.$comUtils.dateFormat(new Date(currentTime + 5 * 60000), 'yyyy-MM-dd hh:mm:ss');
			this.form.time = currentTime >= _time ? currentTimeStr : time;
		},

		// 修改提交
		async confirmChange() {
			if (!this.idArray.length) return this.$message.warning('请先选择需要修改的订单');
			// 校验时间，当天为Now，其他时间不变
			if (!!this.form.status) {
				if (!this.form.time) return this.$message.warning('请选择预计解锁时间');
				this.timeChange(this.form.time);
			}
			const { time: date, status: autoUnlock } = this.form;
			const param = {
				date: date,
				autoUnlock: Boolean(autoUnlock),
				ids: this.idArray.map((item) => Number(item))
			};
			// fromdata.append('param', JSON.stringify(param));
			const res = await this.service.interfacePlatform.orderBatchModify(param)
			if (res && res.code === 0) {
				this.$message.success(res.message);
			}
			//  else this.$message.error(res.message || '修改失败');
			setTimeout(() => {
				this.$emit('closeActionDialog', true);
			}, 300)

			// const fromdata = new FormData();
			// fromdata.append('param', JSON.stringify(param));

			// axios({
			// 	url: '/api/cs/oc/oms/v1/batchModify',
			// 	method: 'post',
			// 	data: param,
			// }).then(res => {
			// }).catch(() => { });
		}
	}
};
