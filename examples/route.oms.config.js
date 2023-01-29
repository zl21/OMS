/* eslint-disable */

// const LOAD = function (path) {
//   return r => require.ensure([], () => r(require(`./${path}.vue`)));
// };
const LOAD01 = function (path) {
  return r => require.ensure([], () => r(require(`./pages/zh-CN/${path}.vue`)));
};
const LOAD02 = function (path) {
  return r => require.ensure([], () => r(require(`../src/docs${path}.md`)));
};

const config = [
  {
    name: "更新日志",
    path: "/zh-CN/docs-dom",
    component: LOAD01('component'),
    redirect: '/zh-CN/docs-dom/update',
    children: [
      {
        path: '',
        component: LOAD02('/docs-dom/update')
      }
    ]
  },
  {
    name: "开发指南",
    path: "/zh-CN/docs-dom",
    component: LOAD01('component'),
    redirect: '/zh-CN/docs-dom/installation',
    children: [
      {
        "path": "introduce",
        "name": "介绍",
        component: LOAD02('/docs-dom/introduce')
      },
      {
        "path": "installation",
        "name": "安装",
        component: LOAD02('/docs-dom/installation')
      },
      {
        "path": "i18n",
        "name": "国际化",
        component: LOAD02('/docs-dom/i18n')
      }
    ]
  },
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
  },
  {
    name: "主题",
    path: "/zh-CN/docs-theme",
    component: LOAD01('theme_oms'),
    redirect: '/zh-CN/docs-theme/introduce',
    children: [
      {
        "path": "introduce",
        "name": "介绍",
        component: LOAD02('/docs-theme/introduce')
      },
      {
        "path": "cusTheme",
        "name": "布局规范",
        component: LOAD02('/docs-theme/cusTheme')
      },
      {
        "path": "var",
        "name": "主题变量",
        component: LOAD02('/docs-theme/var')
      }
    ]
  },
  {
    name: "资源",
    path: "/zh-CN/docs-others",
    component: LOAD01('resource_oms'),
    redirect: '/zh-CN/docs-others/index',
    children: [
      {
        "path": "index",
        "name": "相关文档",
        component: LOAD02('/docs-others/index')
      }
    ]
  },
];


(() => {
  const LOAD_DOCS = function (path) {
    return r => require.ensure([], () => r(require(`../src/docs${path}.md`)));
    // return r => require.ensure([], () => r(require(`./docs/zh-CN/alert.md`)));
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
    if (it.children.length > 0) {
      it.children.forEach(element => {
        element.meta = {
          lang: 'zh-CN'
        }
      });
      return
    }
    dir.keys().forEach((x, y) => {
      if (x.includes(it.category)) {
        let path = '', componentName = '', obj = null;
        componentName = x.slice(x.lastIndexOf('/') + 1, x.length - 3); // ButtonFkDialog
        // componentName = x.slice("./docs-dom/ButtonFkDialog.md".lastIndexOf('/')+1,"./docs-dom/ButtonFkDialog.md".length-3)
        const exArr = ['update', 'introduce', 'installation', 'i18n']
        if (exArr.includes(componentName)) {
          return
        }
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
