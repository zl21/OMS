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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
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

/***/ 12:
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
        locale: 'ja-JP',
        select: {
            placeholder: '選んでください',
            noMatch: 'マッチするデータなし',
            loading: 'ロード中'
        },
        table: {
            noDataText: 'データなし',
            noFilteredDataText: 'スクリーニングしたデータなし',
            confirmFilter: 'スクリーニング',
            resetFilter: 'リセット',
            clearFilter: '全部'
        },
        datepicker: {
            selectDate: '日時を選んでください',
            selectTime: '時間を選んでください',
            startTime: 'スタート時間',
            endTime: '終了時間',
            clear: 'クリーア',
            ok: '確定',
            datePanelLabel: '[yyyy年] [m月]',
            month: '月',
            month1: '1 月',
            month2: '2 月',
            month3: '3 月',
            month4: '4 月',
            month5: '5 月',
            month6: '6 月',
            month7: '7 月',
            month8: '8 月',
            month9: '9 月',
            month10: '10 月',
            month11: '11 月',
            month12: '12 月',
            year: '年',
            weekStartDay: '0',
            weeks: {
                sun: '日',
                mon: '月',
                tue: '火',
                wed: '水',
                thu: '木',
                fri: '金',
                sat: '土'
            },
            months: {
                m1: '1月',
                m2: '2月',
                m3: '3月',
                m4: '4月',
                m5: '5月',
                m6: '6月',
                m7: '7月',
                m8: '8月',
                m9: '9月',
                m10: '10月',
                m11: '11月',
                m12: '12月'
            }
        },
        transfer: {
            titles: {
                source: 'ソースリスト',
                target: 'ターゲットリスト'
            },
            filterPlaceholder: '検索内容を入力ください',
            notFoundText: '内容が見つかってなかった'
        },
        modal: {
            okText: '確定',
            cancelText: 'キャンセル'
        },
        poptip: {
            okText: '確定',
            cancelText: 'キャンセル'
        },
        page: {
            prev: '前へ',
            next: '次へ',
            total: '全部',
            item: '件',
            items: '件',
            prev5: '前の５ページへ',
            next5: '次の５ページへ',
            page: '件/ページ',
            goto: '',
            p: 'ページ目へ'
        },
        rate: {
            star: '点',
            stars: '点'
        },
        time: {
            before: '前',
            after: '後',
            just: 'たった今',
            seconds: '秒',
            minutes: '分',
            hours: '時間',
            days: '日'
        },
        tree: {
            emptyText: 'データなし'
        }
    }
};

(0, _lang2.default)(lang);

exports.default = lang;

/***/ })

/******/ });
});
//# sourceMappingURL=ja-JP.js.map