export default {
  // 动态创建link标签
  // url: require("@/node_modules/@burgeon/oms-theme/skin/skyBlue/index.min.css"),
  appendLink: skinName => {
    // let url = require(`/node_modules/@burgeon/oms-theme/skin/${skinName}/index.min.css`);
    var link = document.createElement("link");
    link.setAttribute("id", "skin");
    link.setAttribute("type", "text/css");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "/node_modules/@burgeon/oms-theme/skin/skyBlue/index.min.css");
    document.head.appendChild(link);
  }
};
