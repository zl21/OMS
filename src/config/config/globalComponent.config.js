/*
 * @Author: your name
 * @Date: 2021-08-10 09:55:17
 * @LastEditTime: 2021-12-07 10:18:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/config/config/globalComponent.config.js
 */
import Login from '@/commonPages/Login.vue';
import WelcomePage from '@/commonPages/WelcomePage.vue';
import enterpriseBanner from 'assetsImg/banner.png';
import enterpriseLogo from 'assetsImg/logo.png';

const oldConfig = {
  cusGlobalComponent: {
    Login,
    WelcomePage
  },
  cusImage: {
    enterpriseLogo,
    enterpriseBanner
  }
}
export default oldConfig