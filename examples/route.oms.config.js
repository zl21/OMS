/* eslint-disable */

// const LOAD = function (path) {
//   return r => require.ensure([], () => r(require(`./${path}.vue`)));
// };
const LOAD01 = function (path) {
  return r => require.ensure([], () => r(require(`./pages/zh-CN/${path}.vue`)));
};

const config = [
  {
    path: '/zh-CN/docs-dom',
    name: '组件',
    category: 'docs-dom',
    redirect: '/zh-CN/docs-dom/test',
    component: LOAD01('component'),
    children: [
      /* {
        name: 'test',
        path: 'test',
        // meta: { lang: 'zh-CN' },
        // component: LOAD('test')
      }, {
        name: 'test1',
        path: 'test1',
        // meta: { lang: 'zh-CN' },
        // component: LOAD('test1')
      } */
    ]
  }
];


(() => {
  const LOAD_DOCS = function (path) {
    return r => require.ensure([], () => r(require(`../src/docs${path}.md`)));
    // return r => require.ensure([], () => r(require(`./docs/zh-CN/alert.md`)));
    // /Users/zhoulan/project/OMS/examples/docs/zh-CN/alert.md
  };

  const dir = require.context('../src/docs/', true, /\.md$/); // require.context() 不接收变量，即参数必须是既定的 ()

  config.forEach(it => {
    /* switch (it.category) {
      case 'docs-dom':
        // it.component = LOAD_DOCS('/docs-dom/installation')
        break;
      default:
        break;
    } */
    dir.keys().forEach((x, y) => {
      if (x.includes(it.category)) {
        let path = '', componentName = '', obj = null;
        componentName = x.slice(x.lastIndexOf('/') + 1, x.length - 3); // ButtonFkDialog
        // componentName = x.slice("./docs-dom/ButtonFkDialog.md".lastIndexOf('/')+1,"./docs-dom/ButtonFkDialog.md".length-3)
        // path = `/${title}`; // /docs-dom/ButtonFkDialog.md
        path = x.slice(1, x.length - 3); // /docs-dom/ButtonFkDialog
        obj = {
          path: componentName,
          meta: {
            lang: 'zh-CN',
            title: componentName,
            description: '',
          },
          name: componentName,
          component: LOAD_DOCS(path)
        }             
        it.children.push(obj)
      }
      // eslint-disable-next-line
    });
  });
})()

export default config;
