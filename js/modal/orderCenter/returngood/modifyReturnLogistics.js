/*
 * @Author: your name
 * @Date: 2021-06-02 19:22:02
 * @LastEditTime: 2021-06-02 20:38:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/js/modal/orderCenter/returngood/modifyReturnLogistics.js
 */
import businessForm from 'professionalComponents/businessForm';
import businessButton from 'professionalComponents/businessButton';
export default {
    components:{
        businessForm,
        businessButton,
    },
    data(){
        return {
            vmI18n:$i18n,
            formConfig: {
                formValue: {},
                ruleValidate: {},
                formData: [{
                  style: 'popInput',
                  width: '24',
                  itemdata: {
                    col: 1,
                    version:'1.4',
                    colid: 179538,
                    colname: 'CP_C_LOGISTICS_ID', // 当前字段的名称
                    datelimit: 'all',
                    display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
                    fkdisplay: 'drp', // 外键关联类型
                    fkdesc: '实体仓档案',
                    inputname: 'CP_C_LOGISTICS_ID:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
                    isfk: true, // 是否有fk键
                    isnotnull: true, // 是否必填
                    isuppercase: false, // 是否转大写
                    length: 20, // 最大长度是多少
                    name: '物流公司', // '入库实体仓库'
                    readonly: false, // 是否可编辑，对应input   readonly属性
                    reftable: 'CP_C_PHY_WAREHOUSE', // 对应的表
                    reftableid: 24486, // 对应的表ID
                    row: 1,
                    statsize: -1,
                    type: 'STRING', // 这个是后台用的
                    pid: '',
                    valuedata: '' // 这个是选择的值
                  }
                }]
              },
        }
    },
    mounted(){
        this.check();
    },
    methods:{
        check(){
            let self = this;
            self.service.orderCenter.checkOrderBeforeLogistics({}).then((res)=>{
                console.log(res);
                {
                    ID_AND_BILL_NO_LIST:[{
                        ID:"",
                        BILL_NO:""
                    }]
                }
            })
        }
    }
}