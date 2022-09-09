/**
 * 层级覆盖
 * 下拉单/多选组件 - 模糊搜索 (popInput)
 */
export const resetElScrollBarZIndex = function () {
  let modalNode = document.querySelector('.ark-modal-wrap')
  let popNode = document.querySelector('.el-autocomplete-suggestion.el-popper')
  let config = {}
  if (modalNode) {
    let observerOptions = {
      childList: true, // 观察目标子节点的变化，添加或删除
      attributes: false, // 观察属性变动
      subtree: true //默认是false，设置为true后可观察后代节点
    }
    const callback = () => {
      vm.$nextTick(() => {
        let modalZIndex = modalNode.style.zIndex
        let zIndex = popNode.style.zIndex
        console.log('callback~~~~', modalZIndex, zIndex)
        popNode.style.zIndex = zIndex > modalZIndex ? zIndex : Number(modalZIndex) + 10
      })
    }
    config = { popNode, observerOptions, callback }
  }
  return config
}

/**
 * 层级覆盖
 * 1. 弹窗多选组件 (popInput_ld)
 * 2. 下拉单/多选组件 - fktable层级 (popInput)
 */
export const resetElPopoverZIndex = function (selector) {
  let modalNode = document.querySelector('.ark-modal-wrap')
  if (modalNode) {
    let fkNode = document.querySelector(selector).parentElement
    if (fkNode) {
      let fkZIndex = fkNode.style.zIndex
      let modalZIndex = modalNode.style.zIndex
      fkNode.style.zIndex = fkZIndex > modalZIndex ? fkZIndex : Number(modalZIndex) + 10
    }
  }
}