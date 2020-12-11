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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ 1:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),

/***/ 14:
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
        locale: 'mn-MN',
        select: {
            placeholder: 'Сонгох',
            noMatch: 'Таарах өгөгдөл байхгүй байна',
            loading: 'Ачааллаж байна'
        },
        table: {
            noDataText: 'Өгөгдөл алга',
            noFilteredDataText: 'No filter data',
            confirmFilter: 'Батлах',
            resetFilter: 'Шинээр тохируулах',
            clearFilter: 'Бүгд'
        },
        datepicker: {
            selectDate: 'Огноо сонгох',
            selectTime: 'Цаг сонгох',
            startTime: 'Эхлэх Цаг',
            endTime: 'Дуусах Цаг',
            clear: 'Цэвэрлэх',
            ok: 'OK',
            datePanelLabel: '[mmmm] [yyyy]',
            month: 'Сар',
            month1: '1-р сар',
            month2: '2-р сар',
            month3: '3-р сар',
            month4: '4-р сар',
            month5: '5-р сар',
            month6: '6-р сар',
            month7: '7-р сар',
            month8: '8-р сар',
            month9: '9-р сар',
            month10: '10-р сар',
            month11: '11-р сар',
            month12: '12-р сар',
            year: 'Жил',
            weekStartDay: '0',
            weeks: {
                sun: 'Ням',
                mon: 'Дав',
                tue: 'Мяг',
                wed: 'Лха',
                thu: 'Пүр',
                fri: 'Баа',
                sat: 'Бяа'
            },
            months: {
                m1: '1-р сар',
                m2: '2-р сар',
                m3: '3-р сар',
                m4: '4-р сар',
                m5: '5-р сар',
                m6: '6-р сар',
                m7: '7-р сар',
                m8: '8-р сар',
                m9: '9-р сар',
                m10: '10-р сар',
                m11: '11-р сар',
                m12: '12-р сар'
            }
        },
        transfer: {
            titles: {
                source: 'Эх сурвалж',
                target: 'Оноох бай'
            },
            filterPlaceholder: 'Эндээс хайх',
            notFoundText: 'Олдсонгүй'
        },
        modal: {
            okText: 'OK',
            cancelText: 'Болих'
        },
        poptip: {
            okText: 'OK',
            cancelText: 'Болих'
        },
        page: {
            prev: 'Өмнөх хуудас',
            next: 'Дараах хуудас',
            total: 'Нийт',
            item: 'зүйл',
            items: 'зүйлүүд',
            prev5: 'Өмнөх 5 хуудас',
            next5: 'Дараагийн 5 хуудас',
            page: '/хуудсанд',
            goto: 'Очих хуудас',
            p: ''
        },
        rate: {
            star: 'Од',
            stars: 'Одууд'
        },
        tree: {
            emptyText: 'Өгөгдөл алга'
        }
    }
};

(0, _lang2.default)(lang);

exports.default = lang;

/***/ })

/******/ });
});
//# sourceMappingURL=mn-MN.js.map