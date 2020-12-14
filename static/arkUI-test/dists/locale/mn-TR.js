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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
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

/***/ 15:
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
        locale: 'mn-TR',
        select: {
            placeholder: 'ᠰᠣᠩᠭᠣᠬᠤ',
            noMatch: 'ᠣᠯᠳᠠᠭᠰᠠᠨ ᠦᠭᠡᠢ',
            loading: 'ᠠᠴᠢᠶᠠᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ'
        },
        table: {
            noDataText: 'ᠲᠣᠭ᠎ᠠ ᠪᠠᠷᠢᠮᠲᠠ ᠦᠭᠡᠶ',
            noFilteredDataText: 'ᠨᠦᠬᠦᠴᠡᠯ ᠳᠦ ᠨᠡᠶᠢᠴᠡᠭᠰᠡᠨ ᠲᠣᠭ᠎ᠠ ᠪᠠᠷᠢᠮᠲᠠ ᠣᠯᠳᠠᠭᠰᠠᠨ ᠦᠭᠡᠢ',
            confirmFilter: 'ᠰᠢᠯᠢᠬᠦ',
            resetFilter: 'ᠪᠣᠴᠠᠭᠠᠬᠤ',
            clearFilter: 'ᠪᠦᠬᠦ'
        },
        datepicker: {
            selectDate: 'ᠡᠳᠦᠷ ᠰᠠᠷ᠎ᠠ ᠰᠣᠩᠭᠣᠬᠤ',
            selectTime: 'ᠴᠠᠭ ᠢ ᠰᠣᠩᠭᠣᠬᠤ',
            startTime: 'ᠡᠬᠢᠯᠡᠬᠦ ᠴᠠᠭ',
            endTime: 'ᠲᠡᠭᠦᠰᠬᠦ ᠴᠠᠭ',
            clear: 'ᠬᠣᠭᠤᠰᠤᠯᠠᠬᠤ',
            ok: 'ᠲᠡᠭᠡᠶ᠎ᠡ',
            datePanelLabel: '[yyyy ᠣᠨ] [m ᠰᠠᠷ᠎ᠠ]',
            month: 'ᠰᠠᠷ᠎ᠠ',
            month1: '1 ᠰᠠᠷ᠎ᠠ',
            month2: '2 ᠰᠠᠷ᠎ᠠ',
            month3: '3 ᠰᠠᠷ᠎ᠠ',
            month4: '4 ᠰᠠᠷ᠎ᠠ',
            month5: '5 ᠰᠠᠷ᠎ᠠ',
            month6: '6 ᠰᠠᠷ᠎ᠠ',
            month7: '7 ᠰᠠᠷ᠎ᠠ',
            month8: '8 ᠰᠠᠷ᠎ᠠ',
            month9: '9 ᠰᠠᠷ᠎ᠠ',
            month10: '10 ᠰᠠᠷ᠎ᠠ',
            month11: '11 ᠰᠠᠷ᠎ᠠ',
            month12: '12 ᠰᠠᠷ᠎ᠠ',
            year: 'ᠵᠢᠯ',
            weekStartDay: '0',
            weeks: {
                sun: 'ᠡᠳᠦᠷ',
                mon: 'ᠨᠢᠭᠡ',
                tue: 'ᠬᠣᠶᠠᠷ',
                wed: 'ᠭᠤᠷᠪᠠ',
                thu: 'ᠳᠦᠷᠪᠡ',
                fri: 'ᠲᠠᠪᠤ',
                sat: 'ᠵᠢᠷᠭᠤᠭ᠎ᠠ'
            },
            months: {
                m1: '1 ᠰᠠᠷ᠎ᠠ',
                m2: '2 ᠰᠠᠷ᠎ᠠ',
                m3: '3 ᠰᠠᠷ᠎ᠠ',
                m4: '4 ᠰᠠᠷ᠎ᠠ',
                m5: '5 ᠰᠠᠷ᠎ᠠ',
                m6: '6 ᠰᠠᠷ᠎ᠠ',
                m7: '7 ᠰᠠᠷ᠎ᠠ',
                m8: '8 ᠰᠠᠷ᠎ᠠ',
                m9: '9 ᠰᠠᠷ᠎ᠠ',
                m10: '10 ᠰᠠᠷ᠎ᠠ',
                m11: '11 ᠰᠠᠷ᠎ᠠ',
                m12: '12 ᠰᠠᠷ᠎ᠠ'
            }
        },
        transfer: {
            titles: {
                source: 'ᠡᠬᠢ ᠬᠦᠰᠦᠨᠦᠭ ',
                target: 'ᠵᠣᠷᠢᠯᠭ᠎ᠠ ᠬᠦᠰᠦᠨᠦᠭ'
            },
            filterPlaceholder: 'ᠬᠠᠶᠢᠬᠤ ᠠᠭᠤᠯᠭ᠎ᠠ ᠪᠠᠨ ᠣᠷᠤᠭᠤᠯ',
            notFoundText: 'ᠬᠦᠰᠦᠨᠦᠭ ᠬᠣᠭᠣᠰᠣᠨ'
        },
        modal: {
            okText: 'ᠲᠡᠭᠡᠶ᠎ᠡ',
            cancelText: 'ᠦᠭᠡᠶᠢᠰᠭᠡᠬᠦ'
        },
        poptip: {
            okText: 'ᠲᠡᠭᠡᠶ᠎ᠡ',
            cancelText: 'ᠦᠭᠡᠶᠢᠰᠭᠡᠬᠦ'
        },
        page: {
            prev: 'ᠡᠮᠤᠨ᠎ᠠ ᠨᠢᠭᠤᠷ',
            next: 'ᠳᠠᠷᠠᠭ᠎ᠠ ᠨᠢᠭᠤᠷ',
            total: 'ᠨᠡᠶᠢᠲᠡ',
            item: 'ᠵᠣᠷᠪᠤᠰ',
            items: 'ᠵᠣᠷᠪᠤᠰ',
            prev5: 'ᠡᠮᠦᠨᠡᠬᠢ 5 ᠨᠢᠭᠤᠷ',
            next5: 'ᠬᠣᠶᠢᠨᠠᠬᠢ 5 ᠨᠢᠭᠤᠷ',
            page: 'ᠵᠣᠷᠪᠤᠰ/ᠨᠢᠭᠤᠷ',
            goto: 'ᠬᠦᠷᠬᠦ',
            p: 'ᠨᠢᠭᠤᠷ'
        },
        rate: {
            star: 'ᠣᠳᠤ',
            stars: 'ᠣᠳᠤ'
        },
        tree: {
            emptyText: 'ᠲᠣᠭ᠎ᠠ ᠪᠠᠷᠢᠮᠲᠠ ᠦᠭᠡᠶ'
        }
    }
};

(0, _lang2.default)(lang);

exports.default = lang;

/***/ })

/******/ });
});
//# sourceMappingURL=mn-TR.js.map