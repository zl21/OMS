// 其他配置信息
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  storySort: (a, b) => {
    /**    * 排序逻辑    * 将文档内容中所有内容去除中文、改小写，去空格，再去已经排序好的数据处理    * ex. 按钮 Button  => button    *    * 排序规则 0: 相同位置 -1: 前 1: 后    */
    const aSinpleName = a[1].kind.replace(/[\u4e00-\u9fa5\/]/g, "").toLowerCase().trim();
    const bSinpleName = b[1].kind.replace(/[\u4e00-\u9fa5\/]/g, "").toLowerCase().trim();
    const aSortNum = getSortNumByMenu(aSinpleName); // 获取字典中排序编号  const bSortNum = getSortNumByMenu(bSinpleName);  // 自有组件，直接排在最后。PS. 非官方定义组件，二等公民无奈被放在最后  if (!aSortNum && bSortNum) return 1;  if (aSortNum && !bSortNum) return -1;  if (!aSortNum && !bSortNum) return 0;  return aSortNum > bSortNum ? 1 : -1;},...
  }
}