<template>
  <div v-transfer-dom :data-transfer="transfer">
    <input ref="hiddenInput" :style="{opacity:0,position:'absolute',zIndex:-1,height:0,top:'-50px'}" :id="`hiddenInput${modalIndex}`">
    <transition :name="transitionNames[1]">
      <div
        :class="maskClasses"
        :style="wrapStyles"
        v-show="visible"
        v-if="showMask"
        @click="handleMask"
      ></div>
    </transition>
    <div :class="wrapClasses" :style="wrapStyles" @click="handleWrapClick" v-if="visible">
      <transition :name="transitionNames[0]" @after-leave="animationFinish" v-if="visible">
        <div :class="classes" :style="mainStyles" v-if="visible">
          <div
            :class="contentClasses"
            ref="content"
            :style="contentStyles"
            v-if="visible"
          >
            <a :class="[prefixCls + '-close']" v-if="closable" @click="close">
              <slot name="close">
                <Icon type="ios-close"></Icon>
              </slot>
            </a>
            <div :class="[prefixCls + '-header']" @mousedown="handleMoveStart" @click="handleClickModal" v-if="showHead">
              <slot name="header">
                <div :class="titleClasses">{{ title }}</div>
              </slot>
            </div>
            <div  :class="bodyClasses">
              <slot></slot>
            </div>
            <div :class="[prefixCls + '-footer']" v-if="!footerHide">
              <slot name="footer">
                <i-button type="text" size="large" @click.native="cancel">{{ localeCancelText }}</i-button>
                <i-button
                  type="primary"
                  size="large"
                  :loading="buttonLoading"
                  @click.native="ok"
                >{{ localeOkText }}</i-button>
              </slot>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import Icon from '../icon';
import iButton from '../button/button.vue';
import TransferDom from '../../directives/transfer-dom';
import Locale from '../../mixins/locale';
import Emitter from '../../mixins/emitter';
import ScrollbarMixins from './mixins-scrollbar';

import { on, off } from '../../utils/dom';
import { findComponentsDownward } from '../../utils/assist';

import {
  transferIndex as modalIndex,
  transferIncrease as modalIncrease
} from '../../utils/transfer-queue';

import BurgeonConfig from '../../assets/config';

const prefixCls = `${BurgeonConfig.prefixCls}modal`;

export default {
  name: 'Modal',
  mixins: [Locale, Emitter, ScrollbarMixins],
  components: { Icon, iButton },
  directives: { TransferDom },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: false
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    title: {
      type: String
    },
    titleAlign: {
      type: String,
      default: 'center'
    },
    width: {
      type: [Number, String],
      default: 520
    },
    okText: {
      type: String
    },
    cancelText: {
      type: String
    },
    loading: {
      type: Boolean,
      default: false
    },
    styles: {
      type: Object
    },
    className: {
      type: String
    },
    // for instance
    footerHide: {
      type: Boolean,
      default: false
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    transitionNames: {
      type: Array,
      default() {
        return ['ease', 'fade'];
      }
    },
    transfer: {
      type: Boolean,
      default() {
        return !this.$IVIEW || this.$IVIEW.transfer === ''
          ? true
          : this.$IVIEW.transfer;
      }
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    mask: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 0
    },
    showCancel:{ //消息提示是否显示取消按钮
        type: Boolean,
        default: false
    },
    showOk:{ //消息提示是否显示确定按钮
        type: Boolean,
        default: true
    },
    fcFlag:{ //是否是fc弹窗
        type: Boolean,
        default: false
    }
  },
  data() {
    return {
      isIE: window.navigator.userAgent.indexOf('Trident') > -1,
      prefixCls: prefixCls,
      wrapShow: false,
      showHead: true,
      buttonLoading: false,
      visible: this.value,
      dragData: {
        x: null,
        y: null,
        dragX: null,
        dragY: null,
        dragging: false
      },
      modalIndex: this.handleGetModalIndex(), // for Esc close the top modal

      transform: {
        transform: 'translate(0,-50%)'
      },
      firstFlag:true
    };
  },
  computed: {
    bodyClasses () {
        return [
            `${prefixCls}-body`,
            {
                [`${BurgeonConfig.classFix}modal-confirm-wrap`]: this.fcFlag
            }
        ];
    },
    wrapClasses() {
      return [
        `${prefixCls}-wrap`,
        {
          [`${prefixCls}-hidden`]: !this.wrapShow,
          [`${this.className}`]: !!this.className,
          [`${prefixCls}-no-mask`]: !this.showMask
        }
      ];
    },
    wrapStyles() {
      return {
        zIndex: Vue.prototype.$IVIEW.defaultZindex+this.modalIndex+this.zIndex
      };
    },
    maskClasses() {
      return `${prefixCls}-mask`;
    },
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-fullscreen`]: this.fullscreen,
          [`${prefixCls}-fullscreen-no-header`]:
            this.fullscreen && !this.showHead,
          [`${prefixCls}-fullscreen-no-footer`]:
            this.fullscreen && this.footerHide
        }
      ];
    },
    titleClasses() {
      return [
        `${prefixCls}-header-inner`,
        {
          [`${prefixCls}-header-inner-${this.titleAlign}`]: this.titleAlign
        }
      ];
    },
    contentClasses() {
      return [
        `${prefixCls}-content`,
        {
          [`${prefixCls}-content-no-mask`]: !this.showMask,
          [`${prefixCls}-content-drag`]: this.draggable,
          [`${prefixCls}-content-dragging`]:
            this.draggable && this.dragData.dragging
        }
      ];
    },
    mainStyles() {
      let style = {};

      const width = parseInt(this.width);
      const styleWidth = this.dragData.x !== null
          ? {
              top: 0
            }
          : {
              width: width <= 100 ? `${width}%` : `${width}px`
            };


      Object.assign(style, styleWidth);

      return style;
    },
    contentStyles() {
      let style = {};

      if (this.draggable) {
        if (this.dragData.x !== null) {
          style.left = `${this.dragData.x}px`;
        }
        if (this.dragData.y !== null) {
          style.top = `${this.dragData.y}px`;
        }
        const width = parseInt(this.width);
        const styleWidth = {
          width: width <= 100 ? `${width}%` : `${width}px`
        };
        if (this.styles && Object.keys(this.styles).length !== 0){
            styleWidth.transform = '';
        }

        // const transfer = { transform: '' };
        if (this.firstFlag){
            const customStyle = this.styles ? this.styles : {};
            Object.assign(style, styleWidth, customStyle);
        } else {
            Object.assign(style, styleWidth);
        }


      }

      if (this.fullscreen){
          Object.assign(style);
      } else if (this.styles){
            Object.assign(style);
        } else {
            Object.assign(style,this.transform);
        }


      return style;
    },
    localeOkText() {
      if (this.okText === undefined) {
        return this.t('i.modal.okText');
      } else {
        return this.okText;
      }
    },
    localeCancelText() {
      if (this.cancelText === undefined) {
        return this.t('i.modal.cancelText');
      } else {
        return this.cancelText;
      }
    },
    showMask() {
      return this.mask;
    }
  },
  methods: {
    close() {
      this.visible = false;
      this.$emit('input', false);
      this.$emit('on-cancel');
    },
    handleMask() {
      if (this.maskClosable && this.showMask) {
        this.close();
      }
    },
    handleWrapClick(event) {
      const className = event.target.getAttribute('class');
      if (className && className.indexOf(`${prefixCls}-wrap`) > -1) {
        this.handleMask();
      }
    },
    cancel() {
      this.close();
    },
    ok() {
      if (this.loading) {
        this.buttonLoading = true;
      } else {
        this.visible = false;
        this.$emit('input', false);
      }
      this.$emit('on-ok');
    },
    EscClose(e) {
      // const $Modals = findComponentsDownward(this.$root, 'Modal').filter(item => item.$data.visible && item.$props.closable);
      // const $TopModal = $Modals.sort((a, b) => (a.$data.modalIndex < b.$data.modalIndex ? 1 : -1))[0];
      // if (this.visible && this.closable) {
      //     if (e.keyCode === 27) {
      //         setTimeout(() => {
      //             $TopModal.close();
      //         }, 0);
      //     }
      // }
    },
    animationFinish() {
      this.$emit('on-hidden');
    },
    handleMoveStart(event) {
        this.firstFlag = false;
      if (!this.draggable) {
        return false;
      }
      this.transform = {};

      const $content = this.$refs.content;
      const rect = $content.getBoundingClientRect();
      this.dragData.x = rect.x;
      this.dragData.y = rect.y;

      const distance = {
        x: event.clientX,
        y: event.clientY
      };

      this.dragData.dragX = distance.x;
      this.dragData.dragY = distance.y;

      this.dragData.dragging = true;

      on(window, 'mousemove', this.handleMoveMove);
      on(window, 'mouseup', this.handleMoveEnd);
    },
    handleMoveMove(event) {
      if (!this.dragData.dragging) {
        return false;
      }

      const $content = this.$refs.content;
      const rect = $content.getBoundingClientRect();

      let distance = {
        x: event.clientX,
        y: event.clientY
      };

      let diff_distance = {
        x: distance.x - this.dragData.dragX,
        y: distance.y - this.dragData.dragY
      };

      this.dragData.x += diff_distance.x;
      this.dragData.y += diff_distance.y;

      if (this.dragData.x <= 0) {
        this.dragData.x = 0;
      }

      if (this.dragData.y <= 0) {
        this.dragData.y = 0;
      }

      let documentWidth = window.innerWidth;

      if (this.dragData.x + rect.width > documentWidth) {
        this.dragData.x = rect.x;
      }

      let documentHeight = window.innerHeight;
      if (this.dragData.y + rect.height > documentHeight) {
        this.dragData.y = rect.y;
      }

      this.dragData.dragX = distance.x;
      this.dragData.dragY = distance.y;
    },
    handleMoveEnd() {
      this.dragData.dragging = false;
      off(window, 'mousemove', this.handleMoveMove);
      off(window, 'mouseup', this.handleMoveEnd);
    },
    handleGetModalIndex() {
      modalIncrease();
      return modalIndex;
    },
    handleClickModal() {
      if (this.draggable) {
        this.modalIndex = this.handleGetModalIndex();
      }
    },
    onKeyDown(e) {

      if (this.visible){
          this.$emit('on-keydown',e);
      }
    }
  },
  mounted() {
    if (this.visible) {
      this.wrapShow = true;
    }

    let showHead = true;
    if (this.$slots.header === undefined && !this.title) {
      showHead = false;
    }
    this.showHead = showHead;

    // keydown
    document.addEventListener('keydown', this.onKeyDown);


  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown);
    this.removeScrollEffect();
  },
  watch: {
    value(val) {
      this.visible = val;
    },
    visible(val) {

      if (val === false) {
        this.buttonLoading = false;
        this.firstFlag = true;
        this.transform = {
            transform: 'translate(0,-50%)'
        };
        this.dragData = {
        x: null,
        y: null,
        dragX: null,
        dragY: null,
        dragging: false
      };
        this.timer = setTimeout(() => {
          this.wrapShow = false;
          this.removeScrollEffect();
        }, 300);
      } else {
        this.modalIndex = this.handleGetModalIndex();

        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.wrapShow = true;
        if (!this.scrollable) {
          this.addScrollEffect();
        }
        this.$nextTick(() => {
            if (document.getElementById(`hiddenInput${modalIndex}`)){
                document.getElementById(`hiddenInput${modalIndex}`).focus();
                if (this.isIE) {
                    const event = document.createEvent('HTMLEvents');
                    event.initEvent('click', true, true);
                    document.getElementById(`hiddenInput${modalIndex}`).dispatchEvent(event);
                } else {
                    document.getElementById(`hiddenInput${modalIndex}`).dispatchEvent(new Event('click'));
                }
            }

        });
      }
      this.broadcast('Table', 'on-visible-change', val);
      this.broadcast('Slider', 'on-visible-change', val); // #2852
      this.$emit('on-visible-change', val);
    },
    loading(val) {
      if (!val) {
        this.buttonLoading = false;
      }
    },
    scrollable(val) {
      if (!val) {
        this.addScrollEffect();
      } else {
        this.removeScrollEffect();
      }
    },
    title(val) {
      if (this.$slots.header === undefined) {
        this.showHead = !!val;
      }
    }
  }
};
</script>
