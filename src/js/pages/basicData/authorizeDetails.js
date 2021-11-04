/*
 * @Author: your name
 * @Date: 2021-05-06 15:10:50
 * @LastEditTime: 2021-05-26 12:48:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/js/pages/basicData/authorizeDetails.js
 */
import service from '@/service/index';

export default {
    data() {
        return {
            url: ''
        };
    },
    methods: {
        init() {
            let SHOP_ID = this.$route.params.customizedModuleId;
            let data = {
                SHOP_ID,
            };
            service.basicData.isauthorize(data).then(res => {
                // 授权URL   授权标识，授权之后的店铺在新增时需要带着这个id
                if (res.data.code != 0) {
                    return;
                }

                let { AUTHORIZATION_URL } = res.data.data;
                // this.url = ;
                window.open(AUTHORIZATION_URL)
                this.back()

            });
        },
        // 返回
        back() {
            const { fullPath } = this.$route;//获取当前路由fullPath
            const { keepAliveModuleName, tableName } = this.$store.state.global.activeTab;//获取当前缓存模块名称，自定义标识
       
            this.$store.commit('global/tabCloseAppoint', {
                routeFullPath: fullPath,//当前路由fullPath
                stopRouterPush: false, //是否阻止默认跳转到前一个tab
                keepAliveModuleName,//当前模块名称
                tableName,//当前自定义表标识
            })
       
      
        },
    },
    mounted() {
        this.init();
    }

};
