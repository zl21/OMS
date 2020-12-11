// /**
//  * @description  CSS resize polyfill for IE/Edge
//  * @author       zhangxinxu(.com)
//  * @document     https://www.zhangxinxu.com/wordpress/?p=8839
//  * @demo         https://www.zhangxinxu.com/study/201908/textarea-resize-polyfill-demo.php
//  * @license      MIT 可以免费使用，但作者和文档出处需要保留
//  */

// /**
//  * closest polyfill
//  */

// if (!Element.prototype.matches) {
//     Element.prototype.matches = Element.prototype.matchesSelector
//         || Element.prototype.mozMatchesSelector
//         || Element.prototype.msMatchesSelector
//         || Element.prototype.oMatchesSelector
//         || Element.prototype.webkitMatchesSelector
//         || function(s) {
//             let matches = (this.document || this.ownerDocument).querySelectorAll(s);
//                 let i = matches.length;
//             while (--i >= 0 && matches.item(i) !== this) {}
//             return i > -1;
//         };
// }

// if (!Element.prototype.closest) {
//     Element.prototype.closest = function(s) {
//         let el = this;

//         do {
//             if (el.matches(s)) {
//  return el;
// }
//             el = el.parentElement || el.parentNode;
//         } while (el !== null && el.nodeType === 1);

//         return null;
//     };
// }

// /**
//  * NodeList forEach support
//  */
// if (window.NodeList && !NodeList.prototype.forEach) {
//     NodeList.prototype.forEach = Array.prototype.forEach;
// }

// /**
//  * resize polyfill
//  */
// if (typeof window.getComputedStyle(document.body).resize === 'undefined' && window.HTMLTextAreaElement) {
//     HTMLTextAreaElement.prototype.setResize = function () {
//         // 元素
//         let textarea = this;
//         let target = textarea.store && textarea.store.resize;
//         let resize = null;
//         // 文本域的id
//         let {id} = textarea;
//         if (!id) {
//             id = `r${Math.random()}`.replace('0.', '');
//             textarea.id = id;
//         }
//         // 获取resize属性值
//         let attrResize = textarea.getAttribute('resize');

//         if (typeof attrResize === 'string' && attrResize != 'vertical' && attrResize != 'horizontal') {
//             attrResize = 'both';
//         }
//         if (typeof attrResize !== 'string') {
//             return;
//         }

//         // 创建模拟拉伸的基本元素
//         if (!target) {
//             target = document.createElement('span');
//             resize = document.createElement('label');
//             resize.setAttribute('for', id);
//             target.appendChild(resize);
//             // 一些固定的样式设置
//             target.style.position = 'relative';
//             target.style.verticalAlign = window.getComputedStyle(textarea).verticalAlign;

//             resize.style.position = 'absolute';
//             resize.style.width = '17px';
//             resize.style.height = '17px';
//             resize.style.background = 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 1024 1024\' xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Cpath d=\'M765.558 510.004a93.65 93.65 0 1 0 191.665 0 93.65 93.65 0 1 0-191.665 0zM765.558 821.46a93.65 93.65 0 1 0 191.665 0 93.65 93.65 0 1 0-191.665 0zM422.15700000000004 821.46a93.65 93.65 0 1 0 191.665 0 93.65 93.65 0 1 0-191.665 0zM422.15700000000004 510.004a93.65 93.65 0 1 0 191.665 0 93.65 93.65 0 1 0-191.665 0zM765.558 202.54a93.65 93.65 0 1 0 191.665 0 93.65 93.65 0 1 0-191.665 0zM66.77700000000002 821.46a93.65 93.65 0 1 0 191.665 0 93.65 93.65 0 1 0-191.665 0z\' fill=\'%23BFBFBF\'/%3E%3C/svg%3E") no-repeat center';
//             resize.style.bottom = '0';
//             resize.style.right = '0';
//             resize.style.backgroundSize = '12px 12px';
//             // 在textarea元素后面显示
//             textarea.insertAdjacentElement('afterend', target);
//             textarea.store = textarea.store || {};
//             textarea.store.resize = target;

//             // 事件
//             let store = {};
//             resize.addEventListener('mousedown', (event) => {
//                 store.resizing = true;
//                 store.startX = event.pageX;
//                 store.startY = event.pageY;
//                 // 此时textarea的尺寸
//                 store.offsetWidth = textarea.offsetWidth;
//                 store.offsetHeight = textarea.offsetHeight;

//                 event.preventDefault();
//             });

//             document.addEventListener('mousemove', (event) => {
//                 if (!store.resizing) {
//                     return;
//                 }
//                 event.preventDefault();

//                 let currentX = event.pageX;
//                 let currentY = event.pageY;

//                 let moveX = currentX - store.startX;
//                 let moveY = currentY - store.startY;

//                 let currentWidth = store.offsetWidth + moveX;
//                 let currentHeight = store.offsetHeight + moveY;

//                 if (currentWidth < 40) {
//                     currentWidth = 40;
//                 }
//                 if (currentHeight < 40) {
//                     currentHeight = 40;
//                 }

//                 // 尺寸设置
//                 if (attrResize == 'both' || attrResize == 'horizontal') {
//                     textarea.style.width = `${currentWidth}px`;
//                     if (target.style.display == 'block') {
//                         // target.style.width = `${currentWidth}px`;
//                     }
//                 }
//                 if (attrResize == 'both' || attrResize == 'vertical') {
//                     textarea.style.height = `${currentHeight}px`;
//                     if (/inline/.test(styleDisplay)) {
//                         target.style.height = `${currentHeight}px`;
//                     }
//                 }
//             });

//             document.addEventListener('mouseup', () => {
//                 if (store.resizing) {
//                     store.resizing = false;
//                 }
//             });
//         }

//         // 样式的控制与处理
//         var styleDisplay = window.getComputedStyle(textarea).display;
//         if (styleDisplay == 'none') {
//             target.style.display = 'none';
//         } else if (/inline/.test(styleDisplay)) {
//             target.style.display = 'inline-block';
//             target.style.height = `${textarea.offsetHeight}px`;
//         } else {
//             target.style.display = 'block';
//             // target.style.width = `${textarea.offsetWidth}px`;
//         }
//     };

//     HTMLTextAreaElement.prototype.initResize = function () {
//         this.setResize();

//         // 更新与处理
//         this.addEventListener('DOMAttrModified', function () {
//             this.setResize();
//         }, false);
//     };

//     window.addEventListener('DOMContentLoaded', () => {
//         document.querySelectorAll('textarea[resize]').forEach((textarea) => {
//             textarea.initResize();
//         });

//         // 插入内容时候的自动初始化
//         document.body.addEventListener('DOMNodeInserted', (event) => {
//             // 插入的元素
//             let {target} = event;

//             if (target.matches('textarea[resize]') && (!target.store || !target.store.resize)) {
//                 target.initResize();
//             }
//         });
//     });
// }
