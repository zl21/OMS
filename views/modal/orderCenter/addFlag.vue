<!--
 * @Author: your name
 * @Date: 2021-06-08 14:29:58
 * @LastEditTime: 2021-06-08 16:43:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/modal/orderCenter/addFlag.vue
-->
<template>
    <div class="OC_ORDER_ADD_LABEL">
        <div class="tbody">
            <CheckboxGroup v-model="social">
                <Checkbox v-for="(item,index) in flagList" :key="index" :label="item.value">
                    <span>{{item.label}}</span>
                </Checkbox>
        </CheckboxGroup>
        <Icon type="ios-settings" @click="()=>modal=true" style="fontSize:20px"/>
        </div>
        <div class="footer">
            <businessButton :btn-config="btnConfig"></businessButton>
        </div>
    <Modal
        v-model="modal"
        title="标记管理"
        :mask="true"
        @on-ok="asyncOK">
        <div class="modalModule">
            <Button @click="addList">添加</Button>
            <Table :columns="table.columns" :data="table.data"></Table>
        </div>
    </Modal>
    </div>
</template>

<script>
import businessButton from 'professionalComponents/businessButton';
export default {
    components:{
        businessButton
    },
    props:{
        componentData:{
            type:Object
        }
    },
    data(){
        return {
            modal:false,
            btnConfig:{
                typeAll: 'default',
                btnsite: 'right',
                    buttons: [
                    {
                        text: $i18n.t('common.cancel'), // 返回
                        btnclick: () => {
                            this.$parent.$parent.closeConfirm();
                        }
                    },
                    {
                        text: $i18n.t('common.determine'), // 确定
                        btnclick: () => {
                            this.determine()
                        }
                    },
                    ]
                },
            social: [],
            flagList:[
                {
                    value:'1',
                    label:'加急发货'
                },
                {
                    value:'2',
                    label:'延迟处理'
                },
                {
                    value:'3',
                    label:'全款预售'
                },
                {
                    value:'4',
                    label:'时效订单'
                }
            ],
            table:{
                columns:[
                    {
                        title:'序号',
                        key:'index',
                        render:(h,params) => {
                            return h('span' , {} , params.index + 1)
                        }
                    },
                    {
                        title:'操作',
                        key:'action',
                        render:(h , params) => {
                            return h('a' , {
                                on:{
                                    click:()=>{
                                        this.table.data.splice(params.index , 1);
                                    }
                                }
                            } , '删除')
                        }
                    },
                    {
                        title:'标记说明',
                        key:'message',
                        render:(h , params)=>{
                            return h('Input' , {
                                props:{
                                    value:params.row.message
                                },
                                on:{
                                    'on-change':(val)=>{
                                        console.log(val);
                                        params.row.message = val.target.value;
                                        this.table.data[params.index] = params.row;
                                    }
                                }
                            })
                        }
                    },
                    {
                        title:'备注',
                        key:'remark'
                    }
                ],
                data:[
                    {
                        message:'测试说明',
                        remark:'测试备注'
                    },
                ]
            }
        }
    },
    methods:{
        determine(){
            const self = this;
            if(!self.social.length){
                self.$OMS2.omsUtils.msgTips(self, 'warning', '请选择需要添加的标记!' , 0);
                return;
            }
            console.log(this.social)
            console.log(this.componentData.ids);
        },
        asyncOK(){
            console.log(this.table.data);
        },
        addList(){
            const self = this;
            self.table.data.push({
                message:'',
                remark:''
            })
        }
    }
}
</script>

<style scoped lang="less">
.OC_ORDER_ADD_LABEL {
    .tbody {
        display: flex;
        justify-content: space-between;
        height: 200px;
        padding: 5px;
    }
    .modalModule{
        
    }
}
</style>