import commodityCenter from '@/service/api-path/modules/commodity-center';
import ServiceBase from "@/service/api-service/service-base";

class CommodityCenter extends ServiceBase {
  constructor() {
    super();
    this.skuGroupSave = this.post.bind(this, commodityCenter.skuGroupSave);
    this.skuGroupDelDetail = this.post.bind(this, commodityCenter.skuGroupDelDetail);
    this.skuGroupSubmit = this.post.bind(this, commodityCenter.skuGroupSubmit);
    this.skuGroupVoid = this.post.bind(this, commodityCenter.skuGroupVoid);
    this.skuPage = this.post.bind(this, commodityCenter.skuPage);
    this.skuGroupDetailSearch = this.post.bind(this, commodityCenter.skuGroupDetailSearch);
    this.skuGroupEditorSearch = this.post.bind(this, commodityCenter.skuGroupEditorSearch);
  }
}

export default new CommodityCenter();
