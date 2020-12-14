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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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

/***/ 8:
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
        locale: 'fr-FR',
        select: {
            placeholder: 'Sélectionnez',
            noMatch: 'Aucun résultat',
            loading: 'Chargement'
        },
        table: {
            noDataText: 'Aucune donnée',
            noFilteredDataText: 'No filter data',
            confirmFilter: 'Confirmez',
            resetFilter: 'Reset',
            clearFilter: 'Tout'
        },
        datepicker: {
            selectDate: 'Sélectionnez une date',
            selectTime: 'Sélectionnez une heure',
            startTime: 'Heure de début',
            endTime: 'Heure de fin',
            clear: 'Annuler',
            ok: 'OK',
            datePanelLabel: '[mmmm] [yyyy]',
            month: 'Mois',
            month1: 'Janvier',
            month2: 'Février',
            month3: 'Mars',
            month4: 'Avril',
            month5: 'Mai',
            month6: 'Juin',
            month7: 'Juillet',
            month8: 'Août',
            month9: 'Septembre',
            month10: 'Octobre',
            month11: 'Novembre',
            month12: 'Decembre',
            year: 'An',
            weekStartDay: '1',
            weeks: {
                sun: 'Dim',
                mon: 'Lun',
                tue: 'Mar',
                wed: 'Mer',
                thu: 'Jeu',
                fri: 'Ven',
                sat: 'Sam'
            },
            months: {
                m1: 'Jan',
                m2: 'Fev',
                m3: 'Mar',
                m4: 'Avr',
                m5: 'Mai',
                m6: 'Jun',
                m7: 'Jul',
                m8: 'Aoû',
                m9: 'Sep',
                m10: 'Oct',
                m11: 'Nov',
                m12: 'Déc'
            }
        },
        transfer: {
            titles: {
                source: 'Source',
                target: 'Cible'
            },
            filterPlaceholder: 'Recherche',
            notFoundText: 'Pas de résultat'
        },
        modal: {
            okText: 'OK',
            cancelText: 'Annuler'
        },
        poptip: {
            okText: 'OK',
            cancelText: 'Annuler'
        },
        page: {
            prev: 'Page Précédente',
            next: 'Page Suivante',
            total: 'Total',
            item: 'élément',
            items: 'éléments',
            prev5: '5 Pages en Avant',
            next5: '5 Pages en Arrière',
            page: '/page',
            goto: 'Aller à',
            p: ''
        },
        rate: {
            star: 'Étoile',
            stars: 'Étoiles'
        },
        tree: {
            emptyText: 'Aucune donnée'
        }
    }
};

(0, _lang2.default)(lang);

exports.default = lang;

/***/ })

/******/ });
});
//# sourceMappingURL=fr-FR.js.map