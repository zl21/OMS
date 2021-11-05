import cdnConfig from '@/config/config/cdn.config';

export default {
  data () {
    return {
      customizeCdnArr: [],
      docs: {
        js: { tagName: 'script', attrName: 'src' },
        css: { tagName: 'link', attrName: 'href' }
      }
    }
  },
  mounted () {
    const { customizedModuleName } = this.$route.params
    let cdns = cdnConfig[customizedModuleName];
    this.customizeCdnArr = this.cdnFun(cdns);
    if (cdns && !(this.hasInitCdn('js') || this.hasInitCdn('css'))) return; // 当前定制页面是否配置cdn，且需要初始化cdn（js/css）
    this.hasInitCdn('js') && this.loadCdn('js', this.customizeCdnArr.js, function () {
      console.log('All Js are loaded');
    });
    this.hasInitCdn('css') && this.loadCdn('css', this.customizeCdnArr.css, function () {
      console.log('All Css are loaded');
    });
  },
  methods: {
    loadCdn (tag, array, callback) {
      const { tagName, attrName } = this.docs[tag];
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
    },
    hasInitCdn (tag) {
      let flag = false;
      const { tagName, attrName } = this.docs[tag];
      let nodeArr = Array.from(document.querySelectorAll(tagName)).map(i => i[attrName]);
      this.customizeCdnArr[tag].length && !nodeArr.includes(this.customizeCdnArr[tag][0]) && (flag = true);
      return flag;
    },
    cdnFun (arg) {
      let js = [];
      let css = [];
      arg.forEach(item => {
        console.log(item);
        js = js.concat(item.js);
        css = css.concat(item.css);
      });
      return { js, css };
    }
  }
}