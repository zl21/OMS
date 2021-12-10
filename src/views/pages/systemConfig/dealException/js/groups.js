let  groups = {
    operate_type:
        [{ value: 'RETAILES', title: "零售单重推ES" },
        { value: 'STOCK', title: "零售单重调用库存" },
        { value: 'STOREMESS', title: "店长导航数据归集" }],
    es_type:[
        { value: 'IDTYPE', title: "按单号ID" },
        { value: 'DATETYPE', title: "按照日期段" },
    ],
    nav_type:[
        { value: '1', title: "按店铺ID" },
        { value: '2', title: "按日期" },
    ],

}

module.exports = groups;
