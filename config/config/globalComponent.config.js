import Login from '../../commonPages/Login.vue';
import WelcomePage from '../../commonPages/WelcomePage.vue';
import enterpriseBanner from '../../assets/img/banner.png';
import enterpriseLogo from '../../assets/img/logo.png';

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