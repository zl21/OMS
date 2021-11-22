// 是否监听keydown mixin
export default {
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown);
  },
  mounted() {
    document.addEventListener('keydown', this.onKeyDown);
  },
  directives: {
    focus: {
      inserted(el) {
        setTimeout(() => {
          el.focus();
        }, 200);
      }
    }
  },
};
