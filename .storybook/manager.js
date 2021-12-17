
import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';
import { themes } from '@storybook/theming';
import img from '../static/img/icon.svg'
import logo from '../public/favicon.ico'
// import '../theme.less'
import '!style-loader!css-loader!less-loader!../theme.less';

addons.setConfig({
    // theme: themes.dark,
    theme: create({
        // base: 'light',
        brandTitle: 'OmsUI',
        // brandUrl: 'https://example.com',
        brandImage: logo,
    }),
    // isFullscreen: false,
    // showNav: true,
    // showPanel: true,
    // panelPosition: 'bottom',
    // enableShortcuts: true,
    // isToolshown: true,
    // // theme: undefined,
    // selectedPanel: undefined,
    // initialActive: 'sidebar',
    // sidebar: {
    //     showRoots: true,
    //     collapsedRoots: ['other'],
    // },
    // toolbar: {
    //     title: { hidden: false, },
    //     zoom: { hidden: false, },
    //     eject: { hidden: false, },
    //     copy: { hidden: false, },
    //     fullscreen: { hidden: false, },
    // },
});