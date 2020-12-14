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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
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

/***/ 11:
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
        locale: 'it-IT',
        select: {
            placeholder: 'Seleziona',
            noMatch: 'Nessun Risultato',
            loading: 'Caricamento'
        },
        table: {
            noDataText: 'Nessun Risultato',
            noFilteredDataText: 'Filtro senza risultati',
            confirmFilter: 'Conferma',
            resetFilter: 'Reset',
            clearFilter: 'Tutto'
        },
        datepicker: {
            selectDate: 'Seleziona data',
            selectTime: 'Seleziona orario',
            startTime: 'Orario inizio',
            endTime: 'Orario fine',
            clear: 'Annulla',
            ok: 'OK',
            datePanelLabel: '[mmmm] [yyyy]',
            month: 'Mese',
            month1: 'Gennaio',
            month2: 'Febbraio',
            month3: 'Marzo',
            month4: 'Aprile',
            month5: 'Maggio',
            month6: 'Giugno',
            month7: 'Luglio',
            month8: 'Agosto',
            month9: 'Settembre',
            month10: 'Ottobre',
            month11: 'Novembre',
            month12: 'Dicembre',
            year: 'Anno',
            weekStartDay: '1',
            weeks: {
                sun: 'Dom',
                mon: 'Lun',
                tue: 'Mar',
                wed: 'Mer',
                thu: 'Gio',
                fri: 'Ven',
                sat: 'Sab'
            },
            months: {
                m1: 'Gen',
                m2: 'Feb',
                m3: 'Mar',
                m4: 'Apr',
                m5: 'Mag',
                m6: 'Giu',
                m7: 'Lug',
                m8: 'Ago',
                m9: 'Set',
                m10: 'Ott',
                m11: 'Nov',
                m12: 'Dic'
            }
        },
        transfer: {
            titles: {
                source: 'Origine',
                target: 'Destinazione'
            },
            filterPlaceholder: 'Cerca',
            notFoundText: 'Nessun Risultato'
        },
        modal: {
            okText: 'OK',
            cancelText: 'Annulla'
        },
        poptip: {
            okText: 'OK',
            cancelText: 'Annulla'
        },
        page: {
            prev: 'Pagina Precedente',
            next: 'Pagina Successiva',
            total: 'Totale',
            item: 'elemento',
            items: 'elementi',
            prev5: '5 Pagine Precedenti',
            next5: '5 Pagine Successive',
            page: '/pagina',
            goto: 'Vai a',
            p: ''
        },
        rate: {
            star: 'Stella',
            stars: 'Stelle'
        },
        tree: {
            emptyText: 'Nessun Risultato'
        }
    }
};

(0, _lang2.default)(lang);

exports.default = lang;

/***/ })

/******/ });
});
//# sourceMappingURL=it-IT.js.map