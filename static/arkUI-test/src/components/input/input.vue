<template>
    <div :class="wrapClasses">
        <template v-if="type !== 'textarea'">
            <div :class="[prefixCls + '-group-prepend']" v-if="prepend" v-show="slotReady">
                <slot name="prepend"></slot>
            </div>
            <i :class="[burgeonConfig.prefixCls+'icon',burgeonConfig.prefixCls+'iconios-close-circle iconfont iconios-close-circle', prefixCls + '-icon', prefixCls + '-icon-clear' , prefixCls + '-icon-normal']"
               v-if="clearable && currentValue" ref="clearIcon" @click="handleClear"></i>
            <i :class="[burgeonConfig.prefixCls+'icon',burgeonConfig.prefixCls+'icon-'+icon+' iconfont icon' + icon, prefixCls + '-icon', prefixCls + '-icon-normal']"
               v-else-if="icon" @click="handleIconClick"></i>
            <i c
               :class="[burgeonConfig.prefixCls+'icon',burgeonConfig.prefixCls+' iconfont iconios-search',prefixCls + '-icon', prefixCls + '-icon-normal', prefixCls + '-search-icon']"
               v-else-if="search && enterButton === false" @click="handleSearch"></i>
            <span :class="[burgeonConfig.prefixCls+'input-suffix',showSuffix]" v-else-if="showSuffix"><slot
                name="suffix"><i
                :class="[`${burgeonConfig.prefixCls}icon`,`${burgeonConfig.prefixCls} iconfont icon` + suffix,suffix]"
                v-if="suffix"></i></slot></span>
            <transition name="fade">
                <i :class="[burgeonConfig.prefixCls+'icon',burgeonConfig.prefixCls+' iconfont iconios-loading',burgeonConfig.prefixCls+'load-loop',prefixCls + '-icon', prefixCls + '-icon-validate']"
                   v-if="!icon"></i>
            </transition>
            <Poptip v-if="disabled && disabledHidden" placement="top" trigger="hover" word-wrap  :content="currentValue">
                <input
                :id="elementId"
                :autocomplete="autocomplete"
                :spellcheck="spellcheck"
                ref="input"
                :type="type"
                :class="inputClasses"
                :placeholder="placeholder"
                :disabled="disabled"
                :maxlength="maxlength"
                :readonly="readonly"
                :name="name"
                :number="number"
                :autofocus="autofocus"
                :value="currentValue"
                @keyup.enter="handleEnter"
                @keyup="handleKeyup"
                @keypress="handleKeypress"
                @keydown="handleKeydown"
                @focus="handleFocus"
                @blur="handleBlur"
                @input="handleInput"
                @change="handleChange">
            </Poptip>
            <input
                v-else
                :id="elementId"
                :autocomplete="autocomplete"
                :spellcheck="spellcheck"
                ref="input"
                :type="type"
                :class="inputClasses"
                :placeholder="__disablePlaceholder__ ? undefined : placeholder"
                :disabled="disabled"
                :maxlength="maxlength"
                :readonly="readonly"
                :name="name"
                :number="number"
                :autofocus="autofocus"
                :value="currentValue"
                @keyup.enter="handleEnter"
                @keyup="handleKeyup"
                @keypress="handleKeypress"
                @keydown="handleKeydown"
                @focus="handleFocus"
                @blur="handleBlur"
                @input="handleInput"
                @change="handleChange">
            <div :class="[prefixCls + '-group-append']" v-if="append" ref="append" v-show="slotReady">
                <slot name="append"></slot>
            </div>
            <div :class="[prefixCls + '-group-append', prefixCls + '-search']" v-else-if="search && enterButton"
                 @click="handleSearch">

                <Icon v-if="enterButton === true" type="ios-search"></Icon>
                <template v-else>{{ enterButton }}</template>
            </div>
            <span :class="[burgeonConfig.prefixCls+'input-prefix',showPrefix]" v-else-if="showPrefix"><slot
                name="prefix"><i
                :class="[burgeonConfig.prefixCls+'icon',burgeonConfig.prefixCls+' icon' + prefix,prefix]"
                v-if="prefix"></i></slot></span>
        </template>
        <textarea
            v-else
            resize="both"
            :id="elementId"
            :wrap="wrap"
            :autocomplete="autocomplete"
            :spellcheck="spellcheck"
            ref="textarea"
            :class="[textareaClasses,{'readonlyIE':isIEclass}]"
            :style="textareaStyles"
            :placeholder="placeholder"
            :disabled="getDisabledValue"
            :rows="rows"
            :maxlength="maxlength"
            :readonly="getReadonlyValue"
            :name="name"
            :unselectable="unselectable"
            :value="currentValue"
            :autofocus="autofocus"
            @keyup.enter="handleEnter"
            @keyup="handleKeyup"
            @keypress="handleKeypress"
            @keydown="handleKeydown"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="handleInput"
            >
        </textarea>

    </div>
</template>
<script>
    /* eslint-disable no-lonely-if,prefer-destructuring */

    import {oneOf, findComponentUpward} from '../../utils/assist';
    import calcTextareaHeight from '../../utils/calcTextareaHeight';
    import Emitter from '../../mixins/emitter';


    import burgeonConfig from '../../assets/config';

    const prefixCls = `${burgeonConfig.prefixCls}input`;

    export default {
        name: 'Input',
        mixins: [Emitter],
        props: {
            __disableInputEvent__: {
                default: false
            },
            __disablePlaceholder__: {
                default: false
            },
            type: {
                validator(value) {
                    return oneOf(value, ['text', 'textarea', 'password', 'url', 'email', 'date']);
                },
                default: 'text'
            },
            value: {
                type: [String, Number],
                default: ''
            },
            size: {
                validator(value) {
                    return oneOf(value, ['small', 'large', 'default']);
                },
                default() {
                    return !this.$IVIEW || this.$IVIEW.size === '' ? 'default' : this.$IVIEW.size;
                }
            },
            placeholder: {
                type: String,
                default: '请输入'
            },
            maxlength: {
                type: Number
            },
            disabled: {
                type: Boolean,
                default: false
            },
            icon: String,
            autosize: {
                type: [Boolean, Object],
                default: false
            },
            rows: {
                type: Number,
                default: 2
            },
            readonly: {
                type: Boolean,
                default: false
            },
            name: {
                type: String
            },
            number: {
                type: Boolean,
                default: false
            },
            autofocus: {
                type: Boolean,
                default: false
            },
            spellcheck: {
                type: Boolean,
                default: false
            },
            autocomplete: {
                validator(value) {
                    return oneOf(value, ['on', 'off', 'new-password']);
                },
                default: 'off'
            },
            clearable: {
                type: Boolean,
                default: false
            },
            elementId: {
                type: String
            },
            wrap: {
                validator(value) {
                    return oneOf(value, ['hard', 'soft']);
                },
                default: 'soft'
            },
            prefix: {
                type: String,
                default: ''
            },
            regx: {},
            suffix: {
                type: String,
                default: ''
            },
            search: {
                type: Boolean,
                default: false
            },
            enterButton: {
                type: [Boolean, String],
                default: false
            },
            customData: {
                type: Object,
                default: () =>{}
            },
            disabledHidden:{
                type: Boolean,
                default:false
            }
        },
        model:{
          event: 'on-input-model'
        },
        data() {
            return {
                unselectable:'',
                compositionBefore: '',
                compositionValue: '',
                beforeEmitModelValue: '',
                currentValue: this.value,
                prefixCls: prefixCls,
                burgeonConfig: burgeonConfig,
                prepend: true,
                append: true,
                slotReady: false,
                textareaStyles: {},
                showPrefix: false,
                showSuffix: false,
                inputEvent: {},
                isNumber: false,
                chinese:false,
                pasteRegex: false,
                isIEclass:false
            };
        },
        computed: {
            getReadonlyValue(){
                     if (!!window.ActiveXObject || 'ActiveXObject' in window&&this.disabled){ //判断是否是IE 11及以下或者其他(其他里包括IE edge)
                       this.unselectable='on';
                       return true;
                     } else {
                          this.isIEclass=false;
                          this.unselectable='';
                       return this.readonly;
                     }
            },
            getDisabledValue(){
               if (!!window.ActiveXObject || 'ActiveXObject' in window){ //判断是否是IE 11及以下或者其他(其他里包括IE edge)
                     if (this.disabled){
                        this.isIEclass=true;
                        return false;
                     }
               } else {
                       this.isIEclass=false;
                       this.unselectable='';
                   return this.disabled;
               }
            },
            wrapClasses() {
                return [
                    `${prefixCls}-wrapper`,
                    {
                        [`${prefixCls}-wrapper-${this.size}`]: !!this.size,
                        [`${prefixCls}-type`]: this.type,
                        [`${prefixCls}-group`]: this.prepend || this.append || (this.search && this.enterButton),
                        [`${prefixCls}-group-${this.size}`]: (this.prepend || this.append || (this.search && this.enterButton)) && !!this.size,
                        [`${prefixCls}-group-with-prepend`]: this.prepend,
                        [`${prefixCls}-group-with-append`]: this.append || (this.search && this.enterButton),
                        [`${prefixCls}-hide-icon`]: this.append, // #554
                        [`${prefixCls}-with-search`]: this.search && this.enterButton
                    }
                ];
            },
            inputClasses() {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-${this.size}`]: !!this.size,
                        [`${prefixCls}-disabled`]: this.disabled,
                        [`${prefixCls}-disabledHidden`]: this.disabled && this.disabledHidden,
                        [`${prefixCls}-with-prefix`]: this.showPrefix,
                        [`${prefixCls}-with-suffix`]: this.showSuffix || (this.search && this.enterButton === false)
                    }
                ];
            },
            textareaClasses() {
                console.log(444, this.disabled);
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-disabled`]: true
                    }
                ];
            }
        },
        methods: {
            handleCompositionStart(e) {
                this.compositionBefore = e.target.value;
            },
            handleCompositionEnd(e) {
                if (this.__disableInputEvent__) {
                    this.compositionValue = e.target.value.replace(this.compositionBefore, '');
                    e.target.value = e.target.value.replace(this.compositionValue, '');
                }
            },
            handleEnter(event) {
                this.$emit('on-enter', event, this);
                if (this.search) {
                    this.$emit('on-search', this.currentValue, this);
                }
            },
            handleKeydown(event) {
                this.$emit('on-keydown', event, this);
            },
            handleKeypress(event) {
                this.$emit('on-keypress', event, this);
            },
            handleKeyup(event) {
                this.$emit('on-keyup', event, this);
            },
            handleIconClick(event) {
                this.$emit('on-click', event, this);
            },
            handleFocus(event) {
                this.$emit('on-focus', event, this);
            },
            handleBlur(event) {
                if (this.number){
                    if (event.target.value){
                        event.target.value = Number(event.target.value);
                        this.$emit('on-change', event, this);
                    }
                }
                this.$emit('on-blur', event, this);
                if (!findComponentUpward(this, ['DatePicker', 'TimePicker', 'Cascader', 'Search'])) {
                    this.dispatch('FormItem', 'on-form-blur', this.currentValue);
                }
            },
            handleInput(event) {
                if (this.pasteRegex) {
                    return false;
                }
                if (this.chinese){
                    return false;
                }
                this.$emit('input', event.target.value, this);
                if (this.regx){
                    if (this.number){
                        if (event.target.value){
                            let val = event.target.value;
                            if (!this.regx.test(event.target.value)){
                                event.target.value = event.target.value.substring(0, event.target.value.length - 1);
                                this.$emit('on-regx-check', event.target.value, this,val);
                            }
                            this.beforeEmitModelValue = event.target.value;
                            if (isNaN(Number(event.target.value))){
                                 event.target.value = '';
                                 this.$emit('on-input-model', 0);
                                 this.currentValue = event.target.value;
                            } else {
                                 this.$emit('on-input-model', Number(event.target.value));
                                 this.currentValue = event.target.value;
                            }

                            this.$emit('on-change', event, this);
                        } else if (event.target.value === ''){
                            this.$emit('on-input-model', event.target.value);
                            this.$emit('on-change', event, this);
                        }
                    } else {
                        let val = event.target.value;
                        if (!this.regx.test(event.target.value)){
                            if (event.target.value && event.target.value.indexOf('……') > -1) {
                                event.target.value = event.target.value.replace('……', '');
                            } else {
                                event.target.value = event.target.value.substring(0, event.target.value.length - 1);
                            }
                            this.$emit('on-regx-check', event.target.value, this,val);
                        }
                        this.$emit('on-input-model', event.target.value);
                        this.currentValue = event.target.value;
                        this.$emit('on-change', event, this);
                    }
                } else {
                    let value = event.target.value;
                    if (this.number && value !== '') {
                        value = Number.isNaN(Number(value)) ? value : Number(value);
                    }
                    this.$emit('on-input-model', value);
                    this.setCurrentValue(value);
                    this.$emit('on-change', event, this);
                }
            },
            handleChange(event) {
                this.$emit('on-input-change', event, this);
            },
            setCurrentValue(value) {
                if (value === this.currentValue) {
                    return;
                }
                this.$nextTick(() => {
                    this.resizeTextarea();
                });
                this.currentValue = value;
                if (!findComponentUpward(this, ['DatePicker', 'TimePicker', 'Cascader', 'Search'])) {
                    this.dispatch('FormItem', 'on-form-change', value);
                }
            },
            resizeTextarea() {
                const autosize = this.autosize;
                if (!autosize || this.type !== 'textarea') {
                    return false;
                }

                const minRows = autosize.minRows;
                const maxRows = autosize.maxRows;

                this.textareaStyles = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
            },
            focus() {
                if (this.type === 'textarea') {
                    this.$refs.textarea.focus();
                } else {
                    this.$refs.input.focus();
                }
            },
            blur() {
                if (this.type === 'textarea') {
                    this.$refs.textarea.blur();
                } else {
                    this.$refs.input.blur();
                }
            },
            handleClear() {
                const e = {target: {value: ''}};
                this.$emit('on-input-model', '');
                this.$emit('input', '', this);
                this.setCurrentValue('');
                this.$emit('on-clear', e, this);
            },
            handleSearch() {
                if (this.disabled) {
                    return false;
                }
                this.$refs.input.focus();
                this.$emit('on-search', this.currentValue, this);
            },
            getClearIconStyle() {
                this.$nextTick(() =>{
                    if (this.append) {
                        let paddingRight = this.$refs.append.offsetWidth;
                        if (this.$refs.clearIcon) {
                            this.$refs.clearIcon.style['margin-right'] = `${paddingRight}px`;
                        }
                    }
                });
            }
        },
        watch: {
            value(val) {
                // console.log(val);
                const { beforeEmitModelValue } = this;
                const splitValue = beforeEmitModelValue.split('.');
                if (splitValue.length === 2 && Number(splitValue[0]) === val) {
                    this.setCurrentValue(beforeEmitModelValue);
                } else {
                    this.setCurrentValue(val);
                }
            },
            currentValue(val) {
                if (val){
                    this.getClearIconStyle();
                }
            }
        },
        updated() {
            const { customData } = this;
            if (customData && Object.prototype.toString.call(customData) === '[object Object]') {
                Object.keys(customData).forEach((key) => {
                    if (Object.keys(this.$props).indexOf(key) === -1) {
                        this[key] = customData[key];
                    }
                });
            }
        },
        mounted() {
            setTimeout(() => {
                if (this.$refs.textarea) {
                    this.$refs.textarea.addEventListener('compositionstart', this.handleCompositionStart);
                    this.$refs.textarea.addEventListener('compositionend', this.handleCompositionEnd);
                }
            }, 100);
            if (this.type !== 'textarea') {
                this.prepend = this.$slots.prepend !== undefined;
                this.append = this.$slots.append !== undefined;
                this.showPrefix = this.prefix !== '' || this.$slots.prefix !== undefined;
                this.showSuffix = this.suffix !== '' || this.$slots.suffix !== undefined;
            } else {
                this.prepend = false;
                this.append = false;
            }
            let that = this;
            if (this.$refs.input){
                this.$refs.input.addEventListener('paste', (event) => {
                    this.pasteRegex = true;
                    setTimeout(() => {
                        if (this.regx && !this.regx.test(event.target.value)) {
                            this.pasteRegex = true;
                            event.target.value = '';
                            this.$emit('on-input-model', '');
                            this.currentValue = '';
                            this.pasteRegex = false;
                        } else {
                            this.pasteRegex = false;
                        }
                        this.handleInput(event);
                    },0);
                });
                this.$refs.input.addEventListener('compositionstart', (event) => {
                    that.chinese = true;
                });
                this.$refs.input.addEventListener('compositionend', (event) => {
                    that.chinese = false;
                    if (that.regx && !that.regx.test(event.target.value)){
                        event.target.value = that.value;
                        return false;
                    }
                    if (that.number){
                        event.target.value = that.value;
                        return false;
                    }
                    that.handleInput(event);
                });


            }
            this.slotReady = true;
            this.resizeTextarea();
            this.getClearIconStyle();
        },
        beforeDestroy() {
            if (this.$refs.textarea) {
                this.$refs.textarea.removeEventListener('compositionstart', this.handleCompositionStart);
                this.$refs.textarea.removeEventListener('compositionend', this.handleCompositionEnd);
            }
        }
    };
</script>
