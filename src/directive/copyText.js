/**
 * v-copyText 复制文本内容
 * 
 * <p v-copyText v-copyText:callback="copyTextSuccess">复制内容</p>
 * 
 * 暂不支持回调 callback
 */

export default {
  mounted(el, { value, arg }) { // vue3
    console.log('mounted::', value);
  },

  inserted(el, { value, arg }) {
    var node = document.createElement("i");
    node.className = 'copy-clipboard ark-icon iconfont iconios-copy-outline iconfont'
    node.setAttribute('style', 'display: none; color: #303133;');
    el.copyElement = node

    // if (arg === "callback") {
    //   el.$copyCallback = value;
    // } else {
      el.copyElement.addEventListener("click", handler);
      el.parentNode.appendChild(node) // 将节点（icon图标）插入到当前节点的父节点之后
      el.parentNode.addEventListener('mouseover', mouseover, true)
      el.parentNode.addEventListener('mouseleave', mouseleave, true)
    // }
  },
  unbind(el) {
    el.copyElement.removeEventListener('click', handler)
    el.parentNode.removeChild(el.copyElement);
    el.parentNode.removeEventListener('mouseover', mouseover)
    el.parentNode.removeEventListener('mouseleave', mouseleave)
  }
}

const mouseover = () => mouseEvent('mouseover')
const mouseleave = () => mouseEvent('mouseleave')
const mouseEvent = (type) => {
  const len = event.target.children.length
  if (len < 2) return
  const bindNode = event.target.children[len - 2]
  const iconNode = event.target.children[len - 1]
  len
  && bindNode.innerText != ''
  && (iconNode.style.display = type == 'mouseover' ? 'block' : 'none');
}
const handler = _.debounce((event) => {
  const value = event.target.previousSibling.innerText // 获取节点（icon图标）的上一个兄弟节点，即绑定指令的节点
  copyTextToClipboard(value);
  // if (el.$copyCallback) {
  //   el.$copyCallback(value);
  // }
}, 300);

function copyTextToClipboard(input, { target = document.body } = {}) {
  const element = document.createElement("input"); // 创建input对象
  element.value = input; // 设置复制内容
  target.appendChild(element); // 添加临时实例
  element.select(); // 选择实例内容
  document.execCommand("Copy"); // 执行复制
  target.removeChild(element); // 删除临时实例
  vm.$Message.success("复制成功！");

  /* const element = document.createElement('textarea');
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

  return isSuccess; */
}
