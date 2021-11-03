
export default {
  name: 'stepsBars',
  data() {
    return {};
  },
  computed: {
    current_step: {
      get() {
        return this.current;
      },
      set(val) {
        this.$emit('update:current', val);
      }
    }
  },
  props: {
    current: {
      type: Number
    },
    steps: {
      type: Array
    }
  },
  methods: {
    showItem(index, item) {
      console.log(item);
      return item.class ? item.class : '';
    },
    showActive(index, item) { // 激活
      return this.current_step === index ? 'step-active' : 'step-noactive';
    },
    showFinish(index, item) { // 完成
      return item.finish === true ? 'step-finish' : '';
    },
    /**
     * 选中某个模块
     */
    selectOneStep(index) {
      this.current_step = index;
    }
  },
  mounted() {}
};
