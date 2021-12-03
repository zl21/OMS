const nodeObj = {
  js: { tagName: 'script', attrName: 'src' },
  css: { tagName: 'link', attrName: 'href' }
}

function hasInitCdn (cdns, tag) {
  let flag = false;
  const { tagName, attrName } = nodeObj[tag];
  let nodeArr = Array.from(document.querySelectorAll(tagName)).map(i => i[attrName]);
  cdns[tag].length && !nodeArr.includes(cdns[tag][0]) && (flag = true);
  return flag;
}

function cdnFun (arg) {
  let js = [];
  let css = [];
  arg.forEach(item => {
    console.log(item);
    js = js.concat(item.js);
    css = css.concat(item.css);
  });
  return { js, css };
}

export function loadCdn (tag, array, callback) {
  const { tagName, attrName } = nodeObj[tag];
  var loader = function (src, handler) {
    var node = document.createElement(tagName);
    node[attrName] = src;
    node.onload = node.onreadystatechange = function () {
      node.onreadystatechange = node.onload = null;
      handler();
    }
    if (tag == 'js') {
      document.body.appendChild(node);
    } else {
      var head = document.getElementsByTagName("head")[0];
      (head || document.body).appendChild(node);
    }
  };
  (function run () {
    if (array.length != 0) {
      loader(array.shift(), run);
    } else {
      callback && callback();
    }
  })();
}

export function initCdn (cdns, cb) {

  if (!cdns) return
  const customizeCdnArr = cdnFun(cdns);
  // 当前定制页面是否配置cdn，且需要初始化cdn（js/css）
  if (cdns && !(hasInitCdn(customizeCdnArr, 'js') || hasInitCdn(customizeCdnArr, 'css'))) return
  console.log(customizeCdnArr);
 
  loadCdn('css', customizeCdnArr.css, cb ? cb() : function () {
    console.log('All Css are loaded');
  });
  loadCdn('js', customizeCdnArr.js, cb ? cb() : function () {
    console.log('All Js are loaded');
  });
}