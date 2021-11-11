/*
 * @Author: your name
 * @Date: 2021-05-21 16:05:18
 * @LastEditTime: 2021-05-26 13:11:12
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /front-standard-product/src/directive/loading.js
 */
export default {
  bind(el, binding) {
    // loading遮罩层
    var node = document.createElement("div");
    node.innerHTML = 
    `
      <div class="ark-spin ark-spin-default ark-spin-fix ark-spin-show-text">
        <div class="ark-spin-main">
          <span class="ark-spin-dot"></span>
          <div class="ark-spin-text">
            <div class="loader">
              <svg viewBox="25 25 50 50" class="circular">
                <circle cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10" class="path"></circle>
              </svg>
            </div>
          </div>
        </div>
      </div>
    `
    // 自定义的 loadingElement 属性/其他, 下面钩子函数可以使用;
    el.loadingElement = node
    binding.value && el.appendChild(node)
  },
  update(el, binding) {
    if (binding.value) {
      if (el.loadingElement.parentNode === null) {
        el.appendChild(el.loadingElement);
      }
    } else {
      if (el === el.loadingElement.parentNode) {
        el.removeChild(el.loadingElement);
      }
    }
  },
  unbind(el) {
    if (el.loadingElement.parentNode === el) {
      el.removeChild(el.loadingElement);
    }
    el.loadingElement = null;
  }
};