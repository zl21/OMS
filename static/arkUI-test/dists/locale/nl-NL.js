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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
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

/***/ 16:
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
        locale: 'nl-NL',
        select: {
            placeholder: 'Selecteer',
            noMatch: 'Geen overeenkomsten',
            loading: 'Laden'
        },
        table: {
            noDataText: 'Geen data',
            noFilteredDataText: 'Geen gefilterde data',
            confirmFilter: 'Bevestig',
            resetFilter: 'Herstel',
            clearFilter: 'Alles'
        },
        datepicker: {
            selectDate: 'Selecteer datum',
            selectTime: 'Selecteer tijd',
            startTime: 'Begin tijd',
            endTime: 'Eind tijd',
            clear: 'Herstel',
            ok: 'Ok',
            datePanelLabel: '[mm] [yyyy]',
            month: 'Maand',
            month1: 'Januari',
            month2: 'Februari',
            month3: 'Maart',
            month4: 'April',
            month5: 'Mei',
            month6: 'Juni',
            month7: 'Juli',
            month8: 'Augustus',
            month9: 'September',
            month10: 'Oktober',
            month11: 'November',
            month12: 'December',
            year: 'Jaar',
            weekStartDay: '1',
            weeks: {
                sun: 'Zon',
                mon: 'Maa',
                tue: 'Din',
                wed: 'Woe',
                thu: 'Don',
                fri: 'Vri',
                sat: 'Zat'
            },
            months: {
                m1: 'Jan',
                m2: 'Feb',
                m3: 'Mar',
                m4: 'Apr',
                m5: 'Mei',
                m6: 'Jun',
                m7: 'Jul',
                m8: 'Aug',
                m9: 'Sep',
                m10: 'Okt',
                m11: 'Nov',
                m12: 'Dec'
            }
        },
        transfer: {
            titles: {
                source: 'Bron',
                target: 'Doel'
            },
            filterPlaceholder: 'Zoeken',
            notFoundText: 'Niet gevonden'
        },
        modal: {
            okText: 'Ok',
            cancelText: 'Annuleren'
        },
        poptip: {
            okText: 'Ok',
            cancelText: 'Annuleren'
        },
        page: {
            prev: 'Vorige pagina',
            next: 'Volgende pagina',
            total: 'Totaal',
            item: 'item',
            items: 'items',
            prev5: 'Vorige 5 pagina\'s',
            next5: 'Volgende 5 pagina\'s',
            page: '/pagina',
            goto: 'Ga',
            p: ''
        },
        rate: {
            star: 'Ster',
            stars: 'Sterren'
        },
        tree: {
            emptyText: 'Geen data'
        }
    }
};

(0, _lang2.default)(lang);

exports.default = lang;

/***/ })

/******/ });
});
//# sourceMappingURL=nl-NL.js.map