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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
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

/***/ 9:
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
        locale: 'hi-IN',
        select: {
            placeholder: 'कृपया चुने|',
            noMatch: 'कोई आकड़ा उपलब्ध नहीं है|',
            loading: 'लोड हो रहा है'
        },
        table: {
            noDataText: 'कोई आकड़ा उपलब्ध नहीं है',
            noFilteredDataText: 'कोई आकड़ा उपलब्ध नहीं है',
            confirmFilter: 'पुष्टि करें',
            resetFilter: 'पुनः तैयार करना',
            clearFilter: 'सब कुछ'
        },
        datepicker: {
            selectDate: 'दिनांक चुनें',
            selectTime: 'समय चुनें',
            startTime: 'प्रारंभ समय',
            endTime: 'समाप्ति समय',
            clear: 'साफ़ करें',
            ok: 'ठीक',
            datePanelLabel: '[mmmm] [yyyy]',
            month: 'महीना',
            month1: 'जनवरी',
            month2: 'फरवरी',
            month3: 'मार्च',
            month4: 'अप्रैल',
            month5: 'मई',
            month6: 'जून',
            month7: 'जुलाई',
            month8: 'अगस्त',
            month9: 'सितंबर',
            month10: 'अक्टूबर',
            month11: 'नवंबर',
            month12: 'दिसंबर',
            year: 'साल',
            weekStartDay: '0',
            weeks: {
                sun: 'रविवार',
                mon: 'सोमवार',
                tue: 'मंगलवार',
                wed: 'बुधवार',
                thu: 'गुरुवार',
                fri: 'शुक्रवार',
                sat: 'शनिवार'
            },
            months: {
                m1: 'जनवरी',
                m2: 'फरवरी',
                m3: 'मार्च',
                m4: 'अप्रैल',
                m5: 'मई',
                m6: 'जून',
                m7: 'जुलाई',
                m8: 'अगस्त',
                m9: 'सितंबर',
                m10: 'अक्टूबर',
                m11: 'नवंबर',
                m12: 'दिसंबर'
            }
        },
        transfer: {
            titles: {
                source: 'स्रोत',
                target: 'लक्ष्य'
            },
            filterPlaceholder: 'यहां खोजें',
            notFoundText: 'कोई आकड़ा उपलब्ध नहीं है'
        },
        modal: {
            okText: 'ठीक',
            cancelText: 'निरस्त करना'
        },
        poptip: {
            okText: 'ठीक',
            cancelText: 'निरस्त करना'
        },
        page: {
            prev: 'पिछला पेज',
            next: 'अगला पेज',
            total: 'समस्त',
            item: 'एक चीज',
            items: 'अनेक चीज',
            prev5: 'पिछला 5 पेज',
            next5: 'अगला 5 पेज',
            page: '/page',
            goto: 'जाओ',
            p: ''
        },
        rate: {
            star: 'प्रसिद्ध',
            stars: 'प्रसिद्ध'
        },
        tree: {
            emptyText: 'कोई आकड़ा उपलब्ध नहीं है'
        }
    }
};

(0, _lang2.default)(lang);

exports.default = lang;

/***/ })

/******/ });
});
//# sourceMappingURL=hi-IN.js.map