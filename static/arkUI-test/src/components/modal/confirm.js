import Vue from 'vue';
import Modal from './modal.vue';
import Button from '../button/button.vue';
import Locale from '../../mixins/locale';
import BurgeonConfig from '../../assets/config';

const prefixCls = `${BurgeonConfig.classFix}modal-confirm`;


Modal.newInstance = properties => {
    properties.zIndex = Vue.prototype.$IVIEW.defaultZindex;
    const _props = properties || {};
    const Instance = new Vue({
        mixins: [Locale],
        data: Object.assign({}, _props, {
            visible: false,
            width: 360,
            title: '',
            body: '',
            iconType: '',
            iconName: '',
            iconClass: '',
            okText: undefined,
            okType:'fcdefault',
            cancelText: undefined,
            cancelType:'fcdefault',
            showOk:true,
            showCancel: false,
            loading: false,
            mask:false,
            buttonLoading: false,
            scrollable: false,
            closable: false,
            buttonalign: false, //控制去定按钮和取消按钮的左右顺序， false是确定按钮在左边
            draggable:true, //控制消息提示是否支持拖拽
            titleAlign:'left', //控制标题的显示位置
            fcFlag: true, //是否是fc
            keyDown: () => {
            } //快捷键回调
        }),
        render (h) {

            let footerVNodes = [];


            if (this.footerRender){
                this.showOk = false;
                footerVNodes.push(h('div', {
                }, [this.footerRender(h)]));
            } else {
                if (this.showCancel) {
                    footerVNodes.push(h(Button, {
                        props: {
                            type: this.cancelType,
                            size: 'default'
                        },
                        on: {
                            click: this.cancel
                        }
                    }, this.localeCancelText));
                }

                footerVNodes.push(h(Button, {
                    props: {
                        type: this.okType,
                        size: 'default',
                        loading: this.buttonLoading
                    },
                    on: {
                        click: this.ok
                    }
                }, this.localeOkText));
            }


            // render content
            let body_render;
            if (this.render) {
                body_render = h('div', {
                    attrs: {
                        class: `${prefixCls}-body  ${prefixCls}-body-render ${prefixCls}-body-render-${this.iconType}`
                    }
                }, [this.render(h)]);
            } else {

                body_render = h('div', {
                    attrs: {
                        class: `${prefixCls}-body  ${this.draggable?`${prefixCls}-body-draggable`:''} ${prefixCls}-body-${this.iconType}`
                    }
                }, [
                    this.bodyReturn(h)
                ]);
            }

            // when render with no title, hide head
            let head_render;
            if (this.title) {
                head_render = h('div', {
                    attrs: {
                        class: `${prefixCls}-head ${prefixCls}-head-${this.iconType}`
                    }
                }, [
                    h('div', {
                        class: this.iconTypeCls
                    }, [
                        h('i', {
                            class: this.iconNameCls
                        })
                    ]),
                    h('div', {
                        attrs: {
                            class: `${prefixCls}-head-title ${prefixCls}-head-title-${this.iconType}`
                        },
                        domProps: {
                            innerHTML: this.title
                        }
                    })
                ]);
            }

            return h(Modal, {
                props: Object.assign({}, _props, {
                    width: this.width,
                    scrollable: this.scrollable,
                    closable: this.closable,
                    mask:this.mask,
                    draggable:this.draggable,
                    title:this.draggable?this.title:'',
                    titleAlign:this.titleAlign,
                    showOk:this.showOk,
                    showCancel:this.showCancel,
                    fcFlag: true
                }),
                domProps: {
                    value: this.visible
                },
                on: {
                    input: (status) => {
                        this.visible = status;
                    },
                    'on-cancel': () => {
                        this.cancel();
                    }
                }
            }, [
                h('div', {
                    attrs: {
                        class: prefixCls
                    }
                }, [
                    this.draggable?'':head_render,
                    body_render,
                    h('div', {
                        attrs: {
                            class: `${prefixCls}-footer ${prefixCls}-footer-${this.iconType}`
                        }
                    }, footerVNodes)
                ])
            ]);
        },
        computed: {
            iconTypeCls () {
                return [
                    `${prefixCls}-head-icon`,
                    `${prefixCls}-head-icon-${this.iconType}`
                ];
            },
            iconNameCls () {
                let iconArr = ['fcSuccess','fcError','fcWarning','posMessage'];
                if (iconArr.indexOf(this.iconType) >= 0){
                    return ;
                }
                return [

                    {
                        [`${BurgeonConfig.classFix}icon`]:!this.iconClass,
                        [`${BurgeonConfig.classFix}icon-${this.iconName}`]:!this.iconClass,
                        [`${prefixCls}-head-icon iconfont ${this.iconName} ${this.iconType} ${this.iconClass}`]:this.iconClass
                    }

                ];
            },
            localeOkText () {
                if (this.okText) {
                    return this.okText;
                } else {
                    return this.t('i.modal.okText');
                }
            },
            localeCancelText () {
                if (this.cancelText) {
                    return this.cancelText;
                } else {
                    return this.t('i.modal.cancelText');
                }
            }
        },
        methods: {
            cancel () {

                this.$children[0].visible = false;
                this.buttonLoading = false;
                this.onCancel();
                this.remove();
            },
            ok () {
                if (this.loading) {
                    this.buttonLoading = true;
                } else {
                    this.$children[0].visible = false;
                    this.remove();
                }
                this.onOk();
            },
            remove () {
                // this.destroy();
                setTimeout(() => {
                    this.destroy();
                }, 100);
            },
            destroy () {
                this.$destroy();
                document.body.removeChild(this.$el);
                this.onRemove();
            },
            onOk () {},
            onCancel () {},
            onRemove () {},
            typeReturn () {
                let type = 'posdefault';
                if (this.iconType === 'posMessage'){
                    type = 'posdefault';
                }

                if (this.iconType === 'fcSuccess' || this.iconType === 'fcError' || this.iconType === 'fcWarning'){
                    type = 'fcdefault';
                }
                return type;
            },
            bodyReturn (h) {
                const iconArr = ['fcSuccess','fcError','fcWarning'];

                if (iconArr.indexOf(this.iconType) >= 0){
                    return h('div', {
                        // domProps: {
                        //     innerHTML: this.body
                        // }
                    },[
                        h('i', {
                            class: `iconfont ${this.iconName} ${this.iconType} ${this.iconClass}`
                        }),
                        h('textarea', {
                            domProps: {
                                innerHTML: this.body
                            },
                            attrs:{
                                readonly:'readonly'
                            },
                            style:{
                                border:'none',
                                resize:'none',
                                height:'auto',
                                width:'100%',
                                color:'#666'
                            }
                        })

                    ]);
                } else {
                    return h('textarea', {
                        domProps: {
                            innerHTML: this.body
                        },
                        attrs:{
                            readonly:'readonly'
                        },
                        style:{
                            border:'none',
                            resize:'none',
                            height:'auto',
                            width:'100%',
                            color:'#666'
                        }
                    });
                }

            },
            onKeyDown (event) {
                this.keyDown(event);
            }
        }
    });

    const component = Instance.$mount();

    document.body.appendChild(component.$el);
    const modal = Instance.$children[0];


    return {
        show (props) {

            modal.$parent.showCancel = props.showCancel;
            modal.$parent.iconType = props.icon;
            modal.$parent.mask = props.mask;
            switch (props.icon) {
                case 'info':
                    modal.$parent.iconName = 'ios-information-circle';
                    break;
                case 'success':
                    modal.$parent.iconName = 'ios-checkmark-circle';
                    break;
                case 'warning':
                    modal.$parent.iconName = 'ios-alert';
                    break;
                case 'error':
                    modal.$parent.iconName = 'ios-close-circle';
                    break;
                case 'confirm':
                    modal.$parent.iconName = 'ios-help-circle';
                    break;
                case 'fcSuccess':
                    modal.$parent.iconName = 'iconbj_correct';
                    break;
                case 'fcWarning':
                    modal.$parent.iconName = 'iconbj_doubt';
                    break;
                case 'fcError':
                    modal.$parent.iconName = 'iconbj_error';
                    break;
                default: modal.$parent.iconName = props.icon;
            }

            if ('width' in props) {
                modal.$parent.width = props.width;
            }

            if ('closable' in props) {
                modal.$parent.closable = props.closable;
            }

            if ('title' in props) {
                modal.$parent.title = props.title;
            }


            if ('content' in props) {
                if (Array.isArray(props.content)) {
                    modal.$parent.body = props.content.join('\n');
                } else {
                    modal.$parent.body = props.content;
                }

            }

            if ('okText' in props) {
                modal.$parent.okText = props.okText;
            }

            if ('cancelText' in props) {
                modal.$parent.cancelText = props.cancelText;
            }

            if ('onCancel' in props) {
                modal.$parent.onCancel = props.onCancel;
            }

            if ('onOk' in props) {
                modal.$parent.onOk = props.onOk;
            }

            // async for ok
            if ('loading' in props) {
                modal.$parent.loading = props.loading;
            }

            if ('scrollable' in props) {
                modal.$parent.scrollable = props.scrollable;
            }

            if ('iconClass' in props) {
                modal.$parent.iconClass = props.iconClass;
            }

            if ('okType' in props) {
                modal.$parent.okType = props.okType;
            }

            if ('cancelType' in props) {
                modal.$parent.cancelType = props.cancelType;
            }

            if ('draggable' in props) {
                modal.$parent.draggable = props.draggable;
            }

            if ('titleAlign' in props) {
                modal.$parent.titleAlign = props.titleAlign;
            }

            if ('footerRender' in props) {
                modal.$parent.footerRender = props.footerRender;
            }

            if ('keyDown' in props) {
                modal.$parent.keyDown = props.keyDown;
            }

            if ('render' in props){
                modal.$parent.render = props.render;

            }


            // notice when component destroy
            modal.$parent.onRemove = props.onRemove;
            modal.visible = true;
            // let iconArr = ['fcSuccess','fcError','fcWarning','posMessage'];

            // if (component.$el.getElementsByClassName(`${prefixCls}`).length > 0 && iconArr.indexOf(props.icon) >= 0){
            //     component.$el.getElementsByClassName(`${BurgeonConfig.classFix}modal-body`)[0].className += ` ${prefixCls}-wrap`;
            // }

            document.addEventListener('keydown', modal.$parent.onKeyDown);
        },
        remove () {
            modal.visible = false;
            modal.$parent.buttonLoading = false;
            modal.$parent.remove();
            document.removeEventListener('keydown', modal.$parent.onKeyDown);
        },
        component: modal
    };
};

export default Modal;
