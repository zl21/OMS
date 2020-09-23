<!-- 调拨单审核按钮 -->
<template>
  <div class="requisition">
    <div style="margin-bottom: 3px">
      <div class="requisitionText">
        <span style="font-weight: bold; color: #fd6442">{{ errTitle }}</span>
      </div>
      <div
        v-if="!this.closeBtnFlag"
        class="requisitionButton"
      >
        <button
          v-if="this.corfirmBtnFlag"
          class="btn1"
          @click="inventory"
        >
          确认
        </button>
        <button
          class="btn1"
          @click="cancelButton"
        >
          取消
        </button>
      </div>
      <div
        v-else
        class="requisitionButton"
      >
        <button
          class="btn1"
          @click="closeDialog"
        >
          关闭
        </button>
      </div>
    </div>
    <!--<jordanBtn :btnConfig="btnConfig"></jordanBtn>-->
    <p
      ref="errMessage"
      class="content"
    >
      {{ message }}
    </p>
    <p
      v-for="(item, index) in messageArr"
      :key="index"
    >
      {{ item.message }}
    </p>
    <div
      v-show="loading"
      class="fromLoading"
    >
      <Spin />
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  // import jordanBtn from "../../../components/jordanButton";
  import jordanBtn from 'framework/jordanComponents/jordanButton.vue';

  export default {
    components: {
      jordanBtn,
    },
    props: {
      objList: {
        type: Array,
        default: () => []
      },
      idArray: {
        type: Array,
        default: () => []
      },
      webid: {
        type: Number,
      },
      tablename: {
        type: String,
        default: () => ''
      },
      rowData: {
        type: Array,
        default: () => []
      },
      specialTitle: {
        type: String,
        default: () => ''
      },
      objid: {
        type: String,
        default: () => ''
      },
    },
    data() {
      return {
        btnConfig: {
          typeAll: 'error', // 按钮统一风格样式
          btnsite: 'right', // 按钮位置 (right , center , left)
          buttons: [
            {
              text: '取消', // 按钮文本
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.$emit('closeActionDialog');
              }, // 按钮点击事件
            },
            {
              text: '确定', // 按钮文本
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                const _this = this;
                _this.inventory();
              }, // 按钮点击事件
            },
          ],
        },
        close: [
          {
            text: '关闭', // 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$emit('confirmImport');
              if (this.$route.query.tableName === 'SC_B_TRANSFER') { this.$parent.$parent.objectAddRefresh(); }
              this.$emit('closeActionDialog');
            }, // 按钮点击事件
          },
        ],
        closeBtnFlag: false,
        corfirmBtnFlag: true,
        message: '',
        errTitle: '',
        messageArr: [],
        loading: false,
        flag: false,
      };
    },
    mounted() {
      console.log(this);
      if (this.$route.query.tableName === 'SC_B_TRANSFER') {
      } else if (!this.idArray.length) {
        this.closeBtnFlag = true;
        return (this.message = '请先选择需要审核的记录！');
      }
      this.getCorfirmFlag();
      this.audit();
    },
    watch: {
      message() {
        const _this = this;
        if (_this.message.length > 0) {
          const startIndex = _this.message.indexOf('[');
          const endIndex = _this.message.indexOf(']');
          if (startIndex > 0 && endIndex > 0) {
            _this.errTitle = _this.message.substring(0, startIndex - 1)
              + _this.message.substring(endIndex + 1, _this.message.length);
            const bodyMessage = _this.message.substring(startIndex + 1, endIndex);
            let newBodyMessage = '';
            const bodyMsgArr = bodyMessage.split(',');
            bodyMsgArr.map((item) => {
              newBodyMessage = `${newBodyMessage + item}<br/>`;
            });
            _this.$refs.errMessage.innerHTML = newBodyMessage;
          } else {
            _this.errTitle = '';
            _this.$refs.errMessage.innerHTML = _this.message;
          }
        }
      },
    },
    methods: {
      getCorfirmFlag() {
        const _this = this;
        if (_this.idArray.length > 0) {
          _this.idArray.map((id) => {
            _this.rowData.map((item) => {
              if (item.ID.val === id) {
                if (item.TRANSFER_TYPE.val === '订单调拨') {
                  this.corfirmBtnFlag = false;
                }
              }
            });
          });
        }
        if (_this.objList.length === 1) {
          _this.objList[0].childs.map((child) => {
            if (child.colname === 'TRANSFER_TYPE') {
              if (child.valuedata === '2') {
                _this.corfirmBtnFlag = false;
              }
            }
          });
        }
      },
      audit() {
        const _this = this;
        _this.loading = true;
        const fromdata = new FormData();
        let param = {};
        let type = 1;
        if (this.$route.query.tableName === 'SC_B_TRANSFER') {
          param = { objid: _this.objid };
          type = 1;
        } else if (_this.idArray.length === 1) {
          param = { objid: _this.idArray.join() };
          type = 1;
        } else {
          param = { ids: _this.idArray };
          type = 2;
        }
        fromdata.append('param', JSON.stringify(param));
        if (type === 2) {
          axios({
            url: '/p/cs/transfer/audit',
            method: 'post',
            data: fromdata,
          }).then((res) => {
            _this.loading = false;
            if (res.data.code === 0) {
              _this.message = res.data.message;
              _this.$emit('confirmImport');
              _this.closeBtnFlag = true;
            } else {
              // _this.message = res.data.message;
              // _this.errTitle = res.data.message;
              _this.$message.error(res.data.message);
              _this.closeBtnFlag = true;
              if (_this.idArray.length === -1) {
                _this.messageArr = res.data.data;
              } else {
                res.data.data.forEach((item) => {
                  if (item.code === -2) {
                    // _this.messageArr.push(item);
                    _this.message = item.message;
                  }
                });
              }
            }
          });
        } else {
          axios({
            url: '/p/cs/transfer/audit',
            method: 'post',
            data: fromdata,
          }).then((res) => {
            _this.loading = false;
            if (res.data.code === 0) {
              _this.message = res.data.message;
              _this.closeBtnFlag = true;
            } else if (res.data.code === -1) {
              _this.message = res.data.message;
              _this.closeBtnFlag = true;
            } else {
              _this.message = res.data.message;
              _this.flag = true;
            }
          });
        }
      },
      inventory() {
        const _this = this;
        if (_this.flag) {
          _this.loading = true;
          const fromdata = new FormData();
          let param = {};
          if (this.$route.query.tableName === 'SC_B_TRANSFER') {
            param = { objid: _this.objid };
          } else {
            param = { objid: _this.idArray.join() };
          }
          fromdata.append('param', JSON.stringify(param));
          axios({
            url: '/p/cs/transfer/setStorageAsTransferQty',
            method: 'post',
            data: fromdata,
          }).then((res) => {
            _this.loading = false;
            if (res.data.code === 0) {
              _this.message = res.data.message;
              // _this.btnConfig.buttons = _this.close;
              this.closeBtnFlag = true;
            } else if (res.data.code === -1) {
              _this.message = res.data.message;
              this.closeBtnFlag = true;
            // _this.btnConfig.buttons = _this.close;
            } else if (res.data.code === -1) {
              _this.message = res.data.message;
            }
          });
        } else {
          _this.$emit('confirmImport');
          if (this.$route.query.tableName === 'SC_B_TRANSFER') { this.$parent.$parent.objectAddRefresh(); }
          _this.$emit('closeActionDialog');
        }
      },
      cancelButton() {
        this.$emit('closeActionDialog');
      },
      closeDialog() {
        this.$emit('confirmImport');
        if (this.$route.query.tableName === 'SC_B_TRANSFER') { this.$parent.$parent.objectAddRefresh(); }
        this.$emit('closeActionDialog');
      },
    },
  };
</script>

<style lang="less">
.requisition {
  width: 600px;
  height: 150px;
  overflow-y: auto;
  position: relative;
  .requisitionText {
    display: inline;
    line-height: 22px;
  }
  .requisitionButton {
    display: inline;
    float: right;
    .btn1 {
      padding: 0 8px;
      color: #fd6442;
      border-radius: 2px;
      height: 22px;
      line-height: 22px;
      text-align: center;
      background: #fff;
      border: 1px solid #fd6442;
      font-size: 12px;
      margin-right: 5px;
    }
  }
  .fromLoading {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 1000 !important;
  }
}


.requisition .content {
  height: 50px;
}
</style>
