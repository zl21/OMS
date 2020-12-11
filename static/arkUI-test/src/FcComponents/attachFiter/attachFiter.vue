<template>
  <div :class="prefixClass">
    <AutoComplete ref="AutoComplete"
                  v-model="InputVale"
                  :data="AuotData"
                  :disabled="disabledAttach"
                  :hidecolumns="hidecolumns"
                  :columnsKey="columnsKey"
                  :placeholder="placeholder"
                  :enterType ="enterType"
                  @on-search="handleSearch"
                  @on-input="inputValue"
                  @click="handleIconClick"
                  @on-keyup="handleKeyup"
                  @on-enter="handleEnter"
                  @keypress="handleKeypress"
                  @on-keydown="handleKeydown"
                  @on-focus="handleFocus"
                  @on-blur="handleBlur"
                  @on-change="handleChange"
                  @on-clear="clearclick"
                  @on-select="selectOption"
                  :transfer="true"
                  clearable
                  :filter-method="filterMethod">
    </AutoComplete>
    <div class="fkrp-poptip-text">
      <Icon v-if="filterTip===true"
            :type="filtericon"
            @click="showPip('filterTip')"></Icon>
      <Poptip content="content"
              :placement="placement"
              ref="Poptip"
              popperClass="attachfiter-pop-content"
              :transfer="transfer">
        <Icon v-if="optionTip===true"
              type=" iconbj_more"
              @click="showPip('optionTip')"></Icon>
        <div class="api attachfiter-pop"
             slot="content">
          <ul ref="fkrp-ul">
            <li :class="tem.class==='' || tem.class===undefined ? prefixCls+'select-item'
                        : prefixCls+'select-item '+tem.class"
                v-if="datalist.length>0"
                v-for="(tem,index) in datalist"
                @click="choose(index , $event)"
                @dblclick="dbchoose(index  , $event)"
                style="overflow: hidden">
              <template v-if="/导入/.test(tem.value)">
                <input type="file"
                       multiple="multiple"
                       class="fileForm"
                       @change="uploadFile($event, index,tem)">
                {{tem.value}}
              </template>
              <template v-else>
                {{tem.value}}
              </template>
              <i class="iconfont iconbj_delete2"
                 v-if="tem.delete"></i>
            </li>
          </ul>
        </div>
      </Poptip>
    </div>
    <!-- 弹窗 -->
    <Modal v-model="showModal"
           ref="attachModal"
           class="attachFiter-daigo"
           v-bind="modalMesage"
           @on-ok="ok"
           @on-cancel="cancel">
      <div :class="`test-daigo ${showModal ? '': 'attachFiter-daigo-opctiy'}`"
           v-show="showModal"
           v-if="complexs">
        <slot name="daigo">
        </slot>
      </div>

    </Modal>

  </div>
</template>
<script>

import Input from '../../components/input/input.vue';
import AutoComplete from '../../components/auto-complete/auto-complete-clo.vue';

import Modal from '../../components/modal/modal.vue';

import burgeonConfig from '../../assets/config';

import Upload from '../../utils/upload';

const prefixCls = `${burgeonConfig.prefixCls}fkrp-poptip`;

export default {
  name: 'AttachFilter',
  data () {
    return {
      InputVale: this.value,
      showModal: this.dialog && this.dialog.model && this.dialog.model.turn || false,
      selected: [],
      complexs: false,
      showDaigo: {
        title: '标题弹窗',
        width: 100,
        closable: true,
        scrollable: true,
        okText: '确定',
        cancelText: '取消'
      },
      disabledAttach: this.disabled,
      className: prefixCls,
      transfer: true,
      prefixCls: burgeonConfig.prefixCls
    };
  },
  props: {
    datalist: {
      type: Array,
      default () {
        return [];
      }
    },
    AuotData: {
      type: Array,
      default () {
        return [];
      }
    },
    defaultSelected: {
      type: Array,
      default () {
        return [];
      }
    },
    value: {
      type: [Number, String],
      default () {
        return '';
      }
    },
    columns: {
      type: Array,
      default () {
        return [];
      }
    },
    columnsKey: {
      type: Array,
      default () {
        return [];
      }
    },
    hidecolumns: {
      type: Array,
      default () {
        return [];
      }
    },
    placeholder: {
      type: String
    },
    filtericon: {
      type: String,
      default(){
          return 'iconbj_tcduo';
      }
    },
    dialog: {
      type: Object
    },
    filterMethod: {
      type: [Function, Boolean],
      default: false
    },
    optionTip: {
      type: Boolean,
      default: false
    },
    filterTip: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'right-start'
    },
    enterType:{
      type: Boolean,
      default: false
    }
  },
  components: {
    Input, AutoComplete, Modal, Option
  },
  mounted () {
    if (this.defaultSelected[0] && this.defaultSelected[0].Label) {
      this.InputVale = this.defaultSelected[0].Label;
    }
  },
  created () {
    this.selected = this.defaultSelected;
  },
  watch: {
    value: function (val) {
      this.InputVale = val;
    },
    defaultSelected (val) {
      console.log(val);
      if (this.show && val[0] && !!val[0].ID) {
        this.InputVale = this.defaultSelected[0].Label;
        this.disabledAttach = true;
      } else {
        this.disabledAttach = false;
      }
      this.selected = this.defaultSelected;
    },
    selected (val) {

    }
  },
  computed: {
    modalMesage () {
      if (this.dialog) {
        let model = this.dialog && this.dialog.model;
        return Object.assign(this.showDaigo, model);
      } else {
        return Object.assign(this.showDaigo, {});
      }

    },
    prefixClass () {
      if (this.optionTip && this.filterTip) {
        return `${prefixCls} fkrp-poptip-two`;
      } else if (this.optionTip === true || this.filterTip === true) {
        return `${prefixCls} fkrp-poptip-tip`;
      } else {
        return `${prefixCls} fkrp-poptip-bar`;
      }
    },
    filteredData () {
      if (this.filterMethod) {
        return this.AuotData.filter(item => this.filterMethod(this.InputVale, item));
      } else {
        return this.AuotData;
      }
    }
  },
  methods: {
    showPip (type) {
      if (type === 'filterTip') {
        this.showModal = true;
        this.complexs = true;
      }
      this.$emit('on-show', this.InputVale, this);
    },
    uploadFile (event, index, row) {
      let self = this;
      const article = new Upload({
        url: row.url,
        target: event.target.files[0],
        sendData: row.sendData,
        type: 'xlsx',
        success: function (res) {
          self.$emit('on-uploadFile', index, res, this);
        },
        onerror: function (res) {
          self.$emit('on-uploadFile', index, res, this);
        }
      });
      // this.$emit('on-uploadFile',index,event,this);
    },
    choose (index, event) { // 气泡
      this.datalist.forEach((tem) => {
        tem.class = '';
      });
      let tagName = event.target.tagName.toUpperCase();
      this.$refs.Poptip.visible = false;
      if (tagName === 'INPUT') {
        return false;
      }
      this.complexs = true;

      this.datalist[index].class = `${burgeonConfig.prefixCls}select-item-selected ${burgeonConfig.prefixCls}select-item-focus`;
      this.$emit('on-popclick', index, this.datalist[index], tagName, this);
    },
    dbchoose (index, event) {
      this.$refs.Poptip.visible = true;
      this.complexs = true;
      this.datalist.forEach((tem) => {
        tem.class = '';
      });
      let tagName = event.target.tagName.toUpperCase();
      this.datalist[index].class = `${burgeonConfig.prefixCls}select-item-selected ${burgeonConfig.prefixCls}select-item-focus`;
      this.$emit('on-dbpopclick', index, this.datalist[index], tagName, this);
    },
    handleChange (event) {
      this.$emit('on-change', this.InputVale, event, this);
    },
    handleIconClick (event) {
      this.$emit('on-click', this.InputVale, event, this);
    },
    handleKeydown (event) {
      this.$emit('on-keydown', this.InputVale, event, this);
    },
    handleKeyup (event) {
      this.$emit('on-keyup', this.InputVale, event, this);
    },
    handleEnter (event) {
      this.$emit('on-enter', this.InputVale, event, this);
    },
    handleKeypress (event) {
      this.$emit('on-keypress', this.InputVale, event, this);
    },
    handleFocus (event) {
      this.$emit('on-focus', this.InputVale, event, this);
    },
    handleBlur (event) {
      this.$emit('on-blur', this.InputVale, event, this);
    },
    changeValue (val) { // 抛出input
      this.$emit('on-input', val);
    },
    handleSearch (value) {
      //console.log(value);
    },
    inputValue (val, event) {
      this.InputVale = val;
      this.selected = [
        {
          Label: '',
          ID: ''
        }
      ];
      this.$emit('input', this.InputVale, event, this);
    },
    clearclick (val, event) {
      this.complexs = false;
      if (this.show) {
        this.disabledAttach = false;
      }
      this.$emit('on-clear', val, event, this);
    },
    ok () {
        this.showModal = true;
      setTimeout(() =>{
        this.showModal = false;
      },300);
      this.complexs = true;

      //this.modal_loading = true;
      //this.$Modal.remove();
      console.log(this);
      if (this.$slots && this.$slots.daigo[0].children) {
        this.$emit('on-ok', this.$slots.daigo[0].children[0].componentInstance);
      } else {
        this.$emit('on-ok');
      }


    },
    cancel () {
      this.showModal = true;
       setTimeout(() =>{
        this.showModal = false;
      },300);
      this.$emit('on-cancel', this);
    },
    selectclick (val) {
      if (this.show) {
        this.Disabled = val;
      }
    },
    selectOption (value) {
      this.selected = [
        {
          Label: value.label,
          ID: value.value
        }
      ];
      if (this.show) {
        this.disabledAttach = true;
      }
      this.$emit('on-select', value, this);
    }

  }
};
</script>
<style lang="less">
</style>
