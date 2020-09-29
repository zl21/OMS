// 是否监听keydown mixin
export const listeningToKeydownMixin = {
  beforeDestroy() {
    document.removeEventListener("keydown", this.onKeyDown);
  },
  mounted() {
    document.addEventListener("keydown", this.onKeyDown);
  },
  directives: {
    focus: {
      inserted: function(el) {
        setTimeout(() => {
          el.focus();
        }, 200);
      }
    }
  },
};
