import CustomizedConfig from 'burgeonConfig/customized.config';
import cusAllPageConfig from './customized.page.config.js';

function handerTreeList(tableNameList) {
    let treeDataConfig = {};
    tableNameList.forEach(item => {
        if (!item.table) return;
        treeDataConfig = Object.assign(treeDataConfig, {
            [item.table]: () => async () => {
                let data = [];
                let income;
                if (item.formdata) {
                    let formdata = new FormData();
                    formdata = item.formdata ? formdata.append('param', item.formdata) : '';
                    income = formdata;
                } else if (item.json) {
                    income = item.json ? item.json : {};
                }
                const res = await service[item.center][item.api](income);
                data = res.data instanceof Array ? res.data : res.data.data;
                // data.map(item=>item.open =true)
                const treeData = {
                    data,
                    name: item.name || 'ID',
                    placeholder: item.placeholder || '请输入',
                    query: item.query || {},
                    searchData: item.searchData || {}
                };
                return treeData;
            }
        });
    });
    return treeDataConfig;
}
/**
 * @method 用于比较对象
 * @propName 根据对象的什么属性进行比较（一般根据对象的key）
 * @objX @objY 待进行比较的两个对象
 * @return key值相同返回1
 */
 function compareObjectFunction(propName) {
	return function (objX, objY) {
		let x = objX[propName],
			y = objY[propName];
		if (x < y) {
			return -1;
		} else {
			return 1;
		}
	}
}

/**
 * @method 用于修改二维对象的属性 eg.allCenter:{orderCenter:{orderAdd:'订单新增'}}
 * @property 对应当前类中的私有属性（私有属性不能通过中括号语法访问，可以尝试先改import进来的东西，改了之后再一次赋值给私有属性）
 * @configObj 外部传入的对象
 * @return 配置项
 */
function modifyObjectFunction(property, configObj = {}) {
	if (!Object.keys(configObj)) return
	for (const key1 in configObj) {
		if (!Object.keys(configObj[key1])) return
		for (const key2 in configObj[key1]) {
			const pubProperty = property;
			if (pubProperty[key1]) {
				// 存在此中心则修改
				pubProperty[key1][key2] = configObj[key1][key2];
			} else {
				// 不存在此中心则直接新增
				pubProperty[key1] = configObj[key1];
			}
		}
	}
}

let beforeEach = (to, from, next) =>{
    // 判断是否是定制界面
    if(to.meta?.routePrefix === '/CUSTOMIZED'){
      // 获取当前页面的路由的 
      let currentKey = to.params.customizedModuleName;
     
      // 循环页面配置查找当前路由的配置 并给singleType赋值
      currentKey in cusAllPageConfig && (CustomizedConfig.BtnConfig.singleType=Number(!cusAllPageConfig[currentKey].isList));
    }
    // 其他判断
    
    // 进入下一个钩子
    next();
  }

export {
    handerTreeList,
    compareObjectFunction,
    modifyObjectFunction,
    beforeEach,
}
/* treeDataConfig = (() => {
  tableNameList.forEach(item => {
    if (!item.table) return;
    treeDataConfig = Object.assign(treeDataConfig, {
      [item.table]: () => async () => {
        let data = [];
        let income;
        if (item.formdata) {
          let formdata = new FormData();
          formdata = item.formdata ? formdata.append('param', item.formdata) : '';
          income = formdata;
        } else if (item.json) {
          income = item.json ? item.json : {};
        }
        const res = await service[item.center][item.api](income);
        data = res.data instanceof Array ? res.data : res.data.data;
        // data.map(item=>item.open =true)
        const treeData = {
          data,
          name: item.name || 'ID',
          placeholder: item.placeholder || '请输入',
          query: item.query || {},
          searchData: item.searchData || {}
        };
        return treeData;
      }
    });
  });
  return treeDataConfig;
})(); */