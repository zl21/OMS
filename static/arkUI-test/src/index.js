import './utils/textarea.js';
import Affix from './components/affix';
import Alert from './components/alert';
import Anchor from './components/anchor';
import AnchorLink from './components/anchor-link';
import AutoComplete from './components/auto-complete';
import Avatar from './components/avatar';
import BackTop from './components/back-top';
import Badge from './components/badge';
import Breadcrumb from './components/breadcrumb';
import Button from './components/button';
import Carousel from './components/carousel';
import Cascader from './components/cascader';
import Card from './components/card';
import Cell from './components/cell';
import Checkbox from './components/checkbox';
import Circle from './components/circle';
import Collapse from './components/collapse';
import Content from './components/content';
import DatePicker from './components/date-picker';
import Divider from './components/divider';
import Drawer from './components/drawer';
import Dropdown from './components/dropdown';
import Footer from './components/footer';
import Form from './components/form';
import FormLayout from './components/form-layout';
import Header from './components/header';
import Icon from './components/icon';
import Input from './components/input';
import InputNumber from './components/input-number';
import Scroll from './components/scroll';
import Split from './components/split';
import Steps from './components/steps';
import Step from './components/step';
import Layout from './components/layout';
import LoadingBar from './components/loading-bar';
import Menu from './components/menu';
import Message from './components/message';
import Modal from './components/modal';
import Notice from './components/notice';
import Page from './components/page';
import Poptip from './components/poptip';
import Progress from './components/progress';
import Radio from './components/radio';
import Rate from './components/rate';
import Sider from './components/sider';
import Slider from './components/slider';
import Spin from './components/spin';
import Switch from './components/switch';
import Table from './components/table';
import Tabs from './components/tabs';
import Tag from './components/tag';
import Time from './components/time';
import Timeline from './components/timeline';
import TimePicker from './components/time-picker';
import Tooltip from './components/tooltip';
import Transfer from './components/transfer';
import Tree from './components/tree';
import { Row, Col } from './components/grid';
import { Select, Option, OptionGroup } from './components/select';
import locale from './locale/index';
import defaultLocal from './locale/lang/zh-CN';

import burgeonConfig from './assets/config';

/*fc*/
import DropDownSelectFilter from './FcComponents/drop-down-select-filter';
import DropMultiSelectFilter from './FcComponents/drop-multi-select-filter';
import AttachFilter from './FcComponents/attachFiter';
import IntegrateSearchFilter from './FcComponents/integrate-search-filter';
import ImageUpload from './FcComponents/ImageUpload';

/* drag */
import DragImg from './components/dragImg';
/* add */
import TabPanels from './components/tab-panels';
import SplitPanel from './components/split-panel';
import ComplexsDialog from './components/complex';
import Timing from './components/timing';
import TimingDate from './components/timing-date';
import TimingTime from './components/timing-time';
import Upload from './components/upload';


const components = {
    Affix,
    Alert,
    Anchor,
    AnchorLink,
    AutoComplete,
    Avatar,
    BackTop,
    Badge,
    Breadcrumb,
    BreadcrumbItem: Breadcrumb.Item,
    Button,
    ButtonGroup: Button.Group,
    Carousel,
    CarouselItem: Carousel.Item,
    Cascader,
    Card,
    Cell,
    CellGroup: Cell.Group,
    Checkbox,
    CheckboxGroup: Checkbox.Group,
    Col,
    Collapse,
    Content: Content,
    DatePicker,
    Divider,
    Drawer,
    Dropdown,
    DropdownItem: Dropdown.Item,
    DropdownMenu: Dropdown.Menu,
    Footer: Footer,
    Form,
    FormLayout,
    FormItem: Form.Item,
    Header: Header,
    Icon,
    Input,
    InputNumber,
    Scroll,
    Sider: Sider,
    Split,
    Submenu: Menu.Sub,
    Layout: Layout,
    LoadingBar,
    Menu,
    MenuGroup: Menu.Group,
    MenuItem: Menu.Item,
    Message,
    Modal,
    Notice,
    Option: Option,
    OptionGroup,
    Page,
    Panel: Collapse.Panel,
    Progress,
    Poptip,
    Radio,
    RadioGroup: Radio.Group,
    Row,
    Rate,
    Select,
    Slider,
    Spin,
    Steps,
    Step,
    Table,
    Tabs: Tabs,
    TabPane: Tabs.Pane,
    Tag,
    Time,
    Timeline,
    TimelineItem: Timeline.Item,
    TimePicker,
    Tooltip,
    Transfer,
    Tree,
    DropDownSelectFilter,
    DropMultiSelectFilter,
    AttachFilter,
    DragImg,
    TabPanels,
    SplitPanel,
    IntegrateSearchFilter,
    ComplexsDialog,
    ImageUpload,
    Timing,
    TimingDate,
    TimingTime,
    Upload
};

const burGeon = {
    ...components,
    iButton: Button,
    iCol: Col,
    iCircle:Circle,
    iContent: Content,
    iForm: Form,
    iFooter: Footer,
    iHeader: Header,
    iInput: Input,
    iMenu: Menu,
    iOption: Option,
    iSelect: Select,
    iSwitch: Switch,
    iTable: Table,
    iTime: Time
};



const install = function(Vue, opts = {}) {
    if (install.installed) {
        return;
        }
    locale.use(opts.locale);
    locale.i18n(opts.i18n);
    //opts.defaultZindex
    Object.keys(burGeon).forEach(key => {

        Vue.component(`${burgeonConfig.componentsFix}${key}`, burGeon[key]);
    });

    Vue.prototype.$IVIEW = {
        defaultZindex : opts.defaultZindex || 1000,
        size: opts.size || '',
        transfer: 'transfer' in opts ? opts.transfer : ''
    };
    //初始化配置
    Vue.prototype.$Burgeon = {
        //主题
        theme: 'theme' in opts ? opts.theme : 'mclon'
    };


    //多主题  主题名就是主题class
    Vue.burgeonTheme = function(option) {
        document.querySelector('body').setAttribute('class', '');
        document.querySelector('body').setAttribute('class', option);
    };

    //Vue.burgeonTheme(Vue.prototype.$Burgeon.theme);


    //多语言
    Vue.burgeonLocal = function(option) {
        Vue.prototype.burgeonLang = option;
    };

    Vue.burgeonLocal(defaultLocal);
    Vue.prototype.$Loading = LoadingBar;
    Vue.prototype.$Message = Message;
    Vue.prototype.$Modal = Modal;
    Vue.prototype.$Notice = Notice;
    Vue.prototype.$Spin = Spin;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}


const API = {
    version: process.env.VERSION, // eslint-disable-line no-undef
    locale: locale.use,
    packageTime: "2020.09.21.09.11",
    i18n: locale.i18n,
    install,
    Switch,
    ...components
};

API.lang = code => {
    const langObject = window['burgeon/locale'].default;
    if (code === langObject.i.locale) {
locale.use(langObject);
} else {
 console.log(`The ${code} language pack is not loaded.`);
 } // eslint-disable-line no-console
};

module.exports.default = module.exports = API; // eslint-disable-line no-undef
