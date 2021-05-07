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
            service.basicData.isauthorize(data).then(res=>{
                // 授权URL   授权标识，授权之后的店铺在新增时需要带着这个id
                if (res.data.code != 0) {
                    return;
                }
               
                let { AUTHORIZATION_URL } = res.data.data;
               this.url = AUTHORIZATION_URL;
            });
        }
    },
    mounted() {
        this.init();
    }

};
