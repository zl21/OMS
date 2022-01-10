// import R3 from '@syman/burgeon-r3';

const { getModuleName } = R3;
export default {
  props: {},
  data() {
    return {
      corfirmFlag: false,
      corfirmMessage: '',
      // distributionIds:"",
      existsDistributionIds: '',
      // 选一个
      confirmBtnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        warnFlag: false,
        buttons: [
          {
            type: '', // 按钮类型
            text: $it('com.cancel'), // 取消
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const self = this;
              self.singleDistributionOccus();
            }
          },
          {
            type: 'primary', // 按钮类型
            text: $it('com.determine'), // 确定
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const self = this;
              self.mergeDistributionOccus();
            }
          }
        ]
      },
    };
  },
  mounted() {
    const self = this;
    self.checkMergeDistribution();
  },
  methods: {
    checkMergeDistribution() {
      const self = this;
      const fromdata = new FormData();
      const param = {
        ids: self.$store.state[getModuleName()].buttons.selectIdArr,
      };
      fromdata.append('param', JSON.stringify(param));
      this.service.orderCenter.distributionOccupy(fromdata).then(res => {
        if (res.data.data.code === 0) {
          const mergeFlag = res.data.data.mergeFlag;
          if (mergeFlag === 'Y') {
            self.corfirmFlag = true;
            self.corfirmMessage = res.data.data.distributionNos;
            if (res.data.data.existsDistributionIds) {
              self.existsDistributionIds = res.data.data.existsDistributionIds.replace(/\[|]/g, '');
            }
            if (res.data.data.distributionIds) {
              self.distributionIds = res.data.data.distributionIds.replace(/\[|]/g, '');
            }
          } else {
            self.$Message.success($it('tip.cb'));// 手工占单成功!
            self.$emit('closeActionDialog');
            self.$emit('confirmImport');
          }
        } else {
          self.corfirmFlag = true;
          self.corfirmMessage = res.data.data.message;
          self.confirmBtnConfig.buttons = [
            {
              type: '', // 按钮类型
              text: $it('com.close'), // 关闭
              icon: '', // 按钮图标
              size: '', // 按钮大小
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                self.singleDistributionOccus();
              }
            }
          ];
        }
      });
    },
    mergeDistributionOccus() {
      const self = this;
      const fromdata = new FormData();
      const param = {
        distributionIds: self.distributionIds,
        existsDistributionIds: self.existsDistributionIds
      };
      self.setBtnDisabled(true);
      fromdata.append('param', JSON.stringify(param));
      this.service.orderCenter.vipcomMergeDistribution(fromdata).then(res => {
        if (res.data.data.code === 0) {
          self.$Message.success($it('tip.cc'));// 合并占单成功!
          self.$emit('closeActionDialog');
        } else {
          self.corfirmMessage = res.data.data.message;
          self.confirmBtnConfig.buttons = [
            {
              type: '', // 按钮类型
              text: $it('com.close'), // 关闭
              icon: '', // 按钮图标
              size: '', // 按钮大小
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                self.singleDistributionOccus();
              }
            }
          ];
        }
      });
    },
    singleDistributionOccus() {
      const self = this;
      self.$emit('closeActionDialog');
    },
    setBtnDisabled(closeFlag) {
      const self = this;
      self.confirmBtnConfig.buttons.forEach((btn) => {
        btn.disabled = closeFlag;
      });
    }
  },
};
