/* eslint-disable prefer-destructuring */
import { deepCopy } from '../../utils/assist';

export default {
    methods: {
        alignCls (column, row = {}) {
            let cellClassName = '';
            if (row.cellClassName && column.key && row.cellClassName[column.key]) {
                cellClassName = row.cellClassName[column.key];
            }
            return [
                {
                    [`${cellClassName}`]: cellClassName, // cell className
                    [`${column.className}`]: column.className, // column className
                    [`${this.prefixCls}-column-${column.align}`]: column.align,
                    [`${this.prefixCls}-hidden`]: (this.fixed === 'left' && column.fixed !== 'left') || (this.fixed === 'right' && column.fixed !== 'right') || (!this.fixed && column.fixed && (column.fixed === 'left' || column.fixed === 'right'))
                }
            ];
        },
        isPopperShow (column) {
            return column.filters && ((!this.fixed && !column.fixed) || (this.fixed === 'left' && column.fixed === 'left') || (this.fixed === 'right' && column.fixed === 'right'));
        },
        setCellWidth (col,type) {
            let width = '';
            let column = deepCopy(col);
            if (column.width) {
                width = column.width;
                if (type && type === column.fixed && !column._original && column.width){
                    column.width = column.width+1;
                    width = column.width;
                }

            } else if (this.columnsWidth[column._index]) {
                if ( column.fixed){
                    width = this.columnsWidth[column._index].width+1;
                }

            }
            if (width === '0') {
             width = '';
            }
            if (column.fixed){
               // column.rowspan=4;
                if (!column._columnKey){
                    return `width:${width}px;height:${this.$parent.headerHeight}px;line-height:${this.$parent.headerHeight}px`;
                }
            }

            return `width:${width}px`;
        }
    }
};
