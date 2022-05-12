<template>
  <el-dialog
    width="810"
    custom-class="notify-dialog-warp"
    :show-close="false"
    :visible="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div slot="title" class="notify-dialog-header-wrap">
      <div class="notify-dialog-text">新版本功能</div>
      <div class="notify-dialog-badge">New</div>
    </div>
    <div class="notify-dialog-body-title">{{ notifyData.title }}</div>
    <div class="notify-dialog-body-sub-title">
      <div class="notify-dialog-body-title-content">
        <span>版本号：</span>
        {{ notifyData.version }}
      </div>
      <div class="notify-dialog-body-title-content">
        <span>版本号：</span>
        {{ notifyData.version }}
      </div>
    </div>
    <div v-html="notifyData.content" class="notify-dialog-body-content" />
    <span slot="footer" class="notify-dialog-footer-wrap">
      <el-button type="primary" @click="handleClose" :disabled="show">我已经阅读，关闭弹出框<span v-if="show">({{ count }} s)</span></el-button>
    </span>
  </el-dialog>
</template>
<script>
import { Notification } from 'element-ui';

export default {
  props: {
    baseUrl: {
      type: String,
      require: false,
    },
    notifyProps: {
      appId: {
        type: String,
        require: true,
      },
      username: {
        type: String,
        require: true,
      },
    }
  },
  data() {
    return {
      dialogVisible: false,
      notifyData: {},
      count: 10,
      show: true,
      timer: null,
    }
  },
  methods: {
    open() {
      const _self = this;
      const url = this.baseUrl ? this.baseUrl : '//tool.ecsemir.com';
      if (this.notifyProps.appId && this.notifyProps.username) {
        axios
          .get(`${url}/api/system/get_version`, {
            params: {
              system_code: this.notifyProps.appId,
              username: this.notifyProps.username,
            },
          })
          .then((res) => {
            const { data } = res;
            if (data.code === 0) {
              this.notifyData = data;
              Notification({
                title: '公告',
                dangerouslyUseHTMLString: true,
                message: `<div class="notify-mesg-btn-wrap"><div>${data.title}</div><div class="notify-mesg-btn">查看详情</div></div>`,
                duration: 0,
                showClose: false,
                customClass: 'notify-msg-wrap',
                onClick() {
                  _self.dialogVisible = true;
                  _self.beginReadTime();
                  _self.closeNotify();
                }
              });
            }
          });
      }
    },
    closeNotify() {
      Notification.closeAll();
    },
    beginReadTime() {
      this.timer = setInterval(() => {
        if (this.count > 0) {
          this.count--;
        } else {
          this.show = false;
          clearInterval(this.timer); // 清除定时器
          this.timer = null;
        }
      }, 1000);
    },
    handleClose() {
      if(!this.show) {
        const url = this.baseUrl ? this.baseUrl : '//tool.ecsemir.com';
        axios.post(`${url}/api/system/version_read`, {
          system_code: this.notifyProps.appId,
          username: this.notifyProps.username,
          version: this.notifyData.version,
        });
        this.dialogVisible = false;
      }
    }
  },
  watch: {
    notifyProps: {
      deep: true,
      handler: function(val) {
        this.open();
      }
    }
  }
};
</script>

<style>
.notify-dialog-warp .el-dialog__header {
  height: 55px !important;
  line-height: 55px !important;
}

.notify-dialog-header-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.notify-dialog-text {
  max-width: 400px;
  overflow: hidden;
  letter-spacing: 0.22px;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: rgba(0, 0, 0, .85);
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  word-wrap: break-word;
}

.notify-dialog-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  margin-left: 8px;
  padding: 0 6px;
  color: #fff;
  font-size: 12px;
  line-height: 20px;
  background: conic-gradient(from 193.37deg at 50% 50%,
      #b2dfff 0deg,
      #50b8ff 114.38deg,
      #b2dfff 1turn);
  border-radius: 19px;
}

.notify-dialog-body-title {
  margin-bottom: 10px;
  color: #333;
  font-size: 18px;
  text-align: center;
}

.notify-dialog-body-sub-title {
  display: flex;
  justify-content: center;
}

.notify-dialog-body-sub-title .notify-dialog-body-title-content {
  margin-left: 15px;
  color: #999;
  font-size: 12px;
}

.notify-dialog-body-sub-title .notify-dialog-body-title-content>span {
  color: #999;
}

.notify-dialog-footer-wrap .el-button--primary:focus,
.el-button--primary:hover {
  background: #66b1ff !important;
  border-color: #66b1ff !important;
}

.notify-dialog-body-content{
  max-height: 500px;
  margin-top: 24px;
  overflow-y: auto;
}

.notify-msg-wrap .el-notification__group{
  width: 100%;
  cursor: pointer;
}

.notify-mesg-btn{
  color: #fff;
  border-color: #1890ff;
  background: #1890ff;
  height: 24px;
  line-height: 24px;
  padding: 0 7px;
  font-size: 14px;
  border-radius: 2px;
  float: right;
}
</style>
