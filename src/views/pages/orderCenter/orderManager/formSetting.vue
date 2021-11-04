<!--
 * @Author: your name
 * @Date: 2021-05-27 11:05:20
 * @LastEditTime: 2021-06-04 10:27:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/pages/orderCenter/orderManager/formSetting.vue
-->
<template>
  <div class="formSetting">
    <Tabs
      :value="tabValue"
      @on-click="tabClick"
    >
      <TabPane
        v-if="list.length"
        label="功能按钮"
        name="name1"
      />
      <TabPane
        v-if="list.length"
        :label="filtet_label"
        name="name2"
      />
    </Tabs>
    <ul id="ul">
      <li
        v-for="(item,index) in list"
        :key="index"
        draggable="true"
        :ID="item.ID"
        :NAME="item.NAME"
        :DESC="item.DESC"
      >
        <div class="text">
          <span style="margin:0 5px">:::</span>
          <input
            v-model="item.DISPLAY"
            style="margin:0 5px"
            type="checkbox"
          >
          <span style="margin:0 5px">{{ item.DESC }}</span>
        </div>
        <div class="adArrow">
          <i
            class="iconfont icon-dingbu"
            @click="toTop(index)"
          />
          <i
            class="iconfont icon-dibu"
            @click="toBottom(index)"
          />
        </div>
      </li>
    </ul>
    <p class="hint">
        *支持上下拖拽排序
    </p>
    <div class="footer-button">
      <!-- <businessButton
        :btn-config="btnConfig"
        style="display:flex;justify-content: flex-end;"
      /> -->
      <Button
        @click="$emit('update:modal', false)"
      >
        取消
      </Button>
      <Button
        @click="save()"
      >
        确定
      </Button>
    </div>
  </div>
</template>
<script>
  import businessButton from 'burgeonComponents/businessButton';

  export default {
    components: {
      businessButton
    },
    computed: {
      btnConfig() {
        return this.extendBtn;
      },
      tablename(){
        return this.$route.params.customizedModuleName == 'ORDERMANAGER' ? 'OC_B_ORDER' : this.$route.params.customizedModuleName
      }
    },
    data() {
      return {
        tabValue: 'name1', // 普通筛选/高级筛选值
        list: [],
        extendBtn: [
          {
            text: $i18n.t('common.cancel'), // 取消,
            webname: 'query', // 退货换单 - 新增
            btnclick: () => {
              this.$emit('update:modal', false);
            }, // 按钮点击事件
          },
          {
            text: $i18n.t('common.determine'), // 确定
            webname: 'test_aaa', // 退货换单 - 新增
            btnclick: () => {
              this.save();
            }, // 按钮点击事件
          },
        ],
        filtet_label: (h)=>h('div', [
          h('Tooltip', {
            props: {
              content: '最多显示50个筛选条件',
              placement: 'top',
              transfer: true
            }
          }, '筛选条件'),
          h('Icon', {
            props: {
              type: 'ios-information-circle-outline',
              title: '123'
            },
            style: {
              'margin-bottom': '2px',
              'margin-left': '1px',
            }
          })
        ])
      };
    },
    mounted() {
      this.drag();
      this.init();
    },
    methods: {
      tabClick(val) {
        const self = this;
        self.tabValue = val;
        self.init(val == 'name1' ? 'L_BUTTON' : 'L_QUERY');
      },
      save() { // 保存已排序的列表
        const self = this;
        const parentNode = document.getElementById('ul').childNodes;
        const childArr = [];
        for (let i = 0; i < parentNode.length; i++) {
          childArr[i] = {
            NO: (i + 1) * 10,
            NAME: parentNode[i].getAttribute('NAME'),
            ID: parentNode[i].getAttribute('ID'),
            DISPLAY: parentNode[i].children[0].children[1].checked,
            DESC: parentNode[i].getAttribute('DESC')
          };
        }
        const data = {
          TABLE: self.tablename,
          TYPE: self.tabValue == 'name1' ? 'L_BUTTON' : 'L_QUERY',
          ACTION: 'SAVE',
          DATA: childArr
        };
        self.service.orderCenter.customSettings(data).then(res=>{
          console.log(res);
          if (res.data.code == 0) {
            self.$Message.success(res.data.message);
            this.$emit('update:modal', false);
            this.$emit('success');
          } else {
            self.$Message.error(res.data.message);
          }
        });
      },
      drag() {
        const self = this;
        const ul = document.querySelector('#ul');
        let draging = null;
        ul.ondragstart = function (event) {
          event.dataTransfer.setData('Text', event.target.innerText);
          draging = event.target;
        };
        ul.ondragover = function (event) {
          event.preventDefault();
          const target = event.target;
          if (target.nodeName === 'LI' && target !== draging) {
            if (self._index(draging) < self._index(target)) {
              target.parentNode.insertBefore(draging, target.nextSibling);
            } else {
              target.parentNode.insertBefore(draging, target);
            }
          }
        };
        ul.ondrop = function (event) {
          event.preventDefault();
        };
      },
      toBottom(val) {
        console.log(val);
        const self = this;
        self.list.push(self.list.splice(val, 1)[0]);
      },
      toTop(val) {
        console.log(val);
        const self = this;
        self.list.unshift(self.list.splice(val, 1)[0]);
      },
      init(type = 'L_BUTTON') { // 普通筛选 L_BUTTON 高级筛选 L_QUERY
        const self = this;
        const data = {
          TABLE: self.tablename,
          TYPE: type,
          ACTION: 'QUERY'
        };
        self.service.orderCenter.customSettings(data).then(res=>{
          if (res.data.code == 0) {
            self.list = res.data.data.DATA;
          }
        });
      },
      _index(el) {
        let index = 0;
        if (!el || !el.parentNode) {
          return -1;
        }
        while (el && (el = el.previousElementSibling)) {
          index++;
        }
        return index;
      },
    }
  };
</script>

<style scoped lang="less">
.formSetting {
    .hint {
    color: #FF735D;
    margin: 12px 0 -20px;
  }

   .icon-dingbu:before {
        content: "\e62c";
      }

  .icon-dibu:before {
      content: "\e76a";
    }
  .footer-button {
    display: flex;
    justify-content: flex-end;
    margin-top: 12px;
    button{
      border-color: #dbdde8;
      color: #292f43;
      border-radius: 5px;
      height: 32px;
      line-height: 30px;
      padding: 0 12px;
      background-color: #fff;
      &:last-child{
        color: #fff !important;
        background-color: #5461B8 !important;
        border-color: #5461B8 !important;
        margin-left: 12px;
      }
    }
  }
  #ul {
    height: 350px;
    overflow: auto;
    background: #F7F9FC;
    padding: 5px 15px;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      cursor: pointer;
      .text {
        display: flex;
        align-items: center;
      }
      .adArrow {
        margin-right: 0px;
      }
    }
  }
}
</style>
