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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
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

/***/ 24:
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
        locale: 'uk-UA',
        select: {
            placeholder: 'Обрати',
            noMatch: 'Немає відповідних даних',
            loading: 'Завантаження'
        },
        table: {
            noDataText: 'Немає даних',
            noFilteredDataText: 'Немає даних по фільтру',
            confirmFilter: 'Підтвердити',
            resetFilter: 'Скинути',
            clearFilter: 'Усе'
        },
        datepicker: {
            selectDate: 'Обрати дату',
            selectTime: 'Обрати час',
            startTime: 'Початковий час',
            endTime: 'Кінцевий час',
            clear: 'Очистити',
            ok: 'OK',
            datePanelLabel: '[Mmmm] [yyyy]',
            month: '',
            month1: 'Січень',
            month2: 'Лютий',
            month3: 'Березень',
            month4: 'Квітень',
            month5: 'Травень',
            month6: 'Червень',
            month7: 'Липень',
            month8: 'Серпень',
            month9: 'Вересень',
            month10: 'Жовтень',
            month11: 'Листопад',
            month12: 'Грудень',
            year: '',
            weekStartDay: '1',
            weeks: {
                sun: 'Нд',
                mon: 'Пн',
                tue: 'Вт',
                wed: 'Ср',
                thu: 'Чт',
                fri: 'Пт',
                sat: 'Сб'
            },
            months: {
                m1: 'Січ',
                m2: 'Лют',
                m3: 'Бер',
                m4: 'Кві',
                m5: 'Тра',
                m6: 'Чер',
                m7: 'Лип',
                m8: 'Сер',
                m9: 'Вер',
                m10: 'Жов',
                m11: 'Лис',
                m12: 'Гру'
            }
        },
        transfer: {
            titles: {
                source: 'Джерело',
                target: 'Ціль'
            },
            filterPlaceholder: 'Шукати тут',
            notFoundText: 'Не знайдено'
        },
        modal: {
            okText: 'OK',
            cancelText: 'Скасувати'
        },
        poptip: {
            okText: 'OK',
            cancelText: 'Скасувати'
        },
        page: {
            prev: 'Попер. сторінка',
            next: 'Наст. сторінка',
            total: 'Всього',
            item: 'пункт',
            items: 'пункти',
            prev5: 'Попер. 5 сторінок',
            next5: 'Наст. 5 сторінок',
            page: '/page',
            goto: 'Йти до',
            p: ''
        },
        rate: {
            star: 'Зірка',
            stars: 'Зірки'
        },
        tree: {
            emptyText: 'Немає даних'
        }
    }
};

(0, _lang2.default)(lang);

exports.default = lang;

/***/ })

/******/ });
});
//# sourceMappingURL=uk-UA.js.map