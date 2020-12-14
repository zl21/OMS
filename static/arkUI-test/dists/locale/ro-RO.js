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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
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

/***/ 19:
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
        locale: 'ro-RO',
        select: {
            placeholder: 'Selectează',
            noMatch: 'Niciun rezultat',
            loading: 'Încărcare'
        },
        table: {
            noDataText: 'Fără date',
            noFilteredDataText: 'Filtru fără rezultate',
            confirmFilter: 'Confirmă',
            resetFilter: 'Resetează',
            clearFilter: 'Tot'
        },
        datepicker: {
            selectDate: 'Selectează data',
            selectTime: 'Selectează timpul',
            startTime: 'Ora inițială',
            endTime: 'Ora finală',
            clear: 'Anulează',
            ok: 'OK',
            datePanelLabel: '[mmmm] [yyyy]',
            month: 'Lună',
            month1: 'Ianuarie',
            month2: 'Februarie',
            month3: 'Martie',
            month4: 'Aprilia',
            month5: 'Mai',
            month6: 'Iunie',
            month7: 'Iulie',
            month8: 'August',
            month9: 'Septembrie',
            month10: 'Octombrie',
            month11: 'Noiembrie',
            month12: 'Decembrie',
            year: 'An',
            weekStartDay: '1',
            weeks: {
                sun: 'Dum',
                mon: 'Lun',
                tue: 'Mar',
                wed: 'Mie',
                thu: 'Joi',
                fri: 'Vin',
                sat: 'Sâm'
            },
            months: {
                m1: 'Ian',
                m2: 'Feb',
                m3: 'Mar',
                m4: 'Apr',
                m5: 'Mai',
                m6: 'Iun',
                m7: 'Iul',
                m8: 'Aug',
                m9: 'Sep',
                m10: 'Oct',
                m11: 'Noi',
                m12: 'Dec'
            }
        },
        transfer: {
            titles: {
                source: 'Origine',
                target: 'Destinație'
            },
            filterPlaceholder: 'Caută',
            notFoundText: 'Niciun rezultat'
        },
        modal: {
            okText: 'OK',
            cancelText: 'Renunță'
        },
        poptip: {
            okText: 'OK',
            cancelText: 'Renunță'
        },
        page: {
            prev: 'Pagina precedentă',
            next: 'Pagina urmatoare',
            total: 'Total',
            item: 'element',
            items: 'elemente',
            prev5: '5 Pagini precedente',
            next5: 'Urmatoarele 5 Pagini',
            page: '/pagina',
            goto: 'Du-te la',
            p: ''
        },
        rate: {
            star: 'Stea',
            stars: 'Stele'
        },
        tree: {
            emptyText: 'Fără date'
        }
    }
};

(0, _lang2.default)(lang);

exports.default = lang;

/***/ })

/******/ });
});
//# sourceMappingURL=ro-RO.js.map