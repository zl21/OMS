export default {
  // 动态创建link标签
  appendLink: skinName => {
    let url = `/node_modules/@burgeon/oms-theme/skin/${skinName}/index.min.css`;
    var link = document.createElement("link");
    link.setAttribute("id", "skin");
    link.setAttribute("type", "text/css");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", url);
    document.head.appendChild(link);
  }
};
