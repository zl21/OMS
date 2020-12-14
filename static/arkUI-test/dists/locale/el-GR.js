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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
/* 3 */,
/* 4 */
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
        locale: 'el-GR',
        select: {
            placeholder: 'Επιλογή',
            noMatch: 'Δεν βρέθηκαν αποτελέσματα',
            loading: 'Φόρτωση'
        },
        table: {
            noDataText: 'Χωρίς δεδομένα',
            noFilteredDataText: 'Χωρίς φίλτρο',
            confirmFilter: 'Επιβεβαίωση',
            resetFilter: 'Επαναφορά',
            clearFilter: 'Όλα'
        },
        datepicker: {
            selectDate: 'Επιλέξτε ημέρα',
            selectTime: 'Επιλέξτε ώρα',
            startTime: 'Ωρα Έναρξης',
            endTime: 'Ωρα Λήξης',
            clear: 'Καθαρισμός',
            ok: 'Εντάξει',
            datePanelLabel: '[mmmm] [yyyy]',
            month: 'Μήνας',
            month1: 'Ιανουάριος',
            month2: 'Φεβρουάριος',
            month3: 'Μάρτιος',
            month4: 'Απρίλιος',
            month5: 'Μάιος',
            month6: 'Ιούνιος',
            month7: 'Ιούλιος',
            month8: 'Αύγουστος',
            month9: 'Σεπτέμβριος',
            month10: 'Οκτώβριος',
            month11: 'Νοέμβριος',
            month12: 'Δεκέμβριος',
            year: 'Έτος',
            weekStartDay: '1',
            weeks: {
                sun: 'Κυρ',
                mon: 'Δευ',
                tue: 'Τρι',
                wed: 'Τετ',
                thu: 'Πεμ',
                fri: 'Παρ',
                sat: 'Σαβ'
            },
            months: {
                m1: 'Ιαν',
                m2: 'Φεβ',
                m3: 'Μαρ',
                m4: 'Απρ',
                m5: 'Μαϊ',
                m6: 'Ιουν',
                m7: 'Ιουλ',
                m8: 'Αυγ',
                m9: 'Σεπ',
                m10: 'Οκτ',
                m11: 'Νοε',
                m12: 'Δεκ'
            }
        },
        transfer: {
            titles: {
                source: 'Πηγή',
                target: 'Στόχος'
            },
            filterPlaceholder: 'Αναζήτηση',
            notFoundText: 'Δεν βρέθηκαν αποτελέσματα'
        },
        modal: {
            okText: 'Εντάξει',
            cancelText: 'Ακύρωση'
        },
        poptip: {
            okText: 'Εντάξει',
            cancelText: 'Ακύρωση'
        },
        page: {
            prev: 'Προηγούμενη Σελίδα',
            next: 'Επόμενη Σελίδα',
            total: 'Σύνολο',
            item: 'Αντικείμενο',
            items: 'Αντικείμενα',
            prev5: 'Προηγούμενες 5 Σελίδες',
            next5: 'Επόμενες 5 Σελίδες',
            page: '/Σελίδα',
            goto: 'Μετάβαση σε',
            p: ''
        },
        rate: {
            star: 'Αστέρι',
            stars: 'Αστέρια'
        },
        tree: {
            emptyText: 'Χωρίς Δεδομένα'
        }
    }
};

(0, _lang2.default)(lang);

exports.default = lang;

/***/ })
/******/ ]);
});
//# sourceMappingURL=el-GR.js.map