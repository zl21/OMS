
// 查找数组中最后一个不为空的值，获取可使用空位,为了找出这一行是否能够存放当前元素。
// 返回值为该行可放的空格数
function getLastNotNull(array) {
  let canUseLength = array.length;
  // 数组取反,获取到第一个不为空的值，则判断出该行可放的空格数量
  array.reverse().every((item, index) => {
    if (item) {
      canUseLength = index;
      return false;
    }
    return true;
  });
  return canUseLength;
}


// 判断从当前空格开始填，是否所有空格都能够放入
// currentRow:当前开始填充行
// currentCol:当前开始填充列
// pointer:当前元素的数据，宽高
// ListsMap:当前整个填充块的
// defaultColumn:默认一列的行数
function checkAllSpace(currentRow, currentCol, pointer, ListsMap, defaultColumn) {
  const rowArray = Array(pointer.row).fill(null);
  const colArray = Array(pointer.col).fill(null);
  
  let flag = true;
  rowArray.map((item, row) => {
    colArray.map((temp, col) => {
      if (ListsMap[row + currentRow][col + currentCol]) {
        flag = false;
      }
    });
  });
  if ((currentCol + pointer.col) > defaultColumn) {
    flag = false;
  }
  return flag;
}


// defaultColumn:默认每行的列数
// lists:[{  //每一个item的行和宽
//   row:,
//   col:
// }]
// type:fill  填充  newline  换行
// 返回值是在lists的item中添加x,y属性:
// {
//   y:i+1,  //列
//   x:j+1,  //行
//   row:pointer.row, //行高
//   col:pointer.col  //宽高
// }
function layoutAlgorithm(defaultColumn, lists, type = 'fill') {
  // 定义每一行的空数据defaultRow
  const defaultRow = Array(defaultColumn).fill(null);
  // 定义最大行数
  const num = lists.reduce((sum, current) => { sum += (!current.row || current.row < 1) ? 1 : current.row; return sum; }, 0);
  const sumArray = Array(num).fill(null);

  // 定义map模型 默认 50*defaultColumn的布局
  const ListsMap = sumArray.concat([]).reduce((currentValue) => {
    currentValue.push(defaultRow.concat([]));
    return currentValue;
  }, []);


  const coordinateMap = {};
  // 遍历配置文件的行列数，获取对应的grid布局坐标
  lists.every((pointer, pointerIndex) => {
    // 对初始化数据进行判断处理
    // 当列数大于默认分列时，将当前元素列改为默认的分列数
    // 当当前项没有设置宽高，默认设为1
    if (pointer.show === false) { // 当属性show为false时，则默认返回位置(-1,-1)即不显示该节点
      if (!coordinateMap[pointerIndex]) { // 记录起始的行列以及宽高，作为function返回值
        pointer.x = -1;
        pointer.y = -1;
        coordinateMap[pointerIndex] = pointer;
      }
      return true;
    }
    pointer.col = (!pointer.col || pointer.col < 1) ? 1 : pointer.col;
    pointer.col = pointer.col > defaultColumn ? defaultColumn : pointer.col;
    pointer.row = (!pointer.row || pointer.row < 1) ? 1 : pointer.row;
    ListsMap.every((item, i) => item.every((temp, j) => {
      // 当类型为换行时,判断该行是否可放入,不可放入时则换行
      if (type === 'newline') {
        if (getLastNotNull([].concat(item)) < pointer.col) {
          return true;
        }
      }
      // 当类型为填充时,才执行checkAllSpace，对对应的所有空格进行可填充判断
      if (!temp && (type === 'fill' ? checkAllSpace(i, j, pointer, ListsMap, defaultColumn) : true)) { // 为空时可放
        if (!coordinateMap[pointerIndex]) { // 记录起始的行列以及宽高，作为function返回值
          pointer.x = j + 1;
          pointer.y = i + 1;
          coordinateMap[pointerIndex] = pointer;
        }
        // 将对应的点打上标记
        const rowArray = Array(pointer.row).fill(null);
        const colArray = Array(pointer.col).fill(null);
        rowArray.map((item, row) => {
          colArray.map((temp, col) => {
            ListsMap[i + row][j + col] = `k${pointerIndex}`;
            return true;
          });
          return true;
        });

        return false;
      }
      return true;
    }));
    return true;
  });

  return coordinateMap;
} 


export default layoutAlgorithm;
