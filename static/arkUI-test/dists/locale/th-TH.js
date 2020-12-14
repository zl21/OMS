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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
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

/***/ 22:
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
        locale: 'th-TH',
        select: {
            placeholder: 'ตัวเลือก',
            noMatch: 'ข้อมูลไม่ตรงกัน',
            loading: 'ดาวน์โหลด'
        },
        table: {
            noDataText: 'ไม่พบข้อมูล',
            noFilteredDataText: 'ไม่พบตัวกรองข้อมูล',
            confirmFilter: 'ยืนยัน',
            resetFilter: 'รีเซ็ต',
            clearFilter: 'ทั้งหมด'
        },
        datepicker: {
            selectDate: 'เลือกวัน',
            selectTime: 'เลือกเวลา',
            startTime: 'เริ่มเวลา',
            endTime: 'สิ้นสุดเวลา',
            clear: 'ล้างข้อมูล',
            ok: 'ตกลง',
            datePanelLabel: '[mmmm] [yyyy]',
            month: 'เดือน',
            month1: 'มกราตม',
            month2: 'กุมภาพันธ์',
            month3: 'มีนาคม',
            month4: 'เมษายน',
            month5: 'พฤษภาคม',
            month6: 'มิถุนายน',
            month7: 'กรกฎาคม',
            month8: 'สิงหาคม',
            month9: 'กันยายน',
            month10: 'ตุลาคม',
            month11: 'พฤศจิกายน',
            month12: 'ธันวาคม',
            year: 'ปี',
            weekStartDay: '0',
            weeks: {
                sun: 'อาทิตย์',
                mon: 'จันทร์',
                tue: 'อังคาร',
                wed: 'พุธ',
                thu: 'พฤหัสบดี',
                fri: 'ศุกร์',
                sat: 'เสาร์'
            },
            months: {
                m1: 'ม.ค.',
                m2: 'ก.พ.',
                m3: 'มี.ค.',
                m4: 'เม.ย.',
                m5: 'พ.ค.',
                m6: 'มิ.ย.',
                m7: 'ก.ค.',
                m8: 'ส.ค.',
                m9: 'ก.ย.',
                m10: 'ต.ค.',
                m11: 'พ.ย.',
                m12: 'ธ.ค.'
            }
        },
        transfer: {
            titles: {
                source: 'แหล่งข้อมูล',
                target: 'เป้าหมาย'
            },
            filterPlaceholder: 'ค้นหาที่นี้',
            notFoundText: 'ค้นหาไม่พบ'
        },
        modal: {
            okText: 'ตกลง',
            cancelText: 'ยกเลิก'
        },
        poptip: {
            okText: 'ตกลง',
            cancelText: 'ยกเลิก'
        },
        page: {
            prev: 'หน้าก่อน',
            next: 'หน้าถัดไป',
            total: 'ทั้งหมด',
            item: 'ไอเทม',
            items: 'ไอเทม',
            prev5: 'ก่อน 5 หน้า',
            next5: 'ถัดไป 5 หน้า',
            page: '/หน้า',
            goto: 'ไปยัง',
            p: 'หน้า'
        },
        rate: {
            star: 'ดวง',
            stars: 'ดวง'
        },
        tree: {
            emptyText: 'ไม่พบข้อมูล'
        }
    }
};

(0, _lang2.default)(lang);

exports.default = lang;

/***/ })

/******/ });
});
//# sourceMappingURL=th-TH.js.map