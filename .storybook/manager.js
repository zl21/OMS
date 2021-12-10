
import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';
import img from '../static/img/icon.svg'
import logo from '../favicon.ico'

addons.setConfig({
    theme: create({
        base: 'light',
        brandTitle: 'Oms UI',
        // brandUrl: 'https://example.com',
        brandImage: logo,
    }),
    isFullscreen: false,
    showNav: true,
    showPanel: true,
    panelPosition: 'bottom',
    enableShortcuts: true,
    isToolshown: true,
    // theme: undefined,
    selectedPanel: undefined,
    initialActive: 'sidebar',
    sidebar: {
        showRoots: true,
        collapsedRoots: ['other'],
    },
    toolbar: {
        title: { hidden: false, },
        zoom: { hidden: false, },
        eject: { hidden: false, },
        copy: { hidden: false, },
        fullscreen: { hidden: false, },
    },
});