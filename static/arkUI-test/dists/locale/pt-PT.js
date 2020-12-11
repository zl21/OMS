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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
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

/***/ 18:
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
        locale: 'pt-PT',
        select: {
            placeholder: 'Selecionar',
            noMatch: 'Não encontrado',
            loading: 'A carregar'
        },
        table: {
            noDataText: 'Sem dados',
            noFilteredDataText: 'Sem dados filtrados',
            confirmFilter: 'Confirmar',
            resetFilter: 'Limpar',
            clearFilter: 'Todos'
        },
        datepicker: {
            selectDate: 'Selecione a data',
            selectTime: 'Selecione a hora',
            startTime: 'Hora inicial',
            endTime: 'Hora final',
            clear: 'Limpar',
            ok: 'Confirmar',
            datePanelLabel: '[mmmm] de [yyyy]',
            month: 'Mês',
            month1: 'Janeiro',
            month2: 'Fevereiro',
            month3: 'Março',
            month4: 'Abril',
            month5: 'Maio',
            month6: 'Junho',
            month7: 'Julho',
            month8: 'Agosto',
            month9: 'Setembro',
            month10: 'Outubro',
            month11: 'Novembro',
            month12: 'Dezembro',
            year: 'Ano',
            weekStartDay: '1',
            weeks: {
                sun: 'Dom',
                mon: 'Seg',
                tue: 'Ter',
                wed: 'Qua',
                thu: 'Qui',
                fri: 'Sex',
                sat: 'Sáb'
            },
            months: {
                m1: 'Jan',
                m2: 'Fev',
                m3: 'Mar',
                m4: 'Abr',
                m5: 'Mai',
                m6: 'Jun',
                m7: 'Jul',
                m8: 'Ago',
                m9: 'Set',
                m10: 'Out',
                m11: 'Nov',
                m12: 'Dez'
            }
        },
        transfer: {
            titles: {
                source: 'Origem',
                target: 'Destino'
            },
            filterPlaceholder: 'Pesquise aqui',
            notFoundText: 'Não encontrado'
        },
        modal: {
            okText: 'Confirmar',
            cancelText: 'Cancelar'
        },
        poptip: {
            okText: 'Confirmar',
            cancelText: 'Cancelar'
        },
        page: {
            prev: 'Página anterior',
            next: 'Próxima página',
            total: 'Total',
            item: 'item',
            items: 'itens',
            prev5: 'Voltar 5 páginas',
            next5: 'Avançar 5 páginas',
            page: '/page',
            goto: 'Ir para',
            p: ''
        },
        rate: {
            star: 'Estrela',
            stars: 'Estrelas'
        },
        tree: {
            emptyText: 'Sem dados'
        }
    }
};

(0, _lang2.default)(lang);

exports.default = lang;

/***/ })

/******/ });
});
//# sourceMappingURL=pt-PT.js.map