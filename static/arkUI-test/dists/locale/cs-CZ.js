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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
/* 2 */
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
        locale: 'cs-CZ',
        select: {
            placeholder: 'Vybrat',
            noMatch: 'Nenalezeny žádné položky',
            loading: 'Nahrávám'
        },
        table: {
            noDataText: 'Žádná data',
            noFilteredDataText: 'Nenalezeny žádné položky',
            confirmFilter: 'Potvrdit',
            resetFilter: 'Reset',
            clearFilter: 'Vše'
        },
        datepicker: {
            selectDate: 'Vybrat datum',
            selectTime: 'Vybrat čas',
            startTime: 'Začátek',
            endTime: 'Konec',
            clear: 'Vymazat',
            ok: 'OK',
            datePanelLabel: '[mmmm] [yyyy]',
            month: 'Měsíc',
            month1: 'Leden',
            month2: 'Únor',
            month3: 'Březen',
            month4: 'Duben',
            month5: 'Květen',
            month6: 'Červen',
            month7: 'Červenec',
            month8: 'Srpen',
            month9: 'Září',
            month10: 'Říjen',
            month11: 'Listopad',
            month12: 'Prosinec',
            year: 'Rok',
            weekStartDay: '1',
            weeks: {
                sun: 'Ne',
                mon: 'Po',
                tue: 'Út',
                wed: 'St',
                thu: 'Čt',
                fri: 'Pá',
                sat: 'So'
            },
            months: {
                m1: 'Led',
                m2: 'Úno',
                m3: 'Bře',
                m4: 'Dub',
                m5: 'Kvě',
                m6: 'Čer',
                m7: 'Čnc',
                m8: 'Srp',
                m9: 'Zář',
                m10: 'Říj',
                m11: 'Lis',
                m12: 'Pro'
            }
        },
        transfer: {
            titles: {
                source: 'Zdroj',
                target: 'Cíl'
            },
            filterPlaceholder: 'Hledat',
            notFoundText: 'Nenalezeno'
        },
        modal: {
            okText: 'OK',
            cancelText: 'Zrušit'
        },
        poptip: {
            okText: 'OK',
            cancelText: 'Zrušit'
        },
        page: {
            prev: 'Následující',
            next: 'Předchozí',
            total: 'Celkem',
            item: 'položka',

            items: 'položek',
            prev5: 'Předchozích 5 stránek',
            next5: 'Následujících 5 stránek',
            page: 'na stránku',
            goto: 'Jít na',
            p: ''
        },
        rate: {
            star: 'hvězda',
            stars: 'hvězdy' },
        tree: {
            emptyText: 'Žádná data'
        }
    }
};

(0, _lang2.default)(lang);

exports.default = lang;

/***/ })
/******/ ]);
});
//# sourceMappingURL=cs-CZ.js.map