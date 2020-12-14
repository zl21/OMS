export default {
    name: 'textDispaly',
    functional: true,
    props: {
        title:{
            type:String
        },
        query:{
            type:String
        },
        queryStyle:{
            type:Object
        }
    },
    render: (h, ctx) => {
        if (!ctx.props.query || ctx.props.title.indexOf(ctx.props.query) < 0){ //当query为空或者不存在匹配项时
            return h('span',{},ctx.props.title);
        } else {
            let selectQuery = ctx.props.query;
            let strArr = ctx.props.title.split(selectQuery);
            strArr = strArr.reduce((arr,item,index) => {
                if (index < strArr.length-1){
                    arr.push(item);
                    arr.push(ctx.props.query);
                } else {
                    arr.push(item);
                }
                return arr;
            },[]);

            return h('p',{},strArr.map(item => {
                if (item !== ctx.props.query){
                    return h('span',{},item);
                } else {
                    return h('span',{
                        style:ctx.props.queryStyle,
                        class:'querySpan'
                    },item);
                }

            }));
        }
        // return ctx.props.render(h, params);
    }
};
