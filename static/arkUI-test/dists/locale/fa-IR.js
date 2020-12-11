(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define("burgeon/locale", ["vue"], factory);
	else if(typeof exports === 'object')
		exports["burgeon/locale"] = factory(require("vue"));
	else
		root["burgeon/locale"] = factory(root["Vue"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/locale/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (lang) {
    if (!isServer) {
        if (typeof window.iview !== 'undefined') {
            if (!('langs' in iview)) {
                iview.langs = {};
            }
            iview.langs[lang.i.locale] = lang;
        }
    }
};

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isServer = _vue2.default.prototype.$isServer;

;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lang = __webpack_require__(0);

var _lang2 = _interopRequireDefault(_lang);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lang = {
    i: {
        locale: 'fa-IR',
        select: {
            placeholder: 'انتخاب‌ کنید',
            noMatch: 'یافت نشد',
            loading: 'در‌حال بارگذاری'
        },
        table: {
            noDataText: 'اطلاعاتی موجود نیست',
            noFilteredDataText: 'بدون اطلاعات فیلترشده',
            confirmFilter: 'تایید',
            resetFilter: 'بازنشانی',
            clearFilter: 'همه'
        },
        datepicker: {
            selectDate: 'انتخاب تاریخ',
            selectTime: 'انتخاب زمان',
            startTime: 'تاریخ شروع',
            endTime: 'تاریخ پایان',
            clear: 'پاکسازی',
            ok: 'تایید',
            datePanelLabel: '[mmmm] [yyyy]',
            month: 'ماه',
            month1: 'January',
            month2: 'February',
            month3: 'March',
            month4: 'April',
            month5: 'May',
            month6: 'June',
            month7: 'July',
            month8: 'August',
            month9: 'September',
            month10: 'October',
            month11: 'November',
            month12: 'December',
            year: 'سال',
            weekStartDay: '0',
            weeks: {
                sun: 'Sun',
                mon: 'Mon',
                tue: 'Tue',
                wed: 'Wed',
                thu: 'Thu',
                fri: 'Fri',
                sat: 'Sat'
            },
            months: {
                m1: 'Jan',
                m2: 'Feb',
                m3: 'Mar',
                m4: 'Apr',
                m5: 'May',
                m6: 'Jun',
                m7: 'Jul',
                m8: 'Aug',
                m9: 'Sep',
                m10: 'Oct',
                m11: 'Nov',
                m12: 'Dec'
            }
        },
        transfer: {
            titles: {
                source: 'منبع',
                target: 'هدف'
            },
            filterPlaceholder: 'اینجا جستجو کنید',
            notFoundText: 'پیدا نشد'
        },
        modal: {
            okText: 'تایید',
            cancelText: 'لغو'
        },
        poptip: {
            okText: 'تایید',
            cancelText: 'لغو'
        },
        page: {
            prev: 'صفحه قبلی',
            next: 'صفحه بعدی',
            total: 'مجموع',
            item: 'داده',
            items: 'داده‌ها',
            prev5: '۵ صفحه قبلی',
            next5: '۵ صفحه بعدی',
            page: '/صفحه',
            goto: 'برو‌به',
            p: ''
        },
        rate: {
            star: 'ستاره',
            stars: 'ستاره‌ها'
        },
        tree: {
            emptyText: 'بدون اطلاعات'
        }
    }
};

(0, _lang2.default)(lang);

exports.default = lang;

/***/ })
/******/ ]);
});
//# sourceMappingURL=fa-IR.js.map