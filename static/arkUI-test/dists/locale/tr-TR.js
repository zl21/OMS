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
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
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

/***/ 23:
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
        locale: 'tr-TR',
        select: {
            placeholder: 'Seç',
            noMatch: 'Eşleşen veri yok',
            loading: 'yükleme'
        },
        table: {
            noDataText: 'Veri Yok',
            noFilteredDataText: 'Süzülen veri yok',
            confirmFilter: 'Onayla',
            resetFilter: 'Sıfırla',
            clearFilter: 'Hepsi'
        },
        datepicker: {
            selectDate: 'Tarih seç',
            selectTime: 'Zaman seç',
            startTime: 'Başlangıç',
            endTime: 'Bitişe',
            clear: 'Temizle',
            ok: 'Tamam',
            datePanelLabel: '[mmmm] [yyyy]',
            month: '',
            month1: 'Ocak',
            month2: 'Şubat',
            month3: 'Mart',
            month4: 'Nisan',
            month5: 'Mayıs',
            month6: 'Haziran',
            month7: 'Temmuz',
            month8: 'Ağustos',
            month9: 'Eylül',
            month10: 'Ekim',
            month11: 'Kasım',
            month12: 'Aralık',
            year: '',
            weekStartDay: '0',
            weeks: {
                sun: 'Paz',
                mon: 'Pzt',
                tue: 'Sal',
                wed: 'Çar',
                thu: 'Per',
                fri: 'Cum',
                sat: 'Cmt'
            },
            months: {
                m1: 'Oca',
                m2: 'Şub',
                m3: 'Mar',
                m4: 'Nis',
                m5: 'May',
                m6: 'Haz',
                m7: 'Tem',
                m8: 'Ağu',
                m9: 'Eyl',
                m10: 'Ekm',
                m11: 'Kas',
                m12: 'Ara'
            }
        },
        transfer: {
            titles: {
                source: 'Kaynak',
                target: 'Hedef'
            },
            filterPlaceholder: 'Arama yapın',
            notFoundText: 'Bulunamadı'
        },
        modal: {
            okText: 'Tamam',
            cancelText: 'İptal'
        },
        poptip: {
            okText: 'Tamam',
            cancelText: 'İptal'
        },
        page: {
            prev: 'Önceki',
            next: 'Sonraki',
            total: 'Toplam',
            item: 'öğe',
            items: 'öğeler',
            prev5: 'Önceki 5 Sayfa',
            next5: 'Sonraki 5 Sayfa',
            page: '/sayfa',
            goto: 'Git',
            p: ''
        },
        rate: {
            star: 'Yıldız',
            stars: 'Yıldız'
        },
        tree: {
            emptyText: 'Veri Yok'
        }
    }
};

(0, _lang2.default)(lang);

exports.default = lang;

/***/ })

/******/ });
});
//# sourceMappingURL=tr-TR.js.map