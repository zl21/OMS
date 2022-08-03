/**
 * v-copyText 复制文本内容
 * 
 * <p v-copyText="copy" v-copyText:callback="copyTextSuccess">复制内容</p>
 */

export default {
  mounted(el, { value, arg }) { // vue3
    console.log('mounted::', value);
  },

  bind(el, { value, arg }) { // vue2
    var node = document.createElement("i");
    node.className = 'copy-clipboard ark-icon iconfont iconmd-clipboard iconfont'
    node.setAttribute('style', 'display: none; color: #f52f2f;');
    el.copyElement = node

    if (value) {
      if (arg === "callback") {
        el.$copyCallback = value;
      } else {
        const handler = () => {
          copyTextToClipboard(value);
          if (el.$copyCallback) {
            el.$copyCallback(value);
          }
        };
        el.copyElement.addEventListener("click", handler);
        
        el.parentNode.appendChild(node)
        el.parentNode.addEventListener("mouseover", function(){  
          el.copyElement.style.display = 'block';
        })
        el.parentNode.addEventListener("mouseleave", function(){  
          el.copyElement.style.display = 'none';
        })
      }
    }
  },
  update(el, binding) {
    let parentNode = el.copyElement.parentNode
    if (binding.value) {
      if (binding.arg === "callback") {
        el.$copyCallback = binding.value;
      } else {
        const handler = () => {
          copyTextToClipboard(binding.value);
          if (el.$copyCallback) {
            el.$copyCallback(binding.value);
          }
        };
        el.copyElement.addEventListener("click", handler);
        el.parentNode.addEventListener("mouseover", function(){  
          el.copyElement.style.display = 'block';
        })
        el.parentNode.addEventListener("mouseleave", function(){  
          el.copyElement.style.display = 'none';
        })
        parentNode === null && el.parentNode.appendChild(el.copyElement);
      }
    } else {
      el === parentNode && el.removeChild(el.copyElement);
    }
  },
}

function copyTextToClipboard(input, { target = document.body } = {}) {
  const element = document.createElement('textarea');
  const previouslyFocusedElement = document.activeElement;

  element.value = input;

  // Prevent keyboard from showing on mobile
  element.setAttribute('readonly', '');

  element.style.contain = 'strict';
  element.style.position = 'absolute';
  element.style.left = '-9999px';
  element.style.fontSize = '12pt'; // Prevent zooming on iOS

  const selection = document.getSelection();
  const originalRange = selection.rangeCount > 0 && selection.getRangeAt(0);

  target.append(element);
  element.select();

  // Explicit selection workaround for iOS
  element.selectionStart = 0;
  element.selectionEnd = input.length;

  let isSuccess = false;
  try {
    isSuccess = document.execCommand('copy');
    vm.$Message.success("复制成功！");
  } catch { }

  element.remove();

  if (originalRange) {
    selection.removeAllRanges();
    selection.addRange(originalRange);
  }

  // Get the focus back on the previously focused element, if any
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
  }

  return isSuccess;
}
