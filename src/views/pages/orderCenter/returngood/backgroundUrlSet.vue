// 定制界面POS背景图设置
<template>
  <div class="backgroundUrlSet">
    <div class="ff-pos-set-btn">
      <ul>
        <li v-for="(list, index) of actionButtons" :key="index">
          <button class="ff-set--btns" @click="tabConfigClick(list)">
            {{ list.name }}
          </button>
        </li>
      </ul>
    </div>
    <div class="set-box">
      <ul>
        <li>
          <my-input
            :isActive="true"
            :isdisabled="false"
            :itemdata="unLineMitemdata"
            @getFkChooseItem="handleChangeds"
          >
          </my-input>
        </li>
        <li>
          <label class="label" for=""
            ><i style="color: red; padding-right: 5px">*</i>备注：</label
          >
          <input type="text" v-model="remark" class="remark" maxlength="250" />
        </li>
      </ul>
      <ul>
        <li>
          <label class="label" for=""
            ><i style="color: red; padding-right: 5px">*</i
            >登录界面背景图：</label
          >
          <div class="demo-upload-list uploadBack" v-show="image">
            <template>
              <img :src="image" />
            </template>
          </div>
          <Upload
            ref="upload"
            v-if="!image"
            :show-upload-list="false"
            :on-success="handleSuccess1"
            :format="['jpg', 'jpeg', 'png']"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            type="drag"
            :action="action"
            :data="{ type: 'IMAGE' }"
            style="display: inline-block"
          >
            <div style="width: 290px; height: 290px; line-height: 290px">
              <Icon type="ios-cloud-upload-outline" size="40"></Icon>
            </div>
          </Upload>
        </li>
        <li>
          <label class="label" for="">登录界面LOGO：</label>
          <div class="demo-upload-list uploadBack" v-show="logo">
            <template>
              <img :src="logo" />
            </template>
          </div>
          <Upload
            ref="upload2"
            v-if="!logo"
            :show-upload-list="false"
            :on-success="handleSuccess2"
            :format="['jpg', 'jpeg', 'png']"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            type="drag"
            :action="action"
            :data="{ type: 'LOGO' }"
            style="display: inline-block"
          >
            <div style="width: 290px; height: 290px; line-height: 290px">
              <Icon type="ios-cloud-upload-outline" size="40"></Icon>
            </div>
          </Upload>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import myInput from "../../promotionCenter/offlinePromotion/procedure/procedureTwo/input";
import axios from "axios";
export default {
  data() {
    return {
      objid: -1,
      remark: '',
      image: '',
      logo: '',
      action: '/p/cs/retail/pos/v1/dlBRetailImageUpload',
      unLineMitemdata: {//参与门店
        col: 1,
        colid: 138222,
        colname: "CP_C_STORE_IDS",
        datelimit: "all",
        display: "xml",
        fkdesc: "门店档案",
        fkdisplay: "mop",
        inputname: "CP_C_STORE_IDS:ENAME",
        isfk: true,
        isnotnull: true,
        isuppercase: false,
        length: 65535,
        name: "门店",
        readonly: false,
        reftable: "CP_C_STORE",
        reftableid: 23446,
        row: 1,
        statsize: -1,
        type: "STRING",
        valuedata: ''
      },
      actionButtons: [
        {
          name: '保存',
          type: 1
        },
        {
          name: '重置',
          type: 2
        },
        {
          name: '返回',
          type: 3
        }
      ]
    }
  },
  components: {
    myInput,
  },
  methods: {
    getInitData() {
      let self = this;
      const formData = new FormData()
      formData.append(
        'param',
        JSON.stringify({
          objid: this.objid, // ID
        })
      )
      axios({
        url: '/p/cs/retail/pos/v1/dlBRetailImageSelect',
        method: 'post',
        data: formData
      })
        .then((res) => {
          self.remark = res.data.data.REMARK;
          let valuePid = JSON.parse(res.data.data.USE_CP_C_STORE_ID);
          self.unLineMitemdata.valuedata = JSON.stringify(valuePid);
          self.unLineMitemdata.pid = JSON.stringify(valuePid);
          self.image = res.data.data.IMAGE;
          self.logo = res.data.data.LOGO;
          if (res.data.data.STATUS === 3 || res.data.data.STATUS === 4) {//3提交成功和4提交中的不能保存和重置
            self.actionButtons = [{
              name: '返回',
              type: 3
            }]
          }
        })
    },
    tabConfigClick(item) {
      if (item.type === 1) {
        this.saveInformation()
      } else if (item.type === 2) {
        this.image = ''
        this.logo = ''
        this.remark = '';
        this.unLineMitemdata.valuedata = '';
        this.unLineMitemdata.pid = '';
      } else {
        $utils.tabCloseAppoint(this);
        R3.store.commit('global/tabOpen', {
          type: 'S',
          tableId: 249231187,
          tableName: 'DL_B_RETAIL_IMAGE',
          back: true,
          label: '背景图设置表'
        });
        this.$destroy();
      }
    },
    saveInformation() {
      let self = this;
      if (!self.unLineMitemdata.pid) {
        this.$Message.warning('请选择门店');
        return
      }
      if (!self.remark) {
        this.$Message.warning('请填写备注');
        return
      }
      if (!self.image) {
        this.$Message.warning('请选择登录界面背景图');
        return
      }
      const formData = new FormData()
      formData.append(
        'param',
        JSON.stringify({
          objid: this.objid, // ID
          fixcolumn: {
            DL_B_RETAIL_IMAGE: {
              IMAGE: self.image,
              LOGO: self.logo,
              REMARK: self.remark,
              USE_CP_C_STORE_ID: self.unLineMitemdata.pid
            }
          }
        })
      )
      axios({
        url: '/p/cs/retail/pos/v1/dlBRetailImageAdd',
        method: 'post',
        data: formData
      }).then((res) => {
        if (res.data.code === 0) {
          this.$Message.success('保存成功');
          $utils.tabCloseAppoint(this);
          R3.store.commit('global/tabOpen', {
            type: 'S',
            tableName: 'DL_B_RETAIL_IMAGE',
            tableId: 249231187
          });
          this.$destroy();
        } else {
          this.$Message.warning(res.data.message);
        }
      })
    },
    handleSuccess1(res, file) {
      if (res.code === 0) {
        this.image = res.data.url
      }
    },
    handleSuccess2(res, file) {
      if (res.code === 0) {
        this.logo = res.data.url
      }
    },
    handleFormatError() {

    },
    handleMaxSize() {

    },
    handleBeforeUpload() {

    },
    handleChangeds(value) {
      let valuePid = JSON.parse(value.pid)
      this.unLineMitemdata.pid = JSON.stringify(valuePid)
    },
  },
  mounted() {
    console.log('self.$route.params.customizedModuleId', this.$route.params.customizedModuleId)
    // let linkUrl = window.location.href;
    // let name=linkUrl.substring(linkUrl.lastIndexOf("/")+1);
    this.objid = this.$route.params.customizedModuleId;
    if (this.objid !== 'New') {
      this.getInitData()
    } else if (this.objid === 'New') {
      this.objid = -1
    }
  }
}
</script>
<style lang="less" scoped type="text/less">
@import url("~@/assets/css/css_1_3/page.less");
@btn-color: #fd6442;
.ff-pos-set-btn {
  padding: 10px 0;
  ul {
    display: flex;
  }
  .ff-set--btns {
    color: @btn-color;
    border: 1px solid @btn-color;
    border-radius: 2px;
    background-color: #fff;
    margin-right: 8px;
    padding: 0 8px;
    box-sizing: border-box;
    height: 24px;
    line-height: 1;
    &:hover {
      border-color: rgba(253, 100, 66, 0.6);
      color: rgba(253, 100, 66, 0.6);
    }
  }
  li:first-child .ff-set--btns {
    background-color: @btn-color;
    color: #fff;
    &:hover {
      background-color: #e6502f;
      color: #f3cec5;
      border: 1px solid #e6502f;
    }
  }
}
.set-box {
  border: 1px solid #dcdee2;
  padding: 10px;
  ul {
    display: flex;
    li {
      display: flex;
      padding-right: 20px;
      width: 420px;
      padding-bottom: 20px;
      label {
        line-height: 24px;
        width: 110px;
        text-align: right;
      }
      .remark {
        width: calc(100% - 105px);
        border: 1px solid #dcdee2;
        padding: 0 5px;
      }
      .uploadBack {
        width: 278px;
        height: 278px;
        img {
          width: 100%;
          height: 100%;
          background-size: cover;
        }
      }
    }
  }
}
</style>
<style lang="less">
.backgroundUrlSet {
  .item-input.isnotnull input {
    background: #fff;
  }
  .item-input label.title {
    width: 110px;
  }
}
</style>