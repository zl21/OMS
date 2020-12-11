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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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
/* 3 */
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
        locale: 'de-DE',
        select: {
            placeholder: 'Auswählen',
            noMatch: 'Keine Übereinstimmungen',
            loading: 'Lädt'
        },
        table: {
            noDataText: 'Keine Daten',
            noFilteredDataText: 'Keine gefilterten Daten',
            confirmFilter: 'Bestätigen',
            resetFilter: 'Zurücksetzen',
            clearFilter: 'Alle'
        },
        datepicker: {
            selectDate: 'Datum auswählen',
            selectTime: 'Zeit auswählen',
            startTime: 'Beginn',
            endTime: 'Ende',
            clear: 'Leeren',
            ok: 'OK',
            datePanelLabel: '[mmmm] [yyyy]',
            month: 'Monat',
            month1: 'Januar',
            month2: 'Februar',
            month3: 'März',
            month4: 'April',
            month5: 'Mai',
            month6: 'Juni',
            month7: 'Juli',
            month8: 'August',
            month9: 'September',
            month10: 'Oktober',
            month11: 'November',
            month12: 'Dezember',
            year: 'Jahr',
            weekStartDay: '1',
            weeks: {
                sun: 'So',
                mon: 'Mo',
                tue: 'Di',
                wed: 'Mi',
                thu: 'Do',
                fri: 'Fr',
                sat: 'Sa'
            },
            months: {
                m1: 'Jan',
                m2: 'Feb',
                m3: 'Mär',
                m4: 'Apr',
                m5: 'Mai',
                m6: 'Jun',
                m7: 'Jul',
                m8: 'Aug',
                m9: 'Sep',
                m10: 'Okt',
                m11: 'Nov',
                m12: 'Dez'
            }
        },
        transfer: {
            titles: {
                source: 'Quelle',
                target: 'Ziel'
            },
            filterPlaceholder: 'Suchen',
            notFoundText: 'Nicht gefunden'
        },
        modal: {
            okText: 'OK',
            cancelText: 'Abbrechen'
        },
        poptip: {
            okText: 'OK',
            cancelText: 'Abbrechen'
        },
        page: {
            prev: 'Vorherige Seite',
            next: 'Nächste Seite',
            total: 'Total',
            item: 'Eintrag',
            items: 'Einträge',
            prev5: 'vorherigen fünf Seiten',
            next5: 'nächste fünf Seiten',
            page: '/seite',
            goto: 'Gehe zu',
            p: ''
        },
        rate: {
            star: 'Stern',
            stars: 'Sterne'
        },
        tree: {
            emptyText: 'Keine Daten'
        }
    }
};

(0, _lang2.default)(lang);

exports.default = lang;

/***/ })
/******/ ]);
});
//# sourceMappingURL=de-DE.js.map