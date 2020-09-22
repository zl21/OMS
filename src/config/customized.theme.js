export default {
  skyBlue: "/static/skin/skyBlue/index.min.css",
  coralRed: "/static/skin/coralRed/index.min.css",
  // 动态创建link标签
  appendLink: (url) => {
    var link = document.createElement("link");
    link.setAttribute("type", "text/css");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", url);
    document.head.appendChild(link);
  },
};
