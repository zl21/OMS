
import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';
import img from '../static/img/icon.svg'

addons.setConfig({
    theme: create({
        base: 'light',
        brandTitle: 'Oms UI',
        // brandUrl: 'https://example.com',
        brandImage: img,
    }),
});
