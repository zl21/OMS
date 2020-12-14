export default {
    name: 'TableSlot',
    functional: true,
    props: {
        row: Object,
        index: Number,
        column: {
            type: Object,
            default: null
        }
    },
    inject: ['tableRoot'],
    render: (h, ctx) => h('div', ctx.injections.tableRoot.$scopedSlots[ctx.props.column.slot]({
            row: ctx.props.row,
            column: ctx.props.column,
            index: ctx.props.index
        }))
};